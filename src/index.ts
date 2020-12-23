//this variable will hold our shader object
let shapeShader;
import * as p5 from "p5";

import {
    CANVAS_HEIGHT,
    CANVAS_ID,
    CANVAS_WIDTH,
    COLOR_BACKGROUND,
    FRAME_RATE
} from "./constants";

import "./style.css";

const sketch = (p5: p5) => {
let canvas, theShader: p5.Shader;
    p5.preload = ()=> {
        theShader = p5.loadShader('http://localhost:8000/src/shader.vert', 'http://localhost:8000/src/shader.frag');
    }
    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.WEBGL);
        p5.frameRate(FRAME_RATE);
        canvas = document.getElementById(CANVAS_ID);
        p5.noStroke();

    };

    p5.draw = () => {
        p5.background(COLOR_BACKGROUND);
        // shader() sets the active shader with our shader
        p5.shader(theShader);

        // lets send the resolution, mouse, and time to our shader
        // before sending mouse + time we modify the data so it's more easily usable by the shader
        theShader.setUniform('resolution', [CANVAS_WIDTH, CANVAS_HEIGHT]);
        theShader.setUniform('mouse', p5.map(p5.mouseX, 0, CANVAS_HEIGHT, 0, 7));
        theShader.setUniform('time', p5.frameCount * 0.01);


        // rect gives us some geometry on the screen
        p5.rect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
    };

    p5.windowResized= ()=>{
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }
};

new p5(sketch);
