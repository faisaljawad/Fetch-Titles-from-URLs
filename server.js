var express = require('express'),
    app = express();
port = process.env.PORT || 3000;
var routes = require('./api/routes/routes')

app.use(routes)
app.listen(port);

console.log('RESTful API server started on: ' + port);

module.exports = app;