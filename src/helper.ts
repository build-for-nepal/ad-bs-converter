import { adBaseYear, bsBaseYear, bsYearsWithMonthTotal } from "./constant";

// Function to determine if a given year is a leap year
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Function to calculate the total days in years starting from base year+1 to the given year
export function calculateDaysFromBaseYear(
  userYear: number,
  fromBS = false
): number {
  let totalDays = 0;
  if (fromBS) {
    for (let year = 0; year < userYear - bsBaseYear; year++) {
      for (let month = 0; month < 12; month++) {
        totalDays += bsYearsWithMonthTotal[year][month];
      }
    }
  } else {
    // Calculate the total days in the AD year before the given date
    for (let year = adBaseYear + 1; year < userYear; year++) {
      totalDays += isLeapYear(year) ? 366 : 365;
    }
  }
  return totalDays;
}

// Function to calculate the total days from January to the given month in a specified year
export function totalDaysUntilMonth(
  userYear: number,
  userMonth: number,
  fromBS = false
): number {
  let totalDays = 0;

  if (fromBS) {
    for (let month = 1; month < userMonth; month++) {
      totalDays += bsYearsWithMonthTotal[userYear - bsBaseYear][month - 1];
    }
  } else {
    for (
      let month = userYear === adBaseYear ? 4 : 1;
      month < userMonth;
      month++
    ) {
      if (month === 2) {
        totalDays += isLeapYear(userYear) ? 29 : 28; // February
      } else {
        totalDays += [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30][month]; // Days in each month
      }
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
export function getFullDate(totalDays: number, fromBS = false) {
  if (fromBS) {
    const date = new Date(Date.UTC(1918, 3, 12)); // Use Date.UTC to avoid local timezone issues
    date.setUTCDate(date.getUTCDate() + totalDays); // Add totalDays in UTC

    // Reset the time to 00:00:00 UTC
    date.setUTCHours(0);
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0); // Optional: reset milliseconds to 0

    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1, // Month is 0-indexed, so add 1
      day: date.getUTCDate(),
    };
  } else {
    let bsDays = 0; // Total accumulated days in the BS calendar
    let yearIndex = 0; // Index for the BS year
    let monthIndex = 0; // Index for the month in the BS year
    let day = 0; // The day in the month

    for (const year of bsYearsWithMonthTotal) {
      for (let monthIndex = 0; monthIndex < year.length; monthIndex++) {
        const daysInMonth = year[monthIndex]; // Get the days in the current month
        bsDays += daysInMonth; // Accumulate days

        // Check if the accumulated days surpass the totalDays
        if (bsDays >= totalDays) {
          yearIndex = bsYearsWithMonthTotal.indexOf(year);
          day = totalDays - (bsDays - daysInMonth); // Calculate the specific day
          return {
            year: bsBaseYear + yearIndex,
            month: monthIndex + 1, // Convert 0-based index to 1-based month
            day,
          };
        }
      }
    }
  }

  // If totalDays exceeds the total days in the BS calendar, return null or an appropriate value
  return { year: 0, month: 0, day: 0 };
}
