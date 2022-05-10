DROP SCHEMA IF EXISTS "weather" CASCADE;

CREATE SCHEMA "weather";

CREATE TABLE "weather"."cities" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "city" varchar NOT NULL UNIQUE,
  "state" varchar NOT NULL,
  "type" varchar NOT NULL,
  "latitude" decimal NOT NULL,
  "longitude" decimal NOT NULL,
  "temp" decimal NOT NULL,
  "clouds" int NOT NULL,
  "wind_speed" decimal NOT NULL,
  "alerts" varchar
)

-- to create schema, run:
-- psql -h localhost -f schema.sql
-- in terminal