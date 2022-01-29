
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
        }
        return;
    })
}

