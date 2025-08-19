import express from "express"
import {addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish} from "../controllers/blogController.js";
import upload from "../middleware/multer.js";
import auth from './../middleware/auth.js';

const blogRouter = express.Router();

const conditionalAuth = (req, res, next) => {

  if (req.body.isGuest) {
    return  res.json({success: false, message: "As a guest, you have read-only access to the dashboard. Thanks for understanding!"})
  }
    
  return auth(req, res, next);
};

blogRouter.post("/add", upload.single('image'), auth,addBlog)
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete', conditionalAuth, deleteBlogById);
blogRouter.post('/toggle-publish', conditionalAuth, togglePublish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate', generateContent);

export default blogRouter;