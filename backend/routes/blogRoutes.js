const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authorizeAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Tüm blogları getirme
router.get("/", blogController.getAllBlogs);

// Yeni blog oluşturma
router.post(
  "/",
  authorizeAdmin,
  upload.single("titleImage"),
  blogController.createBlog
);

// Blogu ID ile getirme
router.get("/:id", blogController.getBlogById);

// Blogu güncelleme
router.put(
  "/:id",
  authorizeAdmin,
  upload.single("titleImage"),
  blogController.updateBlog
);

// Blogu silme
router.delete("/:id", authorizeAdmin, blogController.deleteBlog);

module.exports = router;
