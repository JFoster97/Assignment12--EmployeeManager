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

function updateDepartment() {
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;
      const departments = res.map(element => {
        return element.id
      })
      inquirer
        .prompt([
          {
            name: "department",
            type: "list",
            message: "Department?",
            choices: departments
          }
  
        ])
        .then(function (answer) {
          connection.query(
            "INSERT INTO departments SET ?",
            answer,
            function (err) {
              if (err) throw err;
              console.log(`${answer.department} was added successfully`);
              finished();
            }
          );
        });
    })
  }

function newRoles() {
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;
      const departmentsList = res.map(element => {
        return element.id
      })
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "Title?"
          },
          {
            name: "salary",
            type: "input",
            message: "Salary?"
          },
          {
            name: "depId",
            type: "list",
            message: "Department id?",
            choices: departmentsList
          }
  
        ])
        .then(function (answer) {

          connection.query(
            "INSERT INTO roles SET ?",
            answer,
            function (err) {
              if (err) throw err;
              console.log(`${answer.title} was added successfully`);
              finished();
            }
          );
        });
    })
  }

function updateRole() {
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      const empRoles = res.map(element => {
        return element.id
      })
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is their first name?"
          },
          {
            name: "lastName",
            type: "input",
            message: "What is their last name?"
          },
          {
            name: "roleId",
            type: "list",
            message: "What is their role id?",
            choices: empRoles
          }
  
        ])
        .then(function (answer) {
            connection.query(
              "INSERT INTO employees SET ?",
              answer,
              function (err) {
                if (err) throw err;
                console.log(`${answer.firstName} ${answer.lastName} was added successfully`);
                finished();
              }
            );
          });
      })
    }
function updateEmployee() {
    connection.query("SELECT * FROM employees", function (err, res) {
      if (err) throw err;
      const lastName = res.map(element => {
        return element.lastName
      })
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "list",
            message: "Which Employee?",
            choices: lastName
          },
          {
            name: "newRole",
            type: "input",
            message: "New role?"
          }
        ])
        .then(function (answer) {
          "UPDATE employees SET roleId = newRole WHERE condition;"
          connection.query(
            "INSERT INTO employees SET ?",
            answer,
            function (err) {
              if (err) throw err;
              console.log(`${answer.lastName}  was added successfully`);
              finished();
            }
          );
        });
    })
  }

//   Create new employee
function createEmployee() {
    connection.query("SELECT id, title from roles", function (err, res) {
      if (err) throw err;
      const roles = res.map(element => element.title)
      inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "First Name?"
        },{
          name: "lastName",
          type: "input",
          message: "Last Name?"
        }, {
          name: "roles",
          type: "list",
          message: "Role?",
          choices: roles
        }
      ]).then(answers => {
        const newRole = res.find(element => {
          return element.title === answers.roles
        });
        console.log(chosenRole.id);
        const newEmployee = {
          firstName: answers.firstName,
          lastName: answers.lastName,
          roleId: newRole.id
        };
        connection.query("INSERT INTO employees SET ?", newEmployee, (err, success) => {
          if (err) throw err;
          console.log(`${newEmployee.firstName} was added successfully`);
          finished();
        })
  
      })
  
    })
  
  }