

--   makes ur queries short and easier to read

-- like posts.tile = p.title
-- user.name = u.name

SELECT 
    p.title,
    p.views,
    u.name
FROM user as u
INNER JOIN posts as p 
    on u.id = p.user_id
order by p.views asc