(function () {
  const advanced = window.ADVANCED_2025;
  if (!advanced) return;

  const base = {
    domain: "Java",
    prerequisites: ["academy-java-inheritance", "academy-java-binding"],
    sourceRounds: ["2025-1", "2025-2", "2025-3", "2026-1"],
    mistakes: ["constructor-order", "binding-rule"],
  };
  const add = (spec) => advanced.addL3({ ...base, ...spec });

  add({
    id: "l3-java-constructor-binding-01",
    concepts: ["constructor-order", "override", "default-value", "field-initializer"],
    prerequisites: ["academy-java-constructor", "academy-java-override"],
    answer: "07",
    code: `class Parent {
    int x = 2;
    Parent() {
        show();
        x += 3;
    }
    void show() { System.out.print(x); }
}

class Child extends Parent {
    int x = 7;
    Child() { show(); }
    @Override
    void show() { System.out.print(x); }
}

public class Main {
    public static void main(String[] args) {
        new Child();
    }
}`,
    solution: {
      summary: "부모 생성자에서는 자식 x가 아직 기본값 0이고, 자식 필드 초기화 뒤에는 7이어서 07이다.",
      steps: ["Child 메모리를 만들면 두 x 필드는 우선 0이다.", "부모 필드 x=2가 먼저 적용된다.", "부모 생성자의 show는 실제 객체가 Child라 Child.show다.", "자식 x는 아직 초기화 전이라 0을 출력한다.", "부모 생성자 뒤 자식 x=7이 적용된다.", "자식 생성자의 show가 7을 출력한다."],
      table: [["시점", "Parent.x", "Child.x"], ["부모 show", "2", "0"], ["자식 show", "5", "7"]],
      traps: ["부모 show가 실행된다고 생각", "자식 x=7이 부모 생성자 전에 적용된다고 생각", "두 x를 같은 필드로 보기"],
    },
    chapter: {
      id: "java-initialization-timeline",
      title: "클래스 로딩부터 부모·자식 생성자까지",
      concept: "static 초기화 뒤 부모 인스턴스 초기화와 생성자가 실행되고, 그 다음 자식 필드와 생성자가 실행된다.",
      memory: "클래스 static → 부모 필드 → 부모 생성자 → 자식 필드 → 자식 생성자",
      bridgeSteps: ["클래스 로딩 여부 확인", "모든 인스턴스 필드 기본값 표시", "부모 필드 초기화", "부모 생성자 호출", "자식 필드 초기화", "자식 생성자 호출"],
    },
  });

  add({
    id: "l3-java-constructor-binding-02",
    concepts: ["static-initializer", "instance-field", "constructor", "shared-state"],
    prerequisites: ["academy-java-static", "academy-java-constructor"],
    answer: "14",
    code: `class Counter {
    static int total = 1;
    static {
        total *= 2;
    }

    int value = ++total;

    Counter() {
        total += value;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter a = new Counter();
        Counter b = new Counter();
        System.out.print(Counter.total);
    }
}`,
    solution: {
      summary: "static 초기화로 2, 첫 객체 뒤 6, 둘째 객체 뒤 14가 된다.",
      steps: ["클래스 로딩 시 total=1이다.", "static 블록이 total을 2로 만든다.", "첫 객체 value=++total로 value=3,total=3이다.", "첫 생성자가 total=3+3=6으로 만든다.", "둘째 객체 value=7이고 생성자가 total=7+7=14로 만든다.", "공유 static total 14를 출력한다."],
      table: [["시점", "value", "total"], ["첫 객체", "3", "6"], ["둘째 객체", "7", "14"]],
      traps: ["static 블록을 객체마다 실행", "전위 증가를 나중에 적용", "value를 static으로 보기"],
    },
  });

  add({
    id: "l3-java-binding-01",
    concepts: ["field-hiding", "static-hiding", "override", "reference-type"],
    answer: "1 5 A",
    code: `class A {
    int x = 1;
    static String tag() { return "A"; }
    int get() { return x; }
}

class B extends A {
    int x = 5;
    static String tag() { return "B"; }
    @Override
    int get() { return x; }
}

public class Main {
    public static void main(String[] args) {
        A p = new B();
        System.out.print(p.x + " ");
        System.out.print(p.get() + " ");
        System.out.print(p.tag());
    }
}`,
    solution: {
      summary: "필드와 static 메서드는 선언 타입 A, 오버라이딩 메서드는 실제 객체 B 기준이라 1 5 A다.",
      steps: ["p의 선언 타입은 A다.", "실제 객체는 B다.", "p.x는 필드라 A.x=1이다.", "p.get은 인스턴스 오버라이딩이라 B.get이다.", "B.get 안의 x는 B.x=5다.", "p.tag는 static 숨김이라 A.tag의 A다."],
      table: [["대상", "기준", "결과"], ["필드", "선언 타입", "1"], ["override", "실제 객체", "5"]],
      traps: ["모든 멤버를 실제 객체 기준으로 보기", "필드 숨김을 오버라이딩으로 보기", "static 메서드를 동적 바인딩으로 보기"],
    },
    chapter: {
      id: "java-three-bindings",
      title: "필드·static 메서드·오버라이딩의 세 기준",
      concept: "필드와 static 메서드는 참조변수 선언 타입, 오버라이딩 인스턴스 메서드는 실제 객체 타입으로 찾는다.",
      memory: "A p=new B(): field=A, static=A, override=B",
      bridgeSteps: ["참조 선언 타입 표시", "new 실제 타입 표시", "필드 접근 분리", "static 호출 분리", "인스턴스 메서드의 override 확인"],
    },
  });

  add({
    id: "l3-java-binding-02",
    concepts: ["static-hiding", "override", "cast", "method-call"],
    answer: "12",
    code: `class Parent {
    static int s() { return 1; }
    int f() { return 2; }
}

class Child extends Parent {
    static int s() { return 3; }
    @Override
    int f() { return 4; }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        Child c = (Child) p;
        int result = p.s() + p.f();
        result += c.s() + c.f();
        System.out.print(result);
    }
}`,
    solution: {
      summary: "p.s=1, p.f=4, c.s=3, c.f=4를 더해 12다.",
      steps: ["p의 선언 타입은 Parent다.", "p.s는 static이라 Parent.s=1이다.", "p.f는 override라 Child.f=4다.", "캐스팅한 c의 선언 타입은 Child다.", "c.s=3이고 c.f=4다.", "합은 1+4+3+4=12다."],
      table: [["호출", "선택", "값"], ["p.s", "Parent", "1"], ["c.f", "Child", "4"]],
      traps: ["p.s를 Child.s로 선택", "캐스팅이 실제 객체를 새로 만든다고 생각", "f를 static처럼 선택"],
    },
  });

  add({
    id: "l3-java-overload-01",
    concepts: ["overload", "declared-type", "null", "cast"],
    prerequisites: ["academy-java-overload", "academy-java-cast"],
    answer: "OSOS",
    code: `class Picker {
    static String pick(Object x) {
        return "O";
    }

    static String pick(String x) {
        return "S";
    }
}

public class Main {
    public static void main(String[] args) {
        Object a = "text";
        String b = null;
        System.out.print(Picker.pick(a));
        System.out.print(Picker.pick(b));
        System.out.print(Picker.pick((Object) null));
        System.out.print(Picker.pick(null));
    }
}`,
    solution: {
      summary: "오버로딩은 호출 시 보이는 타입으로 고르며, 맨 null은 더 구체적인 String을 선택해 OSOS다.",
      steps: ["a의 실제 값은 문자열이지만 선언 타입은 Object다.", "pick(a)는 Object 버전 O다.", "b의 선언 타입은 String이라 S다.", "(Object)null은 명시적으로 Object 버전 O다.", "타입 없는 null은 둘 다 가능하다.", "String이 Object보다 구체적이므로 마지막은 S다."],
      table: [["인자", "컴파일 타입", "선택"], ["a", "Object", "O"], ["null", "가장 구체적", "S"]],
      traps: ["실제 객체 값으로 오버로딩 선택", "null 호출이 항상 모호하다고 생각", "명시적 캐스팅 무시"],
    },
    chapter: {
      id: "java-overload-selection",
      title: "Object·String·기본형·null 오버로딩 선택",
      concept: "오버로딩은 실행 전 컴파일 시점에 인자의 선언 타입, 리터럴 타입, 형변환으로 서명을 고른다.",
      memory: "후보 수집 → 적용 가능성 → 가장 구체적인 서명 → 그 뒤 override",
      bridgeSteps: ["호출 인자의 컴파일 타입 적기", "가능한 서명 지우기", "기본형 확대 변환 확인", "참조형의 더 구체적인 후보 선택", "선택된 인스턴스 메서드만 override 확인"],
    },
  });

  add({
    id: "l3-java-overload-02",
    concepts: ["primitive-overload", "widening", "boxing", "cast"],
    prerequisites: ["academy-java-overload", "academy-java-wrapper"],
    answer: "1232",
    code: `class Calc {
    static int f(int x) { return 1; }
    static int f(long x) { return 2; }
    static int f(Integer x) { return 3; }
}

public class Main {
    public static void main(String[] args) {
        byte a = 2;
        long b = 2;
        Integer c = 2;

        System.out.print(Calc.f(a));
        System.out.print(Calc.f(b));
        System.out.print(Calc.f(c));
        System.out.print(Calc.f((long) c));
    }
}`,
    solution: {
      summary: "byte는 int로 확대, long은 long, Integer는 래퍼, 캐스팅은 long을 선택해 1232다.",
      steps: ["byte 인자는 int로 확대될 수 있다.", "f(a)는 int 버전 1이다.", "long b는 long 버전 2다.", "Integer c는 정확한 Integer 버전 3이다.", "(long)c는 언박싱 뒤 long으로 캐스팅된다.", "마지막은 long 버전 2다."],
      table: [["호출", "변환", "결과"], ["f(a)", "byte→int", "1"], ["f((long)c)", "unbox→long", "2"]],
      traps: ["byte를 Integer로 박싱하는 후보를 우선", "long을 int로 축소", "캐스팅을 무시"],
    },
  });

  add({
    id: "l3-java-recursion-01",
    concepts: ["recursion", "overload", "return-tree", "long-cast"],
    prerequisites: ["academy-java-recursion", "academy-java-overload"],
    answer: "7",
    code: `class Solver {
    static int f(int n) {
        if (n <= 1) return n;
        return f(n - 1) + f((long) n - 2);
    }

    static int f(long n) {
        return (int) n + 1;
    }
}

public class Main {
    public static void main(String[] args) {
        int result = Solver.f(4);
        System.out.print(result);
    }
}`,
    solution: {
      summary: "int 재귀와 long 오버로드를 분리하면 f(4)=f(3)+3, f(3)=f(2)+2, f(2)=1+1이라 7이다.",
      steps: ["첫 호출은 int f(4)다.", "오른쪽 f((long)n-2)는 재귀가 아니라 long 버전이다.", "int f(2)=f(1)+long f(0)=1+1=2다.", "int f(3)=2+long f(1)=2+2=4다.", "int f(4)=4+long f(2)=4+3=7다.", "호출 순서와 반환 합산을 분리한다."],
      table: [["호출", "왼쪽", "오른쪽", "반환"], ["f(2)", "1", "1", "2"], ["f(4)", "4", "3", "7"]],
      traps: ["long 버전도 int 재귀로 계산", "n-2 후 캐스팅된다고 착각", "호출 순서만 쓰고 반환값을 합치지 않기"],
    },
    chapter: {
      id: "java-recursion-overload-tree",
      title: "오버로딩이 섞인 재귀 호출 트리",
      concept: "호출마다 선택된 서명을 먼저 적고, 호출 내려가기와 반환 올라오기를 다른 표로 관리한다.",
      memory: "노드 표기 예: f:int(4), f:long(2)",
      bridgeSteps: ["기저 조건 표시", "각 호출의 서명 표시", "왼쪽 호출 끝까지 전개", "오른쪽 호출 서명 확인", "잎부터 반환값 합산"],
    },
  });

  add({
    id: "l3-java-exception-01",
    concepts: ["exception", "multi-iteration", "catch", "finally"],
    prerequisites: ["academy-java-exception", "academy-java-loop"],
    answer: "2FEF4F",
    code: `public class Main {
    static void run(int x) {
        try {
            int value = 8 / x;
            System.out.print(value);
        } catch (ArithmeticException e) {
            System.out.print("E");
        } finally {
            System.out.print("F");
        }
    }

    public static void main(String[] args) {
        int[] data = {4, 0, 2};
        for (int value : data) {
            run(value);
        }
    }
}`,
    solution: {
      summary: "4에서는 2F, 0에서는 EF, 2에서는 4F가 이어져 2FEF4F다.",
      steps: ["run(4)는 8/4=2를 출력한다.", "정상이어도 finally F가 실행된다.", "run(0)는 나눗셈에서 예외가 난다.", "catch가 E를 출력하고 finally가 F를 출력한다.", "run(2)는 4와 F를 출력한다.", "세 조각을 붙이면 2FEF4F다."],
      table: [["x", "try/catch", "finally"], ["4", "2", "F"], ["0", "E", "F"]],
      traps: ["예외 뒤 finally 생략", "예외 발생 뒤 try의 출력 실행", "catch 후 반복문 종료"],
    },
    chapter: {
      id: "java-exception-hierarchy",
      title: "예외 계층·catch·finally 실행 시간선",
      concept: "예외가 발생하면 try의 남은 문장은 건너뛰고 가장 가까운 호환 catch로 이동한 뒤 finally를 실행한다.",
      memory: "ArithmeticException → RuntimeException → Exception, 작은 타입 catch가 먼저",
      bridgeSteps: ["예외 발생 지점 표시", "남은 try 문장 제거", "호환 catch 중 첫 번째 선택", "catch 출력 기록", "finally 무조건 실행"],
    },
  });

  add({
    id: "l3-java-interface-01",
    concepts: ["interface", "default-method", "throws", "try-finally"],
    prerequisites: ["academy-java-interface", "academy-java-exception"],
    answer: "4FXF",
    code: `interface Task {
    default int run(int x) throws Exception {
        return x + 1;
    }
}

class Worker implements Task {
    @Override
    public int run(int x) throws Exception {
        if (x < 0) throw new IllegalArgumentException();
        return Task.super.run(x) * 2;
    }
}

public class Main {
    public static void main(String[] args) {
        Task task = new Worker();
        for (int x : new int[]{1, -1}) {
            try { System.out.print(task.run(x)); }
            catch (RuntimeException e) { System.out.print("X"); }
            catch (Exception e) { System.out.print("E"); }
            finally { System.out.print("F"); }
        }
    }
}`,
    solution: {
      summary: "1은 default 결과 2를 두 배 해 4F, -1은 RuntimeException catch의 XF라서 4FXF다.",
      steps: ["인터페이스 참조지만 실제 Worker.run이 호출된다.", "x=1은 예외가 없다.", "Task.super.run(1)=2이고 두 배는 4다.", "finally F가 붙는다.", "x=-1은 IllegalArgumentException을 던진다.", "이는 RuntimeException catch의 X로 잡히고 finally F가 붙는다."],
      table: [["x", "실행", "출력"], ["1", "default×2", "4F"], ["-1", "Runtime catch", "XF"]],
      traps: ["Task default가 Worker override보다 먼저 실행", "IllegalArgumentException을 Exception catch로 먼저 잡기", "throws가 반드시 예외 발생을 뜻한다고 보기"],
    },
    chapter: {
      id: "java-interface-default-throws",
      title: "인터페이스 default·override·throws 결합",
      concept: "인터페이스 타입 참조도 구현 객체의 override를 호출하며, 구현 메서드는 Task.super로 default 구현을 명시 호출할 수 있다.",
      memory: "호출 대상은 실제 객체, default는 명시적 super 호출, 예외는 catch 계층 순서",
      bridgeSteps: ["참조 타입과 실제 구현 표시", "override 여부 확인", "default 명시 호출 추적", "throws와 실제 throw 구분", "catch-finally 순서 기록"],
    },
  });

  add({
    id: "l3-java-inheritance-01",
    concepts: ["inheritance", "super-call", "field-hiding", "cast"],
    answer: "2 9 5",
    code: `class Parent {
    int value = 2;
    int calc() {
        return value * 2;
    }
}

class Child extends Parent {
    int value = 5;
    @Override
    int calc() {
        return super.calc() + value;
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.print(p.value + " ");
        System.out.print(p.calc() + " ");
        System.out.print(((Child) p).value);
    }
}`,
    solution: {
      summary: "p.value는 부모 2, Child.calc는 부모 calc 4와 자식 value 5를 더한 9, 캐스팅 필드는 5다.",
      steps: ["객체에는 Parent.value와 Child.value가 따로 있다.", "p의 선언 타입은 Parent라 p.value=2다.", "p.calc는 실제 Child의 override다.", "super.calc 안의 value는 Parent.value=2라 4다.", "Child.calc의 value는 Child.value=5라 합은 9다.", "Child로 캐스팅한 필드 접근은 5다."],
      table: [["표현", "기준", "값"], ["p.value", "Parent 필드", "2"], ["p.calc", "Child override", "9"]],
      traps: ["super.calc에서도 Child.value 사용", "필드 두 개를 하나로 합치기", "캐스팅이 필드 값을 바꾼다고 보기"],
    },
    chapter: {
      id: "java-inheritance-super",
      title: "상속·super·필드 숨김을 한 번에 추적",
      concept: "super 메서드는 부모 구현을 고정 호출하고 그 메서드 본문 안의 필드는 부모 클래스 기준으로 해석된다.",
      memory: "override 진입은 실제 객체, super 호출은 부모 구현, 필드는 작성된 클래스 기준",
      bridgeSteps: ["객체 안 두 필드 그리기", "호출 진입 메서드 결정", "super 호출에서 부모 본문으로 이동", "각 본문의 필드 소유자 확인", "캐스팅 뒤 필드 접근 확인"],
    },
  });

  add({
    id: "l3-java-enum-01",
    concepts: ["enum", "generics", "values", "ordinal", "loop"],
    prerequisites: ["academy-java-enum", "academy-java-generics"],
    answer: "6:MID",
    code: `import java.util.Arrays;
import java.util.List;

enum Level {
    LOW(1), MID(3), HIGH(5);
    final int code;
    Level(int code) {
        this.code = code;
    }
}

public class Main {
    public static void main(String[] args) {
        List<Level> levels = Arrays.asList(Level.values());
        int sum = 0;
        for (Level level : levels) {
            if (level.ordinal() % 2 == 0)
                sum += level.code;
        }
        System.out.print(sum + ":" + levels.get(1).name());
    }
}`,
    solution: {
      summary: "ordinal 0과 2인 LOW·HIGH의 코드 합 6과 두 번째 상수 이름 MID를 출력한다.",
      steps: ["values는 LOW,MID,HIGH 순서 배열이다.", "List<Level>은 이 세 상수를 담는다.", "ordinal은 0,1,2다.", "짝수 ordinal은 LOW와 HIGH다.", "code 합은 1+5=6이다.", "get(1).name은 MID라 6:MID다."],
      table: [["상수", "ordinal", "code"], ["LOW", "0", "1"], ["HIGH", "2", "5"]],
      traps: ["ordinal을 1부터 세기", "name 대신 code 출력", "제네릭 리스트의 인덱스를 1부터 세기"],
    },
    chapter: {
      id: "java-enum-generics",
      title: "enum·제네릭 컬렉션·반복 누적",
      concept: "values는 선언 순서 배열, ordinal은 0부터 번호, name은 상수 식별자 문자열이며 List<Enum>에서도 그대로 추적한다.",
      memory: "values=배열, ordinal=번호, name=글자, 필드=생성자 값",
      bridgeSteps: ["enum 선언 순서 표 작성", "생성자 필드 값 기록", "values를 List 인덱스에 배치", "ordinal 조건 적용", "필드 누적과 name 출력 분리"],
    },
  });
})();
