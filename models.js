const mongoose = require('mongoose');

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
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
})

userSchema.statics.hashPassword = function(password) {
  return bcrypt
  .has(password, 10)
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt
  .compare(password, this.password)
}

userSchema.methods.apiRepr = function() {
username: this.username
firstName: this.firstName
lastName: this.lastName
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
