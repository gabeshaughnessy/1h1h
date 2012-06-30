<?php 
//image thumbnail constructors
add_theme_support( 'post-thumbnails' );

set_post_thumbnail_size( 200, 200 );
add_image_size('full-bg', 1200, 1000, true ); //full screen background images
add_image_size('feature_slide', 669, 400, true);

?>