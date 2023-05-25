\c productDB

DROP TABLE IF EXISTS products;
CREATE TABLE products (
  id SERIAL UNIQUE PRIMARY KEY,
  product_name TEXT,
  slogan TEXT,
  prod_description TEXT,
  category TEXT,
  default_price VARCHAR(15)
);

DROP TABLE IF EXISTS styles;
CREATE TABLE IF NOT EXISTS styles (
  id SERIAL UNIQUE PRIMARY KEY,
  productId INTEGER REFERENCES products(id),
  style_name VARCHAR(200),
  sale_price VARCHAR(15),
  original_price VARCHAR(15),
  default_style SMALLINT
);

DROP TABLE IF EXISTS photos;
CREATE TABLE IF NOT EXISTS photos (
  id SERIAL UNIQUE PRIMARY KEY,
  styleId INTEGER REFERENCES styles(id),
  photo_url TEXT,
  thumbnail_url TEXT
);

DROP TABLE IF EXISTS related; -- need to fix
CREATE TABLE IF NOT EXISTS related (
  id SERIAL UNIQUE PRIMARY KEY,
  current_product_id INTEGER REFERENCES products(id),
  related_product_id INTEGER
);

DROP TABLE IF EXISTS features;
CREATE TABLE IF NOT EXISTS features (
  id SERIAL UNIQUE PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  feature VARCHAR(200),
  val VARCHAR(200) NULL
);

DROP TABLE IF EXISTS skus;
CREATE TABLE IF NOT EXISTS skus (
  id SERIAL UNIQUE PRIMARY KEY,
  styleId INTEGER REFERENCES styles(id),
  size VARCHAR(10),
  quantity SMALLINT
);

-- commands ran for ETL:
COPY products FROM '/Users/foxinator/Documents/Hack Reactor Coursework/sdc csv files/product.csv' DELIMITER',' CSV HEADER;

COPY styles FROM '/Users/foxinator/Documents/Hack Reactor Coursework/sdc csv files/styles.csv' DELIMITER',' CSV HEADER;

COPY photos FROM '/Users/foxinator/Documents/Hack Reactor Coursework/sdc csv files/photos.csv' DELIMITER',' CSV HEADER;

COPY related FROM '/Users/foxinator/Documents/Hack Reactor Coursework/sdc csv files/related.csv' DELIMITER',' CSV HEADER;

COPY features FROM '/Users/foxinator/Documents/Hack Reactor Coursework/sdc csv files/features.csv' DELIMITER',' CSV HEADER;

COPY skus FROM '/Users/foxinator/Documents/Hack Reactor Coursework/sdc csv files/skus.csv' DELIMITER',' CSV HEADER;