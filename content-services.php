<?php 
//The services page content
?>
<div id="services" class="section">
	<div id="services-wrapper" class="wrapper post-type-wrapper">
			<div id="services-sidebar" class="sidebar">
				<h2 class="section-title fredericka" id="services-title">Services</h2>
				<p class="section-logo">One Hat One Hand</p>
				<ul id="services-menu" class="section-menu">
				<?php //Post title loop goes here, pulling in posts, their titles and linkign to that post in the section by #post-id 
				//use javascript to do this
				?>
					<!-- <li class="menu-item"><a href="#posttitle"></a></li> -->
				</ul>
			</div>	
			<div id="services-posts" class="post-box">
				<div class="primary">
						<div class="content" role="main">
				<?php
				//need to do the first page loop here, getting the content from a page called by id
				hh_section_page_loop(of_get_option('services_intro_page', 'no services page selected'));
				 hh_post_type_loop('hh_service', 10)
				?>
				</div>
				</div>
			</div>
			

	</div><!-- end services wrapper -->
</div><!-- end services section -->