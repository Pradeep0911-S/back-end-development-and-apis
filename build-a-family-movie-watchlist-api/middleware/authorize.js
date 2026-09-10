export function authorizeModification(req, res, next) {
  const targetUserId = Number(req.params.userId);
  const authenticatedUserId = Number(req.user.id);

  if (req.user.role === "parent") {
    return next();
  }

  if (
    req.user.role === "child" &&
    targetUserId === authenticatedUserId
  ) {
    return next();
  }

  return res.status(403).json({
    error: "Access denied",
  });
}
