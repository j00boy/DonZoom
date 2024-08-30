# Database

## 데이터 모델링

현실 세게에 존재하는 모든 것을

제한된 공간에 데이터를 효과적으로 담아내는 방법을 추상화하는것

추상적이고 단순하지만 명확해야함

데이터 모델링 3가지 관점

- 데이터
- 프로세스
- 데이터-프로세스

## 개념적, 논리적, 물리적 모델링

개념적 → 논리적 → 물리적 

개념적 모델링

- 엔티티, 속성, 식별자,관계
- 추상화 수준이 가장 높은 과정

논리적 모델링

- 테이블, 컬럼, 기본키, 외래키
- 실제의 스키마로 변환하는 과정. 정규화 진행
- 재사용성이 높음

물리적 모델링

- 스키마를 DBMS 정보로 변환/정의
- 제약 조건, 데이터 유형과 크기

## 좋은 데이터 모델

- 완전성
- 중복 배제
- 업무 규칙
- 데이터 재사용
- 의사소통
- 통합성

## 다이어그램

## ERD

- 개념적 모델링을 직관적으로 이해하는데 많은 도움

## 엔티티와 속성

엔티티 : 현실 개체를 저장할 수 있고 변별이 가능한 사물

속성 : 엔티티내에 공통적으로 가지는 특성

인스턴스 : 실제 존재하는 객체

### 엔티티의 분류

유 무형으로 분류

- 유형, 무형, 사건

발생 시점의 분류

- 기본, 중심, 행위

## 도메인

- 속성의 범위

## 관계와 식별자

식별자

- 유일하게 식별해주는 속성

식별관계

- 부모의 기본 키나 유니크 키를 자식의 기본 키로 사용
- ERD에서 실선으로 표시

비식별 관계

- 부모의 기본 키나 유니크 키를 자식의 외래 키로 사용
- ERD에서 점선으로 표시

### 식별 관계 표현법

연결선 양쪽에 | 가 있으면 IE, 아니면 Barker

- IE
    - 의존관게는 O(의존하지 않음)
    - 식별자 상속은 실선으로
- Barker
    - 의존관계는 점선(의존하지 않음)
    - 식별자 상속은 세로선으로

## 이상 현상과 정규화

- 삭제이상 입력이상 수정이상
- 조회X

## 정규화

1. 제1정규화
    - 각 레코드의 하나의 속성에는 하나의 값만
        

2. 제2정규화
    - 일반 속성을 기본 키에 종속되도록
    - 키가 두개 이상일경우 테이블 분리

    
3. 제3정규화
    - X→Y & Y→Z 이면 X→Z 를 만족하는것을 제거
    - 이행종속 제거


## 분산 데이터베이스

- 2개 이상의 물리적 데이터베이스
- 하나의 논리적 집합체
- 여러 데이터베이스를 네트워크로 연결

- 테이블 위치 분산
- 테이블 분할 분산
- 테이블 복제 분산

## SQL : Structured Query Language

자연어와 매우 가까운 비절차적 언어

## ANSI : American National Standard Insitute

- (Inner lfet right) JOIN 을 명시적으로 표현
- ON을 통하여 두 테이블을 연결

## DDL : Data Definition Language

DROP ↔ TRUNCATE

TRUNCATE → 테이블 초기화 (TABLE은 남음)

DROP → 테이블 자체를 삭제

CREATE,DROP, TRUNCATE

### ALTER

ALTER TABLE ALTER COLUMN 

DROP COLUMN

MODIFY

## DML : Data Management Language

### INSERT

INSERT INTO 테이블명(속성1, 속성2..) VALUES (값1, 값2,…)

### UPDATE

UPDATE 테이블명 SET 컬럼명1=값1, 컬럼명2=값2… WHERE 조건식

### DELETE

DELETE FROM 테이블명 WHERE 조건식

 → 테이블 데이터만 삭제 (공간은 그대로)

### SELECT

SELECT COLUMN1, COLUMN2, … FROM 테이블명 WHERE 조건식

## DCL : Data Control Language

권한 관리

### GRANT

권한 정의 

GRANT 객체 권한 ON 객체명 TO 사용자

ex) GRANT SELECT ON ORDER_TABLE TO USER_1

ex) GRANT ALL ON DB_1 TO USER_1, USER_2

### REVOKE

권한 삭제

REVOKE 객체 권한 ON 객체명 TO 사용자

ex) REVOKE CREATE TABLE, CREATE VIEW ON PRODUCT_DB TO USER_1

## TCL : Transaction Control Language

작업 내용 관리

COMMIT ROLLBACK TRANSACTION

INDEX

탐색의 효율성 up

but 데이터 삭제시 index를 관리해줘야함

hut 그렇게 해주는게 더 효율적임

INDEX 생성

- CREATE INDEX 인덱스명 ON 스키마 테이블명(컬럼명)

## 자료 유형

### CHAR

고정 길이 문자열 

### VARCHAR

가변 길이 문자열

### DATE, DATETIME

날짜

### FLOAT DOUBLE

실수

### INT

정수

# 트랜잭션

mysql - 자동

1. 원자성
    - 모든 실행이 정상적이거나 하나도 실행 x
2. 일관성
    - 트랜잭션 실행 이전 정상이라면 실행 후도 정상이어야 함
3. 고립성
    - 트랜잭션은 순차적으로 진행되므로 다른 트랜잭션에 영향을 주면 안됨
4. 지속성
    - 트랜잭션이 성공적이라면 그 결과는 영구적으로 남아야 함

## 연산자

다름 3개

### <>

### !=

### ^=

### BETWEEN → 이상 이하

≠ NULL <> NULL 사용금지

IS NULL, IS NOT NULL 사용

ISNULL(C1, VALUE) → NULL일 경우 VALUE로

### LIKE

%STRING%

COUNT(*)

AVG(*) 

와 같은 집계 함수가 *를 사용하면 GROUP BY를 사용하지 않아도 됨

그러나 특정 콜롬을 센다면 무조건 GROUP BY를 사용해야함

GROUP BY

### UNION

- 그냥 아래에다 붙이기
- 콜롬의 개수와 타입이 일치해야함

### UNION ALL

- 중복제거 x

### INSTINCT

- 교집합

### MINUS

- 차집합

### CROSS JOIN

- 두 테이블 데이터의  순서쌍
    
### INNER JOIN

### OUTER JOIN

CONNECTED BY PRIOR

### ROLLUP

### CUBE

### GROUPING SET
