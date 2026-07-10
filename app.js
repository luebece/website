const SOURCES = [
  {
    label: "Q-Net 정보처리기사 종목 상세",
    url: "https://www.q-net.or.kr/crf005.do?id=crf00503&jmCd=1320",
  },
  {
    label: "Q-Net 정보처리기사 공식 출제기준(2026.1.1~2026.12.31)",
    url: "https://www.q-net.or.kr/crf005.do?gId=&gSite=Q&id=crf00503s02&jmCd=1320&jmInfoDivCcd=B0",
  },
  {
    label: "Q-Net 이전 출제기준(2023.1.1~2025.12.31)",
    url: "https://www.q-net.or.kr/cst006.do?id=cst00602&brdId=Q006&code=1202&artlSeq=5210765",
  },
  {
    label: "2026년 1회 공개 복원",
    url: "https://chobopark.tistory.com/561",
  },
  {
    label: "2025년 1회 공개 복원",
    url: "https://chobopark.tistory.com/540",
  },
  {
    label: "2025년 2회 공개 복원",
    url: "https://chobopark.tistory.com/554",
  },
  {
    label: "2025년 3회 공개 복원",
    url: "https://chobopark.tistory.com/558",
  },
  {
    label: "2024년 1회 공개 복원",
    url: "https://chobopark.tistory.com/476",
  },
  {
    label: "2024년 2회 공개 복원",
    url: "https://chobopark.tistory.com/483",
  },
  {
    label: "2024년 3회 공개 복원",
    url: "https://chobopark.tistory.com/495",
  },
  {
    label: "2023년 1회 공개 복원",
    url: "https://chobopark.tistory.com/372",
  },
  {
    label: "2023년 2회 공개 복원",
    url: "https://chobopark.tistory.com/420",
  },
  {
    label: "2023년 3회 공개 복원",
    url: "https://chobopark.tistory.com/453",
  },
  {
    label: "2022년 1회 공개 복원",
    url: "https://chobopark.tistory.com/271",
  },
  {
    label: "2022년 2회 공개 복원",
    url: "https://chobopark.tistory.com/423",
  },
  {
    label: "2022년 3회 공개 복원",
    url: "https://chobopark.tistory.com/424",
  },
];

const DAY_PLANS = [
  {
    title: "DB/SQL을 먼저 찢는다",
    focus: "정규화, 키, 조인, DDL/DML/DCL/TCL, 트랜잭션",
    tasks: [
      ["정규화 1NF/2NF/3NF/BCNF와 함수 종속을 30분 안에 한 장으로 정리", "부분 종속, 이행 종속, 결정자, 후보키를 입으로 설명한다."],
      ["SQL 예약어 40개 손으로 3회 쓰기", "SELECT, DISTINCT, GROUP BY, HAVING, CONSTRAINT, REFERENCES는 철자 실수 금지."],
      ["DB/SQL 훈련 60문항", "틀린 문제는 답만 보지 말고 왜 그 예약어인지 한 줄로 남긴다."],
      ["모의고사 1회", "60점 미만이면 DB/SQL만 다시 돈다."],
    ],
  },
  {
    title: "코드 출력은 변수표로 잡는다",
    focus: "C 포인터/문자열/구조체, Java 상속/오버라이딩, Python 슬라이싱",
    tasks: [
      ["C 포인터와 배열 주소 계산 20문항", "p+i, *(p+i), 구조체 포인터 -> 를 구분한다."],
      ["Java 동적 바인딩 20문항", "오버라이딩은 실행 객체, 오버로딩은 컴파일 타입을 먼저 본다."],
      ["Python 슬라이싱/리스트/문자열 20문항", "start:stop:step을 그림으로 표시한다."],
      ["오답 코드만 다시 풀기", "답을 외우지 말고 실행 순서를 번호로 적는다."],
    ],
  },
  {
    title: "네트워크/OS 계산형 처리",
    focus: "CIDR, 라우팅, HDLC, 스케줄링, 페이지 교체, Linux 권한",
    tasks: [
      ["서브넷 /24, /23, /22 네트워크 주소 계산", "마스크를 2진수 블록으로 바꾸는 연습을 한다."],
      ["OSPF/RIP/NAT/IPSec/HDLC 단답 암기", "약자와 한 줄 정의를 붙여 외운다."],
      ["스케줄링과 페이지 교체 15문항", "LRU와 LFU를 헷갈리면 실전에서 바로 점수가 샌다."],
      ["chmod 8진수 10문항", "r=4, w=2, x=1만 기억하면 끝난다."],
    ],
  },
  {
    title: "SW공학/보안 단답 몰아치기",
    focus: "요구사항, 테스트, 결합도/응집도, 디자인 패턴, 보안",
    tasks: [
      ["디자인 패턴 12개 카드 암기", "Singleton, Observer, Bridge, Iterator는 무조건 맞힌다."],
      ["테스트 커버리지와 정적/동적 분석 구분", "문장/분기/조건/경로 커버리지를 비교한다."],
      ["보안 약어 25개", "AES, RSA, SHA, OAuth, JWT, ISMS, IPSec를 우선 암기한다."],
      ["전체 최빈출 80문항", "틀린 태그가 5개 이하가 될 때까지 반복한다."],
    ],
  },
  {
    title: "시간을 재고 풀어 오답만 남긴다",
    focus: "20문항 실전형 연습 3회, 오답 태그 제거, 답안 속도",
    tasks: [
      ["20문항 실전형 연습 3회", "앱 문제은행 기준 70점 이상을 만들되 실제 시험 예상 점수로 보지는 않는다."],
      ["오답 태그 TOP 5만 재암기", "새 범위 욕심내지 말고 틀린 것을 없앤다."],
      ["영문 약자 철자 최종 점검", "대소문자보다 철자 자체가 중요하다."],
      ["시험 직전 60분 루틴 실행", "코드, SQL, 보안, 네트워크 단답 순서로 본다."],
    ],
  },
];

const SCOPE_ITEMS = [
  {
    id: "code",
    officialNo: 10,
    title: "프로그래밍 언어 활용",
    heat: "MAX",
    summary: "매 회차에 가까운 빈도로 코드 출력이 나온다. C, Java, Python을 변수표로 추적해야 한다.",
    terms: ["C 포인터", "배열", "문자열", "구조체", "Java 상속", "오버라이딩", "Python 슬라이싱"],
    route: "Day 2에서 집중하고 Day 5까지 매일 20분씩 유지한다.",
  },
  {
    id: "sql",
    officialNo: 8,
    title: "SQL 응용",
    heat: "MAX",
    summary: "예약어 빈칸, 결과 행 수, 제약조건, 조인, 집계가 반복된다.",
    terms: ["SELECT", "DISTINCT", "GROUP BY", "HAVING", "CONSTRAINT", "FOREIGN KEY", "REFERENCES"],
    route: "Day 1에 철자 암기, Day 5에 실전 속도 점검.",
  },
  {
    id: "db",
    officialNo: 2,
    title: "데이터 입출력 구현",
    heat: "MAX",
    summary: "정규화, 키, 함수 종속, ERD, 카디널리티/차수는 단답으로 잘 나온다.",
    terms: ["정규화", "함수 종속", "기본키", "외래키", "카디널리티", "차수", "트랜잭션"],
    route: "SQL과 묶어서 1일 차에 끝낸다.",
  },
  {
    id: "netos",
    officialNo: 11,
    title: "응용 SW 기초 기술 활용",
    heat: "HIGH",
    summary: "네트워크 약어와 OS 계산형이 자주 섞인다. 서브넷, 라우팅, 페이지 교체가 핵심이다.",
    terms: ["CIDR", "OSPF", "RIP", "NAT", "HDLC", "LRU", "SRT", "chmod"],
    route: "Day 3 전용. 계산형은 손으로 풀어야 기억난다.",
  },
  {
    id: "security",
    officialNo: 9,
    title: "소프트웨어 개발 보안 구축",
    heat: "HIGH",
    summary: "암호 알고리즘, 인증/인가, 취약점 이름, 보안 관리체계가 단답으로 나온다.",
    terms: ["AES", "RSA", "SHA", "OAuth", "JWT", "ISMS", "XSS", "SQL Injection"],
    route: "Day 4에 약어 위주로 압축 암기한다.",
  },
  {
    id: "test",
    officialNo: 7,
    title: "애플리케이션 테스트",
    heat: "HIGH",
    summary: "커버리지, 테스트 종류, 정적/동적 분석은 정의형으로 자주 묻는다.",
    terms: ["문장 커버리지", "분기 커버리지", "화이트박스", "블랙박스", "정적 분석", "동적 분석"],
    route: "Day 4에 표로 외운다.",
  },
  {
    id: "interface",
    officialNo: 5,
    title: "인터페이스 구현",
    heat: "HIGH",
    summary: "인터페이스 설계, 데이터 형식, 기능 구현과 검증 및 오류 처리를 다룬다.",
    terms: ["인터페이스 설계", "JSON", "XML", "REST", "오류 처리", "구현 검증"],
    route: "연계 형식과 오류 처리 흐름을 통합 구현 영역과 함께 본다.",
  },
  {
    id: "req",
    officialNo: 1,
    title: "현행 시스템 분석 및 요구사항 확인",
    heat: "MID",
    summary: "기능/비기능 요구사항과 품질 속성 분류가 나온다.",
    terms: ["성능", "자원", "운영", "보안", "신뢰성", "유지보수성", "추적성"],
    route: "비기능 요구사항 키워드를 예시와 연결한다.",
  },
  {
    id: "integration",
    officialNo: 3,
    title: "통합 구현",
    heat: "MID",
    summary: "연계 대상 모듈의 특성을 분석하고 연계 모듈과 데이터 변환 흐름을 구현한다.",
    terms: ["연계 모듈", "EAI", "ESB", "SOAP", "WSDL", "데이터 변환"],
    route: "연계 방식과 모듈 사이 데이터 흐름을 묶어서 외운다.",
  },
  {
    id: "server",
    officialNo: 4,
    title: "서버 프로그램 구현",
    heat: "MID",
    summary: "모듈, 공통 컴포넌트, 프레임워크, 형상관리, 배포 흐름이 나온다.",
    terms: ["모듈화", "MVC", "프레임워크", "Git", "CI/CD", "공통 모듈"],
    route: "정의형 위주라 한 줄 답안 템플릿으로 대비한다.",
  },
  {
    id: "ui",
    officialNo: 6,
    title: "화면 설계",
    heat: "MID",
    summary: "UI 요구사항, 와이어프레임, 스토리보드, 프로토타입은 간헐적으로 나온다.",
    terms: ["UI", "UX", "와이어프레임", "스토리보드", "프로토타입"],
    route: "용어 차이를 짧게 구분한다.",
  },
  {
    id: "package",
    officialNo: 12,
    title: "제품소프트웨어 패키징",
    heat: "MID",
    summary: "릴리즈 노트, DRM, 설치 매뉴얼, 형상관리, 버전 관리를 묻는다.",
    terms: ["릴리즈 노트", "DRM", "패키징", "형상관리", "버전관리"],
    route: "막판 단답 카드로 처리한다.",
  },
];

