module.exports = {
    ensureAuthenticated(req,res,next){
        if(req.isAuthenticated()){
            next();
        }
        res.send("not authinticated")
    }
}