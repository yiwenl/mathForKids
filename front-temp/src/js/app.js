import '../scss/global.scss'

if (document.body) {
  _init()
} else {
  window.addEventListener('DOMContentLoaded', _init)
}

function _init () {
  console.log('here')
}
