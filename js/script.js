const nameField = document.getElementById('name');
const jobRoleSelect = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const shirtColorSelect = document.getElementById('color');
const shirtDesignSelect = document.getElementById('design');
const shirtColors = shirtColorSelect.getElementsByTagName('option');
const activitiesBox = document.getElementById('activities-box');

function changeShirtColorText() {
    for (let i = 1; i < shirtColors.length; i++) {
        shirtColors[i].innerText = shirtColors[i].innerText.replace(/\(.+\)/, ''); // use regex to remove text between () parentheses in shirt color description
    }
}

function hideAllShirts() {
    for (let i = 1; i < shirtColors.length; i++) {
        shirtColors[i].hidden = true;
    }
}

nameField.focus();
otherJobRole.hidden = true;
shirtColorSelect.disabled = true;
changeShirtColorText(); // change shirt color descriptions

console.log(activities);

jobRoleSelect.addEventListener('change', () => {
    if (jobRoleSelect.value === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }
});

activitiesBox.addEventListener('change', (e) => {
    console.log(e.target.dataset.cost);
});

shirtDesignSelect.addEventListener('change', () => {
    shirtColorSelect.disabled = false;
    shirtColors[0].selected = true;

    if (shirtDesignSelect.value === 'js puns') {
        hideAllShirts();
        for (let i = 1; i <= 3; i++) {
            shirtColors[i].hidden = false;
        }

    } else if (shirtDesignSelect.value === 'heart js') {
        hideAllShirts();
        for (let i = 4; i <= 6; i++) {
            shirtColors[i].hidden = false;
        }
    }
});