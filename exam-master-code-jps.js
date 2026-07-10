(function () {
  const skills = window.EXAM_SKILLS || {};
  const rows = [];

  function add(id, domain, title, questions) {
    const type = domain === "SQL" ? "sql" : "code";
    const practiceIds = [];
    questions.forEach((question, index) => {
      const qid = "exam-" + id + "-" + (index + 1);
      practiceIds.push(qid);
      rows.push([
        qid,
        domain,
        type,
        question.level || "high",
        question.question,
        question.accept,
        question.answer,
        question.explain,
        [domain, title, "기출급", "skill:" + id, ...(question.tags || [])],
        { answerMode: question.answerMode },
      ]);
    });
    skills[id] = { id, title, domain, kind: "code", lessonId: "academy-" + domain, practiceIds };
  }

  add("java-reference-object", "Java", "Java 객체 참조 전달", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass Box { int n; }\nstatic void f(Box b) { b.n *= 3; }\nBox x = new Box();\nx.n = 4;\nf(x);\nSystem.out.print(x.n);",
      accept: ["12"],
      answer: "12",
      explain: "참조값이 복사되어도 같은 Box 객체를 보므로 n이 12로 바뀐다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass P { int a; int b; }\nstatic void f(P x) { x.a += x.b; }\nP p = new P();\np.a=5; p.b=7;\nf(p);\nSystem.out.print(p.a + p.b);",
      accept: ["19"],
      answer: "19",
      explain: "f에서 a가 12가 되고 b는 7이라 합은 19다.",
    },
  ]);

  add("java-interface", "Java", "Java 인터페이스·implements", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\ninterface A { default int f(){ return 2; } }\nclass B implements A { public int f(){ return 5; } }\nA x = new B();\nSystem.out.print(x.f());",
      accept: ["5"],
      answer: "5",
      explain: "B가 default 메서드를 오버라이딩했으므로 실제 객체 B의 f가 실행된다.",
    },
    {
      question: "빈칸에 들어갈 Java 키워드를 쓰시오.\n\ninterface Machine { void run(); }\nclass Washer ____ Machine {\n  public void run() { }\n}",
      accept: ["implements"],
      answer: "implements",
      answerMode: "literal",
      explain: "클래스가 인터페이스를 구현할 때 implements를 쓴다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass Job implements Runnable {\n  public void run(){ System.out.print(\"R\"); }\n}\nRunnable r = new Job();\nr.run();",
      accept: ["R", "r"],
      answer: "R",
      explain: "r이 가리키는 Job 객체의 run 메서드가 실행된다.",
    },
  ]);

  add("java-switch", "Java", "Java switch fall-through", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nint x=3, y=1;\nswitch(x) {\n  case 2: y += 2;\n  case 3: y *= 4;\n  case 4: y -= 3;\n  default: y++;\n}\nSystem.out.print(y);",
      accept: ["2"],
      answer: "2",
      explain: "case3부터 break 없이 1×4=4, 4-3=1, default에서 2가 된다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nint n=2;\nswitch(n) {\n  case 1: System.out.print(\"A\");\n  case 2: System.out.print(\"B\");\n  case 3: System.out.print(\"C\"); break;\n  default: System.out.print(\"D\");\n}",
      accept: ["BC", "bc"],
      answer: "BC",
      explain: "case2에서 시작해 case3의 break까지 흘러 B와 C를 출력한다.",
    },
  ]);

  add("java-object-loop", "Java", "Java 객체 필드·반복문", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass C { int n; C(int n){this.n=n;} }\nC x = new C(3);\nfor(int i=1;i<=3;i++) x.n += i;\nSystem.out.print(x.n);",
      accept: ["9"],
      answer: "9",
      explain: "초기 3에 1+2+3을 더해 9다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass C { int n=1; int f(int a){ for(int i=0;i<a;i++) n=n*2; return n; } }\nC x = new C();\nSystem.out.print(x.f(3)+x.n);",
      accept: ["16"],
      answer: "16",
      explain: "n은 1→2→4→8이다. f가 8을 반환하고 x.n도 8이라 합은 16이다.",
    },
  ]);

  add("java-array-return", "Java", "Java 배열 반환·순회", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic int[] make(){\n  int[] a=new int[4];\n  for(int i=0;i<a.length;i++) a[i]=i*2;\n  return a;\n}\nint[] x=make();\nSystem.out.print(x[1]+x[3]);",
      accept: ["8"],
      answer: "8",
      explain: "배열은 [0,2,4,6]이라 2+6=8이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic int[] f(int[] a){ a[1]+=3; return a; }\nint[] x={2,4,6};\nint[] y=f(x);\nSystem.out.print(x[1]+y[2]);",
      accept: ["13"],
      answer: "13",
      explain: "x와 y는 같은 배열을 본다. x[1]=7, y[2]=6이라 13이다.",
    },
  ]);

  add("java-inheritance", "Java", "Java 상속·오버라이딩", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { int f(){return 2;} }\nclass B extends A { int f(){return 7;} }\nA x = new B();\nSystem.out.print(x.f());",
      accept: ["7"],
      answer: "7",
      explain: "오버라이딩 메서드는 실제 객체 B 기준으로 호출된다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { void p(){System.out.print(\"A\");} }\nclass B extends A { void p(){System.out.print(\"B\");} }\nA[] a={new A(), new B(), new B()};\nfor(A x:a) x.p();",
      accept: ["ABB", "abb"],
      answer: "ABB",
      explain: "실제 객체가 A,B,B 순서이므로 ABB다.",
    },
  ]);

  add("java-field-binding", "Java", "Java 필드 숨김·메서드 바인딩", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { int x=1; int f(){return x;} }\nclass B extends A { int x=5; int f(){return x;} }\nA p=new B();\nSystem.out.print(p.x + p.f());",
      accept: ["6"],
      answer: "6",
      explain: "필드 p.x는 선언 타입 A의 1, 메서드 p.f()는 실제 객체 B의 5라 합은 6이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { void f(Object x){System.out.print(\"A\");} }\nclass B extends A { void f(String x){System.out.print(\"B\");} }\nA x=new B();\nx.f(\"hi\");",
      accept: ["A", "a"],
      answer: "A",
      explain: "오버로딩 후보는 선언 타입 A에서 결정된다. A의 f(Object)가 선택된다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { int n=2; int get(){return n;} }\nclass B extends A { int n=9; int get(){return super.n+n;} }\nA x=new B();\nSystem.out.print(x.n+x.get());",
      accept: ["13"],
      answer: "13",
      explain: "x.n은 A의 2, get은 B가 실행되어 2+9=11이므로 총 13이다.",
    },
  ]);

  add("java-constructor", "Java", "Java 생성자·super·초기화 순서", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { A(){System.out.print(\"A\");} }\nclass B extends A { B(){System.out.print(\"B\");} }\nnew B();",
      accept: ["AB", "ab"],
      answer: "AB",
      explain: "자식 객체를 만들 때 부모 생성자 A가 먼저, 자식 생성자 B가 나중이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass A { A(){System.out.print(f());} int f(){return 1;} }\nclass B extends A { int x=7; int f(){return x;} }\nnew B();",
      accept: ["0"],
      answer: "0",
      explain: "부모 생성자에서 B의 f가 호출되지만 B.x 초기화 전이라 기본값 0이다.",
    },
    {
      question: "빈칸에 들어갈 Java 키워드를 쓰시오.\n\nclass A { A(int n){} }\nclass B extends A { B(){ ____(3); } }",
      accept: ["super"],
      answer: "super",
      answerMode: "literal",
      explain: "부모 생성자를 명시적으로 호출할 때 super(...)를 쓴다.",
    },
  ]);

  add("java-exception", "Java", "Java 예외·catch·finally", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\ntry {\n  int x=4/0;\n  System.out.print(\"T\");\n} catch(ArithmeticException e) {\n  System.out.print(\"A\");\n} finally {\n  System.out.print(\"F\");\n}",
      accept: ["AF", "af"],
      answer: "AF",
      explain: "0 나눗셈으로 ArithmeticException catch의 A, 이어 finally의 F가 출력된다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\ntry {\n  int[] a={1};\n  System.out.print(a[2]);\n} catch(ArithmeticException e) {\n  System.out.print(\"A\");\n} catch(Exception e) {\n  System.out.print(\"E\");\n} finally {\n  System.out.print(\"F\");\n}",
      accept: ["EF", "ef"],
      answer: "EF",
      explain: "배열 인덱스 예외는 일반 Exception catch에서 잡히고 finally까지 실행된다.",
    },
  ]);

  add("java-enum", "Java", "Java enum 열거형", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nenum Level { LOW, MID, HIGH }\nLevel x=Level.values()[2];\nSystem.out.print(x.name()+x.ordinal());",
      accept: ["HIGH2", "high2"],
      answer: "HIGH2",
      explain: "values()[2]는 HIGH이고 ordinal은 0부터 시작해 2다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nenum Code {\n  A(\"X\"), B(\"YZ\");\n  String v;\n  Code(String v){this.v=v;}\n}\nCode c=Code.B;\nSystem.out.print(c.v.length()+c.ordinal());",
      accept: ["3"],
      answer: "3",
      explain: "B의 문자열 길이는 2, ordinal은 1이므로 3이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nenum Tri { A(\"A\"), B(\"AB\"), C(\"ABC\"); String s; Tri(String s){this.s=s;} }\nTri t=Tri.values()[Tri.A.name().length()];\nSystem.out.print(t.s);",
      accept: ["AB", "ab"],
      answer: "AB",
      explain: "Tri.A.name() 길이는 1이므로 values()[1]인 B의 문자열 AB다.",
    },
  ]);

  add("java-generics", "Java", "Java 제네릭·컬렉션", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nList<Integer> a=Arrays.asList(2,4,6);\nSystem.out.print(a.get(0)+a.get(2));",
      accept: ["8"],
      answer: "8",
      explain: "0번은 2, 2번은 6이라 합은 8이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nclass Box<T> { T v; Box(T v){this.v=v;} T get(){return v;} }\nBox<String> b=new Box<>(\"AB\");\nSystem.out.print(b.get().length());",
      accept: ["2"],
      answer: "2",
      explain: "T가 String으로 정해지고 AB 길이는 2다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic int sum(List<? extends Number> a){\n  int s=0; for(Number n:a) s+=n.intValue(); return s;\n}\nSystem.out.print(sum(Arrays.asList(1,3,5)));",
      accept: ["9"],
      answer: "9",
      explain: "? extends Number라 Integer 목록을 읽을 수 있고 합은 9다.",
    },
  ]);

  add("java-overload", "Java", "Java 오버로딩·형변환 선택", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic void f(int x){System.out.print(\"I\");}\nstatic void f(double x){System.out.print(\"D\");}\nf(1); f(1.0);",
      accept: ["ID", "id"],
      answer: "ID",
      explain: "정수 리터럴은 int 버전, 1.0은 double 버전이 선택된다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic int f(int x){return 1;}\nstatic int f(long x){return 2;}\nbyte b=3;\nSystem.out.print(f(b)+f(3L));",
      accept: ["3"],
      answer: "3",
      explain: "byte는 int로 확대되어 f(int)=1, 3L은 f(long)=2라 합은 3이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic void f(Object x){System.out.print(\"O\");}\nstatic void f(String x){System.out.print(\"S\");}\nObject x=\"A\";\nf(x); f(\"B\");",
      accept: ["OS", "os"],
      answer: "OS",
      explain: "오버로딩은 변수 선언 타입을 본다. x는 Object라 O, 문자열 리터럴은 S다.",
    },
  ]);

  add("java-string", "Java", "Java String·배열 비교", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nString a=new String(\"AB\");\nString b=new String(\"AB\");\nSystem.out.print((a==b)+\" \"+a.equals(b));",
      accept: ["false true", "falsetrue"],
      answer: "false true",
      explain: "서로 다른 객체라 ==는 false, 내용은 같아 equals는 true다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nString s=\"ABCDE\";\nSystem.out.print(s.substring(1,4)+s.charAt(0));",
      accept: ["BCDA", "bcda"],
      answer: "BCDA",
      explain: "substring(1,4)는 BCD이고 charAt(0)은 A다.",
    },
  ]);

  add("java-recursion", "Java", "Java 재귀·분할 호출", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic int f(int n){\n  if(n<=1) return n;\n  return f(n-1)+f(n-2);\n}\nSystem.out.print(f(4));",
      accept: ["3"],
      answer: "3",
      explain: "f(4)=f(3)+f(2)=2+1=3이다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nstatic int f(int[] a,int s,int e){\n  if(s>=e) return 0;\n  int m=(s+e)/2;\n  return a[m]+Math.max(f(a,s,m),f(a,m+1,e));\n}\nint[] a={3,5,8,12,17};\nSystem.out.print(f(a,0,4));",
      accept: ["20"],
      answer: "20",
      explain: "첫 중간값 8에 왼쪽 재귀 결과 8과 오른쪽 결과 12 중 큰 12를 더해 20이다.",
    },
  ]);

  add("java-abstract", "Java", "Java abstract·다형성", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nabstract class A { abstract int f(); int g(){return f()+1;} }\nclass B extends A { int f(){return 4;} }\nA x=new B();\nSystem.out.print(x.g());",
      accept: ["5"],
      answer: "5",
      explain: "g 안의 f는 실제 객체 B의 4를 반환해 5가 된다.",
    },
    {
      question: "빈칸에 공통으로 들어갈 Java 키워드를 쓰시오.\n\n____ class Shape {\n  ____ int area();\n}",
      accept: ["abstract"],
      answer: "abstract",
      answerMode: "literal",
      explain: "추상 클래스와 구현 없는 추상 메서드에 abstract를 쓴다.",
    },
  ]);

  add("java-coin-loop", "Java", "Java 반복문·몫과 나머지", [
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nint money=2860;\nint[] unit={1000,500,100,10};\nfor(int u:unit){ System.out.print(money/u+\" \"); money%=u; }",
      accept: ["2 1 3 6", "2136"],
      answer: "2 1 3 6",
      explain: "1000원 2개, 500원 1개, 100원 3개, 10원 6개다.",
    },
    {
      question: "다음 Java 코드의 출력값을 쓰시오.\n\nint n=0;\nfor(int i=1;i<20;i++) if(i%3==0 && i%2!=0) n=i;\nSystem.out.print(n);",
      accept: ["15"],
      answer: "15",
      explain: "20 미만에서 3의 배수이면서 홀수인 마지막 값은 15다.",
    },
  ]);

  add("py-default-args", "Python", "Python 기본 인자·함수 호출", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ndef f(a, b=3):\n    return a * b\nprint(f(4), f(4, 2))",
      accept: ["12 8", "128"],
      answer: "12 8",
      explain: "첫 호출은 기본값 3을 사용해 12, 둘째는 2를 넣어 8이다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ndef f(x, a=[]):\n    a.append(x)\n    return len(a)\nprint(f(1), f(2))",
      accept: ["1 2", "12"],
      answer: "1 2",
      explain: "기본 리스트는 호출 사이에 공유되어 길이가 1, 다음 호출에서 2가 된다.",
    },
  ]);

  add("py-list-methods", "Python", "Python 리스트 메서드", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=[1,2]\na.extend([3,4])\nx=a.pop(1)\na.reverse()\nprint(x, a)",
      accept: ["2 [4, 3, 1]", "2[4,3,1]"],
      answer: "2 [4, 3, 1]",
      explain: "extend 후 [1,2,3,4], pop(1)로 2 제거, reverse 후 [4,3,1]이다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=[3,1,2]\nb=sorted(a)\na.append(0)\nprint(a, b)",
      accept: ["[3, 1, 2, 0] [1, 2, 3]", "[3,1,2,0][1,2,3]"],
      answer: "[3, 1, 2, 0] [1, 2, 3]",
      explain: "sorted는 새 리스트를 만들고 원본 a는 정렬하지 않는다.",
    },
  ]);

  add("py-slicing", "Python", "Python 슬라이싱·포매팅", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ns='ABCDEFGHIJ'\nprint(s[1:8:2])",
      accept: ["BDFH", "bdfh"],
      answer: "BDFH",
      explain: "인덱스 1,3,5,7의 B,D,F,H를 고른다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ns='REMEMBER NOVEMBER'\nprint(s[:3] + s[12:17] + ' AND STR')",
      accept: ["REMEMBER AND STR", "rememberandstr"],
      answer: "REMEMBER AND STR",
      explain: "s[:3]은 REM, s[12:17]은 EMBER라 합치면 REMEMBER가 된다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=list(range(1,10))\nprint('A'.join(map(str,a[::-2])))",
      accept: ["9A7A5A3A1", "9a7a5a3a1"],
      answer: "9A7A5A3A1",
      explain: "뒤에서 두 칸씩 9,7,5,3,1을 고르고 A로 연결한다.",
    },
  ]);

  add("py-lambda-map", "Python", "Python lambda·map", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=[1,2,3,4]\nb=list(map(lambda x:x*2+1,a))\nprint(b)",
      accept: ["[3, 5, 7, 9]", "[3,5,7,9]"],
      answer: "[3, 5, 7, 9]",
      explain: "각 원소에 2를 곱하고 1을 더한다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=['a','bb','ccc']\nprint(list(map(len,a)))",
      accept: ["[1, 2, 3]", "[1,2,3]"],
      answer: "[1, 2, 3]",
      explain: "map이 각 문자열에 len을 적용한다.",
    },
  ]);

  add("py-set", "Python", "Python set 집합 연산", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na={1,2,3,4}\nb={3,4,5}\nprint(len(a|b), len(a&b))",
      accept: ["5 2", "52"],
      answer: "5 2",
      explain: "합집합은 1~5 다섯 개, 교집합은 3,4 두 개다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=['KR','CN','KR','JP','CN']\nprint(len(set(a)))",
      accept: ["3"],
      answer: "3",
      explain: "중복 제거 후 KR,CN,JP 세 개다.",
    },
  ]);

  add("py-tree", "Python", "Python 클래스·트리 재귀", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\nclass Node:\n    def __init__(self,v):\n        self.v=v; self.children=[]\ndef total(n):\n    return n.v + sum(total(c) for c in n.children)\na=Node(2); b=Node(3); c=Node(5)\na.children=[b,c]\nprint(total(a))",
      accept: ["10"],
      answer: "10",
      explain: "루트 2와 자식 3,5를 재귀로 모두 더해 10이다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\nclass N:\n    def __init__(self,v): self.v=v; self.c=[]\ndef depth(n):\n    return 1 if not n.c else 1+max(depth(x) for x in n.c)\na=N(1); b=N(2); c=N(3); a.c=[b]; b.c=[c]\nprint(depth(a))",
      accept: ["3"],
      answer: "3",
      explain: "a→b→c 세 단계라 깊이는 3이다.",
    },
  ]);

  add("py-dict", "Python", "Python 딕셔너리·중첩 자료", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na={'x':[1,2,3],'y':[4,5]}\nprint(sum(a['x'])+len(a['y']))",
      accept: ["8"],
      answer: "8",
      explain: "x 합은 6, y 길이는 2라 8이다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=[[1,2],[3],[4,5,6]]\nr={i:(sum(v),len(v)) for i,v in enumerate(a)}\nprint(r[0],r[2])",
      accept: ["(3, 2) (15, 3)", "(3,2)(15,3)"],
      answer: "(3, 2) (15, 3)",
      explain: "0번 리스트 합/길이는 3,2이고 2번은 15,3이다.",
    },
  ]);

  add("py-shallow-copy", "Python", "Python 중첩 리스트 얕은 복사", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=[[1,2],[3,4]]\nb=a[:]\nb[0].append(9)\nb[1]=[7]\nprint(a)",
      accept: ["[[1, 2, 9], [3, 4]]", "[[1,2,9],[3,4]]"],
      answer: "[[1, 2, 9], [3, 4]]",
      explain: "안쪽 리스트는 공유한다. append는 a에도 보이지만 b[1] 재대입은 a에 영향 없다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=[[1],[2]]\nb=a.copy()\nb[0][0]=5\nb.append([3])\nprint(a, len(b))",
      accept: ["[[5], [2]] 3", "[[5],[2]]3"],
      answer: "[[5], [2]] 3",
      explain: "안쪽 [1]은 공유되어 5가 된다. b에 새 바깥 원소를 붙여 길이는 3이다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\nm=[[1,2],[3,4]]\nb=m[:]\nb[0][1]+=5\nprint(sum(map(sum,m)))",
      accept: ["15"],
      answer: "15",
      explain: "공유된 첫 안쪽 리스트가 [1,7]이 되어 전체 합은 15다.",
    },
  ]);

  add("py-string", "Python", "Python 문자열 변환·split", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ns='HumanDev'\nr=''.join(x for x in s[::-1] if x!='n')\nprint(r)",
      accept: ["veDamuH", "vedamuh"],
      answer: "veDamuH",
      explain: "뒤집으면 veDnamuH이고 문자 n을 제거해 veDamuH가 된다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ns='A-B-C-D'\na=s.split('-')\nprint(''.join(a[1:][::-1]))",
      accept: ["DCB", "dcb"],
      answer: "DCB",
      explain: "분리 후 B,C,D를 뒤집어 D,C,B로 붙인다.",
    },
  ]);

  add("py-loop", "Python", "Python 반복·인덱스", [
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\na=['Seoul','Busan','Daegu']\ns='S'\nfor x in a:\n    s+=x[1]\nprint(s)",
      accept: ["Seua", "seua"],
      answer: "Seua",
      explain: "각 문자열의 1번 글자는 e,u,a이므로 Seua다.",
    },
    {
      question: "다음 Python 코드의 출력값을 쓰시오.\n\ns=0\nfor i in range(1,7):\n    if i%2==0: continue\n    s+=i\nprint(s)",
      accept: ["9"],
      answer: "9",
      explain: "홀수 1+3+5=9다.",
    },
  ]);

  add("sql-query", "SQL", "SQL 결과표 추적", [
    {
      question: "EMP(id, dept, score) 행이 다음과 같다.\n(1,'A',80), (2,'A',90), (3,'B',90), (4,'B',NULL)\n\nSELECT COUNT(score) FROM EMP WHERE dept='B';\n\n출력값을 쓰시오.",
      accept: ["1"],
      answer: "1",
      explain: "B 부서는 두 행이지만 score가 NULL인 행은 COUNT(score)에서 제외된다.",
    },
    {
      question: "T(a,b) 행이 (1,3), (2,4), (3,5), (4,NULL)이다.\n\nSELECT COUNT(*) FROM T WHERE a IN (2,3) OR b IN (3,5);\n\n출력값을 쓰시오.",
      accept: ["3"],
      answer: "3",
      explain: "(1,3), (2,4), (3,5) 세 행이 조건을 만족한다.",
    },
  ]);

  add("sql-join", "SQL", "SQL JOIN 결과", [
    {
      question: "A(id,name)=(1,'Kim'),(2,'Lee'),(3,'Park')\nB(id,score)=(1,80),(1,90),(3,70)\n\nSELECT COUNT(*) FROM A JOIN B ON A.id=B.id;\n\n출력값을 쓰시오.",
      accept: ["3"],
      answer: "3",
      explain: "id 1은 두 행, id 3은 한 행과 매칭되어 총 3행이다.",
    },
    {
      question: "A(id)=(1),(2),(3)\nB(id)=(1),(1),(3)\n\nSELECT COUNT(*) FROM A LEFT JOIN B ON A.id=B.id;\n\n출력값을 쓰시오.",
      accept: ["4"],
      answer: "4",
      explain: "id1 두 행, id2는 NULL로 한 행, id3 한 행이라 총 4행이다.",
    },
    {
      question: "EMP(id,dept,sal)=(1,'A',100),(2,'A',200),(3,'B',300)\nDEPT(dept)='A','B'\n\nSELECT COUNT(*) FROM EMP E JOIN DEPT D ON E.dept=D.dept WHERE E.sal>(SELECT AVG(sal) FROM EMP);\n\n출력값을 쓰시오.",
      accept: ["1"],
      answer: "1",
      explain: "전체 평균은 200이고 200보다 큰 급여 300 한 행만 남는다.",
    },
  ]);

  add("sql-subquery", "SQL", "SQL 서브쿼리·ALL", [
    {
      question: "T(score) 행이 10,20,30이다.\n\nSELECT COUNT(*) FROM T WHERE score > (SELECT AVG(score) FROM T);\n\n출력값을 쓰시오.",
      accept: ["1"],
      answer: "1",
      explain: "평균은 20이고 그보다 큰 30 한 행이다.",
    },
    {
      question: "P(price) 행이 10,20,30,40이다.\n\nSELECT COUNT(*) FROM P WHERE price > ALL(SELECT price FROM P WHERE price<30);\n\n출력값을 쓰시오.",
      accept: ["2"],
      answer: "2",
      explain: "서브쿼리는 10,20이고 모두보다 큰 값은 30,40 두 개다.",
    },
  ]);

  add("sql-set-ops", "SQL", "SQL UNION·집합 연산", [
    {
      question: "A(x) 행이 1,2,3이고 B(x) 행이 3,4이다.\n\nSELECT x FROM A UNION SELECT x FROM B;\n\n결과 행 수를 쓰시오.",
      accept: ["4"],
      answer: "4",
      explain: "UNION은 중복 3을 하나로 합쳐 1,2,3,4 네 행이다.",
    },
    {
      question: "A(x) 행이 1,2,3이고 B(x) 행이 3,4이다.\n\nSELECT x FROM A UNION ALL SELECT x FROM B;\n\n결과 행 수를 쓰시오.",
      accept: ["5"],
      answer: "5",
      explain: "UNION ALL은 중복을 남겨 총 5행이다.",
    },
  ]);

  add("sql-aggregate", "SQL", "SQL 집계·GROUP BY", [
    {
      question: "T(dept,score) 행이 ('A',80),('A',100),('B',70),('B',90)이다.\n\nSELECT COUNT(*) FROM (SELECT dept FROM T GROUP BY dept HAVING AVG(score)>=85) X;\n\n출력값을 쓰시오.",
      accept: ["1"],
      answer: "1",
      explain: "A 평균 90은 통과하고 B 평균 80은 탈락해 한 그룹이다.",
    },
    {
      question: "T(v) 행이 2,4,NULL,6이다.\n\nSELECT COUNT(v), COUNT(*), AVG(v) FROM T;\n\n출력값을 순서대로 쓰시오.",
      accept: ["3 4 4", "344"],
      answer: "3 4 4",
      explain: "NULL 제외 값은 세 개, 전체 행은 네 개, 평균은 4다.",
    },
  ]);

  add("sql-precedence", "SQL", "SQL AND·OR 우선순위", [
    {
      question: "T(a,b) 행이 (1,0),(2,0),(2,1),(3,1)이다.\n\nSELECT COUNT(*) FROM T WHERE a>1 AND b=0 OR a=3;\n\n출력값을 쓰시오.",
      accept: ["2"],
      answer: "2",
      explain: "AND가 먼저다. (2,0)과 a=3인 (3,1) 두 행이 남는다.",
    },
    {
      question: "T(a,b) 행이 (1,1),(1,2),(2,1),(2,2)이다.\n\nSELECT COUNT(*) FROM T WHERE a=1 OR a=2 AND b=2;\n\n출력값을 쓰시오.",
      accept: ["3"],
      answer: "3",
      explain: "a=1 두 행과 a=2이면서 b=2인 한 행, 총 3행이다.",
    },
  ]);

  add("sql-ddl", "SQL", "SQL DDL·외래키", [
    {
      question: "다음 SQL 빈칸에 들어갈 예약어를 순서대로 쓰시오.\n\nALTER TABLE child ADD CONSTRAINT fk_parent\n____ KEY(parent_id) ____ parent(id);",
      accept: [["foreign"], ["references"]],
      answer: "FOREIGN, REFERENCES",
      explain: "외래키 선언은 FOREIGN KEY, 부모 지정은 REFERENCES다.",
    },
    {
      question: "부모 행 삭제 시 해당 부모를 참조하는 자식 행도 함께 삭제되게 하는 SQL 절을 쓰시오.",
      accept: ["ON DELETE CASCADE", "ondeletecascade"],
      answer: "ON DELETE CASCADE",
      explain: "외래키 뒤에 ON DELETE CASCADE를 지정한다.",
    },
  ]);

  window.EXAM_SKILLS = skills;
  window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), ...rows];
  window.EXAM_MASTER_COUNTS = {
    ...(window.EXAM_MASTER_COUNTS || {}),
    jpsSkills: Object.values(skills).filter((skill) => ["Java", "Python", "SQL"].includes(skill.domain)).length,
    jpsVariants: rows.length,
  };
})();
