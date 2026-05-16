let book = document.getElementsByClassName("flipbook")[0];
let wrapper = document.getElementById("outerWrapper");
let randomImg;

let userInfo ={
    userID: null,
    username: null,
    loggedIn: false
}

const classData = {
    1: { name: "Barde",        image: "barde"        , text: bardeInfoTxt},
    2: { name: "Druide",       image: "druide"       , text: druideInfoTxt},
    3: { name: "Hexenmeister", image: "hexenmeister" , text: hexenmeisterInfoTxt},
    4: { name: "Kleriker",     image: "kleriker"     , text: klerikerInfoTxt},
    5: { name: "Magier",       image: "magier"       , text: magierInfoTxt},
    6: { name: "Paladin",      image: "paladin"      , text: paladinInfoTxt},
    7: { name: "Waldläufer",   image: "waldlaeufer"  , text: waldlauferInfoTxt},
    8: { name: "Zauberer",     image: "zauberer"     , text: zaubererInfoTxt},
};

let currentSpell = null;
let spellList = [];
let spellsPerPage = 4;

let currentView = null; 
let currentViewId = null;

function backCoverRandomizer(){
    randomImg = Math.floor(Math.random() * 6)+1;
}

function loadSpellLevelTable(){
    const grade = [
        { label: "Zaubertrick", stufe: 0 },
        { label: "Grad 1", stufe: 1 },
        { label: "Grad 2", stufe: 2 },
        { label: "Grad 3", stufe: 3 },
        { label: "Grad 4", stufe: 4 },
        { label: "Grad 5", stufe: 5 },
        { label: "Grad 6", stufe: 6 },
        { label: "Grad 7", stufe: 7 },
        { label: "Grad 8", stufe: 8 },
        { label: "Grad 9", stufe: 9 },
    ];

    let rows = grade.map(g => `
        <div class="zauberGrad" onclick="goToGrad(${g.stufe})">
            <span>${g.label}</span>
            <span class="gradArrow">&#8594;</span>
        </div>
    `).join('');

    return `
    <div class="spellLevel">
        <h2 id="gradHeader">Zaubergrade</h2>
        <div id="gradContainer">
            ${rows}
        </div>
    </div>
    `;
}

function sortSpellListByLevel() {
    spellList.sort((a, b) => {
        if (a.stufe === b.stufe) {
            return a.zauberName.localeCompare(b.zauberName); // a vor b = aufsteigend
        }
        return a.stufe - b.stufe; // a vor b = aufsteigend
    });
}

//------------------Startseite------------------//
//----------------------------------------------//
//Startseite
function backToStartPage() {
    document.getElementById("classHomeBtn").style.display = "none";
    currentView = null;
    currentViewId = null;
    currentClassId = null;
    showStartPage();
    goToPage(4);
}

