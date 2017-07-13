const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const blogPostSchema = mongoose.Schema({
  author: {
    firstName: String,
    lastName: String
  },
  title: { type: String, required: true },
  content: { type: String },
  created: { type: Date, default: Date.now }
});

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, default: "" },
  lastName: { type: String, required: true, default: "" }
})



userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10, function (err, hash) {
    // Store hash in your password DB.
  });
}

userSchema.methods.validatePassword = function (password) {
  return bcrypt
    .compare(password, this.password)
}

userSchema.methods.apiRepr = function () {
  return {
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || ""
  };
}

blogPostSchema.virtual('authorName').get(function () {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiRepr = function () {
  return {
    id: this._id,
    author: this.authorName,
    content: this.content,
    title: this.title,
    created: this.created
  };
}

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const User = mongoose.model('User', userSchema);

module.exports = { BlogPost, User };
