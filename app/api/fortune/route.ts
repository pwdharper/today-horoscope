import {
  FortuneConfigError,
  FortuneGenerationError,
  generateFortuneLetter,
} from "@/lib/generate-fortune";
import { seoulIsoDate } from "@/lib/date";
import { validateFortuneRequest, type FortuneRequest } from "@/lib/fortune";

export const maxDuration = 30;

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

  try {
    const letter = await generateFortuneLetter(payload.name, payload.birthdate);
    return Response.json(letter);
  } catch (error) {
    if (error instanceof FortuneConfigError) {
      return Response.json({ error: "missing-api-key" }, { status: 500 });
    }
    if (error instanceof FortuneGenerationError) {
      return Response.json({ error: "fortune-failed" }, { status: 502 });
    }
    return Response.json({ error: "fortune-failed" }, { status: 502 });
  }
}