const THEORY_ITEMS = [
  {
    id: "t-db-key",
    heat: "MAX",
    title: "릴레이션과 키",
    oneLine: "테이블은 릴레이션, 열은 속성, 행은 튜플이다. 키는 행을 구분하거나 다른 테이블과 연결하는 이름표다.",
    why: "차수, 카디널리티, 기본키, 외래키는 거의 계산 없이 단답으로 맞힐 수 있는 점수다.",
    memorize: "열=차수, 행=카디널리티, 내 대표=기본키, 남의 대표 참조=외래키.",
    example: "학생(학번, 이름, 학과)에서 학번이 기본키이고, 수강 테이블의 학번은 외래키가 될 수 있다.",
    linked: "DB/SQL 모드에서 카디널리티, 차수, 외래키 문제를 먼저 푼다.",
    tags: ["DB", "키", "릴레이션"],
  },
  {
    id: "t-normalization",
    heat: "MAX",
    title: "정규화",
    oneLine: "정규화는 테이블을 쪼개서 중복과 이상 현상을 줄이는 작업이다.",
    why: "부분 종속, 이행 종속 같은 말만 알아도 2NF/3NF 문제를 바로 맞힌다.",
    memorize: "1NF 원자값, 2NF 부분 종속 제거, 3NF 이행 종속 제거, BCNF 결정자 후보키.",
    example: "학번+과목으로 점수를 찾는데 학생이름이 학번에만 종속되면 부분 종속이라 2NF에서 분리한다.",
    linked: "정규화 문제는 '무슨 종속을 제거하나?'만 찾는다.",
    tags: ["DB", "정규화", "함수종속"],
  },
  {
    id: "t-sql",
    heat: "MAX",
    title: "SQL 예약어",
    oneLine: "SQL 문제는 영어 문장 맞히기가 아니라, 빈칸 앞뒤에 맞는 예약어를 넣는 퍼즐이다.",
    why: "DISTINCT, GROUP BY, HAVING, CONSTRAINT, REFERENCES는 반복 출제되는 철자 점수다.",
    memorize: "중복 제거 DISTINCT, 그룹 조건 HAVING, 제약조건 CONSTRAINT, 참조 REFERENCES.",
    example: "SELECT DISTINCT DEPT FROM STUDENT; 는 학과를 중복 없이 보여준다.",
    linked: "SQL/DB 모드에서 예약어 빈칸 문제를 20개 이상 반복한다.",
    tags: ["SQL", "예약어", "빈칸"],
  },
  {
    id: "t-transaction",
    heat: "HIGH",
    title: "트랜잭션과 회복",
    oneLine: "트랜잭션은 DB에서 하나로 처리되어야 하는 작업 묶음이다.",
    why: "COMMIT, ROLLBACK, REDO, UNDO, ACID가 단답으로 잘 나온다.",
    memorize: "확정 COMMIT, 취소 ROLLBACK, 다시 반영 REDO, 되돌림 UNDO.",
    example: "계좌이체는 출금과 입금이 둘 다 성공하거나 둘 다 취소되어야 한다. 이것이 원자성이다.",
    linked: "DB/SQL 모드에서 ACID와 회복 문제를 묶어서 본다.",
    tags: ["DB", "트랜잭션", "회복"],
  },
  {
    id: "t-code-c",
    heat: "MAX",
    title: "C 코드 출력",
    oneLine: "C 출력 문제는 지식보다 추적이다. 변수표를 만들고 한 줄씩 값만 바꾸면 된다.",
    why: "포인터, 배열, 문자열, 증감 연산은 매년 변형되어 나온다.",
    memorize: "x++는 먼저 사용 후 증가, ++x는 먼저 증가 후 사용. *p는 p가 가리키는 값.",
    example: "int a[]={2,4,6}; int *p=a; *(p+2)는 a[2]라서 6이다.",
    linked: "코드 모드에서 C 문제는 답 입력 전에 변수표를 손으로 적는다.",
    tags: ["C", "포인터", "출력"],
  },
  {
    id: "t-code-java",
    heat: "HIGH",
    title: "Java 상속과 참조",
    oneLine: "Java는 참조 타입과 실제 객체 타입을 나눠 봐야 한다.",
    why: "오버라이딩, static, equals, 배열 참조 비교가 자주 섞인다.",
    memorize: "오버라이딩은 실제 객체, static은 클래스 공유, ==는 참조 비교.",
    example: "Parent p = new Child(); p.run(); 에서 오버라이딩된 run은 Child 쪽이 실행된다.",
    linked: "코드 모드에서 Java 문제는 '실제 객체가 누구인가?'부터 체크한다.",
    tags: ["Java", "상속", "참조"],
  },
  {
    id: "t-code-python",
    heat: "HIGH",
    title: "Python 리스트와 슬라이싱",
    oneLine: "Python 슬라이싱은 [start:stop:step]이고 stop은 포함하지 않는다.",
    why: "짧은 코드 출력으로 내기 좋고, step이 음수일 때 자주 틀린다.",
    memorize: "시작, 끝 직전, 간격. [::-1]은 뒤집기.",
    example: "list(range(10))[::-3]은 9, 6, 3, 0 순서로 나온다.",
    linked: "코드 모드에서 Python 문제는 인덱스를 숫자로 적어가며 푼다.",
    tags: ["Python", "슬라이싱", "리스트"],
  },
  {
    id: "t-network",
    heat: "MAX",
    title: "네트워크 약어",
    oneLine: "네트워크 단답은 약어의 정체를 묻는 문제가 많다.",
    why: "OSPF, RIP, NAT, IPSec, HDLC는 뜻과 기능을 알면 바로 맞힌다.",
    memorize: "OSPF는 링크 상태, RIP는 홉 수, NAT는 주소 변환, IPSec은 IP 보안.",
    example: "사설 IP를 공인 IP로 바꿔 인터넷에 나가게 하는 기술은 NAT다.",
    linked: "네트워크/OS 모드에서 약어 문제를 먼저 끝낸다.",
    tags: ["네트워크", "약어", "라우팅"],
  },
  {
    id: "t-subnet",
    heat: "HIGH",
    title: "서브넷 계산",
    oneLine: "서브넷은 IP가 어느 블록에 들어가는지 찾는 문제다.",
    why: "계산형이지만 공식이 짧아서 연습하면 안정 점수가 된다.",
    memorize: "/24는 256개씩, /23은 세 번째 옥텟 2개씩, /22는 4개씩 묶는다.",
    example: "192.168.11.20/23은 10~11 블록에 있으므로 네트워크 주소가 192.168.10.0이다.",
    linked: "네트워크/OS 모드에서 /23, /22 계산만 먼저 익힌다.",
    tags: ["CIDR", "서브넷", "계산"],
  },
  {
    id: "t-os",
    heat: "HIGH",
    title: "운영체제 핵심",
    oneLine: "OS 문제는 스케줄링, 페이지 교체, 교착상태 조건 이름을 묻는다.",
    why: "LRU, LFU, SRT, chmod, 교착상태 4조건은 반복되는 암기형이다.",
    memorize: "LRU 오래 안 씀, LFU 적게 씀, SRT 남은 시간 짧음, chmod r=4 w=2 x=1.",
    example: "rwx r-x --x는 7,5,1이라서 chmod 751이다.",
    linked: "네트워크/OS 모드에서 chmod와 페이지 교체를 같이 푼다.",
    tags: ["OS", "스케줄링", "권한"],
  },
  {
    id: "t-security",
    heat: "HIGH",
    title: "보안 단답",
    oneLine: "보안은 공격 이름, 암호 방식, 인증 약어를 구분하는 문제다.",
    why: "AES/RSA/SHA, OAuth/JWT/SSO, XSS/SQL Injection은 단답으로 내기 쉽다.",
    memorize: "AES 대칭키, RSA 공개키, SHA 해시, OAuth 권한 위임, JWT 토큰.",
    example: "비밀번호를 앱에 넘기지 않고 권한을 위임하면 OAuth다.",
    linked: "보안 문제는 '암호냐 인증이냐 공격이냐'를 먼저 나눈다.",
    tags: ["보안", "암호", "인증"],
  },
  {
    id: "t-test",
    heat: "HIGH",
    title: "테스트와 커버리지",
    oneLine: "테스트 문제는 실행했는지, 무엇을 덮었는지, 내부를 보는지로 나눈다.",
    why: "정적/동적 분석, 문장/분기 커버리지가 정의형으로 반복된다.",
    memorize: "정적은 실행 안 함, 동적은 실행함. 문장은 모든 줄, 분기는 참/거짓.",
    example: "if문의 true와 false를 각각 한 번씩 실행했는지 보면 분기 커버리지다.",
    linked: "SW공학 문제에서 커버리지 이름을 먼저 맞힌다.",
    tags: ["테스트", "커버리지", "분석"],
  },
  {
    id: "t-pattern",
    heat: "HIGH",
    title: "디자인 패턴",
    oneLine: "패턴은 이름과 의도 하나만 연결하면 된다.",
    why: "Singleton, Observer, Bridge, Iterator는 기출 복원에서 반복적으로 보인다.",
    memorize: "하나만 Singleton, 알림 Observer, 분리 Bridge, 순회 Iterator.",
    example: "한 객체 상태가 바뀌면 구독자에게 알려주는 구조는 Observer다.",
    linked: "SW공학 문제에서 패턴 이름을 의도와 1:1로 연결한다.",
    tags: ["디자인패턴", "설계", "UML"],
  },
  {
    id: "t-req",
    heat: "MID",
    title: "요구사항과 설계 산출물",
    oneLine: "요구사항은 만들 기능과 품질 조건을 정리하는 출발점이다.",
    why: "기능/비기능 요구사항, 추적성, UML, 와이어프레임은 정의형으로 나온다.",
    memorize: "기능은 무엇을 한다, 비기능은 얼마나 잘한다. 추적성은 끝까지 따라간다.",
    example: "응답 시간 3초 이내는 기능이 아니라 성능 조건이므로 비기능 요구사항이다.",
    linked: "개념 카드로만 짧게 보고 문제에서 키워드로 맞힌다.",
    tags: ["요구사항", "설계", "비기능"],
  },
  {
    id: "t-interface",
    heat: "MID",
    title: "인터페이스와 통합",
    oneLine: "인터페이스는 시스템끼리 데이터를 주고받는 약속이다.",
    why: "REST, JSON, XML, EAI, ESB가 실무형 단답으로 나온다.",
    memorize: "REST는 HTTP 자원 방식, JSON/XML은 데이터 형식, EAI/ESB는 시스템 통합.",
    example: "웹 API가 /users/1 같은 URI와 GET/POST를 쓰면 REST 방식으로 볼 수 있다.",
    linked: "통합 구현 문제는 약어 뜻을 짧게 맞히는 연습이 좋다.",
    tags: ["인터페이스", "REST", "EAI"],
  },
];

THEORY_ITEMS.push(
  ...(window.DEEP_THEORY_ITEMS || []),
  ...(window.MEGA_THEORY_ITEMS || []),
  ...(window.CODE_SQL_THEORY_ITEMS || []),
);

const BEGINNER_GUIDES = {
  sql: [
    "문장에서 원하는 행동을 찾는다. 조회면 SELECT, 중복 제거면 DISTINCT, 그룹 조건이면 HAVING이다.",
    "빈칸 앞뒤 단어를 본다. CONSTRAINT 뒤에는 제약조건 이름, REFERENCES 뒤에는 참조 테이블이 온다.",
    "답은 길게 설명하지 말고 SQL 예약어만 정확히 쓴다.",
  ],
  db: [
    "릴레이션 문제는 열/행/키부터 구분한다. 열은 속성, 행은 튜플이다.",
    "정규화 문제는 '무슨 종속을 없애는가'만 본다. 부분 종속은 2NF, 이행 종속은 3NF다.",
    "트랜잭션 문제는 ACID 네 글자와 COMMIT/ROLLBACK을 먼저 떠올린다.",
  ],
  code: [
    "머릿속으로 풀지 말고 종이에 변수표를 만든다. 변수 이름과 현재 값을 한 줄씩 갱신한다.",
    "C 포인터는 *p, *(p+1), p[i]가 같은 배열을 가리키는지 먼저 본다.",
    "Java는 오버라이딩이면 실제 객체 타입, Python은 슬라이싱 start:stop:step 순서로 본다.",
  ],
  netos: [
    "약어 문제인지 계산 문제인지 먼저 나눈다. OSPF/RIP/NAT/IPSec은 뜻을 외우는 문제다.",
    "서브넷은 /숫자를 255.255...로 바꾸고, 블록 크기 단위로 네트워크 주소를 찾는다.",
    "OS 문제는 이름 뜻이 답이다. LRU는 가장 오래 안 쓴 것, LFU는 가장 적게 쓴 것이다.",
  ],
  security: [
    "암호 문제는 대칭키, 비대칭키, 해시 중 어디인지 먼저 고른다.",
    "웹 공격은 SQL Injection, XSS, CSRF처럼 공격 이름을 짧게 쓰는 문제가 많다.",
    "인증/인가 문제는 OAuth, JWT, SSO, ISMS 같은 약어를 먼저 떠올린다.",
  ],
  default: [
    "문제에서 핵심 단어 2개만 동그라미 친다.",
    "그 단어가 어느 범위인지 고른다. DB, SQL, 코드, 네트워크, 보안, 테스트 중 하나다.",
    "정답은 문장으로 길게 쓰기보다 시험지에 들어갈 단어 하나를 쓴다.",
  ],
};

