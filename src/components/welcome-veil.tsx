/* Welcome preloader.
 *
 * Page-level and fixed, so it covers the nav as well as the fold. It clears
 * itself purely through a CSS animation (`.veil` in globals.css) — there is no
 * JS gate, so a hydration failure can never leave a visitor staring at a
 * permanent splash screen. `pointer-events-none` means it can't trap a click or
 * a scroll even while it is on screen.
 *
 * To show this only once per session, wrap it in a client component that reads
 * sessionStorage — note that doing so reintroduces a hydration flash.
 */

export function WelcomeVeil() {
  return (
    <div
      className="veil pointer-events-none fixed inset-0 z-50 grid place-items-center bg-paper"
      aria-hidden="true"
    >
      <div className="veil__mark text-center">
        <p className="font-display text-4xl font-extrabold uppercase leading-none tracking-[-0.02em] text-ink sm:text-6xl">
          Armac <span className="text-wood">Mart</span>
        </p>
        <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-wood">
          Welcome in
        </p>
      </div>
    </div>
  );
}
