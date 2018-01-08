import React, { isValidElement } from 'react';
import ReactDOM from 'react-dom';

let catMovement = null

export default class Cat extends React.Component {

  constructor() {
    super();
    this.state = {
      positionTop: 0,
      positionLeft: 0,
      direction: 'right',
      prevDir: 'right',
      translateX: 0,
      translateY: 0,
      currentTile: 'z',
      rotation: 0
    }
    this.moveCat = this.moveCat.bind(this)
    this.getSurroundingTiles = this.getSurroundingTiles.bind(this)
    this.rotateCat = this.rotateCat.bind(this)
    this.autoMovement = this.autoMovement.bind(this)
  }

  getSurroundingTiles() {

    const mouse = document.querySelector('.cat')
    const board = document.getElementById('board')

    let tiles = Array.from(board.querySelectorAll('div'))
    tiles = tiles.filter(tile => {
      return tile.id !== 'cat'
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

  autoMovement() {

    const cat = document.querySelector('.cat')
    const board = document.getElementById('board')
    let p = board.offsetWidth / 15

    this.setState({
      prevDir: this.state.direction
    })

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
      return tile.className !== 'w' && tile.id !== oppositeDirection && tile.className !== 'b' && tile.className !== 'd' 
    })

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

    this.rotateCat()

    let nextTile = document.getElementById(this.state.direction)

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

    this.setState({
      currentTile: nextTile.className
    })
  }

  moveCat() {
    catMovement = setInterval(this.autoMovement, 300)
  }

  rotateCat() {
    switch (this.state.direction) {
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
    this.moveCat()
  }

  componentWillUnmount() {
    clearInterval(catMovement)
  }

  render() {
    return (
      <div
        className="cat"
        id="cat"
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