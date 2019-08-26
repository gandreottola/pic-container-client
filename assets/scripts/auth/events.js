'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const imgApi = require('./../images/api')
const imgUi = require('./../images/ui')
const ui = require('./ui')
// const store = require('../store')

const onSignUp = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  api.signUp(formData)
    .then(ui.signUpSuccessful)
    .catch(ui.failure)
}

const onSignIn = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  api.signIn(formData)
    .then(ui.signInSuccessful)
    .then(imgApi.imageIndex)
    .then(imgUi.indexImagesSuccess)
    .catch(ui.failure)
    .catch(imgUi.indexImagesFailure)
}

const onChangePassword = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)
  api.changePassword(formData)
    .then(ui.changePasswordSuccessful)
    .catch(ui.failure)
}

const onSignOut = event => {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccessful)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#signUp').on('submit', onSignUp)
  $('#signIn').on('submit', onSignIn)
  $('#changePassword').on('submit', onChangePassword)
  $('#signOut').on('submit', onSignOut).on('submit', () => {
    $('#show-create').hide()
    $('#show-delete').hide()
    $('#show-update').hide()
    $('#signIn').show()
    $('#signUp').show()
    // $('#changePassword').hide()
    $('.images-content').html('')
  })
}

module.exports = {
  addHandlers
}
