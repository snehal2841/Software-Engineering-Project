module.exports.isLoggedIn = (req,res,next) =>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash('error','you must be logged in first to do that!!');
        console.log('Must be logged In')
        return res.redirect('/login');
    }
    next();
}