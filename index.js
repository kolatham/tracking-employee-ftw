
const fs = require('fs');
const inquirer = require('inquirer');

const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

connection.connect((err)=>{
    if (err) throw err;
    mainMenu();
});


const mainMenu = () => {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            choices: [
                'Add data',
                'View data',
                'Update data',
                'Delete data'

            ]
        }
    ])
    .then((answer)=> {
        
        switch(answer.action){
            case 'Add data':
                addMenu();
                break;
            case 'View data':
                viewMenu();
                break;
            case 'Update data':
                updateMenu();
                break;
            case 'Delete data':
                deleteMenu();
                break;
        };
        return;
    });
};

const addMenu = () => {
    inquirer.prompt([
        {
            name: 'addAction',
            type: 'list',
            choices: [
                'Add an employee',
                'Add a role',
                'Add a department',
            ]
        }
    ])
    .then((answer) => {
        // Continues to functions
        switch(answer.addAction) {
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add a department':
                addDepartment();
                break;
            default:
                mainMenu();
                break;
        }
    });
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'departmentName',
            type: 'input',
            message: 'New department name:',
        }
    ])
    .then((answer) => {
        let departmentExists = false;
        connection.query('SELECT name FROM department', (err, res) => {
            if (err) throw err;
            res.forEach((item) => { 
                if (item.name === answer.departmentName.trim()) {
                    departmentExists = true; 
                }; 
            });

            if (departmentExists === true) {
                console.log(`A department named '${answer.departmentName.trim()}' already exists.\n`);
            } else {
                connection.query(
                    `INSERT INTO department(name) VALUES(?)`, [answer.departmentName.trim()],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`'${answer.departmentName.trim()}' department successfully added to database!\n`);
                    }
                );
            }
        });
    });
};

const validateNum = (num) => {
    if (/^[0-9]+$/.test(num)) {
        return true;
    }
    return 'Invalid input. Only numeric values are accepted.'
};

const addRole = () => {
    let departments = [];
    let departmentNames = ['No existing departments in database'];

    connection.query(
        'SELECT * FROM department', (err, res) => {
            if (err) throw err;
            if (res.length > 0) {
                if (departmentNames[0] === 'No existing departments in database') {
                    departmentNames.splice(0, 1);
                }
                res.forEach(({ id, name }) => {
                    departments.push({id, name});
                    departmentNames.push(`${id} | ${name}`);
                });
            }

            inquirer.prompt([
                {
                    name: 'roleTitle',
                    type: 'input',
                    message: 'New role title:'
                }
            ]).then((answer) => {
                let roleExists = false;
                let roleTitle = answer.roleTitle.trim();
                connection.query('SELECT title FROM role', (err, res) => {
                    if (err) throw err;
                    res.forEach((item) => { 
                        if (item.title === roleTitle) {
                            roleExists = true; 
                        }; 
                    });
                    
                    if (roleExists === true) { 
                        console.log(`A role titled '${roleTitle}' already exists.\n`);
                    } else {
                        inquirer.prompt([
                            {
                                name: 'roleSalary',
                                type: 'input',
                                message: 'New role salary:',
                                validate: validateNum
                            },
                            {
                                name: 'roleDepartment',
                                type: 'list',
                                message: 'New role department:',
                                choices: departmentNames
                            }
                        ])
                        .then((answers) => {
                            let departmentId = '';
                            let splitAnswer = answers.roleDepartment.split(' ');
                            let departmentName = splitAnswer.splice(2).join(' ').trim();
                            if (answers.roleDepartment === 'No existing departments in database') {
                                departmentId = null;
                                departmentName = 'No existing departments in database';
                            } else {
                                for (let i = 0; i < departments.length; i++) {
                                    if (departments[i].name === departmentName) {
                                        departmentId = departments[i].id;
                                    };
                                };
                            };
             
                            connection.query(
                                `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`, [roleTitle, parseInt(answers.roleSalary), departmentId],
                                (err, res) => {
                                    if (err) throw err;
                                    console.log(`'${roleTitle}' role ($${answers.roleSalary}/yr | ${departmentName}) successfully added to database!\n`);
                                }
                            );
                        });
                    }
                });
            });
        }
    );    
};

