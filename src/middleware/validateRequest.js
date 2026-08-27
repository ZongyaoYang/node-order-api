export function validateRequest(schema) {
  return function validationMiddleware(req, res, next) {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "requestBody",
        message: issue.message,
      }));

      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "The request contains invalid fields.",
          details,
        },
      });
    }

    req.body = result.data;

    next();
  };
}
