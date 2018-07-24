const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express(); //making a new express app --


//enabling us to make use of partial files -- reusable elements on our pages
hbs.registerPartials(`${__dirname}/views/partials`); 

//establishing a key-value pair -- anything hbs here will know to look in views folder:
app.set('view engine', 'hbs'); 








//configuring more middleware:::
app.use((req, res, next) => {  //next arg is required for middleware to finish
	const now = new Date().toString();
	const log = `${now}: ${req.method} ${req.url}`;
	console.log(log)
	fs.appendFile('server.log', `${log}\n`, (err) => {
		if (err) {
			console.log('unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs')
});

//using some express.js middleware - tweaking express functionality::
app.use(express.static(`${__dirname}/public`)) //express.static takes the absolute path to the folder we want to serve up










hbs.registerHelper(`getCurrentYear`, () => {   //shortcut syntax for our currentYear prop on each partial
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {  //creating a function for us to uppercase text
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		text: 'YURR WE IN THIS HOE',
		quiet: 'hello there the angel from my nightmare',
		// currentYear: new Date().getFullYear(),
		heady: 'BATIMON HEADER'
	});
});

app.get('/about', (req, res) => {
	res.send({
		name: 'Quanny',
		likes: [
		'big booties',
		'big tiddies'
		]
	})
}); 

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'BAD'
	})
});

app.get('/handlebars', (req, res) => {  //rendering through a template via handlebars
	res.render('about.hbs', {
		pageTitle: 'YUUUURRRRRTHISNEW',
		// currentYear: new Date().getFullYear(),
		quiet: 'hello there the angel from my nightmare',
		heady: 'BATIMON HEADER'
	});
});


app.listen(port, () => {
	console.log(`server is up on port ${port}`)
}); //bind the application to a port on our machine -- port 3000











// our first app.get ::::::::
// app.get('/', (req, res) => {  //two args -- request and response -- req stores info about request coming in -- res has methods available so we can respond to http req in whatever way 
// 	res.send(`<h1>Hello Express!</h1>`); //this would be the body data -- what you see when you access the site
// });