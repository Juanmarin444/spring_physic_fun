const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

// spring constant (measure of a springs stiffness)
let k = .01
// spring will lose 1% of velocity over time (friction)
let dampening = .97
// factors by which we change the weight direction
let velocity = {x: 0, y: 0}
// springs length when at rest
let restLength = 400

let activatePhysics = true

class Anchor {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  draw() {
    ctx.beginPath()
    ctx.fillStyle = "red"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.arc(this.x, this.y, 25, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()
  }
}

class Weight {
  constructor(x,y,radius) {
    this.x = x
    this.y = y
    this.radius = radius
  }
  draw() {
    ctx.beginPath()
    ctx.fillStyle = "green"
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
    ctx.stroke()
    ctx.fill()
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
    ctx.strokeStyle = "black"
    ctx.lineWidth = 5
    ctx.moveTo(this.x1, this.y1)
    ctx.lineTo(this.x2, this.y2)
    ctx.stroke()
  }
  spring() {
    // angle at which the weight is being pulled from the anchor
    let direction = Math.atan2(weight.y - anchor.y, weight.x - anchor.x)
    // distance between anchor and weight
    let distance = Math.hypot(weight.x - anchor.x, weight.y - anchor.y)
    // Spring force formula
    let force = (-1 * k * (distance - restLength))

    velocity.x += force
    velocity.y += force

    weight.x += velocity.x * Math.cos(direction)
    weight.y += velocity.y * Math.sin(direction)

    velocity.x *= dampening
    velocity.y *= dampening
  }
}

// addEventListener('click', (event) => {
//   const mouseX = event.clientX
//   const mouseY = event.clientY
//   weight.y = mouseY
//   weight.x = mouseX
// })



addEventListener("mousedown", function (e) {
  activatePhysics = false
  addEventListener("mousemove", function (e) {
    if (!activatePhysics) {
      const mouseX = event.clientX
      const mouseY = event.clientY
      weight.y = mouseY
      weight.x = mouseX
    }
  }, false)
}, false)

addEventListener("mouseup", function (e) {
  console.log('MOUSE IS UP');
  activatePhysics = true
}, false)

const anchor = new Anchor(innerWidth/2, 100)
const weight = new Weight(innerWidth/2, 500, 50)

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.fillStyle="white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const spring = new Spring(anchor.x, anchor.y, weight.x, weight.y)
  spring.draw()
  if (activatePhysics) {
    spring.spring()
  }
  weight.draw()
  anchor.draw()
}

animate()
