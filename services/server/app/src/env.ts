import getenv from "getenv";

const APP_PORT = getenv.int("APP_PORT");
const APP_IP = getenv("APP_IP");

export {
    APP_PORT,
    APP_IP,
};
