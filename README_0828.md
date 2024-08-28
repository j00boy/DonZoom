# Spring Security

- 작동 흐름 :
    
    SecurityConfig의 @EnableWebSecurity 어노테이션을 통해 프로젝트에 Spring Security 적용
    

- SecurityConfig 안의 SecurityFilterChain을 통해 전반적인 필터 적용
    
    핵심 기능으로는 Filter 추가 해주는것. JWT Filter와 LoginFilter
    
    LoginFilter는 로그인 요청시, JWT Filter는 발급된 JWT토큰을 인증하는데 사용됨

    JWT 필터만 사용하고 로그인 url에 permitAll로 필터를 그냥 통과하도록 설정해도 됨
    

- LoginFilter는 로그인 하기 전 email과 비밀번호를 가로채 UsernamePasswordAuthenticationToken 객체 생성
    
    AuthenticationManager(Bean)이 이 객체를 전달받아 authenticate 메소드 실행 후 반환
    
    (인증 과정임) 
    
    이 과정중 UserDetails 인터페이스 (내 코드에선 CustomUserDetails) 를 통해 내가 입력한 비밀번호와 실제 비밀번호를 비교해서 인증을 진행함
    
    ( 인증 후 )
    
    Authentication 객체 반환 
    
    UsernamePasswordAuthenticationToken 객체이고 Principal에  CustomUserDetails를 포함
    
- 인증이 성공하면 successfulAuthentication메소드 실행하여 Jwt토큰 발행
- 이후 발행된 토큰으로 JWT필터를 통해 JWT 토큰으로 Authentication 객체를 생성후 이걸로 인증 진행

