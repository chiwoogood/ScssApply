from datetime import datetime

# 오늘의 날짜 구하기
today = datetime.today().strftime('%Y%m%d')

print(today)

response = {
  "response": {
    "header": {
      "resultCode": "00",
      "resultMsg": "NORMAL_SERVICE"
    },
    "body": {
      "dataType": "JSON",
      "items": {
        "item": [
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "PTY",
            "nx": 55,
            "ny": 127,
            "obsrValue": "0"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "REH",
            "nx": 55,
            "ny": 127,
            "obsrValue": "98"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "RN1",
            "nx": 55,
            "ny": 127,
            "obsrValue": "0"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "T1H",
            "nx": 55,
            "ny": 127,
            "obsrValue": "1.9"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "UUU",
            "nx": 55,
            "ny": 127,
            "obsrValue": "-0.3"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "VEC",
            "nx": 55,
            "ny": 127,
            "obsrValue": "63"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "VVV",
            "nx": 55,
            "ny": 127,
            "obsrValue": "-0.1"
          },
          {
            "baseDate": "20240327",
            "baseTime": "0600",
            "category": "WSD",
            "nx": 55,
            "ny": 127,
            "obsrValue": "0.4"
          }
        ]
      },
      "pageNo": 1,
      "numOfRows": 8,
      "totalCount": 8
    }
  }
}