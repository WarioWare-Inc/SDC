require('dotenv').config();
const { Client } = require('pg');

// const client = new Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
const client = new Client({
  database: 'productDB',
  port: '5432',
});

client.connect();

module.exports = {
  getProductsDB(callback, limit = 5) {
    client.query(`SELECT
    products.id,
    products.product_name AS "name",
    products.slogan,
    products.prod_description AS "description",
    products.category,
    products.default_price
    FROM products LIMIT $1`, [limit], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  },
  getProductDB(productID, callback) {
    client.query(`SELECT
    products.id,
    products.product_name AS "name",
    products.slogan,
    products.prod_description AS "description",
    products.category,
    products.default_price,
    (
      SELECT json_agg(nested_features) FROM
      (
        SELECT
        features.feature,
        features.val AS value
        FROM features WHERE features.product_id = products.id
      ) AS nested_features
    ) AS features
    FROM products WHERE products.id = $1`, [productID], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows[0]);
      }
    });
  },
  getStylesDB(productID, callback) {
    client.query(`SELECT
    styles.id AS style_id,
    styles.style_name AS "name",
    styles.original_price,
    styles.sale_price,
    styles.default_style AS "default?",
    (
      SELECT json_agg(json_build_object('thumbnail_url', p.thumbnail_url, 'url', p.photo_url))
        FROM (
            SELECT DISTINCT ON (photos.thumbnail_url, photos.photo_url)
                photos.thumbnail_url,
                photos.photo_url
            FROM photos
            WHERE photos.styleid = styles.id
        ) p
    ) AS photos,
    (
      SELECT json_object_agg(s.id, json_build_object('quantity', s.quantity, 'size', s.size))
        FROM (
            SELECT DISTINCT ON (skus.id)
                skus.id,
                skus.quantity,
                skus.size
            FROM skus
            WHERE skus.styleid = styles.id
        ) s
    ) AS skus
    FROM styles
    WHERE styles.productid = $1`, [productID], (err, result) => {
      if (err) {
        callback(err);
      } else {
        const resultsObject = {
          product_id: productID,
          results: result.rows,
        };
        callback(null, resultsObject);
      }
    });
  },
  getRelatedDB(productID, callback) {
    client.query('SELECT array_agg(related.related_product_id) FROM products JOIN related ON products.id = related.current_product_id WHERE products.id = $1', [productID], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows[0].array_agg);
      }
    });
  },
};
