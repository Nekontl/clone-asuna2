var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://devn:ma3c140175@devn.je2td.mongodb.net/devn?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});
userSchema = new Schema( {
	
	unique_id: Number,
	nowa: Number,
	username: String,
	password: String,
	passwordConf: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;
