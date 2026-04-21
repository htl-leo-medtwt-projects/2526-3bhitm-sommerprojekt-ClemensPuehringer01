function loginPage() {
    let loginOverlay =`
    <div id="loginOverlay">
        <div id="loginForm">
            <h2>Login</h2>
            <input type="text" id="username" placeholder="Username">
            <input type="password" id="password" placeholder="Password">
            <button id="submitLogin" onclick="submitLogin()">Login</button>
            <button id="closeLogin" onclick="closeLogin()">Schließen</button>
            <h2>Noch kein Account?</h2>
            <button id="goToRegister" onclick="registerPage()">Registrieren</button>
        </div>
    </div>
    `
    wrapper.insertAdjacentHTML('beforeend', loginOverlay);
}

function registerPage() {
    closeLogin();
    let registerOverlay =`
    <div id="registerOverlay">
        <div id="registerForm">
            <h2>Registrieren</h2>
            <input type="text" id="regUsername" placeholder="Username">
            <input type="password" id="regPassword" placeholder="Passwort">
            <input type="password" id="regPasswordAgain" placeholder="Passwort wiederholen">
            <button id="submitRegister" onclick="submitRegister()">Registrieren</button>
            <button id="closeRegister" onclick="closeRegister()">Schließen</button>
        </div>
    </div>
    `
    wrapper.insertAdjacentHTML('beforeend', registerOverlay);
}

function closeLogin() {
    let loginOverlay = document.getElementById("loginOverlay");
    if (loginOverlay) {
        loginOverlay.remove();
    }
}

function closeRegister() {
    let registerOverlay = document.getElementById("registerOverlay");
    if (registerOverlay) {
        registerOverlay.remove();
    }
}

async function submitLogin() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Bitte Username und Passwort eingeben.");
        return;
    }

    let result = await login(username, password);
    console.log(result);

    if (result.success) {
        userInfo.username = username;
        userInfo.loggedIn = true;
        userInfo.userID = result.userId;
        document.getElementById("loginBtn").innerHTML = "Logut";
        document.getElementById("loginBtn").onclick = submitLogout;
        closeLogin();
    } else {
        alert(result.message || "Login fehlgeschlagen");
    }
}

async function submitRegister() {
    let username = document.getElementById("regUsername").value.trim();
    let password = document.getElementById("regPassword").value;
    let passwordAgain = document.getElementById("regPasswordAgain").value;

    // Pflichtfelder prüfen
    if (!username || !password || !passwordAgain) {
        alert("Bitte alle Felder ausfüllen.");
        return;
    }

    // Passwortvergleich
    if (password !== passwordAgain) {
        alert("Die Passwörter stimmen nicht überein.");
        return;
    }

    // Mindestlänge
    if (password.length < 6) {
        alert("Das Passwort muss mindestens 6 Zeichen lang sein.");
        return;
    }

    try {
        let result = await register(username, password);

        if (result.success) {

            closeRegister();
            loginPage();
        } else {
            alert(result.message || "Registrierung fehlgeschlagen.");
        }

    } catch (error) {
        console.error("Registrierungsfehler:", error);
        alert("Serverfehler bei der Registrierung.");
    }
}

async function submitLogout() {
    try {
        let result = await logout();

        if (result.success) {
            userInfo.username = null;
            userInfo.loggedIn = false;
            userInfo.userID = null;

            let loginBtn = document.getElementById("loginBtn");
            loginBtn.innerHTML = "Login";
            loginBtn.onclick = loginPage;
            location.reload();
        }

    } catch (error) {
        console.error("Logout Fehler:", error);
        alert("Serverfehler beim Logout.");
    }
}
