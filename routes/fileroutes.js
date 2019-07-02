// Load the MySQL pool connection
const pool = require('../data/config');
const fs = require('fs');


// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({ message: 'Welcome to the Node.js Express REST API!' });
    });
    // Display all users
    app.get('/users', (request, response) => {
        fs.readFile('data/dev/student.json', (err, data) => {
            if (err) throw err;
            let result = JSON.parse(data);
            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;
        fs.readFile('data/dev/student.json', (err, data) => {
            if (err) throw err;
            var result = JSON.parse(data);
            var fresult=result.find(d=>d.id=id);
            response.send(fresult);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        var availabledata=null;
        fs.readFile('data/dev/student.json', (err, data) => {
            if (err) throw err;
            this.availabledata = JSON.parse(data);
         request.body.id=this.availabledata[this.availabledata.length-1].id;
         this.availabledata.push(request.body)
         fs.writeFileSync('data/dev/student.json', JSON.stringify(this.availabledata));  
         response.status(201).send(`User added with ID: ${request.body.id}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;
        fs.readFile('data/dev/student.json', (err, data) => {
            if (err) throw err;
            this.availabledata = JSON.parse(data);
            this.availabledata.forEach(element => {
                if(id==element.id){
                    element.name=request.body.name;
                    element.username=request.body.username;
                    element.email=request.body.email;
                }
            });
         fs.writeFileSync('data/dev/student.json', JSON.stringify(this.availabledata));  
         response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;
        fs.readFile('data/dev/student.json', (err, data) => {
            var remaining=[];
            if (err) throw err;
            this.availabledata = JSON.parse(data);
            this.availabledata.forEach(element => {
                if(id!=element.id){
                    remaining.push(element);
                }
            });
         fs.writeFileSync('data/dev/student.json', JSON.stringify(remaining));  
         response.send('User deleted successfully.');
        });
    });
}

// Export the router
module.exports = router;