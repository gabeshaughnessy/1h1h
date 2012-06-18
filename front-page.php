<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage 1H1H
 */

get_header(); 

get_template_part('content', 'landing');
wp_nav_menu("homepage");
get_template_part('content', 'portfolio');
get_template_part('content', 'services');
get_template_part('content', 'case_studies');
get_template_part('content', 'artists');
get_template_part('content', 'clients');
get_template_part('content', 'contact');
 get_footer(); ?>