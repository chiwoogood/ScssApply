import requests
import json

# def main():
#     try:
#         # 환경 빅데이터 Open API 호출 정보 설정
#         apiURL = "https://www.bigdata-environment.kr/user/openapi/api.call.do"   # API 호출 url 주소를 지정합니다.
#         apiKey = "4DC661DBEACB476788940B2CFD601F1F" # API 신청 후 관리자로 부터 발급받은 키를 입력합니다.
#         # start = "1"         # 페이지 번호
#         # display = "10"      # 출력 건수
#         sort = "A"


#         # API 호출
#         headers = {'Content-Type': 'application/json'}  # JSON 형식으로 요청합니다.
#         urlParameters = {"apiKey": apiKey, "start": start, "display": display, "sort": sort, "params": encoded_params}
        
#         # 호출 Header 정보를 설정합니다.
#         response = requests.post(apiURL, headers=headers, data=json.dumps(urlParameters))

#         # 응답 정보를 확인합니다.
#         print("POST request to URL:", response.url)
#         print("Response Code:", response.status_code)

#         # 응답 정보를 이용해 데이터를 사용합니다.
#         if response.status_code == 200:
#             print(response.json())  # JSON 형식으로 응답을 출력합니다.
#         else:
#             print("Error:", response.text)  # 에러 메시지를 출력합니다.

#     except Exception as e:
#         print(e)

# if __name__ == "__main__":
#     main()


# 딕셔너리 객체
temp = {"Name": "chiwoo", "Age": 29, "Gender": "M"}

# 딕셔너리 객체 출력
print("첫 번째 출력:", temp)

# json.dumps()를 사용하여 JSON 형식으로 직렬화
json_string = json.dumps(temp)

# 직렬화된 JSON 문자열 출력
print("두 번째 출력:", json_string)

