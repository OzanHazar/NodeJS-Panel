const firebase = require("../firebase");

//Tamamlandı
module.exports.getUserLogin = (req, res, next) => {
    res.render("pages/login", { title: 'Login Page', layout: 'loginLayout' });
};

//Tamamlandı
module.exports.getsessionLogout = (req, res) => {

    const sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie)
        .then((decodedClaims) => {
            return firebase.admin.auth().revokeRefreshTokens(decodedClaims.sub);
        })
        .then(() => {
            res.clearCookie('session');
            res.redirect('/user/login');
        })
        .catch((error) => {
            res.redirect('/user/login');
            console.log(error)
        });

};

module.exports.getUserList = (req, res) => {
    
    const sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if (decodedClaims.admin === true) {
                // res.render("pages/user-list", {
                //     title: "Kullanıcı Listesi",
                //     displayName: decodedClaims.name,
                //     displayPicture: decodedClaims.picture,
                //     admin: decodedClaims.admin,
                //     datatable: true,
                // });
            } else {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        }).catch((error) => {
            console.log(error);
            res.redirect("user/login");
        });

};

module.exports.postUpdateImage = (req, res) => {
    let sessionCookie = req.cookies.session || "";
    const profileimageurl = req.body.downlaodURL.toString();
    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            if ((decodedClaims.admin === true) || (decodedClaims.regularUser === true)) {
                firebase.admin
                    .auth()
                    .updateUser(decodedClaims.uid, {
                        photoURL: profileimageurl
                    })
                    .then((userRecord) => {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully updated user', userRecord.toJSON());
                    })
                    .catch((error) => {
                        console.log('Error updating user:', error);
                    });
            } else {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        })
        .catch((error) => {
            console.log(error);
            res.redirect("user/login");
        });
};

module.exports.getUserProfile = function (req, res) {
    let sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            firebase.admin.auth().getUser(decodedClaims.uid).then((userRecord) => {

                // const myJSON = JSON.stringify(userRecord);
                firebase.admin
                    .auth()
                    .updateUser(decodedClaims.uid, {

                    })
                    .then((userRecord) => {
                        // See the UserRecord reference doc for the contents of userRecord.
                        console.log('Successfully updated user', userRecord.toJSON());
                    })
                res.render("pages/profile", {
                    title: "Profilim",
                    displayName: decodedClaims.name,
                    displayPicture: userRecord.photoURL,
                    admin: decodedClaims.admin,
                    profile_page_title: "Profil",
                    profile_picture_url: userRecord.photoURL,
                    firstname: userRecord.displayName,
                    //lastname: ,
                    //konum: ,
                    email: userRecord.email,
                    phonenumber: userRecord.phoneNumber,
                    //birthday: ,
                    //bio: ,
                });
            })
        })
        .catch((error) => {
            res.redirect("/user/login");
        });

};

module.exports.getUserProfilePass = function (req, res) {
    let sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedClaims) => {
            firebase.admin.auth().getUser(decodedClaims.uid).then((userRecord) => {
                // const myJSON = JSON.stringify(userRecord);
                firebase.admin
                    .auth()
                    .updateUser(decodedClaims.uid, {})
                    .then((userRecord) => {

                        console.log('Successfully updated user', userRecord.toJSON());
                    })
                res.render("pages/profile-pass", {
                    title: "Profilim",
                    displayName: decodedClaims.name,
                    displayPicture: decodedClaims.picture,
                    admin: decodedClaims.admin,
                    profile_page_title: "Şifre Değiştir",
                    profile_picture_url: userRecord.photoURL,
                });
            })
        })
        .catch((error) => {
            res.redirect("/user/login");
        });

};

module.exports.postUserUpdate = (req, res, next) => {
    let sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie, true).then((decodedClaims) => {
        firebase.admin
            .auth()
            .updateUser(decodedClaims.uid, {
            })
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully updated user', userRecord.toJSON());
            })
            .catch((error) => {
                console.log('Error updating user:', error);
            });

        firebase.admin.auth().setCustomUserClaims(decodedClaims.uid, { admin: true })
            .then(() => {
                // The new custom claims will propagate to the user's ID token the
                // next time a new one is issued.
                console.log("ok");
            });

        firebase.admin.auth().revokeRefreshTokens(decodedClaims.uid)
            .then(() => {
                return admin.auth().getUser(decodedClaims.uid);
            })
            .then((userRecord) => {
                return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
            })
            .then((timestamp) => {
                console.log(`Tokens revoked at: ${timestamp}`);
            });

        firebase.admin.auth().verifySessionCookie(sessionCookie)
            .then((decodedClaims) => {
                return admin.auth().revokeRefreshTokens(decodedClaims.sub);
            })
            .then(() => {
                res.redirect('/user/login');
            })
            .catch((error) => {
                res.redirect('/user/login');
            });

    })
};

