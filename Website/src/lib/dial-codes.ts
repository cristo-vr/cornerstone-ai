/**
 * Country → international dialling code, for the WhatsApp field on /expansion.
 *
 * Names are not stored: the page asks the browser (Intl.DisplayNames), so a
 * visitor sees them in their own language. NANP countries share +1, and a few
 * share other codes (+7, +44, +47, +61, +212, +262, +590, +599); that's fine,
 * the code is what's dialled.
 *
 * `len` is the national number length range (without the leading trunk 0)
 * where it's fixed and well known; anything absent falls back to 6 to 13
 * digits, which E.164's 15-digit ceiling keeps honest.
 */
export interface DialCode {
  iso: string;
  dial: string;
  len?: [number, number];
}

export const DIAL_CODES: DialCode[] = [
  { iso: "ZA", dial: "27", len: [9, 9] },
  { iso: "US", dial: "1", len: [10, 10] },
  { iso: "CA", dial: "1", len: [10, 10] },
  { iso: "GB", dial: "44", len: [9, 10] },
  { iso: "AU", dial: "61", len: [9, 9] },
  { iso: "NZ", dial: "64", len: [8, 10] },
  { iso: "IE", dial: "353", len: [7, 9] },
  { iso: "AE", dial: "971", len: [8, 9] },
  { iso: "NL", dial: "31", len: [9, 9] },
  { iso: "DE", dial: "49", len: [7, 13] },
  { iso: "FR", dial: "33", len: [9, 9] },
  { iso: "IN", dial: "91", len: [10, 10] },
  { iso: "AF", dial: "93" },
  { iso: "AL", dial: "355" },
  { iso: "DZ", dial: "213" },
  { iso: "AD", dial: "376" },
  { iso: "AO", dial: "244", len: [9, 9] },
  { iso: "AG", dial: "1", len: [10, 10] },
  { iso: "AR", dial: "54" },
  { iso: "AM", dial: "374" },
  { iso: "AT", dial: "43" },
  { iso: "AZ", dial: "994" },
  { iso: "BS", dial: "1", len: [10, 10] },
  { iso: "BH", dial: "973", len: [8, 8] },
  { iso: "BD", dial: "880" },
  { iso: "BB", dial: "1", len: [10, 10] },
  { iso: "BY", dial: "375" },
  { iso: "BE", dial: "32", len: [8, 9] },
  { iso: "BZ", dial: "501" },
  { iso: "BJ", dial: "229" },
  { iso: "BM", dial: "1", len: [10, 10] },
  { iso: "BT", dial: "975" },
  { iso: "BO", dial: "591" },
  { iso: "BA", dial: "387" },
  { iso: "BW", dial: "267", len: [7, 8] },
  { iso: "BR", dial: "55", len: [10, 11] },
  { iso: "BN", dial: "673" },
  { iso: "BG", dial: "359" },
  { iso: "BF", dial: "226" },
  { iso: "BI", dial: "257" },
  { iso: "KH", dial: "855" },
  { iso: "CM", dial: "237" },
  { iso: "CV", dial: "238" },
  { iso: "KY", dial: "1", len: [10, 10] },
  { iso: "CF", dial: "236" },
  { iso: "TD", dial: "235" },
  { iso: "CL", dial: "56", len: [9, 9] },
  { iso: "CN", dial: "86", len: [11, 11] },
  { iso: "CO", dial: "57", len: [10, 10] },
  { iso: "KM", dial: "269" },
  { iso: "CG", dial: "242" },
  { iso: "CD", dial: "243" },
  { iso: "CR", dial: "506", len: [8, 8] },
  { iso: "CI", dial: "225" },
  { iso: "HR", dial: "385" },
  { iso: "CU", dial: "53" },
  { iso: "CY", dial: "357", len: [8, 8] },
  { iso: "CZ", dial: "420", len: [9, 9] },
  { iso: "DK", dial: "45", len: [8, 8] },
  { iso: "DJ", dial: "253" },
  { iso: "DM", dial: "1", len: [10, 10] },
  { iso: "DO", dial: "1", len: [10, 10] },
  { iso: "EC", dial: "593" },
  { iso: "EG", dial: "20", len: [9, 10] },
  { iso: "SV", dial: "503", len: [8, 8] },
  { iso: "GQ", dial: "240" },
  { iso: "ER", dial: "291" },
  { iso: "EE", dial: "372" },
  { iso: "SZ", dial: "268", len: [8, 8] },
  { iso: "ET", dial: "251", len: [9, 9] },
  { iso: "FJ", dial: "679" },
  { iso: "FI", dial: "358" },
  { iso: "GA", dial: "241" },
  { iso: "GM", dial: "220" },
  { iso: "GE", dial: "995" },
  { iso: "GH", dial: "233", len: [9, 9] },
  { iso: "GI", dial: "350" },
  { iso: "GR", dial: "30", len: [10, 10] },
  { iso: "GD", dial: "1", len: [10, 10] },
  { iso: "GT", dial: "502", len: [8, 8] },
  { iso: "GN", dial: "224" },
  { iso: "GW", dial: "245" },
  { iso: "GY", dial: "592" },
  { iso: "HT", dial: "509" },
  { iso: "HN", dial: "504", len: [8, 8] },
  { iso: "HK", dial: "852", len: [8, 8] },
  { iso: "HU", dial: "36" },
  { iso: "IS", dial: "354", len: [7, 7] },
  { iso: "ID", dial: "62" },
  { iso: "IR", dial: "98" },
  { iso: "IQ", dial: "964" },
  { iso: "IL", dial: "972", len: [8, 9] },
  { iso: "IT", dial: "39", len: [6, 11] },
  { iso: "JM", dial: "1", len: [10, 10] },
  { iso: "JP", dial: "81", len: [9, 10] },
  { iso: "JO", dial: "962" },
  { iso: "KZ", dial: "7", len: [10, 10] },
  { iso: "KE", dial: "254", len: [9, 9] },
  { iso: "KW", dial: "965", len: [8, 8] },
  { iso: "KG", dial: "996" },
  { iso: "LA", dial: "856" },
  { iso: "LV", dial: "371", len: [8, 8] },
  { iso: "LB", dial: "961" },
  { iso: "LS", dial: "266", len: [8, 8] },
  { iso: "LR", dial: "231" },
  { iso: "LY", dial: "218" },
  { iso: "LI", dial: "423" },
  { iso: "LT", dial: "370", len: [8, 8] },
  { iso: "LU", dial: "352" },
  { iso: "MO", dial: "853", len: [8, 8] },
  { iso: "MG", dial: "261", len: [9, 9] },
  { iso: "MW", dial: "265" },
  { iso: "MY", dial: "60", len: [9, 10] },
  { iso: "MV", dial: "960", len: [7, 7] },
  { iso: "ML", dial: "223" },
  { iso: "MT", dial: "356", len: [8, 8] },
  { iso: "MR", dial: "222" },
  { iso: "MU", dial: "230", len: [7, 8] },
  { iso: "MX", dial: "52", len: [10, 10] },
  { iso: "MD", dial: "373" },
  { iso: "MC", dial: "377" },
  { iso: "MN", dial: "976" },
  { iso: "ME", dial: "382" },
  { iso: "MA", dial: "212", len: [9, 9] },
  { iso: "MZ", dial: "258", len: [8, 9] },
  { iso: "MM", dial: "95" },
  { iso: "NA", dial: "264", len: [8, 9] },
  { iso: "NP", dial: "977" },
  { iso: "NI", dial: "505", len: [8, 8] },
  { iso: "NE", dial: "227" },
  { iso: "NG", dial: "234", len: [10, 10] },
  { iso: "MK", dial: "389" },
  { iso: "NO", dial: "47", len: [8, 8] },
  { iso: "OM", dial: "968", len: [8, 8] },
  { iso: "PK", dial: "92", len: [10, 10] },
  { iso: "PA", dial: "507" },
  { iso: "PG", dial: "675" },
  { iso: "PY", dial: "595" },
  { iso: "PE", dial: "51", len: [9, 9] },
  { iso: "PH", dial: "63", len: [10, 10] },
  { iso: "PL", dial: "48", len: [9, 9] },
  { iso: "PT", dial: "351", len: [9, 9] },
  { iso: "PR", dial: "1", len: [10, 10] },
  { iso: "QA", dial: "974", len: [8, 8] },
  { iso: "RE", dial: "262" },
  { iso: "RO", dial: "40", len: [9, 9] },
  { iso: "RU", dial: "7", len: [10, 10] },
  { iso: "RW", dial: "250", len: [9, 9] },
  { iso: "KN", dial: "1", len: [10, 10] },
  { iso: "LC", dial: "1", len: [10, 10] },
  { iso: "VC", dial: "1", len: [10, 10] },
  { iso: "WS", dial: "685" },
  { iso: "SM", dial: "378" },
  { iso: "SA", dial: "966", len: [9, 9] },
  { iso: "SN", dial: "221", len: [9, 9] },
  { iso: "RS", dial: "381" },
  { iso: "SC", dial: "248", len: [7, 7] },
  { iso: "SL", dial: "232" },
  { iso: "SG", dial: "65", len: [8, 8] },
  { iso: "SK", dial: "421", len: [9, 9] },
  { iso: "SI", dial: "386", len: [8, 8] },
  { iso: "SO", dial: "252" },
  { iso: "KR", dial: "82", len: [9, 10] },
  { iso: "SS", dial: "211" },
  { iso: "ES", dial: "34", len: [9, 9] },
  { iso: "LK", dial: "94", len: [9, 9] },
  { iso: "SD", dial: "249" },
  { iso: "SR", dial: "597" },
  { iso: "SE", dial: "46", len: [7, 9] },
  { iso: "CH", dial: "41", len: [9, 9] },
  { iso: "SY", dial: "963" },
  { iso: "TW", dial: "886", len: [9, 9] },
  { iso: "TJ", dial: "992" },
  { iso: "TZ", dial: "255", len: [9, 9] },
  { iso: "TH", dial: "66", len: [9, 9] },
  { iso: "TG", dial: "228" },
  { iso: "TT", dial: "1", len: [10, 10] },
  { iso: "TN", dial: "216", len: [8, 8] },
  { iso: "TR", dial: "90", len: [10, 10] },
  { iso: "TM", dial: "993" },
  { iso: "UG", dial: "256", len: [9, 9] },
  { iso: "UA", dial: "380", len: [9, 9] },
  { iso: "UY", dial: "598" },
  { iso: "UZ", dial: "998" },
  { iso: "VE", dial: "58", len: [10, 10] },
  { iso: "VN", dial: "84", len: [9, 10] },
  { iso: "YE", dial: "967" },
  { iso: "ZM", dial: "260", len: [9, 9] },
  { iso: "ZW", dial: "263", len: [9, 9] },
];

