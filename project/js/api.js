async function getAllSpells() {
    const response = await fetch("/api/getSpells.php");
    return await response.json();
}

async function getSpellById(id) {
    const response = await fetch(`/api/getSpellById.php?id=${id}`);
    return await response.json();
}

async function addSpell(spell) {
    const response = await fetch("/api/addSpell.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spell)
    });

    return await response.json();
}