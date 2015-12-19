'use strict';

var pg = require('pg')
  , faker = require('faker/locale/en_US');

var conString = process.env.DATABASE_URL || 'postgres://dfisnjkwelwozv:83OkAK5n-KN1a_9jrtpEctfSvi@ec2-75-101-143-150.compute-1.amazonaws.com/d3vej7452rdob';


var client = new pg.Client(conString);

var query = prepareQuery();
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(query, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log('Successfully Added 10mil Fake Users!');
    /* We create index after the injection for speed.
    */
    client.query("CREATE INDEX full_name_index ON users(full_name);", function(e, r) {
      if(err) {
        return console.error('error running query', err);
      } 
      client.end();
    })
    
  });
});


function prepareQuery() {
  let q = "BEGIN;"
  for (let i=0; i<9900; i++) {
    /* You can use faker to create full name Last Name and 
    *  First Name but I had a lot of trouble with that.
    *  Due to the unescaped character with faker you will 
    *  get syntax error with the query.
    *  But with just first name it seem to work very well.
    */
    let name = faker.fake('{{name.firstName}}').replace("'", "");
    let city = faker.address.city().replace("'", "");
    let email = faker.internet.email().replace("'", "");
    q += `INSERT INTO users (full_Name, email, city) VALUES ('${name}', '${email}', '${city}');\n`
  };
  return q + "COMMIT;\n"
}