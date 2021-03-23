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
    let selection;
    for (let i = 0; i < paymentOptions.length; i++) {
        if (paymentOptions[i].selected === true) {
            selection = paymentOptions[i].value;
        }
    }
    switch (selection) {
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
            alert('error');
    }
});