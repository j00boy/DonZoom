## 디자인 모델 (Web Application Architecture)

## Model 1

jsp = view + controller 역할

### 장점

- 구조가 단순하며 직관적이기 때문에 배우기 쉽다.
- 개발 시간이 짧기 때문에 개발 비용이 감소한다

### 단점

- JSP 코드 자체가 복잡하다.
- Front-end와 Back-end가 혼재되어 분업이 힘들다.
- 유지보수가 힘들다
- 확장성이 나쁨

## Model 2 MVC패턴

JSP ⇒ View

Servlet ⇒ Controller

Service, Dao, Java Beans ⇒ Model

Client ⇒ Servlet(Controller) ⇒ Service ⇒ DAO ⇒ DB ⇒ DAO ⇒ Service ⇒ JSP ⇒ Client

### 장단점 ⇒ Model 1의 반대