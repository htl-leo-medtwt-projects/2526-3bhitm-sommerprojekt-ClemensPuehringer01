let book = document.getElementsByClassName("flipbook")[0];
let wrapper = document.getElementById("outerWrapper");


let userInfo ={
    userID: null,
    username: null,
    loggedIn: false
}

const classData = {
    1: { name: "Barde",        image: "barde"        },
    2: { name: "Druide",       image: "druide"       },
    3: { name: "Hexenmeister", image: "hexenmeister" },
    4: { name: "Kleriker",     image: "kleriker"     },
    5: { name: "Magier",       image: "magier"       },
    6: { name: "Paladin",      image: "paladin"      },
    7: { name: "Waldläufer",   image: "waldlaeufer"  },
    8: { name: "Zauberer",     image: "zauberer"     },
};

let currentSpell = null;
let spellList = [];
let spellsPerPage = 4;

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
    const { name, image } = classData[classId];
    
    let answer = await getSpellsByClass(classId);
    spellList = answer.data;
    resetBook();
    let start1 = `
    <div id="classBigImg"><img src="./media/img/klassen/${image}_bild.png" alt=""></div>
    <div id="classDescription">
        <div id="classHeader">
            <img src="./media/img/klassen/${image}.jpeg" alt="">
            <h1>${name}</h1>
        </div>
        <div id="descriptionText">
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
        </div>
        </div>
        `
    return spellCard;
}