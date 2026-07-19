import db from "../config/db.js"

const createTask = (task_name, description, priority) => {
    return new Promise((resolve, reject) => {
        const insertQuery = `
        INSERT INTO tasks (task_name, description, priority)
        VALUES(?, ?, ?)
        `;
        db.query(insertQuery, [task_name, description, priority], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const getAllTask = () => {
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM tasks ORDER BY created_at DESC"
        db.query(selectQuery, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
};

const getById = (id) => {
    return new Promise((resolve, reject) => {
        const idQuery = "SELECT * FROM tasks WHERE id=?"
        db.query(idQuery, [id], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
}
const updateTask = (id, task_name, description, priority, status) => {
    return new Promise((resolve, reject) => {
        const UpdateQuery = ` UPDATE tasks
        SET
        task_name=?,
        description=?,
        priority=?,
         status=?
    WHERE id=?
        `
            ;
        db.query(UpdateQuery, [task_name, description, priority, status, id], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
}
const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        const deleteQuery = "DELETE FROM tasks WHERE id=?"
        db.query(deleteQuery, [id], (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        });
    });
}
export {
    createTask,
    getAllTask,
    getById,
    updateTask,
    deleteTask
}