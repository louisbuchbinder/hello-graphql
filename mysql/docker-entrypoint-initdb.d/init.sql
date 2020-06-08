CREATE DATABASE sample;
USE sample;

CREATE TABLE users (
  id  varchar(255) NOT NULL,
  email varchar(255) UNIQUE,
  phone varchar(255) UNIQUE,
  passwordHash varchar(255), 
  PRIMARY KEY (id)
);

CREATE TABLE sessions (
  id  varchar(255) NOT NULL,
  userId varchar(255) NOT NULL, 
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id varchar(255) NOT NULL,
  ownerId varchar(255) NOT NULL,
  message varchar(1023),
  dateCreated bigint NOT NULL,
  dateUpdated bigint NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY (ownerId) REFERENCES users (id) ON DELETE CASCADE
);
