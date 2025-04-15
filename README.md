`http://localhost:4200`


ㅁ /login (루트)
    컴포넌트: LoginComponent
    기능: 카카오 로그인 제공 (첫 화면과 동일)

ㅁ /main
    컴포넌트: MainComponent
    기능: 승인된 회원을 위한 메인 대시보드
    접근: 승인된 회원만 가능

ㅁ /register
    컴포넌트: RegisterComponent
    기능: 신규 회원 추가 정보 입력
    접근: 카카오 로그인 후 신규 회원

ㅁ /pending
    컴포넌트: PendingComponent
    기능: 승인 대기 상태 안내
    접근: 승인 대기 중인 회원