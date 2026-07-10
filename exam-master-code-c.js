(function () {
  const skills = window.EXAM_SKILLS || {};
  const rows = [];

  function add(id, title, questions) {
    const practiceIds = [];
    questions.forEach((question, index) => {
      const qid = "exam-" + id + "-" + (index + 1);
      practiceIds.push(qid);
      rows.push([
        qid,
        "C",
        "code",
        question.level || "high",
        question.question,
        question.accept,
        question.answer,
        question.explain,
        ["C", title, "기출급", "skill:" + id, ...(question.tags || [])],
      ]);
    });
    skills[id] = { id, title, domain: "C", kind: "code", lessonId: "academy-C", practiceIds };
  }

  add("c-array-pointer", "C 배열·포인터 복합 추적", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[] = {4, 7, 2, 9};\nint *p = a + 1;\nprintf(\"%d\", *(p + 2) - *p);",
      accept: ["2"],
      answer: "2",
      explain: "p는 a[1]=7을 본다. p+2는 a[3]=9이므로 9-7=2다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[] = {3, 6, 9, 12, 15};\nint *p = a;\np += 2;\nprintf(\"%d\", p[-1] + p[2]);",
      accept: ["21"],
      answer: "21",
      explain: "p는 a[2]다. p[-1]=a[1]=6, p[2]=a[4]=15이므로 21이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint f(int *p, int n) {\n  int s = 0;\n  for (int i = 0; i < n; i++)\n    s += *(p + i) * (i % 2 == 0 ? 1 : -1);\n  return s;\n}\nint a[] = {2, 5, 8, 11};\nprintf(\"%d\", f(a, 4));",
      accept: ["-6"],
      answer: "-6",
      explain: "인덱스가 짝수면 더하고 홀수면 뺀다. 2-5+8-11=-6이다.",
    },
  ]);

  add("c-string-pointer", "C 문자열 포인터", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nchar s[] = \"KOREA\";\nchar *p = s + 1;\nprintf(\"%c%c\", *p, *(p + 3));",
      accept: ["OA", "oa"],
      answer: "OA",
      explain: "p는 O를 가리키고 p+3은 A를 가리킨다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint len(char *p) {\n  int n = 0;\n  while (*p != '\\0') { n++; p++; }\n  return n;\n}\nprintf(\"%d\", len(\"APPLE\"));",
      accept: ["5"],
      answer: "5",
      explain: "널 문자 직전까지 A,P,P,L,E 다섯 글자를 센다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nchar s[] = \"ABCDEFG\";\nchar *p = s;\nfor (int i = 0; i < 3; i++) {\n  printf(\"%c\", *p);\n  p += 2;\n}",
      accept: ["ACE", "ace"],
      answer: "ACE",
      explain: "p가 0, 2, 4번 칸을 가리켜 A, C, E가 출력된다.",
    },
  ]);

  add("c-struct", "C 구조체·구조체 배열", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct S { int a; int b; };\nstruct S x[2] = {{2, 5}, {7, 4}};\nprintf(\"%d\", x[0].b + x[1].a);",
      accept: ["12"],
      answer: "12",
      explain: "x[0].b=5, x[1].a=7이므로 12다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct S { int n; } x = {6};\nstruct S *p = &x;\np->n += 4;\nprintf(\"%d\", x.n);",
      accept: ["10"],
      answer: "10",
      explain: "p->n은 x.n 자체다. 6에 4를 더해 10이 된다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct P { char c; int n; };\nstruct P a[] = {{'A', 2}, {'B', 4}, {'C', 6}};\nprintf(\"%c%d\", a[1].c, a[0].n + a[2].n);",
      accept: ["B8", "b8"],
      answer: "B8",
      explain: "두 번째 구조체의 문자는 B이고 2+6=8이다.",
    },
  ]);

  add("c-double-pointer", "C 이중 포인터", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint x = 5;\nint *p = &x;\nint **pp = &p;\n**pp += 3;\nprintf(\"%d\", x);",
      accept: ["8"],
      answer: "8",
      explain: "pp는 p의 주소, *pp는 p, **pp는 x다. x가 8이 된다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a = 2, b = 9;\nint *p = &a;\nint **pp = &p;\n*pp = &b;\n**pp -= 4;\nprintf(\"%d %d\", a, b);",
      accept: ["2 5", "25"],
      answer: "2 5",
      explain: "*pp=&b로 p가 b를 가리킨다. b만 9에서 5가 되고 a는 2다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct N { int v; } n = {4};\nstruct N *p = &n;\nstruct N **pp = &p;\n(**pp).v *= 2;\nprintf(\"%d\", p->v);",
      accept: ["8"],
      answer: "8",
      explain: "(**pp)는 n 구조체다. v가 4에서 8로 바뀐다.",
    },
  ]);

  add("c-dynamic-2d", "C 동적 메모리·2차원 포인터", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint **a = malloc(sizeof(int*) * 2);\nfor (int i = 0; i < 2; i++) a[i] = malloc(sizeof(int) * 3);\nint sum = 0;\nfor (int i = 0; i < 2; i++)\n  for (int j = 0; j < 3; j++) {\n    a[i][j] = (i + 1) * (j + 2);\n    sum += a[i][j];\n  }\nprintf(\"%d\", sum);",
      accept: ["27"],
      answer: "27",
      explain: "첫 행은 2,3,4이고 둘째 행은 4,6,8이다. 합은 27이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint data[] = {3, 5, 7, 9, 11, 13};\nint *row[2] = {data, data + 3};\nprintf(\"%d\", row[1][1] + row[0][2]);",
      accept: ["18"],
      answer: "18",
      explain: "row[1][1]=data[4]=11, row[0][2]=data[2]=7이므로 18이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint **a = malloc(sizeof(int*) * 2);\nfor (int i = 0; i < 2; i++) {\n  a[i] = malloc(sizeof(int) * 2);\n  for (int j = 0; j < 2; j++) a[i][j] = i * 2 + j + 1;\n}\nprintf(\"%d\", a[0][1] * a[1][0]);",
      accept: ["6"],
      answer: "6",
      explain: "배열은 [[1,2],[3,4]]가 된다. a[0][1]=2, a[1][0]=3이라 6이다.",
    },
  ]);

  add("c-linked-list", "C 연결 리스트 포인터 재배치", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct N { int v; struct N *next; };\nstruct N a = {2, NULL}, b = {5, NULL}, c = {8, NULL};\na.next = &c; c.next = &b;\nstruct N *p = &a;\nint s = 0;\nwhile (p) { s += p->v; p = p->next; }\nprintf(\"%d\", s);",
      accept: ["15"],
      answer: "15",
      explain: "연결 순서는 a(2)→c(8)→b(5)라 합은 15다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct N { int v; struct N *next; };\nstruct N a = {2, NULL}, b = {5, NULL}, c = {8, NULL};\nc.next = &a; a.next = &b;\nstruct N *head = &c;\nprintf(\"%d %d %d\", head->v, head->next->v, head->next->next->v);",
      accept: ["8 2 5", "825"],
      answer: "8 2 5",
      explain: "head는 c, 다음은 a, 그 다음은 b다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct N { int v; struct N *next; };\nstruct N x[3] = {{1, NULL}, {4, NULL}, {7, NULL}};\nx[0].next = &x[2]; x[2].next = &x[1];\nstruct N *p = x;\nprintf(\"%d\", p->next->v - p->next->next->v);",
      accept: ["3"],
      answer: "3",
      explain: "x[0] 다음은 x[2]=7, 그 다음은 x[1]=4이므로 7-4=3이다.",
    },
  ]);

  add("c-function-pointer", "C 함수 포인터·구조체", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint add(int a, int b) { return a + b; }\nint sub(int a, int b) { return a - b; }\nstruct Calc { int (*op)(int, int); };\nstruct Calc c = {sub};\nprintf(\"%d\", c.op(14, 5));",
      accept: ["9"],
      answer: "9",
      explain: "c.op는 sub 함수 주소를 담고 있으므로 14-5=9다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint twice(int x) { return x * 2; }\nint plus3(int x) { return x + 3; }\nint (*f[2])(int) = {twice, plus3};\nprintf(\"%d\", f[1](f[0](4)));",
      accept: ["11"],
      answer: "11",
      explain: "f[0](4)=8이고 f[1](8)=11이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint mul(int a, int b) { return a * b; }\nstruct Job { int base; int (*run)(int, int); };\nstruct Job j = {3, mul};\nprintf(\"%x\", j.run(j.base, 10));",
      accept: ["1e", "1E"],
      answer: "1e",
      explain: "3×10=30이고 30을 16진수로 쓰면 1e다.",
    },
  ]);

  add("c-union-bit", "C 공용체·비트 연산", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nunion U { int a; int b; } u;\nu.a = 7;\nu.b = u.a + 3;\nprintf(\"%d\", u.b);",
      accept: ["10"],
      answer: "10",
      explain: "a와 b는 같은 메모리를 공유한다. a의 7을 읽어 3을 더한 10을 b에 저장한다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint x = 10;\nprintf(\"%d\", (x << 1) | 3);",
      accept: ["23"],
      answer: "23",
      explain: "10<<1은 20(10100), 3은 00011이다. OR 결과는 10111=23이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nunsigned int x = 13;\nprintf(\"%u\", (x & 6) ^ 3);",
      accept: ["7"],
      answer: "7",
      explain: "13&6은 4이고 4^3은 7이다.",
    },
  ]);

  add("c-recursion", "C 재귀 호출", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint f(int n) {\n  if (n <= 1) return 1;\n  return n * f(n - 1);\n}\nprintf(\"%d\", f(5));",
      accept: ["120"],
      answer: "120",
      explain: "5×4×3×2×1=120이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint f(int n) {\n  if (n <= 0) return 0;\n  return n + f(n - 2);\n}\nprintf(\"%d\", f(7));",
      accept: ["16"],
      answer: "16",
      explain: "7+5+3+1+0=16이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint f(int n) {\n  if (n <= 1) return n;\n  return f(n - 1) + f(n - 2);\n}\nprintf(\"%d\", f(6));",
      accept: ["8"],
      answer: "8",
      explain: "피보나치 수열 0,1,1,2,3,5,8에서 f(6)=8이다.",
    },
  ]);

  add("c-number-loops", "C 숫자 알고리즘 반복문", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint n = 1234, r = 0;\nwhile (n > 0) {\n  r = r * 10 + n % 10;\n  n /= 10;\n}\nprintf(\"%d\", r);",
      accept: ["4321"],
      answer: "4321",
      explain: "마지막 자리 4,3,2,1을 차례로 r 뒤에 붙인다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint count = 0;\nfor (int n = 2; n <= 10; n++) {\n  int prime = 1;\n  for (int d = 2; d < n; d++) if (n % d == 0) prime = 0;\n  if (prime) count++;\n}\nprintf(\"%d\", count);",
      accept: ["4"],
      answer: "4",
      explain: "2,3,5,7 네 개가 소수다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint count = 0;\nfor (int n = 2; n <= 30; n++) {\n  int sum = 1;\n  for (int d = 2; d <= n / 2; d++) if (n % d == 0) sum += d;\n  if (sum == n) count++;\n}\nprintf(\"%d\", count);",
      accept: ["2"],
      answer: "2",
      explain: "30 이하 완전수는 6과 28 두 개다.",
    },
  ]);

  add("c-2d-neighbor", "C 2차원 배열·중첩 반복", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\nint s = 0;\nfor (int i = 0; i < 3; i++) s += a[i][i];\nprintf(\"%d\", s);",
      accept: ["15"],
      answer: "15",
      explain: "주대각선 1+5+9=15다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[2][3] = {{1,0,1},{0,1,0}};\nint s = 0;\nfor (int i = 0; i < 2; i++)\n  for (int j = 0; j < 3; j++)\n    if (a[i][j]) s += i + j;\nprintf(\"%d\", s);",
      accept: ["4"],
      answer: "4",
      explain: "1인 위치 (0,0),(0,2),(1,1)의 i+j 합은 0+2+2=4다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};\nint s = 0;\nfor (int i = 0; i < 3; i++) s += a[i][2 - i];\nprintf(\"%d\", s);",
      accept: ["15"],
      answer: "15",
      explain: "반대 대각선 3+5+7=15다.",
    },
  ]);

  add("c-sort-rank", "C 정렬·순위 계산", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[] = {30, 10, 20};\nfor (int i = 0; i < 3; i++) {\n  int rank = 1;\n  for (int j = 0; j < 3; j++) if (a[i] < a[j]) rank++;\n  printf(\"%d\", rank);\n}",
      accept: ["132"],
      answer: "132",
      explain: "30은 1등, 10은 3등, 20은 2등이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[] = {4, 1, 3, 2};\nfor (int i = 0; i < 3; i++)\n  for (int j = i + 1; j < 4; j++)\n    if (a[i] > a[j]) { int t=a[i]; a[i]=a[j]; a[j]=t; }\nprintf(\"%d%d%d%d\", a[0],a[1],a[2],a[3]);",
      accept: ["1234"],
      answer: "1234",
      explain: "작은 값을 앞쪽으로 교환해 오름차순이 된다.",
    },
  ]);

  add("c-circular-array", "C 원형 인덱스·나머지", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a[] = {2,4,6,8,10};\nint s = 0;\nfor (int i = 0; i < 5; i++) s += a[(i + 2) % 5];\nprintf(\"%d\", s);",
      accept: ["30"],
      answer: "30",
      explain: "순서만 회전할 뿐 다섯 원소를 한 번씩 더해 30이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nchar a[] = {'A','B','C','D'};\nfor (int i = 0; i < 4; i++) printf(\"%c\", a[(i + 3) % 4]);",
      accept: ["DABC", "dabc"],
      answer: "DABC",
      explain: "인덱스는 3,0,1,2 순서다.",
    },
  ]);

  add("c-char-array", "C 문자 배열·삽입 이동", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nchar a[6] = {'A','C','D','E','\\0'};\nfor (int i = 4; i > 1; i--) a[i] = a[i-1];\na[1] = 'B';\nprintf(\"%s\", a);",
      accept: ["ABCDE", "abcde"],
      answer: "ABCDE",
      explain: "1번 이후 문자를 오른쪽으로 밀고 B를 넣는다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nchar a[] = {'B','A','D','C','\\0'};\nfor (int i = 0; i < 3; i++)\n  for (int j = i + 1; j < 4; j++)\n    if (a[i] > a[j]) { char t=a[i]; a[i]=a[j]; a[j]=t; }\nprintf(\"%s\", a);",
      accept: ["ABCD", "abcd"],
      answer: "ABCD",
      explain: "문자 코드 순서로 오름차순 정렬한다.",
    },
  ]);

  add("c-operator-flow", "C 연산자·제어 흐름", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint x = 2, y = 0;\nswitch (x) {\n  case 1: y += 1;\n  case 2: y += 3;\n  case 3: y += 5; break;\n  default: y = 9;\n}\nprintf(\"%d\", y);",
      accept: ["8"],
      answer: "8",
      explain: "case 2에서 시작해 break가 있는 case 3까지 실행해 3+5=8이다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nint a = 7, b = 4;\nint x = a > b ? a - b : b - a;\nprintf(\"%d\", x * 2);",
      accept: ["6"],
      answer: "6",
      explain: "조건이 참이라 a-b=3을 선택하고 두 배 해 6이다.",
    },
  ]);

  add("c-struct-string", "C 구조체 문자열·동적 노드", [
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct S { char *name; int score; };\nstruct S a[] = {{\"Kim\", 80}, {\"Lee\", 95}};\nprintf(\"%c%d\", a[1].name[0], a[0].score + 5);",
      accept: ["L85", "l85"],
      answer: "L85",
      explain: "Lee의 첫 글자 L과 80+5인 85를 이어 출력한다.",
    },
    {
      question: "다음 C 코드의 출력값을 쓰시오.\n\nstruct N { char c; struct N *next; };\nstruct N *a = malloc(sizeof(struct N));\nstruct N *b = malloc(sizeof(struct N));\na->c='X'; b->c='Y'; a->next=b; b->next=NULL;\nprintf(\"%c%c\", a->c, a->next->c);",
      accept: ["XY", "xy"],
      answer: "XY",
      explain: "a의 문자는 X이고 a->next는 b라 Y가 이어진다.",
    },
  ]);

  window.EXAM_SKILLS = skills;
  window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), ...rows];
  window.EXAM_MASTER_COUNTS = {
    ...(window.EXAM_MASTER_COUNTS || {}),
    cSkills: Object.values(skills).filter((skill) => skill.domain === "C").length,
    cVariants: rows.length,
  };
})();
