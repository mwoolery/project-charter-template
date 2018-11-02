module.exports = function(app){
    app.get('/', function(req, res){
       res.render('index');
    });

    app.get('/login', function (req, res) {
        res.render('login')
    })

    app.get('/awards', function (req, res) {
        res.render('awards')
    })

    app.get('/contact', function (req, res) {
        res.render('contact')
    })

    app.get('/events', function (req, res) {
        res.render('events')
    })

    app.get('/locker', function (req, res) {
        res.render('locker')
    })

    app.get('/meetingRooms', function (req, res) {
        res.render('meetingRooms')
    })

    app.get('/offline', function (req, res) {
        res.render('offline')
    })

};
    