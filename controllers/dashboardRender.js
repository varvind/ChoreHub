const User = require('../models/User')

module.exports = (req, res) => {
    if(!loggedIn) {
        res.redirect('/')
    } else {
        const user = User.findById(req.session.userId, (error, user) => {
            const family = req.params.family
            if(user) {
                res.render('dashboard', {
                    layout: 'layouts/main',
                    user: user,
                    family:family
                })
            } else {
                res.redirect('/')
            }
        })
    }
}