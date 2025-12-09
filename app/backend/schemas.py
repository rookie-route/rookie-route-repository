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

    class Config:
        json_schema_extra = {
            "example": {
                "code": "def calculate_area(radius):\n    # 원주율을 3으로 계산하는 실수\n    return 3 * radius * radius",
                "language": "python"
            }
        }

class AnalysisResponse(BaseModel):
    submission_id: int
    summary: str
    weaknesses: List[WeaknessDetail]

    class Config:
        json_schema_extra = {
            "example": {
                "submission_id": 105,
                "summary": "제출하신 코드는 원의 넓이를 계산하려고 하지만, 원주율(pi) 값을 정확한 값 대신 정수 3을 사용하여 오차가 발생할 수 있습니다.",
                "weaknesses": [
                    {
                        "type": "PrecisionLoss",
                        "line": 3,
                        "explanation": "정확도를 위해 math 모듈의 math.pi를 사용하거나 3.14159와 같은 더 정밀한 값을 사용하는 것이 좋습니다."
                    }
                ]
            }
        }

# --- Dashboard ---
class StatItem(BaseModel):
    weakness_type: str
    count: int

class DashboardResponse(BaseModel):
    total_submissions: int
    stats: List[StatItem] 
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "total_submissions": 42,
                "stats": [
                    {"weakness_type": "LogicError", "count": 15},
                    {"weakness_type": "SyntaxError", "count": 8},
                    {"weakness_type": "SecurityVulnerability", "count": 5}
                ]
            }
        }

# --- Auth (회원가입/로그인) ---
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                # 순서 통일: username -> email -> password
                "username": "rookie_dev",
                "email": "dev@rookieroute.com",
                "password": "StrongPassword123!"
            }
        }

class UserResponse(BaseModel):
    username: str
    email: str
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "username": "rookie_dev",
                "email": "dev@rookieroute.com"
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str

    class Config:
        json_schema_extra = {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Et9...",
                "token_type": "bearer"
            }
        }