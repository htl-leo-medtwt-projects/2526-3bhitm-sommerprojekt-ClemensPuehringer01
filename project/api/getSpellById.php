<?php
require_once "db.php";

header('Content-Type: application/json');

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Ungültige ID"
    ]);
    exit;
}

$sql = "
SELECT 
    z.zauberId,
    z.zauberName,
    z.schulenId,
    s.schulenName,
    z.stufe,
    z.avgDmg,
    z.zeitaufwand,
    z.zeiteinheit,
    z.reichweite,
    z.verbalKomp,
    z.gestKomp,
    z.materKomp,
    z.materKompDet,
    z.wirkungsdauer,
    z.wirkungsdauerEinheit,
    z.beschreibung,
    z.userId,
    z.regelbuchId,
    r.regelbuchName,

    GROUP_CONCAT(k.klassenName SEPARATOR ', ') AS klassen,
    GROUP_CONCAT(k.klassenId) AS klassenIds

FROM zauber z
JOIN schule s ON z.schulenId = s.schulenId
LEFT JOIN regelbuch r ON z.regelbuchId = r.regelbuchId
LEFT JOIN zauber_klasse zk ON z.zauberId = zk.zauberId
LEFT JOIN klasse k ON zk.klassenId = k.klassenId

WHERE z.zauberId = ?
GROUP BY z.zauberId
LIMIT 1
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

if (!$row) {
    http_response_code(404);
    echo json_encode([
        "success" => false,
        "message" => "Zauber nicht gefunden"
    ]);
    exit;
}

// Booleans
$row["verbalKomp"] = (bool)$row["verbalKomp"];
$row["gestKomp"] = (bool)$row["gestKomp"];
$row["materKomp"] = (bool)$row["materKomp"];

// KlassenIds als Array
if (!empty($row["klassenIds"])) {
    $row["klassenIds"] = array_map("intval", explode(",", $row["klassenIds"]));
} else {
    $row["klassenIds"] = [];
}

// Klassen als Array statt String
if (!empty($row["klassen"])) {
    $row["klassen"] = explode(", ", $row["klassen"]);
} else {
    $row["klassen"] = [];
}

// Ergebnis zurückgeben
echo json_encode([
    "success" => true,
    "data" => $row
]);
?>