(function () {
  const academy = window.CODE_SQL_ACADEMY || {};

  function extendLesson(lang, patch) {
    const lesson = academy[lang];
    if (!lesson) return;
    Object.entries(patch).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        lesson[key] = [...(lesson[key] || []), ...value];
      } else {
        lesson[key] = value;
      }
    });
  }

  extendLesson("C", {
    mastery: [
      { title: "문법 읽기", body: "타입, 변수, 배열, 포인터 기호를 보고 무엇이 어느 칸을 가리키는지 말한다." },
      { title: "변수표 작성", body: "한 줄 실행할 때마다 x, i, 배열, 포인터 위치를 표에 갱신한다." },
      { title: "출력식 계산", body: "printf 안에 들어간 식만 마지막에 모아서 계산한다." },
      { title: "함정 반복", body: "++x, x++, *(p+i), p[i], 문자 코드, 구조체 포인터를 반복해서 푼다." },
    ],
    fundamentals: [
      {
        title: "for문 실행 순서",
        body: "초기식은 한 번만 실행되고, 그 뒤에는 조건, 몸통, 증감식, 조건 순서로 반복된다.",
        code: "for (int i = 0; i < 3; i++) {\n  printf(\"%d\", i);\n}\n// 012",
      },
      {
        title: "2차원 배열",
        body: "a[row][col]에서 앞 인덱스는 행, 뒤 인덱스는 열이다.",
        code: "int a[2][2] = {{1, 2}, {3, 4}};\nprintf(\"%d\", a[1][0]); // 3",
      },
      {
        title: "문자열 포인터",
        body: "char 포인터도 한 글자씩 이동한다. *(p+1)은 다음 문자다.",
        code: "char *p = \"ABC\";\nprintf(\"%c\", *(p + 1)); // B",
      },
      {
        title: "함수 반환",
        body: "함수 호출식은 return으로 나온 값 하나로 바뀐다고 생각한다.",
        code: "int f(int x){ return x * 2; }\nprintf(\"%d\", f(3) + 1); // 7",
      },
    ],
    walkthroughs: [
      {
        title: "2차원 배열 추적",
        code: "int a[2][3] = {{1,2,3},{4,5,6}};\nprintf(\"%d\", a[1][2] + a[0][1]);",
        trace: [
          ["a[1][2]", "6", "두 번째 행, 세 번째 열이다."],
          ["a[0][1]", "2", "첫 번째 행, 두 번째 열이다."],
          ["합계", "8", "6 + 2를 계산한다."],
        ],
        output: "8",
      },
      {
        title: "문자열 포인터 추적",
        code: "char *p = \"KOREA\";\nprintf(\"%c\", *(p+3));",
        trace: [
          ["p", "K", "첫 글자 K를 가리킨다."],
          ["p+3", "E", "K(0), O(1), R(2), E(3)이다."],
          ["*(p+3)", "E", "그 위치의 문자를 읽는다."],
        ],
        output: "E",
      },
    ],
    templates: [
      ["최댓값 찾기", "int max = a[0];\nfor (int i = 1; i < n; i++) {\n  if (a[i] > max) max = a[i];\n}"],
      ["2차원 배열 순회", "for (int i = 0; i < r; i++) {\n  for (int j = 0; j < c; j++) {\n    printf(\"%d\", a[i][j]);\n  }\n}"],
    ],
    traps: ["함수 인자는 기본적으로 복사본이다.", "2차원 배열은 행과 열을 바꾸면 바로 틀린다.", "문자 하나는 작은따옴표, 문자열은 큰따옴표다."],
  });

  extendLesson("Java", {
    mastery: [
      { title: "객체표 작성", body: "변수의 선언 타입과 new 뒤 실제 타입을 따로 적는다." },
      { title: "상속 추적", body: "오버라이딩은 실제 객체, 오버로딩은 매개변수 모양으로 판단한다." },
      { title: "공유값 분리", body: "static은 클래스 칸에 따로 적고 객체별 값과 섞지 않는다." },
      { title: "문자열 함정", body: "String의 ==, equals, length(), 배열 length를 반복한다." },
    ],
    fundamentals: [
      {
        title: "메서드 호출",
        body: "객체.메서드() 형태는 그 객체 안의 메서드를 실행한다.",
        code: "Box b = new Box();\nb.open();",
      },
      {
        title: "오버로딩 선택",
        body: "오버로딩은 실행 전에 매개변수 타입과 개수로 선택된다.",
        code: "void f(int x){}\nvoid f(String x){}\nf(3); // int 버전",
      },
      {
        title: "생성자 순서",
        body: "자식 객체를 만들면 부모 생성자가 먼저 실행되고 자식 생성자가 실행된다.",
        code: "class B extends A {\n  B(){ super(); }\n}",
      },
      {
        title: "배열 참조",
        body: "배열 변수도 참조다. 같은 배열을 보면 한쪽 변경이 다른 쪽에도 보인다.",
        code: "int[] a = {1,2};\nint[] b = a;\nb[0] = 9;\n// a[0]도 9",
      },
    ],
    walkthroughs: [
      {
        title: "부모 생성자 먼저",
        code: "class A { A(){ System.out.print(\"A\"); } }\nclass B extends A { B(){ System.out.print(\"B\"); } }\nnew B();",
        trace: [
          ["new B()", "B 객체 생성", "자식 객체를 만든다."],
          ["A()", "A 출력", "부모 생성자가 먼저 실행된다."],
          ["B()", "B 출력", "그 뒤 자식 생성자가 실행된다."],
        ],
        output: "AB",
      },
      {
        title: "오버로딩과 오버라이딩 구분",
        code: "class T {\n  void f(int x){ System.out.print(\"I\"); }\n  void f(String x){ System.out.print(\"S\"); }\n}\nnew T().f(\"7\");",
        trace: [
          ["f 후보", "int, String", "같은 이름의 메서드가 둘이다."],
          ["입력값", "\"7\"", "문자열이다."],
          ["선택", "String 버전", "매개변수 타입으로 오버로딩을 선택한다."],
        ],
        output: "S",
      },
    ],
    templates: [
      ["오버라이딩 기본", "class Parent { void f(){ } }\nclass Child extends Parent {\n  @Override void f(){ }\n}"],
      ["static 카운터", "class T {\n  static int count = 0;\n  T(){ count++; }\n}"],
    ],
    traps: ["부모 생성자가 먼저 실행된다.", "오버로딩은 매개변수, 오버라이딩은 실제 객체다.", "배열도 객체처럼 참조로 움직인다."],
  });

  extendLesson("Python", {
    mastery: [
      { title: "인덱스 표시", body: "문자열과 리스트 아래에 0, 1, 2와 -1, -2를 같이 적는다." },
      { title: "슬라이싱 표시", body: "start, stop, step을 나누고 stop은 포함하지 않는다고 표시한다." },
      { title: "원본 변경 확인", body: "append, extend, sort, pop은 원본을 바꾸는지 먼저 본다." },
      { title: "참조 구분", body: "b=a인지 b=a[:]인지 확인해서 같은 리스트인지 새 리스트인지 나눈다." },
    ],
    fundamentals: [
      {
        title: "얕은 복사",
        body: "a[:]는 바깥 리스트는 새로 만들지만 안쪽 리스트까지 깊게 복사하지는 않는다.",
        code: "a = [[1], [2]]\nb = a[:]\nb[0].append(9)\nprint(a)  # [[1, 9], [2]]",
      },
      {
        title: "딕셔너리 반복",
        body: "items()는 키와 값을 함께 꺼낸다.",
        code: "d = {'a': 1}\nfor k, v in d.items():\n    print(k, v)",
      },
      {
        title: "정렬 기준",
        body: "key는 무엇을 기준으로 정렬할지 정한다.",
        code: "a = ['bbb', 'a']\nprint(sorted(a, key=len))  # ['a', 'bbb']",
      },
      {
        title: "문자열은 불변",
        body: "문자열은 일부 글자를 직접 바꿀 수 없다. 새 문자열을 만들어야 한다.",
        code: "s = 'abc'\ns = 'A' + s[1:]\nprint(s)  # Abc",
      },
    ],
    walkthroughs: [
      {
        title: "중첩 리스트 얕은 복사",
        code: "a = [[1], [2]]\nb = a[:]\nb[0].append(3)\nprint(a)",
        trace: [
          ["a", "[[1], [2]]", "안쪽 리스트 두 개가 있다."],
          ["b = a[:]", "바깥만 새 리스트", "안쪽 리스트는 같이 본다."],
          ["b[0].append(3)", "[[1,3], [2]]", "같은 안쪽 리스트가 바뀐다."],
        ],
        output: "[[1, 3], [2]]",
      },
      {
        title: "딕셔너리 값 갱신",
        code: "d = {'A': 1, 'B': 2}\nd['A'] += d['B']\nprint(d['A'])",
        trace: [
          ["d['A']", "1", "처음 A 값이다."],
          ["d['B']", "2", "B 값이다."],
          ["d['A'] += d['B']", "3", "A에 B를 더해 저장한다."],
        ],
        output: "3",
      },
    ],
    templates: [
      ["빈도 세기", "count = {}\nfor x in data:\n    count[x] = count.get(x, 0) + 1"],
      ["조건 필터", "result = []\nfor x in data:\n    if x >= 60:\n        result.append(x)"],
    ],
    traps: ["a[:]도 중첩 리스트 안쪽까지 완전 복사하지 않는다.", "sort는 원본 변경, sorted는 새 결과다.", "문자열은 리스트처럼 일부를 직접 바꿀 수 없다."],
  });

  extendLesson("SQL", {
    mastery: [
      { title: "처리 순서 암기", body: "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY를 입으로 말한다." },
      { title: "임시표 만들기", body: "JOIN 결과가 어떤 표가 되는지 먼저 그린다." },
      { title: "집계 분리", body: "행 조건은 WHERE, 집계 조건은 HAVING으로 분리한다." },
      { title: "결과표 계산", body: "SELECT에 남는 컬럼과 ORDER BY 정렬까지 마지막에 계산한다." },
    ],
    fundamentals: [
      {
        title: "별칭",
        body: "AS로 컬럼이나 테이블에 임시 이름을 붙인다.",
        code: "SELECT name AS 이름\nFROM student AS s;",
      },
      {
        title: "CASE",
        body: "조건에 따라 다른 값을 출력할 때 CASE를 쓴다.",
        code: "CASE WHEN score >= 60 THEN 'P' ELSE 'F' END",
      },
      {
        title: "상관 서브쿼리",
        body: "안쪽 쿼리가 바깥 행 값을 참조하면 바깥 행마다 다시 계산된다.",
        code: "WHERE score > (SELECT AVG(score) FROM exam WHERE dept = s.dept)",
      },
      {
        title: "COUNT 컬럼",
        body: "COUNT(*)는 행 수, COUNT(컬럼)은 NULL이 아닌 값 수를 센다.",
        code: "COUNT(*)\nCOUNT(score)",
      },
    ],
    walkthroughs: [
      {
        title: "COUNT와 NULL",
        code: "SELECT COUNT(*), COUNT(score)\nFROM exam;",
        trace: [
          ["COUNT(*)", "전체 행 수", "NULL 여부와 상관없이 행을 센다."],
          ["COUNT(score)", "score가 NULL 아닌 행 수", "컬럼값이 NULL이면 세지 않는다."],
          ["차이", "NULL", "NULL이 섞이면 두 값이 달라질 수 있다."],
        ],
        output: "전체 행 수와 점수 있는 행 수",
      },
      {
        title: "CASE 결과 읽기",
        code: "SELECT name,\nCASE WHEN score >= 60 THEN 'P' ELSE 'F' END AS result\nFROM exam;",
        trace: [
          ["score >= 60", "참", "result는 P다."],
          ["score >= 60", "거짓", "result는 F다."],
          ["AS result", "별칭", "결과 컬럼 이름을 result로 보여 준다."],
        ],
        output: "이름과 P/F 판정",
      },
    ],
    templates: [
      ["CASE", "SELECT name,\n  CASE WHEN score >= 60 THEN 'PASS' ELSE 'FAIL' END AS result\nFROM exam;"],
      ["서브쿼리", "SELECT name\nFROM exam\nWHERE score > (SELECT AVG(score) FROM exam);"],
    ],
    traps: ["COUNT(컬럼)은 NULL을 세지 않는다.", "ORDER BY는 SELECT 뒤에 처리된다고 생각한다.", "LEFT JOIN 후 오른쪽 컬럼은 NULL이 될 수 있다."],
  });

  const moreRows = [
    ["cq-c-001", "C", "code", "must", "C 출력값은?\nint a[] = {1, 3, 5, 7};\nprintf(\"%d\", a[0] + a[3]);", ["8"], "8", "a[0]=1, a[3]=7이라서 8이다.", ["C", "배열"]],
    ["cq-c-002", "C", "code", "must", "C 출력값은?\nint a[] = {4, 8, 12};\nint *p = a;\nprintf(\"%d\", *(p+1));", ["8"], "8", "p+1은 a[1]을 가리킨다.", ["C", "포인터", "배열"]],
    ["cq-c-003", "C", "code", "must", "C 출력값은?\nint x = 2;\nprintf(\"%d\", ++x + 5);", ["8"], "8", "++x로 x가 3이 된 뒤 5를 더한다.", ["C", "증감연산"]],
    ["cq-c-004", "C", "code", "must", "C 출력값은?\nint x = 2;\nprintf(\"%d\", x++ + 5);", ["7"], "7", "x++는 2를 먼저 사용한다.", ["C", "증감연산"]],
    ["cq-c-005", "C", "code", "high", "C 출력값은?\nint x = 1;\nfor(int i=0; i<3; i++) x *= 2;\nprintf(\"%d\", x);", ["8"], "8", "x는 1->2->4->8이 된다.", ["C", "반복문"]],
    ["cq-c-006", "C", "code", "high", "C 출력값은?\nchar *p = \"ABCDE\";\nprintf(\"%c\", *(p+4));", ["E", "e"], "E", "p+4는 다섯 번째 문자 E다.", ["C", "문자열", "포인터"]],
    ["cq-c-007", "C", "code", "high", "C 출력값은?\nint a[2][2] = {{1,2},{3,4}};\nprintf(\"%d\", a[1][1]);", ["4"], "4", "두 번째 행 두 번째 열은 4다.", ["C", "2차원배열"]],
    ["cq-c-008", "C", "code", "high", "C 출력값은?\nint a = 6, b = 4;\nprintf(\"%d\", a > b ? a : b);", ["6"], "6", "조건이 참이므로 a를 선택한다.", ["C", "삼항연산"]],
    ["cq-c-009", "C", "code", "high", "C 출력값은?\nprintf(\"%d\", 9 / 2);", ["4"], "4", "정수 나눗셈은 소수 부분을 버린다.", ["C", "연산자"]],
    ["cq-c-010", "C", "code", "high", "C 출력값은?\nprintf(\"%d\", 9 % 2);", ["1"], "1", "9를 2로 나눈 나머지는 1이다.", ["C", "연산자"]],
    ["cq-c-011", "C", "code", "high", "C 출력값은?\nint x = 3;\nint *p = &x;\nprintf(\"%d\", *p + 2);", ["5"], "5", "*p는 x 값 3이다.", ["C", "포인터"]],
    ["cq-c-012", "C", "code", "high", "C 출력값은?\nint f(int x){ return x + 4; }\nprintf(\"%d\", f(3));", ["7"], "7", "f(3)은 3+4를 반환한다.", ["C", "함수"]],
    ["cq-c-013", "C", "code", "mid", "C 출력값은?\nint s = 0;\nfor(int i=1; i<5; i+=2) s += i;\nprintf(\"%d\", s);", ["4"], "4", "i는 1,3이고 합은 4다.", ["C", "반복문"]],
    ["cq-c-014", "C", "code", "mid", "C 출력값은?\nprintf(\"%d\", 5 << 1);", ["10"], "10", "왼쪽 시프트 1은 2배로 보면 된다.", ["C", "비트연산"]],
    ["cq-c-015", "C", "code", "mid", "C 출력값은?\nprintf(\"%d\", 8 >> 2);", ["2"], "2", "오른쪽 시프트 2는 4로 나눈 몫처럼 본다.", ["C", "비트연산"]],

    ["cq-java-001", "Java", "code", "must", "Java 출력값은?\nint[] a = {2, 4, 6};\nSystem.out.print(a[2]);", ["6"], "6", "Java 배열도 0번부터 시작한다.", ["Java", "배열"]],
    ["cq-java-002", "Java", "code", "must", "Java 출력값은?\nString s = \"ABCDE\";\nSystem.out.print(s.charAt(1));", ["B", "b"], "B", "charAt(1)은 두 번째 문자다.", ["Java", "String"]],
    ["cq-java-003", "Java", "code", "must", "Java 출력값은?\nString s = \"ABC\";\nSystem.out.print(s.length());", ["3"], "3", "문자열 길이는 length()다.", ["Java", "String"]],
    ["cq-java-004", "Java", "code", "high", "Java 출력값은?\nint x = 1;\nfor(int i=0; i<3; i++) x += i;\nSystem.out.print(x);", ["4"], "4", "x는 1+0+1+2가 되어 4다.", ["Java", "반복문"]],
    ["cq-java-005", "Java", "code", "high", "Java 출력값은?\nclass A { A(){ System.out.print(\"A\"); } }\nclass B extends A { B(){ System.out.print(\"B\"); } }\nnew B();", ["AB", "ab"], "AB", "부모 생성자 A가 먼저, 자식 생성자 B가 나중이다.", ["Java", "상속", "생성자"]],
    ["cq-java-006", "Java", "code", "high", "Java 출력값은?\nclass A { int x = 1; }\nA a = new A();\nA b = a;\nb.x = 5;\nSystem.out.print(a.x);", ["5"], "5", "a와 b는 같은 객체를 본다.", ["Java", "참조"]],
    ["cq-java-007", "Java", "code", "high", "Java 출력값은?\nSystem.out.print(\"A\" + 1 + 2);", ["A12", "a12"], "A12", "문자열 뒤의 +는 이어붙이기가 된다.", ["Java", "String"]],
    ["cq-java-008", "Java", "code", "high", "Java 출력값은?\nSystem.out.print(1 + 2 + \"A\");", ["3A", "3a"], "3A", "앞의 1+2가 먼저 계산되어 3A가 된다.", ["Java", "String"]],
    ["cq-java-009", "Java", "code", "mid", "Java에서 배열 길이를 구할 때 쓰는 것은 length인가 length()인가?", ["length"], "length", "배열은 length 필드, 문자열은 length() 메서드다.", ["Java", "배열"]],
    ["cq-java-010", "Java", "code", "mid", "Java 출력값은?\nint x = 3;\nSystem.out.print(x > 2 ? \"Y\" : \"N\");", ["Y", "y"], "Y", "조건이 참이므로 Y다.", ["Java", "삼항연산"]],
    ["cq-java-011", "Java", "code", "mid", "Java 출력값은?\nString a = \"hi\";\nString b = \"hi\";\nSystem.out.print(a.equals(b));", ["true", "참"], "true", "equals는 문자열 내용을 비교한다.", ["Java", "String"]],
    ["cq-java-012", "Java", "code", "mid", "Java에서 자식 클래스가 부모 클래스를 상속할 때 쓰는 키워드는?", ["extends"], "extends", "class Child extends Parent 형태다.", ["Java", "상속"]],
    ["cq-java-013", "Java", "code", "mid", "Java에서 인터페이스를 구현할 때 쓰는 키워드는?", ["implements"], "implements", "class A implements B 형태다.", ["Java", "인터페이스"]],
    ["cq-java-014", "Java", "code", "mid", "Java 출력값은?\nint[] a = {1,2};\nint[] b = a;\nb[1] = 9;\nSystem.out.print(a[1]);", ["9"], "9", "배열 참조를 공유한다.", ["Java", "배열", "참조"]],
    ["cq-java-015", "Java", "code", "mid", "Java에서 클래스가 공유하는 변수 앞에 붙는 키워드는?", ["static"], "static", "static 변수는 클래스 단위 공유값이다.", ["Java", "static"]],

    ["cq-py-001", "Python", "code", "must", "Python 출력값은?\na = [10, 20, 30]\nprint(a[0])", ["10"], "10", "첫 칸은 0번이다.", ["Python", "리스트"]],
    ["cq-py-002", "Python", "code", "must", "Python 출력값은?\ns = 'ABCDE'\nprint(s[-2])", ["D", "d"], "D", "-1은 E, -2는 D다.", ["Python", "인덱스"]],
    ["cq-py-003", "Python", "code", "must", "Python 출력값은?\nprint(list(range(4)))", ["[0,1,2,3]", "[0, 1, 2, 3]"], "[0, 1, 2, 3]", "range(4)는 0부터 3까지다.", ["Python", "range"]],
    ["cq-py-004", "Python", "code", "high", "Python 출력값은?\na = [1, 2, 3, 4]\nprint(a[::2])", ["[1,3]", "[1, 3]"], "[1, 3]", "처음부터 두 칸씩 고른다.", ["Python", "슬라이싱"]],
    ["cq-py-005", "Python", "code", "high", "Python 출력값은?\na = [1, 2, 3, 4]\nprint(a[1::2])", ["[2,4]", "[2, 4]"], "[2, 4]", "1번 칸부터 두 칸씩 고른다.", ["Python", "슬라이싱"]],
    ["cq-py-006", "Python", "code", "high", "Python 출력값은?\na = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a)", ["[1,2]", "[1, 2]"], "[1, 2]", "copy는 새 리스트를 만든다.", ["Python", "리스트", "복사"]],
    ["cq-py-007", "Python", "code", "high", "Python 출력값은?\na = [[1], [2]]\nb = a[:]\nb[0].append(9)\nprint(a)", ["[[1,9],[2]]", "[[1, 9], [2]]"], "[[1, 9], [2]]", "얕은 복사라 안쪽 리스트는 공유된다.", ["Python", "리스트", "복사"]],
    ["cq-py-008", "Python", "code", "high", "Python 출력값은?\nd = {'x': 2}\nd['x'] += 3\nprint(d['x'])", ["5"], "5", "2에 3을 더해 저장한다.", ["Python", "딕셔너리"]],
    ["cq-py-009", "Python", "code", "mid", "Python 출력값은?\nprint('a,b,c'.split(','))", ["['a','b','c']", "['a', 'b', 'c']"], "['a', 'b', 'c']", "쉼표 기준으로 문자열을 나눈다.", ["Python", "문자열"]],
    ["cq-py-010", "Python", "code", "mid", "Python 출력값은?\nprint(sorted([3, 1, 2]))", ["[1,2,3]", "[1, 2, 3]"], "[1, 2, 3]", "sorted는 정렬된 새 리스트를 반환한다.", ["Python", "정렬"]],
    ["cq-py-011", "Python", "code", "mid", "Python 출력값은?\na = [3, 1, 2]\na.sort()\nprint(a)", ["[1,2,3]", "[1, 2, 3]"], "[1, 2, 3]", "sort는 원본 리스트를 정렬한다.", ["Python", "정렬"]],
    ["cq-py-012", "Python", "code", "mid", "Python 출력값은?\nprint(len({'a': 1, 'b': 2}))", ["2"], "2", "딕셔너리 길이는 키 개수다.", ["Python", "딕셔너리"]],
    ["cq-py-013", "Python", "code", "mid", "Python 출력값은?\nprint([x*2 for x in range(3)])", ["[0,2,4]", "[0, 2, 4]"], "[0, 2, 4]", "x는 0,1,2이고 각각 2배다.", ["Python", "리스트"]],
    ["cq-py-014", "Python", "code", "mid", "Python 출력값은?\nprint(bool(''))", ["False", "false", "거짓"], "False", "빈 문자열은 False다.", ["Python", "bool"]],
    ["cq-py-015", "Python", "code", "mid", "Python 출력값은?\nprint(bool([0]))", ["True", "true", "참"], "True", "원소가 있는 리스트는 True다.", ["Python", "bool"]],

    ["cq-sql-001", "SQL", "sql", "must", "SQL 처리 순서를 FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY 기준으로 쓰면?", [["from"], ["where"], ["groupby", "group by"], ["having"], ["select"], ["orderby", "order by"]], "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY", "겉보기와 실제 처리 순서는 다르다.", ["SQL", "실행순서"]],
    ["cq-sql-002", "SQL", "sql", "must", "COUNT(*)와 COUNT(score) 중 NULL score 행도 세는 것은?", ["count(*)"], "COUNT(*)", "COUNT(컬럼)은 NULL을 세지 않는다.", ["SQL", "집계"]],
    ["cq-sql-003", "SQL", "sql", "must", "SELECT 결과를 내림차순으로 정렬할 때 쓰는 키워드는?", ["desc"], "DESC", "ASC는 오름차순, DESC는 내림차순이다.", ["SQL", "ORDER BY"]],
    ["cq-sql-004", "SQL", "sql", "high", "조건에 따라 PASS/FAIL 같은 값을 출력할 때 쓰는 SQL 표현은?", ["case", "casewhen", "case when"], "CASE WHEN", "CASE WHEN 조건 THEN 값 ELSE 값 END 형태다.", ["SQL", "CASE"]],
    ["cq-sql-005", "SQL", "sql", "high", "테이블이나 컬럼에 임시 이름을 붙이는 SQL 키워드는?", ["as"], "AS", "SELECT name AS 이름 형태로 쓴다.", ["SQL", "별칭"]],
    ["cq-sql-006", "SQL", "sql", "high", "학생별 점수가 평균보다 큰 행을 찾을 때 SELECT 안에 들어가는 또 다른 SELECT를 무엇이라 하는가?", ["서브쿼리", "subquery", "sub query"], "서브쿼리", "쿼리 안의 쿼리다.", ["SQL", "Subquery"]],
    ["cq-sql-007", "SQL", "sql", "high", "GROUP BY 없이 전체 평균을 구하는 집계 함수는?", ["avg"], "AVG", "AVG(score)는 평균을 구한다.", ["SQL", "집계"]],
    ["cq-sql-008", "SQL", "sql", "high", "LEFT JOIN 결과에서 오른쪽 테이블에 매칭이 없으면 오른쪽 컬럼 값은?", ["null"], "NULL", "LEFT JOIN은 왼쪽을 살리고 오른쪽 없으면 NULL로 채운다.", ["SQL", "JOIN"]],
    ["cq-sql-009", "SQL", "sql", "mid", "두 SELECT 결과의 공통 행만 남기는 집합 연산자는?", ["intersect"], "INTERSECT", "교집합이다.", ["SQL", "집합연산"]],
    ["cq-sql-010", "SQL", "sql", "mid", "앞 SELECT 결과에서 뒤 SELECT 결과를 빼는 집합 연산자는?", ["minus", "except"], "MINUS", "차집합이다. DBMS에 따라 EXCEPT라고도 한다.", ["SQL", "집합연산"]],
    ["cq-sql-011", "SQL", "sql", "mid", "컬럼 값이 NULL이 아닌 행을 찾는 조건은?", ["isnotnull", "is not null"], "IS NOT NULL", "NULL 비교는 IS NULL 또는 IS NOT NULL을 쓴다.", ["SQL", "NULL"]],
    ["cq-sql-012", "SQL", "sql", "mid", "문자열이 A로 시작하는 값을 찾는 LIKE 조건은?", ["like'a%'", "a%", "likea%"], "LIKE 'A%'", "%는 여러 글자를 뜻한다.", ["SQL", "LIKE"]],
    ["cq-sql-013", "SQL", "sql", "mid", "기본키가 지켜야 하는 대표 조건 두 가지는?", [["중복", "unique", "유일"], ["null", "notnull", "널"]], "중복 불가, NULL 불가", "기본키는 행을 유일하게 식별해야 한다.", ["SQL", "키"]],
    ["cq-sql-014", "SQL", "sql", "mid", "테이블 구조를 바꾸는 DDL 명령어는?", ["alter"], "ALTER", "ALTER TABLE로 컬럼 추가나 변경을 한다.", ["SQL", "DDL"]],
    ["cq-sql-015", "SQL", "sql", "mid", "사용자에게 권한을 주는 SQL 명령어는?", ["grant"], "GRANT", "권한 부여는 GRANT다.", ["SQL", "DCL"]],
  ];

  window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), ...moreRows];
})();
