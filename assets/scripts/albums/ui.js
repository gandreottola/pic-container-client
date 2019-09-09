const store = require('../store')
const showAlbumsTemplate = require('../templates/album-display.handlebars')
const updateAlbumTemplate = require('../templates/album-update.handlebars')
const albumImagesTemplate = require('../templates/album-images.handlebars')

const successMessage = message => {
  $('#user-status').text(message).show()
  $('#user-status').addClass('success')
  $('#user-status').removeClass('failure')

  // clear forms
  $('form').trigger('reset')
  $('#user-status').fadeOut(3000)
}

const failure = message => {
  $('#user-status').show()
  $('#user-status').text('FAIL!')
  $('#user-status').addClass('failure')
  $('#user-status').removeClass('success')

  // clear forms
  $('form').trigger('reset')
  $('#user-status').fadeOut(3000)
}

const createAlbumSuccessful = responseData => {
  store.album = responseData.album

  successMessage('Successfully Created Album!')

  const showAlbumsHtml = showAlbumsTemplate({
    albums: responseData
  })
  $('.albums-content').html(showAlbumsHtml)
  $('#albumForm').hide()
}

const indexAlbumsSuccessful = responseData => {
  store.albums = responseData.albums

  const ownedAlbums = store.albums.filter(album =>
    album.owner === store.user._id
  )

  if (ownedAlbums.length === 0) {
    successMessage('No Created Albums!')
  } else {
    successMessage('Here Are Your Albums!')
  }

  const showAlbumsHtml = showAlbumsTemplate({albums: ownedAlbums})
  store.ownedAlbums = ownedAlbums
  $('.albums-content').html(showAlbumsHtml)
}

const showAlbumSuccessful = responseData => {
  successMessage('Successfully Got Album!')

  const updateAlbumHtml = updateAlbumTemplate({
    albums: responseData
  })
  $('.albums-content').html(updateAlbumHtml)
}

const updateAlbumSuccessful = responseData => {
  successMessage('Successfully Updated Album')

  $('.albums-content').html('')
}

const deleteAlbumSuccessful = responseData => {
  successMessage('Successfully Deleted Album')

  const leftOverAlbums = responseData.albums.filter(album =>
    album.owner === store.user._id
  )

  const showAlbumsHtml = showAlbumsTemplate({albums: leftOverAlbums})
  $('.albums-content').html(showAlbumsHtml)
}

const showAlbumImagesSuccessful = (responseData) => {
  if (responseData.images.length === 0) {
    successMessage('You Have No Images In Album')
  } else {
    successMessage('Images Stored In Album')
  }

  const showAlbumImagesHtml = albumImagesTemplate({images: responseData.images})
  $('.albums-content').html(showAlbumImagesHtml)
}

const addImageSuccessful = () => {
  successMessage('Successfully Added Image')
}

const removeAlbumImageSuccessful = () => {
  successMessage('Successfully Removed Image')

  const showAlbumImagesHtml = albumImagesTemplate({images: store.currentAlbum.images})
  $('.albums-content').html(showAlbumImagesHtml)
}

module.exports = {
  createAlbumSuccessful,
  indexAlbumsSuccessful,
  showAlbumSuccessful,
  updateAlbumSuccessful,
  deleteAlbumSuccessful,
  failure,
  showAlbumImagesSuccessful,
  addImageSuccessful,
  removeAlbumImageSuccessful
}
