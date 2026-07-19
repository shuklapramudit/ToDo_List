Create DATABASE todo;
use todo;
CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM("High", "Medium", "Low") NOT NULL,
    status ENUM("Pending", "In Progress", "Completed") NOT NULL DEFAULT "Pending",
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLES users(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    email VARCHAR(30)UNIQUE  NOT NULL, 
    password VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)