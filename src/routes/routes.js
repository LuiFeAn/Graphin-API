const {Router} = require("express");
const VerifyJwt = require("../middlewares/verifyJwt");
const multMid = require("../middlewares/multer");

const UserController = require("../controllers/UserController");
const PhotoController = require("../controllers/PhotoController");
const LoginController = require("../controllers/LoginController");

const router = Router();

router.get("/login",VerifyJwt,LoginController.authenticated);
router.post("/login",LoginController.authenticate);

router.get("/users",VerifyJwt,UserController.index);
router.get("/users/:id",VerifyJwt,UserController.show);
router.post("/users",VerifyJwt,UserController.store);
router.put("/users/",VerifyJwt,multMid.single('userPic'),UserController.update);

router.get("/photos",VerifyJwt,PhotoController.index);
router.get("/photos/:id",VerifyJwt,PhotoController.show);
router.post("/photos",VerifyJwt,multMid.single('photo'),PhotoController.store);

module.exports = router;