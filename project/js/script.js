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

function backCoverRandomizer(){
    randomImg = Math.floor(Math.random() * 6)+1;
}

function loadSpellLevelTable(){
    return `
    <div class="spellLevel">
    <h2 id="gradHeader">Zaubergräder</h2>
            <div id="gradContainer"> 
            <div class="zauberGrad" onclick="goToGrad(0)">
            .................................................................................Zaubertrick
            </div>
            <div class="zauberGrad" onclick="goToGrad(1)">
            ......................................................................................Grad 1
            </div>
            <div class="zauberGrad" onclick="goToGrad(2)">
            ......................................................................................Grad 2
            </div>
            <div class="zauberGrad" onclick="goToGrad(3)">
            ......................................................................................Grad 3
            </div>
            <div class="zauberGrad" onclick="goToGrad(4)">
            ......................................................................................Grad 4
            </div>
            <div class="zauberGrad" onclick="goToGrad(5)">
            ......................................................................................Grad 5
            </div>
            <div class="zauberGrad" onclick="goToGrad(6)">
            ......................................................................................Grad 6
            </div>
            <div class="zauberGrad" onclick="goToGrad(7)">
            ......................................................................................Grad 7
            </div>
            <div class="zauberGrad" onclick="goToGrad(8)">
            ......................................................................................Grad 8
            </div>
            <div class="zauberGrad" onclick="goToGrad(9)">
            ......................................................................................Grad 9
            </div>
        </div>
    </div>
    `
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
showStartPage();
function showStartPage() {
    backCoverRandomizer();
    resetBook(randomImg);
    let content1 = '';
    if (userInfo.loggedIn) {
    content1 += `
        <div id="loginBtn" onclick="submitLogout()">Logout</div>
        <div id="newSpellBtn" onclick="openSpellAddOverlay()">New Spell</div>
    `;
    } else {
        content1 += `
            <div id="loginBtn" onclick="loginPage()">Login</div>
            <div id="newSpellBtn" class="disabled" onclick="openSpellAddOverlay()">New Spell</div>
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
    const { name, image, text } = classData[classId];
    
    let answer = await getSpellsByClass(classId);
    spellList = answer.data;
    backCoverRandomizer();
    resetBook(randomImg);
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

function drawSpellCards(){
        sortSpellListByLevel();

    for (let i = 0; i < spellList.length; i += 2*spellsPerPage) {
        let pageContent1 = `<div class="spellCardContainer">`;
        let pageContent2 = `<div class="spellCardContainer">`;
        for (let j = i; j < i + spellsPerPage && j < spellList.length; j++) {
            let spell = spellList[j];
            pageContent1 += writeSpellCard(spell, j);
        }
        //Falls keine 4 Zauber hinzu gefügt wurden, werden leere Karten hinzugefügt, damit die Seite immer voll ist
        for(let k = 0; k < spellsPerPage - (Math.min(spellsPerPage, spellList.length - i)); k++){
            pageContent1 += `<div class="emptyCard"></div>`;
        }
        pageContent1 += `</div>`;
        for (let j = i + spellsPerPage; j < i + 2*spellsPerPage && j < spellList.length; j++) {
            let spell = spellList[j];
            pageContent2 += writeSpellCard(spell, j);
        }
        pageContent2 += `</div>`;
        addPages(pageContent1, pageContent2);
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
        <option value="sofort">Sofort</option>
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

    if (zauberName === "") {
        errors.push("Zaubername fehlt");
    }

    if (schulenId === "") {
        errors.push("Schule fehlt");
    }

    if (stufe === "") {
        errors.push("Stufe fehlt");
    }

    if (beschreibung === "") {
        errors.push("Beschreibung fehlt");
    }

    if (regelbuchId === "") {
        errors.push("Regelbuch muss ausgewählt werden");
    }

    if (klassen.length === 0) {
        errors.push("Mindestens eine Klasse muss gewählt werden");
    }

    if (errors.length > 0) {
        showError(errors);
        return;
    }

    document.getElementById("errorBox").style.display = "none";

    // Reichweite
    var reichweiteTyp = document.getElementById("reichweiteTyp").value;
    var reichweiteWert = document.getElementById("reichweiteWert").value;

    var reichweite;

    if (reichweiteTyp === "custom") {
        reichweite = parseInt(reichweiteWert);
    } else {
        reichweite = parseInt(reichweiteTyp);
    }

    var data = {
        zauberName: zauberName,
        schulenId: parseInt(schulenId),
        stufe: parseInt(stufe),

        avgDmg: parseInt(document.getElementById("avgDmg").value),
        zeitaufwand: parseInt(document.getElementById("zeitaufwand").value),
        zeiteinheit: document.getElementById("zeiteinheit").value,

        reichweite: reichweite,

        verbalKomp: document.getElementById("verbalKomp").checked,
        gestKomp: document.getElementById("gestKomp").checked,
        materKomp: document.getElementById("materKomp").checked,
        materKompDet: document.getElementById("materKompDet").value,

        wirkungsdauer: parseInt(document.getElementById("wirkungsdauer").value),
        wirkungsdauerEinheit: document.getElementById("wirkungsdauerEinheit").value,

        beschreibung: beschreibung,

        regelbuchId: parseInt(regelbuchId),

        klassenIds: klassen
    };

    addSpell(data)
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