const express = require('express');
const path = require('path');
const port = parseInt(process.env.PORT || '', 10) || 3000;
const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port);

console.log(`Express application is up and running on port: ${port}`);