const addEmployee = () => {
    let roles = [];
    let roleTitles = ['No existing roles in database'];
    let employees = [];
    let employeeNames = ['No existing employees in database'];

    connection.query(
        'SELECT * FROM role', (err, res) => {
            if (err) throw err;
            if (res.length > 0) {
                if (roleTitles[0] === 'No existing roles in database') {
                    roleTitles.splice(0, 1);
                }
                res.forEach(({ id, title, salary, department_id }) => {
                    roles.push({id, title, salary, department_id});
                    roleTitles.push(title);
                });
            }

            inquirer.prompt([
                {
                    name: 'employeeFirstName',
                    type: 'input',
                    message: 'New employee first name:'
                },
                {
                    name: 'employeeLastName',
                    type: 'input',
                    message: 'New employee last name:'
                }
            ]).then((answers) => {
                let employeeExists = false;
                let employeeFirstName = answers.employeeFirstName.trim();
                let employeeLastName = answers.employeeLastName.trim();
                let employeeName = `${employeeFirstName} ${employeeLastName}`;
                connection.query('SELECT first_name, last_name FROM employee', (err, res) => {
                    if (err) throw err;
                    res.forEach((item) => { 
                        if (`${item.first_name} ${item.last_name}` === employeeName) {
                            employeeExists = true;
                        }; 
                    });
        
                    if (employeeExists === true) {
                        inquirer.prompt([
                            {
                                name: 'confirmContinue',
                                type: 'confirm',
                                message: `An employee named '${employeeName}' already exists. Would you still like to proceed?`
                            }
                        ]).then((answer) => {
                            if (answer.confirmContinue === false) {
                                addMenu();
                            } else {
                                addEmployeeContinue(employees, employeeNames, employeeFirstName, employeeLastName, roleTitles, roles);
                            };
                        });
                    } else {
                        addEmployeeContinue(employees, employeeNames, employeeFirstName, employeeLastName, roleTitles, roles);
                    };
                });
            })
        }
    );
};

const addEmployeeContinue = (employees, employeeNames, employeeFirstName, employeeLastName, roleTitles, roles) => {
    inquirer.prompt([
        {
            name: 'employeeRole',
            type: 'list',
            message: 'New employee role:',
            choices: roleTitles
        }
    ])
    .then((answers) => {
        let employeeRole = answers.employeeRole;
        let roleId = '';
        if (answers.employeeRole === 'No existing roles in database') {
            roleId = null;
            employeeRole = 'No existing role'
        } else {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].title === answers.employeeRole) {
                    roleId = roles[i].id;
                };
            };
        };
        connection.query(
            'SELECT * FROM employee', (err, res) => {
                if (err) throw err;
                if (res.length > 0) {
                    if (employeeNames[0] === 'No existing employees in database') {
                        employeeNames.splice(0, 1);
                    }
                    res.forEach(({ id, first_name, last_name, role_id, manager_id }) => {
                        employees.push({id, first_name, last_name, role_id, manager_id});
                        employeeNames.push(`${id} | ${first_name} ${last_name}`);
                    });
                    employeeNames.push('No manager');
                };

                inquirer.prompt([
                    {
                        name: 'employeeManager',
                        type: 'list',
                        message: 'New employee manager:',
                        choices: employeeNames
                    }
                ])
                .then((answer) => {    
                    let managerId = '';
                    let splitAnswer = answer.employeeManager.split(' ');
                    let managerName = '';                      
                    if (answer.employeeManager === 'No existing employees in database' || answer.employeeManager == 'No manager') {
                        managerId = null;
                        managerName = 'No existing manager'
                    } else {
                        managerName = splitAnswer.splice(2, splitAnswer.length).join(' ');  
                        for (let i = 0; i < employees.length; i++) {
                            if (employees[i].id === parseInt(answer.employeeManager.split(' ')[0])) {
                                managerId = employees[i].id;
                            };
                        };
                    };

                    query = 'INSERT INTO employee(first_name, last_name, role_id, manager_id) ';
                    query += `VALUES(?, ?, ?, ?)`
                    connection.query(query, [employeeFirstName, employeeLastName, roleId, managerId], (err, res) => {
                        if (err) throw err;
                        console.log(`Employee '${employeeFirstName} ${employeeLastName}' (role: ${employeeRole} | manager: ${managerName}) successfully added to database!\n`);
                    });
                });
            }
        );
    });
};