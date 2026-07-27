"use client";

/* C2 · Inline form as CTA — knobs: fields=1, submit=end-of-row, helper=below
 *
 * The form ships the full state machine (idle · hover · focus · active ·
 * disabled · loading · error · success). Only the network call is stubbed —
 * see `subscribe()` below and point it at your real list provider.
 */

import { useId, useState } from "react";
import { ArrowRight, BadgePercent } from "lucide-react";

type Status = "idle" | "loading" | "error" | "success";

/* ---------------------------------------------------------------------------
 * STUB. Replace the body with a real request to your email provider
 * (Klaviyo, Mailchimp, Resend, a route handler at /api/subscribe — whatever you
 * use). Throw on failure so the error state below renders.
 * ------------------------------------------------------------------------- */
async function subscribe(email: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  if (!email) throw new Error("No email supplied.");
}

export function Newsletter() {
  const inputId = useId();
  const helperId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const busy = status === "loading";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("That address doesn't look right — check it and try again.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await subscribe(email);
      setStatus("success");
      setMessage("You're on the list. The code lands in your inbox shortly.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("We couldn't sign you up just then. Try again in a moment.");
    }
  }

  return (
    <section className="bg-walnut py-20 text-accent-ink lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-signal px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-signal-ink">
            <BadgePercent className="size-3.5" aria-hidden="true" />
            <span className="whitespace-nowrap">10% off your first order</span>
          </p>
          <h2 className="text-[2.25rem] leading-[1.05] text-accent-ink sm:text-[2.75rem]">
            Offers, before the shelf empties.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-accent-ink/75">
            One email a week: what&rsquo;s reduced, what&rsquo;s just landed,
            and the odd recipe from behind the counter.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor={inputId}
            className="mb-2.5 block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-accent-ink/70"
          >
            Email address
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id={inputId}
              type="email"
              name="email"
              value={email}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={busy}
              aria-describedby={helperId}
              aria-invalid={status === "error"}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              className="min-h-[52px] flex-1 rounded-lg border-2 border-transparent bg-paper px-4 text-ink placeholder:text-muted/70 transition-colors duration-[140ms] ease-out hover:border-tan focus:border-signal focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy}
              className="group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2.5 rounded-lg bg-ink px-6 text-accent-ink transition-[background-color,opacity] duration-[140ms] ease-out hover:bg-paper hover:text-ink active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-[0.85rem] font-bold uppercase tracking-[0.08em] whitespace-nowrap">
                {busy ? "Signing up" : "Sign up"}
              </span>
              <ArrowRight
                className="size-4 transition-transform duration-[140ms] ease-out group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>

          <p
            id={helperId}
            aria-live="polite"
            className={`mt-3 text-[0.82rem] leading-snug ${
              status === "error"
                ? "text-signal"
                : status === "success"
                  ? "text-accent-ink"
                  : "text-accent-ink/80"
            }`}
          >
            {message || "One email a week. Unsubscribe in a click."}
          </p>
        </form>
      </div>
    </section>
  );
}
