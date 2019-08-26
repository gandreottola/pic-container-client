'use strict'

const store = require('../store')
const showImagesTemplate = require('../templates/image-listing.handlebars')
const deleteImageTemplate = require('../templates/delete-image.handlebars')
const updateImageTemplate = require('../templates/update-image.handlebars')
const getImageTemplate = require('../templates/choose-image.handlebars')
const addImageToAlbum = require('../templates/album-addImage.handlebars')

const successMessage = message => {
  $('#user-status').text(message).show()
  $('#user-status').addClass('success')
  $('#user-status').removeClass('failure')

  // clear forms
  $('form').trigger('reset')
  $('#user-status').fadeOut(3000)
}

const failureMessage = message => {
  $('#user-status').show()
  $('#user-status').text(message)
  // clear forms
  $('form').trigger('reset')
  $('#user-status').fadeOut(3000)
}

const imageUploadSuccessful = responseData => {
  store.image = responseData.image
  successMessage('Successfully Uploaded Your Image!')
  responseData.image.userName = () => {
    return store.user.email.split('@')[0]
  }
  const showImagesHtml = showImagesTemplate({images: responseData})
  $('.images-content').html(showImagesHtml)
  $('form').trigger('reset')
  $('#imageUploadForm').hide()
}

const imageUploadFailure = function () {
  failureMessage('Unable to Upload Image')
}

const indexImagesSuccess = responseData => {
  store.images = responseData.images
  $('.images-content').html('')
  let showImagesHtml
  if (store.images.length) {
    let i
    for (i = 0; i < store.images.length; i++) {
      store.images[i].userName = store.images[i].owner.email.split('@')[0]
    }
    showImagesHtml = showImagesTemplate({ images: store.images })
  } else {
    showImagesHtml = '<h3>Looks like your album is empty - try adding images!</h3>'
  }
  $('.images-content').append(showImagesHtml)
}

const indexImagesFailure = function () {
  failureMessage('You haven\'t added uploaded any images yet!')
}

const viewMyImagesSuccess = responseData => {
  const images = responseData.images
  $('.images-content').html('')
  $('#imageUploadForm').hide()
  $('#show-create').show()
  let ownedImages = []
  let i
  for (i = 0; i < images.length; i++) {
    images[i].userName = images[i].owner.email.split('@')[0]
    images[i].editable = images[i].owner.email === store.user.email
    if (images[i].editable === true) {
      ownedImages++
    }
  }

  const imagesHtml = () => {
    if (ownedImages > 0) {
      return updateImageTemplate({ images: images })
    } else {
      return '<h3>User has no Cluckin\' images! Cluck That!<h3>'
    }
  }
  $('.images-content').append(imagesHtml)
  $('.update-image').hide()
}

const viewMyImagesFail = function () {
  failureMessage('Unable to show User Images')
}

const setDeleteStateSuccess = responseData => {
  const images = responseData.images
  $('.images-content').html('')
  $('#imageUploadForm').hide()
  $('#show-create').show()
  let ownedImages = 0
  let i
  for (i = 0; i < images.length; i++) {
    images[i].userName = images[i].owner.email.split('@')[0]
    images[i].editable = images[i].owner.email === store.user.email
    if (images[i].editable === true) {
      ownedImages++
    }
  }
  const imagesHtml = ownedImages ? deleteImageTemplate({ images: images }) : '<h3>Looks like you\'re a bit ahead of yourself! No images available to Delete.<h1>'

  $('.images-content').append(imagesHtml)
}

const setDeleteStateFail = function () {
  failureMessage('No Images To Delete!')
}

const deleteImageSuccess = () => {
  successMessage('Successfully deleted Image')
  $('.images-content').html('')
  $('#show-delete').hide()
  $('#cancel-delete').hide()
  $('#show-images').show()
}

const deleteImageFail = function () {
  failureMessage('Unable to Delete Image')
}

const setUpdateSuccess = responseData => {
  const images = responseData.images
  $('.images-content').html('')
  $('#imageUploadForm').hide()
  $('#show-edit').show()
  let ownedImages = 0
  let i
  for (i = 0; i < images.length; i++) {
    images[i].userName = images[i].owner.email.split('@')[0]
    images[i].editable = images[i].owner.email === store.user.email
    if (images[i].editable === true) {
      ownedImages++
    }
  }

  const imagesHtml = () => {
    if (ownedImages > 0) {
      return updateImageTemplate({ images: images })
    } else {
      return '<h3>Your album is empty! Get some images.<h3>'
    }
  }
  $('.images-content').append(imagesHtml)
}
const setUpdateFail = function () {
  failureMessage('Unable to Update Image')
}

const updateImageSuccess = responseData => {
  successMessage('Successfully updated Image')

  $('.images-content').html('')
  $('#show-images').show()
  $('#show-my-images').show()
  $('#cancel-delete').hide()
  $('#show-delete').hide()
}

const updateImageFail = function () {
  failureMessage('Unable to Update Image')
}

const getImageSuccess = responseData => {
  successMessage('Successfully got Image')
  responseData.image.userName = () => {
    return store.user.email.split('@')[0]
  }
  const imagesHtml = getImageTemplate({ images: responseData })

  $('.images-content').html(imagesHtml)
}

const getImageFail = function () {
  failureMessage('Unable to get Image')
}

const addImageToAlbumSuccessful = responseData => {
  successMessage('Pick Album To Add Image')
  store.albums = responseData.albums

  const albums = responseData.albums.filter(album =>
    album.owner === store.user._id
  )

  const imageToAlbumHtml = addImageToAlbum({ albums: albums })

  $('.albums-content').html(imageToAlbumHtml)
}

module.exports = {
  imageUploadSuccessful,
  imageUploadFailure,
  setDeleteStateSuccess,
  setDeleteStateFail,
  deleteImageSuccess,
  deleteImageFail,
  indexImagesSuccess,
  indexImagesFailure,
  setUpdateSuccess,
  setUpdateFail,
  updateImageSuccess,
  updateImageFail,
  getImageSuccess,
  getImageFail,
  viewMyImagesSuccess,
  viewMyImagesFail,
  addImageToAlbumSuccessful
}
