import { formatSeoulDate } from "@/lib/date";

export type FortuneRequest = {
  name: string;
  birthdate: string;
};

export type FortuneResponse = {
  greeting: string;
  dateLabel: string;
  body: string;
  advice: string;
};

export const REQUEST_STORAGE_KEY = "today-letter-request";

export function clearFortuneRequest() {
  sessionStorage.removeItem(REQUEST_STORAGE_KEY);
}

const MIN_YEAR = 1900;
const NAME_MIN = 2;
const NAME_MAX = 20;

export type FieldErrors = {
  name?: string;
  birthdate?: string;
};

export function validateFortuneRequest(
  input: FortuneRequest,
  todayIso: string,
): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();

  if (name.length < NAME_MIN) {
    errors.name = "이름을 두 글자 이상 적어 주세요.";
  } else if (name.length > NAME_MAX) {
    errors.name = "이름은 스무 글자를 넘길 수 없습니다.";
  }

  if (!input.birthdate) {
    errors.birthdate = "태어난 날을 선택해 주세요.";
  } else if (input.birthdate > todayIso) {
    errors.birthdate = "태어난 날은 오늘 이전이어야 합니다.";
  } else if (input.birthdate < `${MIN_YEAR}-01-01`) {
    errors.birthdate = "1900년 이후의 날짜를 선택해 주세요.";
  }

  return errors;
}

function hashSeed(value: string): number {
  let hash = 0;
  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }
  return hash;
}

// Synthetic copy for the UI-only phase. Replace in POST /api/fortune when Claude is wired.
const LETTERS: Array<{ body: string; advice: string }> = [
  {
    body: [
      "아침부터 할 일이 겹쳐 보여도, 한 가지만 먼저 끝내는 쪽이 나머지를 쉽게 만듭니다. 점심 전에 그 한 가지를 표시해 두세요.",
      "사람과의 대화에서는 설명을 줄이고 질문을 조금 더 하세요. 상대가 먼저 말을 열 자리가 생깁니다.",
      "돈과 관련된 결정은 오늘 확정하지 마세요. 숫자를 적어 두고 내일 다시 보면 충분합니다.",
    ].join("\n\n"),
    advice: "오늘 걷는 길에서 창문을 한 번 열어 두세요.",
  },
  {
    body: [
      "오늘은 속도를 내기보다 순서를 고르는 날입니다. 가장 시끄러운 일부터 손대지 말고, 가장 짧은 일부터 치우세요.",
      "오후에 누군가의 부탁이 들어와도 바로 맡지 않아도 됩니다. 오늘 안에 가능한지 한 번만 묻고, 아니면 내일로 미루세요.",
      "몸 상태는 나쁘지 않지만 오래 앉아 있으면 생각이 무거워집니다. 한 시간마다 자리에서 일어나는 것만으로도 저녁이 달라집니다.",
    ].join("\n\n"),
    advice: "저녁 먹기 전에 물 한 잔을 먼저 드세요.",
  },
  {
    body: [
      "오늘은 새로운 계획을 더하지 마세요. 이미 적어 둔 것 중 하나만 실제로 움직이면 충분합니다.",
      "가까운 사람에게는 괜찮은 척보다 구체적인 한 줄을 전하는 편이 낫습니다. 길게 쓰지 않아도 됩니다.",
      "지출은 습관적인 것만 유지하세요. 마음에 드는 물건이 보여도, 장바구니에만 두고 하루를 넘기세요.",
    ].join("\n\n"),
    advice: "오늘 신는 신발의 끈을 다시 한 번 매세요.",
  },
];

export function buildMockFortune(name: string, birthdate: string): FortuneResponse {
  const trimmed = name.trim();
  const letter = LETTERS[hashSeed(`${trimmed}:${birthdate}`) % LETTERS.length];

  return {
    greeting: `${trimmed} 님, 오늘은 서두르지 않아도 되는 날입니다.`,
    dateLabel: formatSeoulDate(),
    body: letter.body,
    advice: letter.advice,
  };
}
