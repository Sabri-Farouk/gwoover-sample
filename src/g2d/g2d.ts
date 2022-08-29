// This is our "Canonized hand-built" canvas object
// Canonized: [0, 100] within any given axis refers to [canvas origin, canvas.axisLength]
// Simple naïve approach until we need something more robust
//



class G2D {
	
	canvas:  	any;
	g: 			any; 				// ctx but I'd rather call it g.
									// the P5js habits never die!
	width:   	number;
	height:  	number;

	constructor(width: number, height: number) {

		this.canvas 	= document.createElement('canvas'); //document.getElementById(parentId);
		this.g      	= this.canvas.getContext('2d');
		this.width  	= this.canvas.width = width;
		this.height 	= this.canvas.height = height;

	}

	getCanvas() {
		return this.canvas;
	}

	line(x1, y1, x2, y2, color) : void {

		if (this.check_XY_Canonized(x1, y1) && 
			this.check_XY_Canonized(x2, y2)) {
			
			// console.log("we should be drawing lines");
			// Draw Stuff
			let drawX1 = (x1/100.0) * this.canvas.width
			let drawY1 = (y1/100.0) * this.canvas.height
			
			let drawX2 = (x2/100.0) * this.canvas.width
			let drawY2 = (y2/100.0) * this.canvas.height

			this.g.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

			this.g.beginPath();
			this.g.moveTo(drawX1, drawY1);
			this.g.lineTo(drawX2, drawY2);
			this.g.stroke();
		}
		else {
			return;
		}
	}

	

	rect(x, y, width, height, fill) : void {

		if (this.check_XY_Canonized(x, y) &&
			this.check_XY_Canonized(width, height)) {

			let drawX = (x/100.0) * this.canvas.width
			let drawY = (y/100.0) * this.canvas.height

			let drawWidth = (width/100.0) * this.canvas.width
			let drawHeight = (height/100.0) * this.canvas.height
			
			// console.log("we should be drawing rects");
			// Draw Stuff
			this.g.fillStyle = `rgba(${fill[0]}, ${fill[1]}, ${fill[2]}, ${fill[3]})`;
			this.g.fillRect(drawX, drawY, drawWidth, drawHeight);
		}
		else {
			return;
		}

		
	}

	clear() {
		this.g.fillStyle = 'rgb(196, 165, 144)';
		this.g.fillRect(0, 0, this.width, this.height);
	}


	check_XY_Canonized(x: number, y: number) {
		let xCheck = x < 0 || x > 100;
		let yCheck = y < 0 || y > 100;

		if (xCheck) {
			throw new Error(`Argument x of value: ${x} is not within canonized range`)
		}
		if (yCheck) {
			throw new Error(`Argument y of value: ${y} is not within canonized range`)
		}
		return !(xCheck && yCheck);
	}
}


// Primitives 
// These do not only "act/behave" as rendered objects
// but also as "Interactible UI elements"

interface Rect_G {
	x: number;
	y: number;
	width: number;
	height: number;

	fill: number[];
	hover_fill: number[];

	active: boolean;
}

export { G2D, Rect_G }