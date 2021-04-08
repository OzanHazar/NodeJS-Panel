const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

//Yapıldı
router.get("/login", userController.getUserLogin);

//Yapıldı
router.get("/sessionLogout", userController.getsessionLogout);

//Yapıldı
router.post("/sessionLogin", userController.postUserLogin);

//Yapıldı
router.get("/add", userController.getUserAdd);

//profil için arayüz ayarlanacak
router.get("/profile", userController.getUserProfile);

router.get("/password", userController.getUserProfilePass);

router.post("/updateimage", userController.postUpdateImage);




//Yapılacak
//kullanıcı ekleneceği zaman post edilecek
router.post("/add", userController.postUserAdd);

//Yapılacak
//profilden güncelle dendiği zaman update edecek 
router.post("/update", userController.postUserUpdate);

//Yapılacak
//profilden güncelle dendiği zaman update edecek 
router.get("/list", userController.getUserList);

module.exports = router;