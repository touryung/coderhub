const path = require("path");
const Multer = require("koa-multer");
const Jimp = require("jimp");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-paths");

// 头像上传
const avatarStorage = Multer.diskStorage({
  destination: (req, file, cb) => cb(null, AVATAR_PATH),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const avatarUpload = Multer({ storage: avatarStorage });
const avatarHandler = avatarUpload.single("avatar");

// 配图上传
const pictureStorage = Multer.diskStorage({
  destination: (req, file, cb) => cb(null, PICTURE_PATH),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const pictureUpload = Multer({ storage: pictureStorage });
const pictureHandler = pictureUpload.array("picture", 9);

// 提供不同尺寸的图片
const pictureResize = async (ctx, next) => {
  const { files } = ctx.req;

  for (const file of files) {
    const ext = path.extname(file.filename);
    const destPath = path.resolve(
      file.destination,
      file.filename.replace(ext, "")
    );
    // 读取图片、更改大小、重新写入
    Jimp.read(file.path).then((image) => {
      image.resize(1280, Jimp.AUTO).write(`${destPath}-large${ext}`);
      image.resize(640, Jimp.AUTO).write(`${destPath}-middle${ext}`);
      image.resize(320, Jimp.AUTO).write(`${destPath}-small${ext}`);
    });
  }

  await next();
};

module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
