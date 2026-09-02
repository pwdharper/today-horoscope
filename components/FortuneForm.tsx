"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  REQUEST_STORAGE_KEY,
  validateFortuneRequest,
  type FieldErrors,
} from "@/lib/fortune";

type FortuneFormProps = {
  todayIso: string;
};

export function FortuneForm({ todayIso }: FortuneFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateFortuneRequest({ name, birthdate }, todayIso);
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.birthdate) return;

    setSubmitting(true);
    sessionStorage.setItem(
      REQUEST_STORAGE_KEY,
      JSON.stringify({ name: name.trim(), birthdate }),
    );
    router.push("/fortune");
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[13px] font-medium text-ink">
          이름
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : "name-help"}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        <p id="name-help" className="text-[13px] leading-5 text-ink-soft">
          편지에 적힐 이름입니다.
        </p>
        {errors.name ? (
          <p id="name-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="birthdate" className="text-[13px] font-medium text-ink">
          생년월일
        </label>
        <input
          id="birthdate"
          name="birthdate"
          type="date"
          value={birthdate}
          min="1900-01-01"
          max={todayIso}
          onChange={(event) => setBirthdate(event.target.value)}
          aria-invalid={Boolean(errors.birthdate)}
          aria-describedby={errors.birthdate ? "birthdate-error" : "birthdate-help"}
          className="h-11 border-0 border-b border-ink bg-transparent px-0 text-[16px] text-ink outline-none transition-[border-color] focus:border-coral"
        />
        <p id="birthdate-help" className="text-[13px] leading-5 text-ink-soft">
          양력 기준입니다.
        </p>
        {errors.birthdate ? (
          <p id="birthdate-error" role="alert" className="text-[13px] leading-5 text-coral">
            {errors.birthdate}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 h-[52px] w-full bg-coral text-[16px] font-semibold text-paper transition-colors hover:bg-coral-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-ink-soft disabled:text-paper"
      >
        {submitting ? "편지를 여는 중" : "오늘의 편지 받기"}
      </button>
    </form>
  );
}
