 
--  inner join returns the mathcing rows from both tables

-- put parent in from and child in the inner join


--  Parent Table (FROM): The table that contains the core entity which can exist completely on its own (e.g., user).
--  Child Table (INNER JOIN): The table containing records that rely on the parent table to exist (e.g., posts, because a post cannot exist without a user to write it).

SELECT 
    user.name AS author_name,
    posts.title AS post_title,
    posts.status,
    posts.views
FROM user
INNER JOIN posts
    ON user.id = posts.user_id
WHERE posts.status = 'published'
ORDER BY posts.views DESC;
