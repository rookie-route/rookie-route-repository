from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func # SQL의 COUNT, GROUP BY 함수
from .. import database, models, schemas

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard (Dev B)"]
)

@router.get("/stats/{user_id}", response_model=schemas.DashboardResponse)
def get_user_stats(user_id: str, db: Session = Depends(database.get_db)):
    """
    1. 사용자의 총 제출 횟수 조회
    2. 사용자의 약점 유형별 횟수 통계 (SQL Group By 활용)
    """
    
    # 1. 총 제출 횟수
    total_subs = db.query(models.Submission).filter(models.Submission.user_id == user_id).count()
    
    # 2. 약점 통계 (SQL 쿼리 실행)
    # SELECT type, COUNT(type) as count
    # FROM weaknesses
    # WHERE user_id = '...'
    # GROUP BY type
    # ORDER BY count DESC
    
    stats_query = db.query(
        models.Weakness.type, 
        func.count(models.Weakness.type).label("count")
    ).filter(
        models.Weakness.user_id == user_id
    ).group_by(
        models.Weakness.type
    ).order_by(
        func.count(models.Weakness.type).desc()
    )
    
    results = stats_query.all() # [('LogicError', 5), ('SyntaxError', 2)]
    
    # 3. Chart.js가 쓰기 좋은 형식으로 변환
    formatted_stats = [
        schemas.StatItem(weakness_type=type, count=count) 
        for type, count in results
    ]
    
    return schemas.DashboardResponse(
        total_submissions=total_subs,
        stats=formatted_stats
    )