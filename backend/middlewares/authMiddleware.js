const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Admin yetkilendirme middleware'i
exports.authorizeAdmin = async (req, res, next) => {
  try {
    // JWT'yi al
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // JWT'yi doğrula
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Admin yetkisi kontrolü
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Admin authorization required" });
    }

    // Admin yetkilendirmesi başarılı
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
