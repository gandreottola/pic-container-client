'use strict'

const store = require('./../store')
const api = require('./api')
const ui = require('./ui')
const getFormFields = require('./../../../lib/get-form-fields')

const onCreateAlbum = event => {
  event.preventDefault()

  const form = event.target
  const formData = getFormFields(form)

  api.createAlbum(formData)
    .then(ui.createAlbumSuccessful)
    .catch(ui.failure)
}

const onIndexAlbums = event => {
  event.preventDefault()

  api.indexAlbums()
    .then(ui.indexAlbumsSuccessful)
    .catch(ui.failure)
}

const onSelectAlbumEdit = event => {
  event.preventDefault()

  const currentAlbum = $(event.target).data('id')

  api.showAlbum(currentAlbum)
    .then(ui.showAlbumSuccessful)
    .catch(ui.failure)
}

const onUpdateAlbum = event => {
  event.preventDefault()

  const formData = getFormFields(event.target)
  const currentAlbum = $(event.target).data('id')

  api.updateAlbum(currentAlbum, formData)
    .then(ui.updateAlbumSuccessful)
    .catch(ui.failure)
}

const onDeleteAlbum = event => {
  event.preventDefault()

  const currentAlbum = $(event.target).data('id')

  api.deleteAlbum(currentAlbum)
    .then(() => api.indexAlbums())
    .then(ui.deleteAlbumSuccessful)
    .catch(ui.failure)
}

const onAddImage = event => {
  event.preventDefault()
  // debugger
  const albumId = $(event.target).data('id')
  const currentAlbum = store.albums.find(album => albumId === album._id)

  currentAlbum.images.push(store.currentImage)
  store.currentAlbum = currentAlbum
  store.albums = store.current.currentAlbum

  const formData = {
    album: {
      images: store.currentImage
    }
  }

  api.updateAlbum(albumId, formData)
    .then(ui.addImageSuccessful)
    .catch(ui.failure)
}

const onShowAlbumImages = event => {
  event.preventDefault()
  // debugger

  // const albumId = $(event.target).data('id')
  // const currentAlbum = store.albums.find(album => albumId === album._id)

  // ui.showAlbumImagesSuccessful(store.currentAlbum)
}

const addHandlers = () => {
  $('#album-create').on('click', function () {
    $('#albumForm').show()
    // $('#show-images').show()
    // $('#show-my-images').show()
    $('#album-create').hide()
    // $('.images-content').html('')
    // $('#cancel-delete').hide()
    // $('#show-delete').hide()
    // $('#show-update').hide()
  }).hide()
  $('#albumForm').on('submit', onCreateAlbum).hide()
  $('#albumForm').on('submit', function () {
    $('#album-create').show()
    // $('#show-images').show()
  }).hide()
  $('#show-my-albums').on('click', onIndexAlbums).hide()
  $('#show-my-albums').on('click', function () {
    // $('#cancel-delete').hide()
    // $('#imageUploadForm').hide()
    // $('#show-my-images').hide()
    // $('#show-create').show()
    // $('#show-delete').show()
    // $('#show-images').show()
    // $('#show-update').show()
  })
  $('body').on('click', '.update-album', onSelectAlbumEdit)
  $('body').on('submit', '#updateAlbumForm', onUpdateAlbum)
  $('body').on('click', '.delete-album', onDeleteAlbum)
  $('body').on('click', '.add-image', onAddImage)
  $('body').on('click', '.album-images', onShowAlbumImages)
}

module.exports = {
  addHandlers
}
