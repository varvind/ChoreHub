const express = require ('express')
const app = new express()


const mongoose = require('mongoose')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const expressSession = require('express-session')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto')
app.use(bodyParser.json())
app.use(expressLayouts)
app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride('_method'))


//mongo stuff
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/chore_hub')
const conn = mongoose.createConnection('mongodb://localhost/chore_hub')
//multer
global.gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

var storage = new GridFsStorage({
  url: 'mongodb://localhost/chore_hub',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

app.use(expressSession({
    secret: 'keyboard cat'
}))
app.use(express.static(__dirname));

//to use ejs for the app
app.set('view engine', 'ejs')
//port 3000 for output
app.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port 3000")
})

global.loggedIn = null
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
})


const homeRenderController = require('./controllers/home')
const loginRenderController = require('./controllers/loginRender')
const signupRenderController = require('./controllers/signupRender')
const userSignupController = require('./controllers/signup')
const userLoginController = require('./controllers/login')
const dashRenderController = require('./controllers/dashboardRender')



app.get('/',homeRenderController)
app.get('/login', loginRenderController)
app.get('/signup', signupRenderController)
app.post('/user_signup', upload.single('image') ,userSignupController)
app.post('/user_login', userLoginController )
app.get('/dashboard/:family', dashRenderController)
app.get('/image/:filename', async (req, res) => {
    const file = await gfs.files.findOne({filename : req.params.filename})
    const readstream = gfs.createReadStream(file.filename)
    readstream.pipe(res)
})