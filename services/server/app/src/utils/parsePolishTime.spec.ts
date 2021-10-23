import { parsePolishTime } from "./parsePolishTime.js";

describe("parsePolishTime", () => {
    it("corrently parses various values", () => {
        parsePolishTime("około 40 min.").must.equal(40);
        parsePolishTime("ok. 40 minut").must.equal(40);
        parsePolishTime("ok. 3 godzin").must.equal(180);
        parsePolishTime("ok. 3 godziny").must.equal(180);
        parsePolishTime("3 godziny 49 minut").must.equal(229);
        parsePolishTime("1 godzina 49 minut").must.equal(109);
    });
});
