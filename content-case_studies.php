<?php 
//The case studies page content
?>
<div id="case_studies" class="section">
	<div id="case_studies-wrapper" class="wrapper post-type-wrapper">
			<div id="case_studies-sidebar" class="sidebar">
				<h2 class="section-title" id="case_studies-title">case studies</h2>
				<p class="section-logo">One Hat One Hand</p>
				<ul id="case_studies-menu" class="section-menu">
				<?php //Post title loop goes here, pulling in posts, their titles and linkign to that post in the section by #post-id 
				//use javascript to do this
				?>
					<!-- <li class="menu-item"><a href="#posttitle"></a></li> -->
				</ul>
			</div>	
			<div id="case_studies-posts" class="post-box">
				<?php
				 hh_post_type_loop('hh_case_study', 10)
				?>
			
			

	</div><!-- end case_studies wrapper -->
</div><!-- end case_studies section -->