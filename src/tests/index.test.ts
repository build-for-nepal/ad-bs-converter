import { adToBS, bsToAD } from "../index";

describe("ad to bs testing", () => {
  it("1996-10-11 input should return {year:2053,month:6,day:25}", () => {
    const result = adToBS("1996-10-11");
    // expect(result).toHaveProperty("year", 2053);
    expect(result).toMatchObject({ year: 2053, month: 6, day: 25 });
  });

  it("should return current date", () => {
    const result = adToBS(Date.now());
    expect(result).toHaveProperty("year", 2081);
  });

  it("should throw an error if date is not valid", () => {
    const args = ["20222-222-222", "", "hello"];
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

  it("should throw an error if date is not valid", () => {
    const args = ["20222-222-222", "", "hello"];
    args.forEach((arg) => {
      expect(() => {
        adToBS(arg);
      }).toThrow();
    });
  });
});
