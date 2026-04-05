function errorHandler(error, request, response, next) {

    if (error.name === 'SequelizeValidationError') {
        return response.status(400).send({ error: 'malformatted data' })
    }

    console.error('Error:', err);
    next(err)
}

module.exports = errorHandler