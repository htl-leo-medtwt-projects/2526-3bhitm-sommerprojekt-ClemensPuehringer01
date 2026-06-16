-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db_server
-- Erstellungszeit: 16. Jun 2026 um 10:47
-- Server-Version: 9.4.0
-- PHP-Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `zauberbuch`
--
CREATE DATABASE IF NOT EXISTS `zauberbuch` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `zauberbuch`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `klasse`
--

CREATE TABLE `klasse` (
  `klassenId` int NOT NULL,
  `klassenName` varchar(100) NOT NULL,
  `imgLink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `klasse`
--

INSERT INTO `klasse` (`klassenId`, `klassenName`, `imgLink`) VALUES
(1, 'Barde', './media/img/klassen/barde.jpeg'),
(2, 'Druide', './media/img/klassen/druide.jpeg'),
(3, 'Hexenmeister', './media/img/klassen/hexenmeister.jpeg'),
(4, 'Kleriker', './media/img/klassen/kleriker.jpeg'),
(5, 'Magier', './media/img/klassen/magier.jpeg'),
(6, 'Paladin', './media/img/klassen/paladin.jpeg'),
(7, 'Waldläufer', './media/img/klassen/waldlaeufer.jpeg'),
(8, 'Zauberer', './media/img/klassen/zauberer.jpeg');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `regelbuch`
--

CREATE TABLE `regelbuch` (
  `regelbuchId` int NOT NULL,
  `regelbuchName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `regelbuch`
--

INSERT INTO `regelbuch` (`regelbuchId`, `regelbuchName`) VALUES
(1, '5.5E'),
(2, '5E'),
(3, '4E'),
(4, '3.5E'),
(5, '2E'),
(6, '1E'),
(7, 'Homebrew');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `schule`
--

CREATE TABLE `schule` (
  `schulenId` int NOT NULL,
  `schulenName` varchar(100) NOT NULL,
  `imgLink` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `schule`
--

INSERT INTO `schule` (`schulenId`, `schulenName`, `imgLink`) VALUES
(1, 'Bannmagie', './media/img/schulen/bannmagie.png'),
(2, 'Beschwörung', './media/img/schulen/beschwoerung.png'),
(3, 'Erkenntnismagie', './media/img/schulen/erkenntnismagie.png'),
(4, 'Verzauberung', './media/img/schulen/verzauberung.png'),
(5, 'Hervorrufung', './media/img/schulen/hervorrufung.png'),
(6, 'Illusionsmagie', './media/img/schulen/illusion.png'),
(7, 'Nekromantie', './media/img/schulen/nekromantie.png'),
(8, 'Verwandlung', './media/img/schulen/verwandlung.png');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `passwort` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`userId`, `username`, `passwort`) VALUES
(1, 'Cleblatt', '$2y$10$x7eLRsAlN3Hfjq7WtJc5m.3c46v6.7opQOo8DLYSM5B7PmBruZAAe');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zauber`
--

CREATE TABLE `zauber` (
  `zauberId` int NOT NULL,
  `zauberName` varchar(100) NOT NULL,
  `schulenId` int NOT NULL,
  `stufe` int NOT NULL,
  `avgDmg` int DEFAULT NULL,
  `zeitaufwand` int NOT NULL,
  `zeiteinheit` varchar(50) NOT NULL,
  `reichweite` int NOT NULL,
  `verbalKomp` tinyint(1) DEFAULT NULL,
  `gestKomp` tinyint(1) DEFAULT NULL,
  `materKomp` tinyint(1) DEFAULT NULL,
  `materKompDet` varchar(255) DEFAULT NULL,
  `wirkungsdauer` int NOT NULL,
  `wirkungsdauerEinheit` varchar(50) NOT NULL,
  `beschreibung` text NOT NULL,
  `userId` int NOT NULL,
  `regelbuchId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `zauber`
--

INSERT INTO `zauber` (`zauberId`, `zauberName`, `schulenId`, `stufe`, `avgDmg`, `zeitaufwand`, `zeiteinheit`, `reichweite`, `verbalKomp`, `gestKomp`, `materKomp`, `materKompDet`, `wirkungsdauer`, `wirkungsdauerEinheit`, `beschreibung`, `userId`, `regelbuchId`) VALUES
(1, 'Feuerball', 5, 3, 28, 1, 'Aktion', 45, 1, 1, 1, 'Eine winzige Kugel aus Fledermausguano und Schwefel', 0, 'Unmittelbar', 'Ein heller Lichtstrahl schießt aus deinem deutenden Finger auf einen Punkt deiner Wahl in Reichweite und explodiert dort mit einem dumpfen Grollen in lodernden Flammen. Jede Kreatur in einer Sphäre mit einem Radius von sechs Metern um diesen Punkt muss einen Geschicklichkeitsrettungswurf ausführen. Scheitert der Wurf, erleidet das Ziel 8W6 Feuerschaden, anderenfalls die Hälfte.\r\n\r\nDas Feuer breitet sich um Ecken aus. Es entzündet brennbare Gegenstände in der Umgebung, die nicht getragen oder gehalten werden.\r\n\r\nAuf höheren Graden: Wirkst du diesen Zauber, indem du einen Zauberplatz des 4. Grades oder höher nutzt, steigt der Schaden für jeden Grad über dem 3. um 1W6.', 1, 2),
(2, 'Heilendes Wort', 5, 1, NULL, 1, 'Bonusaktion', 18, 1, 0, 0, NULL, 0, 'Unmittelbar', 'Eine Kreatur deiner Wahl in Reichweite, die du sehen kannst, gewinnt Trefferpunkte in Höhe von 1W4 + deinem Zauberwirken-Attributsmodifikator zurück. Dieser Zauber wirkt nicht auf Untote oder Konstrukte.\r\n\r\nAuf höheren Graden: Wirkst du diesen Zauber, indem du einen Zauberplatz des 2. Grades oder höher nutzt, steigt die Heilung für jeden Grad über dem 1. um 1W4.', 1, 2),
(3, 'Taschenspielerei', 2, 0, NULL, 1, 'Aktion', 3, 1, 1, 0, NULL, 1, 'Stunde', 'Dies ist ein einfacher Zaubertrick, den Zauberlehrlinge zum Üben verwenden. Du erzeugst einen der folgenden magischen Effekte in Reichweite:\r\n\r\nDu erzeugst einen unmittelbaren, harmlosen sensorischen Effekt, etwa einen Funkenregen, einen Windstoß, eine leise Melodie oder einen merkwürdigen Geruch.\r\nDu entzündest oder löschst unmittelbar eine Kerze, eine Fackel oder ein kleines Lagerfeuer.\r\nDu kannst unmittelbar einen Gegenstand, der nicht größer als ein Würfel mit 30 Zentimetern Kantenlänge ist, säubern oder verschmutzen.\r\nDu kannst nichtlebendes Material, das nicht größer als ein Würfel mit 30 Zentimetern Kantenlänge ist, abkühlen, erhitzen oder würzen. Dies hält eine Stunde lang an.\r\nDu lässt einen Farbfleck, ein Mal oder ein Symbol eine Stunde lang auf einem Gegenstand oder einer Oberfläche erscheinen.\r\nDu erzeugst ein nichtmagisches Schmuckstück oder ein illusorisches Bild, das in deine Hand passt und das bis zum Ende deines nächsten Zuges erhalten bleibt.\r\n\r\nWirkst du diesen Zauber mehrmals, können bis zu drei der langfristigen Effekte gleichzeitig aktiv sein. Du kannst einen solchen Effekt als Aktion beenden.', 1, 2),
(4, 'Dolchwolke', 2, 2, 10, 1, 'Aktion', 18, 1, 1, 1, 'eine Glasscherbe', 1, 'Minute', 'Du füllst die Luft in einem Würfel mit 1,50 m Kantenlänge, der um einen Punkt deiner Wahl in Reichweite zentriert ist, mit wirbelnden Dolchen. Eine Kreatur erleidet 4W4 Hiebschaden, wenn sie den Bereich das erste Mal in einem Zug betritt oder ihren Zug dort beginnt.\n\nAuf höheren Graden: Wenn du diesen Spruch mit einem Zauberplatz des 3. oder eines höheren Grades wirkst, steigt der Schaden für jeden Grad über den 2. hinaus um 2W4.', 1, 2),
(5, 'Feuerpfeil', 5, 0, 5, 1, 'aktion', 36, 1, 1, 0, NULL, 0, 'unmittelbar', 'Du schleuderst einen Splitter aus Feuer auf eine Kreatur in\nReichweite. Führe einen Fernkampf-Zauberangriff gegen das\nZiel aus. Bei einem Treffer erleidet es 1 Wl O Feuerschaden. Ein\nbrennbarer Gegenstand, der von diesem Zauber getroffen wird,\ngeht in Flammen auf, falls er nicht getragen oder in der Hand\ngehalten wird.\nDer Schaden dieses Zaubers steigt jeweils um 1 Wl O bei\nErreichen der 5. (2W10), 11. (3W10) und 17. Stufe (4W10).', 1, 2),
(6, 'Dissonantes Flüstern', 4, 1, 10, 1, 'aktion', 18, 1, 0, 0, NULL, 0, 'unmittelbar', 'Du stimmst flüsternd eine missklingende Melodie an, die\nnur eine Kreatur deiner Wahl in Reichweite hören kann. Die\nKreatur wird daraufhin von schrecklichen Schmerzen erfüllt.\nDas Ziel muss einen Weisheitsrettungswurf ablegen. Bei einem\nMisserfolg erleidet es 3W6 psychischen Schaden und muss\nsofort seine Reaktion verwenden (falls sie noch verfügbar ist),\num sich so weit von dir zu entfernen, wie es seine Bewegungsrate\nerlaubt. Die Kreatur bewegt sich nicht in offensichtlich\ngefährliches Gelände, wie Feuer oder eine Grube. Bei einem\nerfolgreichen Rettungswurf erleidet das Ziel nur den halben\nSchaden und muss sich nicht wegbewegen. Eine taube Kreatur\nist bei ihrem Rettungswurf automatisch erfolgreich.\nAuf höheren Graden: Wenn du diesen Spruch mit einem\nZauberplatz des 2. oder eines höheren Grades wirkst, steigt der\nSchaden für jeden Grad über den 1. hinaus um 1 W6.', 1, 2),
(7, 'Mit Pflanzen Sprechen', 8, 3, NULL, 1, 'aktion', -1, 1, 1, 0, NULL, 10, 'minute', 'Du erfüllst Pflanzen innerhalb von 9 m mit einem beschränkten\nBewusstsein und Belebtheit, sodass sie in der Lage sind, mit dir\nzu kommunizieren und einfachen Anweisungen zu folgen. Du\nKAPITEL 11 ! ZAUBER\nkannst die Pflanzen über Ereignisse im Bereich des Zaubers\nbefragen, Informationen über Kreaturen erhalten, die vorbeigekommen\nsind, oder Kenntnis über das Wetter und andere\nUmstände erlangen.\nEs ist dir auch möglich, schwieriges Gelände, das durch Pflanzen\nbedingt ist (wie Dickicht und Unterholz), für die Wirkungsdauer\nin normales zu verwandeln. Gleichermaßen kannst du\nPflanzen anweisen, Eindringlinge zu behindern, und so normales\nGelände, in dem sich Pflanzen befinden, zu schwierigem machen.\nNach Maßgabe des SL könnten die Pflanzen auch andere\nAufgaben für dich erfüllen. Der Zauber erlaubt es ihnen zwar\nnicht, sich zu entwurzeln und umherzulaufen, aber sie sind in\nder Lage, ihre Zweige, Ranken und Stiele frei zu bewegen. Befindet\nsich eine Pflanzenkreatur in der Umgebung, kann sie mit dir\nkommunizieren, als würdet ihr die gleiche Sprache sprechen, es\nist dir jedoch nicht möglich, sie magisch zu beeinflussen.\nDer Zauber kann Pflanzen, die mit Verstricken erschaffen\nwurden, dazu bringen, eine festgesetzte Kreatur freizugeben.', 1, 2),
(8, 'Verschonung der Toten', 7, 0, NULL, 1, 'aktion', 0, 1, 1, 0, NULL, 0, 'unmittelbar', 'Du berührst eine lebende Kreatur mit O Trefferpunkten. Das\nZiel wird stabilisiert. Der Zauber hat keine Auswirkungen auf\nUntote oder Konstrukte.', 1, 2),
(9, 'Wunsch', 2, 9, NULL, 1, 'aktion', -1, 1, 0, 0, NULL, 0, 'unmittelbar', 'Wunsch ist der mächtigste Zauber, den eine sterbliche Kreatur\nwirken kann. Indem du deinen Willen laut aussprichst, vermagst\ndu das Fundament der Realität im Einklang mit deinen Wünschen\nzu verändern.\nAls grundlegende Verwendung dieses Zaubers kannst du\neinen beliebigen anderen Spruch des 8. oder eines niedrigeren\nGrades kopieren. Du musst weder dessen Voraussetzungen\nerfüllen noch wertvolle Materialkomponenten bezahlen. Der\nZauber tritt einfach in Kraft.\nAlternativ kannst du einen der folgenden Effekte erzeugen:\n• Du erschaffst einen nicht-magischen Gegenstand im Wert\nvon bis zu 25.000 GM. Dieser darf in jeder Ausdehnung nicht\ngrößer als 90 m sein und erscheint in einem nicht besetzten\nBereich auf dem Boden, den du sehen kannst.\n• Du heilst bis zu zwanzig Kreaturen, die du sehen kannst, sodass\nsie alle Treff erpunkte zurückerhalten, und beendest alle\nEffekte, die auf ihnen liegen, als wenn der Zauber Vollständige\nGenesung auf sie gewirkt worden wären.\n• Du gewährst bis zu zehn Kreaturen, die du sehen kannst, eine\nResistenz gegen eine Schadensart deiner Wahl.\n• Du verleihst bis zu zehn Kreaturen, die du sehen kannst, für\n8 Stunden eine Immunität gegen einen einzelnen Zauber\noder magischen Effekt. Beispielsweise könntest du dich und\ndeine Gruppe immun gegen den Lebensentzug-Angriff eines\nLichs machen.\n• Du hebst ein kurz zurückliegendes Ereignis auf, indem du die\nWiederholung eines beliebigen Wurfes in der letzten Runde\n(inklusive deines Zuges) erzwingst. Die Realität formt sich\nentsprechend des neuen Ergebnisses um. Beispielsweise\nkönnte ein Wunsch den erfolgreichen Rettungswurf oder kritischen\nTreffer eines Gegners aufheben oder den misslungenen\nRettungswurf eines Verbündeten. Du darfst bestimmen, dass\ndie Wurfwiederholung mit Vorteil oder Nachteil durchgeführt\nwird, und kannst entscheiden, ob das Ergebnis der Wiederholung\noder des ursprünglichen Wurfes verwendet werden soll.\nDu kannst auch einen Effekt erzeugen, der nicht von den obigen\nBeispielen abgedeckt wird. Nenne dem SL deinen Wunsch so\npräzise wie möglich, er entscheidet (mit großer Freiheit), was\nin einem solchen Fall passiert.Je größer der Wunsch ist, umso\nwahrscheinlicher ist es, dass etwas anders verläuft, als geplant.\nDer Zauber könnte einfach scheitern, der gewünschte Effekt nur\nzum Teil erfüllt werden oder du selbst eine unvorhersehbare Nebenwirkung\nerleiden, die von deiner Formulierung des Wunsches\nabhängt. Wenn du dir beispielsweise wünschst, dass ein Schurke\ntot sei, könntest du in die Zukunft katapultiert werden, in eine\nZeit, in welcher der Schurke nicht mehr am Leben ist (was dich\neffektiv aus dem Spiel entfernen würde). Wünscht du dir einen\nlegendären magischen Gegenstand oder ein Artefakt, könntest du\nzum aktuellen Besitzer des Objekts teleportiert werden.\nWunsch auf eine Weise zu wirken, die nicht bloß einen anderen\nZauber kopiert, bedeutet eine enorme Anstrengung und Belastung.\nJedes Mal, wenn du nach dieser Belastung einen Zauber\nwirkst, erleidest du 1 Wl O nekrotischen Schaden pro Grad des\nZaubers, bis du eine lange Rast abgeschlossen hast. Dieser Schaden\nkann auf keine Weise verringert oder verhindert werden. Außerdem\nfällt deine Stärke für 2W4 Tage auf 3, falls dein Attributswert\nnicht bereits 3 oder weniger beträgt. Für jeden dieser Tage,\nan dem du dich nur ausruhst oder leichten Tätigkeiten nachgehst,\nverringerst du die übrige Erholungszeit um 2 Tage. Schließlich\nbesteht eine Chance von 33 %, dass du Wunsch niemals erneut\nwirken kannst, wenn du diese Belastung erleidest.', 1, 2),
(10, 'Auf Wasser gehen', 8, 3, NULL, 1, 'aktion', 9, 1, 1, 1, 'ein Stück Kork', 1, 'stunde', 'Dieser Zauber verleiht die Fähigkeit, sich über flüssige Oberflächen\nzu bewegen - wie Wasser, Säure, Schlamm, Schnee, Treibsand\noder Lava -, als wären sie ungefährlicher, fester Boden\n(Wesen, die sich über geschmolzene Lava bewegen, erleiden\nallerdings aufgrund der Hitze Schaden). Bestimme bis zu zehn\nbereitwillige Kreaturen in Reichweite, die du sehen kannst,\nwelche die Fähigkeit für die Wirkungsdauer erhalten.\nWenn du eine Kreatur als Ziel wählst, die sich in einer Flüssigkeit\nbefindet oder untergetaucht ist, trägt der Zauber sie mit\neiner Geschwindigkeit von 18 m pro Runde an die Oberfläche.', 1, 2),
(11, 'Ausbessern', 8, 0, NULL, 1, 'minute', 0, 1, 1, 1, 'zwei Magnetsteine', 0, 'unmittelbar', 'Dieser Zauber repariert eine Bruchstelle oder einen Riss in\neinem Gegenstand, den du berührst, beispielsweise ein zerbrochenes\nKettenglied, die beiden Hälften eines zerbrochenen\nSchlüssels, einen zerrissenen Umhang oder einen leckenden\nWeinschlauch. Solange der Riss oder die Bruchstelle in keiner\nAusdehnung größer als 30 cm ist, kannst du sie flicken, sodass\nkeine Spur des vorherigen Schadens übrig bleibt.\nDer Zauber kann einen magischen Gegenstand oder ein Konstrukt\nauf physische Weise reparieren, einem solchen Gegenstand\njedoch nicht seine Magie wiedergeben.', 1, 2),
(12, 'Bewegungsfreiheit', 1, 4, NULL, 1, 'aktion', 0, 1, 1, 1, 'ein Lederriemen, gebunden um einen Arm oder ähnliche Gliedmaße', 1, 'stunde', 'Du berührst eine bereitwillige Kreatur. Für die Wirkungsdauer\nist die Bewegung des Ziels nicht durch schwieriges Gelände\neingeschränkt, außerdem können Zauber und andere magische\nEffekte weder die Bewegungsrate der Kreatur verringern noch\ndafür sorgen, dass sie gelähmt oder festgesetzt wird. Zusätzlich\nkann das Ziel 1,50 m Bewegungsrate aufwenden, um automatisch\naus nicht-magischen Behinderungen zu entkommen, wie\nHandschellen oder einer Kreatur, die sie festhält. Zu guter Letzt\nerleiden Bewegung und Angriffe des Ziels keine Abzüge, wenn es\nsich unter Wasser aufhält.', 1, 2),
(13, 'Einfache Illusion', 6, 0, NULL, 1, 'aktion', 9, 0, 1, 1, 'ein Stück Vlies', 1, 'minute', 'Du erschaffst ein Geräusch oder das Abbild eines Gegenstands,\ndas für die Wirkungsdauer bestehen bleibt. Die Illusion endet auch,\nwenn du sie als Aktion aufhebst oder den Zauber erneut wirkst.\nErschaffst du ein Geräusch, kann die Lautstärke von einem\nFlüstern bis zu einem Schrei reichen. Es kann sich um deine\neigene Stimme handeln, die Stimme eines anderen, das Brüllen\neines Löwen, schlagende Trommeln oder ein beliebiges anderes\nGeräusch. Du darfst einen einzigen Laut hervorrufen, der für\ndie gesamte Wirkungsdauer anhält, oder mehrere einzelne Laute\nzu verschiedenen Zeitpunkten innerhalb der Wirkungsdauer.\nErschaffst du das Abbild eines Gegenstands - wie das eines\nStuhles, schlammiger Fußabdrücke oder einer kleinen Truhe-,\ndarf dieses nicht größer als ein Würfel mit einer Kantenlänge\nvon 1,50 m sein. Das Abbild kann weder Geräusche, Licht,\nGerüche noch andere sensorische Effekte erzeugen.\nKörperliche Interaktion mit dem Trugbild offenbart, dass es\nsich um eine Illusion handelt, da Dinge es einfach durchdringen.\nEine Kreatur kann ihre Aktion verwenden, um das Bildnis\noder das Geräusch zu untersuchen. Gelingt ihr ein Wurf auf\nIntelligenz (Nachforschungen) gegen den SG zum Widerstehen\ndeiner Zauber, kann sie erkennen, dass es sich um eine Illusion\nhandelt. Durchschaut eine Kreatur die Illusion, verblasst diese\nfür sie.', 1, 2),
(14, 'Botschaft', 8, 0, NULL, 1, 'aktion', 36, 1, 1, 1, 'ein kurzes Stück Kupferdraht', 1, 'runde', 'Du deutest mit dem Finger auf eine Kreatur in Reichweite\nund flüsterst eine Botschaft. Das Ziel (und nur dieses) hört die\nBotschaft und kann in einem Flüstern antworten, das nur du zu\nhören vermagst.\nDu darfst diesen Zauber durch feste Gegenstände wirken,\nwenn du mit dem Ziel vertraut bist und weißt, dass es sich hinter\nder Barriere befindet. Magische Stille, 30 cm Stein, 2,5 cm gewöhnliches\nMetall, eine dünne Schicht Blei oder 90 cm Holz blockieren\nden Zauber. Der Effekt muss keiner geraden Linie folgen\nund kann sich frei um Ecken oder durch Öffnungen bewegen.', 1, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `zauber_klasse`
--

CREATE TABLE `zauber_klasse` (
  `zauberId` int NOT NULL,
  `klassenId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Daten für Tabelle `zauber_klasse`
--

INSERT INTO `zauber_klasse` (`zauberId`, `klassenId`) VALUES
(2, 1),
(3, 1),
(4, 1),
(6, 1),
(7, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(2, 2),
(7, 2),
(10, 2),
(11, 2),
(12, 2),
(3, 3),
(4, 3),
(13, 3),
(2, 4),
(8, 4),
(10, 4),
(11, 4),
(12, 4),
(1, 5),
(3, 5),
(4, 5),
(5, 5),
(9, 5),
(11, 5),
(13, 5),
(14, 5),
(7, 7),
(10, 7),
(12, 7),
(1, 8),
(3, 8),
(4, 8),
(5, 8),
(9, 8),
(10, 8),
(11, 8),
(13, 8),
(14, 8);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `klasse`
--
ALTER TABLE `klasse`
  ADD PRIMARY KEY (`klassenId`);

--
-- Indizes für die Tabelle `regelbuch`
--
ALTER TABLE `regelbuch`
  ADD PRIMARY KEY (`regelbuchId`);

--
-- Indizes für die Tabelle `schule`
--
ALTER TABLE `schule`
  ADD PRIMARY KEY (`schulenId`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indizes für die Tabelle `zauber`
--
ALTER TABLE `zauber`
  ADD PRIMARY KEY (`zauberId`),
  ADD KEY `schulenId` (`schulenId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `fk_zauber_regelbuch` (`regelbuchId`);

--
-- Indizes für die Tabelle `zauber_klasse`
--
ALTER TABLE `zauber_klasse`
  ADD PRIMARY KEY (`zauberId`,`klassenId`),
  ADD KEY `klassenId` (`klassenId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `klasse`
--
ALTER TABLE `klasse`
  MODIFY `klassenId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `regelbuch`
--
ALTER TABLE `regelbuch`
  MODIFY `regelbuchId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT für Tabelle `schule`
--
ALTER TABLE `schule`
  MODIFY `schulenId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `zauber`
--
ALTER TABLE `zauber`
  MODIFY `zauberId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `zauber`
--
ALTER TABLE `zauber`
  ADD CONSTRAINT `fk_zauber_regelbuch` FOREIGN KEY (`regelbuchId`) REFERENCES `regelbuch` (`regelbuchId`) ON DELETE SET NULL,
  ADD CONSTRAINT `zauber_ibfk_1` FOREIGN KEY (`schulenId`) REFERENCES `schule` (`schulenId`),
  ADD CONSTRAINT `zauber_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Constraints der Tabelle `zauber_klasse`
--
ALTER TABLE `zauber_klasse`
  ADD CONSTRAINT `zauber_klasse_ibfk_1` FOREIGN KEY (`zauberId`) REFERENCES `zauber` (`zauberId`) ON DELETE CASCADE,
  ADD CONSTRAINT `zauber_klasse_ibfk_2` FOREIGN KEY (`klassenId`) REFERENCES `klasse` (`klassenId`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
