import express from 'express';

const app = express();

app.get('/servicio-1', (req, res) => {
    res.send('Hello World!');
    });

app.listen(3000, () => {
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
    });
