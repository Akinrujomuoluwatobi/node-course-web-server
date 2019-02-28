const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//this middleware is called when a request to the server is made
//and the middleware save a log to server.log then continues to other middleware
//because the next function is called at the end of the middleware request
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err) {
      console.log('Unable to append to Server.log');
    }
  })
  console.log(log);
  next();
});

//this middleware is called when the a request to server is made and it call the
//response and render the maintenance page but do not continue because the next
//method is not called
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.get('/', (req, res)=>{
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to My website'
  });
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Unable to Handle Request'
  });
});
app.listen(3000, ()=>{
  console.log('Server is up on Port 3000');
});
