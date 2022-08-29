/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/groove_interface.ts":
/*!*************************************!*\
  !*** ./src/app/groove_interface.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GrooveInterface = void 0;
const g2d_1 = __webpack_require__(/*! ../g2d/g2d */ "./src/g2d/g2d.ts");
const CANONIZED_FACTOR = 100.0;
class GrooveInterface {
    constructor(parent_container) {
        /*
        // LOLS, what I would wanna write taking myself completely seriously as the saviour of front-end
        this.interface_container = document.createElement('div');
        this.interface_container.setAttribute('class', 'groove-interface')
        */
        //static componentID = 0;
        this.interactables = [];
        this.hovered_interactable_index = -1;
        //real_mouseX: number = -1;
        //real_mouseY: number = -1;
        this.beatline_height = 76;
        this.hitline_height = 58;
        this.hit_width = (CANONIZED_FACTOR / 16) - (CANONIZED_FACTOR / 64);
        this.beatline_color = [180, 10, 10];
        this.hitline_color = [25, 100, 160];
        this.hit_fill = [202, 195, 166, 0.75];
        this.hit_fill_hover = [227, 205, 190, 0.75];
        this.hit_fill_active = [111, 192, 164, 0.9];
        this.hit_stroke = [197, 180, 150, 0.75];
        this.hit_stroke_hover = [197, 180, 150, 0.75];
        this.mouse_interact = false;
        this.onmouseenter = (e) => {
            //console.log("mouse enter");
            this.mouse_interact = true;
        };
        this.onmousemoved = (e) => {
            let c_mouse = this.get_canonized_mouse_xy(this.get_element_mouse_xy(e));
            //console.log(c_mouse)
            for (let i = 0; i < this.interactables.length; i++) {
                let rect_bound = this.interactables[i];
                if (c_mouse.x > rect_bound.x && c_mouse.x < rect_bound.x + rect_bound.width &&
                    c_mouse.y > rect_bound.y && c_mouse.y < rect_bound.y + rect_bound.height) {
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
        };
        this.onmouseclicked = (e) => {
            if (this.hovered_interactable_index >= 0) {
                if (!this.interactables[this.hovered_interactable_index].active) {
                    this.interactables[this.hovered_interactable_index].active = true;
                    this.interactables[this.hovered_interactable_index].fill = this.hit_fill_active;
                }
                else {
                    this.interactables[this.hovered_interactable_index].active = false;
                    this.interactables[this.hovered_interactable_index].fill = this.hit_fill_hover;
                }
                this.render();
            }
        };
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
        this.g2d = new g2d_1.G2D(this.parent_container.getBoundingClientRect().width, // * 0.75,
        this.parent_container.getBoundingClientRect().height);
        this.parent_container.appendChild(this.g2d.getCanvas());
        this.start_x = CANONIZED_FACTOR / 2 - 8 * this.hit_width;
        this.start_y_beat = CANONIZED_FACTOR / 2 - 0.5 * this.beatline_height;
        this.start_y_hit = CANONIZED_FACTOR / 2 - 0.5 * this.hitline_height;
        for (let beat_i = 0; beat_i < 4; beat_i++) {
            const beat_x = this.start_x + (4 * beat_i) * this.hit_width;
            const beat_y = this.start_y_beat;
            for (let hit_i = 0; hit_i < 4; hit_i++) {
                const hit_x = (beat_x + hit_i * this.hit_width); // / CANONIZED_FACTOR
                const hit_y = this.start_y_hit; // / CANONIZED_FACTOR;
                let col_rect = {
                    x: hit_x,
                    y: hit_y,
                    width: this.hit_width,
                    height: this.hitline_height,
                    fill: this.hit_fill,
                    active: false
                };
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
            const beat_x = this.start_x + (4 * beat_i) * this.hit_width;
            const beat_y = this.start_y_beat;
            this.g2d.line(beat_x, beat_y, beat_x, beat_y + this.beatline_height, this.beatline_color);
            for (let hit_i = 0; hit_i < 4; hit_i++) {
                const hit_x = beat_x + hit_i * this.hit_width;
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
        };
    }
    get_canonized_mouse_xy(mouse_pos) {
        return {
            x: mouse_pos.x / this.g2d.canvas.width * CANONIZED_FACTOR,
            y: mouse_pos.y / this.g2d.canvas.height * CANONIZED_FACTOR
        };
    }
    addInteractable(r) {
        this.interactables.push(r);
    }
}
exports.GrooveInterface = GrooveInterface;


/***/ }),

/***/ "./src/g2d/g2d.ts":
/*!************************!*\
  !*** ./src/g2d/g2d.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


// This is our "Canonized hand-built" canvas object
// Canonized: [0, 100] within any given axis refers to [canvas origin, canvas.axisLength]
// Simple naïve approach until we need something more robust
//
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.G2D = void 0;
class G2D {
    constructor(width, height) {
        this.canvas = document.createElement('canvas'); //document.getElementById(parentId);
        this.g = this.canvas.getContext('2d');
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
    }
    getCanvas() {
        return this.canvas;
    }
    line(x1, y1, x2, y2, color) {
        if (this.check_XY_Canonized(x1, y1) &&
            this.check_XY_Canonized(x2, y2)) {
            // console.log("we should be drawing lines");
            // Draw Stuff
            let drawX1 = (x1 / 100.0) * this.canvas.width;
            let drawY1 = (y1 / 100.0) * this.canvas.height;
            let drawX2 = (x2 / 100.0) * this.canvas.width;
            let drawY2 = (y2 / 100.0) * this.canvas.height;
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
    rect(x, y, width, height, fill) {
        if (this.check_XY_Canonized(x, y) &&
            this.check_XY_Canonized(width, height)) {
            let drawX = (x / 100.0) * this.canvas.width;
            let drawY = (y / 100.0) * this.canvas.height;
            let drawWidth = (width / 100.0) * this.canvas.width;
            let drawHeight = (height / 100.0) * this.canvas.height;
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
    check_XY_Canonized(x, y) {
        let xCheck = x < 0 || x > 100;
        let yCheck = y < 0 || y > 100;
        if (xCheck) {
            throw new Error(`Argument x of value: ${x} is not within canonized range`);
        }
        if (yCheck) {
            throw new Error(`Argument y of value: ${y} is not within canonized range`);
        }
        return !(xCheck && yCheck);
    }
}
exports.G2D = G2D;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const groove_interface_1 = __webpack_require__(/*! ./app/groove_interface */ "./src/app/groove_interface.ts");
let app_container;
let groove_interface;
window.onload = (e) => {
    console.log(e);
    app_container = document.getElementById('app');
    groove_interface = new groove_interface_1.GrooveInterface(app_container);
    //app_container.appendChild(groove_interface.getG2D().getCanvas());
    //console.log(app_container);
    //console.log(groove_interface.g2d.canvas.parentNode)
};

})();

/******/ })()
;