const clog = (req, res, next) => {
  const fgGreen = '\x1b[32m';
  const fgPurple = '\x1b[35m';
  const fgRed = '\x1b[31m';
  const fgCyan = '\x1b[36m';
  switch (req.method) {
    case 'GET': {
      console.info(`${fgGreen}${req.method} request to ${req.path}`);
      break;
    }
    case 'POST': {
      console.info(`${fgPurple}${req.method} request to ${req.path}`);
      break;
    }
    case 'DELETE': {
      console.info(`${fgRed}${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`${fgCyan}${req.method} request to ${req.path}`);
  }
  next();
};

exports.clog = clog;