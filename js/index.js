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

console.log('JS runs');