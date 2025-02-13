const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies?.token;
        if(!tokenCookieValue) {
            return next();
        };

        
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) { }

        next();
    };
};

module.exports = {
    checkForAuthenticationCookie,
}