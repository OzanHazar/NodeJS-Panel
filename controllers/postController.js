const firebase = require("../firebase");

// https://url/post/list, method:GET
module.exports.getPostList = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";
    
    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            res.render("pages/post-list", {
                title: "Haber Listesi",
                datatable: true,
                displayName: decodedClaims.name,
                displayPicture: decodedClaims.picture,
                admin: decodedClaims.admin,
            });
        })
        .catch((error) => {
            res.redirect("user/login");
        });
};

// https://url/post/add, method:GET
module.exports.getPostAdd = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";
    
    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            res.render("pages/post-add", {
                title: "Haber Ekleme Sayfası",
                datatable: false,
                displayName: decodedClaims.name,
                displayPicture: decodedClaims.picture,
                admin: decodedClaims.admin,
            });
        })
        .catch((error) => {
            res.redirect("user/login");
        });
};

// https://url/post/add, method:POST
module.exports.postPostAdd = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";
    
    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if(decodedClaims.admin){
                console.log("İşlem Yetkiniz Var.");
            }else{
                console.log("İşlem Yetkiniz Yok.");
            }
        })
        .catch((error) => {
            res.redirect("user/login");
        });
};

// https://url/post/approve, method:GET
module.exports.getPostApprove = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";
    
    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if(decodedClaims.admin){
                res.render("pages/post-approve", {
                    title: "Haber Onaylama Sayfası",
                    datatable: true,
                    displayName: decodedClaims.name,
                    displayPicture: decodedClaims.picture,
                    admin: decodedClaims.admin,
                });
            }else{
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }

        })
        .catch((error) => {
            res.redirect("user/login");
        });
};

// https://url/post/approve, method:POST
module.exports.postPostApprove = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";
    
    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if(decodedClaims.admin){
                console.log("İşlem Yetkiniz Var.");
            }else{
                console.log("İşlem Yetkiniz Yok.");
            }
        })
        .catch((error) => {
            res.redirect("user/login");
        });
};
