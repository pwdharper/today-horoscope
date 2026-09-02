"use client";

import { motion, useReducedMotion } from "motion/react";
import { WarningCircle } from "@phosphor-icons/react";
import { HomeLink } from "@/components/HomeLink";
import type { FortuneResponse } from "@/lib/fortune";

type FortuneLetterProps = {
  letter: FortuneResponse;
};

export function FortuneLetter({ letter }: FortuneLetterProps) {
  const reduce = useReducedMotion();
  const paragraphs = letter.body.split("\n").filter((part) => part.trim().length > 0);

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col"
    >
      <h1 className="max-w-[18ch] text-[1.75rem] font-semibold leading-[1.25] tracking-tight text-ink sm:text-[2rem]">
        {letter.greeting}
      </h1>
      <p className="mt-4 text-[13px] text-ink-soft">{letter.dateLabel}</p>

      <div className="mt-8 flex max-w-[65ch] flex-col gap-5 text-[17px] leading-[1.75] text-ink">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <p className="mt-10 max-w-[65ch] border-t border-hairline pt-6 text-[16px] leading-7 text-ink">
        {letter.advice}
      </p>

      <HomeLink />
    </motion.article>
  );
}

type FortuneErrorProps = {
  onRetry: () => void;
};

export function FortuneError({ onRetry }: FortuneErrorProps) {
  return (
    <div className="flex flex-col">
      <WarningCircle size={28} weight="regular" className="text-coral" aria-hidden="true" />
      <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight text-ink">
        편지를 열지 못했습니다.
      </h1>
      <p className="mt-3 max-w-[40ch] text-[16px] leading-7 text-ink-soft">
        잠시 후 다시 시도해 주세요. 입력한 이름과 생년월일은 그대로 있습니다.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-8 h-[52px] w-full bg-coral text-[16px] font-semibold text-paper transition-colors hover:bg-coral-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral active:scale-[0.98] sm:w-auto sm:px-8"
      >
        다시 시도
      </button>
      <HomeLink />
    </div>
  );
}
