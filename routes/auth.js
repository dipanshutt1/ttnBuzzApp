const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

//auth with google
router.get('/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    // console.log(req.user);
);

//callback route for redirecting from google
router.get('/google/redirect', passport.authenticate('google', {
    failureRedirect: '/profile/'
}), (req, res) => {
    // res.send(req.user);
    if (req.user.status === 'Deactivate') {
        res.redirect(`http://localhost:3000/accountError`);
    } else {
        jwt.sign(req.user.toJSON(), keys.session.cookieKey, {expiresIn: '10h'},
            function (err, token) {
                if (err) {
                    console.log('err: ${err}');
                } else {
                    console.log(`token:${token}`);
                    res.redirect(`http://localhost:3000/token?q=${token}`);
                }

            });
    }

    // res.redirect('/profile/');
})

module.exports = router;
