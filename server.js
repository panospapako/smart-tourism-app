const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const app = require('./app');
const { default: mongoose } = require('mongoose');

const mydb = process.env.DATABASE.replace('<USERNAME>', process.env.DATABASE_USERNAME).replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
.connect(mydb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(con =>{
    console.log('DB connection successful!')
})
.catch(err => {
    console.log('An error occured: ' +err);
});

// Port
const port = process.env.PORT || 8443;

// Start server
app.listen(port, () => { 
    console.log(`Listening on port ${port}...`)
});

