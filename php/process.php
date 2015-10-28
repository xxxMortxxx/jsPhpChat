<?php
/**
 * Created by PhpStorm.
 * User: à
 * Date: 25.10.2015
 * Time: 13:58
 */

$function = $_POST['function'];

$logPath = '../txt/log.txt';

$ret = array();

switch($function) {
    case('update'):

        if (file_exists($logPath)) {
            $text = file_get_contents($logPath);
            $ret['text'] = $text;
            $ret['state'] = count($text);
        }

        break;

    case('send'):
        $nickname = htmlentities(strip_tags($_POST['nickname']));
        $message = htmlentities(strip_tags($_POST['message']));
        if ($message != '') {
            fwrite(fopen($logPath, 'a'), '<p class="message">' . '<span>' . $nickname . ' : </span>' . $message . '</p>');
        }

        break;

    case('getStateOfChat'):


        break;
    }
    echo json_encode($ret);
