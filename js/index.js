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