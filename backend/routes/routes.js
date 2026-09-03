const koaRouter = require("koa-router");

const multer = require("@koa/multer");

// Create a Multer instance to handle file uploads

const { GetApi, UploadImg } = require("../controllers/getApi");
const { PostApi } = require("../controllers/postApi");

const router = new koaRouter();

//  Create a Multer instance to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), UploadImg);

router.get("/get", GetApi);
router.post("/post", PostApi);

module.exports = {
  router,
};