showStartPage();
function showStartPage() {
    backCoverRandomizer();
    resetBook(randomImg);
    let content1 = '';
    if (userInfo.loggedIn) {
    content1 += `
        <div id="loginBtn" onclick="submitLogout()">Logout</div>
        <div id="newSpellBtn" onclick="openSpellAddOverlay()">+ Zauber</div>
    `;
    } else {
        content1 += `
            <div id="loginBtn" onclick="loginPage()">Login</div>
            <div id="newSpellBtn" class="disabled" onclick="openSpellAddOverlay()">+ Zauber</div>
        `;
    }

    content1 += `
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
            <div class="zauberSchule" id="Bannmagie" onclick="showSchoolDynamic(1)">
            <img src="./media/img/schulen/bannmagie.png" alt="">.................................................................................Bannmagie
            </div>
            <div class="zauberSchule" id="Beschwoerung" onclick="showSchoolDynamic(2)">
            <img src="./media/img/schulen/beschwoerung.png" alt="">............................................................................Beschwörung
            </div>
            <div class="zauberSchule" id="Erkentnismagie" onclick="showSchoolDynamic(3)">
            <img src="./media/img/schulen/erkenntniss.png" alt="">.........................................................................Erkenntnismagie
            </div>
            <div class="zauberSchule" id="Hervorrufung" onclick="showSchoolDynamic(4)">
            <img src="./media/img/schulen/hervorrufung.png" alt="">...........................................................................Hervorrufung
            </div>
            <div class="zauberSchule" id="Illusionsmagie" onclick="showSchoolDynamic(5)">
            <img src="./media/img/schulen/illusion.png" alt="">.............................................................................Illusionsmagie
            </div>
            <div class="zauberSchule" id="Nekromantie" onclick="showSchoolDynamic(6)">
            <img src="./media/img/schulen/nekromantie.png" alt="">.............................................................................Nekromantie
            </div>
            <div class="zauberSchule" id="Verwandlung" onclick="showSchoolDynamic(7)">
            <img src="./media/img/schulen/verwandlung.png" alt="">.............................................................................Verwandlung
            </div>
            <div class="zauberSchule" id="Verzauberung" onclick="showSchoolDynamic(8)">
            <img src="./media/img/schulen/verzauberung.png" alt="">...........................................................................Verzauberung
            </div>
            </div>
        </div>
        <div id="klassen">
            <div id="klassenContainer">
                <div class="klasse" id="Barde" onclick="showClassDynamic(1)">
                <img src="./media/img/klassen/barde.jpeg" alt="">
                Barde
                </div>
                <div class="klasse" id="Druide" onclick="showClassDynamic(2)">
                <img src="./media/img/klassen/druide.jpeg" alt="">
                Druide
                </div>
                <div class="klasse" id="Hexenmeister" onclick="showClassDynamic(3)">
                <img src="./media/img/klassen/hexenmeister.jpeg" alt="">
                Hexenmeister
                </div>
                <div class="klasse" id="Kleriker" onclick="showClassDynamic(4)">
                <img src="./media/img/klassen/kleriker.jpeg" alt="">
                Kleriker
                </div>
                <div class="klasse" id="Magier" onclick="showClassDynamic(5)">
                <img src="./media/img/klassen/magier.jpeg" alt="">
                Magier
                </div>
                <div class="klasse" id="Paladin" onclick="showClassDynamic(6)">
                <img src="./media/img/klassen/paladin.jpeg" alt="">
                Paladin
                </div>
                <div class="klasse" id="Waldlaeufer" onclick="showClassDynamic(7)">
                <img src="./media/img/klassen/waldlaeufer.jpeg" alt="">
                Waldläufer
                </div>
                <div class="klasse" id="Zauberer" onclick="showClassDynamic(8)">
                <img src="./media/img/klassen/zauberer.jpeg" alt="">
                Zauberer
                </div>
            </div>
        </div>
    </div>`
    let content2 = `
    <div id="vorWort">
        <div id="vorWortHeader">Vorwort</div>
        <div id="vorWortGrid">
    <p class="vorWortText">
        Sehr geehrte*r Magiekundige*r,  
        nun da dieses Buch in deinen Besitz übergegangen ist – ein Werk, das bereits zahlreiche Zauberwirkende durch die Vergessenen Reiche und weit darüber hinaus begleitet hat – ist es mir ein Anliegen, dir seine Nutzung näherzubringen.
    </p>

    <p class="vorWortText">
        Dieses Werk ist mehr als nur ein gewöhnliches Buch. Es ist ein Zauberbuch, gefüllt mit mächtigen und vielseitigen Zaubern, die darauf warten, von dir entdeckt und gemeistert zu werden. Darüber hinaus findest du hier Wissen über die verschiedenen Zauberschulen sowie die Klassen, die sich der arkanen Kunst bedienen.
    </p>

    <p class="vorWortText">
        Du kannst die enthaltenen Zauber nach Schulen oder Klassen ordnen, oder mithilfe der Suchfunktion gezielt nach bestimmten Formeln suchen. Hast du einen Zauber gefunden, der dein Interesse weckt, genügt ein Klick, um weitere Details über seine Wirkung und Anwendung zu erfahren.
    </p>

    <p class="vorWortText">
        Möge dieses Buch dir auf deinem Weg ein treuer Begleiter sein. Möge dein Verständnis der Magie wachsen und dein Können dich durch viele Abenteuer führen.
    </p>

    <p class="vorWortText">
        Mit magischen Grüßen,<br>
        Der Erschaffer dieses Buches
    </p>
</div>
    </div>
    `
    addPages('', content1);
    addPages(content2, '');
}

//------------------Klassenfunktionen------------------//
async function showClassDynamic(classId) {
    currentView = "class";
    currentViewId = classId;

    const { name, image, text } = classData[classId];
    
    let answer = await getSpellsByClass(classId);
    spellList = answer.data;
    backCoverRandomizer();
    resetBook(randomImg);

    currentClassId = classId;
    document.getElementById("classHomeBtn").style.display = "block";

    let start1 = `
    <div id="classBigImg"><img src="./media/img/klassen/${image}_bild.png" alt=""></div>
    <div id="classDescription">
        <div id="classHeader">
            <img src="./media/img/klassen/${image}.jpeg" alt="">
            <h1>${name}</h1>
        </div>
        <div id="classDescriptionText">
        <p>${text}</p>
        </div>
    </div>
    `;
    let start2 = loadSpellLevelTable();
    addPages('', start1);
    addSinglePage(start2);

    drawSpellCards();
    fillPages();
    goToPage(4);
}

