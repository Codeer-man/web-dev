
DROP TABLE IF EXISTS basics.event

CREATE TABLE IF NOT EXISTS basics.event (
    -- uuid
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event VARCHAR(20) NOT NULL,

    -- JSONB store json data in binary format
    metadata JSONB DEFAULT '{}'::jsonb,
    createdAt TIMESTAMP DEFAULT NOW()
);   

-- null = unknown or missing data 
--empty string = know string value but contain no characters
-- zero -acutal numeric value of 0