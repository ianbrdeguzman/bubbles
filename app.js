// get canvas HTML element
const canvas = document.querySelector('canvas');

// create 2d rendering context
ctx = canvas.getContext('2d');

// make canvas responsive
const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// event listener when screensize is chane
window.addEventListener('resize', () => {
    resizeCanvas();

    // initialize function
    init();
});

// array of colors
const colorArray = [
    '#45062E',
    '#7F055F',
    '#E5A4CB',
    '#EBD2BE',
    '#FFE8D4'
];

// mouse object that will hold mouse location
const mouse = {
    x: undefined,
    y: undefined
}

// function to get mouse position on canvas
const getMouseLocation = (e) => {
    mouse.x = e.pageX - canvas.offsetLeft; 
    mouse.y = e.pageY - canvas.offsetTop;
};

// event listener for mouse movement
window.addEventListener('mousemove', getMouseLocation);

// event listener for mobile touch movement
window.addEventListener('touchmove', (e) => {

    // pass the event to simulate mouse movement
    getMouseLocation(e.touches[0]);
});

// max radius of circle 
const maxRadius = 40;

// function to create new Circle
function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius
    this.dx = dx;
    this.dy = dy;

    // randomize the color for each circle
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    // method to draw circle
    this.draw = function() {
        
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
    }

    // method to update circle position every frame
    this.update = function() {

        // check if circle is out of canvas on x axis
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {

            // reverse velocity to bounce
            this.dx = -this.dx;
        }
        
        // check if circle is out of canvas on y axis
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {

            // reverse velocity to bouce
            this.dy = -this.dy;
        }
        
        // increase x and y value
        this.x += this.dx;
        this.y += this.dy;

        // check if mouse location is near circle position in both x and y axis
        if (mouse.x - this.x < 40 && mouse.x - this.x > -40 && mouse.y - this.y < 40 && mouse.y - this.y > -40) {

            // check if radius is less than max radius
            if(this.radius < maxRadius) {

                // increase radius
                this.radius += 1;
            } 
        
        // if radius is greater than min radius
        } else if (this.radius > this.minRadius) {

            // decrease radius
            this.radius -= 1;
        }

        // call this function draw method
        this.draw();
    }
}


// initialize function
const init = () => {

    // clear circleArray evertime we initialize / change screen size
    circleArray = [];

    // make a loop that will push a new circle into the array
    for (let i = 0; i < 500; i++) {
        let radius = Math.random() * 10 + 1;
    	let x = Math.random() * (innerWidth - radius * 2) + radius;
    	let y = Math.random() * (innerHeight - radius * 2) + radius;
    	let dx = Math.random() - 0.5;
    	let dy = Math.random() - 0.5;
    	circleArray.push(new Circle(x, y, radius, dx, dy))
    }
};

// animate function
const animate = () => {

    // recursion or function calling itself
    requestAnimationFrame(animate);
    
    // clear the canvas every frame
    ctx.clearRect(0, 0, innerWidth, innerHeight)

    // loop over circleArray and call circle update method
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
};

// resize canvas
resizeCanvas();

// initialize bubbles
init();

// animate bubbles
animate();