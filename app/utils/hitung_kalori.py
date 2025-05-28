def hitung_bmi(bb: float, tb_cm: float) -> float:
    return bb / ((tb_cm / 100) ** 2)

def hitung_bmr(bb: float, tb_cm: float, usia: int, kelamin: int) -> float:
    if kelamin == 0:
        return 10 * bb + 6.25 * tb_cm - 5 * usia + 5
    else:
        return 10 * bb + 6.25 * tb_cm - 5 * usia - 161

def klasifikasi_bmi(bmi: float) -> str:
    if bmi < 16.0:
        return 'Sangat kurus'
    elif 16.0 <= bmi < 17.0:
        return 'Kurus'
    elif 17.0 <= bmi < 18.5:
        return 'Agak kurus'
    elif 18.5 <= bmi < 25.0:
        return 'Normal'
    elif 25.0 <= bmi < 30.0:
        return 'Pra-obesitas'
    elif 30.0 <= bmi < 35.0:
        return 'Obesitas kelas I'
    elif 35.0 <= bmi < 40.0:
        return 'Obesitas kelas II'
    else:
        return 'Obesitas kelas III'

def hitung_kalori(bmr: float, aktivitas: float, klasifikasi: str) -> float:
    if klasifikasi in ['Sangat kurus', 'Kurus']:
        return bmr * aktivitas + 500
    elif klasifikasi in ['Agak kurus', 'Normal']:
        return bmr * aktivitas
    elif klasifikasi in ['Pra-obesitas', 'Obesitas kelas I']:
        return bmr * aktivitas - 500
    else:
        return None