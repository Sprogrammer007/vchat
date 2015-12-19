"use strict"
var pg = require('pg')
  , _ = require('underscore');

var conString = process.env.DATABASE_URL || 'postgres://steve007:@localhost/vchat';


class Base {
  constructor() {
    
  }
  
  static like(column, value) {
    return runQuery(`SELECT * FROM ${this.name.toLowerCase()}s WHERE ${column} LIKE '${value}';`);
  }
  
  static top(column, num) {
    return runQuery(`SELECT ${column} FROM ${this.name.toLowerCase()}s LIMIT ${num};`)
  }
}


function runQuery(q, values) {
  values = (values != null) ? (_.isArray(values) ? values : [values]) : values;
  console.warn("Running Query: %s", q);
  var promise = new Promise(function(resolve, reject) {
    pg.connect(conString, function(err, client, done) {
      // handle an error from the connection
      if(handleError(err, client, done)){ return reject(err) };

      client.query(q, values, function(err, result) { 
        if(handleError(err, client, done)){ return reject(err) };
        resolve(result.rows);
        done();

      });

    });
  });
  return promise;
};

function handleError(err, client, done) {
  // no error occurred, continue with the request
  if(!err) return false;

  // An error occurred, remove the client from the connection pool.
  // A truthy value passed to done will remove the connection from the pool
  // instead of simply returning it to be reused.
  // In this case, if we have successfully received a client (truthy)
  // then it will be removed from the pool.
  if(client){
    done(client);
  }
  console.log('An Error has occurred');
  console.log(err);
  return true;
};


module.exports = Base;