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


        //get data
        db.collection('sozler').get().then(snapshot => {
            setupSozler(snapshot.docs);
        });
        
        
    } else {
        window.location = 'login.html';
        setupSozler([]);
    }
});

const sozList = document.querySelector('.sozler');



//setup sozler
const setupSozler = (data) => {
    let html = '';
    data.forEach(doc => {
        const soz = doc.data();
        const div = `
        <div class="card">
        <div class="card-header" id="heading${doc.id}">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#${doc.id}" aria-expanded="true" aria-controls="collapseOne">
            ${soz.title + ' - ' + soz.author}
            </button>
          </h2>
        </div>
    
        <div id="${doc.id}" class="collapse" aria-labelledby="heading${doc.id}" data-parent="#accordionExample">
          <div class="card-body">
          ${soz.content}
          </div>
        </div>
      </div>
        `;
        html += div
    });

    sozList.innerHTML = html;
}

//logout
const logout = document.querySelector('#logoutsys');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {

    });
});