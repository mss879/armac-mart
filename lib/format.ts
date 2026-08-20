export function formatLKR(amount: number): string {
  return `Rs ${Math.round(amount).toLocaleString("en-LK")}`;
}

export const FREE_DELIVERY_THRESHOLD = 7500;
export const STANDARD_DELIVERY_FEE = 450;
export const EXPRESS_DELIVERY_FEE = 950;

export const PROMO_CODES: Record<string, number> = {
  ARMAC15: 0.15,
  WELCOME10: 0.1,
};
