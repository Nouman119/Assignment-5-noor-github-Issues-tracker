const loginButton = document.getElementById('login-btn');
const usernameField = document.getElementById('username-input');
const passwordField = document.getElementById('password-input');

// Admin access logic
const handleLogin = () => {
    const username = usernameField.value.trim();
    const password = passwordField.value.trim();
    
    if (username === 'admin' && password === 'admin123') {
        window.location.href = 'index.html'; 
    } else {
        alert('Wrong username or password! Please try again.');
       
        passwordField.value = '';
    }
};

// Login click event
loginButton.addEventListener('click', handleLogin);

// Keypress event for Enter key on password field
passwordField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleLogin();
    }
});

