-- primary key - something unique to identify the row to create,read,update,delete

DROP TABLE IF EXISTS basics.primary ;

CREATE TABLE basics.primary (
    id SERIAL PRIMARY KEY ,

    item TEXT NOT NULL ,

    stock INTEGER DEFAULT 0,

    price INT CHECK (PRICE > 0),
    createdAt TIMESTAMP DEFAULT NOW()

);

INSERT INTO basics.primary (item,stock,price) VALUES ('shoe',10,100),('shirt',13,23);

-- SELECT * FROM basics.primary;
SELECT * FROM basics.primary where (id =2);