USE employee_db;

INSERT INTO departments (id, department) VALUES ("1", "Management");
INSERT INTO departments (id, department) VALUES ("2", "Kitchen Staff");
INSERT INTO departments (id, department) VALUES ("3", "Front of House");


INSERT INTO roles (id, title, salary, depId) VALUES ("1", "Manager", "80000", "1");
INSERT INTO roles (id, title, salary, depId) VALUES ("2", "Cook", "50000", "2");
INSERT INTO roles (id, title, salary, depId) VALUES ("3", "Server", "40000", "3");


INSERT INTO employees (id, firstName, lastName, roleId, managerId) VALUES ("1", "Boss", "Boss", "1", NULL);
INSERT INTO employees (id, firstName, lastName, roleId, managerId) VALUES ("2", "Cook", "Cook", "1", "1");
INSERT INTO employees (id, firstName, lastName, roleId, managerId) VALUES ("3", "Server", "Server", "2", "4");