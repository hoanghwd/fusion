<?php

define('DS', DIRECTORY_SEPARATOR);
define('PS', PATH_SEPARATOR);
define('BP', dirname(dirname(__FILE__)));

final class FUSION
{
    /**
     * Application root absolute path
     *
     * @var string
     */
    static private $_appRoot;

    /**
     * Set application root absolute path
     *
     * @param string $appRoot
     */
    public static function setRoot($appRoot = '')
    {
        if (self::$_appRoot) {
            return ;
        }

        if ('' === $appRoot) {
            $appRoot = dirname(__FILE__);
        }

        if (is_dir($appRoot) and is_readable($appRoot)) {
            self::$_appRoot = $appRoot;
        }
        else {
            echo ($appRoot . ' is not a directory or not readable by this user');
        }
    }

    /**
     * @return string
     */
    public static function getRoot()
    {
        return self::$_appRoot;
    }

    /**
     * @throws Exception
     */
    public static function run()
    {
        self::setRoot();
    }
}

FUSION::run();