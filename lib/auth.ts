const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LoginErrors = {
  email?: string;
  password?: string;
  form?: string;
};

export type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  form?: string;
};

export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};
  if (!email.trim()) {
    errors.email = "이메일을 적어 주세요.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "이메일 형식을 확인해 주세요.";
  }
  if (!password) {
    errors.password = "비밀번호를 적어 주세요.";
  }
  return errors;
}

export function validateSignup(input: {
  name: string;
  email: string;
  password: string;
  confirm: string;
}): SignupErrors {
  const errors: SignupErrors = {};
  const name = input.name.trim();

  if (name.length < 2) {
    errors.name = "이름을 두 글자 이상 적어 주세요.";
  } else if (name.length > 20) {
    errors.name = "이름은 스무 글자를 넘길 수 없습니다.";
  }

  if (!input.email.trim()) {
    errors.email = "이메일을 적어 주세요.";
  } else if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = "이메일 형식을 확인해 주세요.";
  }

  if (input.password.length < 6) {
    errors.password = "비밀번호는 여섯 글자 이상이어야 합니다.";
  }

  if (input.confirm !== input.password) {
    errors.confirm = "비밀번호가 서로 다릅니다.";
  }

  return errors;
}

export function displayNameFromMetadata(
  metadata: Record<string, unknown> | undefined | null,
): string {
  if (!metadata) return "";
  const candidates = [metadata.full_name, metadata.name, metadata.given_name];
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function mapAuthError(message: string): string {
  const text = message.toLowerCase();
  if (text.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (text.includes("email not confirmed")) {
    return "이메일 확인이 끝나지 않았습니다. 받은 편지함을 확인해 주세요.";
  }
  if (text.includes("user already registered") || text.includes("already been registered")) {
    return "이미 가입된 이메일입니다.";
  }
  if (text.includes("provider is not enabled") || text.includes("unsupported provider")) {
    return "구글 로그인이 아직 열려 있지 않습니다.";
  }
  if (text.includes("oauth") || text.includes("exchange external code")) {
    return "구글 로그인을 끝내지 못했습니다. 다시 시도해 주세요.";
  }
  if (text.includes("password")) {
    return "비밀번호를 다시 확인해 주세요.";
  }
  return "지금은 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.";
}
