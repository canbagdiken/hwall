<?php
define("DB_HOST", "localhost");
define("DB_USERNAME", "");
define("DB_PASSWORD", "");
define("DB_DATABASE", "");
define("ADMIN_PASSWORD", "123");

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

mysql_connect(DB_HOST, DB_USERNAME, DB_PASSWORD);
mysql_select_db(DB_DATABASE);

switch ($_GET["a"]) {
    case 'list':
        $result = array();
        $result["success"] = true;
        $result["list"] = array();
        $isLogged = isLogged($_POST["token"]);

        $query = mysql_query("select * from msg where deleted=0 order by id desc");
        while ($row = mysql_fetch_assoc($query)) {
            if ($isLogged) {
                $result["list"][] = array(
                    "date" => date("d M y", $row["created"]) ,
                    "msg" => $row["msg"],
                    "ip" => $row["ip"],
                    "id" => $row["id"]
                );
            }
            else {
                $result["list"][] = array(
                    "date" => date("d M y", $row["created"]) ,
                    "msg" => $row["msg"],
                );
            }
        }
		break;

    case 'delete':
        $result = array();
		$result["success"] = true;
        $isLogged = isLogged($_POST["token"]);
        if ($isLogged) {
            mysql_query('update msg set deleted=' . time() . ' where id=' . intval($_POST["del"]) . '');
            $result["delete"] = true;
            $result["msg"] = "Success.";
        }
        else {
            $result["delete"] = false;
            $result["msg"] = "Access denied.";
        }
		break;

    case 'send':
        $result = array();
        $result["success"] = true;
        $result["msg"] = "Your message has been saved, thanks.";
        mysql_query('insert into msg values(
					null,
					"' . mysql_real_escape_string(strip_tags($_POST["msg"])) . '",
					"' . $_SERVER['REMOTE_ADDR'] . '",
					"' . time() . '",
					0)');
		break;

    case 'login':
        if ($_POST["pw"] == ADMIN_PASSWORD) {
            $token = substr(md5(time() . rand(0, 9999999999999)) , 0, 32);
            $result["success"] = true;
            $result["msg"] = "Login success.";
            $result["login"] = true;
            $result["token"] = $token;
            mysql_query('update access set active=0');
            mysql_query('insert into access values(
						null,
						"' . $_SERVER['REMOTE_ADDR'] . '",
						"' . mysql_real_escape_string($token) . '",
						"' . time() . '",
						7)');
        }
        else {
            $result["success"] = true;
            $result["login"] = false;
            $result["msg"] = "Wrong password, sorry :(";

        }
		break;

}

function isLogged($token) {
    if (strlen(trim($token)) < 32) {
        return false;
    }

    $get = mysql_fetch_assoc(mysql_query('select count(id) as say from access where active=7 and token="' . mysql_real_escape_string($token) . '"'));
    return $get['say'] == 1;
}

echo json_encode($result);

