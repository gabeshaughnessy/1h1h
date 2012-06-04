<?php 
//image thumbnail constructors
add_theme_support( 'post-thumbnails' );
add_image_size( 'single-post-thumbnail', 390, 350, true ); // Permalink thumbnail size
add_image_size( 'feature-post-thumbnail', 300, 250, true ); // Permalink thumbnail size
add_image_size( 'small-thumb', 200, 150, true ); // Permalink thumbnail size


set_post_thumbnail_size( 200, 200 );
add_image_size( 'teaser-image', 200, 133, true);
add_image_size( 'cat-thumb', 260, 200, true ); // The category sliders 

add_image_size('feature_slide', 620, 200, true);
add_image_size('contact_box', 300, 222, true);
?>