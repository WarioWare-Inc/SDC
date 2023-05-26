const {
  getProductsDB, getProductDB, getStylesDB, getRelatedDB,
} = require('../models/product-model');

module.exports = {
  getProducts(req, res) {
    getProductsDB((err, productsData) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(productsData);
      }
    });
  },

  getProduct(req, res) {
    const { productId } = req.params;

    getProductDB(productId, (err, productData) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(productData);
      }
    });
  },

  getProductStyle(req, res) {
    const { productId } = req.params;

    getStylesDB(productId, (err, stylesData) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(stylesData);
      }
    });
  },

  getRelated(req, res) {
    const { productId } = req.params;

    getRelatedDB(productId, (err, relatedData) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(relatedData);
      }
    });
  },
};
