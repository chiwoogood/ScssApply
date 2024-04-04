# import threading
# import time

# # 각 스레드에서 실행할 함수
# def print_numbers():
#     for i in range(100):
#         print(f"Thread {threading.current_thread().name}: {i}")
#         time.sleep(1)  # 1초간 대기

# # 메인 스레드
# if __name__ == "__main__":
#     # 스레드 생성
#     thread1 = threading.Thread(target=print_numbers, name="Thread-1")
#     thread2 = threading.Thread(target=print_numbers, name="Thread-2")

#     # 스레드 시작
#     thread1.start()
#     thread2.start()

#     # 메인 스레드에서도 일을 할 수 있음
#     for i in range(100):
#         print(f"Main Thread: {i}")
#         time.sleep(1)

#     # 모든 스레드가 실행을 마칠 때까지 대기
#     thread1.join()
#     thread2.join()

#     print("모든 스레드 실행이 완료되었습니다.")


import threading
import time

# 각 스레드에서 실행할 함수
def print_numbers():
    for i in range(5):
        print("hoho")
        time.sleep(1)  # 1초간 대기

# 메인 스레드
if __name__ == "__main__":
    # 스레드 생성
    thread1 = threading.Thread(target=print_numbers)
    thread2 = threading.Thread(target=print_numbers)

    # 스레드 시작
    thread1.start()
    thread2.start()

    # 메인 스레드에서도 일을 할 수 있음
    for i in range(5):
        print(f"Main Thread: {i}")
        time.sleep(1)

    # 모든 스레드가 실행을 마칠 때까지 대기
    thread1.join()
    thread2.join()

    print("모든 스레드 실행이 완료되었습니다.")