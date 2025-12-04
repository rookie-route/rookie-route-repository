from pydantic import BaseModel
from typing import List, Optional

# --- 공통 ---
class WeaknessDetail(BaseModel):
    type: str
    line: Optional[int] = None
    explanation: str
    
# --- Review ---
class CodeRequest(BaseModel):
    code: str
    language: str

class AnalysisResponse(BaseModel):
    submission_id: int
    summary: str
    weaknesses: List[WeaknessDetail]

# --- Dashboard ---
class StatItem(BaseModel):
    weakness_type: str
    count: int

class DashboardResponse(BaseModel):
    total_submissions: int
    stats: List[StatItem] # 차트에 쓸 데이터
    
    class Config:
        from_attributes = True # SQLAlchemy 모델을 Pydantic 모델로 변환



# --- Auth (회원가입/로그인) ---
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    username: str
    email: str
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str