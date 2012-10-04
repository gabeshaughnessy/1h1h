<?php 
//image thumbnail constructors
add_theme_support( 'post-thumbnails' );

set_post_thumbnail_size( 250, 250 );
add_image_size('isotope-grid', 100, 100, true ); //grid images
add_image_size('full-bg', 1200, 1000, true ); //full screen background images
add_image_size('feature_slide', 669, 400, true);

?>