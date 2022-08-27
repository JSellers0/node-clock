let message: string = 'Hello World! This is a change!';
let heading = document.createElement('h1');
let something=document.createElement('div');
heading.textContent = message;
something.textContent = "More text";

document.body.appendChild(heading);
document.body.appendChild(something);