//Tamamlandı
module.exports.postUserLogin = (req, res) => {
    const idToken = req.body.idToken.toString();
    const csrfToken = req.body.csrfToken;

    // Guard against CSRF attacks.
    if (csrfToken !== req.cookies.csrfToken) {
        res.status(401).send('UNAUTHORIZED REQUEST!');
        return;
    }

    //5 day
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    firebase.admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true, secure: false };
                res.cookie("session", sessionCookie, options);
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
};

//Tamamlandı
module.exports.getUserAdd = function (req, res) {
    let sessionCookie = req.cookies.session || "";

    firebase.admin.auth().verifySessionCookie(sessionCookie, true)
        .then((decodedClaims) => {
            firebase.auth.onAuthStateChanged(function(user) {
                if (user) {
                  // User is signed in.
                  console.log(user);
                } else {
                    console.log("no");
                  // No user is signed in.
                }
              });
            res.render("pages/user-add", {
                title: "Kullanıcı Ekle",
                displayName: decodedClaims.name,
                displayPicture: decodedClaims.picture,
                admin: decodedClaims.admin,
            });
        });
    //passReset();


};



module.exports.postUserAdd = function (req, res) {
    let sessionCookie = req.cookies.session || "";
    const username = req.body.username;
    const userpass = req.body.password;
    const usermail = req.body.email;
    const customClaim = req.body.customClaim;
    const bio = req.body.bio;
    const phoneNumber = req.body.phonenumber;
    const location = req.body.location;
    const birthday = req.body.birthday;

    firebase.admin.auth().verifySessionCookie(sessionCookie, true)
        .then((decodedClaims) => {
            if (decodedClaims.admin === true) {

                //add the user
                createUser(usermail, userpass, username, customClaim, bio, phoneNumber, location, birthday);

            } else {
                console.log("Yetkiniz yok.")
            }
        });
};

function createUser(usermail, userpass, username, customClaim, bio, phoneNumber, location, birthday) {
    firebase.admin
        .auth()
        .createUser({
            email: usermail,
            emailVerified: false,
            password: userpass,
            displayName: username,
            phoneNumber: phoneNumber,
            disabled: false,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            if (customClaim === true) {
                firebase.admin.auth().setCustomUserClaims(userRecord.uid, { admin: true })
                    .then(() => {
                        // The new custom claims will propagate to the user's ID token the
                        // next time a new one is issued.
                        firebase.db.collection('admins').doc(userRecord.uid).set({
                            displayName: username,
                            email: usermail,
                            bio: bio,
                            location: location,
                            //photoURL: "/images/"+usermail,
                            birthday: birthday,
                        });
                        console.log("ok");
                    });
            } else {
                firebase.admin.auth().setCustomUserClaims(userRecord.uid, { admin: false, regularUser: true })
                    .then(() => {
                        // The new custom claims will propagate to the user's ID token the
                        // next time a new one is issued.
                        let splitList = userRecord.displayName.split(" ");
                        let indexList = [];

                        for (let i = 0; i < splitList.length; i++) {
                            for (let y = 1; y < splitList[i].length + 1; y++) {
                                indexList.push(splitList[i].substring(0, y).toLowerCase());
                            }
                        }

                        firebase.db.collection('regularUser').doc(userRecord.uid).set({
                            bio: bio,
                            location: location,
                            birthday: birthday,
                            //photoURL: "/images/"+usermail,
                            searchIndex: indexList
                        });
                        console.log("ok");
                    });
            }

            console.log('Successfully created new user:', userRecord.uid);
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });
}

function passReset() {
    // firebase.admin.auth()
    //     .generatePasswordResetLink('ozanhazarerdogan@gmail.com')
    //     .then(function (link) {
    //         // The link was successfully generated.
    //         console.log(link);
    //     })
    //     .catch(function (error) {
    //     });

    var emailAddress = "ozanhazarerdogan@outlook.com";

    firebase.auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        console.log("tamam");
    }).catch(function (error) {
        // An error happened.
        console.log("hata");
        console.log(error);
    });
}