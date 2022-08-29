import { GrooveInterface } from './app/groove_interface'

let app_container;
let groove_interface;

window.onload = (e) => {

	console.log(e);

	app_container = document.getElementById('app');

	groove_interface = new GrooveInterface(app_container);
	
	//app_container.appendChild(groove_interface.getG2D().getCanvas());
	//console.log(app_container);
	//console.log(groove_interface.g2d.canvas.parentNode)
}