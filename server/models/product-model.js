const { Client } = require('pg');

const client = new Client({
  database: 'productDB',
  port: '5432',
});
client.connect();

const {
  testProducts, testProduct, testStyles, testRelated,
} = require('./example-data');

module.exports = {
  getProductsDB(callback) {
    callback(null, testProducts);
  },
  getProductDB(productID, callback) {
    // callback(null, testProduct);
    client.query('SELECT products.*, features.feature, features.val FROM products JOIN features ON products.id = features.product_id WHERE products.id = $1', [productID], (err, result) => {
      if (err) {
        console.log('there was an error', err);
        callback(err);
      } else {
        const queryResult = {
          id: result.rows[0].id,
          name: result.rows[0].product_name,
          slogan: result.rows[0].slogan,
          description: result.rows[0].prod_description,
          category: result.rows[0].category,
          default_price: result.rows[0].default_price,
          features: [],
        };
        result.rows.forEach((entry) => {
          const oneFeature = {
            feature: entry.feature,
            val: entry.val,
          };
          queryResult.features.push(oneFeature);
        });
        callback(null, queryResult);
      }
    });
  },
  getStylesDB(productID, callback) {
    // callback(null, testStyles); // skus, styles, and photos
    client.query('SELECT styles.id AS style_id, styles.style_name AS "name", styles.original_price, styles.sale_price, styles.default_style AS "default?", (SELECT json_agg(nested_photos) FROM (SELECT photos.thumbnail_url, photos.photo_url AS url FROM photos WHERE photos.styleid = styles.id) AS nested_photos) AS photos, (SELECT json_object_agg(nested_skus.id, nested_skus) FROM (SELECT skus.id, skus.quantity, skus.size FROM skus WHERE skus.styleid = styles.id) AS nested_skus) AS skus FROM styles WHERE styles.productid = $1', [productID], (err, result) => {
      if (err) {
        console.log('error occurred', err);
        callback('err is', err);
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
    // callback(null, testRelated);
    client.query('SELECT array_agg(related.related_product_id) FROM products JOIN related ON products.id = related.current_product_id WHERE products.id = $1', [productID], (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result.rows[0].array_agg);
      }
    });
  },
};
