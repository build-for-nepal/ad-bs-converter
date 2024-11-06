import { adBaseDay, adBaseMonth, adBaseYear, remainingDays } from "./constant";
import {
  calculateDaysFromBaseYear,
  getFullDate,
  parseDate,
  totalDaysUntilMonth,
} from "./helper";
import { ConvertDateParams, ResponseType } from "./utils/type";

// Function to convert AD date to BS date
export const adToBS = (userDate?: string | number) => {
  if (userDate) {
    const { year, month, day } = parseDate(userDate);
    return convertDate({
      year,
      month,
      day,
    });
  }
  return convertDate({});
};

// Function to convert AD date to BS date
export const bsToAD = (userDate?: string) => {
  if (userDate) {
    const { year, month, day } = parseDate(userDate);
    return convertDate({
      year,
      month,
      day,
      fromBS: true,
    });
  }
  return convertDate({ fromBS: true });
};

// Here fromBS is a flag to indicate that the request is coming from the bsToAD function
function convertDate({
  year,
  month,
  day,
  fromBS,
}: ConvertDateParams): ResponseType {
  if (year && month && day) {
    let totalDays = fromBS ? 0 : year === adBaseYear ? 0 : remainingDays; //remaing days from 1918-April-12 to 1943-Dec-31
    /*
      This function calculates the total number of days from the year after the base year up to (but not including) the specified year.
    */
    totalDays += calculateDaysFromBaseYear(year, fromBS);
    /* 
      Add the total days from January up to the specified month (adMonth) in the current year (adYear).
    */
    totalDays += totalDaysUntilMonth(year, month, fromBS);

    /* 
      Finally, add the days of the current month (adDay) to the total days.
      */
    totalDays += fromBS
      ? day
      : year === adBaseYear && month === adBaseMonth
      ? day - adBaseDay - 1
      : day;

    return getFullDate(totalDays, fromBS);
  } else {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if (fromBS)
      return {
        year,
        month,
        day,
      };
    return convertDate({ year, month, day, fromBS });
  }
}
