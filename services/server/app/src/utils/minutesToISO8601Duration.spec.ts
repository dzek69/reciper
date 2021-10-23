import { minutesToISO8601Duration } from "./minutesToISO8601Duration.js";

describe("minutesToISO8601Duration", () => {
    it("correctly converts < 1hr values", () => {
        minutesToISO8601Duration(44).must.be("PT44M");
        minutesToISO8601Duration(13).must.be("PT13M");
    });

    it("correctly converts 1hr", () => {
        minutesToISO8601Duration(60).must.be("PT1H");
    });

    it("correctly converts 2hr (full hour)", () => {
        minutesToISO8601Duration(120).must.be("PT2H");
    });

    it("correctly converts > 1hr", () => {
        minutesToISO8601Duration(65).must.be("PT1H5M");
    });

    it("correctly converts floats", () => {
        minutesToISO8601Duration(5.5).must.be("PT6M");
        minutesToISO8601Duration(5.4).must.be("PT5M");
    });

    it("throws on bad values (none, 0, negative)", () => {
        (() => { minutesToISO8601Duration(); }).must.throw();
        (() => { minutesToISO8601Duration(0); }).must.throw();
        (() => { minutesToISO8601Duration(-10); }).must.throw();
    });
});
