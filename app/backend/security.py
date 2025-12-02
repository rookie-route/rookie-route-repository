# backend/security.py

from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv()

# .env에서 불러오기 (없으면 기본값 사용 - 배포 시엔 반드시 변경!)
SECRET_KEY = os.getenv("SECRET_KEY", "super_secret_key_needs_to_be_changed")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# 비밀번호 해싱 설정
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    """사용자가 입력한 비번과 DB의 암호화된 비번이 맞는지 확인"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    """비밀번호를 암호화하여 리턴"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """JWT 토큰 생성"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt