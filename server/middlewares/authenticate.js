const jwt = require('jsonwebtoken');
const User = require("../models/schema");
const { decrypt } = require("../models/EncDecManager");

const authenticate = async (req, res, next) =>
{
    // console.log("in authenticate");
    
    try
    {
        const token = req.cookies.jwtoken;
        // console.log("token is ",token)
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("verify ",verify);/
        
        var rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });

        if (!rootUser)
        {
            throw new Error("User now found");
        }

        console.log(rootUser.name);

        return res.send("HEllo")

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
    catch (error)
    {
         
        return  res.status(400).json({error: "Unauthorised user."})
       
    }
    
};


module.exports = authenticate;