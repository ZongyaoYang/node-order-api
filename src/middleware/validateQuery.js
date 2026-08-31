export function validateQuery(schema) {
  return function queryValidationMiddleware(req, res, next) {
    const result = schema.safeParse(req.query);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join(".") || "query",
        message: issue.message,
      }));

      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: "The query parameters are invalid.",
          details,
        },
      });
    }

    res.locals.validatedQuery = result.data;

    return next();
  };
}
