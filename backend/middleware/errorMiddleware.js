const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };
        error.message = err.message;
        console.log(`Error: ${error.message}`);

        //Mongoose bad ObjectId error
        if (error.name === 'CastError') {
            const message = `Resource not found - ${req.originalUrl}`;
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key error
        if (error.code === 11000) {
            const message = `Duplicate field value entered: ${JSON.stringify(error.keyValue)}`;
            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message);
            error = new Error(message);
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Server Error',
        });
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;