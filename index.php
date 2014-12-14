<?php
    $time_start = microtime(true);
    
    @session_start();
    $cache_age = 1; // Seconds
    header('Cache-control: must-revalidate', false);
    header('Cache-control: max-age='.$cache_age, false);
    header( 'Expires: '.date( 'r', time() + $cache_age ) );
    
    $missions = include('missions.php');
?>
<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="msapplication-config" content="none"/>
    <title>KSP Mission Overview Generator</title>
    <link rel="stylesheet" type="text/css" href="missions.css"/>
    <script src="jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="missions.js"></script>
    <style type="text/css">
        *{
            border:0px solid black;
        }
        fieldset{
            border-width:1px;
        }
    </style>
</head>
<body>
    <header id="section_1" class="section section_1">
        <h1>KSP Mission Overview Generator</h1>
        <div style="clear:both;"></div>
    </header>
    <section id="section_2" class="section section_2">
        <?php echo $missions; ?>
        <div style="clear:both;"></div>
    </section>
    <footer id="section_3" class="section section_3">
        <small>Page rendered in <?php echo round((microtime(true) - $time_start),2); ?> seconds.</small>
        <div style="clear:both;"></div>
    </footer>
    <div id="copyright">&copy; <?php echo date('Y'); ?></div>
    <div id="vanity">
        <a title="Validate HTML" href= "http://validator.w3.org/check?uri=<?php echo rawurlencode( 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] ); ?>">HTML5</a>, 
        <a title="Validate CSS" href= "http://jigsaw.w3.org/css-validator/validator?uri=<?php echo rawurlencode( 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] ); ?>">CSS3</a>, & JavaScript
        <div style="clear:both;"></div>
    </div>
    <div style="clear:both;"></div>
</body>
</html>
