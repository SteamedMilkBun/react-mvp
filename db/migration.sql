DROP TABLE IF EXISTS dataCard;

CREATE TABLE dataCard (
    dc_id SERIAL PRIMARY KEY,
    dc_title VARCHAR(50),
    dc_desc VARCHAR(255)
)