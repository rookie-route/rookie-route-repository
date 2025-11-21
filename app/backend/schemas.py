from pydantic import BaseModel
from typing import List

# --- 공통 ---
class WeaknessDetail(BaseModel):
    type: str
    line: int
    explanation: str
    
# --- Review ---
class CodeRequest(BaseModel):
    user_id: str
    code: str

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
        orm_mode = True # SQLAlchemy 모델을 Pydantic 모델로 변환