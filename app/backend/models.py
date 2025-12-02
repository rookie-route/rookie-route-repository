from sqlalchemy import Column, Integer, String, DateTime, func, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Submission(Base):
    """
    사용자가 제출한 코드 원본과 AI의 요약본을 저장하는 테이블
    """
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), index=True, nullable=False)
    code_snippet = Column(Text, nullable=False) # 긴 코드 저장을 위해 Text
    summary = Column(String(2000)) # AI의 한 줄 요약
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Submission이 Weakness들을 리스트로 가질 수 있게 연결
    weaknesses = relationship("Weakness", back_populates="submission")

class Weakness(Base):
    """
    AI가 분석한 '표준화된' 약점 키워드를 저장하는 테이블
    """
    __tablename__ = "weaknesses"
    
    id = Column(Integer, primary_key=True, index=True)
    submission_id = Column(Integer, ForeignKey("submissions.id")) # Submission 테이블과 연결
    user_id = Column(String(50), index=True, nullable=False)
    
    type = Column(String(100), index=True) # "LogicError", "SyntaxError" 등
    line = Column(Integer)
    explanation = Column(String(2000))
    
    # Weakness가 Submission에 연결
    submission = relationship("Submission", back_populates="weaknesses")



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True) # 로그인 ID
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255)) # 암호화된 비밀번호 저장
    is_active = Column(Integer, default=1) # 1: 활성, 0: 비활성