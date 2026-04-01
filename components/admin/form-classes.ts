/** Shared admin UI — solid fields and high-contrast text (avoids washed-out typed text on cream pages). */
export const adminInputClass =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-900 placeholder:text-neutral-500 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-900/15";

export const adminTextareaClass = `${adminInputClass} min-h-[120px] resize-y leading-relaxed`;

export const adminLabelClass =
  "block text-xs font-semibold uppercase tracking-widest text-neutral-800 mb-2";
