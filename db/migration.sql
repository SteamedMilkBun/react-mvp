DROP TABLE IF EXISTS datacards;

CREATE TABLE datacards (
    dc_id SERIAL PRIMARY KEY,
    dc_title VARCHAR(50),
    dc_desc VARCHAR(255)
)