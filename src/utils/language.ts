// Language code mapping
export const LANGUAGE_CODES: Record<string, string> = {
  english: 'en',
  spanish: 'es',
  portuguese: 'pt-br',
  // add more as needed
};

/**
 * Converts a language name to its corresponding code
 * @param language - Language name or code
 * @returns The language code or the original input if no mapping found
 */
export function getLanguageCode(language?: string): string | undefined {
  if (!language) return undefined;
  return LANGUAGE_CODES[language.toLowerCase()] || language;
} 