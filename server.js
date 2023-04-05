const express = require('express');
const path = require('path');
const history = require('express-history-api-fallback');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(express.static(path.resolve(__dirname, './dist')));

app.use(history('index.html', {root: './dist'}));

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
