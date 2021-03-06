const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (user, callback) => {

      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (err, hashed) => {
        if (err) console.error('error!', err);

        // set up query
        const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`;
        const values = [
          user.name,
          user.email,
          hashed
        ];

        // execute query
        dbPool.query(queryString, values, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);

        });
      });
    },

    get: (id, callback) => {
      // set up query
      var queryString = `SELECT * from users WHERE id=$1;`;
      var values = [id];

      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    getUserId: (username, callback) => {
      // set up query
      var queryString = `SELECT id from users WHERE name='${username}';`;

      // execute query
      dbPool.query(queryString, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    checkUsernameAvailability: (username, callback) => {
      var queryString = `SELECT * from users WHERE name='${username}';`;

      // execute query
      dbPool.query(queryString, (error, queryResult) => {
        // console.log("result is " + queryResult.rows[0].name);
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    update: (id, user, callback) => {
      // set up query

      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (err, hashed) => {
        if (err) console.error('error!', err);

        // set up query
        const queryString = `UPDATE users SET name='${user.name}', email='${user.email}', password='${hashed}' WHERE id='${id}';`;

        // execute query
        dbPool.query(queryString, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);
        });
      });
    },

    getWriting: (id, callback) => {
      // set up query

      var anotherQS = "SELECT articles.id, articles.title from articles INNER JOIN users ON articles.user_id = users.id WHERE user_id=" + id + ";";

      dbPool.query(anotherQS, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    login: (user, callback) => {
      // set up query
      var queryString = "SELECT * from users WHERE name = '" + user.name + "';";

      // execute query
      dbPool.query(queryString, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    }
  };
};
