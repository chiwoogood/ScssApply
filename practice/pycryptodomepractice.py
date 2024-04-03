from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad

# 키 생성
key = get_random_bytes(16)  # 16바이트 키 생성 (AES-128)

# 암호화할 데이터
data = b'Hello, World!'

# AES 암호화
cipher = AES.new(key, AES.MODE_CBC)
ct_bytes = cipher.encrypt(pad(data, AES.block_size))

# 암호문 출력
print("암호문:", ct_bytes)

# 암호문 복호화
cipher = AES.new(key, AES.MODE_CBC, iv=cipher.iv)  # 암호문에서 초기화 벡터를 추출하여 사용
pt_bytes = unpad(cipher.decrypt(ct_bytes), AES.block_size)

# 복호화된 데이터 출력
print("복호화된 데이터:", pt_bytes.decode())


