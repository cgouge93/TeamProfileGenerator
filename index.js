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

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class ="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br><br>Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
            </div>`;
        }
    })
}