const dontThrow = <T, Y>(fn: () => T, def?: Y) => {
    try {
        return fn();
    }
    catch {
        return def;
    }
};

export {
    dontThrow,
};
