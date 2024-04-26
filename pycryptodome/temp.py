import time
import datetime

import socket
import pymysql

import base64
from Crypto import Random
from Crypto.Cipher import AES

###############################################################################################
# Database 암호화
###############################################################################################
BS = 16 # Block Size가 16바이트. AES가 128, 192 또는 256비트의 키를 사용하더라도 블록 크기가 128비트로 고정되어 있음을 의미한다.

pad = lambda s: s + (BS - len(s.encode('utf-8')) % BS) * chr(BS - len(s.encode('utf-8')) % BS)
unpad = lambda s : s[:-ord(s[len(s)-1:])]
# pad함수와 unpad함수는 AES 알고리즘의 블록 사이즈에 맞추기 위한 함수이다. 블록크기를 맞춰줘야 암호화 및 복호화를 할 수 있기 때문에 쓸 모 없는 데이터들을 추가하기도 한다.

class AESCipher:
    def __init__( self, key ):
        self.key = key

    def encrypt( self, raw ):
        raw = pad(raw)
        iv = Random.new().read( AES.block_size )  
        cipher = AES.new( self.key, AES.MODE_CBC, iv )
        return base64.b64encode( iv + cipher.encrypt( raw.encode('utf-8') ) )

    def decrypt( self, enc ):
        enc = base64.b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv )
        return unpad(cipher.decrypt( enc[16:] ))




###############################################################################################
# read_PLC
###############################################################################################
def read_PLC():    # socket & PLC device 통신, 받아온 데이터 분할, 
    try:
        HOST = '192.168.3.250' # 해당 PLC
        PORT = 6000 # 해당 PORT
        ADDR = (HOST, PORT) # 주소(IP,PORT)

        client = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # TCP 소켓 객체 생성 IPv4
        client.settimeout(1) # 타임 아웃 시간 1초
        client.connect(ADDR) # 해당 PLC 주소에 연결

        msg = 'SD' 
        client.send(msg.encode('ascii')) # 'SD'라는 문자열 데이터를 PLC에 전송하고 응답을 기다림

        # print(msg)
        # print(msg.encode('ascii'))
        read_data = client.recv(1024).decode('ascii').split('#') # 최대 1024바이트의 아스키코드 응답을 받고 '#'을 기준으로 문자열로 데이터를 받겠다.
        
        data_device_info = read_data[0].split(',')
        data_inlet = read_data[1]
        data_outlet = read_data[2]
        data_room = read_data[3]
        data_sampling_time = read_data[4]

        # data_device_info 데이터 분할
        date_info = data_device_info[0]
        time_info = data_device_info[1]
        serial_info = data_device_info[2]

        # data_inlet 데이터 분할
        data_inlet_parse = data_inlet.split(',')
        EC_input = data_inlet_parse[1].split(':')[1]
        pH_input = data_inlet_parse[2].split(':')[1]
        TURBIDITY_input = data_inlet_parse[3].split(':')[1]
        FCL_input = data_inlet_parse[4].split(':')[1]
        TEMP_input = data_inlet_parse[6].split(':')[1]
        TDS_input = data_inlet_parse[5].split(':')[1]

        # data_outlet 데이터 분할
        data_outlet_parse = data_outlet.split(',')
        EC_output = data_outlet_parse[1].split(':')[1]
        pH_output = data_outlet_parse[2].split(':')[1]
        TURBIDITY_output = data_outlet_parse[3].split(':')[1]
        FCL_output = data_outlet_parse[4].split(':')[1]
        TEMP_output = data_outlet_parse[6].split(':')[1]
        TDS_output = data_outlet_parse[5].split(':')[1]

        # data_room 데이터 분할
        data_room_parse = data_room.split(',') 
        room_temp = data_room_parse[1].split(':')[1]
        room_hum = data_room_parse[2].split(':')[1]

        sampling_time = data_sampling_time.split(':')[1]

        result = [date_info, time_info, serial_info, 
                EC_input, pH_input, TURBIDITY_input, FCL_input, TEMP_input, TDS_input, 
                EC_output, pH_output, TURBIDITY_output, FCL_output, TEMP_output, TDS_output, 
                room_temp, room_hum, sampling_time]
        

        # date_info: PLC에서 받아온 장치 정보의 날짜
        # time_info: PLC에서 받아온 장치 정보의 시간
        # serial_info: PLC에서 받아온 장치의 시리얼 번호
        # EC_input: PLC에서 받아온 입구의 전기전도도(EC) 값
        # pH_input: PLC에서 받아온 입구의 pH 값
        # TURBIDITY_input: PLC에서 받아온 입구의 탁도 값
        # FCL_input: PLC에서 받아온 입구의 염소 농도 값
        # TEMP_input: PLC에서 받아온 입구의 온도 값
        # TDS_input: PLC에서 받아온 입구의 TDS(Total Dissolved Solids) 값총용존고형물 (양이온 + 음이온)
        # EC_output: PLC에서 받아온 출구의 전기전도도(EC) 값
        # pH_output: PLC에서 받아온 출구의 pH 값
        # TURBIDITY_output: PLC에서 받아온 출구의 탁도 값
        # FCL_output: PLC에서 받아온 출구의 염소 농도 값
        # TEMP_output: PLC에서 받아온 출구의 온도 값
        # TDS_output: PLC에서 받아온 출구의 TDS(Total Dissolved Solids) 값
        # room_temp: PLC에서 받아온 방의 온도 값
        # room_hum: PLC에서 받아온 방의 습도 값
        # sampling_time: PLC에서 받아온 데이터의 샘플링 시간





        connection = "OK"
        print(connection)

    except Exception as e:
        KST = datetime.timezone(datetime.timedelta(hours=0))
        now = datetime.datetime.now(datetime.timezone.utc)

        occurrence_datetime = datetime.datetime(now.year, now.month, now.day, int(now.hour) + 9, now.minute, tzinfo = KST)
        create_datetime = datetime.datetime(now.year, now.month, now.day, int(now.hour) + 9, now.minute, now.second, tzinfo = KST)

        date = str(create_datetime)[0:10]
        time = str(create_datetime)[11:19]

        result = [date, time, '1', 
                200, 7, 0.2, 2, 11, 100, 
                219, 7.1, 0.21, 2.5, 11, 110, 
                13, 14, 60]        
        connection = "OK"
        print(connection)

    return result, connection
    # result = [date_info, time_info, serial_info, 
    #         EC_input, pH_input, TURBIDITY_input, FCL_input, TEMP_input, TDS_input, 
    #         EC_output, pH_output, TURBIDITY_output, FCL_output, TEMP_output, TDS_output, 
    #         room_temp, room_hum, sampling_time]
    # connection = 연결정보


