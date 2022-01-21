const Pool = require("pg").Pool;
require("dotenv").config();
const bcrypt = require("bcryptjs");

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

const createUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      let errors = {};
  
      const isEmailInUse = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
      );

      if (isEmailInUse.rows.length > 0) {
        errors.email = "Email is already in use";
      }
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = await pool.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword]
      );
  
      res.json({sucess: true, data: newUser.rows[0]});
    } catch (err) {
      res.status(500).json({error: err.message})
    }
};

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      let errors = {};

      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

      if (user.rows.length === 0) {
        return res.status(404).json({
          error: {
            message: "User not found",
          },
        });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password);

      if (!isMatch) { error.message = "Incorrect password";}

      if(Object.keys(error).length > 0){return response.status(400).json(errors)}

      res.json({ success: true, data: user.rows[0]});
    } catch (err) {
      console.error("login not working");
    }
};

module.exports = {createUser, login, pool};

