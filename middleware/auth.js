exports.isLoggedIn = (req, res, next) => {
    const userdetails = ({ isloggedin, userid, username } = req.session);
    if (isloggedin) {
        next();
    } else {
        req.session.route = req.originalUrl;
        return res.redirect("/login");
    }
};
