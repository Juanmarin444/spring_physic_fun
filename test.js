const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

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
    let direction = Math.atan2(weight.y - anchor.y)
  }
}

const anchor = new Anchor(innerWidth/2, 100)
const weight = new Weight(innerWidth/2, 500, 50)
const spring = new Spring(anchor.x, anchor.y, weight.x, weight.y)

spring.draw()
anchor.draw()
weight.draw()
