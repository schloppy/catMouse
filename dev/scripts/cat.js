import React from 'react';
import ReactDOM from 'react-dom';

export default class Mouse extends React.Component {

  constructor() {
    super();
    this.state = {
      direction: 'right',
      translateX: 0,
      translateY: 0
    }
    this.checkKeyPressed = this.checkKeyPressed.bind(this)
    this.moveMouse = this.moveMouse.bind(this)
    this.getSurroundingTiles = this.getSurroundingTiles.bind(this)
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

    let p = board.offsetWidth / 10
    let originX = mouse.offsetLeft + mouse.offsetWidth / 2 + (this.state.translateX * p),
      originY = mouse.offsetTop + mouse.offsetHeight / 2 + (this.state.translateY * p)

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

    let p = board.offsetWidth / 10
    let originX = mouse.offsetLeft + mouse.offsetWidth / 2 + (this.state.translateX * p),
      originY = mouse.offsetTop + mouse.offsetHeight / 2 + (this.state.translateY * p)

    const tiles = this.getSurroundingTiles()

    switch (event.keyCode) {
      case 38:
        if (tiles[0].className !== 'w') {
          this.setState({
            direction: 'up'
          })
        }
        break;
      case 39:
        if (tiles[1].className !== 'w') {
          this.setState({
            direction: 'right'
          })
        }
        break;
      case 40:
        if (tiles[2].className !== 'w') {
          this.setState({
            direction: 'down'
          })
        }
        break;
      case 37:
        if (tiles[3].className !== 'w') {
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

      tiles = tiles.filter(tile => {
        let oppositeDirection
        switch (this.state.direction) {
          case 'up':
            oppositeDirection = 'down'
            break;
          case 'right':
            oppositeDirection = 'left'
            break;
          case 'down':
            oppositeDirection = 'up'
            break;
          case 'left':
            oppositeDirection = 'right'
            break;
        }
        return tile.className !== 'w' && tile.id !== oppositeDirection
      })

      const getNewDirection = () => {
        switch (tiles.length) {
          case 0:
            switch (this.state.direction) {
              case 'up':
                this.setState({
                  direction: 'down'
                })
                break;
              case 'right':
                this.setState({
                  direction: 'left'
                })
                break;
              case 'down':
                this.setState({
                  direction: 'up'
                })
                break;
              case 'left':
                this.setState({
                  direction: 'right'
                })
                break;
            }
            break;
          case 1:
            tiles = tiles.filter(tile => tile.id !== this.state.direction)
            if (tiles.length > 0) {
              this.setState({
                direction: tiles[0].id
              })
            }
            break;
          case 2:
            tiles = tiles.filter(tile => tile.id !== this.state.direction)
            if (tiles.length === 2) {
              this.setState({
                direction: tiles[Math.round(Math.random())].id
              })
            }
            break;
        }
      }

      getNewDirection()

      switch (this.state.direction) {
        case 'up':
          this.setState({
            translateY: this.state.translateY - 1
          })
          break;
        case 'right':
          this.setState({
            translateX: this.state.translateX + 1
          })
          break;
        case 'down':
          this.setState({
            translateY: this.state.translateY + 1
          })
          break;
        case 'left':
          this.setState({
            translateX: this.state.translateX - 1
          })
          break;
      }

      const nextTile = document.getElementById(this.state.direction)

      switch (nextTile.className) {
        case 't':
          clearInterval(autoMovement)
          setTimeout(() => {
            this.setState({
              translateX: 0,
              translateY: 0,
              direction: 'right'
            })
          }, 100)
          break;
        case 'x':
          setTimeout(() => {
            nextTile.className = 'f'
            this.props.updateScore(1)
          }, 50)
          break;
        case 'y':
          setTimeout(() => {
            nextTile.className = 'f'
            this.props.updateScore(5)
          }, 50)
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
    }
    let movement = setInterval(autoMovement, 300)
  }

  componentDidMount() {
    this.moveMouse()
    window.addEventListener('keydown', this.checkKeyPressed, false)
  }

  render() {
    return (
      <div className="mouse" id="mouse" style={{ transform: `translate(${this.state.translateX * 5}vh, ${this.state.translateY * 5}vh)` }}>

      </div>
    )
  }
}
