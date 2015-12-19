var pg = require('pg');

var conString = process.env.DATABASE_URL || 'postgres://dfisnjkwelwozv:83OkAK5n-KN1a_9jrtpEctfSvi@ec2-75-101-143-150.compute-1.amazonaws.com/d3vej7452rdob';


var client = new pg.Client(conString);
var query = `CREATE TABLE IF NOT EXISTS users (
    id serial NOT NULL,
    email character varying(100) NOT NULL,
    full_name character varying(200) NOT NULL,
    city character varying(160) NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
  );`
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query(query, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result);
    
    client.end();
  });
});