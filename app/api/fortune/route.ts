import {
  buildMockFortune,
  validateFortuneRequest,
  type FortuneRequest,
} from "@/lib/fortune";
import { seoulIsoDate } from "@/lib/date";

export async function POST(request: Request) {
  let payload: FortuneRequest;

  try {
    payload = (await request.json()) as FortuneRequest;
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400 });
  }

  const todayIso = seoulIsoDate();
  const errors = validateFortuneRequest(
    {
      name: payload?.name ?? "",
      birthdate: payload?.birthdate ?? "",
    },
    todayIso,
  );

  if (errors.name || errors.birthdate) {
    return Response.json({ error: "invalid-input", errors }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 520));

  return Response.json(buildMockFortune(payload.name, payload.birthdate));
}
