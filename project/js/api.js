async function getAllSpells() {
    const response = await fetch("./api/getSpells.php");
    return await response.json();
}

async function getSpellById(id) {
    const response = await fetch(`./api/getSpellById.php?id=${id}`);
    return await response.json();
}

async function addSpell(spell) {
    const response = await fetch("./api/addSpell.php", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(spell)
    });

    return await response.json();
}

async function register(username, password) {
    const response = await fetch("./api/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return await response.json();
}

async function login(username, password) {
    const response = await fetch("./api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    return await response.json();
}

async function logout() {
    const response = await fetch("./api/logout.php", {
        method: "POST",
        credentials: "include"
    });

    return await response.json();
}