import React from 'react';
import ReactDOM from 'react-dom';

let mouseMovement = null

export default class Mouse extends React.Component {

  constructor() {
    super();
    this.state = {
      positionTop: 0,
      positionLeft: 0,
      direction: 'right',
      prevDir: 'right',
      translateX: 0,
      translateY: 0,
      currentTile: 'f',
      rotation: 0
    }
    this.checkKeyPressed = this.checkKeyPressed.bind(this)
    this.moveMouse = this.moveMouse.bind(this)
    this.getSurroundingTiles = this.getSurroundingTiles.bind(this)
    this.rotateMouse = this.rotateMouse.bind(this)
    this.autoMovement = this.autoMovement.bind(this)
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
    let originX = board.offsetLeft + mouse.offsetLeft + (mouse.offsetWidth / 2) + (this.state.translateX * p),
      originY = board.offsetTop + mouse.offsetTop + (mouse.offsetHeight / 2) + (this.state.translateY * p)

    let top = document.elementFromPoint(originX, originY - mouse.offsetHeight)
    top.id = 'up'
    let right = document.elementFromPoint(originX + mouse.offsetWidth, originY)
    right.id = 'right'
    let bottom = document.elementFromPoint(originX, originY + mouse.offsetHeight)
    bottom.id = 'down'
    let left = document.elementFromPoint(originX - mouse.offsetWidth, originY)
    left.id = 'left'

    let list = [top, right, bottom, left]
    return list

  }

  checkKeyPressed(event) {

    this.setState({
      prevDir: this.state.direction
    })

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

    this.rotateMouse()

  }

  autoMovement() {

    const mouse = document.querySelector('.mouse')
    const board = document.getElementById('board')
    let p = board.offsetWidth / 15

    const direction = this.state.direction
    let tiles = this.getSurroundingTiles()

    const nextTile = document.getElementById(this.state.direction)

    if (nextTile.className === 'w') {
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
        setTimeout(() => {
          nextTile.className = 'f'
          this.props.updateScore(-5)
          this.props.updatePoison(1)
          this.props.updateLives(-1)
        }, 150)
        break;
      case 'x':
      case 'k':
        setTimeout(() => {
          nextTile.className = 'f'
          this.props.updateScore(1)
          this.props.updateCrumbs(1)
        }, 150)
        break;
      case 'y':
        setTimeout(() => {
          nextTile.className = 'f'
          this.props.updateScore(5)
          this.props.updateCheese(1)
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
      case 'e':
        setTimeout(() => {
          console.log('Level Ended!')
          // props to parent to change gameboard state to dismount
          this.props.isPlaying()
          // props to parent to change state of levelEnded to mount
          this.props.endLevel()
          // turn off mouse event listeners
          // clearInterval(mouseMovement)
        }, 300)
        break;

    }

    this.setState({
      currentTile: nextTile.className
    })

  }

  moveMouse() {
    const mouse = document.querySelector('.mouse')
    mouseMovement = setInterval(this.autoMovement, 300)
  }

  rotateMouse() {
    switch(this.state.direction) {
      case 'up':
        switch (this.state.prevDir) {
          case 'left':
            this.setState({
              rotation: this.state.rotation + 90
            })
            break;
          case 'right':
            this.setState({
              rotation: this.state.rotation - 90
            })
            break;
          case 'down':
            this.setState({
              rotation: this.state.rotation - 180
            })
            break;
        }
        break;
      case 'right':
        switch (this.state.prevDir) {
          case 'left':
            this.setState({
              rotation: this.state.rotation + 180
            })
            break;
          case 'up':
          this.setState({
              rotation: this.state.rotation + 90
            })
            break;
          case 'down':
          this.setState({
              rotation: this.state.rotation - 90
            })
            break;
        }
        break;
      case 'down':
        switch (this.state.prevDir) {
          case 'left':
          this.setState({
              rotation: this.state.rotation - 90
            })
            break;
          case 'right':
          this.setState({
              rotation: this.state.rotation + 90
            })
            break;
          case 'up':
          this.setState({
              rotation: this.state.rotation + 180
            })
            break;
        }
        break;
      case 'left':
        switch (this.state.prevDir) {
          case 'up':
          this.setState({
              rotation: this.state.rotation - 90
            })
            break;
          case 'right':
          this.setState({
              rotation: this.state.rotation - 180
            })
            break;
          case 'down':
          this.setState({
              rotation: this.state.rotation + 90
            })
            break;
        }
        break;
    }
  }
  
  componentDidMount() {
    window.addEventListener('keydown', this.checkKeyPressed, false)
    this.moveMouse()
  }

  componentWillUnmount() {
    clearInterval(mouseMovement)
  }

  render() {
    return (
      <div
        className="mouse"
        id="mouse"
        style={{
          transform: `translate(${this.state.translateX * 5}vh, ${this.state.translateY * 5}vh)rotate(${this.state.rotation}deg)`,
          top: `${this.props.pTop}vh`,
          left: `${this.props.pLeft}%`
        }}
      >
      </div>
    )
  }
}