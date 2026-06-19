
-- left join keeps all rows from the left table
-- if right table has a matching data it includes it
-- if not mathcing reutrns null

-- eg: some post will have 100 comments and some will have 0

SELECT 
    posts.title
    comments.body
FROM posts
LEFT JOIN comments
    ON posts.id = comments.post_id
