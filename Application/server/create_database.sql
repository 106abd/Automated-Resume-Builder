CREATE DATABASE automated_resume_builder_database; -- Create the database

CREATE TABLE users( -- Create 'users' table
    user_id SERIAL PRIMARY KEY, -- Give every user a unique ID number
    user_name VARCHAR(20) UNIQUE NOT NULL,
    user_password VARCHAR(40) NOT NULL
);

CREATE TABLE resumes( -- Create 'users' table
    resume_id SERIAL PRIMARY KEY, -- Give every resume a unique ID number
    resume_name VARCHAR(255) NOT NULL,
    resume_code TEXT,
    last_updated DATE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE -- Delete resumes if user is deleted as well
);

CREATE TABLE chat_logs( -- Create 'chat_logs' table
    chat_id SERIAL PRIMARY KEY, -- Give every chat log a unique ID number
    chat_history JSONB NOT NULL, -- Store chat history in Binary JSON
    resume_id INTEGER REFERENCES resumes(resume_id) ON DELETE CASCADE -- Delete chat log if corresponding resume is also deleted
);

-- Dummy account for debugging purposes
INSERT INTO users (user_name, user_password) VALUES ('debugger', 'debugger123');
