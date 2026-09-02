import Anthropic from "@anthropic-ai/sdk";
import { formatSeoulDate } from "@/lib/date";
import type { FortuneResponse } from "@/lib/fortune";

const TOOL_NAME = "write_today_letter";

export class FortuneConfigError extends Error {
  constructor() {
    super("missing-api-key");
    this.name = "FortuneConfigError";
  }
}

export class FortuneGenerationError extends Error {
  constructor(message = "fortune-failed") {
    super(message);
    this.name = "FortuneGenerationError";
  }
}

function readText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readEnv(name: string): string | undefined {
  const value = process.env[name];
  return value?.trim() ? value.trim() : undefined;
}

const MODEL = readEnv("ANTHROPIC_MODEL") ?? "claude-sonnet-4-5";

export async function generateFortuneLetter(
  name: string,
  birthdate: string,
): Promise<FortuneResponse> {
  const apiKey = readEnv("ANTHROPIC_API_KEY") ?? readEnv("clientkey");
  if (!apiKey) {
    throw new FortuneConfigError();
  }

  const client = new Anthropic({ apiKey });
  const dateLabel = formatSeoulDate();
  const trimmed = name.trim();

  let message: Anthropic.Message;
  try {
    message = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      tools: [
        {
          name: TOOL_NAME,
          description: "오늘 하루의 운세를 편지 형식으로 작성합니다.",
          input_schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              greeting: {
                type: "string",
                description: "이름을 부르는 첫 문장. 예: 민준 님, 오늘은 ...",
              },
              body: {
                type: "string",
                description: "편지 본문. 문단은 빈 줄로 구분하고 3문단으로 씁니다.",
              },
              advice: {
                type: "string",
                description: "오늘 가져갈 조언 한 문장",
              },
            },
            required: ["greeting", "body", "advice"],
          },
        },
      ],
      tool_choice: { type: "tool", name: TOOL_NAME },
      system: [
        "당신은 한국어로 오늘의 운세를 편지처럼 짧게 쓰는 사람입니다.",
        "별자리, 십이지, 궁합, 타로, 점성술 용어는 쓰지 않습니다.",
        "생년월일은 말투와 하루 조언의 결만 맞추는 데 쓰고, 본문에 나이를 적지 않습니다.",
        "마케팅 문장, 과한 비유, 영어, em dash는 쓰지 않습니다.",
        "greeting은 반드시 '{이름} 님,'으로 시작하고 이름과 님 사이에 공백을 둡니다.",
        "body는 3문단, 각 문단은 2문장 안팎입니다.",
        "advice는 바로 실행할 수 있는 한 문장입니다.",
      ].join(" "),
      messages: [
        {
          role: "user",
          content: [
            `오늘: ${dateLabel}`,
            `이름: ${trimmed}`,
            `생년월일: ${birthdate}`,
            "이 사람에게 오늘 하루의 편지를 써 주세요.",
          ].join("\n"),
        },
      ],
    });
  } catch {
    throw new FortuneGenerationError();
  }

  const tool = message.content.find(
    (block): block is Anthropic.ToolUseBlock =>
      block.type === "tool_use" && block.name === TOOL_NAME,
  );

  const greeting = readText(tool?.input && (tool.input as { greeting?: unknown }).greeting);
  const body = readText(tool?.input && (tool.input as { body?: unknown }).body);
  const advice = readText(tool?.input && (tool.input as { advice?: unknown }).advice);

  if (!greeting || !body || !advice) {
    throw new FortuneGenerationError("invalid-model-output");
  }

  return { greeting, dateLabel, body, advice };
}