# #############################################################################################
# # get_loc_id
# #############################################################################################
# def get_loc_id(conn_local, cur_local):
#     try:
#         #############################################################################################
#         # 로컬 데이터베이스에서 기존 loc_id 가져오기
#         #############################################################################################
#         sql_command = '''CREATE TABLE if not EXISTS loc_id (
#             id bigint AUTO_INCREMENT NOT NULL,

#             loc_id VARCHAR(200) NOT NULL DEFAULT '-',
#             create_datetime DATETIME,

#             PRIMARY KEY (id)
#             );'''

#         cur_local.execute(sql_command)

#         sql_command = "SELECT * FROM loc_id where loc_id=%s;"
#         cur_server.execute(sql_command, loc_id)
#         sql_info = cur_server.fetchall()

#         # sql_command = "INSERT INTO loc_id "
#         # sql_command = sql_command + '''(loc_id, create_datetime) VALUES(%s, %s);'''

#         return loc_id

#     except Exception as e:
#         print(e)
#         print("get_loc_name error")

#############################################################################################
# get_loc_name
#############################################################################################
def get_loc_name(conn_server, cur_server, loc_id):   # cur_server 이용하여, loc_id 맞으면 loc_name return 
    try:
        #############################################################################################
        # 서버에서 설치 장소 정보 가져오기
        #############################################################################################
        # loc_id = read_PLC_data[2]
        # loc_id_alive = serial_info

        # cur_server 커서 객체의 execute() 메서드를 사용하여 쿼리를 실행하고 loc_id 매개 변수를 전달합니다. 
        # 결과는 fetchall() 메서드를 사용하여 검색되며, 결과는 sql_info 변수에 저장됩니다.
        sql_command = "SELECT * FROM main_installed_location where loc_id=%s;"   
        cur_server.execute(sql_command, loc_id)
        sql_info = cur_server.fetchall()

        if len(sql_info) > 0:
            loc_name = sql_info[0][3]
        else:
            loc_name = "Installed_location 설정 오류"

        return loc_name

    except Exception as e:
        print(e)
        print("get_loc_name error")