const PRACTICE = [
  card("db-001", "DB/SQL", "sql", "must", "SQL에서 중복 행을 제거해 조회하는 예약어는?", ["distinct", "중복제거"], "DISTINCT", "SELECT DISTINCT 컬럼 FROM 테이블 형태로 쓴다.", ["SQL", "DISTINCT"]),
  card("db-002", "DB/SQL", "sql", "must", "DEPT 값의 종류 수만 세려면 COUNT 안에 어떤 표현을 넣는가?", ["countdistinctdept", "count(distinctdept)", "distinct"], "COUNT(DISTINCT DEPT)", "행 수가 아니라 서로 다른 값의 개수다.", ["SQL", "집계"]),
  card("db-003", "DB/SQL", "sql", "must", "테이블 생성, 변경, 삭제를 담당하는 SQL 언어 분류는?", ["ddl", "데이터정의어"], "DDL", "CREATE, ALTER, DROP, TRUNCATE가 대표적이다.", ["SQL", "DDL"]),
  card("db-004", "DB/SQL", "sql", "must", "SELECT, INSERT, UPDATE, DELETE는 어떤 SQL 언어 분류인가?", ["dml", "데이터조작어"], "DML", "데이터를 조회하거나 조작한다.", ["SQL", "DML"]),
  card("db-005", "DB/SQL", "sql", "high", "GRANT와 REVOKE가 속한 SQL 언어 분류는?", ["dcl", "데이터제어어"], "DCL", "권한을 부여하거나 회수한다.", ["SQL", "DCL"]),
  card("db-006", "DB/SQL", "sql", "must", "트랜잭션 작업을 확정하는 명령과 취소하는 명령을 순서대로 쓰시오.", [["commit", "커밋"], ["rollback", "롤백"]], "COMMIT, ROLLBACK", "확정은 COMMIT, 이전 상태로 되돌리는 것은 ROLLBACK.", ["트랜잭션", "TCL"]),
  card("db-007", "DB/SQL", "db", "must", "릴레이션의 속성 개수와 튜플 개수를 각각 무엇이라 하는가?", [["차수", "degree"], ["카디널리티", "cardinality"]], "차수(Degree), 카디널리티(Cardinality)", "열의 수가 차수, 행의 수가 카디널리티다.", ["릴레이션", "DB"]),
  card("db-008", "DB/SQL", "db", "must", "다른 릴레이션의 기본키를 참조하는 속성은?", ["외래키", "foreignkey", "fk"], "외래키", "참조 무결성을 지키는 핵심 키다.", ["키", "DB"]),
  card("db-009", "DB/SQL", "db", "must", "이행적 함수 종속을 제거해 이상 현상을 줄이는 정규형은?", ["3nf", "제3정규형", "삼정규형"], "제3정규형(3NF)", "X->Y, Y->Z이면 X->Z가 성립하는 이행 종속을 제거한다.", ["정규화", "함수종속"]),
  card("db-010", "DB/SQL", "db", "high", "부분 함수 종속을 제거하는 정규형은?", ["2nf", "제2정규형", "이정규형"], "제2정규형(2NF)", "복합키 일부에만 종속되는 속성을 분리한다.", ["정규화", "함수종속"]),
  card("db-011", "DB/SQL", "db", "must", "조인 속성의 중복 컬럼을 제거해 결과를 반환하는 조인은?", ["자연조인", "naturaljoin"], "자연 조인", "동등 조인 결과에서 중복 속성을 제거한다.", ["조인", "DB"]),
  card("db-012", "DB/SQL", "db", "high", "성능 향상을 위해 일부러 중복을 허용하거나 테이블을 합치는 기법은?", ["반정규화", "denormalization"], "반정규화", "조회 성능은 좋아질 수 있지만 무결성 위험이 커진다.", ["정규화", "성능"]),
  card("db-013", "DB/SQL", "sql", "must", "SQL 실행 순서 관점에서 WHERE 뒤에 그룹 조건을 거는 절은?", ["having"], "HAVING", "WHERE는 행 필터, HAVING은 그룹 필터다.", ["SQL", "GROUP BY"]),
  card("db-014", "DB/SQL", "sql", "must", "외래키 제약조건 작성 시 참조 대상 테이블을 나타내는 예약어는?", ["references"], "REFERENCES", "FOREIGN KEY (컬럼) REFERENCES 부모테이블(컬럼) 형태다.", ["SQL", "제약조건"]),
  card("db-015", "DB/SQL", "db", "must", "DB 설계 절차를 순서대로 쓰시오.", [["요구사항분석", "요구분석"], ["개념적설계"], ["논리적설계"], ["물리적설계"], ["구현"]], "요구사항 분석 -> 개념적 설계 -> 논리적 설계 -> 물리적 설계 -> 구현", "기출에서 순서 빈칸으로 잘 나온다.", ["DB설계", "순서"]),
  card("db-016", "DB/SQL", "db", "high", "트랜잭션 ACID 중 모두 수행되거나 모두 수행되지 않아야 한다는 성질은?", ["원자성", "atomicity"], "원자성", "All or Nothing.", ["트랜잭션", "ACID"]),
  card("db-017", "DB/SQL", "db", "high", "장애 복구에서 완료된 트랜잭션 결과를 다시 반영하는 연산은?", ["redo"], "REDO", "완료 전 상태로 되돌리는 것은 UNDO다.", ["회복", "DB"]),
  card("db-018", "DB/SQL", "db", "mid", "검색 속도를 높이지만 삽입/삭제/갱신 부담과 저장공간이 늘 수 있는 객체는?", ["인덱스", "index"], "인덱스", "무조건 많다고 좋은 게 아니다.", ["인덱스", "성능"]),
  card("db-019", "DB/SQL", "db", "mid", "어느 한 시점에 릴레이션에 들어 있는 튜플들의 집합은?", ["릴레이션인스턴스", "relationinstance", "인스턴스"], "릴레이션 인스턴스", "구조는 스키마, 실제 값 집합은 인스턴스.", ["릴레이션", "DB"]),
  card("db-020", "DB/SQL", "db", "mid", "ERD의 기본 구성요소 3가지를 쓰시오.", [["개체", "entity"], ["관계", "relationship"], ["속성", "attribute"]], "개체, 관계, 속성", "사각형, 마름모, 타원으로 표현하는 그 3개다.", ["ERD", "DB"]),

  card("code-001", "코드", "code", "must", "C 코드 출력값은?\nint a[] = {2, 4, 6};\nint *p = a;\nprintf(\"%d\", *(p + 2) + *p);", ["8"], "8", "*(p+2)는 6, *p는 2다.", ["C", "포인터"]),
  card("code-002", "코드", "code", "must", "C에서 3 << 2의 값은?", ["12"], "12", "왼쪽 시프트는 2의 제곱을 곱한다. 3*4=12.", ["C", "비트연산"]),
  card("code-003", "코드", "code", "must", "C 코드 출력값은?\nint x = 3;\nint a = x++;\nint b = ++x;\nprintf(\"%d\", a + b);", ["8"], "8", "a에는 증가 전 3이 들어가고 x는 4가 된다. 다음 줄의 ++x로 x와 b가 5가 되어 3+5=8이다.", ["C", "증감연산"]),
  card("code-004", "코드", "code", "high", "C에서 구조체 포인터 p가 멤버 num에 접근할 때 쓰는 연산자는?", ["->", "화살표"], "->", "일반 구조체 변수는 점(.), 포인터는 화살표(->).", ["C", "구조체"]),
  card("code-005", "코드", "code", "high", "C 코드 출력값은?\nchar s[] = \"ABCDE\";\nprintf(\"%c\", s[1] + 2);", ["D", "d"], "D", "s[1]은 B, 문자 코드로 2를 더하면 D.", ["C", "문자열"]),
  card("code-006", "코드", "code", "must", "Java에서 부모 타입 변수 A a = new B(); 일 때 오버라이딩 메서드 호출은 A와 B 중 어느 클래스 구현이 실행되는가?", ["b", "자식", "하위", "실제객체"], "B", "오버라이딩은 실제 객체 타입 기준으로 동적 바인딩된다.", ["Java", "오버라이딩"]),
  card("code-007", "코드", "code", "must", "Java에서 서로 다른 int 배열 a, b가 같은 값을 가져도 a == b 결과는?", ["false", "거짓"], "false", "배열의 == 는 내용이 아니라 참조 주소 비교다.", ["Java", "참조비교"]),
  card("code-008", "코드", "code", "high", "객체를 하나만 생성해 공유하도록 보장하는 디자인/구현 패턴은?", ["singleton", "싱글톤"], "Singleton", "private 생성자, static 인스턴스, getInstance가 전형적이다.", ["Java", "패턴"]),
  card("code-009", "코드", "code", "high", "Java에서 static 변수의 핵심 특징은?", ["클래스공유", "공유", "class", "static"], "클래스 단위로 공유", "객체마다 따로 생기는 인스턴스 변수와 다르다.", ["Java", "static"]),
  card("code-010", "코드", "code", "must", "Python 출력값은?\nlst = list(range(10))\nprint(lst[::-3])", ["[9,6,3,0]", "9630"], "[9, 6, 3, 0]", "뒤에서부터 3칸씩 이동한다.", ["Python", "슬라이싱"]),
  card("code-011", "코드", "code", "high", "Python 출력값은?\ns = 'HumanDev'\nprint(s[::-1])", ["veDnamuH", "vednamuh"], "veDnamuH", "문자열 뒤집기는 [::-1].", ["Python", "문자열"]),
  card("code-012", "코드", "code", "high", "Python 출력값은?\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))", ["4"], "4", "b는 a와 같은 리스트를 참조한다.", ["Python", "참조"]),
  card("code-013", "코드", "code", "high", "재귀 함수가 자기 자신을 멈추게 하는 조건을 무엇이라 하는가?", ["종료조건", "basecase", "기저조건"], "기저 조건", "없으면 무한 재귀가 된다.", ["알고리즘", "재귀"]),
  card("code-014", "코드", "code", "mid", "C 삼항 연산자 a ? b : c 에서 a가 0이면 어느 값이 선택되는가?", ["c", "뒤", "세번째"], "c", "조건식이 거짓이면 콜론 뒤 값이다.", ["C", "삼항연산자"]),
  card("code-015", "코드", "code", "mid", "Python에서 리스트 끝에 원소를 추가하는 메서드는?", ["append"], "append", "extend는 iterable을 풀어서 붙인다.", ["Python", "리스트"]),

  card("net-001", "네트워크/OS", "netos", "must", "/23 서브넷 마스크를 십진수로 쓰시오.", ["255.255.254.0", "2552552540"], "255.255.254.0", "/23은 11111111.11111111.11111110.00000000.", ["CIDR", "서브넷"]),
  card("net-002", "네트워크/OS", "netos", "must", "192.168.11.20/23 이 속한 네트워크 주소는?", ["192.168.10.0", "192168100"], "192.168.10.0", "/23은 세 번째 옥텟이 2씩 묶인다. 10~11 블록.", ["CIDR", "서브넷"]),
  card("net-003", "네트워크/OS", "netos", "must", "링크 상태 라우팅 프로토콜이며 Dijkstra 알고리즘을 사용하는 대표 프로토콜은?", ["ospf"], "OSPF", "Open Shortest Path First.", ["라우팅", "OSPF"]),
  card("net-004", "네트워크/OS", "netos", "high", "홉 수를 기준으로 동작하는 거리 벡터 라우팅 프로토콜은?", ["rip"], "RIP", "Routing Information Protocol.", ["라우팅", "RIP"]),
  card("net-005", "네트워크/OS", "netos", "must", "IP 패킷을 암호화/인증하며 AH와 ESP를 사용하는 보안 프로토콜은?", ["ipsec"], "IPSec", "VPN 구현에도 많이 언급된다.", ["보안", "네트워크"]),
  card("net-006", "네트워크/OS", "netos", "must", "사설 IP와 공인 IP/포트를 변환해 통신하게 하는 기술은?", ["nat"], "NAT", "Network Address Translation.", ["네트워크", "NAT"]),
  card("net-007", "네트워크/OS", "netos", "high", "HDLC의 정보 프레임, 감독 프레임, 비번호 프레임을 영문 약자로 쓰시오.", [["i", "information"], ["s", "supervisory"], ["u", "unnumbered"]], "I-frame, S-frame, U-frame", "I는 데이터, S는 흐름/오류 제어, U는 링크 제어.", ["HDLC", "네트워크"]),
  card("net-008", "네트워크/OS", "netos", "high", "패킷 교환 방식 중 연결형과 비연결형을 순서대로 쓰시오.", [["가상회선", "virtualcircuit"], ["데이터그램", "datagram"]], "가상회선, 데이터그램", "연결형은 경로를 설정하고, 비연결형은 패킷마다 독립적으로 간다.", ["네트워크", "패킷교환"]),
  card("net-009", "네트워크/OS", "netos", "must", "가장 오랫동안 사용되지 않은 페이지를 교체하는 알고리즘은?", ["lru"], "LRU", "Least Recently Used.", ["OS", "페이지교체"]),
  card("net-010", "네트워크/OS", "netos", "high", "사용 빈도가 가장 낮은 페이지를 교체하는 알고리즘은?", ["lfu"], "LFU", "Least Frequently Used.", ["OS", "페이지교체"]),
  card("net-011", "네트워크/OS", "netos", "high", "남은 실행 시간이 가장 짧은 프로세스를 우선하는 선점형 스케줄링은?", ["srt", "srtf"], "SRT", "Shortest Remaining Time.", ["OS", "스케줄링"]),
  card("net-012", "네트워크/OS", "netos", "must", "Linux 권한 rwx r-x --x 를 8진수로 쓰시오.", ["751"], "751", "r=4, w=2, x=1. 7/5/1.", ["Linux", "chmod"]),
  card("net-013", "네트워크/OS", "netos", "high", "교착상태 4가지 필요조건을 쓰시오.", [["상호배제"], ["점유와대기", "보유대기"], ["비선점"], ["환형대기", "순환대기"]], "상호 배제, 점유와 대기, 비선점, 환형 대기", "하나라도 깨면 교착상태 예방이 가능하다.", ["OS", "Deadlock"]),
  card("net-014", "네트워크/OS", "netos", "mid", "프로세스 안에서 실행되는 더 작은 실행 흐름 단위는?", ["스레드", "thread"], "스레드", "한 프로세스는 여러 스레드를 가질 수 있다.", ["OS", "프로세스"]),
  card("net-015", "네트워크/OS", "netos", "mid", "OSI 7계층 중 라우터가 주로 동작하는 계층은?", ["네트워크", "network", "3계층", "3"], "네트워크 계층", "IP와 라우팅이 이 계층의 핵심이다.", ["OSI", "네트워크"]),

  card("sec-001", "보안", "security", "must", "DES를 대체한 대표 대칭키 블록 암호 알고리즘은?", ["aes"], "AES", "128/192/256비트 키를 사용한다.", ["보안", "암호"]),
  card("sec-002", "보안", "security", "high", "공개키와 개인키를 사용하는 대표 비대칭키 암호 알고리즘은?", ["rsa"], "RSA", "대칭키와 비대칭키 구분은 단골이다.", ["보안", "암호"]),
  card("sec-003", "보안", "security", "high", "임의 길이 데이터를 고정 길이 해시값으로 바꾸는 대표 해시 알고리즘 계열은?", ["sha"], "SHA", "복호화하는 암호가 아니라 해시다.", ["보안", "해시"]),
  card("sec-004", "보안", "security", "must", "사용자 비밀번호를 제3자 앱에 넘기지 않고 접근 권한을 위임하는 표준 프로토콜은?", ["oauth"], "OAuth", "액세스 토큰 기반 권한 위임이다.", ["보안", "인증인가"]),
  card("sec-005", "보안", "security", "high", "JSON 기반으로 인증 정보를 안전하게 전달하는 토큰 형식은?", ["jwt"], "JWT", "Header.Payload.Signature 구조.", ["보안", "토큰"]),
  card("sec-006", "보안", "security", "high", "한 번 로그인으로 여러 서비스를 이용하는 인증 방식은?", ["sso", "single sign on", "single signon"], "SSO", "Single Sign-On.", ["보안", "인증"]),
  card("sec-007", "보안", "security", "must", "정보보호 관리체계를 뜻하는 국내 보안 인증 약자는?", ["isms"], "ISMS", "Information Security Management System.", ["보안", "ISMS"]),
  card("sec-008", "보안", "security", "must", "SQL 삽입 공격을 막기 위해 입력값을 SQL 코드와 분리해 바인딩하는 방법은?", ["preparedstatement", "parameterizedquery", "매개변수화쿼리", "프리페어드스테이트먼트"], "Prepared Statement", "문자열 이어붙이기로 SQL을 만들지 않는다.", ["보안", "SQLInjection"]),
  card("sec-009", "보안", "security", "high", "웹 페이지에 악성 스크립트를 삽입해 사용자의 브라우저에서 실행시키는 공격은?", ["xss", "crosssitescripting"], "XSS", "출력 인코딩과 입력 검증으로 줄인다.", ["보안", "웹취약점"]),
  card("sec-010", "보안", "security", "mid", "정상 사이트와 비슷한 오타 도메인을 만들어 사용자를 속이는 공격은?", ["typosquatting", "타이포스쿼팅"], "Typosquatting", "URL 오타를 노리는 사회공학형 공격이다.", ["보안", "신기술"]),

  card("sw-001", "SW공학", "design", "must", "응집도 중 가장 좋은 응집도와 가장 나쁜 응집도를 쓰시오.", [["기능적", "functional"], ["우연적", "coincidental"]], "기능적 응집도, 우연적 응집도", "하나의 기능만 잘 수행하면 응집도가 높다.", ["응집도", "설계"]),
  card("sw-002", "SW공학", "design", "high", "한 객체 상태가 바뀌면 의존 객체들에게 자동 통지하는 디자인 패턴은?", ["observer", "옵저버"], "Observer", "구독/알림 구조로 기억하면 쉽다.", ["디자인패턴", "Observer"]),
  card("sw-003", "SW공학", "design", "high", "기능 계층과 구현 계층을 분리해 연결하는 구조 패턴은?", ["bridge", "브리지"], "Bridge", "추상화와 구현을 독립적으로 확장한다.", ["디자인패턴", "Bridge"]),
  card("sw-004", "SW공학", "design", "high", "컬렉션 내부 구조를 노출하지 않고 순차 접근하게 하는 패턴은?", ["iterator", "이터레이터"], "Iterator", "반복 접근을 캡슐화한다.", ["디자인패턴", "Iterator"]),
  card("sw-005", "SW공학", "test", "must", "프로그램의 모든 문장이 최소 한 번 실행됐는지 보는 커버리지는?", ["문장커버리지", "statementcoverage"], "문장 커버리지", "Statement Coverage.", ["테스트", "커버리지"]),
  card("sw-006", "SW공학", "test", "must", "조건문의 참/거짓 분기가 최소 한 번씩 실행됐는지 보는 커버리지는?", ["분기커버리지", "branchcoverage", "결정커버리지"], "분기 커버리지", "Branch/Decision Coverage.", ["테스트", "커버리지"]),
  card("sw-007", "SW공학", "test", "high", "소스 코드를 실행하지 않고 결함을 찾는 분석과 실행하며 찾는 분석을 순서대로 쓰시오.", [["정적분석", "static"], ["동적분석", "dynamic"]], "정적 분석, 동적 분석", "실행 여부가 기준이다.", ["테스트", "분석"]),
  card("sw-008", "SW공학", "test", "mid", "입력값을 동등한 그룹으로 나눠 대표값을 테스트하는 블랙박스 기법은?", ["동등분할", "equivalencepartitioning"], "동등 분할", "경계값 분석과 함께 자주 묶인다.", ["테스트", "블랙박스"]),
  card("sw-009", "SW공학", "req", "must", "응답 시간, 처리량 같은 품질 속성은 기능 요구사항인가 비기능 요구사항인가?", ["비기능", "nonfunctional"], "비기능 요구사항", "성능, 보안, 신뢰성, 자원, 운영은 비기능 쪽이다.", ["요구사항", "비기능"]),
  card("sw-010", "SW공학", "req", "high", "요구사항이 설계, 구현, 테스트까지 연결되는지 추적하는 능력은?", ["추적성", "traceability"], "요구사항 추적성", "변경 영향 분석에도 필요하다.", ["요구사항", "추적성"]),
  card("sw-011", "SW공학", "design", "mid", "시스템의 기능과 외부 행위자를 표현하는 UML 다이어그램은?", ["유스케이스", "usecase"], "유스케이스 다이어그램", "사용자 관점의 기능을 본다.", ["UML", "요구사항"]),
  card("sw-012", "SW공학", "integration", "mid", "기업 내 여러 애플리케이션을 연계하는 통합 솔루션 약어는?", ["eai"], "EAI", "Enterprise Application Integration.", ["통합구현", "EAI"]),
  card("sw-013", "SW공학", "integration", "mid", "HTTP URI와 메서드를 활용하는 자원 중심 API 아키텍처 스타일은?", ["rest"], "REST", "JSON과 함께 실무형 문제로 나온다.", ["인터페이스", "REST"]),
  card("sw-014", "SW공학", "package", "mid", "제품 변경사항, 개선사항, 알려진 문제 등을 정리한 문서는?", ["릴리즈노트", "releasenote", "releasenotes"], "릴리즈 노트", "패키징 영역 단답으로 대비한다.", ["패키징", "릴리즈"]),
  card("sw-015", "SW공학", "server", "mid", "소스 변경 이력을 관리하고 협업을 돕는 대표 분산 버전관리 도구는?", ["git"], "Git", "형상관리와 버전관리 맥락으로 나온다.", ["형상관리", "Git"]),
  card("sw-016", "SW공학", "server", "mid", "짧은 반복 주기로 제품을 개선하는 애자일 개발 단위는?", ["스프린트", "sprint"], "스프린트", "Scrum에서 반복 개발 주기를 뜻한다.", ["애자일", "Scrum"]),
];

