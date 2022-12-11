import cors from 'cors';

const allowedOrigins = ['http://localhost:3000'];

export default cors({
  origin: function (
    origin: string,
    callback: (arg0: Error | null, arg1: boolean) => any
  ): any {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
});