// Seite 3 ist die Klassenbeschreibung (erste rechte Seite nach den Hardcovern)
function goToClassHome() {
    if (currentView === "class") {
        showClassDynamic(currentViewId);
    } else if (currentView === "school") {
        showSchoolDynamic(currentViewId);
    }
    goToPage(4);
}

function drawSpellCards() {
    sortSpellListByLevel();
    gradPageMap = {}; // zurücksetzen

    // Zauber nach Stufe gruppieren
    let groups = {};
    for (let spell of spellList) {
        if (!groups[spell.stufe]) groups[spell.stufe] = [];
        groups[spell.stufe].push(spell);
    }

    let sortedLevels = Object.keys(groups).map(Number).sort((a, b) => a - b);

    for (let stufe of sortedLevels) {
        let spells = groups[stufe];

        // Aktuelle Seitenzahl VOR dem Hinzufügen dieser Gruppe merken
        // +1 weil addPages die nächste freie Seite belegt
        // Die Endcover (2 Seiten) abziehen, dann ist das die erste neue Seite
        let currentPages = $(book).turn('pages') || $(book).children().length;
        gradPageMap[stufe] = currentPages - 1; // -1 weil vor den Endcovern eingefügt wird

        // Seiten paarweise befüllen
        for (let i = 0; i < spells.length; i += 2 * spellsPerPage) {
            let pageContent1 = `<div class="spellCardContainer">`;
            let pageContent2 = `<div class="spellCardContainer">`;

            for (let j = i; j < i + spellsPerPage && j < spells.length; j++) {
                pageContent1 += writeSpellCard(spells[j], spellList.indexOf(spells[j]));
            }
            // Leere Karten auffüllen
            let filled1 = Math.min(spellsPerPage, spells.length - i);
            for (let k = 0; k < spellsPerPage - filled1; k++) {
                pageContent1 += `<div class="emptyCard"></div>`;
            }
            pageContent1 += `</div>`;

            for (let j = i + spellsPerPage; j < i + 2 * spellsPerPage && j < spells.length; j++) {
                pageContent2 += writeSpellCard(spells[j], spellList.indexOf(spells[j]));
            }
            // Leere Karten auffüllen (rechte Seite)
            let filled2 = Math.max(0, Math.min(spellsPerPage, spells.length - (i + spellsPerPage)));
            for (let k = 0; k < spellsPerPage - filled2; k++) {
                pageContent2 += `<div class="emptyCard"></div>`;
            }
            pageContent2 += `</div>`;

            addPages(pageContent1, pageContent2);
        }

        // Wenn die Gruppe eine ungerade Anzahl an Seiten belegt hat,
        // eine Leerseite einfügen damit der nächste Grad auf einer rechten Seite beginnt
        let pagesAfter = $(book).turn('pages') || $(book).children().length;
        let addedPages = pagesAfter - currentPages;
        if (addedPages % 2 !== 0) {
            addSinglePage('');
        }
    }
}
//------------------Schulenfunktionen------------------//
async function showSchoolDynamic(schulenId) {
    currentView = "school";
    currentViewId = schulenId;

    let schulenNamen = [];
    schulenNamen[1] = "Bannmagie";
    schulenNamen[2] = "Beschwörung";
    schulenNamen[3] = "Erkenntnismagie";
    schulenNamen[4] = "Verzauberung";
    schulenNamen[5] = "Hervorrufung";
    schulenNamen[6] = "Illusionsmagie";
    schulenNamen[7] = "Nekromantie";
    schulenNamen[8] = "Verwandlung";

    let schulenBilder = [];
    schulenBilder[1] = "bannmagie.png";
    schulenBilder[2] = "beschwoerung.png";
    schulenBilder[3] = "erkenntniss.png";
    schulenBilder[4] = "verzauberung.png";
    schulenBilder[5] = "hervorrufung.png";
    schulenBilder[6] = "illusion.png";
    schulenBilder[7] = "nekromantie.png";
    schulenBilder[8] = "verwandlung.png";

    let name = schulenNamen[schulenId];
    let bild = schulenBilder[schulenId];

    let answer = await getSpellsBySchool(schulenId);
    spellList = answer.data;
    backCoverRandomizer();
    resetBook(randomImg);

    document.getElementById("classHomeBtn").style.display = "block";

    let headerHtml = "<div id='classDescription'>";
    headerHtml += "<div id='classHeader'>";
    headerHtml += "<img src='./media/img/schulen/" + bild + "' alt=''>";
    headerHtml += "<h1>" + name + "</h1>";
    headerHtml += "</div></div>";

    let levelTable = loadSpellLevelTable();

    addPages("", headerHtml);
    addSinglePage(levelTable);
    drawSpellCards();
    fillPages();
    goToPage(4);
}

