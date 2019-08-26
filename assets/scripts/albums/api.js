'use strict'

const config = require('../config')
const store = require('../store')

// POST request
const createAlbum = formData => {
  return $.ajax({
    url: config.apiUrl + '/albums',
    data: formData,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// GET request
const indexAlbums = () => {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/albums',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// GET request
const showAlbum = currentAlbum => {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/albums/' + currentAlbum,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

// PATCH request
const updateAlbum = function (currentAlbum, formData) {
  return $.ajax({
    url: config.apiUrl + '/albums/' + currentAlbum,
    method: 'PATCH',
    data: formData,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteAlbum = function (currentAlbum) {
  return $.ajax({
    url: config.apiUrl + '/albums/' + currentAlbum,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createAlbum,
  indexAlbums,
  showAlbum,
  updateAlbum,
  deleteAlbum
}
