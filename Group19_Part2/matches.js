// Toggle contact information visibility
function showContact(button) {
    const info = button.nextElementSibling;
    info.style.display = info.style.display === 'none' ? 'block' : 'none';
}

const adsSection = document.getElementById('ads-section');
const noAdsDiv = document.getElementById('no-ads');
const form = document.querySelector('.filter-form');
const TWO_MINUTES = 2 * 60 * 1000;
const allAds = JSON.parse(localStorage.getItem('dogAds')) || [];

// Fill the city dropdown with unique cities from ads
function populateCityOptions(ads) {
    const citySelect = document.getElementById("city-filter");
    const cities = [...new Set(ads.map(ad => ad.city?.trim()).filter(Boolean))].sort();
    cities.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

// Filter ads based on selected options
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const filters = Object.fromEntries(new FormData(form).entries());
    const filteredAds = allAds.filter(ad => {
        return (
            (!filters.city || ad.city === filters.city) &&
            (!filters.size || ad.size === filters.size) &&
            (!filters.gender || ad.gender === filters.gender) &&
            (!filters.energy || ad.energy === filters.energy)
        );
    });
    renderAds(filteredAds);
});

// Render filtered dog ads
function renderAds(ads) {
    adsSection.querySelectorAll('.dog-card').forEach(el => el.remove());

    if (ads.length === 0) {
        noAdsDiv.style.display = 'block';
        return;
    }

    noAdsDiv.style.display = 'none';
    const now = Date.now();

    ads.forEach(dog => {
        const card = document.createElement('div');
        card.classList.add('dog-card', 'animate');

        if (now - dog.timestamp < TWO_MINUTES) {
            const badge = document.createElement('span');
            badge.classList.add('badge');
            badge.textContent = 'New!';
            card.appendChild(badge);
        }

        card.innerHTML += 
         `<img src="${dog.image}" alt="Dog ${dog.name}">
          <h3>${dog.name}</h3>
          <p><strong>Breed:</strong> ${dog.breed}</p>
          <p><strong>Age:</strong> ${dog.age}</p>
          <p><strong>Gender:</strong> ${dog.gender}</p>
          <p><strong>Size:</strong> ${dog.size}</p>
          <p><strong>Energy:</strong> ${dog.energy}</p>
          <p><strong>City:</strong> ${dog.city}</p>
          <button onclick="showContact(this)">Show Contact Info</button>
          <div class="contact-info" style="display:none;">
            <p><strong>Owner:</strong> ${dog.owner}</p>
            <p><strong>Phone:</strong> ${dog.phone}</p>
            <p><strong>Email:</strong> ${dog.email}</p>
          </div>`;
        adsSection.appendChild(card);
    });
}

// Update UI if user is logged in
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
    // Hide the login button when logged in
    if (loginLink) loginLink.style.display = 'none';
}

// Logout behavior
logoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('dogPlayLoggedIn');
    localStorage.removeItem('dogPlayUserName');
    window.location.href = 'login.html';
});

// Initialize page
populateCityOptions(allAds);
renderAds(allAds);

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
