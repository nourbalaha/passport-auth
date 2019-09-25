const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://nourbalaha:nour1988@cluster0-y65jq.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to database");
});

const UserSchema = new mongoose.Schema({
    name: String
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;