function goToGrad(stufe) {
    let page = gradPageMap[stufe];
    if (page !== undefined) {
        goToPage(page);
    }
}

function writeSpellCard(spell, index){
    let verified = false;
    if(spell.userId==1){
        verified = true;
    }
    let selfMade= false;
    if((spell.userId==userInfo.userID) && userInfo.loggedIn){
        selfMade = true;
    }
    let zauberGrad;
    if (spell.stufe === 0){
        zauberGrad = "Zaubertrick";
    }else{
        zauberGrad = `Grad ${spell.stufe}`;
    }
    let schulenBild
    switch (spell.schulenName) {
        case "Bannmagie":
            schulenBild = "bannmagie.png";
            break;
        case "Beschwörung":
            schulenBild = "beschwoerung.png";
            break;
        case "Erkenntnismagie":
            schulenBild = "erkenntniss.png";
            break;
        case "Hervorrufung":
            schulenBild = "hervorrufung.png";
            break;
        case "Illusionsmagie":
            schulenBild = "illusion.png";
            break;
        case "Nekromantie":
            schulenBild = "nekromantie.png";
            break;
        case "Verwandlung":
            schulenBild = "verwandlung.png";
            break;
        case "Verzauberung":
            schulenBild = "verzauberung.png";
            break;
    }
    let spellCard = `
    <div class="spellCard" onclick="showSpellDetails(${index})">
        <div class="spellCardImg">
        <img class="spellCardImage" src="./media/img/schulen/${schulenBild}" alt="">
        </div>
        <div class="spellCardText">
                <h3>${spell.zauberName}</h3>
                <p>${zauberGrad}</p>
                <p>Schule der ${spell.schulenName}</p>
        </div>
        <div class="spellCardLables">
        ${verified ? '<span class="spellLable">Verifiziert</span>' : ''}
        ${selfMade ? '<span class="spellLable">Eigenkreation</span>' : ''} 
        <span class="spellLable">${spell.regelbuchName}</span> 
        </div>
        </div>
        `
    return spellCard;
}

function openSpellAddOverlay(){
    let formHtml = `
<div id="zauberOverlay">
<form id="zauberForm" onsubmit="return false;">
<div id="errorBox" style="display:none;"></div>

    <input type="text" id="zauberName" placeholder="Zaubername">

    <select id="schulenId">
        <option value="">Schule</option>
        <option value="1">Bannmagie</option>
        <option value="2">Beschwörung</option>
        <option value="3">Erkenntnis</option>
        <option value="4">Verzauberung</option>
        <option value="5">Hervorrufung</option>
        <option value="6">Illusion</option>
        <option value="7">Nekromantie</option>
        <option value="8">Verwandlung</option>
    </select>

    <select id="stufe">
        <option value="">Stufe</option>
        <option value="0">Zaubertrick</option>
        <option value="1">Grad 1</option>
        <option value="2">Grad 2</option>
        <option value="3">Grad 3</option>
        <option value="4">Grad 4</option>
        <option value="5">Grad 5</option>
        <option value="6">Grad 6</option>
        <option value="7">Grad 7</option>
        <option value="8">Grad 8</option>
        <option value="9">Grad 9</option>
    </select>

    <input type="number" id="avgDmg" placeholder="Ø Schaden">
    <input type="number" id="zeitaufwand" placeholder="Zeitaufwand">

    <select id="zeiteinheit">
        <option value="">Zeiteinheit</option>
        <option value="aktion">Aktion</option>
        <option value="bonusaktion">Bonusaktion</option>
        <option value="reaktion">Reaktion</option>
        <option value="runde">Runde</option>
        <option value="minute">Minute</option>
        <option value="stunde">Stunde</option>
    </select>

    <div id="reichweiteContainer">
        <select id="reichweiteTyp">
            <option value="">Reichweite</option>
            <option value="-1">Selbst</option>
            <option value="0">Berührung</option>
            <option value="custom">Distanz</option>
        </select>
        <input type="number" id="reichweiteWert" placeholder="Meter" disabled>
    </div>

    <div class="checkboxGroup">
        <label><input type="checkbox" id="verbalKomp"> Verbal</label>
        <label><input type="checkbox" id="gestKomp"> Gestik</label>
        <label><input type="checkbox" id="materKomp"> Material</label>
    </div>

    <input type="text" id="materKompDet" placeholder="Material Details">

    <input type="number" id="wirkungsdauer" placeholder="Dauer">

    <select id="wirkungsdauerEinheit">
        <option value="">Dauer</option>
        <option value="unmittelbar">Unmittelbar</option>
        <option value="runde">Runde(n)</option>
        <option value="minute">Minute(n)</option>
        <option value="stunde">Stunde(n)</option>
        <option value="tag">Tag(e)</option>
        <option value="permanent">Permanent</option>
    </select>

    <textarea id="beschreibung" placeholder="Beschreibung"></textarea>

    <select id="regelbuchId">
        <option value="">Regelwerk</option>
        <option value="1">5.5E</option>
        <option value="2">5E</option>
        <option value="3">4E</option>
        <option value="4">3.5E</option>
        <option value="5">2E</option>
        <option value="6">1E</option>
        <option value="7">Homebrew</option>
    </select>

    <div id="klassenSelect">
        <label><input type="checkbox" class="klasse" value="1"> Barde</label>
        <label><input type="checkbox" class="klasse" value="2"> Druide</label>
        <label><input type="checkbox" class="klasse" value="3"> Hexenmeister</label>
        <label><input type="checkbox" class="klasse" value="4"> Kleriker</label>
        <label><input type="checkbox" class="klasse" value="5"> Magier</label>
        <label><input type="checkbox" class="klasse" value="6"> Paladin</label>
        <label><input type="checkbox" class="klasse" value="7"> Waldläufer</label>
        <label><input type="checkbox" class="klasse" value="8"> Zauberer</label>
    </div>

    <button type="button" onclick="sendZauber()">Speichern</button>
    <button type="button" onclick="closeZauberOverlay()">Abbrechen</button>

</form>
</div>
`;
    wrapper.insertAdjacentHTML('beforeend', formHtml);
    initZauberForm();
}

