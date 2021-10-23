const minutesToISO8601Duration = (minutes: number) => {
    if (!minutes || minutes < 0) {
        throw new TypeError("Minutes must be positive value");
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const hrs = Math.floor(minutes / 60);
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const mins = Math.round(minutes % 60);

    let s = "PT";

    if (hrs) {
        s += String(hrs) + "H";
    }
    if (mins) {
        s += String(mins) + "M";
    }

    return s;
};

export {
    minutesToISO8601Duration,
};
