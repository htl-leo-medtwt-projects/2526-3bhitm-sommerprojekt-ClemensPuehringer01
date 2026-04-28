let backcoverNumber;

function resetBook(coverNumber) {
    $(book).turn('destroy').html('');
    // Startcover Hinzufügen
    let covers = `
    <div class="hard"><div id="cover"><div id="header">Das Zauberbuch des Magiers</div><img src="./media/img/dnd_logo.png" alt=""></div></div>
    <div class="hard"></div>
    <div class="hard"></div>
    <div class="hard"><img src="./media/img/jungs/${coverNumber}.png" alt="" style="width: 100%;"></div>
    `
    book.innerHTML = covers;
    backcoverNumber = coverNumber;
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
    let endCover2 = '<div class="hard"><img src="./media/img/jungs/'+backcoverNumber+'.png" alt="" style="width: 100%;"></div>'

    // Endcover wieder hinzufügen, damit sie am Ende bleiben.
    $(book).turn('addPage', endCover1, backCoverIndex+1);
    $(book).turn('addPage', endCover2, backCoverIndex+2);
}
function addSinglePage(content){
    let totalPages = $(book).turn('pages') || $(book).children().length;
    if (!totalPages || totalPages < 1) {
        // noch kein Endcover / zu wenig Seiten -> normal hinzufügen
        $(book).turn('addPage', `<div>${content}</div>`);
        return;
    }

    // Endcover beibehalten und später wieder anfügen:
    let backCoverIndex = totalPages;
    let priorCoverIndex = totalPages - 1;

    // Vor dem Endcover einfügen, indem wir die aktuelle Endcover-Position verwenden.
    // Dies sollte in turn.js automatisch die Seite an die richtige Stelle schieben.
    $(book).turn('addPage', `<div>${content}</div>`, priorCoverIndex);

    let endCover1 = '<div class="hard"></div>'
    let endCover2 = '<div class="hard"><img src="./media/img/jungs/'+backcoverNumber+'.png" alt="" style="width: 100%;"></div>'

    // Endcover wieder hinzufügen, damit sie am Ende bleiben.
    $(book).turn('addPage', endCover1, backCoverIndex);
    $(book).turn('addPage', endCover2, backCoverIndex+1);
}

function goToPage(pageNumber) {
    $(book).turn('page', pageNumber);
}

function fillPages(){
    //Fügt so viele seiten hinzu das, dass buch am ende eine Gerade Seitenanzahl hat, damit die Endcover immer auf der richtigen Seite sind
    let totalPages = $(book).turn('pages') || $(book).children().length;
    if(totalPages % 2 !== 0){
        addSinglePage('');
    }
}
function goToGrad(stufe){
    //Berechnen wie 
}