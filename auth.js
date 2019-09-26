module.exports = {
    ensureAuthenticated(req,res,next){
        if(!req.isAuthenticated()){
            req.flash("info","user not authorized")
            res.redirect("/login")
        }
        next();
    }
}