// DOM Selectors
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
const userName = document.querySelector('#name');
const email = document.querySelector('#email');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

// Regular expressions for form validation
const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const ccNumRegEx = /^\d{13,16}$/;
const zipRegEx = /^\d{5}$/;
const cvvRegEx = /^\d{3}$/;

// Function to change shirt color text
function changeShirtColorText() {
    for (let i = 1; i < shirtColors.length; i++) {
        shirtColors[i].innerText = shirtColors[i].innerText.replace(/\s\(.+\)/, ''); // use regex to remove text between () parentheses in shirt color description
    }
}

function hideAllShirts() {
    for (let i = 1; i < shirtColors.length; i++) {
        shirtColors[i].hidden = true;
    }
}

// Function to invalidate form elements
function invalidate(element) {
    element.parentNode.classList.add('not-valid');
    element.parentNode.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
}

// Function to validate form elements
function validate(element) {
    element.parentNode.classList.remove('not-valid');
    element.parentNode.classList.add('valid');
    element.parentElement.lastElementChild.style.display = 'none';
}

// Function to check if at least one activity is selected
function isActivitiesEmpty() {
    let isEmpty = true;
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            isEmpty = false;
            break;
        }
    }
    return isEmpty;
}

// Event listener for form submit action
form.addEventListener('submit', (e) => {
    if (userName.value === '') {
        invalidate(userName);
        e.preventDefault();
    } else {
        validate(userName);
    }

    if (!emailRegEx.test(email.value)) {
        if (email.value === '') {
            invalidate(email);
            email.parentElement.lastElementChild.innerText = 'Email address cannot be empty';
        } else {
            invalidate(email);
            e.preventDefault();
        }
    } else {
        validate(email);
    }

    if (isActivitiesEmpty()) {
        invalidate(activitiesBox);
        e.preventDefault();
    } else {
        validate(activitiesBox);
    }

    if (paymentOptions.value === 'credit-card') { // if credit card is selected

        if (!ccNumRegEx.test(ccNum.value)) {
            invalidate(ccNum);
            e.preventDefault();
        } else {
            validate(ccNum);
        }
    
        if (!zipRegEx.test(zip.value)) {
            invalidate(zip);
            e.preventDefault();
        } else {
            validate(zip);
        }
        if (!cvvRegEx.test(cvv.value)) {
            invalidate(cvv);
            e.preventDefault();
        } else {
            validate(cvv);
        }
    }
});

// Listener to display 'Other' job role element if selected
jobRoleSelect.addEventListener('change', () => {
    jobRoleSelect.value === 'other' ? otherJobRole.hidden = false : otherJobRole.hidden = true;
});

// 
shirtDesignSelect.addEventListener('change', () => {
    shirtColorSelect.disabled = false; // allow color to be selected
    shirtColors[0].selected = true; // automatically display "Select Theme"
    if (shirtDesignSelect.value === 'js puns') {
        hideAllShirts();
        for (let i = 1; i <= 3; i++) { // unhide colors 1-3
            shirtColors[i].hidden = false;
        }
    } else if (shirtDesignSelect.value === 'heart js') { // unhide colors 4-6
        hideAllShirts();
        for (let i = 4; i <= 6; i++) {
            shirtColors[i].hidden = false;
        }
    }
});

// Listener for activities selection
activitiesBox.addEventListener('change', (e) => {
    let price = 0;

    // restore activities to default
    for (let i = 0; i < activities.length; i++) { 
        activities[i].parentElement.classList.remove('disabled');
        activities[i].disabled = false;
    }

    // loop through all activities
    for (let i = 0; i < activities.length; i++) {
        if (activities[i].checked) {
            price += parseInt(activities[i].dataset.cost);
            for (let j = 1; j < activities.length; j++) { // loop through other activities and disable conflicts
                if (j === i) { // skip current activity
                    continue;
                }
                if (activities[i].dataset.dayAndTime === activities[j].dataset.dayAndTime) {
                    activities[j].parentElement.classList.add('disabled');
                    activities[j].disabled = true;
                } 
            }
        }
    }
    document.getElementById('activities-cost').innerText = `Total: $${price}`;
});

// Listener for payment option selection
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

// Listener to allow real time error message for CVV field
cvv.addEventListener('keyup', () => {
    cvvRegEx.test(cvv.value) ? validate(cvv) : invalidate(cvv);
});

// Add event listeners to each activity element
for (let i = 0; i < activities.length; i++) {
    activities[i].addEventListener('focus', () => {
        activities[i].parentNode.className = 'focus';
    });
    
    activities[i].addEventListener('blur', () => {
        activities[i].parentNode.classList.remove('focus');
    });
}

nameField.focus(); // focus on name field upon loading page
otherJobRole.hidden = true; // hide other job role box
shirtColorSelect.disabled = true; // disable shirt color selection by default
changeShirtColorText(); // change shirt color descriptions
paymentMethods[3].selected = true; // automatically select credit card payment
paypalBox.hidden = true; // hide paypal box
bitcoinBox.hidden = true; // hide bitcoin box