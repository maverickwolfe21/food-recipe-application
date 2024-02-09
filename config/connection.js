// This is where we will create our sequelize connection.
const Sequelize = require("sequelize");
require("dotenv").config();
const AWS = require('aws-sdk');

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  });

}



AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'US West (N. California) us-west-1'
});

module.exports = sequelize;
