import pandas as pd
import numpy as np
import random
import matplotlib.pyplot as plt

# 더 많은 데이터를 위한 예시 리스트 생성
num_data_points = 10002
start_date = '2022-01-01'
end_date = '2022-12-31'

# start_date와 end_date 사이의 날짜를 생성하여 리스트에 추가
data = [pd.Timestamp(start_date) + pd.Timedelta(days=random.randint(0, 365)) for _ in range(num_data_points)]

# 리스트를 DataFrame으로 변환
df = pd.DataFrame({'date_strings': data})

# 문자열 형식인 날짜를 datetime 형식으로 변환
df['dates'] = pd.to_datetime(df['date_strings'])

# 새로운 figure 생성
plt.figure(figsize=(10, 6))

# 히스토그램 그리기
plt.hist(df['dates'], bins=30, color='skyblue', edgecolor='black')
plt.title('날짜 데이터 분포')
plt.xlabel('날짜')
plt.ylabel('빈도')
plt.xticks(rotation=45)
plt.grid(True)
plt.show()