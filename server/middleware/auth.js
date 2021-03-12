const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const auth = async (req, res, next) => {
    try {
        // Get the token 
        const token = req?.headers?.authorization?.split(' ')[1];

        if (!token) return res.status(500).json('Not authorizated')

        // Check if is it Google token or own token
        const isCustomAuth = token?.length < 500;

        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, ACCESS_TOKEN_SECRET);

            req.userId = decodedData?._id;
        }
        else {
            decodedData = jwt.decode(token);
            // sub is specific id for google auth
            req.userId = decodedData?.sub;
            req.email = decodedData?.email;
            req.name = decodedData?.name;
            req.isGoogleAuth = true;
        }
        next();
    } catch (error) {
        console.log(error)
    }
}

module.exports = { auth }