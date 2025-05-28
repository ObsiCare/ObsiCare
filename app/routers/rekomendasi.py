import numpy as np
from datetime import date
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from collections import Counter
from app.database import get_db
from app.schemas.riwayat_schema import CatatMakananRequest
from app.models.riwayat import RiwayatMakanan
from app.models.makanan import Makanan
from app.models.user import User
from app.auth.auth_bearer import JWTBearer, get_current_user

router = APIRouter(
    prefix="/rekomendasi",
    tags=["Rekomendasi Makanan"],
    dependencies=[Depends(JWTBearer())]
)

@router.get("/rekomendasi")
def rekomendasi_makanan(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    today = date.today()

    konsumsi_makanan = (
        db.query(Makanan)
        .join(RiwayatMakanan)
        .filter(
            RiwayatMakanan.user_id == current_user.id,
            RiwayatMakanan.tanggal == today
        )
        .all()
    )

    total_kalori_masuk = sum([m.kalori for m in konsumsi_makanan])
    kebutuhan_kalori = current_user.kalori
    sisa_kalori = kebutuhan_kalori - total_kalori_masuk

    if sisa_kalori <= 0:
        return {
            "message": "Kalori harian sudah terpenuhi atau melebihi.",
            "total_kalori_masuk": total_kalori_masuk,
            "sisa_kalori": 0,
            "rekomendasi": []
        }
    
    ## Rule penampilan rekomendasi makanan berdasarkan sisa kalori di sini
    if sisa_kalori > 1000:
        cluster_rekomendasi = [2]
    elif 300 <= sisa_kalori <= 1000:
        cluster_rekomendasi = [0]
    else:  # < 300
        cluster_rekomendasi = [1]
        
    rekomendasi = (
        db.query(Makanan)
        .filter(Makanan.cluster.in_(cluster_rekomendasi))
        .all()
    )

    return {
        "message": "Rekomendasi makanan berdasarkan sisa kalori hari ini.",
        "total_kalori_masuk": total_kalori_masuk,
        "sisa_kalori": sisa_kalori,
        "rekomendasi": [
            {"id": m.id, "nama": m.nama, "kalori": m.kalori, "kategori": m.kategori}
            for m in rekomendasi
        ]
    }

@router.post("/catat")
def catat_makanan(data: CatatMakananRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    makanan = db.query(Makanan).filter(Makanan.id == data.makanan_id).first()
    if not makanan:
        raise HTTPException(status_code=404, detail="Makanan tidak ditemukan")

    riwayat = RiwayatMakanan(
        user_id=current_user.id,
        makanan_id=data.makanan_id,
        kalori=makanan.kalori,
        tanggal=date.today()
    )
    db.add(riwayat)
    db.commit()
    return {"message": "Makanan berhasil dicatat", "kalori": makanan.kalori}

