인증에 사용하는 블록체인 기술

상용 플랫폼에서 블록체인을 활용해 인증 서비스를 제공하려면 블록체인 플랫폼을 선택하고,
Spring boot에 통합하여 작성해야함
0. 블록체인 플랫폼
    - 이더리움 : 스마트 계약 기능이 매우 강력함
    - 하이퍼레저 페브릭 : 기업 환경에 적합, 권한이 있는 블록체인 구성
    - 코스모스/ 폴카닷 : 상호운용성이 뛰어나고, 다양한 블록체인간에 연결 가능

    => 스마트 계약 기능 기반으로 서비스 개발 예정이니 이더리움 채택

1. 이더리움 기반 블록체인 인증을 하려면 Solidity 언어를 통하여 스마트 계약을 작성해야함
2. 개발 도구 : Truffle, Ganache

3. 스마트 계약 작성
 `
    pragma solidity ^0.8.0;

    contract LoanContract {
        struct LoanAgreement {
            address lender;
            address borrower;
            uint amount;
            bool isRepaid;
        }

        mapping(uint => LoanAgreement) public loans;
        uint public loanCount;

        function createLoan(address _borrower, uint _amount) public {
            loanCount++;
            loans[loanCount] = LoanAgreement(msg.sender, _borrower, _amount, false);
        }

        function markAsRepaid(uint _loanId) public {
            LoanAgreement storage loan = loans[_loanId];
            require(msg.sender == loan.lender, "Only the lender can mark as repaid");
            loan.isRepaid = true;
        }
    }

 `

4. 스마트 계약 배포: Truffle이나 Remix를 사용하여 스마트 계약을 블록체인 네트워크에 배포합니다. 배포된 계약의 주소를 기록해 두어, Spring Boot 애플리케이션에서 사용할 수 있도록 합니다.


5. Spring Boot 설정 : Web3j (이더리움) 의존성 추가
    - implementation 'org.web3j:core:4.8.7'

6. Spring Boot MVC 구현
`
    @Service
    public class BlockchainService {

        private Web3j web3j;

        public BlockchainService() {
            this.web3j = Web3j.build(new HttpService("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"));
        }

        public String deployContract() throws Exception {
            Credentials credentials = WalletUtils.loadCredentials("your-wallet-password", "path-to-wallet-file");
            LoanContract contract = LoanContract.deploy(web3j, credentials, GAS_PRICE, GAS_LIMIT).send();
            return contract.getContractAddress();
        }

        // 추가적인 블록체인 상호작용 메서드 구현
    }
`

`
    @Service
    public class LoanAgreementService {
        @Autowired
        private LoanAgreementRepository repository;

        @Autowired
        private BlockchainService blockchainService;

        public LoanAgreementEntity createLoanAgreement(LoanAgreementEntity loan) {
            // 블록체인에 계약 생성
            blockchainService.createLoan(loan.getBorrower(), loan.getAmount());
            return repository.save(loan);
        }

        // 기타 서비스 메서드들...
    }

`
`
    @Entity // 실제 데이터베이스에 저장할 Entity
    public class LoanAgreementEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String lender;
        private String borrower;
        private BigDecimal amount;
        private Boolean isRepaid;

        // Getters and Setters
    }

    @Repository
    public interface LoanAgreementRepository extends JpaRepository<LoanAgreementEntity, Long> {}

`
------------------------------------------------------------
정리.

이더리움 기반 스마트계약을 이용하기 위해선 Truffle과 Ganache를 통하여 Solidity언어를 사용해 블록체인 플랫폼에 스마트 계약을 요청하는 코드를 작성해야함.

그 후 Truffle과 Remix를 통하여 블록체인 네트워크에 배포하고 반환된 주소를 저장하여 사용

실제 구현 시 EC2 서버 내에 프라이빗 이더리움 네트워크를 구축하고 여기다 정보를 저장

주제 선정 후, Truffle, Remix, Solidity에 대해 추가 학습 필요