function sendZauber() {

    var errors = [];

    var zauberName = document.getElementById("zauberName").value;
    var schulenId = document.getElementById("schulenId").value;
    var stufe = document.getElementById("stufe").value;
    var beschreibung = document.getElementById("beschreibung").value;
    var regelbuchId = document.getElementById("regelbuchId").value;

    // Klassen prüfen
    var klassen = [];
    var checkboxes = document.querySelectorAll(".klasse");
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            klassen.push(parseInt(checkboxes[i].value));
        }
    }

    // --- Pflichtfeld-Validierung ---
    if (zauberName === "") {
        errors.push("Zaubername fehlt");
    }
    if (schulenId === "") {
        errors.push("Schule fehlt");
    }
    if (stufe === "") {
        errors.push("Stufe fehlt");
    }
    if (beschreibung === ""){
     errors.push("Beschreibung fehlt");
    }
    if (regelbuchId === "") {
        errors.push("Regelbuch muss ausgewählt werden");
    }
    if (klassen.length === 0) {
        errors.push("Mindestens eine Klasse muss gewählt werden");
    }

    // zeitaufwand & zeiteinheit
    var zeitaufwandRaw = document.getElementById("zeitaufwand").value;
    var zeiteinheit = document.getElementById("zeiteinheit").value;
    if (zeitaufwandRaw === "" || isNaN(zeitaufwandRaw)) {
        errors.push("Zeitaufwand fehlt");
    }
    if (zeiteinheit === "") {
        errors.push("Zeiteinheit fehlt");
    }

    // wirkungsdauerEinheit
    var wirkungsdauerEinheit = document.getElementById("wirkungsdauerEinheit").value;
    if (wirkungsdauerEinheit === "") {
        errors.push("Wirkungsdauer-Einheit fehlt");
    }

    if (errors.length > 0) {
        showError(errors);
        return;
    }

    document.getElementById("errorBox").style.display = "none";

    // --- Reichweite ableiten ---
    var reichweiteTyp = document.getElementById("reichweiteTyp").value;
    var reichweiteWert = document.getElementById("reichweiteWert").value;
    var reichweite;
    if (reichweiteTyp === "custom") {
        reichweite = parseInt(reichweiteWert) || 0;
    } else {
        reichweite = parseInt(reichweiteTyp) || 0; // z.B. "0" für Berührung
    }

    // --- Zeitaufwand: 0 als Fallback wenn leer ---
    var zeitaufwand = parseInt(zeitaufwandRaw);
    if (isNaN(zeitaufwand)) zeitaufwand = 0;

    // --- Wirkungsdauer: 0 als Fallback wenn leer ---
    var wirkungsdauer = parseInt(document.getElementById("wirkungsdauer").value);
    if (isNaN(wirkungsdauer)) wirkungsdauer = 0;

    // --- avgDmg: null wenn leer (Spalte erlaubt NULL) ---
    var avgDmgRaw = document.getElementById("avgDmg").value;
    var avgDmg = avgDmgRaw !== "" ? parseInt(avgDmgRaw) : null;

    var data = {
        zauberName: zauberName,
        schulenId: parseInt(schulenId),
        stufe: parseInt(stufe),

        avgDmg: avgDmg,
        zeitaufwand: zeitaufwand,
        zeiteinheit: zeiteinheit,

        reichweite: reichweite,

        verbalKomp: document.getElementById("verbalKomp").checked,
        gestKomp: document.getElementById("gestKomp").checked,
        materKomp: document.getElementById("materKomp").checked,
        materKompDet: document.getElementById("materKompDet").value || null,

        wirkungsdauer: wirkungsdauer,
        wirkungsdauerEinheit: wirkungsdauerEinheit,

        beschreibung: beschreibung,

        regelbuchId: parseInt(regelbuchId),

        klassenIds: klassen
    };

    addSpell(data);
    closeZauberOverlay();
}

