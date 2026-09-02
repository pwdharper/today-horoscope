export function LetterSkeleton() {
  return (
    <div aria-hidden="true" className="flex animate-pulse flex-col gap-6">
      <div className="h-8 w-4/5 bg-[color-mix(in_srgb,var(--ink)_10%,transparent)]" />
      <div className="h-4 w-32 bg-[color-mix(in_srgb,var(--ink)_8%,transparent)]" />
      <div className="mt-2 flex flex-col gap-3">
        <div className="h-4 w-full bg-[color-mix(in_srgb,var(--ink)_9%,transparent)]" />
        <div className="h-4 w-[94%] bg-[color-mix(in_srgb,var(--ink)_9%,transparent)]" />
        <div className="h-4 w-[88%] bg-[color-mix(in_srgb,var(--ink)_9%,transparent)]" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-4 w-full bg-[color-mix(in_srgb,var(--ink)_9%,transparent)]" />
        <div className="h-4 w-[90%] bg-[color-mix(in_srgb,var(--ink)_9%,transparent)]" />
        <div className="h-4 w-[72%] bg-[color-mix(in_srgb,var(--ink)_9%,transparent)]" />
      </div>
      <div className="mt-4 h-4 w-3/5 bg-[color-mix(in_srgb,var(--ink)_10%,transparent)]" />
    </div>
  );
}
