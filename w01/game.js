let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine
let engine = Engine.create();

// ground
let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
World.add(engine.world, [ground]);


let prevBox = Bodies.rectangle(400, 20, 18, 18, {isStatic: true} );
World.add(engine.world, [prevBox]);
for(let i = 1;i < 34;i ++) {
	let box = Bodies.rectangle(400, 20 + i * 10, 7, 7);
	let constr = Matter.Constraint.create({bodyA: prevBox, bodyB: box});
	prevBox = box;
	World.add(engine.world, [box, constr]);
}

let player = Bodies.rectangle(200, 62, 43, 43);
World.add(engine.world, [player]);
Matter.Body.applyForce(player, player.position, {x: 0.038, y: 0});

// run the engine
Engine.run(engine);

// Creating variables
let myX = 0, myY = 0;

function update() {
	const FS = 0.0038;
	if(isKeyPressed[87]) {
		Matter.Body.applyForce(player, player.position, {x: 0, y: -FS});
	}
	if(isKeyPressed[65]) {
		Matter.Body.applyForce(player, player.position, {x: -FS, y: -FS / 10});
	}
	if(isKeyPressed[68]) {
		Matter.Body.applyForce(player, player.position, {x: FS, y: -FS / 10});
	}
}

function renderBody(body) {
	context.beginPath();
	for(const vertex of body.vertices) {
		context.lineTo(vertex.x, vertex.y);
	}
	context.fill();
}

function draw() {
	for(const body of engine.world.bodies) {
		renderBody(body);
	}
}

function keyup(key) {
	console.log(player.position);
	// Show the pressed keycode in the console
	console.log("Pressed", key);
}

function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
