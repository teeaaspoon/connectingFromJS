const pg = require("pg");
const settings = require("./settings");
const moment = require("moment");

var input = process.argv[2];
if (input) {
    input = input.charAt(0).toUpperCase() + input.slice(1);
} else {
    console.log("Please input a name");
    return;
}

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

client.connect(err => {
    if (err) {
        return console.error("Connection Error", err);
    }

    client.query(`SELECT * FROM famous_people WHERE first_name = '${input}'`, (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        resultingString(result.rows);
        client.end();
    });
});

function resultingString(arrayOfObjects) {
    console.log("Searching ...");
    console.log(`Found ${arrayOfObjects.length} person(s) by the name '${input}':`);
    let counter = 1;
    arrayOfObjects.forEach(person => {
        console.log(
            `- ${counter}: ${person["first_name"]} ${person["last_name"]}, born '${moment(
                person["birthdate"]
            ).format("YYYY/MM/DD")}'`
        );
        counter += 1;
    });
}
