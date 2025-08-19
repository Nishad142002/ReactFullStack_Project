import express from 'express';
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from './../middleware/auth.js';

const adminRouter = express.Router();

const conditionalAuth = (req, res, next) => {

  if (req.query.isGuest) {
    return next();
  }
 
  return auth(req, res, next);
};

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", conditionalAuth, getAllComments);
adminRouter.get("/blogs", conditionalAuth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", conditionalAuth, deleteCommentById);
adminRouter.post("/approve-comment", conditionalAuth, approveCommentById);
adminRouter.get("/dashboard", conditionalAuth, getDashboard);

export default adminRouter;