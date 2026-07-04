(function () {
  const academy = window.CODE_SQL_ACADEMY || {};
  const java = academy.Java;

  if (java) {
    java.mastery = [
      ...(java.mastery || []),
      {
        title: "제네릭은 타입 붙은 상자",
        body: "List<String>은 문자열만 넣는 리스트, List<Integer>는 정수 객체만 넣는 리스트다. 꺾쇠 안 타입이 그 상자의 내용물 규칙이다.",
      },
      {
        title: "T는 임시 타입 이름",
        body: "class Box<T>에서 T는 아직 정하지 않은 타입 자리다. Box<String>을 만들면 T가 String처럼 움직인다.",
      },
    ];

    java.examPatterns = [
      ...(java.examPatterns || []),
      {
        title: "제네릭 컬렉션",
        body: "List<String>, List<Integer>, Map<String, Integer>처럼 꺾쇠 안 타입을 보고 get 결과 타입과 출력값을 묻는다.",
        items: [
          "List<String>의 get 결과는 String으로 보면 된다.",
          "List<Integer>에는 int처럼 보이는 값을 넣지만 실제 제네릭 타입은 Integer다.",
          "Map<String, Integer>는 문자열 키로 Integer 값을 꺼낸다.",
        ],
      },
      {
        title: "제네릭 클래스",
        body: "class Box<T>처럼 타입을 나중에 정하는 클래스가 나오면 T 자리에 실제 타입을 대입해서 읽는다.",
        items: [
          "Box<String>이면 T는 String이다.",
          "Box<Integer>이면 T는 Integer다.",
          "new ArrayList<>()의 빈 꺾쇠는 왼쪽 타입을 따라간다는 뜻이다.",
        ],
      },
    ];

    java.traceRules = [
      ...(java.traceRules || []),
      {
        title: "꺾쇠 안을 먼저 대입",
        body: "Box<T> 코드를 만나면 T를 실제 타입으로 바꿔 적는다. Box<String>이면 T value는 String value처럼 읽는다.",
        code: "class Box<T> { T value; }\nBox<String> b = new Box<>();\n// T = String",
      },
      {
        title: "컬렉션은 add/get만 추적",
        body: "정처기 수준에서는 복잡한 내부 구조보다 add로 들어간 순서와 get(index)로 꺼내는 위치를 보면 된다.",
        code: "List<String> a = new ArrayList<>();\na.add(\"A\");\na.add(\"B\");\na.get(1); // B",
      },
    ];

    java.fundamentals = [
      ...(java.fundamentals || []),
      {
        title: "List 제네릭",
        body: "List<String>은 문자열 리스트다. add로 넣고 get으로 꺼낸다. 인덱스는 배열처럼 0부터 시작한다.",
        code: "List<String> list = new ArrayList<>();\nlist.add(\"A\");\nlist.add(\"B\");\nSystem.out.print(list.get(1)); // B",
      },
      {
        title: "제네릭 클래스",
        body: "T는 타입 자리 표시자다. 객체를 만들 때 T가 어떤 타입인지 정해진다.",
        code: "class Box<T> {\n  T value;\n  Box(T value) { this.value = value; }\n  T get() { return value; }\n}\nBox<String> b = new Box<>(\"OK\");\nSystem.out.print(b.get()); // OK",
      },
      {
        title: "Map 제네릭",
        body: "Map<K,V>는 key와 value의 타입을 따로 정한다. Map<String,Integer>는 문자열 키로 정수 값을 찾는다.",
        code: "Map<String, Integer> m = new HashMap<>();\nm.put(\"A\", 3);\nSystem.out.print(m.get(\"A\")); // 3",
      },
      {
        title: "제네릭 타입 제한",
        body: "제네릭의 타입 인자로 int 같은 기본형은 직접 못 쓰고 Integer 같은 래퍼 클래스를 쓴다.",
        code: "List<Integer> nums = new ArrayList<>();\nnums.add(10);\nSystem.out.print(nums.get(0) + 5); // 15",
      },
    ];

    java.walkthroughs = [
      ...(java.walkthroughs || []),
      {
        title: "List<String> 추적",
        code: "List<String> a = new ArrayList<>();\na.add(\"C\");\na.add(\"D\");\nSystem.out.print(a.get(0) + a.get(1));",
        trace: [
          ["a", "[C, D]", "add 순서대로 0번 C, 1번 D가 들어간다."],
          ["a.get(0)", "C", "0번 원소를 꺼낸다."],
          ["a.get(1)", "D", "1번 원소를 꺼낸다."],
        ],
        output: "CD",
      },
      {
        title: "Box<T> 추적",
        code: "class Box<T> {\n  T v;\n  Box(T v) { this.v = v; }\n  T get() { return v; }\n}\nBox<Integer> b = new Box<>(7);\nSystem.out.print(b.get() + 3);",
        trace: [
          ["T", "Integer", "Box<Integer>이므로 T 자리는 Integer로 읽는다."],
          ["b.v", "7", "생성자로 7이 저장된다."],
          ["b.get()+3", "10", "get이 7을 돌려주고 3을 더한다."],
        ],
        output: "10",
      },
    ];

    java.templates = [
      ...(java.templates || []),
      ["List 제네릭", "List<String> list = new ArrayList<>();\nlist.add(\"A\");\nString x = list.get(0);"],
      ["Map 제네릭", "Map<String, Integer> map = new HashMap<>();\nmap.put(\"A\", 1);\nint n = map.get(\"A\");"],
      ["제네릭 클래스", "class Box<T> {\n  T value;\n  Box(T value) { this.value = value; }\n  T get() { return value; }\n}"],
    ];

    java.traps = [
      ...(java.traps || []),
      "제네릭 타입 인자에는 int가 아니라 Integer처럼 참조 타입을 쓴다.",
      "new ArrayList<>()의 <>는 왼쪽 List<String> 같은 선언 타입을 따라간다.",
      "List의 인덱스도 배열처럼 0부터 시작한다.",
      "Map<String, Integer>에서 앞 타입은 key, 뒤 타입은 value다.",
    ];

    java.answerRules = [
      ...(java.answerRules || []),
      "제네릭 문제는 꺾쇠 안 타입을 먼저 말로 바꾼 뒤 코드를 읽는다. 예: List<String>은 문자열 리스트.",
      "List 출력 추적은 add된 순서와 get 번호만 표로 적으면 대부분 풀린다.",
      "Box<T> 같은 문제는 T를 실제 타입으로 치환해서 읽는다.",
    ];

    java.finalChecklist = [
      ...(java.finalChecklist || []),
      "제네릭 꺾쇠 안 타입 확인",
      "List get 인덱스 0 시작 확인",
      "Map의 key 타입과 value 타입 분리",
      "int 대신 Integer를 쓰는지 확인",
    ];
  }

  const rows = [
    ["gm-java-gen-001", "Java", "code", "must", `Java 제네릭에서 List<String>은 무엇을 담는 리스트인가?`, ["string", "문자열", "문자열리스트"], "문자열", "꺾쇠 안의 String이 원소 타입이다.", ["Java", "제네릭", "List"]],
    ["gm-java-gen-002", "Java", "code", "must", `Java 출력값은?\nList<String> a = new ArrayList<>();\na.add("C");\na.add("D");\nSystem.out.print(a.get(1));`, ["D", "d"], "D", "List 인덱스는 0부터 시작한다. 0번 C, 1번 D다.", ["Java", "제네릭", "List"]],
    ["gm-java-gen-003", "Java", "code", "must", `Java 출력값은?\nList<Integer> nums = new ArrayList<>();\nnums.add(10);\nnums.add(20);\nSystem.out.print(nums.get(0) + nums.get(1));`, ["30"], "30", "0번 10과 1번 20을 더해 30이다.", ["Java", "제네릭", "Integer"]],
    ["gm-java-gen-004", "Java", "code", "high", `Java 출력값은?\nclass Box<T> {\n  T v;\n  Box(T v) { this.v = v; }\n  T get() { return v; }\n}\nBox<String> b = new Box<>("OK");\nSystem.out.print(b.get());`, ["OK", "ok"], "OK", "Box<String>이므로 T는 String이고 get은 저장된 OK를 돌려준다.", ["Java", "제네릭", "클래스"]],
    ["gm-java-gen-005", "Java", "code", "high", `Java 출력값은?\nclass Box<T> {\n  T v;\n  Box(T v) { this.v = v; }\n  T get() { return v; }\n}\nBox<Integer> b = new Box<>(7);\nSystem.out.print(b.get() + 3);`, ["10"], "10", "Box<Integer>이므로 get 결과 7에 3을 더한다.", ["Java", "제네릭", "Integer"]],
    ["gm-java-gen-006", "Java", "code", "high", `Java 출력값은?\nMap<String, Integer> m = new HashMap<>();\nm.put("A", 3);\nm.put("B", 5);\nSystem.out.print(m.get("A") + m.get("B"));`, ["8"], "8", "A의 값 3과 B의 값 5를 더한다.", ["Java", "제네릭", "Map"]],
    ["gm-java-gen-007", "Java", "code", "mid", "Java 제네릭에서 class Box<T>의 T는 무엇을 의미하는가?", ["타입", "type", "타입매개변수", "타입 매개변수"], "타입 매개변수", "T는 나중에 실제 타입으로 바뀌는 타입 자리 표시자다.", ["Java", "제네릭"]],
    ["gm-java-gen-008", "Java", "code", "mid", "Java 제네릭에서 List<int> 대신 써야 하는 올바른 타입은?", ["listinteger", "list<integer>", "integer"], "List<Integer>", "제네릭 타입 인자에는 기본형 int가 아니라 래퍼 클래스 Integer를 쓴다.", ["Java", "제네릭", "래퍼"]],
  ];

  window.CODE_SQL_PRACTICE_ROWS = [...(window.CODE_SQL_PRACTICE_ROWS || []), ...rows];
})();
