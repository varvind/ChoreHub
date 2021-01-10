const User = require('../models/User')
const bcrypt = require('bcryptjs')
module.exports = (req, res) => {
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password
    var imgObj
    if(!req.file) {
        imgObj = {
            filename: "default",
            id: "0"
        }
    } else {
        imgObj = {
            filename: req.file.filename,
            id: req.file.id
        }
    }
    
    bcrypt.hash(password, 10, async function(error, hash) {
        await User.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            userName: username,
            passWord: hash,
            image: imgObj
        }, function (error, user) {
            if(error) {
                console.log(error)
                res.redirect('/')
            } else {
                req.session.userId = user._id
                res.redirect('/dashboard/undefined')
            }
        })
    })

}