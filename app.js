// Import required modules and packages
const express = require('express');
const mysql = require('mysql');
const bodyparser = require('body-parser');
const app = express();

app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}))

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456*',
  database: 'join_us',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Define a route to retrieve the number of users in the database
app.get('/', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM users';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      res.status(500).send('Error fetching user count from the database');
      return;
    }

    const count = results[0].count;
    // res.send(`We have ${count} users in our database.`);
    res.render('home',{data:count});

});
});

app.post('/register',function(req,res){
    var person ={
        user: req.body.email
    };

    connection.query('insert into users set?',person,function(err,result){
        if(err)throw err;
        // res.send('Thanks for joining the waitlist') -- analternative way to structure our web app
        res.redirect('/')
    });
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
