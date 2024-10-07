import { adBaseYear } from "./constant";
import {
  calculateDaysFromBaseYear,
  getFullDate,
  totalDaysUntilMonth,
} from "./helper";
import {
  AdToBSParams,
  BsToADParams,
  ConvertDateParams,
  ResponseType,
} from "./utils/type";

// Function to convert AD date to BS date
module.exports.adToBS = (params: AdToBSParams) => {
  const { adYear, adMonth, adDay } = params;
  convertDate({
    year: adYear,
    month: adMonth,
    day: adDay,
  });
};

// Function to convert AD date to BS date
module.exports.bsToAD = (params: BsToADParams) => {
  const { bsDay, bsMonth, bsYear } = params;
  convertDate({
    year: bsYear,
    month: bsMonth,
    day: bsDay,
    toBs: true,
  });
};

// Here toBS is a flag to indicate that the request is coming from the bsToAD function
function convertDate({
  year,
  month,
  day,
  toBs,
}: ConvertDateParams): ResponseType {
  let totalDays = toBs ? 0 : year === adBaseYear ? 0 : 262; //remaing days from 1943-April-14 to 1943-Dec-31

  /*
    This function calculates the total number of days from the year after the base year up to (but not including) the specified year.
    For example, if the user inputs 2024, it sums the total days for each year from (baseYear + 1) to 2023.
  */
  totalDays += calculateDaysFromBaseYear(year, toBs);

  /* 
    Add the total days from January up to the specified month (adMonth) in the current year (adYear).
    For example, if adYear is 2024 and adMonth is 4 (April):
    - January has 31 days
    - February has 29 days (since 2024 is a leap year)
    - March has 31 days
    The total days from January to March would be 31 + 29 + 31 = 91 days.
    Therefore, this line will sum the days for all months from January to the month prior to April.
  */
  totalDays += totalDaysUntilMonth(year, month, toBs);

  /* 
    Finally, add the days of the current month (adDay) to the total days.
    For instance, if adDay is 15 and it represents a date in April 2024:
    - The current month is April, which is the 4th month of the year.
    - In this case, the total days from January to March would be 91 days (as calculated previously).
    - Therefore, the total number of days from the base year up to April 15, 2024, would be
      the total days up to March (91) plus the current day (15).
    So, the final calculation would be 91 + 15 = 106 days.
  */
  totalDays += toBs ? day : year === adBaseYear && month === 4 ? day - 13 : day;

  return getFullDate(totalDays, toBs);
}
