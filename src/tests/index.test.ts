import { adToBS } from "../index";

describe("ad to bs testing", () => {
  it("1996-10-11 input should return {year:2053,month:6,day:25}", () => {
    const result = adToBS("1996-10-11");
    // expect(result).toHaveProperty("year", 2053);
    expect(result).toMatchObject({ year: 2053, month: 6, day: 25 });
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
