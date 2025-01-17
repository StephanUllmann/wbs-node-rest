import http from 'http';
import chalk from 'chalk';
import { respond } from './utils/respond.js';
import productsRouter from './routers/productsRouter.js';

const port = process.env.PORT || 8000;

const requestHandler = (req, res) => {
  const { url } = req;
  const [, route, id] = url.split('/');

  switch (route) {
    case '':
      respond(res, 200, 'text/plain', 'Healthy');
      break;
    case 'products':
      req.params = { id };
      productsRouter(req, res);
      break;
    default:
      respond(res, 404, 'text/plain', 'Not found');
  }
};

const server = http.createServer(requestHandler);
server.listen(port, () => console.log(chalk.bgGreen(`Server running on port ${port}`)));
