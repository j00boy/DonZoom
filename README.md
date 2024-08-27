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