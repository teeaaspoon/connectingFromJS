const settings = require("./settings");
var knex = require("knex")({
    client: "pg",
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database
    }
});

if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
    console.log("Missing firstname, lastname, or birthdate");
    return;
}
if (new Date(process.argv[4]) == "Invalid Date") {
    console.log("Please enter Valid Birthdate YYYY/MM/DD");
    return;
}

var first_name = capitalizeInput(process.argv[2]);
var last_name = capitalizeInput(process.argv[3]);
var birthdate = new Date(process.argv[4]);

knex("famous_people")
    .insert({
        first_name,
        last_name,
        birthdate
    })
    .then(result => {
        return result;
    });

function capitalizeInput(input) {
    const string = input.charAt(0).toUpperCase() + input.slice(1);
    return string;
}
