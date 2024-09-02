
import yfinance as yf
import pandas as pd
import time
from datetime import datetime, timedelta
import pytz
import holidays
import pymysql

# 금 선물 티커 심볼 (Gold Futures)
gold_ticker = "GC=F"

# 시간대 설정
KST = pytz.timezone('Asia/Seoul')
US_Eastern = pytz.timezone('America/New_York')

# MySQL 데이터베이스 설정
db_config = {
    'host': 'localhost',         # MySQL 서버 호스트
    'user': 'ssafy',      # MySQL 사용자명
    'password': 'ssafy',  # MySQL 비밀번호
    'database': 'testdb2'   # MySQL 데이터베이스 이름
}

# 거래 시간 설정 (한국 시간 기준)
def get_market_hours(current_time):
    if is_daylight_saving_time(current_time.astimezone(US_Eastern)):
        # 서머타임 적용 시 (EDT)
        open_hour_kst = 7
        close_hour_kst = 6
    else:
        # 서머타임 미적용 시 (EST)
        open_hour_kst = 8
        close_hour_kst = 7
    
    return open_hour_kst, close_hour_kst

# 서머타임 여부 확인 함수
def is_daylight_saving_time(current_time):
    return bool(current_time.dst())

# 공휴일 확인 함수
def is_holiday(date):
    us_holidays = holidays.US(years=date.year)
    return date in us_holidays

# 데이터베이스 연결 함수
def get_db_connection():
    return pymysql.connect(
        host=db_config['host'],
        user=db_config['user'],
        password=db_config['password'],
        database=db_config['database']
    )

# 데이터베이스에 데이터 저장 함수 (date와 close만)
def save_to_database(data):
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            for timestamp, row in data[['Close']].iterrows():
                close_price = row['Close']
                
                sql = """
                INSERT INTO gold_data (date, close)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE
                    close = VALUES(close)
                """
                cursor.execute(sql, (timestamp, close_price))
            connection.commit()
    finally:
        connection.close()

# 기존 데이터를 불러오기 (파일이 존재하는 경우)
try:
    existing_data = pd.read_csv('gold_data_1min.csv', index_col=0, parse_dates=True)
except FileNotFoundError:
    existing_data = pd.DataFrame()

# 데이터 업데이트 함수
def update_data():
    global existing_data
    new_data = yf.download(gold_ticker, period="1d", interval="1m")
    
    # 데이터의 시간대를 미국 동부 시간에서 한국 시간으로 변환
    if new_data.index.tzinfo is None:
        new_data.index = new_data.index.tz_localize('America/New_York').tz_convert(KST)
    else:
        new_data.index = new_data.index.tz_convert(KST)
    
    #기존csv데이터와 가져온 데이터 비교해서 없는것만 데이터베이스에 저장. 
    existing_data = pd.concat([existing_data, new_data]).drop_duplicates()

    #csv에 저장.
    existing_data.to_csv('gold_data_1min.csv')
    
    # 데이터베이스에 저장 (date와 close만)
    save_to_database(existing_data[['Close']])
    
    print(f"데이터가 업데이트되었습니다. 마지막 데이터: \n{existing_data.tail()}")

# 거래 시간 알림 함수
def notify_trading_start(open_hour_kst):
    print(f"거래가 시작되었습니다. ({open_hour_kst} KST) 데이터 업데이트를 시작합니다.")

def notify_trading_pause():
    print("현재 거래 중단 시간입니다. 거래가 재개될 때까지 기다립니다.")

def notify_trading_end(close_hour_kst):
    print(f"거래가 종료되었습니다. ({close_hour_kst} KST) 거래 중단 시간이 시작됩니다.")

def notify_holiday():
    print("오늘은 미국 공휴일입니다. 거래가 진행되지 않습니다.")

# 거래 시간 확인 함수
def is_market_open(current_time):
    local_time = current_time.astimezone(KST)
    open_hour_kst, close_hour_kst = get_market_hours(current_time)
    current_hour = local_time.hour
    
    # 거래 시간 범위 계산
    if open_hour_kst <= current_hour < 24 or current_hour < close_hour_kst:
        return True
    return False

# 거래 중단 시간 알림 설정
last_notify_holiday = False
last_notify_pause = False

# 반복적으로 데이터 업데이트 및 거래 시간 체크
while True:
    now = datetime.now(pytz.utc)
    local_time = now.astimezone(KST)
    edt_time = now.astimezone(US_Eastern)

    # 거래 시간 설정
    open_hour_kst, close_hour_kst = get_market_hours(now)

    print(f"현재 한국 시간: {local_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"현재 미국 동부 시간 (EDT): {edt_time.strftime('%Y-%m-%d %H:%M:%S')}")

    # 공휴일 확인
    if is_holiday(edt_time.date()):
        if not last_notify_holiday:
            notify_holiday()
            last_notify_holiday = True
        last_notify_pause = False
    else:
        last_notify_holiday = False
        #시간 확인
        if is_market_open(now):
            update_data()
            notify_trading_start(open_hour_kst)
            last_notify_pause = False
        else:
            if not last_notify_pause:
                notify_trading_pause()
                last_notify_pause = True

    # 1분 후 다시 확인
    time.sleep(60)
