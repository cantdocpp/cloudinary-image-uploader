require('dotenv').config()
const fs = require('fs')
let cloudinary = require('cloudinary').v2

const folderName = 'images'
let listOfFileName = []
const dirPublic = './' + folderName + '/'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

function readingFile(cb) {
  fs.readdir(folderName, (err, files) => {
    if (err) throw err
    cb(files)
  })
}

function listFile () {
  readingFile(function(files) {
    return promise = new Promise(function(resolve, reject) {
      files.forEach(file => {
        listOfFileName.push(file)
      })
      if (listOfFileName.length > 0) {
        resolve('success listing filename')
      } else {
        reject('failed')
      }
    })
      .then(function(resolve) {
        console.log(resolve)
        uploadImage(listOfFileName)
      })
      .catch(function(error) {
        console.log(error)
      })
  })
}

function uploadImage (imageData) {
  for (i = 0; i < imageData.length ; i++) {
    cloudinary.uploader.upload(dirPublic + imageData[i], {
      use_filename: true,
      unique_filename: false
    }, function(error, result) {
      if (error) throw error
      console.log(result)
    })
  }
}

listFile()
