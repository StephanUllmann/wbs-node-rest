import { query } from '../db/index.js';
import { respond } from '../utils/respond.js';

export const getProducts = async (req, res) => {
  try {
    // throw new Error('GREMLIN');
    const result = await query('select * from products;');
    return respond(res, 200, 'application/json', { data: result.rows });
  } catch (err) {
    return respond(res, 500, 'application/json', { err: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('select * from products where id = $1;', [id]);
    if (!result.rows[0]) return respond(res, 404, 'application/json', { err: `Entry ${id} not found` });
    return respond(res, 200, 'application/json', { data: result.rows[0] });
  } catch (err) {
    return respond(res, 500, 'application/json', { err: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      const { name, image, description, category, price, stock } = JSON.parse(body);
      const result = await query(
        'insert into products (name, image, description, category, price, stock) values ($1, $2, $3, $4, $5, $6) returning *;',
        [name, image, description, category, price, stock]
      );
      if (!result.rowCount) {
        return respond(res, 500, 'application/json', { err: 'Creating new Entry failed' });
      }
      return respond(res, 201, 'application/json', { data: result.rows[0] });
    });
  } catch (err) {
    return respond(res, 500, 'application/json', { err: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', async () => {
      let { name, image, description, category, price, stock } = JSON.parse(body);
      // console.log(JSON.parse(body));
      // name = name === undefined ? null : name;
      // image = image === undefined ? null : image;
      // description = description === undefined ? null : description;
      // category = category === undefined ? null : category;
      const result = await query(
        `UPDATE products
           SET name = COALESCE($1, name),
               image = COALESCE($2, image),
               description = COALESCE($3, description),
               category = COALESCE($4, category),
               price = COALESCE($5, price),
               stock = COALESCE($6, stock)
           WHERE id = $7
           RETURNING *;`,
        [name, image, description, category, price, stock, id]
      );
      if (!result.rowCount) {
        return respond(res, 500, 'application/json', { err: 'Updating Entry failed' });
      }
      return respond(res, 201, 'application/json', { data: result.rows[0] });
    });
  } catch (err) {
    return respond(res, 500, 'application/json', { err: err.message });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query('delete from products where id = $1 returning *;', [id]);
    if (!result.rowCount) return respond(res, 404, 'application/json', { err: `Entry ${id} not found` });
    return respond(res, 200, 'application/json', { data: result.rows[0] });
  } catch (err) {
    return respond(res, 500, 'application/json', { err: err.message });
  }
};