###############################################################################################
### database
###############################################################################################
# Database 열기, device_info 테이블 가져오기, Alive 테이블 삽입 & 신호 보내기, 
# get_loc_name()로 loc_name 가져오기,
# local에 저장하기, water_data 테이블 없으면 생성하고 있으면 insert, is_encoded, is_merge (로컬에서 저장하는 건가요??? ,  )
# device info 갱신하기  # 테이블 내 데이터 전체 삭제  (왜 삭제햐야 하나?)
def database(): 
    try:
        #############################################################################################
        # Database 열기
        #############################################################################################
        conn_local = pymysql.connect(
            # host = '192.168.3.4',     # 서버의 아이피 
            host = 'localhost',     # 서버의 아이피 
            user = 'root',          # 서버 데이터 베이스의 아이디
            password = 'kvfsydlf',  # 서버 데이터 베이스의 암호
            db = 'pure_water',)     # 데이터 베이스 이름

        conn_server = pymysql.connect(
            # host = '49.50.166.29',     # 서버의 아이피 
            host = 'localhost',     # 서버의 아이피 
            user = 'root',          # 서버 데이터 베이스의 아이디
            password = 'kvfsydlf',  # 서버 데이터 베이스의 암호
            db = 'pure_water',)     # 데이터 베이스 이름


        cur_local = conn_local.cursor()  # 데이터베이스 연결 객체의 cursor() 메소드를 호출
        cur_server = conn_server.cursor()
        ###############################################################################################
        # device_info 테이블 가져오기
        ###############################################################################################
        # print('테이블 생성')
        sql_command = '''CREATE TABLE if not EXISTS device_info (
            id bigint AUTO_INCREMENT NOT NULL,
            loc_id VARCHAR(200) NOT NULL DEFAULT '0',
            loc_name VARCHAR(200) NOT NULL DEFAULT 'noname',
            connection VARCHAR(200) NOT NULL DEFAULT 'NG',
            hour_count VARCHAR(200) NOT NULL DEFAULT '0',
            sampling_time VARCHAR(200) NOT NULL DEFAULT '0',
            PRIMARY KEY (id)
            );'''

        cur_local.execute(sql_command)

        sql_command = "SELECT * FROM device_info;"
        cur_local.execute(sql_command)
        sql_info = cur_local.fetchall()

        if len(sql_info) > 0:
            loc_id = sql_info[len(sql_info) - 1][1]
            loc_name = sql_info[len(sql_info) - 1][2]
            connection = sql_info[len(sql_info) - 1][3]
            last_hour_count = int(sql_info[len(sql_info) - 1][4])
            sampling_time = int(sql_info[len(sql_info) - 1][5])
        else:
            loc_id = "0"
            loc_name = "noname"
            connection = "OK"
            last_hour_count = 0
            sampling_time = 60

        time_number = time.time()
        minute_count = int(time_number / 60)
        hour_count = int((time_number / 3600) % 24 + 9)

        #############################################################################################
        # Alive 신호 보내기
        #############################################################################################
        table_name = 'main_alive_connection'
        sql_command = "INSERT INTO %s " % (table_name)
        sql_command = sql_command + '''(loc_id, loc_name, connection_status, create_datetime) VALUES(%s, %s, %s, %s);'''

        KST = datetime.timezone(datetime.timedelta(hours=0))
        now = datetime.datetime.now(datetime.timezone.utc)
        create_datetime = datetime.datetime(now.year, now.month, now.day, now.hour, now.minute, now.second, tzinfo = KST)
        create_datetime = create_datetime - datetime.timedelta(hours=0)

        cur_server.execute(sql_command, (loc_id, loc_name, connection, create_datetime))
        conn_server.commit()

        print("alive signal")

        #############################################################################################
        # PLC 통신
        #############################################################################################
        read_PLC_data, connection = read_PLC()



        #############################################################################################
        # PLC 연결 됐으면, 시간 생성, 15개 센서 데이터 셋팅
        #############################################################################################
        if connection == "OK":
            #############################################################################################
            # 시간 생성
            #############################################################################################
            KST = datetime.timezone(datetime.timedelta(hours=0))
            # now = datetime.datetime.now(datetime.timezone.utc)

            # occurrence_datetime = datetime.datetime(now.year, now.month, now.day, now.hour, now.minute, tzinfo = KST)
            # create_datetime = datetime.datetime(now.year, now.month, now.day, now.hour, now.minute, now.second, tzinfo = KST)

            occurrence_datetime = datetime.datetime(int(read_PLC_data[0].split('-')[0]), int(read_PLC_data[0].split('-')[1]), int(read_PLC_data[0].split('-')[2]), int(read_PLC_data[1].split(':')[0]), int(read_PLC_data[1].split(':')[1]), int(read_PLC_data[1].split(':')[2]))
            create_datetime = datetime.datetime(int(read_PLC_data[0].split('-')[0]), int(read_PLC_data[0].split('-')[1]), int(read_PLC_data[0].split('-')[2]), int(read_PLC_data[1].split(':')[0]), int(read_PLC_data[1].split(':')[1]), int(read_PLC_data[1].split(':')[2]))

            occurrence_datetime = occurrence_datetime - datetime.timedelta(hours=9)
            create_datetime = create_datetime - datetime.timedelta(hours=9)

            #############################################################################################
            # 데이터 셋팅
            #############################################################################################
            # date_info = read_PLC_data[0]
            # time_info = read_PLC_data[1]
            loc_id = read_PLC_data[2]

            EC_input = read_PLC_data[3]
            pH_input = read_PLC_data[4]
            TURBIDITY_input = read_PLC_data[5]
            FCL_input = read_PLC_data[6]
            TEMP_input = read_PLC_data[7]
            TDS_input = read_PLC_data[8]

            EC_output = read_PLC_data[9]
            pH_output = read_PLC_data[10]
            TURBIDITY_output = read_PLC_data[11]
            FCL_output = read_PLC_data[12]
            TEMP_output = read_PLC_data[13]
            TDS_output = read_PLC_data[14]

            room_temp = read_PLC_data[15]
            room_hum = read_PLC_data[16]

            sampling_time = read_PLC_data[17]

            # print('database connent')   

            #############################################################################################
            # loc_name 가져오기
            #############################################################################################
            loc_name = get_loc_name(conn_server, cur_server, loc_id)


            ###############################################################################################
            # local에 저장하기, water_data 테이블 없으면 생성하고 있으면 insert, is_encoded, is_merge (로컬에서 저장하는 건가요??? ,  )
            ###############################################################################################
            # print('테이블 생성')
            sql_command = '''CREATE TABLE if not EXISTS water_data (
                id bigint AUTO_INCREMENT NOT NULL,

                EC_input VARCHAR(200) NOT NULL DEFAULT '-',
                EC_output VARCHAR(200) NOT NULL DEFAULT '-',

                pH_input VARCHAR(200) NOT NULL DEFAULT '-',
                pH_output VARCHAR(200) NOT NULL DEFAULT '-',

                FCL_input VARCHAR(200) NOT NULL DEFAULT '-',
                FCL_output VARCHAR(200) NOT NULL DEFAULT '-',

                TURBIDITY_input VARCHAR(200) NOT NULL DEFAULT '-',
                TURBIDITY_output VARCHAR(200) NOT NULL DEFAULT '-',

                TEMP_input VARCHAR(200) NOT NULL DEFAULT '-',
                TEMP_output VARCHAR(200) NOT NULL DEFAULT '-',

                TDS_input VARCHAR(200) NOT NULL DEFAULT '-',
                TDS_output VARCHAR(200) NOT NULL DEFAULT '-',

                room_temp VARCHAR(200) NOT NULL DEFAULT '-',
                room_hum VARCHAR(200) NOT NULL DEFAULT '-',

                minute_count INT NOT NULL DEFAULT 0,
                hour_count INT NOT NULL DEFAULT 0,
                is_new_hour BOOLEAN NOT NULL DEFAULT 0,

                loc_id VARCHAR(200) NOT NULL DEFAULT '-',
                loc_name VARCHAR(200) NOT NULL DEFAULT '-',

                is_encoded BOOLEAN NOT NULL DEFAULT 0,
                is_merged BOOLEAN NOT NULL DEFAULT 0,

                occurrence_datetime DATETIME,
                create_datetime DATETIME,

                PRIMARY KEY (id)
                );'''

            

            cur_local.execute(sql_command)

            # print('테이블 생성 완료')

            sql_command = "INSERT INTO water_data "
            sql_command = sql_command + '''(EC_input, EC_output, 
                                            pH_input, pH_output, 
                                            FCL_input, FCL_output, 
                                            TURBIDITY_input, TURBIDITY_output, 
                                            TEMP_input, TEMP_output, 
                                            TDS_input, TDS_output, 
                                            room_temp, room_hum,
                                            minute_count, hour_count, is_new_hour,
                                            loc_id, loc_name, 
                                            is_encoded, is_merged,
                                            occurrence_datetime, create_datetime) 
                                            VALUES(%s, %s, %s, %s, %s, 
                                            %s, %s, %s, %s, %s, 
                                            %s, %s, %s, %s, %s, 
                                            %s, %s, %s, %s, %s, 
                                            %s, %s, %s);'''




            if last_hour_count != hour_count:
                is_new_hour = True
            else:
                is_new_hour = False

            key = [0x10, 0x01, 0x15, 0x1B, 0xA1, 0x11, 0x57, 0x72, 0x6C, 0x21, 0x56, 0x57, 0x62, 0x16, 0x05, 0x3D,
                    0xFF, 0xFE, 0x11, 0x1B, 0x21, 0x31, 0x57, 0x72, 0x6B, 0x21, 0xA6, 0xA7, 0x6E, 0xE6, 0xE5, 0x3F]

            # data = "Iran has seized a foreign oil tanker in the Persian Gulf that was smuggling fuel to some Arab states, according to a state television report on Sunday. The report said that the tanker had been detained and the ship's foreign crew held by the country's elite Islamic Revolutionary Guards Corps."

            is_encoded = True
            is_merged = False

            # cur.execute(sql_command, (cd_input, cd_output, ph_input, ph_output, rc_input, 
            #                             rc_output, tb_input, tb_output, te_input, te_output, 
            #                             td_input, td_output, room_temp, room_hum, 
            #                             new_time_count, loc_id, loc_name, is_encode, occurrence_datetime, create_datetime))

            # cur_local는 데이터베이스 연결 객체의 cursor() 메서드를 호출하여 데이터베이스에 대한 로컬 커서(cur_local)를 생성
            # cur_local.execute() 암호화 실행
            cur_local.execute(sql_command, (AESCipher(bytes(key)).encrypt(str(EC_input)), AESCipher(bytes(key)).encrypt(str(EC_output)),
                                        AESCipher(bytes(key)).encrypt(str(pH_input)), AESCipher(bytes(key)).encrypt(str(pH_output)),
                                        AESCipher(bytes(key)).encrypt(str(FCL_input)), AESCipher(bytes(key)).encrypt(str(FCL_output)),
                                        AESCipher(bytes(key)).encrypt(str(TURBIDITY_input)), AESCipher(bytes(key)).encrypt(str(TURBIDITY_output)),
                                        AESCipher(bytes(key)).encrypt(str(TEMP_input)), AESCipher(bytes(key)).encrypt(str(TEMP_output)),
                                        AESCipher(bytes(key)).encrypt(str(TDS_input)), AESCipher(bytes(key)).encrypt(str(TDS_output)),
                                        AESCipher(bytes(key)).encrypt(str(room_temp)), AESCipher(bytes(key)).encrypt(str(room_hum)),
                                        minute_count, hour_count, is_new_hour, loc_id, loc_name, is_encoded, is_merged, occurrence_datetime, create_datetime))


            conn_local.commit()


            #############################################################################################
            # sqlite에 데이터가 있으면 서버로 보내기  (??) # fetchall() 메소드는 모든 검색결과를 가져와서 리스트 형태로 반환한다. 
            # 반환된 리스트를 갖고 main_water_quality_private_data 테이블에 insert
            #############################################################################################
            sql_command = "SELECT * FROM water_data;"
            cur_local.execute(sql_command)
            sql_info = cur_local.fetchall()  # fetchall() 메소드는 모든 검색결과를 가져와서 리스트 형태로 반환한다.  


            for sql_data in sql_info:
                EC_input = sql_data[1]
                EC_output = sql_data[2]

                pH_input = sql_data[3]
                pH_output = sql_data[4]

                FCL_input = sql_data[5]
                FCL_output = sql_data[6]

                TURBIDITY_input = sql_data[7]
                TURBIDITY_output = sql_data[8]

                TEMP_input = sql_data[9]
                TEMP_output = sql_data[10]

                TDS_input = sql_data[11]
                TDS_output = sql_data[12]

                room_temp = sql_data[13]
                room_hum = sql_data[14]

                minute_count = sql_data[15]
                hour_count = sql_data[16]
                is_new_hour = sql_data[17]

                loc_id = sql_data[18]
                loc_name = sql_data[19]

                is_encoded = sql_data[20]
                is_merged = sql_data[21]

                occurrence_datetime = sql_data[22]
                create_datetime = sql_data[23]

                table_name = 'main_water_quality_private_data'

                sql_command = "INSERT INTO %s " % (table_name)
                sql_command = sql_command + '''(EC_input, EC_output, 
                                                pH_input, pH_output, 
                                                FCL_input, FCL_output, 
                                                TURBIDITY_input, TURBIDITY_output, 
                                                TEMP_input, TEMP_output, 
                                                TDS_input, TDS_output, 
                                                room_temp, room_hum,
                                                minute_count, hour_count, is_new_hour, 
                                                loc_id, loc_name, 
                                                is_encoded, is_merged,
                                                occurrence_datetime, create_datetime) 
                                                VALUES(%s, %s, %s, %s, %s, 
                                                %s, %s, %s, %s, %s, 
                                                %s, %s, %s, %s, %s, 
                                                %s, %s, %s, %s, %s,
                                                %s, %s, %s);'''

                cur_server.execute(sql_command, (EC_input, EC_output, pH_input, pH_output, FCL_input, 
                                            FCL_output, TURBIDITY_input, TURBIDITY_output, TEMP_input, TEMP_output, 
                                            TDS_input, TDS_output, room_temp, room_hum, 
                                            minute_count, hour_count, is_new_hour, loc_id, loc_name, 
                                            is_encoded, is_merged, occurrence_datetime, create_datetime))

                conn_server.commit()  # 서버 데이터베이스 열 때 필요한 정보, 커밋 

                #############################################################################################
                # 보낸 데이터 지우기
                #############################################################################################
                sql_command = "DELETE FROM water_data WHERE id=%s;" % (sql_data[0])
                cur_local.execute(sql_command)
                # sql_info = cur_local.fetchall()
                conn_local.commit()

                print("database complete")



        #############################################################################################
        # device info 갱신하기  
        #############################################################################################
        sql_command = "DELETE FROM device_info;" # 테이블 내 데이터 전체 삭제  (왜 삭제햐야 하나?)
        cur_local.execute(sql_command)
        # sql_info = cur_local.fetchall()

        sql_command = "INSERT INTO device_info (loc_id, loc_name, connection, hour_count, sampling_time) VALUES(%s, %s, %s, %s, %s);"
        cur_local.execute(sql_command, (loc_id, loc_name, connection, hour_count, sampling_time))
        conn_local.commit()

        #############################################################################################
        # 데이터 베이스 종료
        #############################################################################################
        conn_local.close()
        conn_server.close()

        time.sleep(int(sampling_time))

    except Exception as e:
        print(e)
        print("database error")

###############################################################################################
### main
###############################################################################################
if __name__ == '__main__':
    isRunning = True

    while isRunning:
        try:
            database()

        except KeyboardInterrupt:
            isRunning = False

        except Exception as e:
            print(e)
            print("main error")
            # key = [0x10, 0x01, 0x15, 0x1B, 0xA1, 0x11, 0x57, 0x72, 0x6C, 0x21, 0x56, 0x57, 0x62, 0x16, 0x05, 0x3D,
            #         0xFF, 0xFE, 0x11, 0x1B, 0x21, 0x31, 0x57, 0x72, 0x6B, 0x21, 0xA6, 0xA7, 0x6E, 0xE6, 0xE5, 0x3F]

            # data = "Iran has seized a foreign oil tanker in the Persian Gulf that was smuggling fuel to some Arab states, according to a state television report on Sunday. The report said that the tanker had been detained and the ship's foreign crew held by the country's elite Islamic Revolutionary Guards Corps."

            # encrypted_data = AESCipher(bytes(key)).encrypt(data)  
            # print(encrypted_data)

            # decrypted_data = AESCipher(bytes(key)).decrypt(encrypted_data)
            # a = decrypted_data.decode('utf-8')
            # print(a)