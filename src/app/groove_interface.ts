import { G2D, Rect_G } from '../g2d/g2d'

const CANONIZED_FACTOR = 100.0

class GrooveInterface {

	parent_container: HTMLElement
	//interface_container: HTMLElement
	g2d: G2D

	//static componentID = 0;

	interactables: Rect_G[] = [];
	hovered_interactable_index: number = -1;
	//real_mouseX: number = -1;
	//real_mouseY: number = -1;

	beatline_height: number = 76;
	hitline_height: number = 58;
	hit_width: number = (CANONIZED_FACTOR/16) - (CANONIZED_FACTOR/64);

	start_x: number;
	start_y_beat: number;
	start_y_hit: number;

	beatline_color: number[] = [180, 10, 10];
	hitline_color: number[] = [25, 100, 160];

	hit_fill: number[] = [202, 195, 166, 0.75];
	hit_fill_hover: number[] = [227, 205, 190, 0.75];
	hit_fill_active: number[] = [111, 192, 164, 0.9];

	hit_stroke: number[] = [197, 180, 150, 0.75];
	hit_stroke_hover: number[] = [197, 180, 150, 0.75];

	mouse_interact: boolean = false;

	constructor(parent_container: HTMLElement) {
		
		
		/*
		// LOLS, what I would wanna write taking myself completely seriously as the saviour of front-end
		this.interface_container = document.createElement('div');
		this.interface_container.setAttribute('class', 'groove-interface')
		*/

		/*
		this.interface_container.style.display = "inline-block";
   		this.interface_container.style.width = "80%";
   		this.interface_container.style.minHeight = "16px";
		

   		this.g2d = new G2D(this.interface_container.clientWidth,// * 0.75,
							this.interface_container.clientHeight);
		

		this.interface_container.appendChild(this.g2d.getCanvas());
		this.parent_container.appendChild(this.interface_container)
		*/
	


		this.parent_container = parent_container;	
		this.g2d = new G2D(this.parent_container.getBoundingClientRect().width,// * 0.75,
							this.parent_container.getBoundingClientRect().height);

		this.parent_container.appendChild(this.g2d.getCanvas());
		
	

		this.start_x = CANONIZED_FACTOR / 2 - 8 * this.hit_width;
		this.start_y_beat = CANONIZED_FACTOR / 2 - 0.5 * this.beatline_height;
		this.start_y_hit  = CANONIZED_FACTOR / 2 - 0.5 * this.hitline_height;


		for (let beat_i = 0; beat_i < 4; beat_i++) {
			const beat_x = this.start_x + (4*beat_i)*this.hit_width;
			const beat_y = this.start_y_beat;
			
			for (let hit_i = 0; hit_i < 4; hit_i++) {
				const hit_x = (beat_x + hit_i*this.hit_width);		// / CANONIZED_FACTOR
				const hit_y = this.start_y_hit;						// / CANONIZED_FACTOR;

				let col_rect = {
					x: hit_x,
					y: hit_y,
					width: this.hit_width,
					height: this.hitline_height,

					fill: this.hit_fill,
					active: false
				}
				this.addInteractable(col_rect);
			}
		}

				
		this.render();
		
		this.g2d.canvas.addEventListener('mouseenter', this.onmouseenter);
		this.g2d.canvas.addEventListener('mousemove', this.onmousemoved);
		this.g2d.canvas.addEventListener('click', this.onmouseclicked);
		
		window.addEventListener('resize', (e) => {
			//console.log(e)
			this.render();
		});		

		
		//console.log(this.interface_container.getBoundingClientRect());
	}

	getG2D() {
		return this.g2d;
	}

	render() {

		this.g2d.clear();

		// Draw hit boxes
		for (let i = 0; i < this.interactables.length; i++) {
			let rect = this.interactables[i];
			this.g2d.rect(rect.x, rect.y, rect.width, rect.height, rect.fill);
		}
		

		// Draw lines
		for (let beat_i = 0; beat_i < 4; beat_i++) {
			const beat_x = this.start_x + (4*beat_i)*this.hit_width;
			const beat_y = this.start_y_beat;
			this.g2d.line(beat_x, beat_y, beat_x, beat_y + this.beatline_height, this.beatline_color);
			
			for (let hit_i = 0; hit_i < 4; hit_i++) {
				const hit_x = beat_x + hit_i*this.hit_width;
				const hit_y = this.start_y_hit;
				
				if (hit_i !== 0) {
					this.g2d.line(hit_x, hit_y, hit_x, hit_y + this.hitline_height, this.hitline_color);	
				}
			}
		}

	}


	get_element_mouse_xy(e) {
		return {
			x: e.clientX - this.parent_container.getBoundingClientRect().x,
			y: e.clientY - this.parent_container.getBoundingClientRect().y,
		}
	}

	get_canonized_mouse_xy(mouse_pos) {
		return {
			x: mouse_pos.x / this.g2d.canvas.width * CANONIZED_FACTOR,
			y: mouse_pos.y / this.g2d.canvas.height * CANONIZED_FACTOR
		}
	}
	
	onmouseenter = (e) => {
		//console.log("mouse enter");
		this.mouse_interact = true;
	}

	
	onmousemoved = (e) =>  {
		
		let c_mouse = this.get_canonized_mouse_xy(this.get_element_mouse_xy(e));
		//console.log(c_mouse)

		for (let i = 0; i < this.interactables.length; i++) {

			let rect_bound = this.interactables[i];


			if (c_mouse.x > rect_bound.x && c_mouse.x < rect_bound.x + rect_bound.width &&
				c_mouse.y > rect_bound.y && c_mouse.y < rect_bound.y + rect_bound.height
				) {

				this.hovered_interactable_index = i;
				if (!this.interactables[i].active) {
					this.interactables[i].fill = this.hit_fill_hover;	
				}
				
			}
			else {
				if (!this.interactables[i].active) {
					this.interactables[i].fill = this.hit_fill;
				}
				
				//this.hovered_interactable_index = -1;
			}
		}

		this.render();
	}

	onmouseclicked = (e) => {
		
		if (this.hovered_interactable_index >= 0) {
			
			if (!this.interactables[this.hovered_interactable_index].active) {
				this.interactables[this.hovered_interactable_index].active = true;
				this.interactables[this.hovered_interactable_index].fill = this.hit_fill_active;
			}else {
				this.interactables[this.hovered_interactable_index].active = false;
				this.interactables[this.hovered_interactable_index].fill = this.hit_fill_hover;
			}

			this.render();
		}
	}

	addInteractable(r: any): void {
		this.interactables.push(r);
	}
}

export { GrooveInterface }