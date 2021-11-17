const { PORT = 5000 } = process.env;
const app = require('./app');

//confirm server startup in console
const listener = console.log(`Listening on port ${PORT}!`);

app.listen(PORT, listener);