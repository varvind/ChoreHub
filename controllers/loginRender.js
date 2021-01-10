

module.exports = (req, res) => {
    res.render('login', {
        layout: false,
        error: ''
    })
}