import openai
import json
import os
from fastapi import APIRouter, Depends, HTTPException, status # status 추가가
from sqlalchemy.orm import Session
import schemas, database, models
from dependencies import get_current_user

# 수정 1: 비동기 클라이언트를 위한 import 추가
from openai import AsyncOpenAI # 수정 2: 클라이언트 인스턴스를 AsyncOpenAI로 변경
aclient = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
router = APIRouter(
    prefix="/review",
    tags=["Code Review"]
)

# AI 호출 함수 (AI가 JSON을 만들도록 강제)
# 수정 3: 함수 정의를 async def로 변경
async def call_openai_analyzer(user_code: str, language: str) -> dict:
    # 우리가 통계낼 표준 카테고리
    CATEGORIES = [
        "SyntaxError", "IndentationError", "NamingConvention", 
        "LogicError", "Efficiency", "Documentation", "Security", "Other"
    ]
    
    system_prompt = f"""
    You are a strict code reviewer specializing in '{language}'.
    The user has submitted code that MUST be written in '{language}'.
    
    1. If the code is written in a different language (e.g., C code submitted as Python), report a "SyntaxError" immediately.
    2. Analyze the code strictly according to '{language}' syntax and conventions.
    3. Each weakness must be categorized into: {CATEGORIES}.
    4. Response MUST be a valid JSON with "summary" (Korean) and "weaknesses" (list).
    """
    
    try:
        # 수정 4: aclient 사용 및 await 키워드 추가
        response = await aclient.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_code}
            ],
            response_format={"type": "json_object"}
        )
        
        # OpenAI 응답은 JSON "문자열"이므로 Python 딕셔너리로 파싱
        return json.loads(response.choices[0].message.content)

    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        raise HTTPException(status_code=500, detail="AI analysis failed.")


# 수정 5: 라우터 함수 정의를 async def로 변경
@router.post("/analyze", response_model=schemas.AnalysisResponse)
async def analyze_code( # async 추가
    request: schemas.CodeRequest, 
    db: Session = Depends(database.get_db), 
    current_user: models.User = Depends(get_current_user)
):

    # get_current_user 의존성을 추가하여 로그인한 사람만 접근 가능하게 함.
    # 토큰에서 증명된 진짜 ID(current_user.username)를 사용
    real_user_id = current_user.username

    # 추가 1: 입력 코드 길이 제한 (비용/안전성 확보)
    MAX_CODE_LENGTH = 15000 # 15,000자로 임의 설정
    if len(request.code) > MAX_CODE_LENGTH:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"코드가 너무 깁니다. ({MAX_CODE_LENGTH}자 이내로 제출해주세요.)"
        )

    """
    1. 코드를 받아 AI에게 분석 요청
    2. 결과를 DB에 저장
    3. 사용자에게 분석 결과 반환
    """
    
    # 1. AI 호출
   # 수정 6: await 키워드 사용
    ai_result = await call_openai_analyzer(request.code, request.language)
    
    # 2. Submission (제출물) 저장
    new_submission = models.Submission(
        user_id=real_user_id,
        code_snippet=request.code,
        language=request.language,
        summary=ai_result.get("summary", "No summary.")
    )
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission) # DB가 생성한 id를 가져옴
    
    # 3. Weakness (약점) 들을 개별 저장
    response_weaknesses = []
    for item in ai_result.get("weaknesses", []):
        new_weakness = models.Weakness(
            submission_id=new_submission.id,
            user_id=real_user_id,
            type=item.get("type", "Unknown"),
            line=item.get("line", 0),
            explanation=item.get("explanation", "AI가 상세 설명을 제공하지 않았습니다.")
        )
        db.add(new_weakness)
        #프론트에 보낼 item
        safe_item = {
            "type": item.get("type", "Unknown"),
            "line": item.get("line", 0),
            "explanation": item.get("explanation", "AI가 상세 설명을 제공하지 않았습니다.")
        }
        response_weaknesses.append(safe_item)
    
    db.commit()
    
    # 4. 프론트엔드에 응답 반환
    return schemas.AnalysisResponse(
        submission_id=new_submission.id,
        summary=new_submission.summary,
        weaknesses=response_weaknesses
    )
