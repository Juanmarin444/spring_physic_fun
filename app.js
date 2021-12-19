const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
// console.log(canvas)

const ctx = canvas.getContext('2d')

class Particle {
  constructor(x, y, radius, sAngle, eAngle) {
    this.x = x
    this.y = y
    this.radius = radius
    this.sAngle = sAngle
    this.eAngle = eAngle
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, this.sAngle, this.eAngle)
    ctx.stroke()
  }
}

class Spring {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
  draw() {
    ctx.beginPath()
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke();
  }
}

const particlesArray = []
const springsArray = []

const circleOne = new Particle(200, 200, 50, 0*Math.PI, 2*Math.PI)
const circleTwo = new Particle(400, 200, 50, 0*Math.PI, 2*Math.PI)
const circleThree = new Particle(400, 400, 50, 0*Math.PI, 2*Math.PI)
const circleFour = new Particle(200, 400, 50, 0*Math.PI, 2*Math.PI)

circleOne.draw()
circleTwo.draw()
circleThree.draw()
circleFour.draw()

particlesArray.push(circleOne)
particlesArray.push(circleTwo)
particlesArray.push(circleThree)
particlesArray.push(circleFour)

// console.log(particlesArray);

particlesArray.forEach((particle, i) => {
  for (let j = i + 1; j < particlesArray.length; j++) {
    const dx = particlesArray[i].x - particlesArray[j].x
    const dy = particlesArray[i].y - particlesArray[j].y
    const distance = Math.sqrt((dx * dx) + (dy * dy))

    console.log(distance);

    if (distance < 500) {

      let spring = new Spring(
        particlesArray[i].x,
        particlesArray[i].y,
        particlesArray[j].x,
        particlesArray[j].y
      )
      springsArray.push(spring)
      spring.draw()
    }
  }
})

console.log(particlesArray);
console.log(springsArray);
