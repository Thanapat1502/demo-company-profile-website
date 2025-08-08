/**
 * Utility functions for formatting dates from Supabase
 * Handles the format: "2025-08-04 00:00:00+00"
 */

/**
 * Formats a Supabase date string to a localized date string
 * @param dateString - The date string from Supabase (e.g., "2025-08-04 00:00:00+00")
 * @param locale - The locale for formatting (e.g., "th-TH", "en-US")
 * @returns Formatted date string or "--:--" if invalid
 */
export const formatSupabaseDate = (
  dateString: string,
  locale: string = "en-US"
): string => {
  try {
    // Only handle YYYY-MM-DDTHH:mm:ss+00:00 format
    // If not matching, fallback gracefully
    const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\+\d{2}:\d{2}|Z)$/;
    let isoString = dateString;

    if (!isoRegex.test(dateString)) {
      // Try to convert from Supabase format "YYYY-MM-DD HH:mm:ss+00"
      if (dateString.includes(" ") && !dateString.includes("T")) {
        isoString = dateString.replace(" ", "T");
      }
    }

    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      // Fallback: try just the date part
      const datePart = dateString.split(/[ T]/)[0];
      const fallbackDate = new Date(datePart);
      if (isNaN(fallbackDate.getTime())) {
        console.warn("Invalid date:", dateString);
        return "--:--";
      }
      return fallbackDate.toLocaleDateString(locale);
    }
    return date.toLocaleDateString(locale);
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "--:--";
  }
};

/**
 * Formats a date for Thai locale
 * @param dateString - The date string from Supabase
 * @returns Formatted date string in Thai locale or "--:--" if invalid
 */
export const formatDateThai = (dateString: string): string => {
  return formatSupabaseDate(dateString, "th-TH");
};

/**
 * Formats a date for English locale
 * @param dateString - The date string from Supabase
 * @returns Formatted date string in English locale or "--:--" if invalid
 */
export const formatDateEnglish = (dateString: string): string => {
  return formatSupabaseDate(dateString, "en-US");
};

/**
 * Formats a date based on the current locale
 * @param dateString - The date string from Supabase
 * @param locale - The current locale ("th" or "en")
 * @returns Formatted date string or "--:--" if invalid
 */
export const formatDateByLocale = (
  dateString: string,
  locale: string
): string => {
  const localeCode = locale === "th" ? "th-TH" : "en-US";
  return formatSupabaseDate(dateString, localeCode);
};

/**
 * Validates if a date string is valid
 * @param dateString - The date string to validate
 * @returns true if valid, false otherwise
 */
export const isValidDate = (dateString: string): boolean => {
  try {
    let isoString = dateString;

    if (dateString.includes(" ") && !dateString.includes("T")) {
      isoString = dateString.replace(" ", "T");
      if (!isoString.includes("Z") && !isoString.includes("+")) {
        isoString += "Z";
      }
    }

    const date = new Date(isoString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};

/**
 * Converts Supabase date format to ISO string
 * @param dateString - The date string from Supabase
 * @returns ISO string or original string if already in ISO format
 */
export const toISOString = (dateString: string): string => {
  try {
    let isoString = dateString;

    if (dateString.includes(" ") && !dateString.includes("T")) {
      isoString = dateString.replace(" ", "T");
      if (!isoString.includes("Z") && !isoString.includes("+")) {
        isoString += "Z";
      }
    }

    return isoString;
  } catch {
    return dateString;
  }
};
