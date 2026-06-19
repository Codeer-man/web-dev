
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF  EXISTS products;

CREATE TABLE products(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    category TEXT NOT NULL ,

    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),

    stock INTEGER NOT NULL  DEFAULT 0 CHECK (stock >= 0),

    is_active BOOLEAN NOT NULL DEFAULT true,

    sku TEXT UNIQUE ,

    description TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO products (name,category,price,stock,sku) 
    VALUES ('Manish','Man',3499.00,20,'Product1'), ('Manish','Man',200.00,20,'Product2');

SELECT * FROM products WHERE (price >= 200);

-- alias - create a alias name for the output column name

SELECT name AS product_name FROM products WHERE price IN (3499.00,500.00);