function initZauberForm() {

    var typ = document.getElementById("reichweiteTyp");
    var wert = document.getElementById("reichweiteWert");

    typ.addEventListener("change", function () {
        if (typ.value === "custom") {
            wert.disabled = false;
        } else {
            wert.disabled = true;
            wert.value = "";
        }
    });
}

function showError(messages) {

    var box = document.getElementById("errorBox");

    var text = "";

    for (var i = 0; i < messages.length; i++) {
        text += messages[i] + "<br>";
    }

    text += '<br><button onclick="closeError()">OK</button>';

    box.innerHTML = text;
    box.style.display = "block";
}

function closeError() {
    document.getElementById("errorBox").style.display = "none";
}
function closeZauberOverlay(){
    let overlay = document.getElementById("zauberOverlay");
    if(overlay){
        overlay.remove();
    }
}
function showSpellDetails(index) {
    let spell = spellList[index];
    if (!spell) {
        return;
    }

    // Schulenbild ermitteln
    let schulenBild = "";
    if (spell.schulenName === "Bannmagie") {
        schulenBild = "bannmagie.png";
    } else if (spell.schulenName === "Beschwörung") {
        schulenBild = "beschwoerung.png";
    } else if (spell.schulenName === "Erkenntnismagie") {
        schulenBild = "erkenntniss.png";
    } else if (spell.schulenName === "Hervorrufung") {
        schulenBild = "hervorrufung.png";
    } else if (spell.schulenName === "Illusionsmagie") {
        schulenBild = "illusion.png";
    } else if (spell.schulenName === "Nekromantie") {
        schulenBild = "nekromantie.png";
    } else if (spell.schulenName === "Verwandlung") {
        schulenBild = "verwandlung.png";
    } else if (spell.schulenName === "Verzauberung") {
        schulenBild = "verzauberung.png";
    }

    // Schul-ID ermitteln
    let schulenId = 0;
    if (spell.schulenName === "Bannmagie") {
        schulenId = 1;
    } else if (spell.schulenName === "Beschwörung") {
        schulenId = 2;
    } else if (spell.schulenName === "Erkenntnismagie") {
        schulenId = 3;
    } else if (spell.schulenName === "Verzauberung") {
        schulenId = 4;
    } else if (spell.schulenName === "Hervorrufung") {
        schulenId = 5;
    } else if (spell.schulenName === "Illusionsmagie") {
        schulenId = 6;
    } else if (spell.schulenName === "Nekromantie") {
        schulenId = 7;
    } else if (spell.schulenName === "Verwandlung") {
        schulenId = 8;
    }

    // Klassennamen ermitteln
    let klassenNamen = [];
    if (Array.isArray(spell.klassen) && spell.klassen.length > 0) {
        klassenNamen = spell.klassen;
    } else if (typeof spell.klassen === "string" && spell.klassen !== "") {
        klassenNamen = spell.klassen.split(", ");
    }

    let klassenIds = [];
    if (Array.isArray(spell.klassenIds)) {
        klassenIds = spell.klassenIds;
    }

    // Klassen-Bilddaten
    let klassenBildMap = [];
    klassenBildMap["Barde"]        = "barde.jpeg";
    klassenBildMap["Druide"]       = "druide.jpeg";
    klassenBildMap["Hexenmeister"] = "hexenmeister.jpeg";
    klassenBildMap["Kleriker"]     = "kleriker.jpeg";
    klassenBildMap["Magier"]       = "magier.jpeg";
    klassenBildMap["Paladin"]      = "paladin.jpeg";
    klassenBildMap["Waldläufer"]   = "waldlaeufer.jpeg";
    klassenBildMap["Zauberer"]     = "zauberer.jpeg";

    let klassenIdMap = [];
    klassenIdMap["Barde"]        = 1;
    klassenIdMap["Druide"]       = 2;
    klassenIdMap["Hexenmeister"] = 3;
    klassenIdMap["Kleriker"]     = 4;
    klassenIdMap["Magier"]       = 5;
    klassenIdMap["Paladin"]      = 6;
    klassenIdMap["Waldläufer"]   = 7;
    klassenIdMap["Zauberer"]     = 8;

    // Grad-Bezeichnung
    let gradText = "";
    if (spell.stufe === 0) {
        gradText = "Zaubertrick, Schule der " + spell.schulenName;
    } else {
        gradText = spell.schulenName + " des " + spell.stufe + ". Grades";
    }

    // Reichweite
    let reichweiteText = "";
    if (spell.reichweite === -1) {
        reichweiteText = "Selbst";
    } else if (spell.reichweite === 0) {
        reichweiteText = "Berührung";
    } else {
        reichweiteText = spell.reichweite + " m";
    }

    // Komponenten
    let komps = [];
    if (spell.verbalKomp) {
        komps.push("V");
    }
    if (spell.gestKomp) {
        komps.push("G");
    }
    if (spell.materKomp) {
        if (spell.materKompDet) {
            komps.push("M (" + spell.materKompDet + ")");
        } else {
            komps.push("M");
        }
    }

    let kompText = "";
    if (komps.length === 0) {
        kompText = "–";
    } else {
        for (let i = 0; i < komps.length; i++) {
            if (i > 0) {
                kompText += ", ";
            }
            kompText += komps[i];
        }
    }

    // Zeitaufwand
    let zeitText = spell.zeitaufwand + " " + spell.zeiteinheit;
    if (spell.zeiteinheit === "aktion") {
        zeitText = spell.zeitaufwand + " Aktion";
    }
    if (spell.zeiteinheit === "bonusaktion") {
        zeitText = spell.zeitaufwand + " Bonusaktion";
    }
    if (spell.zeiteinheit === "reaktion") {
        zeitText = "Reaktion";
    }
    if (spell.zeiteinheit === "runde") {
        zeitText = spell.zeitaufwand + " Runde(n)";
    }
    if (spell.zeiteinheit === "minute") {
        zeitText = spell.zeitaufwand + " Minute(n)";
    }
    if (spell.zeiteinheit === "stunde") {
        zeitText = spell.zeitaufwand + " Stunde(n)";
    }

    // Wirkungsdauer
    let dauerText = "";
    if (spell.wirkungsdauerEinheit === "unmittelbar") {
        dauerText = "Unmittelbar";
    } else if (spell.wirkungsdauerEinheit === "permanent") {
        dauerText = "Permanent";
    } else if (spell.wirkungsdauerEinheit === "runde") {
        dauerText = spell.wirkungsdauer + " Runde(n)";
    } else if (spell.wirkungsdauerEinheit === "minute") {
        dauerText = spell.wirkungsdauer + " Minute(n)";
    } else if (spell.wirkungsdauerEinheit === "stunde") {
        dauerText = spell.wirkungsdauer + " Stunde(n)";
    } else if (spell.wirkungsdauerEinheit === "tag") {
        dauerText = spell.wirkungsdauer + " Tag(e)";
    } else {
        dauerText = spell.wirkungsdauer + " " + spell.wirkungsdauerEinheit;
    }

    // Overlay erstellen
    let overlay = document.createElement("div");
    overlay.id = "spellDetailOverlay";
    overlay.onclick = function(event) {
        if (event.target === overlay) {
            closeSpellDetail();
        }
    };

    let card = document.createElement("div");
    card.id = "spellDetailCard";

    // Schließen-Button
    let closeBtn = document.createElement("button");
    closeBtn.id = "closeSpellDetailBtn";
    closeBtn.innerHTML = "✕";
    closeBtn.onclick = closeSpellDetail;
    card.appendChild(closeBtn);

    // Schulen-Bild
    if (schulenBild !== "") {
        let schoolImg = document.createElement("img");
        schoolImg.id = "spellDetailSchoolImg";
        schoolImg.src = "./media/img/schulen/" + schulenBild;
        schoolImg.alt = spell.schulenName;
        card.appendChild(schoolImg);
    }

    // Name
    let nameEl = document.createElement("h2");
    nameEl.id = "spellDetailName";
    nameEl.innerHTML = spell.zauberName;
    card.appendChild(nameEl);

    // Untertitel
    let subtitle = document.createElement("div");
    subtitle.id = "spellDetailSubtitle";
    subtitle.innerHTML = gradText;
    card.appendChild(subtitle);

    // Trennlinie
    let hr1 = document.createElement("hr");
    hr1.className = "spellDetailDivider";
    card.appendChild(hr1);

    // Felder aufbauen
    let felder = [];
    felder.push({ label: "Zeitaufwand",   wert: zeitText });
    felder.push({ label: "Reichweite",    wert: reichweiteText });
    felder.push({ label: "Komponenten",   wert: kompText });
    felder.push({ label: "Wirkungsdauer", wert: dauerText });

    if (spell.avgDmg !== null && spell.avgDmg !== undefined) {
        felder.push({ label: "Ø Schaden", wert: spell.avgDmg });
    }

    for (let i = 0; i < felder.length; i++) {
        let row = document.createElement("div");
        row.className = "spellDetailRow";
        row.innerHTML = "<strong>" + felder[i].label + ":</strong> " + felder[i].wert;
        card.appendChild(row);
    }

    // Trennlinie
    let hr2 = document.createElement("hr");
    hr2.className = "spellDetailDivider";
    card.appendChild(hr2);

    // Beschreibung
    let desc = document.createElement("div");
    desc.id = "spellDetailDescription";
    desc.innerHTML = spell.beschreibung;
    card.appendChild(desc);

    // Tags
    let tagsDiv = document.createElement("div");
    tagsDiv.id = "spellDetailTags";

    let verified = spell.userId == 1;
    let selfMade = userInfo.loggedIn && spell.userId == userInfo.userID;

    if (verified) {
        let tagV = document.createElement("span");
        tagV.className = "spellDetailTag verified";
        tagV.innerHTML = "✓ Verifiziert";
        tagsDiv.appendChild(tagV);
    }
    if (selfMade) {
        let tagS = document.createElement("span");
        tagS.className = "spellDetailTag";
        tagS.innerHTML = "Eigenkreation";
        tagsDiv.appendChild(tagS);
    }
    if (spell.regelbuchName) {
        let tagR = document.createElement("span");
        tagR.className = "spellDetailTag";
        tagR.innerHTML = spell.regelbuchName;
        tagsDiv.appendChild(tagR);
    }
    card.appendChild(tagsDiv);

    // Navigations-Bereich
    let navSection = document.createElement("div");
    navSection.id = "spellDetailNavSection";

    // Schul-Button
    let schulLabel = document.createElement("div");
    schulLabel.className = "spellDetailNavLabel";
    schulLabel.innerHTML = "Zur Zauberschule";
    navSection.appendChild(schulLabel);

    let schulBtn = document.createElement("button");
    schulBtn.id = "spellDetailSchulBtn";

    if (schulenBild !== "") {
        let schulImg = document.createElement("img");
        schulImg.src = "./media/img/schulen/" + schulenBild;
        schulImg.alt = spell.schulenName;
        schulBtn.appendChild(schulImg);
    }

    let schulName = document.createElement("span");
    schulName.innerHTML = "Schule der " + spell.schulenName;
    schulBtn.appendChild(schulName);

    (function(sid) {
        schulBtn.onclick = function() {
            closeSpellDetail();
            showSchoolDynamic(sid);
        };
    })(schulenId);

    navSection.appendChild(schulBtn);

    // Klassen-Buttons
    if (klassenNamen.length > 0) {
        let klassenLabel = document.createElement("div");
        klassenLabel.className = "spellDetailNavLabel";
        klassenLabel.innerHTML = "Zu den Klassen";
        navSection.appendChild(klassenLabel);

        let klassenBtnsDiv = document.createElement("div");
        klassenBtnsDiv.id = "spellDetailKlassenBtns";

        for (let k = 0; k < klassenNamen.length; k++) {
            let kName = klassenNamen[k];
            let kId = klassenIdMap[kName];
            let kBild = klassenBildMap[kName];

            let kBtn = document.createElement("button");
            kBtn.className = "spellDetailKlasseBtn";

            if (kBild) {
                let kImg = document.createElement("img");
                kImg.src = "./media/img/klassen/" + kBild;
                kImg.alt = kName;
                kBtn.appendChild(kImg);
            }

            let kSpan = document.createElement("span");
            kSpan.innerHTML = kName;
            kBtn.appendChild(kSpan);

            (function(id) {
                kBtn.onclick = function() {
                    closeSpellDetail();
                    showClassDynamic(id);
                };
            })(kId);

            klassenBtnsDiv.appendChild(kBtn);
        }

        navSection.appendChild(klassenBtnsDiv);
    }

    card.appendChild(navSection);
    overlay.appendChild(card);
    wrapper.appendChild(overlay);
}

function closeSpellDetail() {
    let overlay = document.getElementById("spellDetailOverlay");
    if (overlay) {
        overlay.remove();
    }
}