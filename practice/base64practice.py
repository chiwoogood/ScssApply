import base64






# 문자열을 Base64로 인코딩
original_string = "Hello, World!"
encoded_string = base64.b64encode(original_string.encode('utf-8'))
print("Encoded string:", encoded_string)

# Base64로 인코딩된 데이터를 디코딩
decoded_string = base64.b64decode(encoded_string).decode('utf-8')
print("Decoded string:", decoded_string)