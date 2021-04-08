const firebase = require("../firebase");
var post = [];

const getpost = async function (){
    const snapshot = await firebase.db.collection('sozler').get();
    snapshot.forEach((doc) => {
        //console.log(doc.id, '=>', doc.data());
        post.push({
            "id": doc.id,
            "title": doc.data().title,
            "content": doc.data().content,
            "author": doc.data().author
        });
    });
}

// https://url/, method:GET
module.exports.getIndex = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then( async (decodedClaims) => {
            if (decodedClaims.admin === true) {
                await getpost();
            } else {
                post = [];
            }
            res.render("pages/index", {
                title: "Ana Sayfa",
                displayName: decodedClaims.name,
                displayPicture: decodedClaims.picture,
                admin: decodedClaims.admin,
                post
            });
            post = [];
        })
        .catch((error) => {
            res.redirect("user/login");
            console.log(error);
        });
};