PRACTICE.push(...(window.CODE_SQL_PRACTICE_ROWS || []).map((row) => card(...row)));

const STORAGE_KEY = "jeongcheogi_5day_trainer_v1";
const STATE_VERSION = 2;
const BACKUP_APP_ID = "jeongcheogi-trainer";
const MOCK_DURATION_MS = 150 * 60 * 1000;
const REVIEW_INTERVALS_MS = [
  10 * 60 * 1000,
  24 * 60 * 60 * 1000,
  3 * 24 * 60 * 60 * 1000,
  7 * 24 * 60 * 60 * 1000,
  14 * 24 * 60 * 60 * 1000,
  30 * 24 * 60 * 60 * 1000,
];
let state;
let currentMode = "all";
let currentQuestion = null;
let mockSession = null;
let mockTimerId = null;
let lastMockResult = null;
let selectedMockHistoryId = null;
let selectedMockMode = "standard";
let storageWarningShown = false;
let currentAcademyLang = "C";
let currentCoverageSkill = null;
let currentQuestionGraded = false;

function card(id, domain, type, level, question, accept, answer, explain, tags, options = {}) {
  const groupAccept = Array.isArray(accept[0]) ? accept : null;
  const flatAccept = groupAccept ? [] : accept;
  return {
    id,
    domain,
    type,
    level,
    question,
    accept: flatAccept,
    groups: groupAccept,
    answer,
    explain,
    tags: [...new Set((tags || []).map((tag) => String(tag).trim()).filter(Boolean))],
    answerMode: options.answerMode,
    wholeAccept: options.wholeAccept || [],
  };
}

const THEORY_EXCLUDED_TAGS = new Set([
  "C",
  "Java",
  "Python",
  "코드",
  "출력",
  "포인터",
  "주소",
  "증감연산",
  "static",
  "equals",
  "슬라이싱",
  "리스트",
  "문자열",
  "구조체",
]);

const THEORY_COMPOSITE_ANSWERS = {
  "master-recovery": {
    groups: [["REDO", "재실행"], ["UNDO", "취소"]],
  },
  "master-join-types": {
    groups: [["세타 조인", "Theta Join"], ["동등 조인", "Equi Join"], ["자연 조인", "Natural Join"]],
  },
  "master-sql-group": {
    groups: [["GROUP BY", "그룹화"], ["HAVING", "그룹 조건"]],
  },
  "master-schema-levels": {
    groups: [["외부 스키마"], ["개념 스키마"], ["내부 스키마"]],
    wholeAccept: ["3단계 스키마"],
  },
  "master-relation-basics": {
    groups: [["튜플"], ["속성"], ["차수"], ["카디널리티"], ["도메인"]],
    wholeAccept: ["릴레이션 구성"],
  },
  "master-integrity": {
    groups: [["개체 무결성"], ["참조 무결성"], ["도메인 무결성"]],
    wholeAccept: ["Integrity"],
  },
  "master-sql-write": {
    groups: [["INSERT"], ["UPDATE"], ["DELETE"]],
    wholeAccept: ["DML"],
  },
  "master-db-keys": {
    groups: [["기본키"], ["외래키"], ["후보키"], ["대체키"], ["슈퍼키"]],
    wholeAccept: ["DB Key"],
  },
  "master-foreign-key-ddl": {
    groups: [["FOREIGN KEY"], ["REFERENCES"]],
    wholeAccept: ["외래키 제약"],
  },
  "master-sql-null-count": {
    groups: [["COUNT", "COUNT(*)", "COUNT(column)"], ["NULL"]],
  },
  "master-subnet": {
    groups: [["서브넷", "Subnet", "FLSM"], ["CIDR"]],
  },
  "master-routing": {
    groups: [["IGP"], ["EGP"], ["OSPF"], ["BGP"], ["RIP"]],
    wholeAccept: ["라우팅 프로토콜"],
  },
  "master-packet-switch": {
    groups: [["가상회선", "Virtual Circuit"], ["데이터그램", "Datagram"]],
  },
  "master-arp-rarp": {
    groups: [["ARP", "Address Resolution Protocol"], ["RARP", "Reverse ARP"]],
  },
  "master-cpu-scheduling": {
    groups: [["SJF"], ["RR"], ["SRT"]],
    wholeAccept: ["CPU Scheduling"],
  },
  "master-page-replacement": {
    groups: [["LRU"], ["LFU"]],
    wholeAccept: ["페이지 교체"],
  },
  "master-linux-commands": {
    groups: [["pwd"], ["ls"], ["cd"], ["cp"]],
    wholeAccept: ["Linux 명령"],
  },
  "master-web-basics": {
    groups: [["HTTP"], ["Hypertext"], ["HTML"]],
    wholeAccept: ["Web"],
  },
  "master-idea-skipjack": {
    groups: [["IDEA"], ["SKIPJACK"]],
    wholeAccept: ["대칭키 알고리즘"],
  },
  "master-malware-types": {
    groups: [["웜"], ["트로이 목마"], ["바이러스"]],
    wholeAccept: ["Malware"],
  },
  "master-social-dark-data": {
    groups: [["사회공학", "Social Engineering"], ["다크 데이터", "Dark Data"]],
  },
  "master-trustzone-typo": {
    groups: [["TrustZone", "트러스트존"], ["Typosquatting", "타이포스쿼팅"]],
  },
  "master-access-control": {
    groups: [["DAC"], ["MAC"], ["RBAC"]],
    wholeAccept: ["접근통제 모델"],
  },
  "master-error-detection": {
    groups: [["패리티"], ["CRC"], ["해밍"], ["FEC"], ["BEC"]],
    wholeAccept: ["오류 검출 및 정정"],
  },
  "master-crypto": {
    groups: [["AES"], ["DES"], ["ARIA"], ["SEED"], ["RSA"], ["ECC"]],
    wholeAccept: ["암호 알고리즘 분류"],
  },
  "master-static-dynamic": {
    groups: [["정적 분석", "Static Analysis"], ["동적 분석", "Dynamic Analysis"]],
  },
  "master-v-model": {
    groups: [["단위 테스트"], ["통합 테스트"], ["시스템 테스트"], ["인수 테스트"]],
    wholeAccept: ["V Model"],
  },
  "master-alpha-beta": {
    groups: [["알파 테스트", "Alpha Test"], ["베타 테스트", "Beta Test"]],
  },
  "master-fan-in-out": {
    groups: [["Fan-in", "팬인"], ["Fan-out", "팬아웃"]],
  },
  "master-boundary-equivalence": {
    groups: [["동등 분할", "Equivalence Partitioning"], ["경계값 분석", "Boundary Value Analysis"]],
  },
  "master-config-tools": {
    groups: [["CVS"], ["SVN"], ["Git"]],
    wholeAccept: ["형상관리 도구"],
  },
  "master-pattern-bridge-observer": {
    groups: [["Bridge", "브리지"], ["Observer", "옵저버"]],
  },
  "master-pattern-singleton-visitor": {
    groups: [["Singleton", "싱글톤"], ["Visitor", "방문자"]],
  },
  "master-pattern-categories": {
    groups: [["생성 패턴"], ["구조 패턴"], ["행위 패턴"]],
    wholeAccept: ["GoF 분류"],
  },
  "master-coverage-basic": {
    groups: [["문장 커버리지"], ["분기 커버리지"], ["조건 커버리지"]],
    wholeAccept: ["화이트박스 커버리지"],
  },
  "master-stub-driver": {
    groups: [["스텁", "Stub"], ["드라이버", "Driver"]],
  },
  "master-testcase-parts": {
    groups: [["테스트 조건"], ["테스트 데이터"], ["예상 결과"]],
    wholeAccept: ["Test Case"],
  },
  "master-uml-relations": {
    groups: [["연관 관계"], ["일반화 관계"], ["의존 관계"]],
    wholeAccept: ["UML 관계"],
  },
  "master-nonfunctional": {
    groups: [["운영 요구사항"], ["자원 요구사항"], ["성능 요구사항"]],
    wholeAccept: ["비기능 요구사항"],
  },
  "master-cloud-models": {
    groups: [["IaaS"], ["PaaS"], ["SaaS"]],
    wholeAccept: ["Cloud Service Model"],
  },
  "cs-sql-011": {
    groups: [["MAX"], ["MIN"]],
  },
};

const THEORY_PRACTICE = THEORY_ITEMS.filter(
  (item) => !item.tags.some((tag) => THEORY_EXCLUDED_TAGS.has(tag)),
).map((item) => {
  const composite = THEORY_COMPOSITE_ANSWERS[item.id];
  return card(
    `theory-${item.id}`,
    "이론",
    "theory",
    item.heat === "MAX" ? "must" : item.heat === "HIGH" ? "high" : "mid",
    `${item.oneLine}\n\n위 설명의 핵심 개념은?`,
    composite?.groups || [item.title, ...(item.aliases || [])],
    item.title,
    `${item.why} 외우는 법: ${item.memorize}`,
    item.tags,
    composite
      ? { answerMode: "set", wholeAccept: composite.wholeAccept || [] }
      : {},
  );
});

state = loadState();
mockSession = restoreMockSession(state.mockDraft);
if (mockSession) selectedMockMode = mockSession.mode;

