// Canonical phone handling. Everything (users.phone, phone_verifications,
// lookups) uses E.164 (+<countrycode><number>). Bare local numbers default
// to India (+91) since most users are in Telangana, but an explicit "+" /
// country code is always respected — so non-India numbers (e.g. the
// super admin's US +1) work too.

const DEFAULT_CC = "91";

/** Normalise any input to E.164, or null if it can't be a valid number. */
export function toE164(raw: string, defaultCc: string = DEFAULT_CC): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith("+");
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;

  let e164: string;
  if (hasPlus) {
    e164 = `+${digits}`;                       // explicit country code provided
  } else if (digits.length === 10) {
    e164 = `+${defaultCc}${digits}`;           // bare local number -> default country
  } else if (digits.length > 10) {
    e164 = `+${digits}`;                        // already includes a country code
  } else {
    return null;                               // too short to be valid
  }
  return isValidE164(e164) ? e164 : null;
}

export function isValidE164(p: string): boolean {
  return /^\+\d{8,15}$/.test(p);
}

/** Last-10-digit local form, for display only. */
export function localDigits(raw: string): string {
  return raw.replace(/\D/g, "").slice(-10);
}
