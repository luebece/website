(function () {
  const lessons = [];
  const rows = [];

  function add(spec) {
    const lessonId = `applied-theory-${spec.id}`;
    const practiceId = `applied-${spec.id}-l3`;
    const steps = [...spec.steps];
    const traps = [...spec.traps];
    lessons.push({
      id: lessonId,
      heat: spec.heat || "MAX",
      title: spec.title,
      oneLine: spec.oneLine,
      why: "용어를 외우는 데서 끝내지 않고 표·조건·구조도를 실제 답으로 바꾸는 적용 장이다.",
      memorize: spec.memorize,
      example: spec.example,
      linked: `훈련장의 적용형 문항 ${practiceId}에서 풀이 단계를 직접 사용한다.`,
      tags: [spec.domain, "계산적용", "2025+", "L3", ...(spec.tags || [])],
      aliases: spec.aliases || [],
      compareWith: spec.compareWith || [],
      workedSteps: steps,
      diagram: spec.diagram || "문제 조건 → 중간표 → 규칙 적용 → 최종 답",
      traps,
      appliedPracticeIds: [practiceId],
    });

    rows.push([
      practiceId,
      spec.domain,
      spec.type || "theory",
      spec.level || "must",
      `${spec.question}\n\n최종 답을 쓰시오.`,
      spec.accept || [spec.answer],
      spec.answer,
      spec.summary,
      [spec.domain, "계산적용", "2025+", "L3", "기출급", `skill:${spec.id}`, ...(spec.tags || [])],
      {
        answerMode: spec.answerMode,
        era: "2025+",
        difficulty: spec.difficulty || 4,
        tier: "L3",
        concepts: [spec.id, ...(spec.concepts || [])],
        prerequisites: [lessonId, spec.baseLesson || `master-${spec.id}`],
        estimatedMinutes: spec.estimatedMinutes || 6,
        traceSteps: steps.length,
        sourceRounds: spec.sourceRounds || ["22-1~26-1"],
        sourceType: "coverage-derived-original-application",
        confidence: "internally-verified",
        mistakes: spec.mistakes || ["concept-application"],
        solution: {
          summary: spec.summary,
          steps,
          table: spec.table || [],
          traps,
        },
      },
    ]);
  }

  add({
    id: "candidate-key-calc", domain: "DB", title: "함수 종속으로 후보키 찾기",
    oneLine: "오른쪽에 한 번도 안 나오는 속성부터 넣고 전체 속성이 만들어지는지 폐쇄를 계산한다.",
    memorize: "필수 속성 넣기 → 폐쇄 확장 → 최소성 검사.",
    example: "A→B, B→C이고 D를 만드는 규칙이 없으면 A와 D가 함께 필요하다.",
    question: "R(A,B,C,D)에서 함수 종속 A→B, B→C만 성립한다. 후보키를 쓰시오.",
    answer: "AD", accept: ["AD", "A,D", "{A,D}"],
    summary: "A로 B와 C를 만들 수 있지만 D는 만들 수 없으므로 AD가 유일한 최소 후보키다.",
    steps: ["우변에 없는 A와 D를 필수 후보로 잡는다.", "A+에서 A,B,C를 얻는다.", "D를 추가하면 A,B,C,D 전체가 된다.", "A를 빼면 B,C를 만들 수 없다.", "D를 빼면 D를 만들 수 없어 AD는 최소다."],
    table: [["폐쇄", "결과"], ["A+", "A,B,C"], ["AD+", "A,B,C,D"]],
    traps: ["A만 후보키라고 답하기", "슈퍼키와 후보키의 최소성을 혼동", "우변에 없는 D를 누락"],
    diagram: "AD → A→B→C, 그리고 D 유지 = 전체 속성",
  });

  add({
    id: "full-dependency", domain: "DB", title: "완전·부분 함수 종속 판별",
    oneLine: "복합 결정자의 일부만으로는 결정되지 않아야 완전 함수 종속이다.",
    memorize: "둘 다 있어야 정해지면 완전, 하나만 있어도 정해지면 부분.",
    example: "(학생,과목)→성적이고 학생만으로도 과목만으로도 성적을 모르면 완전 종속이다.",
    question: "(학생,과목)→성적이 성립하고 학생→성적, 과목→성적은 모두 성립하지 않는다. 성적의 종속 유형은?",
    answer: "완전 함수 종속", accept: ["완전함수종속", "완전 종속", "full functional dependency"],
    summary: "복합키 전체가 필요하므로 완전 함수 종속이다.",
    steps: ["결정자가 학생과 과목의 복합 속성임을 확인한다.", "학생 단독 종속을 검사해 거짓임을 확인한다.", "과목 단독 종속도 거짓이다.", "결정자의 진부분집합 어느 것도 성적을 정하지 못한다.", "따라서 완전 함수 종속이다."],
    table: [["결정자", "성적 결정"], ["학생", "아니오"], ["학생,과목", "예"]],
    traps: ["복합키이면 무조건 부분 종속", "성적 값의 중복만 확인", "이행 종속과 혼동"],
  });

  add({
    id: "normalization-calc", domain: "DB", title: "이행 종속 제거와 3NF 분해",
    oneLine: "기본키가 일반 속성을 거쳐 다른 일반 속성을 정하면 그 두 일반 속성을 별도 표로 분리한다.",
    memorize: "키→일반→일반 사슬을 끊으면 3NF.",
    example: "학생→학과, 학과→전화라면 학과와 전화를 분리한다.",
    question: "학생(학번,학과,학과전화)에서 학번→학과, 학과→학과전화가 성립한다. 이행 종속을 제거해 도달하는 정규형은?",
    answer: "3NF", accept: ["3NF", "제3정규형", "삼정규형"],
    summary: "학번→학과→학과전화의 이행 종속을 제거하는 단계는 제3정규형이다.",
    steps: ["기본키는 학번이다.", "학번이 학과를 결정한다.", "일반 속성 학과가 학과전화를 결정한다.", "학번에서 학과전화로 이행 종속이 생긴다.", "학과(학과,학과전화)를 분리하면 3NF다."],
    table: [["분해 전", "학생(학번,학과,전화)"], ["분해 후1", "학생(학번,학과)"], ["분해 후2", "학과(학과,전화)"]],
    traps: ["부분 종속이라 2NF", "다치 종속이라 4NF", "전화만 삭제"],
  });

  add({
    id: "delete-anomaly-case", domain: "DB", title: "삽입·갱신·삭제 이상 사례",
    oneLine: "한 행을 지웠는데 보존해야 할 다른 사실까지 사라지면 삭제 이상이다.",
    memorize: "삭제했더니 필요한 정보도 증발 = 삭제 이상.",
    example: "마지막 수강생을 지우며 강좌 담당교수 정보도 사라지는 경우다.",
    question: "수강(학생,강좌,교수) 표에서 어떤 강좌의 마지막 학생 행을 삭제했더니 그 강좌 담당교수 정보도 사라졌다. 이상 현상은?",
    answer: "삭제 이상", accept: ["삭제이상", "deletion anomaly"],
    summary: "삭제 대상이 아닌 교수 정보까지 함께 없어졌으므로 삭제 이상이다.",
    steps: ["직접 삭제하려는 사실은 학생의 수강 사실이다.", "같은 행에 강좌와 교수 사실이 함께 저장돼 있다.", "그 강좌의 마지막 행임을 확인한다.", "행 삭제 뒤 교수 정보를 복원할 다른 행이 없다.", "필요 정보가 같이 사라져 삭제 이상이다."],
    table: [["삭제 전", "학생·강좌·교수 존재"], ["삭제 대상", "수강 사실"], ["부수 손실", "교수 정보"]],
    traps: ["값을 바꿨으므로 갱신 이상", "행을 추가 못했으므로 삽입 이상", "무결성 위반으로만 답하기"],
  });

  add({
    id: "relational-algebra-table", domain: "DB", title: "관계대수 선택·프로젝션 결과표",
    oneLine: "선택은 행을 먼저 고르고 프로젝션은 열을 고른 뒤 중복 튜플을 제거한다.",
    memorize: "시그마는 가로 행, 파이는 세로 열.",
    example: "점수 80 이상을 선택한 뒤 학과만 투영하면 같은 학과 중복은 하나가 된다.",
    question: "학생(학과,점수)이 (A,90),(A,80),(B,85),(C,70)일 때 π학과(σ점수≥80(학생))의 튜플 수는?",
    answer: "2", answerMode: "numeric", type: "db",
    summary: "80 이상 세 행에서 학과 A,A,B를 투영하고 중복을 제거하면 A,B 두 튜플이다.",
    steps: ["점수 80 이상 조건을 적용한다.", "A90,A80,B85 세 행이 남는다.", "학과 열만 투영해 A,A,B를 얻는다.", "관계는 중복 튜플을 제거한다.", "최종 A,B 두 튜플이다."],
    table: [["단계", "결과"], ["선택", "A90,A80,B85"], ["투영", "A,B"]],
    traps: ["선택과 투영 순서 뒤집기", "A 중복을 두 번 세기", "C70을 포함"],
  });

  add({
    id: "relational-division-table", domain: "DB", title: "관계대수 디비전 결과 계산",
    oneLine: "요구된 항목을 하나도 빠짐없이 모두 가진 대상만 남긴다.",
    memorize: "나눗셈은 ALL 조건.",
    example: "필수과목 DB와 OS를 둘 다 들은 학생만 찾는다.",
    question: "수강이 K-DB,K-OS,L-DB,M-OS이고 필수 과목 집합이 {DB,OS}일 때 디비전 결과 학생은?",
    answer: "K", accept: ["K", "학생K"],
    summary: "K만 DB와 OS를 모두 포함하므로 결과는 K다.",
    steps: ["필수 집합은 DB와 OS 두 항목이다.", "K의 수강 집합은 DB,OS다.", "L은 DB만 있어 OS가 빠진다.", "M은 OS만 있어 DB가 빠진다.", "모든 필수 항목을 가진 K만 남는다."],
    table: [["학생", "DB", "OS"], ["K", "예", "예"], ["L", "예", "아니오"]],
    traps: ["하나라도 들으면 포함", "필수 집합에 학생을 나눔", "수강 횟수를 계산"],
  });

  add({
    id: "erd-cardinality", domain: "DB", title: "ERD 카디널리티 읽기",
    oneLine: "한쪽 개체 하나가 반대쪽 몇 개와 연결될 수 있는지 각각 센다.",
    memorize: "고객 하나 주문 여러 개, 주문 하나 고객 하나 = 1:N.",
    example: "한 부서에 직원 여러 명이면 부서:직원은 1:N이다.",
    question: "고객 한 명은 주문을 여러 개 할 수 있고 각 주문은 반드시 고객 한 명에게만 속한다. 고객:주문의 카디널리티는?",
    answer: "1:N", accept: ["1:N", "일대다", "1대N", "one to many"], answerMode: "literal",
    summary: "고객 하나에 주문 여러 개가 연결되므로 고객:주문은 1:N이다.",
    steps: ["기준 방향을 고객에서 주문으로 잡는다.", "고객 한 명의 최대 주문 수는 여러 개다.", "주문 한 개의 고객 수는 정확히 한 명이다.", "고객 쪽 숫자는 1이다.", "주문 쪽 숫자는 N이므로 1:N이다."],
    table: [["개체", "상대 연결 수"], ["고객", "주문 N"], ["주문", "고객 1"]],
    traps: ["방향을 뒤집어 N:1", "여러 주문을 M:N으로 보기", "최소 참여와 최대 카디널리티 혼동"],
  });

  add({
    id: "integrity-case", domain: "DB", title: "무결성 위반 사례 매핑",
    oneLine: "존재하지 않는 부모키를 외래키가 가리키면 참조 무결성 위반이다.",
    memorize: "부모 없는 외래키 = 참조 위반.",
    example: "학과 99가 없는데 학생의 학과번호가 99인 경우다.",
    question: "부모 테이블에 부서번호 99가 없는데 직원 행의 외래키 부서번호에 99를 넣었다. 위반한 무결성은?",
    answer: "참조 무결성", accept: ["참조무결성", "referential integrity"],
    summary: "외래키가 실제 부모키를 가리키지 못하므로 참조 무결성 위반이다.",
    steps: ["문제의 컬럼이 외래키임을 찾는다.", "외래키 값은 99다.", "부모 기본키 집합에 99가 없다.", "외래키는 NULL이거나 존재하는 부모키여야 한다.", "따라서 참조 무결성 위반이다."],
    table: [["자식 FK", "부모 PK 존재", "판정"], ["99", "아니오", "위반"]],
    traps: ["기본키 NULL이 아니므로 개체 무결성", "값 범위라 도메인 무결성", "CASCADE가 자동 생성한다고 생각"],
  });

  add({
    id: "recovery-log", domain: "DB", title: "로그로 REDO·UNDO 결정",
    oneLine: "COMMIT 완료 트랜잭션은 REDO, 장애 전 COMMIT하지 못한 트랜잭션은 UNDO한다.",
    memorize: "확정 완료 다시 반영 REDO, 미확정 되돌림 UNDO.",
    example: "T1 COMMIT 뒤 장애, T2 수정 중 장애라면 T1 REDO·T2 UNDO다.",
    question: "체크포인트 뒤 T1은 UPDATE 후 COMMIT했고 T2는 UPDATE만 한 상태에서 장애가 났다. T1과 T2의 복구 연산을 순서대로 쓰시오.",
    answer: "REDO, UNDO", accept: [["REDO", "재실행"], ["UNDO", "취소"]], answerMode: "mapped",
    summary: "T1은 확정됐으므로 REDO, T2는 미확정이므로 UNDO다.",
    steps: ["체크포인트 이후 로그만 본다.", "T1의 UPDATE 로그를 찾는다.", "T1 뒤 COMMIT이 있으므로 완료 트랜잭션이다.", "T2에는 UPDATE만 있고 COMMIT이 없다.", "완료 T1은 REDO, 미완료 T2는 UNDO다."],
    table: [["트랜잭션", "COMMIT", "복구"], ["T1", "있음", "REDO"], ["T2", "없음", "UNDO"]],
    traps: ["수정한 것은 모두 UNDO", "장애가 나면 모두 REDO", "T1/T2 대응 순서 뒤집기"],
  });

  add({
    id: "scheduling-average", domain: "OS", title: "SJF·SRT·RR 간트차트와 대기시간",
    oneLine: "모두 동시에 도착한 비선점 SJF는 실행시간이 짧은 순서로 배치하고 시작 시각이 대기시간이다.",
    memorize: "SJF 정렬 → 누적 시작 시각 → 평균.",
    example: "실행시간 1,3,5면 대기시간 0,1,4다.",
    question: "모두 0시에 도착한 프로세스의 실행시간이 P1=3, P2=5, P3=1이다. 비선점 SJF 평균 대기시간을 소수 둘째 자리까지 쓰시오.",
    answer: "1.67", answerMode: "numeric",
    summary: "순서 P3,P1,P2의 대기시간 0,1,4 평균은 5/3=1.67이다.",
    steps: ["도착 시간이 모두 같음을 확인한다.", "실행시간 오름차순으로 P3,P1,P2를 정렬한다.", "P3 대기시간은 0이다.", "P1은 P3 뒤라 1, P2는 P3+P1 뒤라 4다.", "평균 (0+1+4)/3=1.67이다."],
    table: [["프로세스", "구간", "대기"], ["P3", "0~1", "0"], ["P2", "4~9", "4"]],
    traps: ["원래 번호 순서로 실행", "완료시간을 대기시간으로 사용", "평균을 5/2로 계산"],
  });

  add({
    id: "page-replacement-calc", domain: "OS", title: "LRU·LFU 페이지 부재표",
    oneLine: "LRU는 프레임이 찼을 때 현재 시점에서 가장 오래 참조되지 않은 페이지를 내보낸다.",
    memorize: "매 참조마다 마지막 사용 시각 갱신.",
    example: "프레임 3개에서 1,2,3을 채운 뒤 1을 다시 쓰면 2가 가장 오래됐다.",
    question: "빈 프레임 3개에 참조열 1,2,3,1,4,2를 LRU로 처리할 때 페이지 부재 횟수는?",
    answer: "5", answerMode: "numeric",
    summary: "첫 1,2,3과 4,마지막 2에서 부재가 발생해 총 5회다.",
    steps: ["1,2,3은 모두 처음이라 부재 3회다.", "다음 1은 프레임에 있어 hit다.", "4가 오면 가장 오래 안 쓴 2를 교체한다.", "프레임은 1,4,3이 된다.", "마지막 2가 없어 가장 오래된 3을 교체한다.", "총 부재는 5회다."],
    table: [["참조", "프레임", "결과"], ["1", "1,-,-", "fault"], ["2(마지막)", "1,4,2", "fault"]],
    traps: ["hit도 부재로 세기", "가장 먼저 들어온 페이지만 교체해 FIFO로 계산", "최근 사용 시각을 갱신하지 않기"],
  });

  add({
    id: "chmod-calc", domain: "OS", title: "chmod 권한 숫자 계산",
    oneLine: "사용자·그룹·기타 세 묶음에서 r=4,w=2,x=1을 각각 더한다.",
    memorize: "rwx=421.",
    example: "rwx r-x --x는 7,5,1이다.",
    question: "Linux 권한 rwx r-x --x를 chmod 8진수 세 자리로 쓰시오.",
    answer: "751", answerMode: "numeric",
    summary: "rwx=7, r-x=5, --x=1이므로 751이다.",
    steps: ["권한을 rwx/r-x/--x 세 묶음으로 나눈다.", "첫 묶음은 4+2+1=7이다.", "둘째는 4+0+1=5다.", "셋째는 0+0+1=1이다.", "세 숫자를 이어 751이다."],
    table: [["대상", "권한", "합"], ["user", "rwx", "7"], ["other", "--x", "1"]],
    traps: ["세 묶음을 모두 더해 13", "r=1,w=2,x=4로 뒤집기", "하이픈을 음수로 보기"],
  });

  add({
    id: "raid-capacity", domain: "OS", title: "RAID 저장용량과 장애 허용",
    oneLine: "RAID 5는 디스크 하나 분량을 분산 패리티에 사용한다.",
    memorize: "RAID5 usable=(N-1)×최소 디스크.",
    example: "1TB 네 개면 사용 가능 3TB다.",
    question: "동일한 1TB 디스크 4개로 RAID 5를 구성할 때 사용 가능한 용량은 몇 TB인가?",
    answer: "3", accept: ["3", "3TB", "3 TB"], answerMode: "term",
    summary: "한 디스크 분량이 패리티이므로 (4-1)×1TB=3TB다.",
    steps: ["디스크 수 N=4다.", "각 디스크 최소 용량은 1TB다.", "RAID5는 한 디스크 분량을 패리티로 사용한다.", "데이터용 디스크 분량은 N-1=3이다.", "사용 가능 용량은 3TB다."],
    table: [["항목", "값"], ["전체", "4TB"], ["사용 가능", "3TB"]],
    traps: ["패리티가 디스크마다 있으니 절반 사용", "RAID1처럼 2TB", "전체 4TB 답하기"],
  });

  add({
    id: "cidr-full-calc", domain: "네트워크", title: "CIDR 네트워크·브로드캐스트·호스트 수",
    oneLine: "/26은 마지막 옥텟 블록 크기 64이고 사용 가능 호스트는 64-2다.",
    memorize: "블록=256-마스크, 시작은 블록 배수, 끝은 다음 시작-1.",
    example: "70은 64~127 블록에 속한다.",
    question: "192.168.1.70/26의 네트워크 주소, 브로드캐스트 주소, 사용 가능한 호스트 수를 순서대로 쓰시오.",
    answer: "192.168.1.64, 192.168.1.127, 62",
    accept: [["192.168.1.64"], ["192.168.1.127"], ["62"]], answerMode: "mapped", type: "netos",
    summary: "/26 블록 64에서 70은 64~127에 속하고 호스트 수는 62다.",
    steps: ["/26 마스크 마지막 옥텟은 192다.", "블록 크기는 256-192=64다.", "70이 속한 블록 시작은 64다.", "다음 블록 128 직전인 127이 브로드캐스트다.", "주소 64개에서 네트워크와 브로드캐스트를 빼 62개다."],
    table: [["항목", "값"], ["범위", "64~127"], ["호스트", "65~126"]],
    traps: ["네트워크 주소를 입력 IP 70으로 답하기", "브로드캐스트를 128로 답하기", "호스트 수를 64로 답하기"],
  });

  add({
    id: "flsm-calc", domain: "네트워크", title: "FLSM 균등 서브넷 분할",
    oneLine: "서브넷 수가 2의 거듭제곱이 되도록 호스트 비트를 빌린다.",
    memorize: "4개 분할=2비트 빌림.",
    example: "/24에서 두 비트를 빌리면 /26 네 개가 된다.",
    question: "192.168.10.0/24 네트워크를 같은 크기의 서브넷 4개로 나눌 때 새 프리픽스 길이는?",
    answer: "26", accept: ["26", "/26"], answerMode: "term", type: "netos",
    summary: "4=2²이므로 호스트 비트 2개를 빌려 /24가 /26이 된다.",
    steps: ["필요한 서브넷 수는 4다.", "4는 2의 2제곱이다.", "서브넷 비트 두 개를 빌린다.", "기존 프리픽스 24에 2를 더한다.", "새 프리픽스는 /26이다."],
    table: [["분할 수", "빌릴 비트", "새 prefix"], ["4", "2", "/26"]],
    traps: ["24를 4로 나누기", "호스트 수 62를 답하기", "/28로 네 비트 빌리기"],
  });

  add({
    id: "hdlc-map", domain: "네트워크", title: "HDLC I·S·U 프레임 대응",
    oneLine: "사용자 정보는 I, 흐름·오류 감독은 S, 링크 설정·관리는 U 프레임이다.",
    memorize: "Information I, Supervisory S, Unnumbered U.",
    example: "데이터 전송=I, ACK·재전송 제어=S, 링크 제어=U.",
    question: "사용자 데이터 전송, 흐름·오류 제어, 링크 설정·관리 프레임의 영문 약자를 순서대로 쓰시오.",
    answer: "I, S, U", accept: [["I", "I-frame"], ["S", "S-frame"], ["U", "U-frame"]], answerMode: "mapped", type: "netos",
    summary: "정보·감독·비번호 프레임이므로 I,S,U다.",
    steps: ["첫 설명은 실제 사용자 정보를 싣는다.", "Information의 I를 대응한다.", "둘째는 감독 기능이라 Supervisory의 S다.", "셋째는 링크 관리용 비번호 프레임이다.", "Unnumbered의 U를 대응해 I,S,U다."],
    table: [["기능", "프레임"], ["데이터", "I"], ["링크 관리", "U"]],
    traps: ["I와 U 순서 뒤집기", "S를 Session으로 해석", "세 종류를 순서 없이 제출"],
  });

  add({
    id: "hamming-parity", domain: "네트워크", title: "해밍 코드 패리티 비트 수",
    oneLine: "데이터 m비트에 필요한 패리티 r은 2^r ≥ m+r+1을 만족하는 최소값이다.",
    memorize: "오류 없음 한 칸까지 포함해 m+r+1.",
    example: "m=8이면 r=4에서 16≥13이 된다.",
    question: "데이터 비트가 8개일 때 단일 오류 정정을 위한 해밍 코드의 최소 패리티 비트 수는?",
    answer: "4", answerMode: "numeric", type: "netos",
    summary: "r=3은 8≥12로 실패하고 r=4는 16≥13으로 성공하므로 4개다.",
    steps: ["공식 2^r≥m+r+1에 m=8을 넣는다.", "r=3이면 왼쪽 8, 오른쪽 12다.", "8≥12는 거짓이다.", "r=4이면 왼쪽 16, 오른쪽 13이다.", "처음 만족하는 최소 r은 4다."],
    table: [["r", "2^r", "m+r+1", "판정"], ["3", "8", "12", "실패"], ["4", "16", "13", "성공"]],
    traps: ["2^r≥m만 검사", "처음 실패한 3을 답함", "패리티 포함 총 길이 12를 답함"],
  });

  add({
    id: "branch-coverage-calc", domain: "테스트/품질", title: "분기 커버리지 테스트 수",
    oneLine: "결정 결과 전체가 참인 경우와 거짓인 경우를 최소 한 번씩 만든다.",
    memorize: "branch는 큰 if 결과 T/F.",
    example: "if(A||B)는 둘 중 하나 참인 테스트와 둘 다 거짓인 테스트가 필요하다.",
    question: "결정문 if (A || B)의 분기 커버리지만 100% 만족시키는 최소 테스트 수는?",
    answer: "2", answerMode: "numeric",
    summary: "결정 결과 참과 거짓을 한 번씩 만들면 되므로 최소 2개다.",
    steps: ["분기 커버리지는 결정 결과를 본다.", "참 분기를 위한 입력 하나를 고른다.", "예를 들어 A=T,B=F면 참이다.", "거짓 분기는 A=F,B=F여야 한다.", "두 테스트로 참·거짓 분기를 모두 실행한다."],
    table: [["A", "B", "결정"], ["T", "F", "T"], ["F", "F", "F"]],
    traps: ["A와 B 각각 T/F를 모두 요구해 4개", "참 테스트 하나만 사용", "조건 커버리지와 혼동"],
  });

  add({
    id: "mcdc-calc", domain: "테스트/품질", title: "MC/DC 독립 영향 쌍",
    oneLine: "다른 조건은 고정하고 한 조건만 바꿨을 때 결정 결과가 바뀌는 쌍을 조건마다 만든다.",
    memorize: "A&&B는 TT 기준으로 FT와 TF를 붙인다.",
    example: "TT↔FT는 A 영향, TT↔TF는 B 영향이다.",
    question: "결정문 A && B에서 MC/DC를 만족시키는 최소 테스트 수는?",
    answer: "3", answerMode: "numeric",
    summary: "TT,FT,TF 세 테스트로 A와 B의 독립 영향을 각각 보일 수 있다.",
    steps: ["기준 테스트 TT의 결정 결과는 T다.", "A만 바꾼 FT의 결과는 F다.", "TT와 FT 쌍이 A의 독립 영향을 보인다.", "B만 바꾼 TF의 결과도 F다.", "TT와 TF 쌍이 B 영향을 보여 총 3개다."],
    table: [["테스트", "A", "B", "결과"], ["1", "T", "T", "T"], ["3", "T", "F", "F"]],
    traps: ["분기 커버리지처럼 2개", "모든 조합 4개가 반드시 필요", "두 조건을 동시에 바꾼 쌍 사용"],
  });

  add({
    id: "boundary-values", domain: "테스트/품질", title: "경계값 테스트 데이터 만들기",
    oneLine: "강건 경계값은 최소·최대의 바로 밖, 경계, 바로 안을 고른다.",
    memorize: "min-1,min,min+1,max-1,max,max+1.",
    example: "1~100이면 0,1,2,99,100,101이다.",
    question: "허용 범위가 1~100인 입력에 강건 경계값 분석을 적용할 때 대표 테스트 값의 개수는?",
    answer: "6", answerMode: "numeric",
    summary: "0,1,2,99,100,101의 여섯 값을 사용한다.",
    steps: ["최소 경계는 1이다.", "최소 바깥·경계·안쪽은 0,1,2다.", "최대 경계는 100이다.", "최대 안쪽·경계·바깥은 99,100,101이다.", "중복 없이 총 여섯 값이다."],
    table: [["경계", "값"], ["최소", "0,1,2"], ["최대", "99,100,101"]],
    traps: ["경계 1,100 두 개만 선택", "정상 경계값 분석과 강건 분석 혼동", "중간값 50 추가"],
  });

  add({
    id: "vmodel-map", domain: "테스트/품질", title: "V 모델 개발·테스트 단계 대응",
    oneLine: "단위 테스트는 상세 설계, 통합 테스트는 아키텍처 설계 결과를 확인한다.",
    memorize: "작은 코드-상세-단위, 모듈 연결-구조-통합.",
    example: "시스템 테스트는 시스템 요구사항, 인수 테스트는 사용자 요구사항과 대응한다.",
    question: "단위 테스트와 통합 테스트가 각각 대응해 검증하는 개발 단계를 순서대로 쓰시오.",
    answer: "상세 설계, 아키텍처 설계", accept: [["상세설계", "모듈설계"], ["아키텍처설계", "구조설계"]], answerMode: "mapped",
    summary: "단위는 상세 설계, 통합은 아키텍처 설계와 대응한다.",
    steps: ["V 모델 왼쪽에는 요구·설계 단계가 있다.", "오른쪽에는 작은 테스트부터 큰 테스트가 올라간다.", "단위 테스트는 개별 모듈 상세 설계를 확인한다.", "통합 테스트는 모듈 사이 구조와 인터페이스를 확인한다.", "따라서 상세 설계, 아키텍처 설계 순서다."],
    table: [["테스트", "대응 단계"], ["단위", "상세 설계"], ["통합", "아키텍처 설계"]],
    traps: ["두 대응을 역순 제출", "단위 테스트를 사용자 요구와 연결", "통합 테스트를 코딩 단계만 검증"],
  });

  add({
    id: "cohesion-coupling-case", domain: "설계/패턴", title: "응집도·결합도 사례 판별",
    oneLine: "모듈이 한 기능만 수행하면 기능적 응집, 필요한 데이터만 인자로 주고받으면 자료 결합이다.",
    memorize: "안은 하나로 모으고, 밖은 데이터만 느슨하게.",
    example: "세금 계산만 하는 함수에 금액 숫자만 전달하면 기능적 응집과 자료 결합이다.",
    question: "한 모듈이 주문 합계 계산 한 기능만 수행하고 다른 모듈과 필요한 숫자 매개변수만 주고받는다. 응집도와 결합도 유형을 순서대로 쓰시오.",
    answer: "기능적 응집도, 자료 결합도", accept: [["기능적응집", "functional cohesion"], ["자료결합", "data coupling"]], answerMode: "mapped",
    summary: "단일 기능은 기능적 응집, 단순 데이터 매개변수 교환은 자료 결합이다.",
    steps: ["모듈 내부 역할 수를 확인한다.", "주문 합계 한 기능만 있으므로 기능적 응집이다.", "모듈 사이 전달 내용을 확인한다.", "제어 플래그나 구조 내부가 아니라 필요한 숫자만 전달한다.", "따라서 자료 결합이다."],
    table: [["관점", "단서", "판정"], ["내부", "한 기능", "기능적"], ["외부", "데이터만", "자료"]],
    traps: ["응집과 결합을 같은 순서 척도로 보기", "숫자 전달을 제어 결합으로 보기", "기능적 결합도라고 답하기"],
  });

  add({
    id: "fan-structure-calc", domain: "설계/패턴", title: "구조도 Fan-in·Fan-out 계산",
    oneLine: "M으로 들어오는 호출 화살표 수가 Fan-in, M에서 나가는 호출 수가 Fan-out이다.",
    memorize: "들어오면 in, 나가면 out.",
    example: "A,B,C가 M을 부르고 M이 X,Y를 부르면 3과 2다.",
    question: "구조도에서 A,B,C가 모듈 M을 호출하고 M은 X,Y를 호출한다. M의 Fan-in과 Fan-out을 순서대로 쓰시오.",
    answer: "3, 2", accept: [["3"], ["2"]], answerMode: "mapped",
    summary: "M으로 세 화살표가 들어오고 두 화살표가 나가므로 3,2다.",
    steps: ["계산 대상 모듈 M을 가운데 둔다.", "A→M 화살표를 센다.", "B→M과 C→M까지 들어오는 화살표는 3개다.", "M→X와 M→Y는 나가는 화살표 2개다.", "Fan-in=3, Fan-out=2다."],
    table: [["지표", "화살표", "값"], ["Fan-in", "A,B,C→M", "3"], ["Fan-out", "M→X,Y", "2"]],
    traps: ["in/out을 반대로 셈", "간접 호출까지 임의로 추가", "모듈 수 전체를 계산"],
  });

  add({
    id: "access-control-case", domain: "보안", title: "DAC·MAC·RBAC 사례 매핑",
    oneLine: "직무 역할에 권한을 묶고 사용자를 역할에 배정하면 RBAC이다.",
    memorize: "주인 DAC, 등급 MAC, 역할 RBAC.",
    example: "의사 역할은 진료기록 읽기, 간호사 역할은 제한된 수정 권한을 받는다.",
    question: "병원 시스템에서 사용자 개인이 아니라 의사·간호사·원무 역할별로 권한을 부여한다. 접근통제 모델은?",
    answer: "RBAC", accept: ["RBAC", "역할기반접근통제", "role based access control"],
    summary: "권한 기준이 사용자의 직무 역할이므로 RBAC이다.",
    steps: ["권한 결정 주체를 찾는다.", "파일 소유자가 임의로 정하는 구조가 아니다.", "군사 보안등급에 따른 강제 통제도 아니다.", "의사·간호사라는 역할에 권한이 묶여 있다.", "따라서 역할 기반 RBAC이다."],
    table: [["모델", "기준"], ["DAC", "소유자"], ["RBAC", "역할"]],
    traps: ["관리자가 정하니 MAC", "사용자마다 계정이 있으니 DAC", "인증 방식 SSO로 답하기"],
  });

  add({
    id: "crypto-classification", domain: "보안", title: "암호·해시 사례 분류",
    oneLine: "같은 비밀키는 대칭키, 공개키·개인키 쌍은 비대칭키, 복호화 없는 지문은 해시다.",
    memorize: "같은 키 AES, 두 키 RSA, 한 방향 SHA.",
    example: "대용량 본문 AES, 키 교환 RSA, 무결성 SHA 조합이 흔하다.",
    question: "같은 비밀키로 암복호화, 공개키·개인키 쌍 사용, 단방향 고정길이 지문 생성에 해당하는 대표 알고리즘을 순서대로 쓰시오.",
    answer: "AES, RSA, SHA", accept: [["AES"], ["RSA"], ["SHA", "SHA-256"]], answerMode: "mapped",
    summary: "대칭키 AES, 비대칭키 RSA, 해시 SHA 순서다.",
    steps: ["첫 설명은 암호화와 복호화에 같은 키를 쓴다.", "대표 대칭키 AES를 대응한다.", "둘째는 공개키와 개인키 쌍이므로 RSA다.", "셋째는 복호화하지 않는 고정 길이 지문이다.", "대표 해시 SHA를 대응해 AES,RSA,SHA다."],
    table: [["기능", "분류", "예"], ["같은 키", "대칭", "AES"], ["단방향", "해시", "SHA"]],
    traps: ["RSA를 해시로 분류", "SHA를 암호화라고 표현", "설명과 답 순서를 뒤집기"],
  });

  window.MEGA_THEORY_ITEMS = [...(window.MEGA_THEORY_ITEMS || []), ...lessons];
  window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), ...rows];
  window.APPLIED_THEORY_COUNTS = {
    lessons: lessons.length,
    practice: rows.length,
  };
})();
