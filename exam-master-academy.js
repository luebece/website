(function () {
  const academy = window.CODE_SQL_ACADEMY || {};

  function extend(lang, patch) {
    const lesson = academy[lang];
    if (!lesson) return;
    Object.entries(patch).forEach(([key, value]) => {
      lesson[key] = Array.isArray(value) ? [...(lesson[key] || []), ...value] : value;
    });
  }

  extend("C", {
    examPatterns: [
      {
        title: "이중 포인터와 동적 2차원 배열",
        body: "int **a는 행 포인터들을 가리킨다. a[i]는 i번째 행, a[i][j]는 그 행의 j번째 값이다.",
        items: ["*pp는 포인터 하나, **pp는 최종 값이다.", "malloc한 행 수와 열 수를 먼저 표로 그린다.", "free는 보통 출력 뒤라 값 계산에는 영향을 주지 않는다."],
      },
      {
        title: "연결 리스트 재배치",
        body: "코드 선언 순서가 아니라 next 화살표를 따라가야 한다.",
        items: ["노드마다 값 칸과 next 칸을 그린다.", "next가 바뀌면 기존 화살표를 지운다.", "head에서 시작해 NULL까지 읽는다."],
      },
      {
        title: "구조체 안 함수 포인터",
        body: "int (*op)(int,int)는 함수를 담는 칸이다. op에 어떤 함수가 들어갔는지 먼저 적는다.",
        items: ["op(3,4)를 실제 함수명 호출로 바꿔 쓴다.", "%x는 마지막 정수를 16진수로 바꿔 쓴다.", "함수 결과를 구한 뒤 출력 형식을 적용한다."],
      },
    ],
    traceRules: [
      {
        title: "별표를 한 겹씩 벗긴다",
        body: "pp가 p를 가리키고 p가 x를 가리키면 *pp는 p, **pp는 x다.",
        code: "int x=5;\nint *p=&x;\nint **pp=&p;",
      },
      {
        title: "next는 실제 화살표로 그린다",
        body: "a.next=&c라고 나오면 a에서 c로 화살표를 그린다. 선언 순서와 연결 순서는 다를 수 있다.",
        code: "a.next=&c;\nc.next=&b;\n// a -> c -> b",
      },
      {
        title: "함수 포인터에는 함수 이름을 적는다",
        body: "op=sub이면 op(8,3)은 sub(8,3)으로 바꿔 읽는다.",
        code: "int (*op)(int,int)=sub;\nint r=op(8,3); // 5",
      },
    ],
    fundamentals: [
      {
        title: "이중 포인터",
        body: "포인터의 주소를 저장하는 포인터다. 최종 원본 값까지 가려면 별표 두 개를 사용한다.",
        code: "int x=3;\nint *p=&x;\nint **pp=&p;\n**pp=9;",
      },
      {
        title: "동적 2차원 배열",
        body: "먼저 행 포인터 배열을 만들고, 각 행마다 정수 칸을 따로 만든다.",
        code: "int **a=malloc(sizeof(int*)*rows);\nfor(int i=0;i<rows;i++)\n  a[i]=malloc(sizeof(int)*cols);",
      },
      {
        title: "연결 리스트 노드",
        body: "노드는 값과 다음 노드 주소를 함께 가진다. 마지막 next는 NULL이다.",
        code: "struct N {\n  int value;\n  struct N *next;\n};",
      },
      {
        title: "함수 포인터",
        body: "함수의 주소를 저장해 실행할 함수를 나중에 선택한다.",
        code: "int add(int a,int b){return a+b;}\nint (*op)(int,int)=add;\nprintf(\"%d\",op(2,3));",
      },
    ],
    walkthroughs: [
      {
        title: "이중 포인터 재지정",
        code: "int a=2,b=9;\nint *p=&a;\nint **pp=&p;\n*pp=&b;\n**pp-=4;",
        trace: [
          ["p", "&a", "처음에는 a를 본다."],
          ["*pp=&b", "p=&b", "pp를 통해 p가 b를 보도록 바꾼다."],
          ["**pp-=4", "b=5", "최종 값 b를 4 줄인다."],
        ],
        output: "a=2, b=5",
      },
      {
        title: "연결 리스트 순서",
        code: "a.next=&c;\nc.next=&b;\nb.next=NULL;\nstruct N *head=&a;",
        trace: [
          ["head", "a", "시작 노드는 a다."],
          ["a.next", "c", "다음은 선언상 b가 아니라 c다."],
          ["c.next", "b", "그 다음은 b다."],
        ],
        output: "a -> c -> b",
      },
      {
        title: "함수 포인터와 16진수",
        code: "int mul(int a,int b){return a*b;}\nint (*op)(int,int)=mul;\nprintf(\"%x\",op(3,10));",
        trace: [
          ["op", "mul", "호출할 함수는 mul이다."],
          ["op(3,10)", "30", "3 곱하기 10이다."],
          ["%x", "1e", "30을 16진수로 바꾼다."],
        ],
        output: "1e",
      },
    ],
    traps: [
      "malloc이 보이면 겁먹지 말고 최종적으로 몇 행 몇 열인지 표부터 만든다.",
      "구조체 배열의 점 연산자와 구조체 포인터의 화살표 연산자를 섞지 않는다.",
      "함수 포인터 선언의 별표는 반환값 포인터가 아니라 함수 주소를 담는다는 표시다.",
      "연결 리스트는 변수 선언 순서가 아니라 next 연결 순서로 출력된다.",
    ],
    finalChecklist: [
      "int **에서 *와 **가 각각 무엇인지 말할 수 있다.",
      "malloc 2차원 배열을 행·열 표로 옮길 수 있다.",
      "next 포인터를 따라 연결 리스트 출력 순서를 구할 수 있다.",
      "구조체의 함수 포인터가 가리키는 함수를 찾아 호출할 수 있다.",
      "%x 출력값을 16진수로 바꿀 수 있다.",
    ],
  });

  extend("Java", {
    examPatterns: [
      {
        title: "필드와 메서드는 기준이 다르다",
        body: "부모 타입 변수로 자식 객체를 볼 때 필드는 선언 타입, 오버라이딩 메서드는 실제 객체 기준이다.",
        items: ["p.x는 p의 선언 타입에서 찾는다.", "p.f()는 실제 new 객체에서 찾는다.", "오버로딩 후보도 선언 타입에서 먼저 정한다."],
      },
      {
        title: "enum은 배열처럼 순서가 있다",
        body: "values()는 선언 순서 배열, ordinal()은 0부터 시작하는 번호, name()은 상수 이름 문자열이다.",
        items: ["values()[1]은 두 번째 상수다.", "ordinal은 0,1,2 순서다.", "열거 상수마다 생성자 값을 붙일 수 있다."],
      },
      {
        title: "생성자 안 오버라이딩 호출",
        body: "부모 생성자가 자식 오버라이딩 메서드를 부르면 자식 필드 초기화 전 기본값이 보일 수 있다.",
        items: ["부모 생성자가 먼저 실행된다.", "자식 int 필드 초기화 전 값은 0이다.", "호출 메서드는 실제 객체 기준이라 자식 메서드가 실행된다."],
      },
    ],
    traceRules: [
      {
        title: "필드·메서드 두 줄로 적기",
        body: "A p=new B()라면 필드 기준 A, 메서드 기준 B라고 문제 위에 적는다.",
        code: "A p=new B();\n// field: A\n// override method: B",
      },
      {
        title: "오버로딩은 호출 전에 결정",
        body: "인자 변수의 선언 타입과 리터럴 모양으로 어느 메서드 서명이 선택되는지 먼저 정한다.",
        code: "Object x=\"A\";\nf(x);   // f(Object)\nf(\"A\"); // f(String)",
      },
      {
        title: "enum 세 도구",
        body: "values, ordinal, name을 각각 배열, 번호, 글자로 번역한다.",
        code: "Level.values()[1]\nLevel.MID.ordinal()\nLevel.MID.name()",
      },
    ],
    fundamentals: [
      {
        title: "enum",
        body: "정해진 상수 집합을 타입으로 만든다. 상수마다 필드와 생성자를 가질 수 있다.",
        code: "enum Level {\n  LOW(1), HIGH(2);\n  int v;\n  Level(int v){this.v=v;}\n}",
      },
      {
        title: "와일드카드 제네릭",
        body: "? extends T는 T의 자식 목록을 읽을 때, ? super T는 T 값을 넣을 때 주로 쓴다.",
        code: "List<? extends Number> read;\nList<? super Integer> write;",
      },
      {
        title: "필드 숨김",
        body: "자식이 같은 이름의 필드를 만들면 오버라이딩이 아니라 별도 필드 두 개가 존재한다.",
        code: "class A { int x=1; }\nclass B extends A { int x=5; }",
      },
    ],
    walkthroughs: [
      {
        title: "필드 숨김과 오버라이딩",
        code: "class A { int x=1; int f(){return x;} }\nclass B extends A { int x=5; int f(){return x;} }\nA p=new B();",
        trace: [
          ["p.x", "1", "필드는 선언 타입 A에서 찾는다."],
          ["p.f()", "5", "메서드는 실제 객체 B가 실행된다."],
          ["합", "6", "1과 5를 더한다."],
        ],
        output: "6",
      },
      {
        title: "생성자 중 동적 바인딩",
        code: "class A { A(){print(f());} int f(){return 1;} }\nclass B extends A { int x=7; int f(){return x;} }\nnew B();",
        trace: [
          ["부모 생성자", "먼저", "A 생성자가 실행된다."],
          ["f()", "B.f", "실제 객체가 B라 오버라이딩 메서드가 선택된다."],
          ["B.x", "0", "아직 자식 필드 초기화 전이라 기본값이다."],
        ],
        output: "0",
      },
    ],
    traps: [
      "enum ordinal은 1이 아니라 0부터 시작한다.",
      "오버로딩은 실제 객체가 아니라 호출 시 보이는 타입과 인자 모양으로 결정된다.",
      "부모 생성자 실행 중 자식 필드는 아직 명시한 값으로 초기화되지 않았을 수 있다.",
      "List<int>는 불가능하고 List<Integer>처럼 래퍼 타입을 쓴다.",
    ],
    finalChecklist: [
      "필드는 선언 타입, 오버라이딩 메서드는 실제 객체 기준을 구분한다.",
      "오버로딩 후보를 인자 타입으로 선택할 수 있다.",
      "enum values(), ordinal(), name() 결과를 안다.",
      "생성자 실행 순서와 자식 필드 기본값을 추적한다.",
      "? extends와 ? super의 읽기/쓰기 방향을 구분한다.",
    ],
  });

  extend("Python", {
    examPatterns: [
      {
        title: "중첩 리스트 얕은 복사",
        body: "a[:]와 a.copy()는 바깥 상자만 새로 만들고 안쪽 리스트는 원본과 공유한다.",
        items: ["안쪽 append나 값 변경은 원본에도 보인다.", "b[0]=새 리스트처럼 바깥 칸 재대입은 원본에 영향 없다.", "깊은 복사는 copy.deepcopy를 사용한다."],
      },
      {
        title: "클래스 트리 재귀",
        body: "노드 값과 children 목록을 그리고, 자식마다 같은 함수를 호출한 뒤 결과를 합친다.",
        items: ["잎 노드는 children이 비어 있다.", "sum(generator)는 모든 자식 결과를 더한다.", "깊이는 합이 아니라 가장 큰 자식 깊이에 1을 더한다."],
      },
      {
        title: "딕셔너리 안 리스트",
        body: "키를 먼저 찾고 그 값이 리스트인지 튜플인지 확인한 뒤 sum과 len을 계산한다.",
        items: ["enumerate는 인덱스와 값을 함께 준다.", "dict comprehension은 키:값 쌍을 만든다.", "출력되는 튜플 괄호와 쉼표도 확인한다."],
      },
    ],
    traceRules: [
      {
        title: "복사 후 공유표",
        body: "바깥 a와 b는 따로, 안쪽 a[0]과 b[0]은 같은 상자라고 선으로 연결한다.",
        code: "a=[[1],[2]]\nb=a[:]\n// outer: different\n// inner: shared",
      },
      {
        title: "재귀 트리는 아래부터",
        body: "먼저 자식이 없는 잎의 결과를 적고 부모로 올라오며 더하거나 max를 취한다.",
        code: "total(node)=node.v+sum(total(child))",
      },
      {
        title: "슬라이싱은 인덱스 나열",
        body: "결과를 상상하지 말고 start에서 시작해 stop 직전까지 step만큼의 인덱스를 적는다.",
        code: "[1:8:2] -> 1,3,5,7",
      },
    ],
    fundamentals: [
      {
        title: "얕은 복사와 깊은 복사",
        body: "얕은 복사는 한 겹만 복사하고, 깊은 복사는 안쪽 객체까지 모두 새로 만든다.",
        code: "b=a.copy()\nc=copy.deepcopy(a)",
      },
      {
        title: "트리 노드 클래스",
        body: "각 노드는 자기 값과 자식 노드 목록을 가진다.",
        code: "class Node:\n  def __init__(self,v):\n    self.v=v\n    self.children=[]",
      },
      {
        title: "딕셔너리 컴프리헨션",
        body: "반복하며 키와 값을 한 줄로 만든다.",
        code: "r={i:(sum(v),len(v)) for i,v in enumerate(data)}",
      },
    ],
    walkthroughs: [
      {
        title: "얕은 복사 두 종류 변경",
        code: "a=[[1,2],[3,4]]\nb=a[:]\nb[0].append(9)\nb[1]=[7]",
        trace: [
          ["b[0].append", "공유 안쪽 변경", "a[0]도 [1,2,9]가 된다."],
          ["b[1]=[7]", "바깥 칸 재대입", "a[1]은 [3,4] 그대로다."],
          ["a", "[[1,2,9],[3,4]]", "두 동작의 차이를 반영한다."],
        ],
        output: "[[1, 2, 9], [3, 4]]",
      },
      {
        title: "트리 전체 합",
        code: "a(2)\n+- b(3)\n+- c(5)",
        trace: [
          ["b", "3", "자식이 없는 잎이라 자기 값이다."],
          ["c", "5", "자식이 없는 잎이다."],
          ["a", "2+3+5", "자기 값과 모든 자식 결과를 더한다."],
        ],
        output: "10",
      },
    ],
    traps: [
      "a[:]는 중첩 리스트 전체를 깊게 복사하지 않는다.",
      "기본 인자로 빈 리스트를 쓰면 호출 사이에 같은 리스트가 재사용된다.",
      "set은 출력 순서를 답으로 묻기보다 길이나 정렬 결과를 먼저 본다.",
      "[::-2]는 뒤에서 시작해 두 칸씩 왼쪽으로 간다.",
    ],
    finalChecklist: [
      "대입, 얕은 복사, 깊은 복사의 공유 범위를 구분한다.",
      "중첩 리스트 내부 변경과 바깥 칸 재대입의 차이를 안다.",
      "트리 재귀를 잎부터 계산할 수 있다.",
      "딕셔너리·리스트·튜플이 섞여도 자료형을 한 겹씩 벗긴다.",
      "슬라이싱 인덱스를 실제 숫자로 나열한다.",
    ],
  });

  extend("SQL", {
    examPatterns: [
      {
        title: "JOIN은 중복 행 수까지 센다",
        body: "한쪽 키가 두 번 있으면 조인 결과도 두 행이 된다. 키마다 몇 대 몇인지 먼저 적는다.",
        items: ["INNER JOIN은 매칭된 조합 수다.", "LEFT JOIN은 매칭이 없어도 왼쪽 한 행을 남긴다.", "조인 뒤 WHERE를 적용한다."],
      },
      {
        title: "COUNT와 NULL",
        body: "COUNT(*)는 행 전체, COUNT(컬럼)은 NULL이 아닌 값만 센다.",
        items: ["AVG도 NULL을 제외한다.", "NULL 비교는 =가 아니라 IS NULL이다.", "집계 전에 WHERE로 행을 거른다."],
      },
      {
        title: "AND가 OR보다 먼저",
        body: "괄호가 없으면 AND 묶음을 먼저 계산하고 나중에 OR로 합친다.",
        items: ["A AND B OR C는 (A AND B) OR C다.", "헷갈리면 각 행마다 T/F 표를 만든다.", "출력 열보다 먼저 결과 행 수를 확정한다."],
      },
    ],
    traceRules: [
      {
        title: "JOIN 키별 매칭 수",
        body: "A의 id 1이 한 행이고 B의 id 1이 두 행이면 결과 id 1은 두 행이다.",
        code: "A: id 1 x1\nB: id 1 x2\nJOIN: id 1 x2",
      },
      {
        title: "집계는 NULL을 지운 표로",
        body: "COUNT(컬럼)과 AVG(컬럼)은 먼저 그 컬럼의 NULL 칸을 제외한 뒤 계산한다.",
        code: "score: 2, 4, NULL, 6\nCOUNT(score)=3\nAVG(score)=4",
      },
      {
        title: "논리 조건 괄호 복원",
        body: "AND 부분을 괄호로 묶어 쓴 뒤 각 행이 통과하는지 체크한다.",
        code: "a>1 AND b=0 OR a=3\n-> (a>1 AND b=0) OR a=3",
      },
    ],
    fundamentals: [
      {
        title: "COUNT와 NULL",
        body: "별표는 행 자체를 세고 컬럼 이름은 값이 있는 칸만 센다.",
        code: "COUNT(*)\nCOUNT(score)\nAVG(score)",
      },
      {
        title: "집합 연산",
        body: "UNION은 중복 제거, UNION ALL은 중복 유지, INTERSECT는 공통, EXCEPT는 차집합이다.",
        code: "SELECT x FROM A\nUNION ALL\nSELECT x FROM B;",
      },
      {
        title: "외래키 완성형",
        body: "제약조건 이름, 외래키 열, 부모 테이블과 열, 삭제 동작 순서로 쓴다.",
        code: "CONSTRAINT fk\nFOREIGN KEY(parent_id)\nREFERENCES parent(id)\nON DELETE CASCADE",
      },
    ],
    walkthroughs: [
      {
        title: "LEFT JOIN 행 수",
        code: "A id: 1,2,3\nB id: 1,1,3",
        trace: [
          ["id=1", "2행", "B에 두 번 매칭된다."],
          ["id=2", "1행", "매칭이 없어 NULL 한 행을 남긴다."],
          ["id=3", "1행", "한 번 매칭된다."],
        ],
        output: "총 4행",
      },
      {
        title: "AND/OR 우선순위",
        code: "WHERE a>1 AND b=0 OR a=3",
        trace: [
          ["먼저", "a>1 AND b=0", "AND 묶음을 계산한다."],
          ["나중", "OR a=3", "앞 묶음 또는 a=3인 행을 남긴다."],
          ["검산", "행별 T/F", "조건을 한 행씩 대입한다."],
        ],
        output: "(a>1 AND b=0) OR a=3",
      },
    ],
    traps: [
      "COUNT(컬럼)은 NULL을 세지 않는다.",
      "LEFT JOIN에서 오른쪽에 같은 키가 여러 행이면 결과 행도 늘어난다.",
      "WHERE의 AND가 OR보다 우선한다.",
      "UNION은 중복을 제거하지만 UNION ALL은 제거하지 않는다.",
      "FOREIGN KEY와 REFERENCES의 대상 열 위치를 뒤바꾸지 않는다.",
    ],
    finalChecklist: [
      "JOIN 키마다 매칭되는 행 수를 셀 수 있다.",
      "COUNT(*), COUNT(컬럼), AVG(컬럼)의 NULL 처리를 안다.",
      "AND/OR 조건에 괄호를 복원해 계산한다.",
      "UNION과 UNION ALL 결과 행 수를 구분한다.",
      "외래키 DDL을 완전한 형태로 쓸 수 있다.",
    ],
  });
})();
