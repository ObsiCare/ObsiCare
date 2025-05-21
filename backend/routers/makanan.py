import numpy as np
import joblib
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.makanan import Makanan
from app.schemas.makanan_schema import MakananCreate, MakananResponse
from app.auth.auth_bearer import JWTBearer

router = APIRouter(
    prefix="/makanan",
    tags=["Makanan"],
    dependencies=[Depends(JWTBearer())]
)

## Fungsi kategori kalori makanan disini

kmeans = joblib.load("C:/DIKA/SEM 4/Teknologi Web Service/Obsicare/app/ML/model_clustering_makanan.pkl")
scaler = joblib.load("C:/DIKA/SEM 4/Teknologi Web Service/Obsicare/app/ML/scaler_makanan.pkl")

@router.post("/tambah_data_makanan", status_code=201)
def tambah_makanan(data: MakananCreate, db: Session = Depends(get_db)):
    kategori = kategori_kalori(data.kalori)
    fitur = np.array([[data.kalori, data.protein]])
    fitur_scaled = scaler.transform(fitur)
    cluster = int(kmeans.predict(fitur_scaled)[0])
    makanan = Makanan(nama=data.nama, kalori=data.kalori, protein=data.protein, kategori=kategori, cluster=cluster)
    db.add(makanan)
    db.commit()
    db.refresh(makanan)
    return makanan

@router.get("/")
def get_all_makanan(db: Session = Depends(get_db)):
    return db.query(Makanan).all()

@router.get("/search", response_model=list[MakananResponse])
def search_makanan(q: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    return db.query(Makanan).filter(Makanan.nama.ilike(f"%{q}%")).all()

@router.get("/makanan/{makanan_id}", response_model=MakananResponse)
def get_detail_makanan(makanan_id: int, db: Session = Depends(get_db)):
    makanan = db.query(Makanan).filter(Makanan.id == makanan_id).first()
    if not makanan:
        raise HTTPException(status_code=404, detail="Makanan tidak ditemukan")
    return makanan

