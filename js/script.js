const nameField = document.getElementById('name');
const jobRoleSelect = document.getElementById('title');
const otherJobRole = document.getElementById('other-job-role');
const shirtColorSelect = document.getElementById('color');
const shirtDesignSelect = document.getElementById('design');
const shirtColors = shirtColorSelect.getElementsByTagName('option');
const activitiesBox = document.getElementById('activities-box');
const activities = activitiesBox.getElementsByTagName('input');
const paymentMethods = document.getElementById('payment').childNodes;
const creditCardBox = document.getElementById('credit-card');
const paypalBox = document.getElementById('paypal');
const bitcoinBox = document.getElementById('bitcoin');
const paymentOptions = document.getElementById('payment');
const form = document.querySelector('form');
const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const ccNumRegEx = /^\d{13,16}$/;
const zipRegEx = /^\d{5}$/;
const cvvRegEx = /^\d{3}$/;


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

function validate(e) {

    const userName = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const ccNum = document.querySelector('#cc-num').value;
    const zip = document.querySelector('#zip').value;
    const cvv = document.querySelector('#cvv').value;

    if (userName === '') {
        console.log('name incorrect');
        e.preventDefault();
    }

    if (!emailRegEx.test(email)) {
        console.log('email incorrect');
        e.preventDefault();
    }

    if (paymentOptions.value === 'credit-card') {

        if (!ccNumRegEx.test(ccNum)) {
            console.log('cc num incorrect');
            e.preventDefault();
        }   
    
        if (!zipRegEx.test(zip)) {
            console.log('zip incorrect');
            e.preventDefault();
        }  
        if (!cvvRegEx.test(cvv)) {
            console.log('cvv incorrect');
            e.preventDefault();
        }  

    }

}

nameField.focus();
otherJobRole.hidden = true;
shirtColorSelect.disabled = true;
changeShirtColorText(); // change shirt color descriptions
paymentMethods[3].selected = true; // automatically select credit card payment
paypalBox.hidden = true;
bitcoinBox.hidden = true;

jobRoleSelect.addEventListener('change', () => {
    if (jobRoleSelect.value === 'other') {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }
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

activitiesBox.addEventListener('change', (e) => {
    let price = 0;
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            price += parseInt(activities[i].dataset.cost);
        }
    }
    document.getElementById('activities-cost').innerText = `Total: $${price}`;
});

paymentOptions.addEventListener('change', (e) => {
    creditCardBox.hidden = true;
    paypalBox.hidden = true;
    bitcoinBox.hidden = true;

    switch (paymentOptions.value) {
        case 'credit-card':
            creditCardBox.hidden = false;
            break;
        case 'paypal':
            paypalBox.hidden = false;
            break;
        case 'bitcoin':
            bitcoinBox.hidden = false;
            break;
        default:
            alert('Error. Invalid payment selection.');
    }
});

form.addEventListener('submit', validate);