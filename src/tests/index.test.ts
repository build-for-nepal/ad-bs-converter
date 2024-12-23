import { adToBS, bsToAD } from "../index";

describe("ad to bs testing", () => {
  it("1996-10-11 input should return {year:2053,month:6,day:25}", () => {
    const result = adToBS("1996-10-11");
    // expect(result).toHaveProperty("year", 2053);
    expect(result).toMatchObject({ year: 2053, month: 6, day: 25 });
  });

  it("should return {year:2081,month:7,day:21} date", () => {
    const result = adToBS(1730870132814);
    expect(result).toMatchObject({ year: 2081, month: 7, day: 21 });
  });

  it("should return current date if the input is empty", () => {
    const result = adToBS();
    expect(result).toHaveProperty("year", 2081);
  });

  it("should throw an error if date is not valid", () => {
    const args = ["20222-222-222", "hello"];
    args.forEach((arg) => {
      expect(() => {
        adToBS(arg);
      }).toThrow();
    });
  });
});

describe("bs to ad testing", () => {
  it("2053-6-25 input should return {year:1996,month:10,day:11}", () => {
    const result = bsToAD("2053-6-25");
    // expect(result).toHaveProperty("year", 1996);
    expect(result).toMatchObject({ year: 1996, month: 10, day: 11 });
  });

  it("should return current date if the input is empty", () => {
    const result = bsToAD();
    const date = new Date();
    expect(result).toMatchObject({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  });

  it("should throw an error if date is not valid", () => {
    const args = ["20222-222-222", "hello"];
    args.forEach((arg) => {
      expect(() => {
        adToBS(arg);
      }).toThrow();
    });
  });
});
