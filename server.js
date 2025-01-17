import http from 'http';
import chalk from 'chalk';
import { respond } from './utils/respond.js';
import productsRouter from './routers/productsRouter.js';

const port = process.env.PORT || 8000;

const requestHandler = (req, res) => {
  // const { url } = req;
  // const [, route, id] = url.split('/');
  const url = new URL(req.url, `http://${req.headers.host}`);

  const segments = url.pathname.split('/').filter(Boolean);
  const [route = '', id] = segments;
  const queryParams = Object.fromEntries(url.searchParams);

  req.params = { id };
  req.query = queryParams;

  switch (route) {
    case '':
      respond(res, 200, 'text/plain', 'Healthy');
      break;
    case 'products':
      // req.params = { id };
      productsRouter(req, res);
      break;
    default:
      respond(res, 404, 'text/plain', 'Not found');
  }
};

const server = http.createServer(requestHandler);
server.listen(port, () => console.log(chalk.bgGreen(`Server running on port ${port}`)));
