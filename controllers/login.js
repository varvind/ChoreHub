const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(password)
    await User.findOne({userName: username}, (error, user) => {
        if(user) {
            bcrypt.compare(password, user.passWord, (error, same) => {
                if(same) {
                    req.session.userId = user._id
                    res.redirect(`/dashboard/${user.familyid}`)
                } else {
                    console.log(error)
                    var error = "Invalid Login, Try again!"
                    res.render('login', {
                        layout: false,
                        error: error
                    })
                }
            })
        } else {
            console.log("User not found")
            res.redirect('/')
        }
    })
}