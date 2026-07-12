(function () {
  const advanced = window.ADVANCED_2025;
  if (!advanced) return;

  const base = {
    domain: "C",
    prerequisites: ["academy-c-pointer", "academy-c-trace"],
    sourceRounds: ["2025-1", "2025-2", "2026-1"],
    mistakes: ["pointer-target", "state-trace"],
  };

  function add(spec) {
    advanced.addL3({ ...base, ...spec });
  }

  add({
    id: "l3-c-dynamic-2d-01",
    concepts: ["double-pointer", "malloc", "index-remap", "conditional-sum"],
    prerequisites: ["academy-c-double-pointer", "academy-c-dynamic-2d"],
    estimatedMinutes: 9,
    traceSteps: 14,
    answer: "105",
    code: `#include <stdio.h>
#include <stdlib.h>

void fill(int **a, int r, int c) {
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            a[i][j] = (i + 1) * 10 + j;
}

int main(void) {
    int r = 3, c = 3, sum = 0;
    int **a = malloc(sizeof(int *) * r);
    for (int i = 0; i < r; i++)
        a[i] = malloc(sizeof(int) * c);
    fill(a, r, c);
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            if ((i + j) % 2 == 0) sum += a[j][i];
    printf("%d", sum);
    for (int i = 0; i < r; i++) free(a[i]);
    free(a);
    return 0;
}`,
    solution: {
      summary: "3x3 힙 배열을 만든 뒤 짝수 좌표에서 행과 열을 바꿔 읽어 105를 더한다.",
      steps: [
        "a는 세 개의 행 포인터를 가리킨다.",
        "각 행에 정수 세 칸을 따로 할당한다.",
        "fill 결과는 10~12, 20~22, 30~32다.",
        "(i+j)가 짝수인 다섯 좌표만 남긴다.",
        "a[j][i]이므로 좌표를 뒤집어 10, 30, 21, 12, 32를 읽는다.",
        "합은 105이며 free는 출력값을 바꾸지 않는다.",
      ],
      table: [["좌표", "읽는 칸", "값"], ["0,2", "a[2][0]", "30"], ["2,0", "a[0][2]", "12"]],
      traps: ["a[i][j]로 그대로 읽기", "malloc 크기를 값으로 착각하기", "free를 계산 과정으로 세기"],
    },
    chapter: {
      id: "c-memory-dynamic-2d",
      title: "스택·힙·이중 포인터와 동적 2차원 배열",
      concept: "int **a는 행 자체가 아니라 힙에 따로 만든 행들을 가리키는 주소 목록이다.",
      memory: "a -> [행0 주소][행1 주소][행2 주소], 각 주소 -> 정수 배열",
      bridgeSteps: ["p, *p, pp, *pp, **pp를 한 겹씩 번역", "행 포인터 배열과 각 행을 따로 그림", "인덱스 변환 뒤 실제 칸을 표시", "안쪽 행부터 free"],
    },
  });

  add({
    id: "l3-c-dynamic-2d-02",
    concepts: ["double-pointer", "malloc", "modulo-index", "nested-loop"],
    prerequisites: ["academy-c-double-pointer", "academy-c-dynamic-2d"],
    answer: "18",
    code: `#include <stdio.h>
#include <stdlib.h>

void init(int **a, int r, int c) {
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            a[i][j] = i * c + j + 1;
}

int main(void) {
    int r = 2, c = 4, result = 0;
    int **a = malloc(r * sizeof(*a));
    for (int i = 0; i < r; i++)
        a[i] = malloc(c * sizeof(**a));
    init(a, r, c);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if ((i + j) % 2 == 1)
                result += a[(i + 1) % r][(j + 2) % c];
        }
    }
    printf("%d", result);
    for (int i = 0; i < r; i++) free(a[i]);
    free(a);
    return 0;
}`,
    solution: {
      summary: "홀수 좌표 네 개에서 행은 반대로, 열은 두 칸 회전해 8+6+3+1을 더한다.",
      steps: ["배열은 [1,2,3,4]와 [5,6,7,8]이다.", "홀수 좌표는 (0,1),(0,3),(1,0),(1,2)다.", "행 인덱스는 (i+1)%2로 뒤집힌다.", "열 인덱스는 (j+2)%4로 두 칸 회전한다.", "읽는 값은 8,6,3,1이다.", "합은 18이다."],
      table: [["원래", "변환", "값"], ["0,1", "1,3", "8"], ["1,2", "0,0", "1"]],
      traps: ["나머지 연산을 생략", "조건이 참인 좌표와 읽는 좌표를 혼동", "행과 열 크기를 뒤바꿈"],
    },
  });

  add({
    id: "l3-c-linked-list-01",
    concepts: ["linked-list", "detach", "reconnect", "traversal"],
    prerequisites: ["academy-c-pointer", "academy-c-linked-list"],
    answer: "3124",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int value;
    struct Node *next;
} Node;

int main(void) {
    Node *head = NULL, *tail = NULL;
    for (int i = 1; i <= 4; i++) {
        Node *n = malloc(sizeof(Node));
        n->value = i; n->next = NULL;
        if (head == NULL) head = n;
        else tail->next = n;
        tail = n;
    }
    Node *prev = head->next;
    Node *curr = prev->next;
    prev->next = curr->next;
    curr->next = head;
    head = curr;
    for (Node *p = head; p != NULL; p = p->next)
        printf("%d", p->value);
    while (head) { Node *p = head; head = head->next; free(p); }
    return 0;
}`,
    solution: {
      summary: "1→2→3→4에서 3을 떼어 맨 앞에 붙이므로 3→1→2→4가 된다.",
      steps: ["동적 노드 네 개를 1→2→3→4로 연결한다.", "prev는 값 2 노드다.", "curr는 값 3 노드다.", "prev->next를 4로 바꿔 3을 분리한다.", "curr->next를 기존 head 1로 연결한다.", "head를 curr로 바꾸고 3124를 순회 출력한다."],
      table: [["단계", "head", "연결"], ["초기", "1", "1-2-3-4"], ["완료", "3", "3-1-2-4"]],
      traps: ["prev와 curr를 같은 노드로 보기", "분리 전에 head를 변경", "선언 순서대로 출력"],
    },
    chapter: {
      id: "c-linked-list-rewire",
      title: "연결 리스트 생성·분리·재연결",
      concept: "노드 주소를 외우지 말고 head, prev, curr와 next 화살표만 단계별로 갱신한다.",
      memory: "분리: prev->next=curr->next, 앞 삽입: curr->next=head; head=curr",
      bridgeSteps: ["동적 노드 생성", "head에서 목표 전 노드 탐색", "목표 노드 분리", "새 위치에 재연결", "NULL까지 순회 후 해제"],
    },
  });

  add({
    id: "l3-c-linked-list-02",
    concepts: ["linked-list", "head-insert", "search", "tail-move"],
    prerequisites: ["academy-c-pointer", "academy-c-linked-list"],
    answer: "53124",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int v; struct Node *next; } Node;

Node *push(Node *head, int v) {
    Node *n = malloc(sizeof(Node));
    n->v = v; n->next = head;
    return n;
}

int main(void) {
    Node *head = NULL;
    for (int i = 3; i >= 1; i--) head = push(head, i);
    Node *tail = head;
    while (tail->next) tail = tail->next;
    tail->next = push(NULL, 4);
    tail = tail->next;
    tail->next = push(NULL, 5);
    Node *prev = head, *curr = head->next;
    while (curr->v != 5) { prev = curr; curr = curr->next; }
    prev->next = NULL;
    curr->next = head;
    head = curr;
    for (Node *p = head; p; p = p->next) printf("%d", p->v);
    while (head) { Node *p = head; head = head->next; free(p); }
    return 0;
}`,
    solution: {
      summary: "1→2→3→4→5에서 5를 찾고 앞에 붙여 5→1→2→3→4를 만든다.",
      steps: ["push 반복으로 1→2→3을 만든다.", "tail 뒤에 4와 5를 붙인다.", "prev와 curr를 함께 움직여 curr=5를 찾는다.", "prev는 4이므로 prev->next=NULL로 끝을 자른다.", "5의 next를 기존 head 1로 연결한다.", "새 head 5부터 53124를 출력한다."],
      table: [["포인터", "탐색 끝", "역할"], ["prev", "4", "이전 끝"], ["curr", "5", "이동 노드"]],
      traps: ["push 순서를 거꾸로 계산", "prev->next를 끊지 않기", "curr->next 변경 뒤 기존 head를 잃기"],
    },
  });

  add({
    id: "l3-c-struct-string-01",
    concepts: ["struct", "char-pointer", "malloc", "lifetime"],
    prerequisites: ["academy-c-struct", "academy-c-pointer"],
    answer: "ABC12",
    code: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char *name;
    int value;
} Item;

int main(void) {
    Item items[3];
    int total = 0;
    for (int i = 0; i < 3; i++) {
        items[i].name = malloc(2);
        items[i].name[0] = (char)('A' + i);
        items[i].name[1] = '\\0';
        items[i].value = (i + 1) * 2;
    }
    Item *p = items;
    for (int i = 0; i < 3; i++) {
        printf("%s", (p + i)->name);
        total += (p + i)->value;
    }
    printf("%d", total);
    for (int i = 0; i < 3; i++) free(items[i].name);
    return 0;
}`,
    solution: {
      summary: "각 구조체가 힙의 한 글자 문자열을 가리키며 A,B,C와 값 합 12를 출력한다.",
      steps: ["items는 구조체 세 칸짜리 배열이다.", "각 name에는 문자 두 칸을 동적 할당한다.", "첫 문자는 A,B,C이고 둘째는 널 문자다.", "값은 2,4,6이다.", "(p+i)->name으로 ABC를 출력한다.", "값 합 12를 붙여 ABC12가 된다."],
      table: [["i", "name", "value"], ["0", "A", "2"], ["2", "C", "6"]],
      traps: ["널 문자 공간을 빼먹기", ".과 ->를 혼동", "문자열 주소를 값으로 출력"],
    },
    chapter: {
      id: "c-struct-string-lifetime",
      title: "구조체·문자열·동적 메모리 수명",
      concept: "구조체 안 char *는 문자열 자체가 아니라 문자열이 있는 메모리의 주소다.",
      memory: "Item 칸: [name 주소][value], name 주소 -> 힙 문자 배열 + \\0",
      bridgeSteps: ["리터럴 포인터와 문자 배열 구분", "널 문자까지 공간 계산", "구조체 배열의 . 사용", "구조체 포인터의 -> 사용", "name을 각각 free"],
    },
  });

  add({
    id: "l3-c-function-pointer-01",
    concepts: ["function-pointer", "pointer-return", "dereference", "array"],
    prerequisites: ["academy-c-function-pointer", "academy-c-pointer"],
    answer: "12 5",
    code: `#include <stdio.h>

int *pick(int *a, int n) {
    int *best = a;
    for (int i = 1; i < n; i++) {
        if (a[i] % 3 > *best % 3)
            best = &a[i];
    }
    return best;
}

int main(void) {
    int a[] = {4, 8, 5, 10};
    int *(*fn)(int *, int) = pick;
    int *p = fn(a, 4);
    *p += a[0];
    p++;
    printf("%d %d", a[1], *p);
    return 0;
}`,
    solution: {
      summary: "fn이 반환한 a[1] 주소의 값을 12로 바꾸고 p를 a[2]로 옮겨 12 5를 출력한다.",
      steps: ["fn은 int*를 받아 int*를 반환하는 pick을 가리킨다.", "나머지는 1,2,2,1이다.", "같을 때는 갱신하지 않아 best는 a[1]이다.", "*p += a[0]으로 a[1]은 8+4=12다.", "p++로 a[2]를 가리킨다.", "a[1]과 *p를 출력해 12 5다."],
      table: [["대상", "주소", "값"], ["pick 반환", "&a[1]", "8"], ["p++", "&a[2]", "5"]],
      traps: ["fn의 반환값을 int로 보기", "같은 나머지에서 best를 바꾸기", "p++를 값 증가로 보기"],
    },
    chapter: {
      id: "c-function-pointer-return",
      title: "포인터를 반환하는 함수 포인터",
      concept: "int* (*fn)(int*, int)는 함수 주소이며 fn(...) 결과는 다시 역참조할 수 있는 int*다.",
      memory: "fn -> 함수, fn(a,n) -> int 주소, *fn(a,n) -> 그 주소의 정수",
      bridgeSteps: ["선언을 괄호 중심으로 읽기", "인자 타입 확인", "반환 타입 int* 확인", "반환 주소를 배열 칸에 연결", "재역참조와 포인터 이동"],
    },
  });

  add({
    id: "l3-c-function-pointer-02",
    concepts: ["function-pointer-array", "loop", "dynamic-dispatch", "accumulator"],
    prerequisites: ["academy-c-function-pointer", "academy-c-trace"],
    answer: "5",
    code: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }
int sub(int a, int b) { return a - b; }

int run(int (**ops)(int, int), int n) {
    int result = 1;
    for (int i = 0; i < n; i++)
        result = ops[i](result, i + 2);
    return result;
}

int main(void) {
    int (*ops[3])(int, int) = {add, mul, sub};
    int (**p)(int, int) = ops;
    int answer = run(p, 3);
    printf("%d", answer);
    return 0;
}`,
    solution: {
      summary: "함수 포인터 배열을 add→mul→sub 순서로 적용해 1→3→9→5가 된다.",
      steps: ["ops[0]은 add다.", "초깃값 result는 1이다.", "add(1,2)로 3이다.", "mul(3,3)으로 9다.", "sub(9,4)로 5다.", "run 반환값 5를 출력한다."],
      table: [["i", "함수", "result"], ["0", "add", "3"], ["2", "sub", "5"]],
      traps: ["함수 선언 순서와 배열 순서를 혼동", "i 대신 i+2를 놓침", "ops 자체를 호출 결과로 보기"],
    },
  });

  add({
    id: "l3-c-array-pointer-01",
    concepts: ["pointer-to-array", "function-parameter", "nested-loop", "mutation"],
    prerequisites: ["academy-c-array-pointer", "academy-c-pointer"],
    answer: "12",
    code: `#include <stdio.h>

void transform(int (*a)[3], int rows) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < 3; j++) {
            a[i][j] += i + j;
        }
    }
}

int main(void) {
    int data[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    int (*p)[3] = data;
    transform(p, 2);
    int result = p[0][2] + (*(p + 1))[1];
    printf("%d", result);
    return 0;
}`,
    solution: {
      summary: "각 칸에 행+열을 더한 뒤 0행 2열의 5와 1행 1열의 7을 더한다.",
      steps: ["p는 정수 하나가 아니라 정수 세 칸짜리 행을 가리킨다.", "0행은 1,3,5가 된다.", "1행은 5,7,9가 된다.", "p[0][2]는 5다.", "(*(p+1))[1]은 두 번째 행의 7이다.", "합은 12다."],
      table: [["행", "변환 전", "변환 후"], ["0", "1 2 3", "1 3 5"], ["1", "4 5 6", "5 7 9"]],
      traps: ["p+1을 정수 한 칸 이동으로 보기", "i+j를 한 번만 더하기", "배열 포인터 괄호를 무시"],
    },
  });

  add({
    id: "l3-c-double-pointer-01",
    concepts: ["double-pointer", "pointer-retarget", "mutation", "alias"],
    prerequisites: ["academy-c-double-pointer", "academy-c-pointer"],
    answer: "21 7 18",
    code: `#include <stdio.h>

int main(void) {
    int a = 3;
    int b = 7;
    int c = 11;
    int *p = &a;
    int *q = &b;
    int **pp = &p;

    *pp = &c;
    **pp += *q;

    pp = &q;
    *pp = &a;
    **pp += c;

    printf("%d %d %d", a, b, c);
    return 0;
}`,
    solution: {
      summary: "pp를 통해 p와 q의 목표를 바꾸며 c는 18, a는 21이 된다.",
      steps: ["처음 p→a, q→b, pp→p다.", "*pp=&c로 p→c가 된다.", "**pp += *q는 c=11+7=18이다.", "pp=&q로 pp→q가 된다.", "*pp=&a로 q→a가 된다.", "**pp += c는 a=3+18=21이다."],
      table: [["시점", "p", "q"], ["초기", "a", "b"], ["완료", "c", "a"]],
      traps: ["*pp와 **pp를 같은 것으로 보기", "포인터 재지정을 값 대입으로 보기", "변경된 c=18을 놓치기"],
    },
  });

  add({
    id: "l3-c-union-bit-01",
    concepts: ["union", "bitwise-xor", "shift", "mask"],
    prerequisites: ["academy-c-bit", "academy-c-union"],
    answer: "49",
    code: `#include <stdio.h>

typedef union {
    unsigned int value;
} Data;

unsigned int update(Data *d) {
    d->value ^= 0x0Fu;
    d->value >>= 1;
    d->value |= 0x20u;
    return d->value;
}

int main(void) {
    Data d;
    d.value = 0x2Du;
    unsigned int result = update(&d);
    printf("%u", result);
    return 0;
}`,
    solution: {
      summary: "0x2D에 XOR, 오른쪽 시프트, OR를 적용해 0x31 즉 49가 된다.",
      steps: ["0x2D는 이진수 0010 1101이다.", "0x0F와 XOR하면 0010 0010, 0x22다.", "오른쪽 한 칸 이동하면 0001 0001, 0x11이다.", "0x20과 OR하면 0011 0001, 0x31이다.", "0x31은 십진수 49다.", "unsigned를 사용해 부호 시프트 문제를 피한다."],
      table: [["연산", "16진수", "10진수"], ["XOR", "22", "34"], ["OR", "31", "49"]],
      traps: ["XOR를 거듭제곱으로 보기", "16진수 31을 십진수 31로 보기", "부호 있는 시프트에 의존"],
    },
    chapter: {
      id: "c-union-bit",
      title: "공용체 메모리와 안전한 비트 연산",
      concept: "공용체는 같은 메모리를 공유한다. 출력 문제는 타입 재해석의 플랫폼 차이를 피하고 명시된 unsigned 값의 마스크 연산을 추적한다.",
      memory: "AND는 끄기, OR는 켜기, XOR는 뒤집기, shift는 비트 이동",
      bridgeSteps: ["16진수를 4비트씩 변환", "마스크 연산 한 단계씩 기록", "unsigned 여부 확인", "시프트 후 빈 비트 확인", "출력 진법으로 변환"],
    },
  });

  add({
    id: "l3-c-char-insert-01",
    concepts: ["char-array", "null-terminator", "backward-shift", "insertion"],
    prerequisites: ["academy-c-string", "academy-c-array"],
    answer: "COXDE",
    code: `#include <stdio.h>
#include <string.h>

void insert(char *s, int pos, char ch) {
    int len = (int)strlen(s);
    for (int i = len; i >= pos; i--)
        s[i + 1] = s[i];
    s[pos] = ch;
}

int main(void) {
    char text[10] = "CODE";
    int position = 2;
    insert(text, position, 'X');
    for (int i = 0; text[i] != '\\0'; i++)
        putchar(text[i]);
    return 0;
}`,
    solution: {
      summary: "널 문자까지 뒤에서 오른쪽으로 옮긴 뒤 2번 칸에 X를 넣어 COXDE가 된다.",
      steps: ["CODE의 길이는 4이고 널 문자는 4번 칸이다.", "i=4에서 널 문자를 5번으로 옮긴다.", "i=3에서 E를 4번으로 옮긴다.", "i=2에서 D를 3번으로 옮긴다.", "2번 칸에 X를 넣는다.", "널 문자 전까지 COXDE를 출력한다."],
      table: [["단계", "배열"], ["이동 후", "CODDE\\0"], ["삽입 후", "COXDE\\0"]],
      traps: ["앞에서부터 이동해 문자를 덮어쓰기", "널 문자를 옮기지 않기", "pos를 1부터 세기"],
    },
    chapter: {
      id: "c-char-array-shift",
      title: "문자 배열 삽입·이동·널 종료",
      concept: "오른쪽 삽입은 마지막 널 문자부터 뒤로 옮겨야 아직 복사하지 않은 문자를 덮어쓰지 않는다.",
      memory: "오른쪽 이동은 뒤에서 앞으로, 왼쪽 이동은 앞에서 뒤로",
      bridgeSteps: ["문자 인덱스와 널 위치 표시", "배열 여유 공간 확인", "len부터 역순 이동", "삽입 위치 대입", "널까지 출력 범위 확인"],
    },
  });

  add({
    id: "l3-c-control-flow-01",
    concepts: ["nested-control", "modulo", "accumulator", "function-call"],
    prerequisites: ["academy-c-loop", "academy-c-trace"],
    answer: "17",
    code: `#include <stdio.h>

int calculate(int n) {
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        if (i % 2 == 0)
            sum += i * 2;
        else
            sum -= i;
        if (sum % 3 == 0)
            sum += 1;
    }
    return sum;
}

int main(void) {
    int value = calculate(6);
    printf("%d", value);
    return 0;
}`,
    solution: {
      summary: "홀수는 빼고 짝수는 두 배로 더한 뒤 3의 배수이면 1을 더해 최종 17이다.",
      steps: ["i=1이면 sum=-1이다.", "i=2이면 3이 된 뒤 보정해 4다.", "i=3이면 1이다.", "i=4이면 9가 된 뒤 보정해 10이다.", "i=5이면 5다.", "i=6이면 17이다."],
      table: [["i", "본 연산 후", "보정 후"], ["2", "3", "4"], ["4", "9", "10"]],
      traps: ["두 번째 if를 else-if로 보기", "보정된 sum을 다음 반복에 반영하지 않기", "홀수도 더하기"],
    },
    chapter: {
      id: "c-long-trace-safety",
      title: "장문 제어 흐름과 정의되지 않은 동작 회피",
      concept: "각 반복에서 조건식, 본 연산, 후속 보정을 별도 열로 적으면 중첩 if도 한 줄씩 풀린다.",
      memory: "한 표현식에서 같은 변수 여러 번 변경, 미초기화, 범위 초과, 해제 후 접근은 출제 데이터에서 금지",
      bridgeSteps: ["반복 시작값 기록", "첫 조건 결과 기록", "대입 직후 값 갱신", "독립된 다음 if 실행", "다음 반복으로 전달"],
    },
  });

  add({
    id: "l3-c-struct-array-01",
    concepts: ["struct-array", "swap", "sorting", "weighted-sum"],
    prerequisites: ["academy-c-struct", "academy-c-loop"],
    answer: "ACB10",
    code: `#include <stdio.h>

typedef struct {
    char id;
    int score;
} Record;

int main(void) {
    Record data[3] = {{'A', 3}, {'B', 1}, {'C', 2}};
    for (int i = 0; i < 2; i++) {
        for (int j = i + 1; j < 3; j++) {
            if (data[i].score < data[j].score) {
                Record temp = data[i];
                data[i] = data[j];
                data[j] = temp;
            }
        }
    }
    int total = 0;
    for (int i = 0; i < 3; i++) {
        putchar(data[i].id);
        total += data[i].score * (i + 1);
    }
    printf("%d", total);
    return 0;
}`,
    solution: {
      summary: "점수 내림차순으로 A,C,B가 되고 위치 가중합은 3×1+2×2+1×3=10이다.",
      steps: ["초기 순서는 A3,B1,C2다.", "i=0에서 A3은 가장 커 그대로다.", "i=1에서 B1과 C2를 교환한다.", "최종 순서는 A3,C2,B1이다.", "문자는 ACB로 출력된다.", "가중합은 3+4+3=10이다."],
      table: [["위치", "레코드", "가중값"], ["1", "A3", "3"], ["3", "B1", "3"]],
      traps: ["구조체의 score만 바꾸고 id를 놓침", "오름차순으로 정렬", "가중치 i를 0부터 곱함"],
    },
    chapter: {
      id: "c-struct-array-sort",
      title: "구조체 배열과 레코드 단위 교환",
      concept: "정렬할 때 필드 하나가 아니라 구조체 전체를 교환해야 id와 score의 짝이 유지된다.",
      memory: "Record temp=data[i]; data[i]=data[j]; data[j]=temp",
      bridgeSteps: ["레코드별 필드 표 작성", "비교 조건 방향 확인", "전체 구조체 교환", "최종 배열 확정", "출력과 누적을 별도로 계산"],
    },
  });
})();
