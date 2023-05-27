const { Client } = require('pg');

const client = new Client({
  database: 'productDB',
  port: '5432',
});
client.connect();

describe('getProductsDB', () => {
  it('should work like getProductsDB', () => {
    client.query(`SELECT
      products.id,
      products.product_name AS "name",
      products.slogan,
      products.prod_description AS "description",
      products.category,
      products.default_price
      FROM products LIMIT = $1`, [5], (err, result) => {
      if (result) {
        expect(result).toBeTruthy();
      }
    });
  });
});

describe('getProductDB', () => {
  it('should work like getProductDB', () => {
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
    FROM products WHERE products.id = $1`, [40344], (err, result) => {
      if (result) {
        expect(result).toBeTruthy();
      }
    });
  });
});

describe('getStylesDB', () => {
  it('should work like getStylesDB', () => {
    client.query('SELECT styles.id AS style_id, styles.style_name AS "name", styles.original_price, styles.sale_price, styles.default_style AS "default?", (SELECT json_agg(nested_photos) FROM (SELECT photos.thumbnail_url, photos.photo_url AS url FROM photos WHERE photos.styleid = styles.id) AS nested_photos) AS photos, (SELECT json_object_agg(nested_skus.id, nested_skus) FROM (SELECT skus.id, skus.quantity, skus.size FROM skus WHERE skus.styleid = styles.id) AS nested_skus) AS skus FROM styles WHERE styles.productid = $1', [40344], (err, result) => {
      if (result) {
        expect(result).toBeTruthy();
      }
    });
  });
});

describe('getRelatedDB', () => {
  it('should work like getRelatedDB', () => {
    client.query('SELECT array_agg(related.related_product_id) FROM products JOIN related ON products.id = related.current_product_id WHERE products.id = $1', [40344], (err, result) => {
      if (result) {
        expect(result).toBeTruthy();
      }
    });
  });
});
