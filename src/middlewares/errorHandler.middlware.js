import pkg from "@prisma/client";
const { PrismaClientKnownRequestError } = pkg;

const errorHandler = (error, req, res, next) => {
    if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
            case "P1012":
                return res
                    .status(400)
                    .send({ message: error?.message , meta:error.meta });
            case "P2002":
                return res
                    .status(409)
                    .send({ message: `${error.meta.target.join(",")} already exists` });
            case "P2025":
                return res
                    .status(404)
                    .send({ message: `${error.meta?.target?.join(",") || 'record'} not found` });
            case "P2006":
                return res.status(400).send({ message: `The provided value for field ${error.meta.target.join(",")} is not valid`})
            case "P2003":
                return res
                    .status(409)
                    .send({ message: `Foreign key constraint failed: ${error.meta.target.join(",")}` });
            default:
                return res.status(error.status || 400).send({ message: error.message || "Invalid Request" });
        }
    } else {
        return res.status(error.status || 500).send({ message: error.message || "Internal server error" });
    }
};

const catchErrors = (fn) => {
    return function (req, res, next) {
        return fn(req, res, next).catch((err) => {
            next(err);
        });
    };
};

export {
    errorHandler,
    catchErrors,
};