import { adBaseDay, adBaseMonth, adBaseYear, remainingDays } from "./constant";
import {
  calculateDaysFromBaseYear,
  getFullDate,
  parseDate,
  totalDaysUntilMonth,
} from "./helper";
import { ConvertDateParams, ResponseType } from "./utils/type";

// Function to convert AD date to BS date
module.exports.adToBS = (userDate: string) => {
  const { year, month, day } = parseDate(userDate);
  return convertDate({
    year,
    month,
    day,
  });
};

// Function to convert AD date to BS date
module.exports.bsToAD = (userDate: string) => {
  const { year, month, day } = parseDate(userDate);
  return convertDate({
    year,
    month,
    day,
    fromBS: true,
  });
};

// Here fromBS is a flag to indicate that the request is coming from the bsToAD function
function convertDate({
  year,
  month,
  day,
  fromBS,
}: ConvertDateParams): ResponseType {
  let totalDays = fromBS ? 0 : year === adBaseYear ? 0 : remainingDays; //remaing days from 1918-April-12 to 1943-Dec-31
  /*
    This function calculates the total number of days from the year after the base year up to (but not including) the specified year.
    For example, if the user inputs 2024, it sums the total days for each year from (baseYear + 1) to 2023.
  */
  totalDays += calculateDaysFromBaseYear(year, fromBS);
  /* 
    Add the total days from January up to the specified month (adMonth) in the current year (adYear).
    For example, if adYear is 2024 and adMonth is 4 (April):
    - January has 31 days
    - February has 29 days (since 2024 is a leap year)
    - March has 31 days
    The total days from January to March would be 31 + 29 + 31 = 91 days.
    Therefore, this line will sum the days for all months from January to the month prior to April.
  */
  totalDays += totalDaysUntilMonth(year, month, fromBS);

  /* 
    Finally, add the days of the current month (adDay) to the total days.
    For instance, if adDay is 15 and it represents a date in April 2024:
    - The current month is April, which is the 4th month of the year.
    - In this case, the total days from January to March would be 91 days (as calculated previously).
    - Therefore, the total number of days from the base year up to April 15, 2024, would be
      the total days up to March (91) plus the current day (15).
    So, the final calculation would be 91 + 15 = 106 days.
  */
  totalDays += fromBS
    ? day
    : year === adBaseYear && month === adBaseMonth
    ? day - adBaseDay - 1
    : day;

  return getFullDate(totalDays, fromBS);
}
