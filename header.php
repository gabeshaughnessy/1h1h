<?php
/**
 * @package WordPress
 * @subpackage 1H1H
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes(); ?>>
<head profile="http://gmpg.org/xfn/11">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="viewport" content="">

<meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>" />
<title><?php wp_title( '&laquo;', true, 'right' ); ?> <?php bloginfo( 'name' ); ?></title>
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<link rel="stylesheet" href="<?php bloginfo('stylesheet_directory'); ?>/jquery-ui-1.8.21.custom.css" type="text/css" media="screen" />
<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" type="text/css" media="screen" />
<!-- Google Fonts -->
<link href='http://fonts.googleapis.com/css?family=Fredericka+the+Great' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Muli' rel='stylesheet' type='text/css'>
<link href='http://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet' type='text/css'>
<!-- End google fonts -->

<script type="text/javascript">
//Creates a global variable with the theme directory for use in js functions
var templateDir = "<?php bloginfo('template_directory') ?>";
</script>


<?php wp_head(); ?>
</head>
<body <?php body_class(); ?> data-spy="scroll" >
<div class="ipad-console"></div><!-- for logging javascript values on an ipad -->
<div id="header">

</div>
<div id="fixed_bg"></div>
<div id="wrapper">