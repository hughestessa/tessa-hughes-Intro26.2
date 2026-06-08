//lesson 7 Footer
const newFooter = document.createElement('footer');
document.body.append(newFooter);

let today = new Date();
let thisYear = today.getFullYear();

const copyright = document.createElement('p');
copyright.innerText = '\u00A9' + ' Tessa Hughes ' + thisYear;
newFooter.appendChild(copyright);
newFooter.style.textAlign = "center";

//lesson 7 Skills
let skills = ["SQL","C#","HTML","CSS","Python","JS"];
const skillsSection = document.getElementById('Skills');
const skillsList = skillsSection.querySelector('ul');

skills.forEach(skill => {
    const newSkill = document.createElement('li');
    newSkill.textContent = skill;
    skillsList.appendChild(newSkill);
    
});

//lesson 8 Message Form
const messageForm  = document.querySelector('form[name="leave_message"]');
messageForm.addEventListener('submit', event => {
    event.preventDefault(); //To preserve to log without refreshing right away
    
    const usersName = event.currentTarget.usersName.value;
    const usersEmail = event.currentTarget.usersEmail.value;
    const usersMessage = event.currentTarget.usersMessage.value;
    console.log(usersName, ' ', usersEmail, ' ', usersMessage);
    
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<a href="mailto:${usersEmail}">${usersName}</a> <span>${usersMessage} </span>`;
    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.style.color = 'red';
    removeButton.addEventListener('click', event => {
        const entry = event.currentTarget.parentNode;
        entry.remove();
    });

    newMessage.appendChild(removeButton);
    messageList.appendChild(newMessage);

    messageForm.reset(); //To clear the form
});

console.log('JS runs');

//lesson 9 Fetch

async function getGithubRepos() {
  try {    
    const response = await fetch('https://api.github.com/users/hughestessa/repos');
    if (!response.ok) {
      throw new Error(response.status);  
    }
    const data = await response.json()

    console.log("repos: ", data);
     let repositories = data;

     const projectSection = document.getElementById("Projects");
     const projectList = projectSection.querySelector("ul");

     repositories.forEach(repo => {
       const project = document.createElement('li');
       project.innerText = repo["name"];
       projectList.appendChild(project);
       console.log(project.innerText);
      });

    return data;
    
  } catch (error) {
    console.log('Could not fetch repos');
    console.error(error);  

    //error message in projects list
     const projectSection = document.getElementById("Projects");
     const projectList = projectSection.querySelector("ul");
     const projectError = document.createElement('li');
     projectError.innerText = "No projects found.";
     projectList.appendChild(projectError);
  } 
}


getGithubRepos();

/*
getGithubRepos()
  .then(repos => {
     console.log("repos: ", repos);
     let repositories = repos;

     const projectSection = document.getElementById("Projects");
     const projectList = projectSection.querySelector("ul");

     repositories.forEach(repo => {
       const project = document.createElement('li');
       project.innerText = repo["name"];
       projectList.appendChild(project);
       console.log(project.innerText);
      });
   })
  .catch(err => console.error(err));
*/