function emptyState() {
  return {
    version: STATE_VERSION,
    day: 1,
    done: {},
    wrong: {},
    checks: {},
    log: [],
    mockBest: null,
    mastery: {},
    mockDraft: null,
    mockHistory: [],
  };
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function practiceItemMap() {
  return new Map([...PRACTICE, ...THEORY_PRACTICE].map((item) => [item.id, item]));
}

function normalizeMockDraft(value) {
  if (!isRecord(value) || !Array.isArray(value.itemIds)) return null;
  const knownIds = practiceItemMap();
  const itemIds = [...new Set(value.itemIds.map(String))]
    .filter((id) => knownIds.has(id))
    .slice(0, 20);
  if (!itemIds.length) return null;

  const startedAt = Number.isFinite(value.startedAt) && value.startedAt > 0
    ? value.startedAt
    : Date.now();
  const deadline = Number.isFinite(value.deadline) && value.deadline > startedAt
    ? value.deadline
    : startedAt + MOCK_DURATION_MS;
  const answers = {};
  const flags = {};
  itemIds.forEach((id) => {
    if (isRecord(value.answers) && typeof value.answers[id] === "string") {
      answers[id] = value.answers[id].slice(0, 1000);
    }
    if (isRecord(value.flags) && value.flags[id] === true) flags[id] = true;
  });

  return {
    version: 1,
    id: typeof value.id === "string" ? value.id.slice(0, 80) : `mock-${startedAt}`,
    mode: value.mode === "weakness" ? "weakness" : "standard",
    itemIds,
    index: Math.min(Math.max(Math.trunc(Number(value.index) || 0), 0), itemIds.length - 1),
    answers,
    flags,
    startedAt,
    deadline,
  };
}

function normalizeState(value) {
  const source = isRecord(value) ? value : {};
  const result = emptyState();
  const knownIds = practiceItemMap();
  result.day = Math.min(Math.max(Math.trunc(Number(source.day) || 1), 1), 5);

  if (isRecord(source.done)) {
    Object.entries(source.done).forEach(([id, done]) => {
      if (knownIds.has(id) && done === true) result.done[id] = true;
    });
  }
  if (isRecord(source.wrong)) {
    Object.entries(source.wrong).forEach(([id, count]) => {
      const safeCount = Math.min(Math.max(Math.trunc(Number(count) || 0), 0), 999);
      if (knownIds.has(id) && safeCount) result.wrong[id] = safeCount;
    });
  }
  if (isRecord(source.checks)) {
    Object.entries(source.checks).forEach(([id, checked]) => {
      if (/^day-[1-5]-\d+$/.test(id) && checked === true) result.checks[id] = true;
    });
  }
  if (Array.isArray(source.log)) {
    result.log = source.log
      .filter((entry) => isRecord(entry) && knownIds.has(String(entry.id)))
      .slice(-1000)
      .map((entry) => ({
        id: String(entry.id),
        correct: entry.correct === true,
        time: Number.isFinite(entry.time) && entry.time > 0 ? entry.time : Date.now(),
      }));
  }

  const mockBest = source.mockBest === null || source.mockBest === undefined
    ? null
    : Number(source.mockBest);
  result.mockBest = Number.isFinite(mockBest)
    ? Math.min(Math.max(Math.round(mockBest), 0), 100)
    : null;

  if (isRecord(source.mastery)) {
    Object.entries(source.mastery).forEach(([id, record]) => {
      if (!knownIds.has(id) || !isRecord(record)) return;
      result.mastery[id] = {
        stage: Math.min(Math.max(Math.trunc(Number(record.stage) || 0), 0), 5),
        streak: Math.min(Math.max(Math.trunc(Number(record.streak) || 0), 0), 999),
        attempts: Math.min(Math.max(Math.trunc(Number(record.attempts) || 0), 0), 99999),
        correct: Math.min(Math.max(Math.trunc(Number(record.correct) || 0), 0), 99999),
        lastSeen: Number.isFinite(record.lastSeen) && record.lastSeen > 0 ? record.lastSeen : 0,
        nextReview: Number.isFinite(record.nextReview) && record.nextReview > 0
          ? record.nextReview
          : 0,
      };
    });
  }

  Object.keys(result.done).forEach((id) => {
    if (!result.mastery[id]) {
      result.mastery[id] = {
        stage: 2,
        streak: 1,
        attempts: 1,
        correct: 1,
        lastSeen: 0,
        nextReview: 0,
      };
    }
  });
  Object.keys(result.wrong).forEach((id) => {
    if (!result.mastery[id]) {
      result.mastery[id] = {
        stage: 0,
        streak: 0,
        attempts: result.wrong[id],
        correct: 0,
        lastSeen: 0,
        nextReview: 0,
      };
    }
  });

  result.mockDraft = normalizeMockDraft(source.mockDraft);
  if (Array.isArray(source.mockHistory)) {
    result.mockHistory = source.mockHistory
      .filter((entry) => isRecord(entry))
      .slice(-20)
      .map((entry) => {
        const results = Array.isArray(entry.results)
          ? entry.results
              .filter((item) => isRecord(item) && knownIds.has(String(item.itemId)))
              .slice(0, 20)
              .map((item) => ({
                itemId: String(item.itemId),
                input: typeof item.input === "string" ? item.input.slice(0, 1000) : "",
                correct: item.correct === true,
                points: Math.min(Math.max(Number(item.points) || 0, 0), 5),
                maxPoints: 5,
              }))
          : [];
        return {
          id: String(entry.id || "").slice(0, 80),
          mode: entry.mode === "weakness" ? "weakness" : "standard",
          completedAt: Number.isFinite(entry.completedAt) ? entry.completedAt : 0,
          strictScore: Math.min(Math.max(Number(entry.strictScore) || 0, 0), 100),
          learningScore: Math.min(Math.max(Number(entry.learningScore) || 0, 0), 100),
          timedOut: entry.timedOut === true,
          results,
        };
      });
  }
  return result;
}

function normalizeImportedState(payload) {
  if (!isRecord(payload) || payload.app !== BACKUP_APP_ID || !isRecord(payload.state)) {
    throw new Error("이 앱에서 내보낸 학습 기록 파일이 아닙니다.");
  }
  return normalizeState(payload.state);
}

function readStateFromStorage(storage) {
  try {
    return normalizeState(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return emptyState();
  }
}

function loadState() {
  return readStateFromStorage(localStorage);
}

function writeStateToStorage(storage, targetState) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(targetState));
    return true;
  } catch {
    return false;
  }
}

function saveState() {
  state.version = STATE_VERSION;
  const saved = writeStateToStorage(localStorage, state);
  if (saved) {
    storageWarningShown = false;
  } else if (!storageWarningShown && typeof document !== "undefined") {
    storageWarningShown = true;
    alert("저장 공간이 부족해 학습 기록을 저장하지 못했습니다. 기록을 내보낸 뒤 오래된 모의고사 이력을 정리해 주세요.");
  }
  return saved;
}

function createExportPayload(targetState = state) {
  return {
    app: BACKUP_APP_ID,
    version: STATE_VERSION,
    exportedAt: new Date().toISOString(),
    state: normalizeState(targetState),
  };
}

function masteryTransition(previous, correct, now = Date.now()) {
  const current = isRecord(previous) ? previous : {};
  const previousStage = Math.min(Math.max(Math.trunc(Number(current.stage) || 0), 0), 5);
  const stage = correct ? Math.min(previousStage + 1, 5) : Math.max(previousStage - 1, 0);
  return {
    stage,
    streak: correct ? Math.max(Math.trunc(Number(current.streak) || 0), 0) + 1 : 0,
    attempts: Math.max(Math.trunc(Number(current.attempts) || 0), 0) + 1,
    correct: Math.max(Math.trunc(Number(current.correct) || 0), 0) + (correct ? 1 : 0),
    lastSeen: now,
    nextReview: now + (correct ? REVIEW_INTERVALS_MS[stage] : REVIEW_INTERVALS_MS[0]),
  };
}

function isMasteryDue(record, now = Date.now()) {
  return Boolean(record) && (!record.nextReview || record.nextReview <= now);
}

function dueReviewItems(now = Date.now()) {
  return [...PRACTICE, ...THEORY_PRACTICE].filter((item) =>
    isMasteryDue(state.mastery[item.id], now),
  );
}

function restoreMockSession(draft) {
  const safeDraft = normalizeMockDraft(draft);
  if (!safeDraft) return null;
  const knownItems = practiceItemMap();
  const items = safeDraft.itemIds.map((id) => knownItems.get(id)).filter(Boolean);
  return items.length === safeDraft.itemIds.length ? { ...safeDraft, items } : null;
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^0-9a-z가-힣]/g, "");
}

function matchesAnswer(user, item) {
  return window.ANSWER_ENGINE.matches(user, item);
}

function answerRule(item) {
  const rules = {
    term: "용어형: 정답 전체 또는 등록된 동의어와 일치해야 한다.",
    numeric: "숫자형: 부호와 소수점을 포함해 정답 숫자를 정확히 쓴다.",
    output: "출력형: 부호, 소수점, 기호와 출력 순서를 정확히 쓴다.",
    ordered: "순서형: 모든 답을 문제에서 요구한 순서대로 쓴다.",
    set: "복수답형: 필요한 항목을 모두 쓰며 항목 순서는 상관없다.",
  };
  return rules[window.ANSWER_ENGINE.answerMode(item)] || rules.term;
}

function pickWeighted(items) {
  const weighted = [];
  items.forEach((item) => {
    const wrongWeight = state.wrong[item.id] ? 4 : 1;
    const mustWeight = item.level === "must" ? 2 : 1;
    const mastery = state.mastery[item.id];
    const reviewWeight = isMasteryDue(mastery)
      ? 3 + Math.max(0, 3 - (mastery?.stage || 0))
      : 1;
    const count = wrongWeight * mustWeight * reviewWeight;
    for (let index = 0; index < count; index += 1) weighted.push(item);
  });
  return weighted[Math.floor(Math.random() * weighted.length)] || items[0];
}

function poolByMode(mode) {
  if (mode === "review") {
    return dueReviewItems();
  }
  if (mode === "wrong") {
    const wrongItems = [...PRACTICE, ...THEORY_PRACTICE].filter((item) => state.wrong[item.id]);
    return wrongItems.length ? wrongItems : PRACTICE.filter((item) => item.level === "must");
  }
  if (mode === "must") return PRACTICE.filter((item) => item.level === "must");
  if (mode === "theory") {
    return [...THEORY_PRACTICE, ...PRACTICE.filter((item) => item.type === "theory")];
  }
  if (mode === "sql") return PRACTICE.filter((item) => item.type === "sql" || item.type === "db");
  if (mode === "code") return PRACTICE.filter((item) => item.type === "code");
  if (mode === "netos") return PRACTICE.filter((item) => item.type === "netos" || item.type === "security");
  if (mode === "exam") return PRACTICE.filter((item) => item.tags.includes("기출급"));
  if (mode === "coverage" && currentCoverageSkill) {
    return PRACTICE.filter((item) => item.tags.includes(`skill:${currentCoverageSkill}`));
  }
  return PRACTICE;
}

