const User = require('../models/User')
module.exports = (req, res) => {
    console.log(req.session)
    if(req.session.userId != undefined) {
        res.redirect(`/dashboard/${user.family}`)
    } else {
        res.render('index', {
            layout: false,
        })
    }
    
}