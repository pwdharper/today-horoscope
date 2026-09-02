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
