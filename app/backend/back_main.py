import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import review, dashboard

# MySQL DB에 테이블이 없다면 자동으로 생성
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RookieRoute",
    description="OpenAI와 FastAPI, MySQL을 활용한 코드 리뷰 및 약점 분석 프로젝트"
)

# CORS 설정 - 프론트엔드와 통신 허용
# 환경변수에서 허용할 오리진 가져오기 (쉼표로 구분)
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(review.router)
app.include_router(dashboard.router)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "RookieRoute 서버가 정상적으로 실행 중입니다."}