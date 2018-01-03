import React from 'react';
import ReactDOM from 'react-dom';

export default class Mouse extends React.Component {

  constructor() {
    super();
    this.state = {
      direction: 'right',
      translateX: 0,
      translateY: 0,
      currentTile: 'f'
    }
    this.checkKeyPressed = this.checkKeyPressed.bind(this)
    this.moveMouse = this.moveMouse.bind(this)
    this.getSurroundingTiles = this.getSurroundingTiles.bind(this)
    this.rotateMouse = this.rotateMouse.bind(this)
  }

  getSurroundingTiles() {

    const mouse = document.querySelector('.mouse')
    const board = document.getElementById('board')

    let tiles = Array.from(board.querySelectorAll('div'))
    tiles = tiles.filter(tile => {
      return tile.id !== 'mouse'
    })

    for (let tile in tiles) {
      tiles[tile].id = ''
    }

    let p = board.offsetWidth / 15
    let originX = mouse.offsetLeft + (mouse.offsetWidth / 2) + (this.state.translateX * p),
      originY = mouse.offsetTop + (mouse.offsetHeight / 2) + (this.state.translateY * p)

    let top = document.elementFromPoint(originX, originY - mouse.offsetHeight)
    top.id = 'up'
    let right = document.elementFromPoint(originX + mouse.offsetWidth, originY)
    right.id = 'right'
    let bottom = document.elementFromPoint(originX, originY + mouse.offsetHeight)
    bottom.id = 'down'
    let left = document.elementFromPoint(originX - mouse.offsetWidth, originY)
    left.id = 'left'

    return [top, right, bottom, left]

  }

  checkKeyPressed(event) {

    const mouse = document.querySelector('.mouse')

    let p = board.offsetWidth / 15
    let originX = mouse.offsetLeft + (mouse.offsetWidth / 2) + (this.state.translateX * p),
      originY = mouse.offsetTop + (mouse.offsetHeight / 2) + (this.state.translateY * p)

    const tiles = this.getSurroundingTiles()

    switch (event.keyCode) {
      case 38:
        if (tiles[0].className !== 'w' && this.state.currentTile !== 'd') {
          this.setState({
            direction: 'up'
          })
        }
        break;
      case 39:
        if (tiles[1].className !== 'w' && this.state.currentTile !== 'b') {
        this.setState({
          direction: 'right'
        })
        }
        break;
      case 40:
        if (tiles[2].className !== 'w' && this.state.currentTile !== 'd') {
          this.setState({
            direction: 'down'
          })
        }
        break;
      case 37:
        if (tiles[3].className !== 'w' && this.state.currentTile !== 'b') {
        this.setState({
          direction: 'left'
        })
        }
        break;
    }

  }

  moveMouse() {

    const mouse = document.querySelector('.mouse')

    const autoMovement = () => {
      
      const direction = this.state.direction
      let tiles = this.getSurroundingTiles()

      const nextTile = document.getElementById(this.state.direction)

      if (nextTile.className ==='w') {
        return
      }

      switch (this.state.direction) {
        case 'up':
          if (nextTile.className === 'd' || this.state.currentTile === 'd') {
            return
          }
          this.setState({
            translateY: this.state.translateY - 1
          })
          break;
        case 'right':
          if (nextTile.className === 'b' || this.state.currentTile === 'b') {
            return
          }
          this.setState({
            translateX: this.state.translateX + 1
          })
          break;
        case 'down':
          if (nextTile.className === 'd' || this.state.currentTile === 'd') {
            return
          }
          this.setState({
            translateY: this.state.translateY + 1
          })
          break;
        case 'left':
          if (nextTile.className == 'b' || this.state.currentTile === 'b') {
            return
          }
          this.setState({
            translateX: this.state.translateX - 1
          })
          break;
      }

      switch (nextTile.className) {
        case 't':
          this.setState({
            translateX: 0,
            translateY: 0,
            direction: 'right'
          })
          this.props.updateScore(-5)
          break;
        case 'x':
          setTimeout(() => {
            nextTile.className = 'f'
            this.props.updateScore(1)
          }, 150)
          break;
        case 'y':
          setTimeout(() => {
            nextTile.className = 'f'
            this.props.updateScore(5)
          }, 150)
          break;
        case 's':
          setTimeout(() => {
            const hBridges = Array.from(document.querySelectorAll('.b'))
            const vBridges = Array.from(document.querySelectorAll('.d'))
            for (let i = 0; i < hBridges.length; i++) {
              hBridges[i].className = 'd'
            }
            for (let i = 0; i < vBridges.length; i++) {
              vBridges[i].className = 'b'
            }
          }, 300)
          break;
      }

      this.setState({
        currentTile: nextTile.className
      })

    }
    let movement = setInterval(autoMovement, 300)
  }

  rotateMouse() {
    let deg
    switch(this.state.direction) {
      case 'up':
        deg = -90
        break;
      case 'right':
        deg = 0
        break;
      case 'down':
        deg = 90
        break;
      case 'left':
        deg = -180
        break;
    }
    return deg
  }
  
  componentDidMount() {
    window.addEventListener('keydown', this.checkKeyPressed, false)
    this.moveMouse()
  }

  render() {
    return (
      <img
      className="mouse"
      id="mouse"
      src="public/assets/mouse.gif"
      style={{
        transform: `translate(${this.state.translateX*5}vh, ${this.state.translateY*5}vh) rotate(${this.rotateMouse()}deg)`
      }} />
    )
  }
}
