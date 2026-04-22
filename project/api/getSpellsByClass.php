<?php
require_once "db.php";
header('Content-Type: application/json');

$classId = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($classId <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Ungültige Klassen-ID"]);
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

    GROUP_CONCAT(DISTINCT k.klassenName SEPARATOR ', ') AS klassen,
    GROUP_CONCAT(DISTINCT k.klassenId) AS klassenIds

FROM zauber z
JOIN schule s ON z.schulenId = s.schulenId
LEFT JOIN regelbuch r ON z.regelbuchId = r.regelbuchId

LEFT JOIN zauber_klasse zk 
    ON z.zauberId = zk.zauberId

LEFT JOIN klasse k 
    ON zk.klassenId = k.klassenId

WHERE z.zauberId IN (
    SELECT zauberId 
    FROM zauber_klasse 
    WHERE klassenId = ?
)

GROUP BY z.zauberId
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $classId);
$stmt->execute();

$result = $stmt->get_result();

$spells = [];

while ($row = $result->fetch_assoc()) {

    $row["verbalKomp"] = (bool)$row["verbalKomp"];
    $row["gestKomp"] = (bool)$row["gestKomp"];
    $row["materKomp"] = (bool)$row["materKomp"];

    $row["klassenIds"] = !empty($row["klassenIds"])
        ? array_map("intval", explode(",", $row["klassenIds"]))
        : [];

    $row["klassen"] = !empty($row["klassen"])
        ? explode(", ", $row["klassen"])
        : [];

    $spells[] = $row;
}

echo json_encode([
    "success" => true,
    "data" => $spells
]);
?>