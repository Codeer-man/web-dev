DROP TABLE IF EXISTS basics.products_basic ;

CREATE TABLE IF NOT EXISTS basics.products_basic(
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    stock INTEGER DEFAULT 0,

    -- store larger whole number than int
    total_view BIGINT DEFAULT 0,

    -- exact number value 
    -- 10 means total digits
    -- 2 means digit after decimal points
    price NUMERIC(10,2),

    is_active BOOLEAN DEFAULT true
);

INSERT INTO basics.products_basic ( name,stock,price ) VALUES ('mane',10,200.00);


SELECT * FROM basics.products_basic;
