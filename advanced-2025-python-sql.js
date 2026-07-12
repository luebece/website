(function () {
  const advanced = window.ADVANCED_2025;
  if (!advanced) return;

  const addPython = (spec) => advanced.addL3({
    domain: "Python",
    prerequisites: ["academy-python-object", "academy-python-trace"],
    sourceRounds: ["2025-1", "2025-2", "2026-1"],
    mistakes: ["shallow-copy-inner-alias", "state-trace"],
    verification: { runtime: "python", status: "fixture-ready" },
    ...spec,
  });

  addPython({
    id: "l3-python-tree-01",
    concepts: ["tree-build", "recursion", "depth", "conditional-sum"],
    prerequisites: ["academy-python-tree", "academy-python-recursion"],
    answer: "33",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def total(node, depth=0):
    result = node.value if depth % 2 == 0 else 0
    for child in node.children:
        result += total(child, depth + 1)
    return result

values = [2, 3, 5, 7, 11, 13]
parents = [-1, 0, 0, 1, 1, 2]
nodes = [Node(value) for value in values]

for i in range(1, len(nodes)):
    nodes[parents[i]].children.append(nodes[i])

print(total(nodes[0]))`,
    solution: {
      summary: "부모 배열로 트리를 만든 뒤 깊이 0과 2의 값 2+7+11+13을 더해 33이다.",
      steps: ["0번 노드 2가 루트다.", "1,2번은 루트의 자식이다.", "3,4번은 1번의 자식이고 5번은 2번의 자식이다.", "깊이 0의 값 2를 포함한다.", "깊이 1의 3,5는 제외한다.", "깊이 2의 7,11,13을 더해 33이다."],
      table: [["깊이", "값", "포함"], ["0", "2", "예"], ["2", "7,11,13", "예"]],
      traps: ["parents 값을 노드 값으로 보기", "깊이를 1부터 세기", "자식 노드만 합산"],
    },
    chapter: {
      id: "python-tree-build-recursion",
      title: "부모 배열에서 트리를 만들고 재귀 순회",
      concept: "parents[i]는 i번 노드를 어느 부모의 children에 넣을지 알려 주며, 만든 뒤에는 루트부터 같은 함수를 반복한다.",
      memory: "입력 배열 → Node 목록 → 부모.children 연결 → 루트 재귀",
      bridgeSteps: ["모든 노드 먼저 생성", "부모 인덱스 확인", "children 연결", "기저 상태 확인", "깊이와 누적값을 인자로 전달"],
    },
  });

  addPython({
    id: "l3-python-tree-02",
    concepts: ["tree", "recursive-tuple", "max-depth", "leaf-sum"],
    prerequisites: ["academy-python-tree", "academy-python-recursion"],
    answer: "4 11",
    code: `class Node:
    def __init__(self, value):
        self.value = value
        self.children = []

def stats(node):
    if not node.children:
        return 1, node.value
    child_stats = [stats(child) for child in node.children]
    depth = 1 + max(d for d, _ in child_stats)
    leaf_sum = sum(s for _, s in child_stats)
    return depth, leaf_sum

values = [4, 2, 6, 3, 5]
parents = [-1, 0, 0, 1, 3]
nodes = [Node(v) for v in values]

for child in range(1, len(nodes)):
    parent = parents[child]
    nodes[parent].children.append(nodes[child])

depth, leaf_sum = stats(nodes[0])
print(depth, leaf_sum)`,
    solution: {
      summary: "가장 긴 경로는 0→1→3→4로 깊이 4이고 잎 값은 6과 5라 합 11이다.",
      steps: ["루트 0의 자식은 1과 2다.", "1의 자식은 3, 3의 자식은 4다.", "잎은 2번 값 6과 4번 값 5다.", "잎 stats는 깊이 1과 자기 값을 반환한다.", "부모는 가장 큰 자식 깊이에 1을 더한다.", "루트 결과는 깊이 4, 잎 합 11이다."],
      table: [["노드", "반환 깊이", "잎 합"], ["2", "1", "6"], ["0", "4", "11"]],
      traps: ["깊이에서 sum 사용", "모든 노드 값을 leaf_sum에 포함", "튜플의 두 위치를 뒤바꿈"],
    },
    chapter: {
      id: "python-generator-recursion",
      title: "generator·sum·max가 섞인 재귀 반환",
      concept: "재귀가 튜플을 반환하면 깊이는 max, 전체 합은 sum처럼 목적에 맞는 집계 함수를 각각 적용한다.",
      memory: "깊이=1+max(자식 깊이), 합=sum(자식 합)",
      bridgeSteps: ["반환 튜플 칸 이름 붙이기", "잎 반환값 계산", "자식 호출 결과 목록 작성", "max와 sum 대상 분리", "루트까지 역순 합산"],
    },
  });

  addPython({
    id: "l3-python-shallow-copy-01",
    concepts: ["shallow-copy", "list-iadd", "inner-alias", "rebind"],
    prerequisites: ["academy-python-shallow-copy", "academy-python-list"],
    answer: "[[1], [2, 1], [3, 2, 1]]\n[9]",
    code: `def extend_neighbors(rows):
    for index in range(len(rows) - 1):
        current = rows[index]
        target = rows[index + 1]
        target += current
    return rows

a = [[1], [2], [3]]
b = a[:]

extend_neighbors(b)
b[0] = [9]

print(a)
print(b[0])`,
    solution: {
      summary: "얕은 복사 뒤 내부 리스트 +=는 원본과 공유되고, b[0] 재대입만 b에 한정된다.",
      steps: ["a와 b의 바깥 리스트는 다르다.", "세 내부 리스트는 처음에 공유된다.", "i=0에서 두 번째 내부 리스트가 [2,1]로 직접 변경된다.", "i=1에서 세 번째가 변경된 두 번째를 이어 [3,2,1]이 된다.", "b[0]=[9]는 바깥 칸 재연결이라 a[0]은 [1]이다.", "따라서 a와 b[0] 출력이 정답과 같다."],
      table: [["동작", "a", "b"], ["+= 뒤", "내부 변경 공유", "내부 변경 공유"], ["b[0]=", "[1] 유지", "[9]"]],
      traps: ["a[:]를 깊은 복사로 보기", "+=를 항상 새 리스트 생성으로 보기", "재대입도 원본에 반영된다고 보기"],
    },
    chapter: {
      id: "python-object-graph",
      title: "객체 그래프로 보는 대입·얕은 복사·깊은 복사",
      concept: "얕은 복사는 바깥 리스트만 새로 만들고 내부 객체 주소는 복사하므로 내부 변경은 공유된다.",
      memory: "a→바깥A, b→바깥B, A[0]와 B[0]→같은 내부 리스트",
      bridgeSteps: ["바깥 객체 ID 분리", "내부 객체 공유선 표시", "in-place 변경인지 확인", "바깥 칸 재대입인지 확인", "각 이름에서 최종 그래프 읽기"],
    },
  });

  addPython({
    id: "l3-python-shallow-copy-02",
    concepts: ["shallow-copy", "append", "slice-copy", "reassignment"],
    prerequisites: ["academy-python-shallow-copy", "academy-python-slicing"],
    answer: "[[1, 2, 5], [3, 4]]\n[[1, 2, 5], [9, 2, 5]]",
    code: `def change(rows):
    rows[0].append(5)
    copied = rows[0][:]
    rows[1] = copied
    rows[1][0] = 9
    return rows

a = [[1, 2], [3, 4]]
b = list(a)
same_inner = b[0] is a[0]
if not same_inner:
    raise ValueError("shallow copy expected")

result = change(b)

print(a)
print(result)`,
    solution: {
      summary: "공유된 첫 내부 리스트 append는 a에도 보이고, 복사해 재지정한 b[1] 변경은 a[1]에 영향이 없다.",
      steps: ["list(a)는 바깥만 복사한다.", "b[0]과 a[0]은 같은 리스트다.", "append(5)로 둘 다 [1,2,5]가 된다.", "b[1]=b[0][:]는 새 내부 리스트를 만든다.", "새 리스트 첫 값을 9로 바꿔도 a[1]은 [3,4]다.", "최종 두 바깥 리스트를 그대로 출력한다."],
      table: [["객체", "a가 봄", "b가 봄"], ["첫 내부", "공유", "공유"], ["둘째 내부", "원본", "새 복사"]],
      traps: ["list(a)가 내부까지 복사", "슬라이스 복사도 원본과 공유", "b[1] 재대입이 a의 바깥 칸도 변경"],
    },
    chapter: {
      id: "python-iadd-rebind",
      title: "+=·append·재대입의 객체 변경 차이",
      concept: "리스트 +=와 append는 기존 객체를 바꾸지만 b[i]=새값은 b의 바깥 연결만 바꾼다.",
      memory: "객체 변경은 공유자 모두, 이름/칸 재연결은 그 자리만",
      bridgeSteps: ["연산 대상 객체 확인", "in-place 메서드인지 확인", "새 객체 생성 여부 확인", "공유 중인 다른 경로 갱신", "재대입 후 연결선 다시 그리기"],
    },
  });

  addPython({
    id: "l3-python-dict-set-01",
    concepts: ["dict-comprehension", "enumerate", "set", "intersection"],
    prerequisites: ["academy-python-dict", "academy-python-set"],
    answer: "17 3",
    code: `data = [3, 1, 3, 2, 1]

mapped = {
    index: value * (index + 1)
    for index, value in enumerate(data)
}

unique_values = set(mapped.values())
odd_total = sum(
    value for value in unique_values
    if value % 2 == 1
)

target = {3, 5, 7, 9}
common = unique_values & target

print(odd_total, len(common))`,
    solution: {
      summary: "딕셔너리 값은 3,2,9,8,5이고 홀수 합 17, 목표 집합과 공통 원소는 3개다.",
      steps: ["enumerate 인덱스는 0부터다.", "value*(index+1)은 3,2,9,8,5다.", "모두 달라 set도 같은 다섯 값이다.", "홀수는 3,9,5라 합 17이다.", "target과 교집합은 3,5,9다.", "교집합 길이는 3이다."],
      table: [["index", "원래 값", "mapped"], ["2", "3", "9"], ["4", "1", "5"]],
      traps: ["enumerate를 1부터 시작", "dict의 키를 set으로 만들기", "set 출력 순서에 의존"],
    },
    chapter: {
      id: "python-dict-set-complex",
      title: "dict/set comprehension과 변경 시점",
      concept: "컴프리헨션은 반복 시점의 인덱스와 값을 사용해 새 자료구조를 만들며, 집합은 순서가 아니라 포함과 중복 제거를 본다.",
      memory: "{key:value for ...}, {value for ...}, A & B=교집합",
      bridgeSteps: ["enumerate 쌍 표 작성", "딕셔너리 값 계산", "set으로 중복 제거", "조건 필터 적용", "교집합은 원소 포함만 확인"],
    },
  });

  addPython({
    id: "l3-python-string-pipeline-01",
    concepts: ["split", "strip", "slice", "filter", "join"],
    prerequisites: ["academy-python-string", "academy-python-slicing"],
    answer: "elt|amm|lph",
    code: `raw = "  alpha, Beta, gamma ,DELTA "

parts = [
    part.strip().lower()
    for part in raw.split(",")
]

selected = [
    part[1:-1]
    for part in parts
    if len(part) > 4
]

selected.reverse()
result = "|".join(selected)

print(result)`,
    solution: {
      summary: "공백 제거·소문자화 후 길이 5인 단어의 양끝을 자르고 역순 결합해 elt|amm|lph다.",
      steps: ["split 결과는 네 조각이다.", "strip/lower 후 alpha,beta,gamma,delta다.", "길이 4인 beta는 제외된다.", "[1:-1] 결과는 lph,amm,elt다.", "reverse 후 elt,amm,lph다.", "세 문자열을 |로 연결한다."],
      table: [["단어", "필터", "슬라이스"], ["beta", "제외", "-"], ["delta", "포함", "elt"]],
      traps: ["strip 전에 길이 계산", "슬라이스 끝 인덱스를 포함", "join이 구분자를 끝에도 붙인다고 보기"],
    },
    chapter: {
      id: "python-string-pipeline",
      title: "split→strip→filter→slice→join 파이프라인",
      concept: "한 줄로 읽지 말고 각 단계가 만든 리스트를 별도 줄에 적어야 문자열 변환 순서를 놓치지 않는다.",
      memory: "원문 → 조각 목록 → 정리 목록 → 필터 목록 → 변환 목록 → 결합 문자열",
      bridgeSteps: ["split 조각 그대로 쓰기", "strip/lower 적용", "조건을 조각별 판정", "슬라이스 인덱스 적용", "최종 순서와 구분자 확인"],
    },
  });

  addPython({
    id: "l3-python-slicing-01",
    concepts: ["slicing", "negative-index", "zip", "list-comprehension"],
    prerequisites: ["academy-python-slicing", "academy-python-list"],
    answer: "[1, -4, -9] -12",
    code: `def subtract_pairs(first, second):
    return [
        left - right
        for left, right in zip(first, second)
    ]

data = list(range(12))

left = data[1:10:2]
right = data[-2:1:-3]
combined = subtract_pairs(left, right)

result = combined[::-1]
total = sum(result)

print(result, total)`,
    solution: {
      summary: "left=1,3,5,7,9와 right=10,7,4를 zip해 -9,-4,1을 만들고 뒤집어 합 -12다.",
      steps: ["range(12)는 0부터 11이다.", "left 인덱스는 1,3,5,7,9다.", "right 인덱스는 10,7,4다.", "zip은 짧은 right 길이 3에서 끝난다.", "뺄셈 결과는 -9,-4,1이다.", "뒤집으면 [1,-4,-9], 합은 -12다."],
      table: [["쌍", "계산", "결과"], ["1,10", "1-10", "-9"], ["5,4", "5-4", "1"]],
      traps: ["음수 step에서 stop 포함", "zip이 부족한 값을 채운다고 보기", "뒤집기 전에 출력"],
    },
    chapter: {
      id: "python-slicing-complex",
      title: "음수 인덱스·zip·역순 슬라이싱 복합",
      concept: "슬라이싱은 실제 인덱스 목록을 먼저 만들고 zip은 짧은 쪽에서 끝난다는 규칙을 적용한다.",
      memory: "start에서 출발, stop 직전, step 방향; zip 길이=min",
      bridgeSteps: ["원본 인덱스 표시", "양수 step 목록", "음수 step 목록", "zip 짝 표", "연산 후 역순 여부 확인"],
    },
  });

  const addSql = (spec) => advanced.addL3({
    domain: "SQL",
    prerequisites: ["academy-sql-execution-order", "academy-sql-result-table"],
    sourceRounds: ["2025-1", "2025-2", "2026-1"],
    mistakes: ["join-multiplicity", "sql-intermediate-table"],
    answerMode: "numeric",
    verification: { runtime: "python-sqlite3", status: "fixture-ready" },
    ...spec,
  });

  addSql({
    id: "l3-sql-join-01",
    concepts: ["join", "multiplicity", "cte", "count"],
    answer: "7",
    prompt: "다음 SQL에서 COUNT(*)가 반환하는 행 수를 쓰시오.",
    code: `WITH
A(id) AS (
    SELECT 1 UNION ALL SELECT 1
    UNION ALL SELECT 2
    UNION ALL SELECT 3
),
B(id) AS (
    SELECT 1 UNION ALL SELECT 1
    UNION ALL SELECT 1
    UNION ALL SELECT 2
    UNION ALL SELECT 4
)
SELECT COUNT(*)
FROM A
JOIN B
  ON A.id = B.id;`,
    solution: {
      summary: "id=1은 2×3=6행, id=2는 1×1=1행이므로 JOIN 결과는 7행이다.",
      steps: ["A의 id=1은 두 행이다.", "B의 id=1은 세 행이다.", "같은 키의 모든 조합이 생겨 6행이다.", "id=2는 양쪽 한 행이라 1행이다.", "id=3과 4는 상대가 없어 INNER JOIN에서 제외된다.", "COUNT(*) 결과는 7이다."],
      table: [["키", "A행", "B행", "결과"], ["1", "2", "3", "6"], ["2", "1", "1", "1"]],
      traps: ["키 종류만 세어 2라고 답하기", "2+3으로 5행 계산", "매칭 없는 행도 포함"],
    },
    chapter: {
      id: "sql-join-multiplicity",
      title: "JOIN 1:N 매칭과 행 수 증식",
      concept: "같은 키가 A에 m행, B에 n행이면 그 키의 INNER JOIN 결과는 m×n행이다.",
      memory: "키별 A행 수 × B행 수를 더한다",
      bridgeSteps: ["양쪽 키 빈도표 작성", "매칭 없는 키 제거", "키별 곱 계산", "결과 행 펼치기", "WHERE와 집계는 그 다음"],
    },
  });

  addSql({
    id: "l3-sql-join-subquery-01",
    concepts: ["subquery", "avg", "join", "where", "count"],
    answer: "3",
    prompt: "다음 SQL에서 마지막 COUNT(*)가 반환하는 값을 쓰시오.",
    code: `WITH
dept(dept_id, budget) AS (
    SELECT 1, 100 UNION ALL
    SELECT 2, 200 UNION ALL
    SELECT 3, 300
),
employee(emp_id, dept_id) AS (
    SELECT 10, 1 UNION ALL
    SELECT 11, 2 UNION ALL
    SELECT 12, 3 UNION ALL
    SELECT 13, 3 UNION ALL
    SELECT 14, 3
)
SELECT COUNT(*)
FROM employee e
JOIN dept d ON e.dept_id = d.dept_id
WHERE d.budget > (
    SELECT AVG(budget) FROM dept
);`,
    solution: {
      summary: "부서 평균 예산은 200이고 이를 초과하는 3번 부서 직원이 세 명이라 결과는 3이다.",
      steps: ["서브쿼리 AVG는 (100+200+300)/3=200이다.", "budget>200인 부서는 3번 하나다.", "employee와 dept를 dept_id로 조인한다.", "3번 부서 직원은 12,13,14 세 행이다.", "WHERE가 나머지 부서를 제거한다.", "COUNT(*)는 3이다."],
      table: [["단계", "남은 값"], ["서브쿼리", "200"], ["최종 직원", "12,13,14"]],
      traps: ["AVG를 직원 수로 가중 평균", ">를 >=로 보기", "조인 전 직원 전체를 세기"],
    },
    chapter: {
      id: "sql-join-subquery",
      title: "JOIN + 서브쿼리 AVG 중간 결과표",
      concept: "괄호 속 독립 서브쿼리 값을 먼저 계산하고, 바깥 JOIN 표에 그 상수를 대입해 WHERE를 적용한다.",
      memory: "서브쿼리 한 칸 → JOIN 표 → WHERE 통과표 → COUNT",
      bridgeSteps: ["서브쿼리만 먼저 실행", "비교 상수 기록", "JOIN 중간표 작성", "WHERE 행별 판정", "SELECT 집계"],
    },
  });

  addSql({
    id: "l3-sql-three-value-01",
    concepts: ["null", "three-valued-logic", "and-or", "precedence"],
    answer: "5",
    prompt: "다음 SQL에서 SUM(id)가 반환하는 값을 쓰시오.",
    code: `WITH t(id, x, y) AS (
    SELECT 1, NULL, 1
    UNION ALL SELECT 2, 3, 0
    UNION ALL SELECT 3, 4, NULL
    UNION ALL SELECT 4, 5, 1
), filtered AS (
    SELECT id
    FROM t
    WHERE
        NOT (x = 3)
        AND y = 1
        OR x IS NULL
)
SELECT SUM(id)
FROM filtered;`,
    solution: {
      summary: "AND를 먼저 계산하고 UNKNOWN을 탈락시키면 id 1과 4만 남아 합 5다.",
      steps: ["조건은 (NOT(x=3) AND y=1) OR x IS NULL이다.", "id1은 첫 묶음 UNKNOWN이지만 x IS NULL이 참이라 통과한다.", "id2는 x=3이라 NOT이 거짓이고 탈락한다.", "id3은 y=NULL 때문에 UNKNOWN이고 x도 NULL이 아니라 탈락한다.", "id4는 NOT(false)와 y=1이 모두 참이라 통과한다.", "남은 id 1+4=5다."],
      table: [["id", "첫 묶음", "IS NULL", "통과"], ["1", "UNKNOWN", "T", "예"], ["3", "UNKNOWN", "F", "아니오"]],
      traps: ["UNKNOWN을 false와 완전히 같게 계산", "OR를 AND보다 먼저 계산", "x=NULL로 비교"],
    },
    chapter: {
      id: "sql-three-value-logic",
      title: "NULL의 TRUE·FALSE·UNKNOWN 3값 논리",
      concept: "NULL과 일반 비교 결과는 UNKNOWN이며 WHERE는 최종 결과가 TRUE인 행만 남긴다.",
      memory: "x=NULL 금지, x IS NULL 사용; AND가 OR보다 먼저",
      bridgeSteps: ["괄호로 우선순위 복원", "각 비교를 T/F/U로 표시", "NOT 적용", "AND 표 계산", "OR 계산 후 TRUE만 선택"],
    },
  });

  addSql({
    id: "l3-sql-null-aggregate-01",
    concepts: ["group-by", "count-star", "count-column", "null", "having"],
    answer: "3",
    prompt: "다음 SQL에서 SUM(non_nulls)가 반환하는 값을 쓰시오.",
    code: `WITH scores(dept, score) AS (
    SELECT 'A', 10 UNION ALL
    SELECT 'A', NULL UNION ALL
    SELECT 'A', 20 UNION ALL
    SELECT 'B', NULL UNION ALL
    SELECT 'B', NULL UNION ALL
    SELECT 'C', 30
), grouped AS (
    SELECT dept,
           COUNT(*) AS all_rows,
           COUNT(score) AS non_nulls
    FROM scores
    GROUP BY dept
    HAVING COUNT(score) >= 1
)
SELECT SUM(non_nulls)
FROM grouped;`,
    solution: {
      summary: "A의 non_nulls는 2, C는 1이고 B는 HAVING에서 빠져 합 3이다.",
      steps: ["A에는 세 행, score 값은 두 개다.", "B에는 두 행이지만 score 값은 0개다.", "C에는 한 행과 한 값이 있다.", "COUNT(score)>=1이라 B 그룹은 제거된다.", "grouped에는 A(2), C(1)가 남는다.", "SUM(non_nulls)는 3이다."],
      table: [["dept", "COUNT(*)", "COUNT(score)"], ["A", "3", "2"], ["B", "2", "0"]],
      traps: ["COUNT(score)가 NULL도 셈", "HAVING을 원본 행에 적용", "B의 COUNT(*)가 0이라고 계산"],
    },
    chapter: {
      id: "sql-null-aggregate",
      title: "COUNT(*)·COUNT(col)·AVG와 NULL",
      concept: "COUNT(*)는 행, COUNT(col)과 AVG(col)은 NULL이 아닌 값만 대상으로 한다.",
      memory: "별표=행, 컬럼=값 있는 칸, AVG 분모=값 개수",
      bridgeSteps: ["그룹별 원본 행 표", "NULL 아닌 값만 표시", "COUNT 두 종류 분리", "AVG 분자·분모 계산", "HAVING은 그룹 결과에 적용"],
    },
  });

  addSql({
    id: "l3-sql-group-having-01",
    concepts: ["group-by", "avg", "count", "having", "derived-table"],
    answer: "1",
    prompt: "다음 SQL에서 최종 COUNT(*)가 반환하는 값을 쓰시오.",
    code: `WITH t(grp, value) AS (
    SELECT 'A', 10 UNION ALL
    SELECT 'A', 20 UNION ALL
    SELECT 'A', NULL UNION ALL
    SELECT 'B', 5 UNION ALL
    SELECT 'B', NULL UNION ALL
    SELECT 'C', NULL
), passed AS (
    SELECT grp,
           AVG(value) AS avg_value,
           COUNT(*) AS row_count
    FROM t
    GROUP BY grp
    HAVING AVG(value) >= 10
       AND COUNT(*) > 2
)
SELECT COUNT(*)
FROM passed;`,
    solution: {
      summary: "A만 평균 15이면서 전체 행 수 3이라 두 HAVING 조건을 모두 만족해 결과 1이다.",
      steps: ["A의 AVG는 NULL 제외 (10+20)/2=15다.", "A의 COUNT(*)는 NULL 행 포함 3이다.", "B의 AVG는 5이고 행 수는 2다.", "C의 AVG는 NULL이라 비교 결과 UNKNOWN이다.", "두 조건을 모두 만족하는 그룹은 A뿐이다.", "passed의 행 수는 1이다."],
      table: [["grp", "AVG", "COUNT(*)", "통과"], ["A", "15", "3", "예"], ["C", "NULL", "1", "아니오"]],
      traps: ["A 평균을 10으로 계산", "COUNT(*)도 NULL 제외", "NULL>=10을 참이나 거짓 숫자로 계산"],
    },
    chapter: {
      id: "sql-group-having-table",
      title: "GROUP BY·HAVING 단계별 임시표",
      concept: "WHERE는 행을, HAVING은 GROUP BY로 만든 그룹 요약 행을 거른다.",
      memory: "FROM/JOIN → WHERE → GROUP 묶음 → 집계표 → HAVING → SELECT",
      bridgeSteps: ["원본 행 확정", "그룹별 묶음 표시", "집계 열 계산", "HAVING 조건을 그룹 행에 적용", "최종 SELECT 출력"],
    },
  });

  advanced.addChapter("SQL", {
    id: "sql-execution-pipeline",
    title: "SQL 전체 실행 순서와 중간표",
    concept: "작성 순서가 아니라 FROM/JOIN, WHERE, GROUP BY, HAVING, SELECT, ORDER BY 순으로 임시표를 만든다.",
    memory: "프-조-웨-그-해-셀-오",
    bridgeSteps: ["FROM/JOIN 표", "WHERE 통과표", "GROUP 묶음", "HAVING 통과 그룹", "SELECT 열", "ORDER BY 정렬"],
    practiceIds: ["l3-sql-join-subquery-01"],
  });
  advanced.addChapter("SQL", {
    id: "sql-set-operations",
    title: "UNION·INTERSECT·EXCEPT 결과표",
    concept: "집합 연산은 두 SELECT의 열 수와 타입을 맞춘 뒤 중복 유지 여부와 방향을 확인한다.",
    memory: "UNION 중복 제거, UNION ALL 유지, INTERSECT 공통, EXCEPT 앞-뒤",
    bridgeSteps: ["왼쪽 결과 목록", "오른쪽 결과 목록", "중복 표시", "연산 방향 적용", "ORDER BY는 마지막"],
    practiceIds: ["exam-sql-set-ops-1"],
  });
  advanced.addChapter("SQL", {
    id: "sql-foreign-key-ddl",
    title: "FOREIGN KEY 완성형 DDL",
    concept: "자식 열 선언, 부모 테이블·열 지정, 삭제·수정 동작을 문법 위치에 맞춰 쓴다.",
    memory: "FOREIGN KEY(자식열) REFERENCES 부모(기본키) ON DELETE ...",
    bridgeSteps: ["자식 테이블 확인", "제약 이름", "외래키 열", "부모 대상", "연쇄 동작"],
    practiceIds: ["master-foreign-key-ddl-q2"],
  });

  advanced.attachChapters();
})();
