export const isoToEmoji = (countryCode: string) =>
  countryCode
    .slice(0, 2) // keep the first two letters
    .split("")
    .map((letter) => (letter.charCodeAt(0) % 32) + 0x1f1e5)
    .map((emojiCode) => String.fromCodePoint(emojiCode))
    .join("");

export const countryList = [
  { code: "FRA", name: "france", flagCode: "FR" },
  { code: "ITA", name: "italy", flagCode: "IT" },
  { code: "USA", name: "united states", flagCode: "US" },
  { code: "ESP", name: "spain", flagCode: "ES" },
  { code: "GBR", name: "united kingdom", flagCode: "GB" },
  { code: "GER", name: "germany", flagCode: "DE" },
  { code: "ARG", name: "argentina", flagCode: "AR" },
  { code: "AUS", name: "australia", flagCode: "AU" },
  { code: "AUT", name: "austria", flagCode: "AT" },
  { code: "BEL", name: "belgium", flagCode: "BE" },
  { code: "BRA", name: "brazil", flagCode: "BR" },
  { code: "CAN", name: "canada", flagCode: "CA" },
  { code: "CHI", name: "chile", flagCode: "CL" },
  { code: "SRB", name: "serbia", flagCode: "RS" },
  { code: "CRO", name: "croatia", flagCode: "HR" },
  { code: "CZE", name: "czech republic", flagCode: "CZ" },
  { code: "DEN", name: "denmark", flagCode: "DK" },
  { code: "ECU", name: "ecuador", flagCode: "EC" },
  { code: "EST", name: "estonia", flagCode: "EE" },
  { code: "FIN", name: "finland", flagCode: "FI" },
  { code: "GRE", name: "greece", flagCode: "GR" },
  { code: "HUN", name: "hungary", flagCode: "HU" },
  { code: "IRL", name: "ireland", flagCode: "IE" },
  { code: "JPN", name: "japan", flagCode: "JP" },
  { code: "RUS", name: "russia", flagCode: "RU" },
];
