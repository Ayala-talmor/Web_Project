// Check if user is logged in and update page accordingly
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const mainContent = document.getElementById("main-content");
const unauthorizedMessage = document.getElementById("unauthorized-message");
const greeting = document.getElementById('greeting');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');
const loginLink = document.getElementById('menu-login');
const statusIcon = document.getElementById('login-status-icon');

// Show/hide content based on login state
//loggedInUser = true;
if (!loggedInUser) {
    unauthorizedMessage.style.display = "block";
} else {
    mainContent.style.display = "block";
    userInfo.style.display = 'flex';
    greeting.textContent = `Hi, ${loggedInUser.firstName || 'User'}!`;
    statusIcon.textContent = '🟢';
    if (loginLink) loginLink.style.display = 'none'; // Hide login button
}

// Logout clears session and redirects
logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('dogPlayLoggedIn');
    localStorage.removeItem('dogPlayUserName');
    window.location.href = 'login.html';
});

// Dog form logic
const form = document.getElementById('dogForm');
let lastClickedButton = null;

form.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', () => {
        lastClickedButton = button.value;
    });
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const formData = new FormData(form);
    const dog = {};

    formData.forEach((value, key) => {
        if (key !== 'imageFile') {
            dog[key] = value;
        }
    });

    dog.timestamp = Date.now();

    // Include current user info in the dog object
    dog.owner = `${loggedInUser.firstName} ${loggedInUser.lastName}`; // Owner's full name
    dog.phone = loggedInUser.phone;
    dog.email = loggedInUser.email;


    const file = form.querySelector('input[name="imageFile"]').files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function () {
            dog.image = reader.result;
            saveDogAd(dog);
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select an image.");
    }
});

// Save the dog ad and handle post-submission
function saveDogAd(dog) {
    const ads = JSON.parse(localStorage.getItem('dogAds')) || [];
    ads.push(dog);
    localStorage.setItem('dogAds', JSON.stringify(ads));

    if (lastClickedButton === 'add-another') {
        form.reset();
        form.classList.remove('was-validated');
        alert("Dog added! You can enter another one 🐶");
    } else {
        window.location.href = 'matches.html';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('terms-link').onclick = function (e) {
        e.preventDefault();
        alert("Terms of Service: \n\nIf you actually read this, you get a gold star. Please play nice and always pet the dogs.");
    };

    document.getElementById('privacy-link').onclick = function (e) {
        e.preventDefault();
        alert("Privacy Policy: \n\nAll your dog play dates are kept top secret. We don’t even tell the cats.");
    };
});