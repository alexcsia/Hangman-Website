"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isJwtPayloadWithUserData;
function isJwtPayloadWithUserData(verifiedToken) {
    return (typeof verifiedToken === "object" &&
        verifiedToken != null &&
        "id" in verifiedToken &&
        "email" in verifiedToken &&
        "username" in verifiedToken);
}
