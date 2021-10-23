const parsePolishTime = (time: string) => {
    const s = time.replace(/oko[łl]o/, "").replace(/ok./, "").trim();

    let minutes = 0,
        hours = 0;

    const m = /(\d+)\s*min/.exec(s);
    if (m) {
        minutes = Number(m[1]);
    }

    const h = /(\d+)\s*godzin/.exec(s);
    if (h) {
        hours = Number(h[1]);
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return (hours * 60) + minutes;
};

export {
    parsePolishTime,
};
