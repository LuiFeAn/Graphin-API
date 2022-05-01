const {Router} = require("express");
const VerifyJwt = require("../middlewares/verifyJwt");
const multMid = require("../middlewares/multer");

const UserController = require("../controllers/UserController");

const router = Router();

router.post("/login",UserController.index);

router.get("/users/:name",VerifyJwt,UserController.show);
router.get("/users",VerifyJwt,UserController.index);
router.post("/users",VerifyJwt,UserController.store);
router.put("/users/",VerifyJwt,multMid,UserController.update);

module.exports = router;