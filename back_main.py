from fastapi import FastAPI
from . import models
from .database import engine
from .routers import review, dashboard

# MySQL DB에 테이블이 없다면 자동으로 생성
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RookieRoute",
    description="OpenAI와 FastAPI, MySQL을 활용한 코드 리뷰 및 약점 분석 프로젝트"
)

# 라우터 등록
app.include_router(review.router)
app.include_router(dashboard.router)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "RookieRoute 서버가 정상적으로 실행 중입니다."}