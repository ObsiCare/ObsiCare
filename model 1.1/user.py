def hitung_kebutuhan_kalori():
    def konversi_aktivitas(level):
        level = level.lower()
        aktivitas_dict = {
            'sedentari': 1.2,
            'ringan': 1.375,
            'sedang': 1.55,
            'aktif': 1.725
        }
        if level not in aktivitas_dict:
            raise ValueError("Aktivitas tidak dikenali. Gunakan: sedentari, ringan, sedang, aktif.")
        return aktivitas_dict[level]

    def hitung_bmi(bb, tb_cm):
        return bb / ((tb_cm / 100) ** 2)

    def hitung_bmr(bb, tb_cm, usia, kelamin):
        if kelamin.lower() == 'pria':
            return 10 * bb + 6.25 * tb_cm - 5 * usia + 5
        else:
            return 10 * bb + 6.25 * tb_cm - 5 * usia - 161

    def klasifikasi_bmi(bmi):
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

    def hitung_kalori(bmr, aktivitas, klasifikasi):
        if klasifikasi in ['Sangat kurus', 'Kurus']:
            return bmr * aktivitas + 500
        elif klasifikasi in ['Agak kurus', 'Normal']:
            return bmr * aktivitas
        elif klasifikasi in ['Pra-obesitas', 'Obesitas kelas I']:
            return bmr * aktivitas - 500
        else:
            return None

    # Input user dengan validasi
    while True:
        kelamin = input("Jenis Kelamin (Pria/Wanita): ").strip().lower()
        if kelamin in ['pria', 'wanita']:
            break
        print("Masukkan 'Pria' atau 'Wanita'.")

    while True:
        try:
            usia = int(input("Usia: "))
            if usia > 0:
                break
            else:
                print("Usia harus lebih dari 0.")
        except ValueError:
            print("Masukkan angka.")

    while True:
        try:
            bb = float(input("Berat Badan (kg): "))
            if bb > 0:
                break
            else:
                print("Berat badan harus lebih dari 0.")
        except ValueError:
            print("Masukkan angka.")

    while True:
        try:
            tb = float(input("Tinggi Badan (cm): "))
            if tb > 0:
                break
            else:
                print("Tinggi badan harus lebih dari 0.")
        except ValueError:
            print("Masukkan angka.")

    while True:
        aktivitas_input = input("Tingkat Aktivitas (sedentari/ringan/sedang/aktif): ").strip().lower()
        try:
            aktivitas = konversi_aktivitas(aktivitas_input)
            break
        except ValueError as e:
            print(e)

    # Proses perhitungan
    bmi = hitung_bmi(bb, tb)
    bmr = hitung_bmr(bb, tb, usia, kelamin)
    klasifikasi = klasifikasi_bmi(bmi)
    kalori_harian = hitung_kalori(bmr, aktivitas, klasifikasi)

    return {
        "jenis_kelamin": kelamin.capitalize(),
        "usia": usia,
        "berat_badan": bb,
        "tinggi_badan": tb,
        "bmi": bmi,
        "bmr": bmr,
        "klasifikasi": klasifikasi,
        "kalori_harian": kalori_harian
    }
