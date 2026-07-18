Create DATABASE todo;
use todo;
CREATE TABLE tasks(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    task_name VARCHAR(255) NOT NULL,
    decriptionx TEXT, 
    priority ENUM("High", "Medium", "Low"), NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);