var Hapi = require('hapi');
 
// create a new instance of hapi server
var server = new Hapi.Server();
 
// port 3030, and I will be using localhost
// when running I will connect via http://localhost:3030
server.connection({
    port : 3030,
    host : 'localhost'
});


// register plug ins
server.register(
require('inert'),

    // callback
    function (err) {

        if (err) {
            throw err;
        }

        // set a route
        server.route({
            method : 'GET',
            path : '/{param*}',
            handler : {

                directory : {
                    path : 'html'
                }

            }
        });

    }

);


// start the server
server.start(function () {
 
    console.log('hapi server up: ');
 
});