import '../scss/global.scss'

import SceneApp from './SceneApp'
import Settings from './Settings'
import preload from './utils/preload'
import addControls from './debug/addControls'

if (document.body) {
  _init()
} else {
  window.addEventListener('DOMContentLoaded', _init)
}

function _init () {
  console.log('init')
}
