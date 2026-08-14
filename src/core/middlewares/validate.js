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
                const errors = error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message,
                }));

                return next(
                    new ValidationError(
                        "Validation failed.",
                        errors
                    )
                );
            }

            next(error);
        }
    };
};

export default validate;