import numpy as np
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user_schema import UserUpdate, UserResponse, UserResponseUsername, UpdateBBTB
from app.auth.auth_bearer import JWTBearer, get_current_user
from app.utils.hitung_kalori import hitung_bmi, hitung_bmr, klasifikasi_bmi, hitung_kalori

router = APIRouter(
    prefix="/users",
    tags=["Users"],
    dependencies=[Depends(JWTBearer())]
)

## Endpoint PUT untuk update data penting user di sini

@router.put("/update-kalori")
def update_kalori_dengan_bb_tb(
    data: UpdateBBTB,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User tidak ditemukan")

    user.berat_badan = data.berat_badan
    user.tinggi_badan = data.tinggi_badan

    jenis_kelamin_encoded = gender_map.get(user.jenis_kelamin.lower())
    aktivitas_encoded = aktivitas_map.get(user.aktivitas_fisik.lower())

    if jenis_kelamin_encoded is None or aktivitas_encoded is None:
        raise HTTPException(status_code=400, detail="Input jenis kelamin atau aktivitas tidak valid.")

    bmi = hitung_bmi(user.berat_badan, user.tinggi_badan)

    bmr = hitung_bmr(user.berat_badan, user.tinggi_badan, user.usia, jenis_kelamin_encoded)

    klasifikasi = klasifikasi_bmi(bmi)

    faktor = faktor_aktivitas[aktivitas_encoded]
    kalori = hitung_kalori(bmr, faktor, klasifikasi)

    if kalori is None:
        raise HTTPException(status_code=400, detail="Kebutuhan kalori tidak dihitung karena klasifikasi obesitas ekstrem.")

    user.kalori = round(kalori, 2)
    user.bmr = round(bmr, 2)
    user.bmi = round(bmi, 2)
    user.klasifikasi = round(klasifikasi, 2)

    db.commit()
    db.refresh(user)

    return {
        "message": "Profil berhasil diperbarui",
        "bmr": user.bmr,
        "bmi": user.bmi,
        "kalori": user.kalori,
        "klasifikasi": user.klasifikasi
    }

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.get("/username", response_model=UserResponseUsername)
def mengambil_username(current_user: User = Depends(get_current_user)):
    return current_user