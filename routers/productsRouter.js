import {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProductById,
} from '../controllers/productsControllers.js';
import { respond } from '../utils/respond.js';

export default function productsRouter(req, res) {
  switch (req.method) {
    case 'GET':
      if (!req.params.id) {
        return getProducts(req, res);
      } else {
        return getProductById(req, res);
      }
    case 'POST':
      return createProduct(req, res);
    case 'PUT':
      return updateProduct(req, res);
    case 'DELETE':
      return deleteProductById(req, res);
    default:
      return respond(res, 405, 'application/json', { msg: `${req.method} not allowed` });
  }
}
