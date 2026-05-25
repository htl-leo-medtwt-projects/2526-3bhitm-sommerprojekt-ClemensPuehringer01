<?php
require_once "db.php";
header('Content-Type: application/json');

$query = isset($_GET['q']) ? trim($_GET['q']) : '';

if (strlen($query) < 2) {
    echo json_encode(["success" => false, "message" => "Suchbegriff zu kurz"]);
    exit;
}

$like = "%" . $query . "%";

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
LEFT JOIN zauber_klasse zk ON z.zauberId = zk.zauberId
LEFT JOIN klasse k ON zk.klassenId = k.klassenId

WHERE z.zauberName LIKE ?

GROUP BY z.zauberId
ORDER BY z.zauberName
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $like);
$stmt->execute();
$result = $stmt->get_result();

$spells = [];
while ($row = $result->fetch_assoc()) {
    $row["verbalKomp"] = (bool)$row["verbalKomp"];
    $row["gestKomp"]   = (bool)$row["gestKomp"];
    $row["materKomp"]  = (bool)$row["materKomp"];
    $row["klassenIds"] = !empty($row["klassenIds"])
        ? array_map("intval", explode(",", $row["klassenIds"])) : [];
    $row["klassen"] = !empty($row["klassen"])
        ? explode(", ", $row["klassen"]) : [];
    $spells[] = $row;
}

echo json_encode(["success" => true, "data" => $spells]);
?>