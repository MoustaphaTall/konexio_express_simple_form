const express = require('express');
const exphbs = require('express-handlebars');
const Student = require('./backend');
const port = process.env.PORT || 3000;

const app = express();

// const students = []; //avant bonus

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/students/add', (req, res) => {
	console.log('POST /students/add');
	console.log(req.body);
	const { username } = req.body;

	// students.push(username); // avant bonus

	Student.create([{ username }], (err, studentDb) => {
		console.log('isError', err);
		console.log('studentDb', studentDb);
	});

	res.render('students_add', {
		username,
	});
});

app.get('/', (req, res) => {
	console.log('GET /');
	Student.find({})
		.then((students) => {
			res.render('home', {
				/*
					obligé de faire ce map afin que handlebars ne retourne pas error -
					"Access has been denied to resolve the property "username"
					because it is not an "own property" of its parent".
				*/
				students: students.map((student) => student.username),
			});
		})
		.catch((err) => console.log('error while finding', err));

	//avant bonus
	// res.render('home', {
	// 	students,
	// });
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
