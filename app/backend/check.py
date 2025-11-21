import os
from dotenv import load_dotenv
from openai import OpenAI

# .env 파일에서 키 불러오기
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

try:
    # 사용 가능 모델 조회
    model_list = client.models.list()
    
    print("내 키로 사용 가능한 주요 모델:")
    for model in model_list:
        # 모델 ID만 출력 (gpt가 들어간 것만 필터링)
        if "gpt" in model.id:
            print(f"- {model.id}")

except Exception as e:
    print(f"확인 불가: {e}")