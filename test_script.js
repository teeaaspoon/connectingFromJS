const pg = require("pg");
const settings = require("./settings");

const input = process.argv[2];
const capitalizedInput = input.charAt(0).toUpperCase() + input.slice(1);

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
    client.query(
        `SELECT * 
                FROM famous_people 
                WHERE first_name = '${capitalizedInput}'`,
        (err, result) => {
            if (err) {
                return console.error("error running query", err);
            }
            console.log("Searching ...");
            console.log(`Found ${result.rows.length} person(s) by the name ${capitalizedInput}:`);
            resultingString(result.rows)
            
            client.end();
        }
    );
});

function resultingString(arrayOfObjects) {
    let counter = 1;
    arrayOfObjects.forEach(person => {
        console.log(`- ${counter}: ${person["first_name"]} ${person["last_name"]}, born ${person["birthdate"]}`);
        counter += 1;
    });
}
