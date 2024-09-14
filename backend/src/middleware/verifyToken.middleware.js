import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({
      success: false,
      error: "Token not Found",
      statusCode: 404,
    });
  }

  try {
    const decodeToken = jwt.decode(token, process.env.JWT_PRIVATE_KEY);
    if (!decodeToken) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired token",
        statusCode: 400,
      });
    }
    req.userData = decodeToken
    next()
  } catch (error) {
    console.log("Error while verifying Token : ", Error);
    return res.status(500).json({
      success: false,
      error: error,
      statusCode: 500,
    });
  }
};

export default verifyToken