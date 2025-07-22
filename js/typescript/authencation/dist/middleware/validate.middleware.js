"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (Schema) => (req, res, next) => {
    const result = Schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({
            error: "Validation failed",
            issues: result.error.errors.map((e) => ({
                path: e.path.join("."),
                message: e.message,
            })),
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.validation = validation;
