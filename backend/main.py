from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import user, makanan, rekomendasi, auth 

app = FastAPI(
    title="Obsicare API",
    description="API untuk Monitoring dan Rekomendasi Pola Makan Penderita Obesitas",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

origins = ["http://localhost", "http://localhost:6000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"]) 
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(makanan.router, prefix="/makanan", tags=["Makanan"])
app.include_router(rekomendasi.router, prefix="/rekomendasi", tags=["Rekomendasi Makanan"])
