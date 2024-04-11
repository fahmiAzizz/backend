const pool = require("../database/index")
const postsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from wish")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from wish where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { name, presence, message, created_at } = req.body;
            const sql = "INSERT INTO wish (name, presence, message, created_at) VALUES (?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [name, presence, message, new Date().toISOString().slice(0, 19).replace('T', ' ')]);
            res.json({
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },    
    update: async (req, res) => {
        try {
            const { title, content } = req.body
            const { id } = req.params
            const sql = "update wish set title = ?, content = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [title, content, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from wish where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = postsController