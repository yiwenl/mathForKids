import '../scss/global.scss'
import { randomFloor } from 'randomutils'

let answering = true
let countSuccess = 0
let count = 0

if (document.body) {
  _init()
} else {
  window.addEventListener('DOMContentLoaded', _init)
}

function _init () {
  console.log('init')

  const btn = document.querySelector('.btnSubmit')
  const pResult = document.querySelector('#result')
  const pResultCorrect = document.querySelector('#resultCorrect')
  const field1 = document.querySelector('.field1')
  const field2 = document.querySelector('.field2')
  const score = document.querySelector('.score')

  const removeClass = (className, elm) => {
    if (elm.classList.contains(className)) {
      elm.classList.remove(className)
    }
  }

  const next = () => {
    count++
    field1.innerHTML = randomFloor(1000, 5000)
    field2.innerHTML = randomFloor(1000, 5000)
    pResultCorrect.value = ''
  }

  const updateScore = () => {
    score.innerHTML = `Question Number : ${count}<br/> ${countSuccess}/10`
  }

  const reset = () => {
    count = 0
    countSuccess = 0
    next()
    updateScore()
  }

  reset()

  const submit = () => {
    if (answering) {
      console.log('count', count)
      if (count === 10) {
        btn.innerHTML = 'Finish !'
      } else {
        btn.innerHTML = 'Next'
      }

      const v0 = parseInt(field1.innerHTML)
      const v1 = parseInt(field2.innerHTML)
      const result = parseInt(pResult.value)

      if (isNaN(result)) {
        // console.log('Error', result)
        pResult.value = ''
        return
      }

      if (v0 + v1 === result) {
        // console.log('Success')
        pResult.classList.add('success')
        countSuccess++
      } else {
        // console.log('Failed')
        // pResult.value = `${(v0 + v1)} <span>${result}</span>`
        pResultCorrect.value = `${v0 + v1}`
        pResult.classList.add('failed')
      }
    } else {
      btn.innerHTML = 'Submit'
      pResult.value = ''
      removeClass('success', pResult)
      removeClass('failed', pResult)

      if (count === 10) {
        reset()
      } else {
        next()
      }
    }
    updateScore()
    answering = !answering
  }

  btn.addEventListener('click', submit)
  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      submit()
    }
  })
}
