let book = document.getElementsByClassName("flipbook")[0];
let wrapper = document.getElementById("outerWrapper");

//------------------Buch Funktionen------------------//
//---------------------------------------------------//
// Buch Hauptfunktionen Start
function resetBook() {
    $(book).turn('destroy').html('');
    // Startcover Hinzufügen
    let covers = `
    <div class="hard"><div id="cover"><div id="header">Das Zauberbuch des Magiers</div><img src="./media/img/dnd_logo.png" alt=""></div></div>
    <div class="hard"></div>
    <div class="hard"></div>
    <div class="hard"><img src="./media/jutsch.jpeg" alt="" style="width: 100%;"></div>
    `
    book.innerHTML = covers;
        // turn.js initialisieren
    $(book).turn();
}
function addPages(content1, content2) {
    let totalPages = $(book).turn('pages') || $(book).children().length;
    if (!totalPages || totalPages < 2) {
        // noch kein Endcover / zu wenig Seiten -> normal hinzufügen
        $(book).turn('addPage', `<div>${content1}</div>`);
        $(book).turn('addPage', `<div>${content2}</div>`);
        return;
    }

    // Endcover beibehalten und später wieder anfügen:
    let backCoverIndex = totalPages;
    let priorCoverIndex = totalPages - 1;

    // Vor dem Endcover einfügen, indem wir die aktuelle Endcover-Position verwenden.
    // Dies sollte in turn.js automatisch die Seite an die richtige Stelle schieben.
    $(book).turn('addPage', `<div>${content1}</div>`, priorCoverIndex);
    $(book).turn('addPage', `<div>${content2}</div>`, backCoverIndex);

    let endCover1 = '<div class="hard"></div>'
    let endCover2 = '<div class="hard"><img src="./media/jutsch.jpeg" alt="" style="width: 100%;"></div>'

    // Endcover wieder hinzufügen, damit sie am Ende bleiben.
    $(book).turn('addPage', endCover1, backCoverIndex+1);
    $(book).turn('addPage', endCover2, backCoverIndex+2);
}
// Buch Hauptfunktionen Ende


//------------------Startseite------------------//
//----------------------------------------------//
//Startseite
showStartPage();
function showStartPage() {
    resetBook();
    let content1 = `
    <div id="loginBtn" onclick="loginPage()">Login</div>
    <div id="startPage">
        <div id="searchBar">
            <h2 id="searchHeader">Was möchtest du lernen?</h2>
            <div id="searchContainer">
            <form id="searchform" onsubmit="event.preventDefault();" role="search">
            <label for="search">Search for stuff</label>
            <input id="search" type="search" placeholder="Search..." autofocus required />
            <button id="searchBtn" type="submit">Find</button>    
            </form>
            </div>
        </div>
        <div id="zauberSchulen">
            <h2 id="schulenHeader">Zauberschulen</h2>
            <div id="schulenContainer"> 
            <div class="zauberSchule" id="Bannmagie" onclick="showBannmagie()">
            <img src="./media/img/schulen/bannmagie.png" alt="">.................................................................................Bannmagie
            </div>
            <div class="zauberSchule" id="Beschwoerung" onclick="showBeschwoerung()">
            <img src="./media/img/schulen/beschwoerung.png" alt="">............................................................................Beschwörung
            </div>
            <div class="zauberSchule" id="Erkentnismagie" onclick="showErkenntnismagie()">
            <img src="./media/img/schulen/erkenntniss.png" alt="">.........................................................................Erkenntnismagie
            </div>
            <div class="zauberSchule" id="Hervorrufung" onclick="showHervorrufung()">
            <img src="./media/img/schulen/hervorrufung.png" alt="">...........................................................................Hervorrufung
            </div>
            <div class="zauberSchule" id="Illusionsmagie" onclick="showIllusionsmagie()">
            <img src="./media/img/schulen/illusion.png" alt="">.............................................................................Illusionsmagie
            </div>
            <div class="zauberSchule" id="Nekromantie" onclick="showNekromantie()">
            <img src="./media/img/schulen/nekromantie.png" alt="">.............................................................................Nekromantie
            </div>
            <div class="zauberSchule" id="Verwandlung" onclick="showVerwandlung()">
            <img src="./media/img/schulen/verwandlung.png" alt="">.............................................................................Verwandlung
            </div>
            <div class="zauberSchule" id="Verzauberung" onclick="showVerzauberung()">
            <img src="./media/img/schulen/verzauberung.png" alt="">...........................................................................Verzauberung
            </div>
            </div>
        </div>
        <div id="klassen">
            <div id="klassenContainer">
                <div class="klasse" id="Barde" onclick="showBarde()">
                <img src="./media/img/klassen/barde.jpeg" alt="">
                Barde
                </div>
                <div class="klasse" id="Druide" onclick="showDruide()">
                <img src="./media/img/klassen/druide.jpeg" alt="">
                Druide
                </div>
                <div class="klasse" id="Hexenmeister" onclick="showHexenmeister()">
                <img src="./media/img/klassen/hexenmeister.jpeg" alt="">
                Hexenmeister
                </div>
                <div class="klasse" id="Kleriker" onclick="showKleriker()">
                <img src="./media/img/klassen/kleriker.jpeg" alt="">
                Kleriker
                </div>
                <div class="klasse" id="Magier" onclick="showMagier()">
                <img src="./media/img/klassen/magier.jpeg" alt="">
                Magier
                </div>
                <div class="klasse" id="Paladin" onclick="showPaladin()">
                <img src="./media/img/klassen/paladin.jpeg" alt="">
                Paladin
                </div>
                <div class="klasse" id="Waldlaeufer" onclick="showWaldlaeufer()">
                <img src="./media/img/klassen/waldlaeufer.jpeg" alt="">
                Waldläufer
                </div>
                <div class="klasse" id="Zauberer" onclick="showZauberer()">
                <img src="./media/img/klassen/zauberer.jpeg" alt="">
                Zauberer
                </div>
            </div>
        </div>
    </div>`
    let content2 = `
    `
    addPages('', content1);
    addPages(content2, '');
}

//------------------Login Seite------------------//
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

function submitlogin(){

}