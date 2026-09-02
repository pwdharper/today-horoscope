"use client";

import { logout } from "@/app/logout/actions";
import { clearFortuneRequest } from "@/lib/fortune";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        clearFortuneRequest();
        await logout();
      }}
    >
      <button
        type="submit"
        className="text-[13px] font-medium text-ink-soft underline decoration-hairline underline-offset-4 transition-colors hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
      >
        나가기
      </button>
    </form>
  );
}
