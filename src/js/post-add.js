const userinformation = document.querySelector('.user--information');

//listen for auth changes
auth.onAuthStateChanged(user => {
    if (user) {
        //user mail
        const html = `
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="mr-2 d-none d-lg-inline text-gray-600 small">${user.email}</span>
    <img class="img-profile rounded-circle" src="img/undraw_profile.svg">
    </a>
    <!-- Dropdown - User Information -->
    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
    aria-labelledby="userDropdown">

    <a class="dropdown-item" href="#">
        <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
        Profil
    </a>

    <a class="dropdown-item" href="#">
        <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
        Ayarlar
    </a>

    <div class="dropdown-divider"></div>

    <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
        <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
        Çıkış Yap
    </a>
    </div>
        `;

        userinformation.innerHTML = html;
        
    } else {
        window.location = 'login.html';
    }
});

//logout
const logout = document.querySelector('#logoutsys');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {

    });
});