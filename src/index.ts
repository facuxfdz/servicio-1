import express from 'express';

const app = express();

app.use(express.json());

app.get('/servicio-1', (req, res) => {
    console.log(req.body);
    res.json(req.body);
});


app.listen(3000, () => {
    console.log('\x1b[32mServer running on port 3000\x1b[0m');
});
