import openai
import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, database, models

router = APIRouter(
    prefix="/review",
    tags=["Code Review"]
)

# AI 호출 함수 (AI가 JSON을 만들도록 강제)
def call_openai_analyzer(user_code: str) -> dict:
    # 우리가 통계낼 표준 카테고리
    CATEGORIES = [
        "SyntaxError", "IndentationError", "NamingConvention", 
        "LogicError", "Efficiency", "Documentation", "Security", "Other"
    ]
    
    system_prompt = f"""
    You are an expert code reviewer AI. Analyze the user's code.
    Each weakness must be categorized into one of these types: {CATEGORIES}.
    Your response MUST be a single, valid JSON object with two keys: "summary" and "weaknesses".
    "summary" should be a brief, one-sentence review in Korean.
    "weaknesses" should be an array of objects. Each object must have "type", "line", and "explanation".
    If there are no weaknesses, return an empty "weaknesses" array.
    """
    
    try:
        response = openai.chat.completions.create(
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


@router.post("/analyze", response_model=schemas.AnalysisResponse)
def analyze_code(request: schemas.CodeRequest, db: Session = Depends(database.get_db)):
    """
    1. 코드를 받아 AI에게 분석 요청
    2. 결과를 DB에 저장
    3. 사용자에게 분석 결과 반환
    """
    
    # 1. AI 호출
    ai_result = call_openai_analyzer(request.code)
    
    # 2. Submission (제출물) 저장
    new_submission = models.Submission(
        user_id=request.user_id,
        code_snippet=request.code,
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
            user_id=request.user_id,
            type=item.get("type"),
            line=item.get("line"),
            explanation=item.get("explanation")
        )
        db.add(new_weakness)
        response_weaknesses.append(item) # 프론트에 보낼 리스트에도 추가
    
    db.commit()
    
    # 4. 프론트엔드에 응답 반환
    return schemas.AnalysisResponse(
        submission_id=new_submission.id,
        summary=new_submission.summary,
        weaknesses=response_weaknesses
    )