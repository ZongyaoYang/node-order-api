export function validateParams(schema) {
  return function paramsValidationMiddleware(req, res, next) {
    const result = schema.safeParse(req.params);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "params",
        message: issue.message,
      }));

      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "The URL parameters are invalid.",
          details,
        },
      });
    }

    res.locals.validateParams = result.data;

    return next();
  };
}
