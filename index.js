
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
