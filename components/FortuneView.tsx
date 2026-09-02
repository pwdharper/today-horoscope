"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FortuneError, FortuneLetter } from "@/components/FortuneLetter";
import { LetterSkeleton } from "@/components/LetterSkeleton";
import { LogoutButton } from "@/components/LogoutButton";
import { SheetFrame } from "@/components/SheetFrame";
import {
  REQUEST_STORAGE_KEY,
  type FortuneRequest,
  type FortuneResponse,
} from "@/lib/fortune";

type ViewState =
  | { status: "loading" }
  | { status: "ready"; letter: FortuneResponse }
  | { status: "error" };

function readStoredRequest(): FortuneRequest | null {
  try {
    const raw = sessionStorage.getItem(REQUEST_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as FortuneRequest;
    if (!parsed.name || !parsed.birthdate) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function requestFortune(payload: FortuneRequest): Promise<FortuneResponse> {
  const response = await fetch("/api/fortune", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.status === 401) {
    throw Object.assign(new Error("unauthorized"), { code: "unauthorized" });
  }
  if (!response.ok) throw new Error("fortune-failed");
  return (await response.json()) as FortuneResponse;
}

export function FortuneView() {
  const router = useRouter();
  const requestRef = useRef<FortuneRequest | null>(null);
  const [state, setState] = useState<ViewState>({ status: "loading" });

  useEffect(() => {
    const parsed = readStoredRequest();
    if (!parsed) {
      router.replace("/");
      return;
    }

    requestRef.current = parsed;
    let cancelled = false;

    requestFortune(parsed)
      .then((letter) => {
        if (!cancelled) setState({ status: "ready", letter });
      })
      .catch((error: { code?: string }) => {
        if (cancelled) return;
        if (error?.code === "unauthorized") {
          router.replace("/login");
          return;
        }
        setState({ status: "error" });
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <SheetFrame width="letter" tools={<LogoutButton />}>
      {state.status === "loading" ? (
        <>
          <p className="sr-only">편지를 여는 중입니다.</p>
          <LetterSkeleton />
        </>
      ) : null}
      {state.status === "ready" ? <FortuneLetter letter={state.letter} /> : null}
      {state.status === "error" ? (
        <FortuneError
          onRetry={() => {
            const payload = requestRef.current;
            if (!payload) return;
            setState({ status: "loading" });
            requestFortune(payload)
              .then((letter) => setState({ status: "ready", letter }))
              .catch((error: { code?: string }) => {
                if (error?.code === "unauthorized") {
                  router.replace("/login");
                  return;
                }
                setState({ status: "error" });
              });
          }}
        />
      ) : null}
    </SheetFrame>
  );
}
