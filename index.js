const generateHTML = require('./src/generateHTML');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const fs = require('fs');
const inquirer = require('inquirer');

const teamArray = [];

const addManager = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the manager for this team?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log("Please enter a name for the manager.");
                    return false;
                }
            }
        },
        
        {
            type: 'input',
            name: 'id',
            message: "Please enter the manger's id.",
            validate: idInput => {
                if (idInput) {
                    return true;
                }else {
                    console.log("Please enter in the manager's id.");
                    return false;
                }
            }

        },
        
        {
          type: 'input',
          name: 'email',
          message: "Please enter the manager's email!",
          validate: email => {
              valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
              if(valid) {
                  return true;
              }else {
                  console.log("Please enter email!")
                  return false;
              }
          }  
        },
        
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number!",
            validate: (officeNumber) =>{
                if (officeNumber) {
                    return true;
                }else {
                    console.log("Please enter an office number.");
                    return false;
                }
            }
        }
    ])
    .then(managerInput =>{ 
        const{ name, id, email, officeNumber} = managerInput;
        const manager = new Manager(name, id, email, officeNumber);

        teamArray.push(manager);
        console.log(manager);
    })
};


const addEngineer =() =>{
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log("Please enter an employee's name");
                    return false;
                }
            }
        },
        
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
            validate: idInput => {
                if(idInput) {
                    return true;
                }else {
                    console.log("Please enter the employee's ID.")
                    return false;
                }
            }
        },
        
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if(valid) {
                    return true;
                }else {
                    console.log("Please enter email!")
                    return false;
                }
            }
            
        },
        
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employee's Github username.",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                } else{
                    console.log("Please enter the employee's Github username.")
                }
            }
        }]).then(employeeData => {
            let { name, id, email, github} = employeeData;
            let employee;
    
                employee = new Engineer(name, id, email, github);
                console.log(employee);
        
    
            teamArray.push(employee);
    
           addEmployee()
        })
    };
    
const addIntern =()=> {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the employee's name?",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }else {
                    console.log("Please enter an employee's name");
                    return false;
                }
            }
        },
        
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employee's ID.",
            validate: idInput => {
                if(idInput) {
                    return true;
                }else {
                    console.log("Please enter the employee's ID.")
                    return false;
                }
            }
        },
        
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employee's email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if(valid) {
                    return true;
                }else {
                    console.log("Please enter email!")
                    return false;
                }
            }
            
        },

        {
            type: 'input',
            name: 'school',
            message: "Please enter the intern's school.",
            validate: nameInput => {
                if(nameInput) {
                    return true
                }else {
                    console.log("Please enter the intern's school.")
                }
            }

        }
    ]).then(employeeData => {
    let { name, id, email, school} = employeeData;
    let employee;

        employee = new Intern(name, id, email, school);
        console.log(employee);


    teamArray.push(employee);

   addEmployee()
})
}


const addEmployee = () => {
    console.log('');
    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Please choose the employee's role.",
            choices: ['Engineer', 'Intern', 'Quit']
        },

    ])
    .then(employeeData => {
      
        if (employeeData.role === "Engineer") {
            addEngineer();
        } else if (employeeData.role === "Intern") {
            addIntern();
        }
        else{
            writeFile(generateHTML(teamArray));
        }

    })
};


const writeFile = data => {
    fs.writeFile('./index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html!")
        }
    })
};

addManager()
.then(addEmployee)
.catch(err => {
    console.log(err)
});