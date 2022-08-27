require('dotenv').config();
console.log(process.env.SECRET);
var message = 'Hello World! This is a change!';
var heading = document.createElement('h1');
var something = document.createElement('div');
heading.textContent = message;
something.textContent = "More text";
document.body.appendChild(heading);
document.body.appendChild(something);
