import Boom from '@hapi/boom';

// handle error middleware
export default function (app) {
  // Error: 404
  app.use((req, res, next) => {
    next(Boom.notFound('Invalid endpoint'));
  });

  app.use(async (err, req, res, next) => {

    const statusCode = err.code || 500;
    let _err = err.isBoom ? err : Boom.boomify(err, { statusCode });

     /** Boom error */
     const payload = {
        error: _err.output.payload.error,
        message: _err.output.payload.statusCode === 500 ? 'Something went wrong' : _err.message,
        statusCode: _err.output.payload.statusCode,
      };

    console.log(`Name: ${payload.error} | message: ${payload.message} | errorMessage: ${_err.message} | status: ${payload.statusCode}`);

    res.status(payload.statusCode).json({
      success: false,
      data: payload,
    });
    next();
  });
};