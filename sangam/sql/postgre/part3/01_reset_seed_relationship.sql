

CREATE EXTENSION IF NOT EXISTSpgcrypto;


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS post_tags ;

CREATE TABLE users{
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,

    name TEXT NOT NULL
};

CREATE TABLE posts{
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,

    user_id UUID NOT NULL REFERENCES users(id),

    title TEXT NOT NULL ,
    
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN('draft','published')),

    views INTEGER NOT NULL DEFAULT 0
        CHECK (views >= 0)

};

CREATE TABLE comments{
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,

    post_id UUID NOT NULL REFERENCES posts(id),

    body TEXT NOT NULL ,
};

CREATE TABLE tags{
    id UUID PRIMARY KEY DEFAULT gen_random_uuid,

    name TEXT NOT NULL UNIQUE


};

-- many to many relationship
CREATE TABLE post_tags{
    post_id UUID NOT NULL  REFERENCES post(id),
    tags_id UUID NOT NULL REFERENCES tags(id),

    -- prevents from re occurace of the tag in a post
    PRIMARY KEY (post_id,tags_id), 
};

