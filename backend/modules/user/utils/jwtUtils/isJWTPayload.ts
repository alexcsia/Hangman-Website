export default function isJwtPayloadWithUserData(
  verifiedToken: unknown
): verifiedToken is { id: string; email: string; username: string } {
  return (
    typeof verifiedToken === "object" &&
    verifiedToken != null &&
    "id" in verifiedToken &&
    "email" in verifiedToken &&
    "username" in verifiedToken
  );
}
