const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const employees = [];

function addTeamMember() {
    inquirer.prompt([
    {
        message: "Enter team member's name",
        name: "name"
    },
    {
        type: "list",
        message: "Select team member's role",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member's ID",
        name: "id"
    },
    {
        message: "Enter team member's email",
        name: "email"
    }
])
.then(function({name, role, id, email}) {
    let roleInfo = "";
    if (role === "Engineer") {
        roleInfo = "GitHub username";
    } else if (role === "Intern") {
        roleInfo = "school name";
    } else {
        roleInfo = "office phone number";
    }
    inquirer.prompt([
    {
        message: `Enter team member's ${roleInfo}`,
        name: "roleInfo"
    },
    {
        type: "list",
        message: "Would you like to add more team members?",
        choices: [
            "yes",
            "no"
        ],
        name: "addMore"
    }
])
.then(function({roleInfo, moreMembers}) {
    let newMember;
    if (role === "Engineer") {
        newMember = new Engineer(name, id, email, roleInfo);
    } else if (role === "Intern") {
        newMember = new Intern(name, id, email, roleInfo);
    } else {
        newMember = new Manager(name, id, email, roleInfo);
    }
    employees.push(newMember);
    addHtml(newMember)
    .then(function() {
        if (addMore === "yes"){
            addTeamMember();
        } else {
            finishHtml();   
        }
        });
    });
});
}

