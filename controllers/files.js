const clearImage = require('../util/clearImage');
const Post = require('../models/post');

// контроллер добавления новой картинки поста
exports.postImage = async (req, res, next) => {
  if (!req.isAuth) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    next(error);
  }
  if (!req.file) {
    return res.status(200).json({ message: "No file provided" })
  }
  // если пост изменяется другим пользователем (forbidden)
  if (req.body.postId) {
    let post = await Post.findById(req.body.postId);
    if (post.creator._id.toString() !== req.userId.toString()) {
      clearImage(req.file.path);
      return res.status(403).json({
        message: "Not allowed"
      })
    }
  }
  // если это редактирование поста и сменена картинка - 
  // удаление предыдущей
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res.status(201).json({
    message: "File stored",
    filePath: req.file.path.replace(/[\\]/g, '/')
  })
}