const multer = require("multer");
const path = require("path");

// Dosyaların kaydedileceği dizini belirleyin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Dosya ismi: timestamp + orijinal uzantısı
  },
});

// Dosya yükleme ayarları
const upload = multer({ storage: storage });

module.exports = upload;
