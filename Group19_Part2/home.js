// Dropdown toggle logic
document.addEventListener('DOMContentLoaded', function () {
    const dropdownBtn = document.getElementById('homeDropdownBtn');
    const dropdown = document.getElementById('homeDropdown');

    if (dropdownBtn && dropdown) {
        dropdownBtn.addEventListener('click', function (e) {
            e.preventDefault();
            dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
        });

        document.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target) && event.target !== dropdownBtn) {
                dropdown.style.display = 'none';
            }
        });
    }
});

// Redirect to matches or login page based on login status
document.getElementById('find-playmates-btn').addEventListener('click', function (event) {
    event.preventDefault();
    const loggedIn = localStorage.getItem('dogPlayLoggedIn') === 'true';
    window.location.href = loggedIn ? 'matches.html' : 'login.html';
});

// Update user info, status icon, and hide login button
const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const greeting = document.getElementById('greeting');
const userInfo = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');
const loginLink = document.getElementById('menu-login');
const statusIcon = document.getElementById('login-status-icon');

if (loggedInUser && greeting && userInfo) {
    userInfo.style.display = 'flex';
    greeting.textContent = `Hi, ${loggedInUser.firstName || 'User'}!`;
    statusIcon.textContent = '🟢';
    // Hide login link if user is already logged in
    if (loginLink) loginLink.style.display = 'none';
}

logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('dogPlayLoggedIn');
    localStorage.removeItem('dogPlayUserName');
    localStorage.setItem('justLoggedOut', 'true');
    window.location.href = 'login.html';
});

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
