import page from './content.html';

const y = document.createElement('div');
y.innerHTML = page;
y.classList.add('wrap');

document.body.appendChild(y);
