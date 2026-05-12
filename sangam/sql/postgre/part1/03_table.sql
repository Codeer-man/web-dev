

CREATE TABLE IF NOT EXISTS basics.students(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE, 
    age INTEGER CHECK (age >= 18),
    created_at TIMESTAMP DEFAULT NOW()
);

-- psql cl
--  \dt basics.*  = to see tables 


INSERT INTO basics.students (name,email,age) 
VALUES
    ('manish','mdr34@gmail.com',18),
    ('manisha','mdfdr34@gmail.com',22);

SELECT * FROM basics.students