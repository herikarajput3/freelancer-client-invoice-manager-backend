import { ZodError } from "zod";

import ValidationError from "../shared/errors/ValidationError.js";

const validate = (schemas) => {
    return (req, res, next) => {
        try {
            const validatedData = {};

            for (const [source, schema] of Object.entries(schemas)) {
                if (!schema) {
                    continue;
                }

                validatedData[source] = schema.parse(req[source]);
            }

            req.validated = validatedData;

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const details = error.issues.map((issue) => ({
                    path: issue.path,
                    message: issue.message,
                }));

                return next(
                    new ValidationError(
                        "Request validation failed.",
                        "VALIDATION_ERROR",
                        details
                    )
                );
            }

            next(error);
        }
    };
};

export default validate;