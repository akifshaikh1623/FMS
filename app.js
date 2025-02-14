const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '162316',
    database: 'fms'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

app.get('/api/data', (req, res) => {
    const query = `
        SELECT 
            ID as id, 
            NAME as name, 
            FILE_NAME as file_name, 
            FILE_CONTENT as file_content, 
            UPLOADED_DATE as uploaded_date, 
            DELETED as deleted, 
            SUBJECT_ID as subject_id
        FROM documents
        WHERE DELETED = 0
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send('Database query error');
        } else {
            res.json(results);
        }
    });
});

const PORT = 4010;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
