import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Unauthorized - No token" });
    }

    // Verify token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if decoded value matches admin credentials
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Unauthorized - Invalid token" });
    }

    // ✅ Continue to the next middleware
    next();

  } catch (error) {
    console.error("❌ Admin Auth Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
