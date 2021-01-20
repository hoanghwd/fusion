<?php
include_once "./config/config.php";
include_once "./config/database.php";
include_once "FUSION.php";

$apiUrl = BASE_URL.'/api';
$jsUrl = BASE_URL.'/index/js';
$cssUrl = BASE_URL.'/index/css';
$imgUrl = BASE_URL.'/index/images/';
?>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Fusion</title>

    <link rel="stylesheet" type="text/css" href="<?php echo $cssUrl ?>/fusion.css" media="all">

    <script type="text/javascript" src="<?php echo $jsUrl ?>/prototype/1.7.2/prototype.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/jquery/3.4/jquery-3.4.1.min.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/jquery/noconflict.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/global/fusion.js"></script>

    <?php /* Links */ ?>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/links/read.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/links/add.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/links/delete.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/links/edit.js"></script>

    <?php /* Sections */ ?>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/sections/read.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/sections/add.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/sections/delete.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/sections/edit.js"></script>

    <?php /* Clients */ ?>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/clients/read.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/clients/add.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/clients/delete.js"></script>
    <script type="text/javascript" src="<?php echo $jsUrl ?>/clients/edit.js"></script>

    <meta http-equiv="Content-Type" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta http-equiv="content-type" content="application/xhtml+xml; charset=UTF-8">
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-store, must-revalidate, max-age=0">
    <meta http-equiv="Cache-Control" content="post-check=0, pre-check=0">
    <meta http-equiv="Pragma" content="no-cache">
</head>
<body>
    <?php /* --- Links --- */ ?>
    <a href="#" onclick="showHideWS('ws-link')">Links</a>
    <div id="ws-link" style="display:none;">
        <?php /* Read Links */ ?>
        <form action="<?php echo $apiUrl.'/links/read.php' ?>" method="post" id="readlink-form">
            Query links : <br/>
            Link Id:<input type="text" id="id_readlink" value="" placeholder="Leave blank for all">
            <button id="link-read-submit-button" type="link-read-submit-button"><span>Query</span></button>
        </form>
        <button id="link-read-clear-results-button" style="display:none;" type="link-read-submit-button">
            <span>Clear</span>
        </button>
        <div id="read-links-results"></div>

        <br/>

        <?php /* Add Link */ ?>
        <form action="<?php echo $apiUrl.'/links/add.php' ?>" method="post" id="addlink-form">
            Add link: <br/>
            Section Id:<input type="text" id="id_addlink_section_id" value="">&nbsp;
            Name:<input type="text" id="id_addlink_name" value="">
            <button id="link-add-submit-button" type="link-add-submit-button"><span>Add</span></button>
        </form>
        <div id="add-links-results"></div>

        <br/>

        <?php /* Delete Link */ ?>
        <form action="<?php echo $apiUrl.'/links/delete.php' ?>" method="post" id="deletelink-form">
            Delete link: <br/>
            Link Id:<input type="text" id="id_deletelink_link_id" value="">
            <button id="link-delete-submit-button" type="link-delete-submit-button"><span>Delete</span></button>
        </form>
        <div id="delete-links-results"></div>

        <?php /* Edit Link */ ?>
        Edit link: <br/>
        <div id="edit-links-list-all" style="width: 460px;">
            <?php include_once (FUSION::getRoot()).DS.'template/links-list.phtml'; ?>
        </div>

        <div>
            <img id="link-submit-button-ajax" style="display: none" src="<?php echo $imgUrl ?>/spinner.gif" alt="loading...">
        </div>
    </div>

    <br/>
    <?php echo "===================" ?>

    <?php /* --- Sections --- */ ?>
    <br/>

    <a href="#" onclick="showHideWS('ws-section')">Sections</a>
    <div id="ws-section" style="display:none;">
        <?php /* Read Sections */ ?>
        <form action="<?php echo $apiUrl.'/sections/read.php' ?>" method="post" id="readsection-form">
            Query sections : <br/>
            Section Id:<input type="text" id="id_readsection" value="" placeholder="Leave blank for all">
            <button id="section-read-submit-button" type="section-read-submit-button"><span>Query</span></button>
        </form>
        <button id="section-read-clear-results-button" style="display:none;" type="section-read-submit-button">
            <span>Clear</span>
        </button>
        <div id="read-sections-results"></div>

        <?php /* Add Section */ ?>
        <form action="<?php echo $apiUrl.'/sections/add.php' ?>" method="post" id="addsection-form">
            Add section: <br/>
            Client Id:<input type="text" id="id_addsection_client_id" value="">&nbsp;
            Name:<input type="text" id="id_addclient_name" value="">
            <button id="section-add-submit-button" type="section-add-submit-button">
                <span>Add</span>
            </button>
        </form>
        <div id="add-sections-results"></div>

        <br/>

        <?php /* Delete section */ ?>
        <form action="<?php echo $apiUrl.'/sections/delete.php' ?>" method="post" id="deletesection-form">
            Delete section: <br/>
            Section Id:<input type="text" id="id_deletesection_section_id" value="">
            <button id="section-delete-submit-button"><span>Delete</span></button>
        </form>
        <div id="delete-sections-results"></div>

        <?php /* Edit section */ ?>
        Edit section: <br/>
        <div id="edit-sections-list-all" style="width: 460px;">
            <?php include_once (FUSION::getRoot()).DS.'template/section-list.phtml'; ?>
        </div>

        <div>
            <img id="section-submit-button-ajax" style="display: none" src="<?php echo $imgUrl ?>/spinner.gif" alt="loading...">
        </div>
    </div>

    <br/>
    <?php echo "===================" ?>
    <br/>

    <a href="#" onclick="showHideWS('ws-client')">Clients</a>
    <div id="ws-client" style="display:none;">
        <?php /* Read Clients */ ?>
        <form action="<?php echo $apiUrl.'/clients/read.php' ?>" method="post" id="readclient-form">
            Query clients : <br/>
            Client Id:<input type="text" id="id_readclient" value="" placeholder="Leave blank for all">
            <button id="client-read-submit-button" type="client-read-submit-button"><span>Query</span></button>
        </form>
        <button id="client-read-clear-results-button" style="display:none;">
            <span>Clear</span>
        </button>
        <div id="read-client-results"></div>

        <br/>

        <?php /* Add Client */ ?>
        <form action="<?php echo $apiUrl.'/clients/add.php' ?>" method="post" id="addclient-form">
            Add client: <br/>
            Name:<input type="text" id="id_addc_name" value="">&nbsp;
            <button id="client-add-submit-button"><span>Add</span></button>
        </form>
        <div id="add-clients-results"></div>

        <br/>

        <?php /* Delete Client */ ?>
        <form action="<?php echo $apiUrl.'/clients/delete.php' ?>" method="post" id="deleteclient-form">
            Delete client: <br/>
            Client Id:<input type="text" id="id_deletecleint_client_id" value="">
            <button id="client-delete-submit-button"><span>Delete</span></button>
        </form>
        <div id="delete-clients-results"></div>

        <?php /* Edit section */ ?>
        Edit client: <br/>
        <div id="edit-client-list-all" style="width: 460px;">
            <?php include_once (FUSION::getRoot()).DS.'template/client-list.phtml'; ?>
        </div>

        <div>
            <img id="client-submit-button-ajax" style="display: none" src="<?php echo $imgUrl ?>/spinner.gif" alt="loading...">
        </div>
    </div>
</body>
</html>