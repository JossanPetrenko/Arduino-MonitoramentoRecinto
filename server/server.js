'use strict';
const db = require("./db");
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: '0.0.0.0',
    port: 8000,
    routes: { cors: true }
});

// Add the route
server.route({
    method: 'POST',
    path: '/update-arduino',
    handler: function (request, reply) {

        var light = request.payload.light;

        console.log(request.payload);

        var sensorData = {
            light,
            date: new Date()
        };

        db.sensors.insert(sensorData, (err, data) => {
            if (err) {
                //salvar num log ??
            }

            db.commands.find({ completed: false }, (err, actions) => {

                if (err) {

                    return reply([]);
                }

                db.commands.update({ completed: false }, { completed: true }, { multi: true }, (err, num) => {
                    console.log(err, typeof num == "number" && num + " enviados");

                });

                reply("|" + actions.map(action => action.command).join(";"));

            });


        })

    }
});

// Add the route
server.route({
    method: 'GET',
    path: '/create-command',
    handler: function (request, reply) {

        var command = request.query.command;
        var params = request.query.params;

        db.commands.insert({ command, params, completed: false }, function (err, ok) {
            if (err) {
                return reply.code(400);
            }
            return reply("ok!");

        })

    }
});

server.route({
    method: 'GET',
    path: '/commands',
    handler: function (request, reply) {

        var command = request.query.command;
        var params = request.query.params;

        db.commands.find({}, function (err, commands) {
            if (err) {
                return reply.code(400);
            }
            return reply(commands);

        })

    }
});


server.route({
    method: 'GET',
    path: '/sensors',
    handler: function (request, reply) {

        var command = request.query.command;
        var params = request.query.params;

        db.sensors.find({ date: { $exists: true } }).sort({ date: -1 }).exec(function (err, commands) {
            if (err) {
                return reply.code(400);
            }
            //  commands = commands.filter((item, i) => i < 100);

            return reply(commands);

        })

    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});