function syncDrillModeButtons() {
  document.querySelectorAll(".mode").forEach((button) => {
    const active = button.dataset.mode === currentMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function guideKey(item) {
  if (item.type === "sql" || item.type === "db") return item.type;
  if (item.type === "code" || item.type === "netos" || item.type === "security") return item.type;
  if (item.tags.some((tag) => ["테스트", "커버리지", "요구사항", "디자인패턴"].includes(tag))) return "default";
  return "default";
}

function renderSolveGuide(item) {
  const steps = BEGINNER_GUIDES[guideKey(item)] || BEGINNER_GUIDES.default;
  return `
    <strong>처음 풀 때는 이 순서로</strong>
    <ol>${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
  `;
}

function renderHint(item) {
  const tags = item.tags.map(escapeHtml).join(", ");
  const answerHead = String(item.answer).split(/[,(]/)[0].trim();
  const firstChar = answerHead[0] || "";
  const lengthHint = answerHead.replace(/\s/g, "").length;
  const groupHint = item.groups
    ? `이 문제는 답이 ${item.groups.length}개 필요하다. 빠뜨리면 오답으로 본다.`
    : `정답 첫 글자/첫 약자는 "${escapeHtml(firstChar)}" 쪽이다.`;

  return `
    <strong>힌트</strong>
    <ul>
      <li>범위 태그: ${tags}</li>
      <li>${groupHint}</li>
      <li>정답은 대략 ${lengthHint}글자짜리 핵심어다. 모르면 정답 보기를 누르고 그대로 3번 써라.</li>
    </ul>
  `;
}

function setView(viewId) {
  const heavyViews = {
    theory: "theoryGrid",
    codeacademy: "codeAcademyContent",
    coverage: "coverageList",
  };
  Object.entries(heavyViews).forEach(([view, rootId]) => {
    if (view !== viewId) document.getElementById(rootId)?.replaceChildren();
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active-view", view.id === viewId);
  });
  document.querySelectorAll(".tab").forEach((tab) => {
    const selected = tab.dataset.view === viewId;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", String(selected));
  });
  if (viewId === "scope") {
    renderScope();
    renderSources();
  }
  if (viewId === "theory") renderTheory();
  if (viewId === "codeacademy") renderCodeAcademy();
  if (viewId === "coverage") renderCoverage();
  if (viewId === "mock") renderMock();
  if (viewId === "survival") renderRoutine();
}

function formatMockDate(timestamp) {
  if (!timestamp) return "날짜 없음";
  return new Intl.DateTimeFormat("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

function mockModeLabel(mode) {
  return mode === "weakness" ? "약점 집중" : "실전 표준";
}

function hydrateMockHistoryResults(entry) {
  const knownItems = practiceItemMap();
  return (entry?.results || [])
    .map((result) => {
      const item = knownItems.get(result.itemId);
      return item ? { ...result, item } : null;
    })
    .filter(Boolean);
}

function analyzeMockDomains(results) {
  const domains = {};
  results.forEach((result) => {
    const domain = result.item?.domain || "기타";
    if (!domains[domain]) {
      domains[domain] = { domain, total: 0, correct: 0, points: 0, maxPoints: 0 };
    }
    domains[domain].total += 1;
    domains[domain].correct += result.correct ? 1 : 0;
    domains[domain].points += Number(result.points) || 0;
    domains[domain].maxPoints += Number(result.maxPoints) || 5;
  });
  return Object.values(domains)
    .map((domain) => ({
      ...domain,
      strictRate: domain.total ? Math.round((domain.correct / domain.total) * 100) : 0,
      learningRate: domain.maxPoints
        ? Math.round((domain.points / domain.maxPoints) * 100)
        : 0,
    }))
    .sort((left, right) => left.strictRate - right.strictRate || right.total - left.total);
}

function renderMockHistoryDetail(historyId) {
  const root = document.getElementById("mockHistoryDetail");
  const entryIndex = state.mockHistory.findIndex((entry) => entry.id === historyId);
  if (entryIndex < 0) {
    root.hidden = true;
    root.replaceChildren();
    return;
  }
  const entry = state.mockHistory[entryIndex];
  const previous = state.mockHistory
    .slice(0, entryIndex)
    .reverse()
    .find((candidate) => candidate.mode === entry.mode);
  const delta = previous ? entry.strictScore - previous.strictScore : null;
  const results = hydrateMockHistoryResults(entry);
  const domains = analyzeMockDomains(results);
  root.hidden = false;
  root.innerHTML = `
    <div class="history-detail-head">
      <div>
        <h3>${escapeHtml(formatMockDate(entry.completedAt))} 상세 결과</h3>
        <p>${mockModeLabel(entry.mode)} · 엄격 ${entry.strictScore}점 · 학습용 ${entry.learningScore}점${delta === null ? " · 첫 기록" : ` · 이전보다 ${delta > 0 ? "+" : ""}${delta}점`}${entry.timedOut ? " · 시간 종료" : ""}</p>
      </div>
      <button type="button" class="ghost-button" data-history-close>닫기</button>
    </div>
    ${
      results.length
        ? `
          <div class="domain-analysis">
            ${domains
              .map(
                (domain) => `
                  <div class="domain-analysis-row">
                    <div><strong>${escapeHtml(domain.domain)}</strong><span>${domain.correct}/${domain.total} 정답 · 학습 ${domain.learningRate}%</span></div>
                    <div class="domain-score-track" aria-label="${escapeHtml(domain.domain)} 엄격 정답률 ${domain.strictRate}%"><span style="width: ${domain.strictRate}%"></span></div>
                  </div>
                `,
              )
              .join("")}
          </div>
          <div class="history-answer-list">
            ${results
              .map(
                (result, index) => `
                  <div class="result-row ${result.correct ? "ok" : ""}">
                    <strong>${index + 1}. ${result.correct ? "정답" : result.points > 0 ? "부분 이해" : "오답"} - ${escapeHtml(result.item.domain)} (${result.points}/5점)</strong><br />
                    내 답: ${escapeHtml(result.input || "(미응답)")}<br />
                    정답: ${escapeHtml(result.item.answer)}<br />
                    ${escapeHtml(result.item.explain)}
                  </div>
                `,
              )
              .join("")}
          </div>
        `
        : `<p class="empty-state">이 기록은 상세 저장 기능 추가 전 결과라 점수만 볼 수 있습니다.</p>`
    }
  `;
}

function renderMockHistory() {
  const list = document.getElementById("mockHistoryList");
  const trend = document.getElementById("mockTrend");
  const history = state.mockHistory;
  if (!history.length) {
    trend.textContent = "기록 없음";
    list.innerHTML = `<p class="empty-state">모의고사를 제출하면 점수 변화와 분야별 분석이 여기에 쌓입니다.</p>`;
    document.getElementById("mockHistoryDetail").hidden = true;
    return;
  }

  const latest = history[history.length - 1];
  const previous = [...history]
    .slice(0, -1)
    .reverse()
    .find((entry) => entry.mode === latest.mode);
  const latestDelta = previous ? latest.strictScore - previous.strictScore : null;
  trend.textContent = latestDelta === null
    ? `최근 ${latest.strictScore}점`
    : `최근 ${latest.strictScore}점 · ${latestDelta >= 0 ? "+" : ""}${latestDelta}`;
  list.innerHTML = [...history]
    .reverse()
    .slice(0, 6)
    .map((entry, reverseIndex) => {
      const originalIndex = history.length - 1 - reverseIndex;
      const before = history
        .slice(0, originalIndex)
        .reverse()
        .find((candidate) => candidate.mode === entry.mode);
      const delta = before ? entry.strictScore - before.strictScore : null;
      return `
        <button type="button" class="mock-history-row" data-history-id="${escapeHtml(entry.id)}">
          <span>${escapeHtml(formatMockDate(entry.completedAt))} · ${mockModeLabel(entry.mode)}${entry.timedOut ? " · 시간 종료" : ""}</span>
          <strong>엄격 ${entry.strictScore}점</strong>
          <span>학습 ${entry.learningScore}점${delta === null ? " · 첫 기록" : ` · ${delta >= 0 ? "+" : ""}${delta}`}</span>
        </button>
      `;
    })
    .join("");

  if (selectedMockHistoryId && history.some((entry) => entry.id === selectedMockHistoryId)) {
    renderMockHistoryDetail(selectedMockHistoryId);
  } else {
    selectedMockHistoryId = null;
    document.getElementById("mockHistoryDetail").hidden = true;
  }
}

function updateStats() {
  const doneCount = Object.keys(state.done).length;
  const wrongCount = Object.keys(state.wrong).length;
  const reviewDueCount = dueReviewItems().length;
  const recent = state.log.slice(-50);
  const accuracy = recent.length
    ? Math.round((recent.filter((entry) => entry.correct).length / recent.length) * 100)
    : 0;

  document.getElementById("doneCount").textContent = doneCount;
  document.getElementById("wrongCount").textContent = wrongCount;
  document.getElementById("reviewDueCount").textContent = reviewDueCount;
  document.getElementById("accuracy").textContent = `${accuracy}%`;
  document.getElementById("mockBest").textContent = state.mockBest === null ? "-" : `${state.mockBest}점`;
  document.getElementById("todayMode").textContent = `Day ${state.day}: ${DAY_PLANS[state.day - 1].focus}`;
  document.getElementById("daySelect").value = String(state.day);
  renderWeakTags();
  renderMockHistory();
}

function renderDayPlan() {
  const plan = DAY_PLANS[state.day - 1];
  const root = document.getElementById("dayPlan");
  root.innerHTML = `
    <article class="panic-item">
      <strong>${plan.title}</strong>
      <span>${plan.focus}</span>
    </article>
    ${plan.tasks
      .map(([title, body], index) => {
        const id = `day-${state.day}-${index}`;
        const checked = state.checks[id] ? "checked" : "";
        return `
          <label class="task">
            <input type="checkbox" data-check="${id}" ${checked} />
            <span><strong>${title}</strong><span>${body}</span></span>
          </label>
        `;
      })
      .join("")}
  `;
}

function renderScope() {
  const query = normalize(document.getElementById("scopeSearch").value);
  const filter = document.getElementById("scopeFilter").value;
  const root = document.getElementById("scopeGrid");
  const items = SCOPE_ITEMS.filter((item) => {
    const haystack = normalize(`${item.title} ${item.summary} ${item.terms.join(" ")}`);
    const heatOk = filter === "all" || item.heat === filter;
    const queryOk = !query || haystack.includes(query);
    return heatOk && queryOk;
  });

  root.innerHTML = items
    .map(
      (item) => `
        <article class="scope-card">
          <header>
            <div>
              <h3>${item.title}</h3>
              <span class="pill muted">2026 공식 ${item.officialNo}영역</span>
              <span class="pill ${item.heat === "MAX" ? "warn" : ""}">${item.heat}</span>
            </div>
          </header>
          <p>${item.summary}</p>
          <div class="tags">${item.terms.map((term) => `<span class="tag">${term}</span>`).join("")}</div>
          <p><strong>루트:</strong> ${item.route}</p>
        </article>
      `,
    )
    .join("");
}

function renderTheory() {
  const query = normalize(document.getElementById("theorySearch").value);
  const filter = document.getElementById("theoryFilter").value;
  const domainFilter = document.getElementById("theoryDomainFilter").value;
  const root = document.getElementById("theoryGrid");
  const items = THEORY_ITEMS.filter((item) => {
    const haystack = normalize(
      `${item.title} ${(item.aliases || []).join(" ")} ${item.oneLine} ${item.why} ${item.memorize} ${item.example} ${item.tags.join(" ")}`,
    );
    const heatOk = filter === "all" || item.heat === filter;
    const domainOk = domainFilter === "all" || item.tags.includes(domainFilter);
    const queryOk = !query || haystack.includes(query);
    return heatOk && domainOk && queryOk;
  });

  document.getElementById("theoryCount").textContent = `${items.length} / ${THEORY_ITEMS.length}개`;

  root.innerHTML = items
    .map(
      (item) => `
        <article class="theory-card">
          <header>
            <div>
              <h3>${escapeHtml(item.title)}</h3>
              <span class="pill ${item.heat === "MAX" ? "warn" : ""}">${item.heat}</span>
            </div>
          </header>
          <p><strong>한 줄:</strong> ${escapeHtml(item.oneLine)}</p>
          <div class="theory-block">
            <strong>왜 시험에 나오나</strong>
            <p>${escapeHtml(item.why)}</p>
          </div>
          <div class="theory-block">
            <strong>외우는 법</strong>
            <p>${escapeHtml(item.memorize)}</p>
          </div>
          <div class="theory-block">
            <strong>예시</strong>
            <p>${escapeHtml(item.example)}</p>
          </div>
          <div class="theory-block">
            <strong>이후 풀 문제</strong>
            <p>${escapeHtml(item.linked)}</p>
          </div>
          <div class="tags">${item.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        </article>
      `,
    )
    .join("");
}

function renderAcademyPatternSection(lesson) {
  const patterns = lesson.examPatterns || [];
  if (!patterns.length) return "";

  return `
    <section class="academy-section">
      <h3>출제 패턴 해부</h3>
      <div class="academy-pattern-grid">
        ${patterns
          .map(
            (item) => `
              <article class="academy-card pattern-card">
                <h4>${escapeHtml(item.title)}</h4>
                <p>${escapeHtml(item.body)}</p>
                <ul>${(item.items || []).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAcademyTraceRules(lesson) {
  const rules = lesson.traceRules || [];
  if (!rules.length) return "";

  return `
    <section class="academy-section">
      <h3>손추적 규칙</h3>
      <div class="trace-rule-grid">
        ${rules
          .map(
            (item, index) => `
              <article class="academy-card trace-rule-card">
                <span class="pill">규칙 ${index + 1}</span>
                <h4>${escapeHtml(item.title)}</h4>
                <p>${escapeHtml(item.body)}</p>
                ${item.code ? `<pre class="code-block"><code>${escapeHtml(item.code)}</code></pre>` : ""}
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAcademyAnswerRules(lesson) {
  const rules = lesson.answerRules || [];
  if (!rules.length) return "";

  return `
    <section class="academy-section">
      <h3>답안 작성 규칙</h3>
      <div class="answer-rule-list">
        ${rules
          .map(
            (item, index) => `
              <article class="answer-rule-item">
                <span class="pill">${index + 1}</span>
                <p>${escapeHtml(item)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAcademyFinalChecklist(lesson) {
  const items = lesson.finalChecklist || [];
  if (!items.length) return "";

  return `
    <section class="academy-section">
      <h3>시험 직전 체크</h3>
      <article class="academy-card">
        <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    </section>
  `;
}

function renderCodeAcademy() {
  const academy = window.CODE_SQL_ACADEMY || {};
  const lesson = academy[currentAcademyLang] || academy.C;
  const root = document.getElementById("codeAcademyContent");
  if (!root || !lesson) return;

  document.querySelectorAll(".academy-lang").forEach((button) => {
    const active = button.dataset.lang === currentAcademyLang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  root.innerHTML = `
    <section class="academy-head">
      <div>
        <span class="pill warn">${escapeHtml(currentAcademyLang)}</span>
        <h2>${escapeHtml(lesson.title)}</h2>
        <p>${escapeHtml(lesson.goal)}</p>
      </div>
    </section>

    ${
      lesson.mastery
        ? `
          <section class="academy-section">
            <h3>정복 루틴</h3>
            <div class="mastery-grid">
              ${lesson.mastery
                .map(
                  (item, index) => `
                    <article class="academy-card mastery-card">
                      <span class="pill">${index + 1}단계</span>
                      <h4>${escapeHtml(item.title)}</h4>
                      <p>${escapeHtml(item.body)}</p>
                    </article>
                  `,
                )
                .join("")}
            </div>
          </section>
        `
        : ""
    }

    ${renderAcademyPatternSection(lesson)}

    <section class="academy-two">
      <article class="academy-card">
        <h3>읽는 순서</h3>
        <ol>${lesson.order.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      </article>
      <article class="academy-card">
        <h3>쓰는 순서</h3>
        <ol>${lesson.writing.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
      </article>
    </section>

    ${renderAcademyTraceRules(lesson)}

    <section class="academy-section">
      <h3>핵심 문법</h3>
      <div class="academy-grid">
        ${lesson.fundamentals
          .map(
            (item) => `
              <article class="academy-card">
                <h4>${escapeHtml(item.title)}</h4>
                <p>${escapeHtml(item.body)}</p>
                <pre class="code-block"><code>${escapeHtml(item.code)}</code></pre>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    <section class="academy-section">
      <h3>변수표로 해독하기</h3>
      <div class="academy-walkthroughs">
        ${lesson.walkthroughs
          .map(
            (item) => `
              <article class="academy-card walkthrough-card">
                <h4>${escapeHtml(item.title)}</h4>
                <pre class="code-block"><code>${escapeHtml(item.code)}</code></pre>
                <div class="trace-table">
                  ${item.trace
                    .map(
                      ([name, value, note]) => `
                        <div class="trace-row">
                          <strong>${escapeHtml(name)}</strong>
                          <span>${escapeHtml(value)}</span>
                          <p>${escapeHtml(note)}</p>
                        </div>
                      `,
                    )
                    .join("")}
                </div>
                <p class="output-line"><strong>결과:</strong> ${escapeHtml(item.output)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>

    ${renderAcademyAnswerRules(lesson)}

    <section class="academy-two">
      <article class="academy-card">
        <h3>바로 쓰는 템플릿</h3>
        <div class="template-list">
          ${lesson.templates
            .map(
              ([title, code]) => `
                <div class="template-item">
                  <strong>${escapeHtml(title)}</strong>
                  <pre class="code-block"><code>${escapeHtml(code)}</code></pre>
                </div>
              `,
            )
            .join("")}
        </div>
      </article>
      <article class="academy-card">
        <h3>시험 함정</h3>
        <ul>${lesson.traps.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      </article>
    </section>

    ${renderAcademyFinalChecklist(lesson)}
  `;
}

function renderSources() {
  const root = document.getElementById("sourceList");
  root.innerHTML = SOURCES.map(
    (source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a>`,
  ).join("");
}

function setupCoverageFilters() {
  const coverage = window.EXAM_COVERAGE || [];
  const roundFilter = document.getElementById("coverageRoundFilter");
  const domainFilter = document.getElementById("coverageDomainFilter");
  if (!roundFilter || !domainFilter) return;

  if (roundFilter.options.length === 1) {
    [...new Set(coverage.map((item) => item.round))].forEach((round) => {
      roundFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(round)}">${escapeHtml(round)}</option>`);
    });
    if (coverage.some((item) => item.round === "2026-1")) roundFilter.value = "2026-1";
  }

  if (domainFilter.options.length === 1) {
    [...new Set(coverage.map((item) => item.domain))]
      .sort((a, b) => a.localeCompare(b, "ko"))
      .forEach((domain) => {
        domainFilter.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(domain)}">${escapeHtml(domain)}</option>`);
      });
  }
}

function renderCoverage() {
  const coverage = window.EXAM_COVERAGE || [];
  const summary = window.EXAM_COVERAGE_SUMMARY || {};
  const query = normalize(document.getElementById("coverageSearch")?.value || "");
  const round = document.getElementById("coverageRoundFilter")?.value || "all";
  const domain = document.getElementById("coverageDomainFilter")?.value || "all";
  const examPractice = PRACTICE.filter((item) => item.tags.includes("기출급"));

  document.getElementById("coverageRoundCount").textContent = summary.rounds || 0;
  document.getElementById("coverageQuestionCount").textContent = summary.questions || 0;
  document.getElementById("coverageReadyCount").textContent = `${summary.ready || 0}/${summary.questions || 0}`;
  document.getElementById("coveragePracticeCount").textContent = examPractice.length;

  const items = coverage.filter((item) => {
    const haystack = normalize(`${item.round} ${item.number} ${item.domain} ${item.requirement} ${item.skillTitle}`);
    return (
      (round === "all" || item.round === round) &&
      (domain === "all" || item.domain === domain) &&
      (!query || haystack.includes(query))
    );
  });

  document.getElementById("coverageVisibleCount").textContent = `${items.length}개`;
  const root = document.getElementById("coverageList");
  root.innerHTML = items
    .map((item) => {
      const skill = window.EXAM_SKILLS?.[item.skillId];
      const completed = item.practiceIds.filter((id) => state.done[id]).length;
      const total = item.practiceIds.length;
      const codeLesson = skill?.kind === "code" && ["C", "Java", "Python", "SQL"].includes(skill.domain);
      return `
        <article class="coverage-item ${item.ready ? "ready" : "missing"}">
          <div class="coverage-number">
            <strong>${escapeHtml(item.round)}</strong>
            <span>${item.number}번</span>
          </div>
          <div class="coverage-copy">
            <div class="coverage-item-head">
              <span class="pill">${escapeHtml(item.domain)}</span>
              <span class="coverage-status">${item.ready ? "연결 완료" : "연결 필요"}</span>
            </div>
            <h3>${escapeHtml(item.requirement)}</h3>
            <p><strong>학습 기술:</strong> ${escapeHtml(item.skillTitle)}</p>
            <p><strong>동급 훈련:</strong> ${completed}/${total}문항 완료</p>
          </div>
          <div class="coverage-actions">
            <button
              type="button"
              class="ghost-button"
              data-coverage-action="lesson"
              data-skill="${escapeHtml(item.skillId)}"
              data-code-lesson="${codeLesson ? "true" : "false"}"
            >설명 보기</button>
            <button
              type="button"
              class="primary-button"
              data-coverage-action="practice"
              data-skill="${escapeHtml(item.skillId)}"
            >동급 문제</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderQuestion() {
  const pool = poolByMode(currentMode);
  currentQuestionGraded = false;
  document.getElementById("checkAnswer").disabled = false;
  delete document.getElementById("feedback").dataset.revealedFor;
  if (!pool.length) {
    currentQuestion = null;
    document.getElementById("questionDomain").textContent = "-";
    document.getElementById("questionLevel").textContent = "-";
    document.getElementById("questionText").textContent =
      currentMode === "review"
        ? "지금 복습할 문항이 없습니다. 틀린 문항은 10분 뒤, 맞힌 문항은 숙달 단계에 따라 다시 나타납니다."
        : "이 범위에 연결된 문제가 아직 없습니다.";
    document.getElementById("solveGuide").innerHTML = "";
    document.getElementById("answerRule").textContent = "";
    return;
  }
  const next = pickWeighted(pool);
  currentQuestion = next.id === currentQuestion?.id && pool.length > 1 ? pickWeighted(pool) : next;
  document.getElementById("questionDomain").textContent = currentQuestion.domain;
  document.getElementById("questionLevel").textContent =
    currentQuestion.level === "must" ? "최빈출" : currentQuestion.level.toUpperCase();
  document.getElementById("questionText").textContent = currentQuestion.question;
  document.getElementById("answerRule").textContent = answerRule(currentQuestion);
  document.getElementById("solveGuide").innerHTML = renderSolveGuide(currentQuestion);
  const hintBox = document.getElementById("hintBox");
  hintBox.innerHTML = renderHint(currentQuestion);
  hintBox.hidden = true;
  document.getElementById("answerInput").value = "";
  document.getElementById("feedback").className = "feedback";
  document.getElementById("feedback").textContent =
    "처음이면 힌트와 정답 보기를 눌러도 된다. 1회전은 이해, 2회전은 암기, 3회전은 실전이다.";
  document.getElementById("answerInput").focus();
}

function gradeCurrent() {
  if (!currentQuestion || currentQuestionGraded) return;
  const input = document.getElementById("answerInput").value;
  const result = window.ANSWER_ENGINE.evaluate(input, currentQuestion);
  const correct = result.correct;
  currentQuestionGraded = true;
  document.getElementById("checkAnswer").disabled = true;
  recordResult(currentQuestion, correct);
  const feedback = document.getElementById("feedback");
  feedback.className = `feedback ${correct ? "correct" : "wrong"}`;
  feedback.innerHTML = `
    <strong>${correct ? "정답" : "오답"}</strong><br />
    정답: ${escapeHtml(currentQuestion.answer)}<br />
    ${escapeHtml(currentQuestion.explain)}
  `;
  updateStats();
}

function recordResult(item, correct, { persist = true } = {}) {
  state.log.push({ id: item.id, correct, time: Date.now() });
  state.log = state.log.slice(-1000);
  state.mastery[item.id] = masteryTransition(state.mastery[item.id], correct);
  if (correct) {
    state.done[item.id] = true;
    delete state.wrong[item.id];
  } else {
    state.wrong[item.id] = (state.wrong[item.id] || 0) + 1;
  }
  if (persist) saveState();
}

function showCurrentAnswer() {
  if (!currentQuestion) return;
  const feedback = document.getElementById("feedback");
  if (feedback.dataset.revealedFor === currentQuestion.id) return;
  feedback.dataset.revealedFor = currentQuestion.id;
  feedback.className = "feedback wrong";
  feedback.innerHTML = `<strong>정답 보기</strong><br />${escapeHtml(currentQuestion.answer)}<br />${escapeHtml(currentQuestion.explain)}`;
  if (!currentQuestionGraded) {
    currentQuestionGraded = true;
    document.getElementById("checkAnswer").disabled = true;
    recordResult(currentQuestion, false);
    updateStats();
  }
}

function showHint() {
  const hintBox = document.getElementById("hintBox");
  hintBox.hidden = false;
}

function renderWeakTags() {
  const root = document.getElementById("weakTags");
  const wrongItems = [...PRACTICE, ...THEORY_PRACTICE].filter((item) => state.wrong[item.id]);
  if (!wrongItems.length) {
    root.innerHTML = `<span class="tag">아직 오답 없음</span>`;
    return;
  }
  const counts = {};
  wrongItems.forEach((item) => {
    item.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + state.wrong[item.id];
    });
  });
  root.innerHTML = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => `<span class="tag">${tag} ${count}</span>`)
    .join("");
}

function renderRoutine() {
  const root = document.getElementById("routineList");
  root.innerHTML = DAY_PLANS.map(
    (plan, index) => `
      <article class="panic-item">
        <strong>Day ${index + 1}. ${plan.title}</strong>
        <span>${plan.focus}</span>
      </article>
    `,
  ).join("");

  const panic = document.getElementById("panicList");
  const must = SCOPE_ITEMS.filter((item) => item.heat === "MAX" || item.heat === "HIGH");
  panic.innerHTML = must
    .map(
      (item, index) => `
        <article class="panic-item">
          <strong>${index + 1}. ${item.title}</strong>
          <span>${item.terms.slice(0, 5).join(", ")}</span>
        </article>
      `,
    )
    .join("");
}

function startMock() {
  if (mockSession && !confirm("진행 중인 시험을 버리고 새 시험을 시작할까요?")) return;
  const examPool = poolByMode("exam");
  const pool = examPool.length ? examPool : [...poolByMode("must"), ...poolByMode("all")];
  const picked = [];
  const pickForMock = (items) =>
    selectedMockMode === "weakness"
      ? pickWeighted(items)
      : items[Math.floor(Math.random() * items.length)];

  const draw = (items, count) => {
    while (count > 0) {
      const available = items.filter((item) => !picked.some((candidate) => candidate.id === item.id));
      if (!available.length) return;
      picked.push(pickForMock(available));
      count -= 1;
    }
  };

  if (examPool.length) {
    draw(examPool.filter((item) => item.type === "code"), 7);
    draw(examPool.filter((item) => item.type === "sql" || item.type === "db"), 4);
    draw(examPool.filter((item) => !["code", "sql", "db"].includes(item.type)), 9);
  }
  draw(pool, 20 - picked.length);
  const startedAt = Date.now();
  mockSession = {
    version: 1,
    id: `mock-${startedAt}`,
    mode: selectedMockMode,
    itemIds: picked.map((item) => item.id),
    index: 0,
    answers: {},
    flags: {},
    startedAt,
    deadline: startedAt + MOCK_DURATION_MS,
    items: picked,
  };
  lastMockResult = null;
  persistMockSession();
  renderMock();
}

function serializeMockSession(session) {
  if (!session) return null;
  return {
    version: 1,
    id: session.id,
    mode: session.mode,
    itemIds: session.itemIds,
    index: session.index,
    answers: session.answers,
    flags: session.flags,
    startedAt: session.startedAt,
    deadline: session.deadline,
  };
}

function persistMockSession() {
  state.mockDraft = normalizeMockDraft(serializeMockSession(mockSession));
  saveState();
}

function stopMockTimer() {
  if (mockTimerId !== null) clearInterval(mockTimerId);
  mockTimerId = null;
}

function formatRemaining(milliseconds) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return [hours, minutes, rest].map((value) => String(value).padStart(2, "0")).join(":");
}

function updateMockTimer() {
  if (!mockSession) return;
  const remaining = mockSession.deadline - Date.now();
  const timer = document.getElementById("mockTimer");
  if (timer) {
    timer.textContent = formatRemaining(remaining);
    timer.classList.toggle("urgent", remaining <= 10 * 60 * 1000);
  }
  if (remaining <= 0) finishMock({ timedOut: true, skipConfirm: true });
}

function startMockTimer() {
  stopMockTimer();
  if (!mockSession) return;
  updateMockTimer();
  if (mockSession) mockTimerId = setInterval(updateMockTimer, 1000);
}

function mockProgress() {
  const answered = mockSession.itemIds.filter((id) =>
    String(mockSession.answers[id] || "").trim(),
  ).length;
  const flagged = mockSession.itemIds.filter((id) => mockSession.flags[id]).length;
  return { answered, unanswered: mockSession.itemIds.length - answered, flagged };
}

function updateMockProgressUi() {
  if (!mockSession) return;
  const progress = mockProgress();
  const answered = document.getElementById("mockAnswered");
  const unanswered = document.getElementById("mockUnanswered");
  const flagged = document.getElementById("mockFlagged");
  if (answered) answered.textContent = String(progress.answered);
  if (unanswered) unanswered.textContent = String(progress.unanswered);
  if (flagged) flagged.textContent = String(progress.flagged);
  document.querySelectorAll("[data-mock-index]").forEach((button) => {
    const index = Number(button.dataset.mockIndex);
    const id = mockSession.itemIds[index];
    button.classList.toggle("answered", Boolean(String(mockSession.answers[id] || "").trim()));
    button.classList.toggle("flagged", Boolean(mockSession.flags[id]));
  });
}

function setMockIndex(index) {
  if (!mockSession) return;
  mockSession.index = Math.min(Math.max(index, 0), mockSession.items.length - 1);
  persistMockSession();
  renderMock();
}

function syncMockModeButtons() {
  document.querySelectorAll(".mock-mode").forEach((button) => {
    const active = button.dataset.mockMode === selectedMockMode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.disabled = Boolean(mockSession);
  });
}

function renderMock() {
  syncMockModeButtons();
  const root = document.getElementById("mockArea");
  if (!mockSession) {
    stopMockTimer();
    if (lastMockResult) {
      renderMockResult(lastMockResult);
      return;
    }
    root.innerHTML = `<p class="empty-state">새 시험을 누르면 기출급 문제은행에서 코드 7문항, SQL/DB 4문항, 이론 9문항을 섞어 낸다.</p>`;
    return;
  }
  if (mockSession.deadline <= Date.now()) {
    finishMock({ timedOut: true, skipConfirm: true });
    return;
  }
  const item = mockSession.items[mockSession.index];
  const progress = mockProgress();
  root.innerHTML = `
    <div class="mock-exam-shell">
      <div class="mock-status">
        <div><span>남은 시간</span><strong id="mockTimer" aria-live="off">${formatRemaining(mockSession.deadline - Date.now())}</strong></div>
        <div><span>응답</span><strong><span id="mockAnswered">${progress.answered}</span> / ${mockSession.items.length}</strong></div>
        <div><span>미응답</span><strong id="mockUnanswered">${progress.unanswered}</strong></div>
        <div><span>재검토</span><strong id="mockFlagged">${progress.flagged}</strong></div>
      </div>
      <div class="mock-palette" aria-label="문항 바로가기">
        ${mockSession.items
          .map((candidate, index) => {
            const answered = Boolean(String(mockSession.answers[candidate.id] || "").trim());
            const flagged = Boolean(mockSession.flags[candidate.id]);
            const classes = [
              "mock-index",
              index === mockSession.index ? "current" : "",
              answered ? "answered" : "",
              flagged ? "flagged" : "",
            ].filter(Boolean).join(" ");
            return `<button type="button" class="${classes}" data-mock-index="${index}" aria-label="${index + 1}번${answered ? ", 응답함" : ", 미응답"}${flagged ? ", 재검토" : ""}" ${index === mockSession.index ? 'aria-current="true"' : ""}>${index + 1}</button>`;
          })
          .join("")}
      </div>
      <div class="mock-question">
        <div class="question-head">
          <span class="mock-progress">${mockSession.index + 1} / ${mockSession.items.length}</span>
          <span class="pill">${mockModeLabel(mockSession.mode)} · ${escapeHtml(item.domain)}</span>
        </div>
        <pre class="question-text">${escapeHtml(item.question)}</pre>
        <label class="answer-box">
          <span>답</span>
          <textarea id="mockAnswer" rows="3" maxlength="1000" autocomplete="off">${escapeHtml(mockSession.answers[item.id] || "")}</textarea>
        </label>
        <p class="answer-rule">${escapeHtml(answerRule(item))}</p>
        <label class="mock-flag"><input id="mockFlag" type="checkbox" ${mockSession.flags[item.id] ? "checked" : ""} /><span>나중에 다시 보기</span></label>
        <div class="button-row mock-navigation">
          <button id="mockPrevious" type="button" class="ghost-button" ${mockSession.index === 0 ? "disabled" : ""}>이전</button>
          <button id="mockNext" type="button" class="ghost-button" ${mockSession.index === mockSession.items.length - 1 ? "disabled" : ""}>다음</button>
          <button id="mockFinish" type="button" class="primary-button">최종 제출</button>
        </div>
      </div>
    </div>
  `;
  const answerInput = document.getElementById("mockAnswer");
  answerInput.focus();
  answerInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (value) mockSession.answers[item.id] = value;
    else delete mockSession.answers[item.id];
    persistMockSession();
    updateMockProgressUi();
  });
  document.getElementById("mockFlag").addEventListener("change", (event) => {
    if (event.target.checked) mockSession.flags[item.id] = true;
    else delete mockSession.flags[item.id];
    persistMockSession();
    updateMockProgressUi();
  });
  document.querySelectorAll("[data-mock-index]").forEach((button) => {
    button.addEventListener("click", () => setMockIndex(Number(button.dataset.mockIndex)));
  });
  document.getElementById("mockPrevious").addEventListener("click", () =>
    setMockIndex(mockSession.index - 1),
  );
  document.getElementById("mockNext").addEventListener("click", () =>
    setMockIndex(mockSession.index + 1),
  );
  document.getElementById("mockFinish").addEventListener("click", () => finishMock());
  startMockTimer();
}

function finishMock({ timedOut = false, skipConfirm = false } = {}) {
  if (!mockSession) return;
  const progress = mockProgress();
  if (
    !skipConfirm &&
    !confirm(
      `최종 제출할까요? 미응답 ${progress.unanswered}개, 재검토 ${progress.flagged}개입니다. 제출 뒤에는 답을 바꿀 수 없습니다.`,
    )
  ) {
    return;
  }

  stopMockTimer();
  const session = mockSession;
  const results = session.items.map((item) => {
    const input = session.answers[item.id] || "";
    const scored = window.ANSWER_ENGINE.score(input, item, 5);
    return { item, input, ...scored };
  });
  results.forEach((result) => recordResult(result.item, result.correct, { persist: false }));
  const maximum = results.length * 5;
  const strictScore = maximum
    ? Math.round((results.filter((result) => result.correct).length * 5 * 100) / maximum)
    : 0;
  const learningScore = maximum
    ? Math.round((results.reduce((sum, result) => sum + result.points, 0) * 1000) / maximum) / 10
    : 0;
  const completed = {
    id: session.id,
    mode: session.mode,
    completedAt: Date.now(),
    strictScore,
    learningScore,
    timedOut,
    results,
  };
  if (session.mode === "standard") {
    state.mockBest = state.mockBest === null ? strictScore : Math.max(state.mockBest, strictScore);
  }
  state.mockHistory.push({
    id: completed.id,
    mode: completed.mode,
    completedAt: completed.completedAt,
    strictScore,
    learningScore,
    timedOut,
    results: results.map((result) => ({
      itemId: result.item.id,
      input: result.input,
      correct: result.correct,
      points: result.points,
      maxPoints: 5,
    })),
  });
  state.mockHistory = state.mockHistory.slice(-20);
  state.mockDraft = null;
  mockSession = null;
  lastMockResult = completed;
  saveState();
  updateStats();
  renderMockResult(completed);
}

function renderMockResult(result) {
  syncMockModeButtons();
  const root = document.getElementById("mockArea");
  root.innerHTML = `
    <div class="mock-result">
      <div class="mock-score-summary">
        <div><span>엄격 채점</span><strong>${result.strictScore}점</strong></div>
        <div><span>학습용 부분점수</span><strong>${result.learningScore}점</strong></div>
        <p>${mockModeLabel(result.mode)} · ${result.timedOut ? "제한 시간이 끝나 자동 제출됐다. " : ""}${result.strictScore >= 60 ? "앱 문제은행에서는 60점 이상이다." : "엄격 채점 60점 미만이다. 오답과 오늘 복습부터 다시 푼다."} 실제 시험 합격 예측값은 아니다.</p>
      </div>
      ${result.results
        .map((entry, index) => `
          <div class="result-row ${entry.correct ? "ok" : ""}">
            <strong>${index + 1}. ${entry.correct ? "정답" : entry.points > 0 ? "부분 이해" : "오답"} - ${escapeHtml(entry.item.domain)} (${entry.points}/5점)</strong><br />
            내 답: ${escapeHtml(entry.input || "(미응답)")}<br />
            정답: ${escapeHtml(entry.item.answer)}<br />
            ${escapeHtml(entry.item.explain)}
          </div>
        `)
        .join("")}
    </div>
  `;
}

function exportProgress() {
  const payload = createExportPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `jeongcheogi-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function importProgress(file) {
  if (!file) return;
  try {
    const imported = normalizeImportedState(JSON.parse(await file.text()));
    if (!confirm("현재 학습 기록을 파일의 기록으로 바꿀까요?")) return;
    stopMockTimer();
    state = imported;
    mockSession = restoreMockSession(state.mockDraft);
    lastMockResult = null;
    selectedMockHistoryId = null;
    selectedMockMode = mockSession?.mode || "standard";
    saveState();
    renderDayPlan();
    renderQuestion();
    renderMock();
    updateStats();
    alert("학습 기록을 가져왔습니다.");
  } catch (error) {
    alert(error instanceof Error ? error.message : "학습 기록 파일을 읽지 못했습니다.");
  }
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    const panel = document.getElementById(tab.dataset.view);
    tab.id = `tab-${tab.dataset.view}`;
    tab.setAttribute("aria-controls", tab.dataset.view);
    panel?.setAttribute("role", "tabpanel");
    panel?.setAttribute("aria-labelledby", tab.id);
    tab.addEventListener("click", () => setView(tab.dataset.view));
  });

  document.querySelectorAll(".mode").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mode === currentMode));
    button.addEventListener("click", () => {
      currentCoverageSkill = null;
      currentMode = button.dataset.mode;
      syncDrillModeButtons();
      renderQuestion();
    });
  });

  document.querySelectorAll(".mock-mode").forEach((button) => {
    button.addEventListener("click", () => {
      if (mockSession) return;
      selectedMockMode = button.dataset.mockMode;
      syncMockModeButtons();
    });
  });

  document.getElementById("daySelect").addEventListener("change", (event) => {
    state.day = Number(event.target.value);
    saveState();
    renderDayPlan();
    updateStats();
  });

  document.getElementById("dayPlan").addEventListener("change", (event) => {
    const id = event.target.dataset.check;
    if (!id) return;
    state.checks[id] = event.target.checked;
    saveState();
  });

  document.getElementById("mockHistoryList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-history-id]");
    if (!button) return;
    selectedMockHistoryId = button.dataset.historyId;
    renderMockHistoryDetail(selectedMockHistoryId);
  });
  document.getElementById("mockHistoryDetail").addEventListener("click", (event) => {
    if (!event.target.closest("[data-history-close]")) return;
    selectedMockHistoryId = null;
    event.currentTarget.hidden = true;
  });

  document.getElementById("scopeSearch").addEventListener("input", renderScope);
  document.getElementById("scopeFilter").addEventListener("change", renderScope);
  document.getElementById("theorySearch").addEventListener("input", renderTheory);
  document.getElementById("theoryFilter").addEventListener("change", renderTheory);
  document.getElementById("theoryDomainFilter").addEventListener("change", renderTheory);
  document.getElementById("coverageSearch").addEventListener("input", renderCoverage);
  document.getElementById("coverageRoundFilter").addEventListener("change", renderCoverage);
  document.getElementById("coverageDomainFilter").addEventListener("change", renderCoverage);
  document.getElementById("coverageList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-coverage-action]");
    if (!button) return;
    const skillId = button.dataset.skill;
    const skill = window.EXAM_SKILLS?.[skillId];
    if (!skill) return;

    if (button.dataset.coverageAction === "practice") {
      currentCoverageSkill = skillId;
      currentMode = "coverage";
      syncDrillModeButtons();
      setView("drill");
      renderQuestion();
      return;
    }

    if (button.dataset.codeLesson === "true") {
      currentAcademyLang = skill.domain;
      setView("codeacademy");
      return;
    }

    document.getElementById("theorySearch").value = skill.title;
    document.getElementById("theoryFilter").value = "all";
    document.getElementById("theoryDomainFilter").value = "all";
    setView("theory");
  });
  document.querySelectorAll(".academy-lang").forEach((button) => {
    button.addEventListener("click", () => {
      currentAcademyLang = button.dataset.lang;
      renderCodeAcademy();
    });
  });
  document.getElementById("academyDrill").addEventListener("click", () => {
    setView("drill");
    currentCoverageSkill = null;
    currentMode = currentAcademyLang === "SQL" ? "sql" : "code";
    syncDrillModeButtons();
    renderQuestion();
  });
  document.getElementById("nextQuestion").addEventListener("click", renderQuestion);
  document.getElementById("checkAnswer").addEventListener("click", gradeCurrent);
  document.getElementById("showHint").addEventListener("click", showHint);
  document.getElementById("showAnswer").addEventListener("click", showCurrentAnswer);
  document.getElementById("markKnown").addEventListener("click", () => {
    if (!currentQuestion) return;
    const now = Date.now();
    const previous = state.mastery[currentQuestion.id] || {};
    state.mastery[currentQuestion.id] = {
      stage: Math.max(previous.stage || 0, 3),
      streak: Math.max(previous.streak || 0, 1),
      attempts: Math.max(previous.attempts || 0, 1),
      correct: Math.max(previous.correct || 0, 1),
      lastSeen: now,
      nextReview: now + REVIEW_INTERVALS_MS[3],
    };
    state.done[currentQuestion.id] = true;
    delete state.wrong[currentQuestion.id];
    saveState();
    updateStats();
    renderQuestion();
  });

  document.getElementById("answerInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") gradeCurrent();
  });

  document.getElementById("clearWrongs").addEventListener("click", () => {
    state.wrong = {};
    saveState();
    updateStats();
  });

  document.getElementById("exportProgress").addEventListener("click", exportProgress);
  document.getElementById("importProgressButton").addEventListener("click", () => {
    document.getElementById("importProgress").click();
  });
  document.getElementById("importProgress").addEventListener("change", async (event) => {
    await importProgress(event.target.files?.[0]);
    event.target.value = "";
  });

  document.getElementById("resetProgress").addEventListener("click", () => {
    if (!confirm("학습 기록을 전부 초기화할까요?")) return;
    stopMockTimer();
    state = emptyState();
    mockSession = null;
    lastMockResult = null;
    selectedMockHistoryId = null;
    selectedMockMode = "standard";
    saveState();
    renderDayPlan();
    renderQuestion();
    renderMock();
    updateStats();
  });

  document.querySelectorAll(".action-card").forEach((cardButton) => {
    cardButton.addEventListener("click", () => {
      const view = cardButton.dataset.jump;
      setView(view);
      if (cardButton.dataset.mode) {
        currentCoverageSkill = null;
        currentMode = cardButton.dataset.mode;
        syncDrillModeButtons();
        renderQuestion();
      }
    });
  });

  document.getElementById("panicStart").addEventListener("click", () => {
    setView("drill");
    currentCoverageSkill = null;
    currentMode = "must";
    syncDrillModeButtons();
    renderQuestion();
  });

  document.getElementById("rookieStart").addEventListener("click", () => {
    setView("drill");
    currentCoverageSkill = null;
    currentMode = "must";
    syncDrillModeButtons();
    renderQuestion();
    document.getElementById("hintBox").hidden = false;
    document.getElementById("feedback").textContent =
      "처음 30분 규칙: 힌트를 보고, 정답 보기를 누르고, 답을 그대로 입력해서 손에 익힌다. 맞히려고 애쓰는 건 두 번째 회전부터.";
  });

  document.getElementById("startMock").addEventListener("click", startMock);
}

function boot() {
  bindEvents();
  setupCoverageFilters();
  renderDayPlan();
  renderQuestion();
  updateStats();
  if (mockSession) startMockTimer();
}

window.JEONGCHEOGI_AUDIT = Object.freeze({
  analyzeMockDomains,
  practice: PRACTICE,
  scope: SCOPE_ITEMS,
  theoryPractice: THEORY_PRACTICE,
  matchesAnswer,
  createExportPayload,
  dueReviewItems,
  emptyState,
  isMasteryDue,
  masteryTransition,
  normalizeImportedState,
  normalizeMockDraft,
  normalizeState,
  readStateFromStorage,
  stateSnapshot: () => createExportPayload().state,
  writeStateToStorage,
});

if (typeof document !== "undefined") boot();
