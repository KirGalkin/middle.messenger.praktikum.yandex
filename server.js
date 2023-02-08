const express = require('express');

const app = express();
const PORT = 3500;

app.use(express.static('./dist/'));

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`)
});