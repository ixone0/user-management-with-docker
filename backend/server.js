import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

let db = null;

const initMySQL = async () => {
    db = mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'tinnadech',
        database: 'user_db',
    });

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            setTimeout(initMySQL, 5000); // ลองเชื่อมต่อใหม่ทุก ๆ 5 วินาที
            return;
        }
        console.log('Connected to MySQL');
    });
};

// Endpoint สำหรับดึงข้อมูลผู้ใช้
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Endpoint สำหรับการลงทะเบียนผู้ใช้
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).send(err);
        }
        res.status(201).json({ message: 'User created successfully!' });
    });
});

// Endpoint สำหรับการล็อกอินผู้ใช้
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            return res.status(500).send(err);
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
});

app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running at http://localhost:${port}/`);
});
