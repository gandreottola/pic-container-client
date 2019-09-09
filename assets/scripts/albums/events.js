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

  const albumId = $(event.target).data('id')
  const currentAlbum = store.albums.find(album => albumId === album._id)

  currentAlbum.images.push(store.currentImage)

  const formData = {
    album: {
      images: currentAlbum.images
    }
  }

  api.updateAlbum(albumId, formData)
    .then(ui.addImageSuccessful)
    .catch(ui.failure)
}

const onShowAlbumImages = event => {
  event.preventDefault()

  const albumId = $(event.target).data('id')
  store.albumId = albumId
  const currentAlbum = store.albums.find(album => albumId === album._id)
  store.currentAlbum = currentAlbum

  ui.showAlbumImagesSuccessful(currentAlbum)
}

const onRemoveAlbumImage = event => {
  event.preventDefault()

  const imageId = $(event.target).data('remove-image')
  const currentAlbum = store.albums.find(album => store.albumId === album._id)

  for (let i = 0; i < currentAlbum.images.length; i++) {
    if (currentAlbum.images[i]._id === imageId) {
      currentAlbum.images.splice(i, 1)
    }
  }
  const formData = {
    album: {
      images: currentAlbum.images
    }
  }
  store.currentAlbum = currentAlbum

  api.updateAlbum(store.albumId, formData)
    .then(ui.removeAlbumImageSuccessful)
    .catch(ui.failure)
}

const addHandlers = () => {
  $('#album-create').on('click', function () {
    $('#albumForm').show()
    $('#album-create').hide()
    $('.cancel').show()
  }).hide()
  $('#albumForm').on('submit', onCreateAlbum).hide()
  $('#albumForm').on('submit', function () {
    $('#album-create').show()
    $('.cancel').hide()
  }).hide()
  $('#show-my-albums').on('click', onIndexAlbums).hide()
  $('.cancel').on('click', function () {
    $('#albumForm').hide()
    $('#album-create').show()
    $('.cancel').hide()
  })
  $('body').on('click', '.update-album', onSelectAlbumEdit)
  $('body').on('submit', '#updateAlbumForm', onUpdateAlbum)
  $('body').on('click', '.cancel-update', onIndexAlbums)
  $('body').on('click', '.delete-album', onDeleteAlbum)
  $('body').on('click', '.add-image', onAddImage)
  $('body').on('click', '.album-images', onShowAlbumImages)
  $('body').on('click', '.remove-album-image', onRemoveAlbumImage)
}

module.exports = {
  addHandlers
}
