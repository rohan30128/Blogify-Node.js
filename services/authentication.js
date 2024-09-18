const JWT = require("jsonwebtoken");
const secret = "$uperMan@231"

function createTokenForUsers(user){
    const payload = {
        _id : user._id,
        email : user.email,
        profileImage : user.profileImage,
        role : user.role
    };
    const token = JWT.sign(payload,secret);
    return token;
};

function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
};

module.exports = {
    createTokenForUsers,
    validateToken
}