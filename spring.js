const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')

let k = .01 // spring constant (measure of a springs stiffness)
let dampening = .99 // spring will lose 1% of velocity over time (friction)
let anchor = {x: 400, y: 100} // fixed location where the spring is attached
let weight = {x: 400, y: 500} // location where the spring can be maniplated
let velocity = {x: 0, y: 0} // factors by which we change the weight direction
let restLength = 400 // springs length when at rest

addEventListener('click', (event) => {
  const mouseX = event.clientX
  const mouseY = event.clientY
  weight.y = mouseY
  weight.x = mouseX
})

function draw() {
  // draws spring
  ctx.beginPath()
  ctx.strokeStyle = "white"
  ctx.lineWidth = 5
  ctx.moveTo(anchor.x, anchor.y)
  ctx.lineTo(weight.x, weight.y)
  ctx.stroke()
  // draws anchor
  ctx.beginPath()
  ctx.fillStyle = "red"
  ctx.strokeStyle = "white"
  ctx.lineWidth = 5
  ctx.arc(anchor.x, anchor.y, 50, 0, 2*Math.PI)
  ctx.stroke()
  ctx.fill()
  // draws weight
  ctx.beginPath()
  ctx.fillStyle = "green"
  ctx.strokeStyle = "white"
  ctx.lineWidth = 5
  ctx.arc(weight.x, weight.y, 50, 0, 2*Math.PI)
  ctx.stroke()
  ctx.fill()

  // angle at which the weight is being pulled from the anchor
  let angle = Math.atan2(weight.y - anchor.y, weight.x - anchor.x)

  // distance between anchor and weight
  let distance = Math.hypot(weight.x - anchor.x, weight.y - anchor.y)

  // Spring force formula
  let force = ( -1 * k * (distance - restLength))


  velocity.x += force
  velocity.y += force

  weight.x += velocity.x * Math.cos(angle)
  weight.y += velocity.y * Math.sin(angle)

  velocity.x *= dampening
  velocity.y *= dampening
}

function animate() {
  animationId = requestAnimationFrame(animate)
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
  ctx.fillStyle="black"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  draw()
}

animate()
