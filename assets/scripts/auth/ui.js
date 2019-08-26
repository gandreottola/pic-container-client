'use strict'
const store = require('../store')

const successMessage = message => {
  $('#message').text(message).show()
  setTimeout(() => { $('#message').hide() }, 3000)
  $('#message').removeClass('failure')
  $('#message').addClass('success')

  // clear out our forms
  $('form').trigger('reset')
}

const failure = message => {
  $('#message').text('FAIL!').show()
  setTimeout(() => { $('#message').hide() }, 3000)
  $('#message').removeClass('success')
  $('#message').addClass('failure')

  // clear out our forms
  $('form').trigger('reset')
}

const signUpSuccessful = responseData => {
  successMessage('Sign up successful!')
}

const signInSuccessful = responseData => {
  successMessage('Sign in successful!')
  store.user = responseData.user
  $('#user-status').text('Check out all these Chicken Pix!').fadeOut(3000)
  $('#passwordButton').removeClass('collapse')
  $('#signOutButton').removeClass('collapse')
  // $('#signOut').removeClass('collapse')
  // $('#SignOut').removeClass('collapse')
  $('#show-create').show()
  $('#show-delete').show()
  $('#show-update').show()
  $('#show-my-images').show()
  $('#SignIn').addClass('collapse')
  $('#SignUp').addClass('collapse')
  $('#SignInToggle').removeClass('show')
  $('.Image-Functions').show()
  $('.album-Functions').show()
  $('#show-my-albums').show()
  $('#album-create').show()
  // $('#SignOutToggle').show()
  $('#SignOut').removeClass('collapse')
}

const changePasswordSuccessful = responseData => {
  successMessage('Password successfully changed!')
}

const signOutSuccessful = responseData => {
  successMessage('Sign out successful!')
  $('#SignIn').removeClass('collapse')
  $('#SignUp').removeClass('collapse')
  $('#passwordButton').addClass('collapse')
  $('#imageUploadForm').hide()
  // $('#signOutButton').addClass('collapse')
  // $('#SignOutToggle').hide()
  $('#SignOutButton').addClass('collapse')
  $('#SignOut').addClass('collapse')
  $('#SignOutToggle').addClass('collapse')
  $('#SignOutToggle').removeClass('show')
  $('.images-content').html('')
  $('.album-Functions').hide()
  $('#cancel-delete').hide()
  $('#show-images').hide()
  $('#show-my-images').hide()
  $('#show-my-albums').hide()
  $('#album-create').hide()
  $('#user-status').html('')
}

module.exports = {
  signUpSuccessful,
  signInSuccessful,
  signOutSuccessful,
  changePasswordSuccessful,
  failure
}
