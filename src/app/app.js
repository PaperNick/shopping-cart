import 'bootstrap';
import 'src/assets/styles/main.css';
import Home from './home/home.component';

let home = new Home();
document.querySelector('.main').innerHTML = home.render();
