import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 5500;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'pages')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/shared', express.static(path.join(__dirname, 'shared')));

app.get('/:page', (req, res) => {
    const page = req.params.page;
    const pagePath = path.join(__dirname, 'pages', page, 'index.html');

    res.sendFile(pagePath, (err) => {
        if (err) {
            res.status(404).send('Página não encontrada');
        }
    });
});

app.listen(port, () => {
    console.log(`Siri Cascudo UI Server running at port ${port}`);
});