//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();
        auth.currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                // Confirm the user is an Admin.
                if (!!idTokenResult.claims.admin) {
                    // Show admin UI.
                    console.log("adminUI");
                } else {
                    // Show regular user UI.
                    console.log("RegularUI");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    })
})