CREATE DATABASE productDB;

\c productDB -- connects to database

CREATE TABLE products (
  id SERIAL UNIQUE PRIMARY KEY,
  campus TEXT,
  product_name TEXT,
  slogan TEXT,
  prod_description TEXT,
  category TEXT,
  default_price TEXT,
  created_at TEXT,
  updated_at TEXT,
);

CREATE TABLE styles (
  product_id SERIAL REFERENCES products(id),
  style_id TEXT,
  style_name TEXT,
  sale_price TEXT,
  style_default TEXT,
);

CREATE TABLE photos (
  style_id SERIAL REFERENCES styles(product_id),
  thumbnail_url TEXT,
  photos_url TEXT,
);

CREATE TABLE related_ids (
  product_id SERIAL REFERENCES products(id),
  related_id SERIAL,
);