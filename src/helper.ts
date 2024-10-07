import { adBaseYear, bsBaseYear, bsMonths } from "./constant";

// Function to determine if a given year is a leap year
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Function to calculate the total days in years starting from base year+1 to the given year
export function calculateDaysFromBaseYear(userYear: number): number {
  // Calculate the total days in the AD year before the given date
  let totalDays = 0;
  for (let year = adBaseYear + 1; year < userYear; year++) {
    totalDays += isLeapYear(year) ? 366 : 365;
  }

  return totalDays;
}

// Function to calculate the total days from January to the given month in a specified year
export function totalDaysUntilMonth(adYear: number, adMonth: number): number {
  let totalDays = 0;

  for (let month = 1; month < adMonth; month++) {
    if (month === 2) {
      totalDays += isLeapYear(adYear) ? 29 : 28; // February
    } else {
      totalDays += [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30][month]; // Days in each month
    }
  }

  return totalDays;
}

/**
 * Converts a total number of days into a full date in the BS (Bikram Sambat) calendar.
 *
 * This function iterates through the months of the BS calendar, summing the total days until it reaches
 * or exceeds the provided totalDays. Once the correct month and day are found, it calculates the year,
 * month, and day based on the accumulated days.
 *
 * Example:
 * If totalDays is 55:
 * - It will iterate through the months of the BS year, summing the days until it surpasses 55.
 * - Suppose it finds that 55 days falls within the second month (e.g., Falgun) of the BS year 2080.
 * - The function will return { year: 2080, month: 2, day: (55 - total days until Falgun) }.
 *
 * @param totalDays - The total number of days from the AD base year.
 * @returns An object containing the year, month, and day in the BS calendar.
 */
export function getBSFullDate(totalDays: number) {
  let bsDays = 0; // Total accumulated days in the BS calendar
  let yearIndex = 0; // Index for the BS year
  let monthIndex = 0; // Index for the month in the BS year
  let day = 0; // The day in the month

  for (const month of bsMonths) {
    for (const daysInMonth of month) {
      bsDays += daysInMonth; // Accumulate days

      // Check if the accumulated days surpass the totalDays
      if (bsDays >= totalDays) {
        // Calculate the index and the day
        yearIndex = bsMonths.indexOf(month);
        monthIndex = month.indexOf(daysInMonth);
        day = totalDays - (bsDays - daysInMonth); // Calculate the specific day
        return {
          year: bsBaseYear + yearIndex,
          month: monthIndex + 1, // Convert 0-based index to 1-based month
          day,
        };
      }
    }
  }

  // If totalDays exceeds the total days in the BS calendar, return null or an appropriate value
  return null;
}
