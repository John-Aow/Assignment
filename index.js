const { port } = require('./config/vars');
const app = require('./config/express');


app.listen(port, () => console.log(`server started on port ${port}`));


module.exports = app;