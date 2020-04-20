import '../scss/global.scss'
import Settings from './Settings'
import Config from './Config'
import { randomFloor } from 'randomutils'

let na, nb, result
let _a, _b, _result
let state = 0
if (document.body) {
  _init()
} else {
  window.addEventListener('DOMContentLoaded', _init)
}

function _init () {
  Settings.init()

  const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const NUMBERS_START = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  na = document.body.querySelector('.number.first')
  nb = document.body.querySelector('.number.second')
  result = document.body.querySelector('.number.result')
  // console.log(na, nb, result)

  const refresh = () => {
    next()
    Settings.refresh()
  }

  setTimeout(() => {
    gui.add(Config, 'range', NUMBERS).onFinishChange(refresh)
    gui.add(Config, 'fixStart', NUMBERS_START).onFinishChange(refresh)
  }, 1500)

  next()
}

function next () {
  _a = randomFloor(1, Config.range)
  if (Config.fixStart > 0) {
    _a = Config.fixStart
  }
  console.log('Config.range', Config.range + 1)
  _b = randomFloor(1, parseInt(Config.range) + 1)

  _result = _a * _b
  state = 0

  na.innerHTML = _a
  nb.innerHTML = _b
  result.innerHTML = '?'
}

function showResult () {
  result.innerHTML = _result
  state = 1
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode === 32) {
    if (state === 0) {
      showResult()
    } else {
      next()
    }
  }
})

window.addEventListener('touchstart', (e) => {
  if (state === 0) {
    showResult()
  } else {
    next()
  }
})
