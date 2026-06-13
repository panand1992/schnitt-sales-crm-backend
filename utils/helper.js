import { internalServerError, badRequest, multipleChoices, resultSuccess } from "../constants/httpCodes.js";
import { yellow, red, cyan, green, noColor } from "../constants/httpColorCodes.js";

export const customRequestLogger = (tokens, req, res) => {
    let color;

    if (tokens.status(req, res) >= internalServerError) {
        color = red;
    } else if (tokens.status(req, res) >= badRequest) {
        color = yellow;
    } else if (tokens.status(req, res) >= multipleChoices) {
        color = cyan;
    } else if (tokens.status(req, res) >= resultSuccess) {
        color = green;
    } else {
        color = noColor;
    }

    return [
        tokens.method(req, res),
        tokens.url(req, res),
        `\x1b[${color}m${tokens.status(req, res)}`,
        `\x1b[0m${tokens["response-time"](req, res)}`,
        "ms - ",
        tokens.res(req, res, "content-length"),
        " - ",
        tokens.date(req, res, "iso"),
        JSON.stringify(req.headers),
        JSON.stringify(req.body),
    ].join(" ");
};
