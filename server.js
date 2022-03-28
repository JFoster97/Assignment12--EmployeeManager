const path = require('path');
const fs = require('fs');
let mysql = require('mysql');
let inquirer = require("inquirer");
const connection = require('./db/connection');

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    init();
  });

  function init() {
    console.log(`Welcome to the Employee Manager`)
    initialPrompt();
  }

  function finished() {
    inquirer.prompt([
      {
        type: "list",
        name: "continue",
        message: "Would you like to continue?",
        choices: [
          {
            name: "Yes",
            value: true
          },
          {
            name: "No",
            value: false
          }
        ]
      }
    ]).then(function (answers) {
      if (answers.continue) {
        initialPrompt()
      } else {
        console.log(`Goodbye`);
        process.exit();
      }
    })
  }
//   Create functions to view employees, departments and roles

function seeEmployee() {
    console.log("Selecting all employees...\n");
    connection.query("SELECT firstName AS `First Name`, lastName AS `Last Name`, roleId AS `Role Id` FROM employees", function (err, res) {
      if (err) throw err;
      console.table(res);
      finished();
  
    });
  }

function seeDepartment() {
    console.log("Selecting all departments...\n");
    connection.query("SELECT id AS `ID`, department AS `Department` FROM departments", function (err, res) {
      if (err) throw err;
      console.table(res);
      finished();
  
    });
  }

  function seeRoles() {
    console.log("Selecting all roles...\n");
    connection.query("SELECT title AS `Title`, salary AS `Salary`, depId AS `Department Id` FROM roles", function (err, res) {
      if (err) throw err;
      console.table(res);
      finished();
  
    });
  }