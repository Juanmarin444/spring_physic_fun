const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
const ctx = canvas.getContext('2d')

let y = 200; // where the end of the spring is currently
let velocity = 0
let restLength = 200
let k = .01
let dampening = .99 // spring will lose 1% of velocity over time

addEventListener('click', (event) => {
  const mouseX = event.clientX
  const mouseY = event.clientY
  console.log(mouseX, mouseY);
  y = mouseY
  // const angle = Math.atan2(event.clientY - y, event.clientX - x)
  // const velocity = {
  //   x: Math.cos(angle) * 5,
  //   y: Math.sin(angle) * 5
  // }
  //
  // projectiles.push(new Projectile(x, y, 5, 'white', velocity))
})

function draw() {

  ctx.beginPath()
  ctx.fillStyle = "green"
  ctx.arc(200, y, 50, 0, 2*Math.PI)
  ctx.fill()

  let x = y - restLength // spring displaecment
  let force = - k * x //2 1.9

  // Force = Acceleration
  velocity = velocity + force
  y += velocity
  velocity *= dampening
}

function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  draw()
}

animate()
