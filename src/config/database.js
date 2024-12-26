const mongoose = require('mongoose')

  const connectDB = async () => {
    await mongoose.connect('mongodb+srv://namstedev:cl1a4UIW8zsh3E66@namastenode.v2d2h.mongodb.net/devTinder')
  }

  module.exports =connectDB



  