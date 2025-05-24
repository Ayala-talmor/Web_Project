// Modal controls
document.addEventListener('DOMContentLoaded', function () {
    const signupModal = document.getElementById('signupModal');
    const forgotModal = document.getElementById('forgotModal');
    const showSignup = document.getElementById('show-signup');
    const showForgot = document.getElementById('show-forgot');
    const closeSignup = document.getElementById('close-signup');
    const closeForgot = document.getElementById('close-forgot');

    signupModal.style.display = 'none';

    showSignup.onclick = e => {
        e.preventDefault();
        signupModal.style.display = 'flex';
        console.log("Signup modal should now show!");
    };

    showForgot.onclick = e => {
        e.preventDefault();
        forgotModal.style.display = 'block';
    };

    closeSignup.onclick = () => signupModal.style.display = 'none';
    closeForgot.onclick = () => forgotModal.style.display = 'none';

    window.onclick = e => {
        if (e.target === signupModal) signupModal.style.display = 'none';
        if (e.target === forgotModal) forgotModal.style.display = 'none';
    };

    // Login form
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        const email = this.email.value.trim();
        const password = this.password.value;
        const users = JSON.parse(localStorage.getItem('dogPlayUsers')) || [];

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('dogPlayLoggedIn', 'true');
            localStorage.setItem('dogPlayUserName', user.firstName);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'dog_profile.html';
        } else {
            alert('Invalid email or password.');
        }
    });

    // Signup form
    document.getElementById('signupForm').addEventListener('submit', function (e) {
        e.preventDefault();

        if (!this.checkValidity()) {
            this.reportValidity();
            return;
        }

        const user = {
            firstName: this.firstName.value.trim(),
            lastName: this.lastName.value.trim(),
            email: this.email.value.trim(),
            password: this.password.value,
            phone: this.phone.value.trim(),
        };

        const users = JSON.parse(localStorage.getItem('dogPlayUsers')) || [];

        if (users.some(u => u.email === user.email)) {
            alert('An account with this email already exists.');
            return;
        }

        users.push(user);
        localStorage.setItem('dogPlayUsers', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('dogPlayUserName', user.firstName);
        localStorage.setItem('dogPlayLoggedIn', 'true');

        signupModal.style.display = 'none';
        window.location.href = 'dog_profile.html';
    });

    // Forgot password form
    document.getElementById('forgotForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const form = e.target;
        const messageEl = document.getElementById('forgotMessage');
        const email = form.forgotEmail.value.trim();
        const users = JSON.parse(localStorage.getItem('dogPlayUsers')) || [];

        // Hide any previous message
        messageEl.style.display = 'none';
        messageEl.textContent = '';

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const exists = users.some(u => u.email === email);

        if (!exists) {
            messageEl.textContent = 'No user found with this email.';
            messageEl.style.display = 'block';
            return;
        }

        // Close modal and show success toast
        forgotModal.style.display = 'none';

        const toast = document.createElement('div');
        toast.textContent = `A reset link was sent to ${email}`;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.left = '50%';
        toast.style.transform = 'translateX(-50%)';
        toast.style.backgroundColor = '#4CAF50';
        toast.style.color = 'white';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '6px';
        toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        toast.style.zIndex = '9999';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';

        document.body.appendChild(toast);
        setTimeout(() => toast.style.opacity = '1', 100);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    });
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
