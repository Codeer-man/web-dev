
-- one parent rows can have many children rows
-- eg: one user can create one post but one post belongs to one user

-- difference between on and where
-- The main difference is that ON filters data before tables are joined, while WHERE filters data after tables are joined


-- show all post woth there user
SELECT 
    user.name,
    posts.title
FROM user
INNER JOIN posts
    ON user.id = post.user_id
ORDER BY user.name,posts.title