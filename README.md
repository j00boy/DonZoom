1일차
React Native 프로젝트 생성 및 Flutter와의 차이 공부

React Native
- JavaScript 기반
- 런타임 중에 JS 브릿지를 생성하고 JavaScript 코드를 네이티브 코드로 변환해서 컴파일

Flutter
- Dart 언어 사용
- 컴파일 타임에 Dart 코드를 네이티브 코드로 컴파일
- 브릿지가 필요 없음

2일차
React 면접 질문들 공부

React에 대해 설명해주세요
- UI를 만들기 위한 JavaScript 라이브러리
- 캡슐화된 컴포넌트를 조합해 복잡한 UI를 만들 수 있도록 지원
- 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신 후 렌더린

React의 원리, 특징
- UI 변경점을 결정하기 위해 Reconciliation 알고리즘을 사용
- 이를 구현하기 위해 Virtual DOM 패턴 사용
- Virtual DOM: UI 표현인 메모리에 저장, Real DOM과 동기화
- 단방향 데이터 바인딩: JS에서 수정할 경우 화면에 반영, 화면에서 수정할 경우 반영하지 않음

Virtual DOM 작동 원리
Reconciliation 알고리즘(재조정 알고리즘)
재조정과 렌더링이 별개의 단계가 되도록 설계
Reconciler가 트리의 변경 부분을 계산
Renderer가 계산된 정보를 앱에 업데이트
Fiber를 이용하여 stack을 재구성
stack fram을 메모리에 보관 후 언제든지 실행할 수 있또록 만듬
-> 스케줄링을 목표로 함
Fiber를 도입하여 우선순위가 높은 업데이트를 먼저 완료

3일차
### CORS

CORS(Cross-Origin Resource Sharing)

웹 브라우저에서 외부 도메인 서버와 통신하기 위한 방식을 표준화한 스펙

서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식으로 교차 출저 자원 공유(cross-origin resource sharing)라는 이름으로 표준화 되었다.

### 동일출처정책

동일 출처 정책(Same-Origin Policy)

어떤 출처에서 불러온 문서나 스크립트가 다른 출처에서 가져온 리소스와 상호작용을 하는 것을 제한하는 보안 방식

잠재적으로 해로울 수 있는 문서를 분리함으로써 공격받을 수 있는 경로를 줄여줌

### jsonp방식

웹 브라우저에서 css나 js 같은 리소스 파일들을 동일 출처 정책에 영향을 받지 않고 로딩 가능

이런 점을 응용해서 외부 서버에서 읽어온 js파일을 json으로 바꿔주는 일종의 편법적인 방법

리소스 파일을 GET 메서드로 읽어오기 때문에 GET방식의 API만 요청 가능

### 렌더링엔진

내용 정보인 HTML, XML과 서식정보인 CSS, XML 등을 읽어들여 사람이 읽을 수 있는 문서로 표시하는, 웹 브라우저의 핵심기능을 담당하는 소프트웨어

크롬 - 블링크(Blink)

사파리 - 웹킷(Webkit)

파이어폭스 - 게코(Gecko)

### CRP

CRP(Critical Rendering Path) - 중요 렌더링 경로

HTML, CSS, Javascript를 화면에 픽셀로 변화하는 단계

DOM, CSSOM, 렌더트리, 레이아웃을 포함함

### 파싱

하나의 프로그램을 런타임환경이 실제로 실행할 수 있는 내부 포맷으로 분석하고 변환하는 것

즉, 문서의 내용을 토큰으로 분석하고, 문법적 의미와 구조를 반영한 파스트리를 생성하는 과정

### DOM

DOM(Document Object Model) - 문서 객체 모델

웹 페이지를 이루는 태그들을 자바스크립트가 이용할 수 있게끔 브라우저가 트리구조로 만든 객체 모델

문서 객체란 html, head, body와 같은 태그

DOM은 HTML과 스크립팅 언어를 서로 이어주는 역할을 함

### CSSOM

CSSOM(CSS Object Model)

CSS 내용을 파싱하여 자료를 구조화 한 것

DOM처럼 CSS의 내용을 해석하고 노드를 만들어 트리 구조로 만든 것

### 렌더트리

CSSOM과 DOM 트리의 결합으로 만들어짐

웹페이지에 나타낼 각 요소들의 위치를 계산하는데 사용

픽셀을 화면에 렌더링하는 페인트 프로세스를 위해 존재

### Layout(Reflow)

뷰포트 내에서 노드의 정확한 위치와 크기를 계산하는 것

다시 계산하는 과정을 Reflow라고 함

### Paint

렌더링 트리의 각 노드를 화면의 실제 픽셀로 변환하는 것

### DNS

도메인 이름 시스템

사람이 읽을 수 있는 도메인(www.~~.com)을 기계가 읽을 수 있는 IP주소로 변환하는 것

### URL

URL(Uniform Resource Locator) - 통합 자원 지시자

인터넷의 리소스를 가리키는 표준 명칭

서버의 자원을 요청할 때 사용

### HTTP

HTTP(HyperText Transfer Protocol)

TCP 기반의 클라이언트와 서버 사이에 이루어지는 요청/응답 프로토콜

### 프로토콜

통신하기 위한 약속들을 기술적으로 잘 정의해 둔 것

(HTTP, TCP/IP, UDP)

### TCP

전송 제어 프로토콜

두 개의 호스트를 연결하고 데이터 스트림을 교환하게 해주는 네트워크 프로토콜

데이터 전송을 제어하고 데이터를 어떻게 보내고 맞출지 정함

4일차
디자인패턴 종류 공부
MVC(Model View Controller)
모델, 뷰, 컨트롤러로 역할을 분리하여 사용

MVVM(Model View ViewModel)
상태관리를 뷰모델에서 담당
UI와 비즈니스 로직 분리
React Native에서 많이 사용

MVI(Model View Intent)
복잡한 상태관리가 필요할 때 사용
단반향 데이터 바인딩으로 구조화하여 예측 가능한 상태 관리 가능