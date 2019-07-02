// Require packages
const express = require('express');
const bodyParser = require('body-parser');
var routes = require('./routes/routes');
const app = express();
const args = require('yargs').argv;

// Set the port
const port = 5000;
const datasource=args.ds;
if(datasource=="file"){
    routes = require('./routes/fileroutes');
}

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Route the API
routes(app);

// Start the server
const server = app.listen(port, () => {
    console.log(`App running on port ${server.address().port}`);
});
