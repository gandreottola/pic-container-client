'use strict'

const store = require('./../store')
const api = require('./api')
const apiAlbum = require('./../albums/api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields')

const onImageUpload = event => {
  event.preventDefault()
  const formData = new FormData(event.target)
  formData.append('owner', store.user._id)
  api.imageUpload(formData)
    .then(ui.imageUploadSuccessful)
    .catch(ui.imageUploadFailure)
}

const onImageIndex = data => {
  event.preventDefault()

  $('#user-status').text('')

  $('#show-images').hide()

  api.imageIndex()
    .then(ui.indexImagesSuccess)
    .catch(ui.indexImagesFailure)
}

const onViewMyImages = data => {
  event.preventDefault()
  api.imageIndex()
    .then(ui.viewMyImagesSuccess)
    .catch(ui.viewMyImagesFail)
}

const onSetDeleteState = data => {
  event.preventDefault()
  api.imageIndex()
    .then(ui.setDeleteStateSuccess)
    .catch(ui.setDeleteStateFail)
}

const onDeleteImage = data => {
  event.preventDefault()
  const target = event.target
  const currentImage = $(target).data('del-image')

  api.deleteImage(currentImage)
    .then(ui.deleteImageSuccess)
    .catch(ui.deleteImageFail)
}

const onSetUpdateState = data => {
  event.preventDefault()

  api.imageIndex()
    .then(ui.setUpdateSuccess)
    .catch(ui.setUpdateFail)
}

const onSelectImageEdit = data => {
  event.preventDefault()

  const target = event.target
  const currentImage = $(target).data('update-image')

  api.imageGet(currentImage)
    .then(ui.getImageSuccess)
    .catch(ui.getImageFail)
}

const onUpdateImage = event => {
  event.preventDefault()
  const form = event.target
  const formData = getFormFields(form)
  const currentImage = $(form).data('update-image')

  api.updateImage(currentImage, formData)
    .then(ui.updateImageSuccess)
    .catch(ui.updateImageFail)
}

const onAddImageToAlbum = event => {
  event.preventDefault()

  const imageId = $(event.target).data('add-image')
  const currentImage = store.images.find(image => imageId === image._id)
  store.currentImage = currentImage

  apiAlbum.indexAlbums()
    .then(ui.addImageToAlbumSuccessful)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#show-create').on('click', function () {
    $('#imageUploadForm').show()
    $('#show-images').show()
    $('#show-my-images').show()
    $('#show-create').hide()
    $('.images-content').html('')
    $('#cancel-delete').hide()
    $('#show-delete').hide()
    $('#show-update').hide()
  }).hide()
  $('#imageUploadForm').on('submit', onImageUpload).hide()
  $('#imageUploadForm').on('submit', function () {
    $('#show-create').show()
    $('#show-images').show()
  }).hide()
  $('#show-my-images').on('click', onViewMyImages).hide()
  $('#show-my-images').on('click', function () {
    $('#cancel-delete').hide()
    $('#imageUploadForm').hide()
    $('#show-my-images').hide()
    $('#show-create').show()
    $('#show-delete').show()
    $('#show-images').show()
    $('#show-update').show()
  })
  $('#show-delete').on('click', onSetDeleteState).hide()
  $('#show-delete').on('click', function () {
    $('#cancel-delete').show()
    $('#show-images').show()
    $('#show-update').show()
    $('#show-my-images').hide()
    $('#show-delete').hide()
  })
  $('#cancel-delete').on('click', onViewMyImages).hide()
  $('#cancel-delete').on('click', function () {
    $('#show-delete').show()
    $('#show-update').show()
    $('#cancel-delete').hide()
  }).hide()
  $('body').on('click', '.delete-image', onDeleteImage)
  $('#show-images').on('click', onImageIndex).hide()
  $('#show-images').on('click', function () {
    $('#show-images').hide()
    $('#cancel-delete').hide()
    $('#imageUploadForm').hide()
    $('#show-create').show()
    $('#show-delete').show()
    $('#show-update').show()
    $('#show-my-images').show()
  })
  $('#show-update').on('click', onSetUpdateState).hide()
  $('#show-update').on('click', function () {
    $('#show-my-images').hide()
    $('#show-update').hide()
    $('#show-delete').show()
    $('#show-images').show()
    $('#cancel-delete').show()
  })
  $('body').on('click', '.update-image', onSelectImageEdit)
  $('body').on('submit', '#imageUpdateForm', onUpdateImage)
  $('body').on('click', '.add-imageToAlbum', onAddImageToAlbum)
}

module.exports = {
  addHandlers
}
