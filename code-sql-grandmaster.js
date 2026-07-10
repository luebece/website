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
      {
        title: "문제 첫 줄 번역",
        body: "int, char, 배열, 포인터, 구조체가 보이면 영어처럼 읽지 말고 메모리 칸으로 바꾼다. 시험 C 문제의 절반은 칸 위치를 묻는다.",
      },
      {
        title: "포인터는 화살표",
        body: "p는 값이 아니라 위치를 들고 있다. *p는 그 위치 안의 값, p+1은 다음 칸으로 이동이다.",
      },
      {
        title: "출력 직전만 믿기",
        body: "중간에 x가 몇 번 바뀌든 마지막 printf, return, System.out.print, print에 들어가는 값만 답이다.",
      },
    ],
    examPatterns: [
      {
        title: "배열 + 포인터",
        body: "a[i], *(a+i), p[i], *(p+i)는 같은 문제를 다른 얼굴로 낸 것이다.",
        items: ["배열은 0번부터 시작한다.", "int *p = a; 라면 p는 a[0]을 본다.", "p+2는 주소 숫자 2 증가가 아니라 원소 2칸 이동이다."],
      },
      {
        title: "문자열 + 문자 코드",
        body: "문자열은 문자 배열이고 끝에는 보이지 않는 \\0이 있다.",
        items: ["'A' + 1은 'B'처럼 문자 코드가 움직인다.", "s[0]은 첫 글자, s[1]은 두 번째 글자다.", "문자열 길이는 \\0 직전까지 센다."],
      },
      {
        title: "함수 호출",
        body: "C는 기본적으로 값을 복사해서 함수에 넘긴다. 원본을 바꾸려면 주소를 넘겨야 한다.",
        items: ["f(x)는 x의 복사본만 바뀐다.", "f(&x)는 x의 주소가 넘어간다.", "함수 안에서 *p를 바꾸면 원본 값이 바뀐다."],
      },
      {
        title: "반복문 + 조건문",
        body: "for문은 초기식 한 번, 조건 검사, 본문, 증감식 순서로 돈다.",
        items: ["continue는 아래를 건너뛰고 증감식으로 간다.", "break는 반복문을 바로 끝낸다.", "중첩 반복은 안쪽 반복이 끝나야 바깥쪽이 한 칸 간다."],
      },
    ],
    traceRules: [
      {
        title: "배열은 표로 그린다",
        body: "위에 인덱스 0,1,2를 쓰고 아래에 값을 적는다. 그 다음 a[숫자]를 표에서 찾는다.",
        code: "index: 0  1  2  3\nvalue: 3  5  7  9",
      },
      {
        title: "포인터는 현재 칸 표시",
        body: "p가 어느 칸을 보는지 동그라미 친다. p++나 p+1이 나오면 동그라미를 오른쪽으로 옮긴다.",
        code: "int a[] = {2, 4, 6};\nint *p = a + 1;\n// p는 a[1], 즉 4를 본다.",
      },
      {
        title: "증감 연산자는 사용 시점",
        body: "++x는 먼저 올리고 사용, x++는 먼저 사용하고 나중에 올린다. 한 줄 끝날 때 변수표를 다시 적는다.",
        code: "int x = 2;\nint y = x++;\n// y=2, x=3",
      },
      {
        title: "비트 연산은 2진수 네 칸",
        body: "&는 둘 다 1일 때만 1, |는 하나라도 1이면 1, ^는 서로 다를 때 1이다.",
        code: "6 & 3 = 0110 & 0011 = 0010 = 2",
      },
    ],
    fundamentals: [
      {
        title: "구조체 포인터",
        body: "구조체 변수는 점, 구조체 포인터는 화살표로 멤버를 꺼낸다.",
        code: "struct S { int score; };\nstruct S s = {90};\nstruct S *p = &s;\nprintf(\"%d\", p->score); // 90",
      },
      {
        title: "주소로 원본 바꾸기",
        body: "함수 안에서 원본을 바꾸려면 매개변수로 포인터를 받고, 호출할 때 &를 붙인다.",
        code: "void add(int *p) { *p += 3; }\nint x = 4;\nadd(&x);\nprintf(\"%d\", x); // 7",
      },
      {
        title: "재귀 함수",
        body: "재귀는 멈추는 조건부터 찾는다. 그 다음 가장 작은 값부터 되돌아오며 계산한다.",
        code: "int f(int n) {\n  if (n <= 1) return 1;\n  return n + f(n - 1);\n}\n// f(4)=4+3+2+1",
      },
      {
        title: "정수 나눗셈",
        body: "int끼리 나누면 소수점은 버린다. /는 몫, %는 나머지다.",
        code: "printf(\"%d\", 17 / 5); // 3\nprintf(\"%d\", 17 % 5); // 2",
      },
      {
        title: "switch 흐름",
        body: "case에 들어간 뒤 break를 만나기 전까지 아래 case까지 계속 실행된다.",
        code: "switch (2) {\n  case 2: printf(\"B\");\n  case 3: printf(\"C\"); break;\n}\n// BC",
      },
    ],
    walkthroughs: [
      {
        title: "포인터 이동 문제",
        code: "int a[] = {3, 5, 7, 9};\nint *p = a + 1;\nprintf(\"%d\", *p + *(p + 2));",
        trace: [
          ["a", "[3,5,7,9]", "a[0]=3, a[1]=5, a[2]=7, a[3]=9다."],
          ["p", "a[1]", "a+1이므로 p는 두 번째 칸 5를 본다."],
          ["*(p+2)", "9", "p에서 두 칸 오른쪽은 a[3]이다."],
          ["출력", "14", "5+9를 출력한다."],
        ],
        output: "14",
      },
      {
        title: "주소 전달 문제",
        code: "void f(int *p) { *p = *p + 3; }\nint x = 4;\nf(&x);\nprintf(\"%d\", x);",
        trace: [
          ["x", "4", "처음 값이다."],
          ["f(&x)", "x의 주소", "복사값이 아니라 x 위치가 함수에 넘어간다."],
          ["*p = *p + 3", "7", "p가 x를 보므로 x 자체가 7이 된다."],
        ],
        output: "7",
      },
    ],
    templates: [
      ["재귀 합", "int f(int n) {\n  if (n <= 1) return 1;\n  return n + f(n - 1);\n}"],
      ["문자열 길이 직접 세기", "int len = 0;\nwhile (s[len] != '\\0') {\n  len++;\n}"],
      ["포인터로 두 값 교환", "void swap(int *a, int *b) {\n  int t = *a;\n  *a = *b;\n  *b = t;\n}"],
    ],
    traps: [
      "C에서 x++ + ++x처럼 같은 변수를 한 식에서 여러 번 고치는 문제는 실제 C 기준으로 위험하다. 시험에서는 보통 분리된 줄의 추적을 묻는다.",
      "char는 문자처럼 보이지만 내부적으로 숫자 코드라서 덧셈이 가능하다.",
      "switch는 break가 없으면 아래 case까지 흘러간다.",
    ],
    answerRules: [
      "출력 문제는 공백까지 문제의 print 형식을 따라 쓴다. System.out.print(\"%d %d\")처럼 사이 공백이 있으면 답에도 공백을 둔다.",
      "문자 하나를 묻는 문제는 따옴표 없이 문자만 쓴다. 예: D",
      "정수 나눗셈 결과는 소수점 없이 쓴다. 17/5는 3이다.",
      "포인터 문제는 p가 보는 칸을 먼저 정하고, 마지막에 *p인지 p인지 확인한다.",
    ],
    finalChecklist: [
      "배열 시작 번호 0 확인",
      "p, p+1, *p, *(p+1) 구분",
      "x++와 ++x 사용 시점 표시",
      "break, continue, return이 흐름을 끊는 위치 확인",
      "마지막 출력문에 들어가는 값만 답으로 적기",
    ],
  });

  extendLesson("Java", {
    mastery: [
      {
        title: "선언 타입과 실제 객체 분리",
        body: "A x = new B(); 에서 변수의 겉옷은 A지만 실제 몸은 B다. 오버라이딩 메서드는 실제 객체 B가 이긴다.",
      },
      {
        title: "static은 공동 통장",
        body: "static 변수는 객체마다 따로 생기지 않는다. 모든 객체가 같은 값을 같이 쓴다.",
      },
      {
        title: "문자열 비교 분리",
        body: "==은 같은 객체인지, equals는 내용이 같은지 비교한다. 정보처리기사 Java 문제의 단골 함정이다.",
      },
    ],
    examPatterns: [
      {
        title: "상속 + 오버라이딩",
        body: "부모 타입 변수에 자식 객체가 들어가고, 메서드 호출 결과를 묻는다.",
        items: ["오버라이딩은 실행 시점에 실제 객체 기준이다.", "오버로딩은 컴파일 시점에 매개변수 모양 기준이다.", "생성자는 부모 생성자부터 실행된다."],
      },
      {
        title: "static 변수",
        body: "객체를 여러 개 만들고 카운트가 몇인지 묻는다.",
        items: ["static은 클래스에 하나만 있다.", "인스턴스 변수는 객체마다 따로 있다.", "T.count처럼 클래스명으로 접근해도 된다."],
      },
      {
        title: "String과 배열",
        body: "length, length(), charAt, substring, equals가 섞여 나온다.",
        items: ["배열 길이는 a.length, 문자열 길이는 s.length()다.", "substring(1,4)는 1부터 4 직전까지다.", "charAt(0)은 첫 글자다."],
      },
      {
        title: "예외 처리",
        body: "try에서 오류가 나면 catch로 가고, finally는 거의 항상 실행된다.",
        items: ["0으로 나누면 예외가 난다.", "catch가 실행된 뒤 finally가 실행된다.", "출력 순서를 이어 붙여 답을 쓴다."],
      },
    ],
    traceRules: [
      {
        title: "new 오른쪽부터 본다",
        body: "A x = new B(); 에서는 new B가 실제 객체다. 오버라이딩 메서드는 B 기준으로 실행된다.",
        code: "A x = new B();\nx.f(); // B가 f를 오버라이딩했다면 B.f()",
      },
      {
        title: "생성자는 부모 먼저",
        body: "자식 객체를 만들면 부모 생성자가 먼저 돌고 자식 생성자가 이어서 돈다.",
        code: "new Child();\n// Parent() -> Child()",
      },
      {
        title: "문자열 + 숫자",
        body: "문자열을 만나기 전의 +는 숫자 덧셈, 문자열을 만난 뒤의 +는 이어 붙이기다.",
        code: "1 + 2 + \"A\" + 3 + 4\n// \"3A34\"",
      },
      {
        title: "배열은 참조",
        body: "int[] b = a; 는 배열을 복사하는 게 아니라 같은 배열을 같이 보는 것이다.",
        code: "int[] a = {1, 2};\nint[] b = a;\nb[0] = 9;\n// a[0]도 9",
      },
    ],
    fundamentals: [
      {
        title: "오버라이딩",
        body: "부모 메서드를 자식이 같은 이름과 같은 매개변수로 다시 만든다. 호출은 실제 객체 기준이다.",
        code: "class A { void f(){ System.out.print(\"A\"); } }\nclass B extends A { void f(){ System.out.print(\"B\"); } }\nA x = new B();\nx.f(); // B",
      },
      {
        title: "오버로딩",
        body: "이름은 같고 매개변수의 개수나 타입이 다르다. 어떤 메서드가 불릴지는 넣은 값 모양으로 정한다.",
        code: "void f(int x) { System.out.print(\"I\"); }\nvoid f(String x) { System.out.print(\"S\"); }\nf(3); // I",
      },
      {
        title: "this와 super",
        body: "this는 현재 객체, super는 부모를 가리킨다.",
        code: "class B extends A {\n  B() { super(); }\n  void set(int x) { this.x = x; }\n}",
      },
      {
        title: "substring",
        body: "substring(a,b)는 a부터 b 직전까지다. 끝 번호는 포함하지 않는다.",
        code: "String s = \"ABCDE\";\nSystem.out.print(s.substring(1, 4)); // BCD",
      },
      {
        title: "finally",
        body: "예외가 나도 finally 블록은 마지막 정리처럼 실행된다.",
        code: "try { int x = 3 / 0; }\ncatch (Exception e) { System.out.print(\"C\"); }\nfinally { System.out.print(\"F\"); }\n// CF",
      },
    ],
    walkthroughs: [
      {
        title: "상속 출력 추적",
        code: "class A { A(){ System.out.print(\"A\"); } }\nclass B extends A { B(){ System.out.print(\"B\"); } }\nnew B();",
        trace: [
          ["new B()", "자식 생성", "자식 객체를 만든다."],
          ["A()", "먼저 실행", "자식 생성 전 부모 생성자가 먼저 실행된다."],
          ["B()", "나중 실행", "그 다음 자식 생성자가 실행된다."],
        ],
        output: "AB",
      },
      {
        title: "문자열 더하기 추적",
        code: "System.out.print(1 + 2 + \"A\" + 3 + 4);",
        trace: [
          ["1+2", "3", "문자열을 만나기 전이라 숫자 덧셈이다."],
          ["3+\"A\"", "3A", "문자열을 만난 뒤부터 이어 붙이기다."],
          ["+3+4", "3A34", "남은 숫자도 문자열로 붙는다."],
        ],
        output: "3A34",
      },
    ],
    templates: [
      ["상속 골격", "class Parent { void f(){} }\nclass Child extends Parent {\n  void f() { }\n}"],
      ["인터페이스 골격", "interface Run { void go(); }\nclass A implements Run {\n  public void go() { }\n}"],
      ["예외 처리 골격", "try {\n  // 위험한 코드\n} catch (Exception e) {\n  // 예외 처리\n} finally {\n  // 마무리\n}"],
    ],
    traps: [
      "오버라이딩은 실제 객체, 오버로딩은 매개변수 모양 기준이다.",
      "String 비교에서 ==을 보면 참조 비교인지 의심한다.",
      "배열은 length, 문자열은 length()다.",
      "static 변수는 객체를 새로 만들어도 0으로 다시 시작하지 않는다.",
    ],
    answerRules: [
      "true/false는 Java 출력 그대로 소문자로 쓴다.",
      "문자열 출력은 따옴표 없이 결과만 쓴다. 예: AB",
      "생성자 출력은 부모부터 이어 붙인다.",
      "오버라이딩 문제는 변수 타입보다 new 뒤의 실제 객체를 먼저 본다.",
    ],
    finalChecklist: [
      "new 뒤 실제 클래스 표시",
      "부모 생성자 먼저 실행",
      "static과 인스턴스 변수 분리",
      "==와 equals 구분",
      "substring 끝 번호 미포함 확인",
    ],
  });

  extendLesson("Python", {
    mastery: [
      {
        title: "슬라이싱은 칸 사이를 자른다",
        body: "a[start:stop:step]에서 stop은 포함하지 않는다. 음수 step이면 오른쪽에서 왼쪽으로 간다.",
      },
      {
        title: "리스트는 이름표",
        body: "b = a는 복사가 아니라 같은 리스트에 이름표를 하나 더 붙이는 것이다. copy는 겉 리스트만 새로 만든다.",
      },
      {
        title: "출력 모양까지 본다",
        body: "Python은 리스트를 출력하면 대괄호와 쉼표가 같이 보인다. 문자열 join은 그 모양을 직접 만든다.",
      },
    ],
    examPatterns: [
      {
        title: "인덱싱과 슬라이싱",
        body: "문자열이나 리스트에서 일부를 꺼내는 문제가 가장 자주 나온다.",
        items: ["a[-1]은 마지막 원소다.", "a[1:4]는 1,2,3번 원소다.", "a[::-1]은 뒤집기다."],
      },
      {
        title: "리스트 변경",
        body: "append, extend, pop, sort가 원본을 바꾸는지 묻는다.",
        items: ["append는 통째로 한 칸 추가한다.", "extend는 안의 원소들을 풀어서 추가한다.", "sort는 원본 변경, sorted는 새 리스트 반환이다."],
      },
      {
        title: "dict와 set",
        body: "딕셔너리 키 접근, get, items, set 중복 제거가 나온다.",
        items: ["set은 중복을 제거한다.", "dict['k']는 값 접근이다.", "get('k',0)은 없을 때 기본값을 준다."],
      },
      {
        title: "참/거짓 판정",
        body: "빈 값은 False, 값이 들어 있으면 보통 True다.",
        items: ["[]는 False다.", "[0]은 원소가 있으므로 True다.", "\"0\"은 빈 문자열이 아니므로 True다."],
      },
    ],
    traceRules: [
      {
        title: "슬라이싱은 stop 직전",
        body: "시작은 포함, 끝은 미포함이다. 먼저 번호를 붙이고 선택되는 번호만 동그라미 친다.",
        code: "a = [0, 1, 2, 3, 4]\na[1:4]  # [1, 2, 3]",
      },
      {
        title: "음수 인덱스는 뒤에서",
        body: "-1은 마지막, -2는 뒤에서 두 번째다.",
        code: "s = \"ABCDE\"\ns[-2]  # D",
      },
      {
        title: "별명과 복사 구분",
        body: "b=a는 같은 물건, b=a.copy()는 겉만 새 물건이다. 중첩 리스트는 안쪽 리스트를 같이 볼 수 있다.",
        code: "a = [[1], [2]]\nb = a.copy()\nb[0].append(9)\n# a[0]도 [1, 9]",
      },
      {
        title: "sort와 sorted",
        body: "a.sort()는 a 자체를 바꾸고 None을 반환한다. sorted(a)는 새 정렬 리스트를 만든다.",
        code: "a = [3, 1, 2]\nb = sorted(a)\n# a=[3,1,2], b=[1,2,3]",
      },
    ],
    fundamentals: [
      {
        title: "append와 extend",
        body: "append는 넣는 대상을 한 원소로 추가하고, extend는 반복 가능한 값의 원소를 하나씩 붙인다.",
        code: "a = [1]\na.append([2, 3]) # [1, [2, 3]]\nb = [1]\nb.extend([2, 3]) # [1, 2, 3]",
      },
      {
        title: "split과 join",
        body: "split은 문자열을 리스트로 쪼개고, join은 리스트 문자열을 하나로 이어 붙인다.",
        code: "s = \"A B C\"\nprint('-'.join(s.split())) # A-B-C",
      },
      {
        title: "리스트 컴프리헨션",
        body: "왼쪽 식을 반복하고, 뒤 조건이 참인 것만 결과 리스트에 담는다.",
        code: "print([x*x for x in range(4) if x % 2 == 1])\n# [1, 9]",
      },
      {
        title: "is와 ==",
        body: "==은 값이 같은지, is는 같은 객체인지 비교한다.",
        code: "a = [1]\nb = [1]\nprint(a == b, a is b) # True False",
      },
      {
        title: "기본 인자 주의",
        body: "함수 기본값으로 리스트를 쓰면 호출 사이에 같은 리스트가 재사용될 수 있다.",
        code: "def f(x, arr=[]):\n    arr.append(x)\n    return len(arr)\nprint(f(1), f(2)) # 1 2",
      },
    ],
    walkthroughs: [
      {
        title: "중첩 리스트 얕은 복사",
        code: "a = [[1], [2]]\nb = a.copy()\nb[0].append(9)\nprint(a[0])",
        trace: [
          ["a", "[[1],[2]]", "겉 리스트 안에 안쪽 리스트가 들어 있다."],
          ["b=a.copy()", "겉만 복사", "b의 겉 리스트는 새것이지만 안쪽 [1]은 같이 본다."],
          ["b[0].append(9)", "[1,9]", "같이 보던 안쪽 리스트가 바뀐다."],
        ],
        output: "[1, 9]",
      },
      {
        title: "슬라이싱 역방향",
        code: "s = 'ABCDE'\nprint(s[::-2])",
        trace: [
          ["시작", "E", "step이 -2라서 오른쪽 끝에서 시작한다."],
          ["다음", "C", "두 칸 왼쪽으로 간다."],
          ["다음", "A", "다시 두 칸 왼쪽으로 간다."],
        ],
        output: "ECA",
      },
    ],
    templates: [
      ["리스트 역순", "a[::-1]"],
      ["조건 필터링", "[x for x in a if x > 0]"],
      ["딕셔너리 순회", "for key, value in d.items():\n    print(key, value)"],
      ["중복 제거 후 정렬", "sorted(set(a))"],
    ],
    traps: [
      "a[1:4]에서 4번은 포함되지 않는다.",
      "b=a는 복사가 아니라 같은 리스트를 같이 보는 것이다.",
      "append([2,3])과 extend([2,3])의 출력 모양이 완전히 다르다.",
      "빈 리스트는 False지만 [0]은 True다.",
    ],
    answerRules: [
      "Python 리스트 출력은 대괄호와 쉼표 모양을 그대로 쓴다. 예: [1, 2, 3]",
      "True/False는 첫 글자가 대문자다.",
      "문자열 결과는 따옴표 없이 내용만 쓴다.",
      "슬라이싱 문제는 start, stop, step 중 stop 미포함을 가장 먼저 확인한다.",
    ],
    finalChecklist: [
      "음수 인덱스가 마지막에서 몇 번째인지 확인",
      "슬라이싱 stop 미포함 표시",
      "append와 extend 구분",
      "alias, copy, shallow copy 구분",
      "True/False 대소문자 확인",
    ],
  });

  extendLesson("SQL", {
    mastery: [
      {
        title: "SELECT는 실제 순서로 읽기",
        body: "SQL은 쓰는 순서와 처리 순서가 다르다. FROM에서 표를 고르고 WHERE로 행을 거른 뒤 GROUP BY와 HAVING을 본다.",
      },
      {
        title: "NULL은 값이 아니다",
        body: "NULL은 모르는 값이다. = NULL이 아니라 IS NULL, IS NOT NULL로 찾는다.",
      },
      {
        title: "제약조건은 테이블 규칙",
        body: "PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL은 데이터가 잘못 들어오지 못하게 막는 규칙이다.",
      },
    ],
    examPatterns: [
      {
        title: "SELECT 실행 순서",
        body: "조건, 그룹, 정렬 중 어떤 절을 써야 하는지 묻는다.",
        items: ["행 조건은 WHERE다.", "그룹 조건은 HAVING이다.", "정렬은 ORDER BY다."],
      },
      {
        title: "JOIN",
        body: "두 테이블을 붙일 때 남기는 행 범위를 묻는다.",
        items: ["INNER JOIN은 양쪽에 매칭되는 행만 남긴다.", "LEFT JOIN은 왼쪽 행을 전부 남긴다.", "오른쪽에 없으면 NULL로 채운다."],
      },
      {
        title: "집계 함수",
        body: "COUNT, SUM, AVG, MAX, MIN과 GROUP BY가 같이 나온다.",
        items: ["COUNT(*)는 모든 행을 센다.", "COUNT(컬럼)은 NULL을 빼고 센다.", "집계 조건은 HAVING이다."],
      },
      {
        title: "명령어 분류",
        body: "DDL, DML, DCL, TCL 분류는 거의 암기 문제처럼 나온다.",
        items: ["CREATE/ALTER/DROP/TRUNCATE는 DDL이다.", "SELECT/INSERT/UPDATE/DELETE는 DML이다.", "GRANT/REVOKE는 DCL, COMMIT/ROLLBACK은 TCL이다."],
      },
    ],
    traceRules: [
      {
        title: "논리 순서로 다시 읽기",
        body: "SELECT문을 보면 FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY 순서로 번호를 붙인다.",
        code: "FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY",
      },
      {
        title: "WHERE와 HAVING 구분",
        body: "집계 함수가 조건에 들어가면 HAVING이다. 아직 그룹을 만들기 전 조건이면 WHERE다.",
        code: "WHERE age >= 20\nHAVING COUNT(*) >= 2",
      },
      {
        title: "JOIN은 기준 테이블 표시",
        body: "LEFT JOIN이면 왼쪽 테이블 행을 모두 남긴다고 먼저 표시한다.",
        code: "A LEFT JOIN B ON A.id = B.id\n// A는 전부 남는다.",
      },
      {
        title: "NULL은 비교 금지",
        body: "NULL은 =, !=로 비교하지 않는다. IS NULL 또는 IS NOT NULL을 쓴다.",
        code: "WHERE deleted_at IS NULL",
      },
    ],
    fundamentals: [
      {
        title: "SELECT 기본형",
        body: "필요한 열을 고르고, 테이블을 정하고, 조건을 붙인다.",
        code: "SELECT name, score\nFROM student\nWHERE score >= 60\nORDER BY score DESC;",
      },
      {
        title: "GROUP BY와 HAVING",
        body: "그룹별 결과를 만든 뒤, 그룹 결과에 조건을 걸 때 HAVING을 쓴다.",
        code: "SELECT dept, COUNT(*)\nFROM emp\nGROUP BY dept\nHAVING COUNT(*) >= 2;",
      },
      {
        title: "JOIN 기본형",
        body: "공통 키를 기준으로 두 테이블을 연결한다.",
        code: "SELECT s.name, d.name\nFROM student s\nINNER JOIN dept d ON s.dept_id = d.id;",
      },
      {
        title: "제약조건",
        body: "테이블에 들어갈 수 있는 값을 제한한다.",
        code: "CREATE TABLE student (\n  id INT PRIMARY KEY,\n  email VARCHAR(50) UNIQUE,\n  dept_id INT REFERENCES dept(id),\n  age INT CHECK (age >= 0)\n);",
      },
      {
        title: "CASE",
        body: "조건에 따라 출력 값을 바꾼다.",
        code: "SELECT name,\n  CASE WHEN score >= 60 THEN 'PASS'\n       ELSE 'FAIL'\n  END AS result\nFROM exam;",
      },
    ],
    walkthroughs: [
      {
        title: "그룹 조건 판별",
        code: "SELECT dept, COUNT(*)\nFROM emp\nWHERE salary >= 3000\nGROUP BY dept\nHAVING COUNT(*) >= 2;",
        trace: [
          ["FROM", "emp", "직원 테이블에서 시작한다."],
          ["WHERE", "salary >= 3000", "개별 행을 먼저 거른다."],
          ["GROUP BY", "dept", "부서별로 묶는다."],
          ["HAVING", "COUNT(*) >= 2", "묶인 그룹의 개수 조건을 본다."],
        ],
        output: "부서별 3000 이상 직원이 2명 이상인 부서",
      },
      {
        title: "LEFT JOIN 판별",
        code: "SELECT A.id, B.name\nFROM A LEFT JOIN B ON A.id = B.id;",
        trace: [
          ["기준", "A", "LEFT JOIN이므로 A 테이블 행은 모두 남는다."],
          ["매칭", "B", "B에 같은 id가 있으면 붙인다."],
          ["없음", "NULL", "B에 없으면 B쪽 열은 NULL이 된다."],
        ],
        output: "A 전체 + 매칭되는 B",
      },
    ],
    templates: [
      ["평균보다 큰 행", "SELECT *\nFROM emp\nWHERE salary > (SELECT AVG(salary) FROM emp);"],
      ["조건별 라벨", "SELECT name,\n  CASE WHEN score >= 60 THEN 'PASS'\n       ELSE 'FAIL'\n  END AS result\nFROM exam;"],
      ["중복 제거", "SELECT DISTINCT dept\nFROM emp;"],
      ["권한 부여와 회수", "GRANT SELECT ON emp TO user1;\nREVOKE SELECT ON emp FROM user1;"],
    ],
    traps: [
      "WHERE COUNT(*) >= 2는 틀린 모양이다. 집계 조건은 HAVING이다.",
      "NULL은 = NULL이 아니라 IS NULL이다.",
      "UNION은 중복 제거, UNION ALL은 중복 유지다.",
      "TRUNCATE는 행을 지우지만 DDL로 분류된다.",
    ],
    answerRules: [
      "키워드 답은 대소문자보다 철자가 중요하다. 그래도 시험 답안은 보통 대문자로 쓰는 습관이 안전하다.",
      "빈칸에 절 이름을 묻는 문제는 WHERE, HAVING, GROUP BY처럼 절 단위로 쓴다.",
      "명령어 분류 문제는 DDL, DML, DCL, TCL 네 묶음부터 떠올린다.",
      "NULL 조건이 보이면 IS NULL 또는 IS NOT NULL을 먼저 의심한다.",
    ],
    finalChecklist: [
      "WHERE는 행 조건, HAVING은 그룹 조건",
      "COUNT(*)와 COUNT(컬럼) 차이",
      "LEFT JOIN 기준 테이블 확인",
      "NULL 비교 방식 확인",
      "DDL/DML/DCL/TCL 분류 확인",
    ],
  });

  window.CODE_SQL_ACADEMY = academy;

  const rows = [
    ["gm-c-001", "C", "code", "must", `C 출력값은?\nint a[4] = {3, 5, 7, 9};\nint *p = a + 1;\nprintf("%d", *p + *(p + 2));`, ["14"], "14", "p는 a[1]인 5를 보고, p+2는 a[3]인 9를 본다. 5+9=14.", ["C", "포인터", "배열"]],
    ["gm-c-002", "C", "code", "must", `C 출력값은?\nchar s[] = "DATA";\nchar *p = s;\nprintf("%c%c", *p, *(p + 2));`, ["DT", "dt"], "DT", "*p는 D, *(p+2)는 T다.", ["C", "문자열", "포인터"]],
    ["gm-c-003", "C", "code", "must", `C 출력값은?\nint a[2][3] = {{1, 2, 3}, {4, 5, 6}};\nprintf("%d", a[0][2] + a[1][1]);`, ["8"], "8", "a[0][2]=3, a[1][1]=5이므로 8이다.", ["C", "2차원배열"]],
    ["gm-c-004", "C", "code", "high", `C 출력값은?\nstruct S { int a; int b; };\nstruct S x = {2, 5};\nstruct S *p = &x;\np->a += p->b;\nprintf("%d", x.a);`, ["7"], "7", "p->a는 x.a, p->b는 x.b다. x.a가 2+5로 바뀐다.", ["C", "구조체", "포인터"]],
    ["gm-c-005", "C", "code", "must", `C 출력값은?\nvoid f(int *p) { *p = *p + 3; }\nint x = 4;\nf(&x);\nprintf("%d", x);`, ["7"], "7", "주소를 넘겼으므로 함수 안의 *p 변경이 x를 직접 바꾼다.", ["C", "함수", "주소"]],
    ["gm-c-006", "C", "code", "high", `C 출력값은?\nint f(int n) {\n  if (n <= 1) return 1;\n  return n + f(n - 1);\n}\nprintf("%d", f(4));`, ["10"], "10", "f(4)=4+3+2+1=10이다.", ["C", "재귀"]],
    ["gm-c-007", "C", "code", "high", `C 출력값은?\nint sum = 0;\nfor (int i = 1; i <= 5; i++) {\n  if (i % 2 == 0) continue;\n  sum += i;\n}\nprintf("%d", sum);`, ["9"], "9", "짝수는 continue로 건너뛰므로 1+3+5=9다.", ["C", "반복문", "continue"]],
    ["gm-c-008", "C", "code", "must", `C 출력값은?\nprintf("%d", 17 / 5 + 17 % 5);`, ["5"], "5", "17/5는 정수 나눗셈이라 3, 17%5는 2다.", ["C", "정수연산"]],
    ["gm-c-009", "C", "code", "high", `C 출력값은?\nprintf("%d", (10 & 6) + (10 | 6));`, ["16"], "16", "10&6은 2, 10|6은 14이므로 합은 16이다.", ["C", "비트연산"]],
    ["gm-c-010", "C", "code", "mid", `C 출력값은?\nint x = 7;\nprintf("%d", x > 5 ? x - 2 : x + 2);`, ["5"], "5", "조건 x>5가 참이므로 x-2인 5를 고른다.", ["C", "삼항연산자"]],
    ["gm-c-011", "C", "code", "must", `C 출력값은?\nchar c = 'A';\nprintf("%c", c + 3);`, ["D", "d"], "D", "'A'에서 문자 코드가 3칸 이동하면 D다.", ["C", "문자코드"]],
    ["gm-c-012", "C", "code", "must", `C 출력값은?\nchar s[] = "ABCD";\nint i = 0;\nwhile (s[i] != '\\0') i++;\nprintf("%d", i);`, ["4"], "4", "문자열 길이는 보이지 않는 \\0 직전까지 세므로 4다.", ["C", "문자열"]],
    ["gm-c-013", "C", "code", "high", `C 출력값은?\nint cnt = 0;\nfor (int i = 0; i < 3; i++) {\n  for (int j = 0; j <= i; j++) cnt++;\n}\nprintf("%d", cnt);`, ["6"], "6", "안쪽 반복 횟수는 i=0일 때 1번, i=1일 때 2번, i=2일 때 3번이다.", ["C", "중첩반복"]],
    ["gm-c-014", "C", "code", "must", `C 출력값은?\nint a[] = {1, 3, 5};\nprintf("%d", *(a + 1) + a[2]);`, ["8"], "8", "*(a+1)은 a[1]인 3, a[2]는 5다.", ["C", "배열", "포인터"]],
    ["gm-c-015", "C", "code", "high", `C 출력값은?\nint x = 2;\nint y = x++;\ny += ++x;\nprintf("%d %d", x, y);`, ["46", "4 6", "4,6"], "4 6", "y=x++ 뒤 y=2, x=3이다. ++x로 x=4가 된 뒤 y에 더해져 y=6이다.", ["C", "증감연산"]],
    ["gm-c-016", "C", "code", "high", `C 출력값은?\nint x = 2, y = 0;\nswitch (x) {\n  case 1: y += 1;\n  case 2: y += 2;\n  case 3: y += 3; break;\n  default: y += 4;\n}\nprintf("%d", y);`, ["5"], "5", "case 2로 들어가고 break가 없어서 case 3까지 실행된다. 2+3=5.", ["C", "switch"]],
    ["gm-c-017", "C", "code", "mid", `C 출력값은?\nint x = 0;\ndo {\n  x++;\n} while (x < 3);\nprintf("%d", x);`, ["3"], "3", "do-while은 본문을 먼저 실행하고 x가 3이 될 때 멈춘다.", ["C", "do while"]],
    ["gm-c-018", "C", "code", "mid", `C 출력값은?\nprintf("%d", 2 + 3 * 4 % 5);`, ["4"], "4", "곱셈과 나머지가 먼저다. 3*4=12, 12%5=2, 2+2=4.", ["C", "연산자우선순위"]],
    ["gm-c-019", "C", "code", "high", `C 출력값은?\nvoid f(int *a, int *b) {\n  int t = *a;\n  *a = *b;\n  *b = t;\n}\nint x = 1, y = 4;\nf(&x, &y);\nprintf("%d%d", x, y);`, ["41", "4 1", "4,1"], "41", "주소를 통해 x와 y 값이 서로 바뀐다.", ["C", "포인터", "swap"]],
    ["gm-c-020", "C", "code", "mid", `C 출력값은?\nchar *p = "HELLO";\np += 2;\nprintf("%c", *p);`, ["L", "l"], "L", "H(0), E(1), L(2)이므로 p+=2 뒤 *p는 L이다.", ["C", "문자열", "포인터"]],

    ["gm-java-001", "Java", "code", "must", `Java 출력값은?\nclass Parent { Parent(){ System.out.print("P"); } }\nclass Child extends Parent { Child(){ System.out.print("C"); } }\nnew Child();`, ["PC", "pc"], "PC", "자식 객체 생성 시 부모 생성자의 P가 먼저, 자식 생성자의 C가 나중에 출력된다.", ["Java", "생성자", "상속"]],
    ["gm-java-002", "Java", "code", "must", `Java 출력값은?\nclass A { String f(){ return "A"; } }\nclass B extends A { String f(){ return "B"; } }\nA x = new B();\nSystem.out.print(x.f());`, ["B", "b"], "B", "오버라이딩 메서드는 실제 객체 B 기준으로 실행된다.", ["Java", "오버라이딩"]],
    ["gm-java-003", "Java", "code", "high", `Java 출력값은?\nclass T {\n  void f(int x){ System.out.print("I"); }\n  void f(String x){ System.out.print("S"); }\n}\nT t = new T();\nt.f(3);`, ["I", "i"], "I", "3은 int이므로 f(int)가 선택된다. 이것은 오버로딩이다.", ["Java", "오버로딩"]],
    ["gm-java-004", "Java", "code", "must", `Java 출력값은?\nclass T {\n  static int c = 0;\n  int n = 0;\n  T(){ c++; n++; }\n}\nT a = new T();\nT b = new T();\nSystem.out.print(T.c + " " + a.n + " " + b.n);`, ["211", "2 1 1", "2,1,1"], "2 1 1", "static c는 공유되어 2, n은 객체마다 따로라 둘 다 1이다.", ["Java", "static"]],
    ["gm-java-005", "Java", "code", "must", `Java 출력값은?\nSystem.out.print(1 + 2 + "A" + 3 + 4);`, ["3A34", "3a34"], "3A34", "문자열 A를 만나기 전에는 1+2=3, 이후는 문자열 연결이다.", ["Java", "문자열"]],
    ["gm-java-006", "Java", "code", "must", `Java 출력값은?\nString a = new String("hi");\nString b = "hi";\nSystem.out.print(a.equals(b) + " " + (a == b));`, ["truefalse", "true false", "true,false"], "true false", "equals는 내용 비교라 true, ==은 참조 비교라 false다.", ["Java", "String", "equals"]],
    ["gm-java-007", "Java", "code", "must", `Java 출력값은?\nint[] a = {1, 2};\nint[] b = a;\nb[0] = 9;\nSystem.out.print(a[0]);`, ["9"], "9", "b와 a는 같은 배열을 보므로 b[0] 변경이 a[0]에도 보인다.", ["Java", "배열", "참조"]],
    ["gm-java-008", "Java", "code", "mid", `Java 출력값은?\nclass T {\n  int x;\n  T(int x){ this.x = x; }\n  int f(){ return x; }\n}\nSystem.out.print(new T(5).f());`, ["5"], "5", "this.x는 객체의 필드 x를 뜻한다.", ["Java", "this"]],
    ["gm-java-009", "Java", "code", "high", `Java 출력값은?\nclass A { A(){ System.out.print("A"); } }\nclass B extends A { B(){ super(); System.out.print("B"); } }\nnew B();`, ["AB", "ab"], "AB", "super()로 부모 생성자가 먼저 실행되고 B 생성자가 이어진다.", ["Java", "super"]],
    ["gm-java-010", "Java", "code", "high", `Java 출력값은?\ntry {\n  int x = 3 / 0;\n  System.out.print("T");\n} catch (Exception e) {\n  System.out.print("C");\n} finally {\n  System.out.print("F");\n}`, ["CF", "cf"], "CF", "0으로 나누며 예외가 나서 catch의 C, 그 뒤 finally의 F가 출력된다.", ["Java", "예외"]],
    ["gm-java-011", "Java", "code", "mid", `Java 출력값은?\ndouble d = 5 / 2;\nSystem.out.print(d);`, ["2.0", "20"], "2.0", "5와 2가 int라 먼저 정수 나눗셈 2가 되고 double에 2.0으로 저장된다.", ["Java", "형변환"]],
    ["gm-java-012", "Java", "code", "must", `Java 출력값은?\nString s = "KOREA";\nSystem.out.print(s.charAt(1) + "" + s.length());`, ["O5", "o5"], "O5", "charAt(1)은 O, 문자열 길이는 5다.", ["Java", "String"]],
    ["gm-java-013", "Java", "code", "must", `Java 출력값은?\nString s = "ABCDE";\nSystem.out.print(s.substring(1, 4));`, ["BCD", "bcd"], "BCD", "substring(1,4)는 1번부터 4번 직전까지라 BCD다.", ["Java", "substring"]],
    ["gm-java-014", "Java", "code", "mid", `Java 출력값은?\nint sum = 0;\nfor (int i = 1; i <= 5; i += 2) sum += i;\nSystem.out.print(sum);`, ["9"], "9", "i는 1,3,5가 되고 합은 9다.", ["Java", "반복문"]],
    ["gm-java-015", "Java", "code", "mid", "Java에서 클래스가 구현해야 할 메서드 규격을 정하고, class가 implements로 구현하는 타입은?", ["interface", "인터페이스"], "인터페이스", "interface는 기능 약속을 정하고 클래스가 implements로 구현한다.", ["Java", "interface"]],
    ["gm-java-016", "Java", "code", "mid", "Java에서 아직 완성되지 않은 메서드를 포함할 수 있고 직접 객체 생성이 불가능한 클래스 키워드는?", ["abstract", "추상클래스", "추상 클래스"], "abstract", "abstract class는 미완성 메서드를 포함할 수 있고 new로 직접 만들 수 없다.", ["Java", "abstract"]],
    ["gm-java-017", "Java", "code", "mid", "Java에서 부모 클래스를 상속받을 때 사용하는 키워드는?", ["extends"], "extends", "class Child extends Parent 형태로 쓴다.", ["Java", "상속"]],
    ["gm-java-018", "Java", "code", "high", `Java 출력값은?\nstatic int f(int n) {\n  if (n == 0) return 0;\n  return n + f(n - 1);\n}\nSystem.out.print(f(3));`, ["6"], "6", "f(3)=3+2+1+0=6이다.", ["Java", "재귀"]],
    ["gm-java-019", "Java", "code", "high", `Java 출력값은?\nint x = 5;\nSystem.out.print(x++ + "," + x);`, ["5,6", "56", "5 6"], "5,6", "x++는 먼저 5를 출력식에 쓰고 이후 x가 6이 된다.", ["Java", "증감연산"]],
    ["gm-java-020", "Java", "code", "mid", "Java에서 더 이상 값을 바꾸지 못하게 변수나 메서드, 클래스에 붙이는 키워드는?", ["final"], "final", "final 변수는 재할당할 수 없다.", ["Java", "final"]],

    ["gm-py-001", "Python", "code", "must", `Python 출력값은?\ns = 'TRAIN'\nprint(s[-2])`, ["I", "i"], "I", "-1은 N, -2는 I다.", ["Python", "인덱싱"]],
    ["gm-py-002", "Python", "code", "must", `Python 출력값은?\na = [0, 1, 2, 3, 4, 5]\nprint(a[1:5:2])`, ["[1,3]", "[1, 3]"], "[1, 3]", "1번부터 5번 직전까지 2칸씩 가므로 1, 3이다.", ["Python", "슬라이싱"]],
    ["gm-py-003", "Python", "code", "must", `Python 출력값은?\ns = 'ABC'\nprint(s[::-1])`, ["CBA", "cba"], "CBA", "step -1은 역순이다.", ["Python", "슬라이싱"]],
    ["gm-py-004", "Python", "code", "must", `Python 출력값은?\na = [1, 2]\nb = a.copy()\nb.append(3)\nprint(len(a), len(b))`, ["23", "2 3", "2,3"], "2 3", "copy로 겉 리스트를 새로 만들었으므로 a 길이는 2, b 길이는 3이다.", ["Python", "copy"]],
    ["gm-py-005", "Python", "code", "high", `Python 출력값은?\na = [[1], [2]]\nb = a.copy()\nb[0].append(9)\nprint(a[0])`, ["[1,9]", "[1, 9]"], "[1, 9]", "얕은 복사라 안쪽 리스트 [1]은 a와 b가 같이 본다.", ["Python", "얕은복사"]],
    ["gm-py-006", "Python", "code", "mid", "Python 리스트에서 다른 리스트의 원소들을 하나씩 풀어 뒤에 붙이는 메서드는?", ["extend"], "extend", "append는 통째로 한 칸, extend는 원소를 풀어서 추가한다.", ["Python", "리스트"]],
    ["gm-py-007", "Python", "code", "must", `Python 출력값은?\na = [1, 2, 3]\nx = a.pop()\nprint(x, len(a))`, ["32", "3 2", "3,2"], "3 2", "pop()은 마지막 원소 3을 꺼내고 리스트 길이는 2가 된다.", ["Python", "pop"]],
    ["gm-py-008", "Python", "code", "mid", `Python 출력값은?\nd = {'a': 1}\nd['b'] = d.get('a', 0) + 2\nprint(d['b'])`, ["3"], "3", "d.get('a',0)은 1이고 2를 더해 3이다.", ["Python", "dict"]],
    ["gm-py-009", "Python", "code", "mid", "Python 딕셔너리에서 key와 value 쌍을 순회할 때 자주 쓰는 메서드는?", ["items", "items()"], "items()", "for k, v in d.items(): 형태로 쓴다.", ["Python", "dict"]],
    ["gm-py-010", "Python", "code", "must", `Python 출력값은?\nprint(len(set([1, 1, 2, 2, 3])))`, ["3"], "3", "set은 중복을 제거해 {1,2,3}만 남긴다.", ["Python", "set"]],
    ["gm-py-011", "Python", "code", "high", `Python 출력값은?\na = [3, 1, 2]\nb = sorted(a)\nprint(a[0], b[0])`, ["31", "3 1", "3,1"], "3 1", "sorted(a)는 새 리스트를 만들고 원본 a는 그대로다.", ["Python", "sorted"]],
    ["gm-py-012", "Python", "code", "mid", `Python 출력값은?\nprint(sorted(['aa', 'b', 'ccc'], key=len)[0])`, ["b"], "b", "길이 기준 정렬에서 가장 짧은 문자열은 b다.", ["Python", "정렬"]],
    ["gm-py-013", "Python", "code", "high", `Python 출력값은?\nprint([x*x for x in range(4) if x % 2 == 1])`, ["[1,9]", "[1, 9]"], "[1, 9]", "range(4)는 0,1,2,3이고 홀수는 1,3이다. 제곱하면 1,9.", ["Python", "컴프리헨션"]],
    ["gm-py-014", "Python", "code", "must", `Python 출력값은?\nprint(bool(0), bool('0'))`, ["False True", "falsetrue", "false true"], "False True", "0은 False지만 문자열 '0'은 비어 있지 않아 True다.", ["Python", "bool"]],
    ["gm-py-015", "Python", "code", "must", `Python 출력값은?\nprint('-'.join('A B C'.split()))`, ["A-B-C", "a-b-c"], "A-B-C", "split으로 ['A','B','C']가 되고 join으로 하이픈을 넣어 붙인다.", ["Python", "split", "join"]],
    ["gm-py-016", "Python", "code", "mid", `Python 출력값은?\nprint(sum(range(1, 6, 2)))`, ["9"], "9", "range(1,6,2)는 1,3,5이고 합은 9다.", ["Python", "range"]],
    ["gm-py-017", "Python", "code", "mid", "Python에서 튜플처럼 한 번 만든 뒤 원소를 직접 바꿀 수 없는 성질을 무엇이라고 하는가?", ["immutable", "불변", "불변성"], "불변성", "tuple과 문자열은 대표적인 immutable 객체다.", ["Python", "tuple"]],
    ["gm-py-018", "Python", "code", "high", `Python 출력값은?\na = [1]\nb = [1]\nprint(a == b, a is b)`, ["True False", "truefalse", "true false"], "True False", "==은 값 비교라 True, is는 같은 객체인지 비교하므로 False다.", ["Python", "is", "=="]],
    ["gm-py-019", "Python", "code", "high", `Python 출력값은?\ndef f(x, arr=[]):\n    arr.append(x)\n    return len(arr)\nprint(f(1), f(2))`, ["12", "1 2", "1,2"], "1 2", "기본 리스트 arr가 호출 사이에 재사용되어 두 번째 길이가 2가 된다.", ["Python", "기본인자"]],
    ["gm-py-020", "Python", "code", "mid", `Python 출력값은?\na, b = 1, 2\na, b = b, a\nprint(a, b)`, ["21", "2 1", "2,1"], "2 1", "파이썬의 다중 대입으로 a와 b가 서로 바뀐다.", ["Python", "대입"]],

    ["gm-sql-001", "SQL", "sql", "must", "SELECT문의 논리 처리 순서에서 가장 먼저 읽는 절은?", ["from"], "FROM", "SQL은 작성은 SELECT부터 하지만 논리 처리는 FROM에서 테이블을 정하는 것부터 시작한다.", ["SQL", "실행순서"]],
    ["gm-sql-002", "SQL", "sql", "must", "COUNT(*) >= 2처럼 그룹 집계 결과에 조건을 걸 때 쓰는 절은?", ["having"], "HAVING", "집계 이후 그룹 조건은 HAVING이다.", ["SQL", "HAVING"]],
    ["gm-sql-003", "SQL", "sql", "must", "NULL까지 포함해 모든 행 수를 세는 집계 함수 표현은?", ["count*", "count(*)"], "COUNT(*)", "COUNT(컬럼)은 NULL을 제외할 수 있지만 COUNT(*)는 행 자체를 센다.", ["SQL", "COUNT"]],
    ["gm-sql-004", "SQL", "sql", "must", "왼쪽 테이블의 행은 전부 남기고 오른쪽에 없으면 NULL로 채우는 조인은?", ["leftjoin", "leftouterjoin", "left join", "left outer join"], "LEFT OUTER JOIN", "LEFT JOIN은 왼쪽 기준 전체를 보존한다.", ["SQL", "JOIN"]],
    ["gm-sql-005", "SQL", "sql", "must", "양쪽 테이블에서 조인 조건이 맞는 행만 남기는 조인은?", ["innerjoin", "inner join"], "INNER JOIN", "INNER JOIN은 매칭되는 행만 결과에 남긴다.", ["SQL", "JOIN"]],
    ["gm-sql-006", "SQL", "sql", "must", "SQL에서 NULL 값인 행을 찾는 조건은 = NULL이 아니라 무엇인가?", ["isnull", "is null"], "IS NULL", "NULL은 값이 아니라 알 수 없음이므로 IS NULL로 검사한다.", ["SQL", "NULL"]],
    ["gm-sql-007", "SQL", "sql", "must", "컬럼에 반드시 값이 들어가야 함을 강제하는 제약조건은?", ["notnull", "not null"], "NOT NULL", "NOT NULL은 해당 컬럼에 NULL 입력을 막는다.", ["SQL", "제약조건"]],
    ["gm-sql-008", "SQL", "sql", "must", "테이블에서 각 행을 유일하게 식별하고 NULL과 중복을 허용하지 않는 키는?", ["primarykey", "primary key", "pk", "기본키"], "PRIMARY KEY", "기본키는 유일성과 NOT NULL 성격을 가진다.", ["SQL", "키"]],
    ["gm-sql-009", "SQL", "sql", "must", "다른 테이블의 기본키를 참조해 관계를 만드는 키는?", ["foreignkey", "foreign key", "fk", "외래키"], "FOREIGN KEY", "외래키는 REFERENCES와 함께 다른 테이블을 참조한다.", ["SQL", "키"]],
    ["gm-sql-010", "SQL", "sql", "high", "컬럼 값의 중복을 허용하지 않는 제약조건은?", ["unique"], "UNIQUE", "UNIQUE는 중복값 입력을 막는다.", ["SQL", "제약조건"]],
    ["gm-sql-011", "SQL", "sql", "high", "age >= 0처럼 값이 특정 조건을 만족하도록 제한하는 제약조건은?", ["check"], "CHECK", "CHECK는 값의 범위를 조건으로 제한한다.", ["SQL", "제약조건"]],
    ["gm-sql-012", "SQL", "sql", "must", "부서별 평균 급여처럼 특정 컬럼 값별로 묶을 때 쓰는 절은?", ["groupby", "group by"], "GROUP BY", "그룹별 집계에는 GROUP BY가 필요하다.", ["SQL", "GROUP BY"]],
    ["gm-sql-013", "SQL", "sql", "mid", "조회 결과를 내림차순으로 정렬할 때 ORDER BY 뒤에 붙이는 키워드는?", ["desc"], "DESC", "DESC는 descending, 내림차순이다. ASC는 오름차순이다.", ["SQL", "ORDER BY"]],
    ["gm-sql-014", "SQL", "sql", "mid", "LIKE에서 앞뒤 어떤 문자열이 와도 상관없음을 뜻하는 와일드카드 기호는?", ["%", "percent"], "%", "LIKE '%A%'는 앞뒤에 무엇이 오든 A가 포함된 값을 찾는다.", ["SQL", "LIKE"]],
    ["gm-sql-015", "SQL", "sql", "mid", "WHERE dept IN ('A','B')처럼 여러 후보 중 하나인지 검사하는 연산자는?", ["in"], "IN", "IN은 목록 안에 값이 있는지 검사한다.", ["SQL", "IN"]],
    ["gm-sql-016", "SQL", "sql", "mid", "WHERE score BETWEEN 60 AND 100에서 양끝 60과 100은 결과에 포함되는가?", ["포함", "yes", "include", "included"], "포함", "BETWEEN A AND B는 일반적으로 A와 B 양끝을 포함한다.", ["SQL", "BETWEEN"]],
    ["gm-sql-017", "SQL", "sql", "high", "조건에 따라 PASS/FAIL 같은 값을 만들 때 쓰는 SQL 조건식 키워드는?", ["case", "casewhen", "case when"], "CASE", "CASE WHEN 조건 THEN 값 ELSE 값 END 형태로 쓴다.", ["SQL", "CASE"]],
    ["gm-sql-018", "SQL", "sql", "high", "평균보다 큰 급여를 찾는 조건에서 평균을 계산하는 집계 함수는?", ["avg"], "AVG", "WHERE salary > (SELECT AVG(salary) FROM emp)처럼 쓴다.", ["SQL", "서브쿼리"]],
    ["gm-sql-019", "SQL", "sql", "must", "트랜잭션에서 아직 확정하지 않은 변경을 취소하는 명령은?", ["rollback"], "ROLLBACK", "ROLLBACK은 트랜잭션 변경을 취소한다. COMMIT은 확정이다.", ["SQL", "TCL"]],
    ["gm-sql-020", "SQL", "sql", "must", "사용자 kim에게 SELECT 권한을 부여하는 문장의 첫 예약어는?", ["grant"], "GRANT", "GRANT는 사용자에게 권한을 부여하고 REVOKE는 권한을 회수한다.", ["SQL", "DCL"]],
  ];

  window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), ...rows];
})();