/** Countries that keep the leading 0 in the international number. */
export const KEEPS_TRUNK_ZERO = new Set(["IT", "SM"]);

/** The flag emoji for an ISO code (regional indicator letters). */
export const flag = (iso: string): string =>
  String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

/**
 * The visitor's number as E.164, or an error sentence. `raw` is whatever they
 * typed in the national field; a pasted "+44 ..." or "0044 ..." wins over the
 * selected country.
 */
export function toE164(iso: string, raw: string): { ok: true; value: string } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: false, error: "I need a number to confirm the call on." };
  if (!/^[+\d\s().-]+$/.test(trimmed)) return { ok: false, error: "Numbers only, please." };

  let digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+") || digits.startsWith("00")) {
    digits = digits.replace(/^00/, "");
    return /^[1-9]\d{7,14}$/.test(digits) ? { ok: true, value: `+${digits}` } : { ok: false, error: "That number doesn't look right." };
  }

  const c = DIAL_CODES.find((d) => d.iso === iso);
  if (!c) return { ok: false, error: "Pick your country first." };
  // Someone in the US who typed 1 first, or in SA who typed 27 first.
  if (digits.startsWith(c.dial) && digits.length > (c.len?.[1] ?? 13)) digits = digits.slice(c.dial.length);
  if (!KEEPS_TRUNK_ZERO.has(iso)) digits = digits.replace(/^0+/, "");
  const [min, max] = c.len ?? [6, 13];
  if (digits.length < min || digits.length > max) {
    return { ok: false, error: `That number looks too ${digits.length < min ? "short" : "long"}. Check it, and the country.` };
  }
  const full = `${c.dial}${digits}`;
  return full.length <= 15 ? { ok: true, value: `+${full}` } : { ok: false, error: "That number is too long." };
}
