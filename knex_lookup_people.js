const settings = require("./settings");
const moment = require("moment");
var knex = require("knex")({
    client: "pg",
    connection: {
        host: settings.hostname,
        user: settings.user,
        password: settings.password,
        database: settings.database
    }
});

var input = process.argv[2];
if (input) {
    input = input.charAt(0).toUpperCase() + input.slice(1);
} else {
    console.log("Please input a name");
    return;
}

knex.select()
    .from("famous_people")
    .select()
    .where("first_name", input)
    .then(result => {
        resultingString(result);
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
