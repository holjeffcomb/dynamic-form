# Dynamic-Form-Project
Submitted by: Jeffrey Holcomb

-Real Time Error Message-
I added functionality to the CVV field to listen for keyup events. For each event, if the value of the cvv field does not match the supplied regular expression (3 digits), then an error message will be displayed. The error message will disappear once exactly 3 digits are entered.

-Conditional Error Message-
The email address field has an alternative error message if the field is left empty. If the user submits an empty email field, the hint text will display "Email field cannot be empty". If the field has content but does not match the email regular expression, the hint text will read the default "Email address must be formatted correctly". This is done by changing the innerText property of the span element following the input.
