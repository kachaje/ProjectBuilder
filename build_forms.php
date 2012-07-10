<?php

function deleteDir($dirPath) {
    if (!is_dir($dirPath)) {
        throw new InvalidArgumentException('$dirPath must be a directory');
    }
    if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
        $dirPath .= '/';
    }
    $files = glob($dirPath . '*', GLOB_MARK);
    foreach ($files as $file) {
        if (is_dir($file)) {
            self::deleteDir($file);
        } else {
            unlink($file);
        }
    }
    rmdir($dirPath);
}

function recurse_copy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while (false !== ( $file = readdir($dir))) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if (is_dir($src . '/' . $file)) {
                recurse_copy($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}

$pageTypes = Array(
    1 => "Login",
    2 => "Application Dashboard",
    3 => "Patient Dashboard",
    4 => "Custom",
    5 => "Report",
    6 => "Other"
);

$fieldTypes = Array(
    1 => "Number",
    2 => "Numbers Only",
    3 => "Numbers With Unknown",
    4 => "Numbers With Unknown and N/A",
    5 => "Text Only",
    6 => "Alphanumeric",
    7 => "Calendar",
    8 => "Date",
    9 => "Simple Time",
    10 => "Advanced Time",
    11 => "Single Select",
    12 => "Multiple Select",
    13 => "Multiple Select With Select All",
    14 => "Drug Dispensation",
    15 => "Dynamically Populated"
);

$relationTypes = Array(
    1 => "<",
    2 => ">",
    3 => "==",
    4 => "<=",
    5 => ">=",
    6 => "!="
);

$encounters = Array();
$concepts = Array();
$encounter_types = Array();
$page_types = Array();
$summary_or_report_pages = Array();

foreach ($_POST as $key => $value) {
    if (preg_match("/^encounter\d+$/", $key)) {
        $encounters[] = $key;
        preg_match("/\d+/", $key, $page);

        switch ($_POST[$key]) {
            case "1":
                $page_types[] = "Login";
                break;
            case "2":
                $page_types[] = "Application Dashboard";
                break;
            case "3":
                $page_types[] = "Patient Dashboard";
                break;
            case "4":
                $page_types[] = $_POST["other_custom_control_encounter$page[0]_other"];
                $summary_or_report_pages[] = $_POST["other_custom_control_encounter$page[0]_other"];
                break;
            case "5":
                $page_types[] = "Report";
                $summary_or_report_pages[] = "Report";
                break;
            case "6":
                $page_types[] = $_POST["other_other_control_encounter$page[0]_other"];
                break;
        }
    }
}

echo("<pre>");

foreach ($encounters as $key => $value) {
    preg_match("/\d+/", $value, $page);
    $control_count = 0;
    $link_count = 0;
    $tab_count = 0;

    $controls = "";

    switch ($_POST[$value]) {
        case "1":
            $userlabel = (strlen(trim($_POST["username_" . $page[0]])) == 0 ?
                            "Username" : trim($_POST["username_" . $page[0]]));
            $passwordlabel = (strlen(trim($_POST["password_" . $page[0]])) == 0 ?
                            "Password" : trim($_POST["password_" . $page[0]]));
            $locationlabel = (strlen(trim($_POST["location_" . $page[0]])) == 0 ?
                            "Location" : trim($_POST["location_" . $page[0]]));

            $controls = "username_$page[0]: " . $userlabel .
                    "\npassword_$page[0]: " . $passwordlabel .
                    "\nlocation_$page[0]: " . $locationlabel;

            break;
        case "2":
            $controls = "cancel_destination_$page[0]: " . $_POST["cancel_destination_$page[0]"] .
                    "\nnext_destination_$page[0]: " . $_POST["next_destination_$page[0]"] .
                    "\nlocation_$page[0]: " . $locationlabel . "\n";

            $tab_count = $_POST["tab_count_" . $page[0]];

            for ($i = 0; $i < $tab_count; $i++) {
                $controls .= "appDashTab" . $page[0] . "_$i: " . $_POST["appDashTab" . $page[0] . "_$i"] . "\n";
                $controls .= "customFieldType" . $page[0] . "_$i: " . $_POST["customFieldType" . $page[0] . "_$i"] . "\n";
            }
            break;
        case "3":
            $controls = "cancel_destination_$page[0]: " . $_POST["cancel_destination_$page[0]"] .
                    "\nnext_destination_$page[0]: " . $_POST["next_destination_$page[0]"] .
                    "\nlocation_$page[0]: " . $locationlabel . "\n";

            $tab_count = $_POST["tab_count_" . $page[0]];
            $link_count = $_POST["link_count_" . $page[0]];

            for ($i = 0; $i < $tab_count; $i++) {
                $controls .= "appDashTab" . $page[0] . "_$i: " . $_POST["appDashTab" . $page[0] . "_$i"] . "\n";
                $controls .= "customFieldType" . $page[0] . "_$i: " . $_POST["customFieldType" . $page[0] . "_$i"] . "\n";
            }

            for ($i = 0; $i < $link_count; $i++) {
                $controls .= "DashLinks_field" . $page[0] . "_$i: " . $_POST["DashLinks_field" . $page[0] . "_$i"] . "\n";
                $controls .= "DashLinksFieldType" . $page[0] . "_$i: " . $_POST["DashLinksFieldType" . $page[0] . "_$i"] . "\n";
            }
            break;
        case "4":
            $control_count = intval($_POST["field_count_" . $page[0]]);

            for ($i = 0; $i < $control_count; $i++) {
                $controls .= "custom_field" . $page[0] . "_$i: " . $_POST["custom_field" . $page[0] . "_$i"] . "\n";
                $controls .= "customFieldType" . $page[0] . "_$i: " . $_POST["customFieldType" . $page[0] . "_$i"] . "\n\n";
            }

            break;
        case "5":
            $control_count = intval($_POST["field_count_" . $page[0]]);

            for ($i = 0; $i < $control_count; $i++) {
                $controls .= "report_field" . $page[0] . "_$i: " . $_POST["report_field" . $page[0] . "_$i"] . "\n";
                $controls .= "reportFieldType" . $page[0] . "_$i: " . $_POST["reportFieldType" . $page[0] . "_$i"] . "\n\n";
            }

            break;
        case "6";
            $control_count = intval($_POST["question_count_" . $page[0]]);
            $encounter_types[] = $_POST["other_other_control_encounter$page[0]_other"];

            for ($i = 0; $i < $control_count; $i++) {

                if (!$concepts[$_POST["question" . $page[0] . "_$i"]]) {
                    $concepts[$_POST["question" . $page[0] . "_$i"]] = true;
                }

                $controls .= "question" . $page[0] . "_$i: " . $_POST["question" . $page[0] . "_$i"] . "\n";

                $controls .= "fieldType" . $page[0] . "_$i: " . $_POST["fieldType" . $page[0] . "_$i"] . "\n";

                switch ($_POST["fieldType$page[0]_$i"]) {
                    case "1":
                    case "2":
                    case "3":
                    case "4":
                        $controls .= "absMin" . $page[0] . "_$i: " . $_POST["absMin" . $page[0] . "_$i"] . "\n";
                        $controls .= "min" . $page[0] . "_$i: " . $_POST["min" . $page[0] . "_$i"] . "\n";
                        $controls .= "max" . $page[0] . "_$i: " . $_POST["max" . $page[0] . "_$i"] . "\n";
                        $controls .= "absMax" . $page[0] . "_$i: " . $_POST["absMax" . $page[0] . "_$i"] . "\n";
                        break;
                }

                $conditions = intval($_POST["conditionsQ" . $page[0] . "_$i"]);

                for ($c = 0; $c < $conditions; $c++) {

                    $controls .= "condition_select_bracket1_" . $page[0] . "_" . $i . "_" . $c . ": " .
                            $_POST["condition_select_bracket1_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";

                    $controls .= "condition_select_" . $page[0] . "_" . $i . "_" . $c . ": " .
                            $_POST["condition_select_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";

                    $controls .= "condition_comparison_" . $page[0] . "_" . $i . "_" . $c . ": " .
                            $_POST["condition_comparison_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";

                    $controls .= "condition" . $page[0] . "_" . $i . "_" . $c . ": " .
                            $_POST["condition" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";

                    $controls .= "condition_select_bracket2_" . $page[0] . "_" . $i . "_" . $c . ": " .
                            $_POST["condition_select_bracket2_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";

                    if (isset($_POST["other_condition_type_" . $page[0] . "_" . $i . "_" . $c . ""])) {
                        $controls .= "other_condition_type_" . $page[0] . "_" . $i . "_" . $c . ": " .
                                $_POST["other_condition_type_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";
                    }

                    if (isset($_POST["other_condition_" . $page[0] . "_" . $i . "_" . $c . ""])) {
                        $controls .= "other_condition_" . $page[0] . "_" . $i . "_" . $c . ": " .
                                $_POST["other_condition_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";
                    }

                    if (isset($_POST["condition_concat_" . $page[0] . "_" . $i . "_" . $c . ""])) {
                        $controls .= "condition_concat_" . $page[0] . "_" . $i . "_" . $c . ": " .
                                $_POST["condition_concat_" . $page[0] . "_" . $i . "_" . $c . ""] . "\n";
                    }
                }

                $controls .= "\n";
            }

            break;
    }

    echo("<textarea cols='100' rows='10'>Page: $page[0] - " . $pageTypes[$_POST[$value]] .
    "\n" . $controls . "\n</textarea><br/><br/>");
}

echo("<b>Page Types</b><br />");
print_r($page_types);

echo("<b>Summary or report pages</b><br />");
print_r($summary_or_report_pages);

echo("<b>Encounter types</b><br />");
print_r($encounter_types);

echo("<b>Concepts</b><br />");
print_r($concepts);

print_r($_POST);

echo("</pre>");

$dir = "output/$_POST[project_name]";

if (isset($_POST["project_name"])) {
    /*if (!is_dir($dir)) {
        mkdir($dir);
    } else {
        deleteDir($dir);

        mkdir($dir);
    }

    mkdir($dir . "/app");
    mkdir($dir . "/config");
    mkdir($dir . "/db");
    mkdir($dir . "/doc");
    mkdir($dir . "/public");
    mkdir($dir . "/script");
    mkdir($dir . "/lib");
    mkdir($dir . "/coverage");
    mkdir($dir . "/features");
    mkdir($dir . "/tmp");
    mkdir($dir . "/vendor");
    mkdir($dir . "/log");
    mkdir($dir . "/test");
    mkdir($dir . "/workplans");

    mkdir($dir . "/app/controllers");
    mkdir($dir . "/app/helpers");
    mkdir($dir . "/app/models");
    mkdir($dir . "/app/views");*/
    
    recurse_copy("Skeleton", $dir);
    
    mkdir($dir . "/app/views/encounters");
    mkdir($dir . "/app/views/patient");
    mkdir($dir . "/app/views/people");
    mkdir($dir . "/app/views/reports");
    mkdir($dir . "/app/views/sessions");
    mkdir($dir . "/app/views/user");

    $fileName = $dir . "/app/views/patient/show.rhtml";

    $fileHandle = fopen($fileName, 'w') or die("can't open file");

    fclose($fileHandle);

    $fileName = $dir . "/app/views/people/index.rhtml";

    $fileHandle = fopen($fileName, 'w') or die("can't open file");

    fclose($fileHandle);

    foreach ($encounter_types as $key => $encounter) {
        $fileName = $dir . "/app/views/encounters/" . strtolower(preg_replace("/\s/", "_", $encounter)) . ".rhtml";

        $fileHandle = fopen($fileName, 'w') or die("can't open file");

        fclose($fileHandle);
    }
}
?>
