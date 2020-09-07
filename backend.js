const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://localhost:27017/class',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err !== null) {
			console.log('Error connecting to DB', err);
			return;
		}
		console.log('DB sucessfully connected');
	}
);

const studentSchema = new mongoose.Schema(
	{
		username: String,
		created: {
			type: Date,
			default: Date.now,
		},
	},
	{
		toObject: {
			virtuals: true,
		},
		toJSON: {
			virtuals: true,
		},
	}
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
