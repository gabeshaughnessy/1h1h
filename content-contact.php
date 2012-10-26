<?php 
//The contact page content
?>
<div id="contact" class="section">
	<div id="contact-wrapper" class="wrapper">
		<div class="post-box">
			<div id="main-hat-contact" class="hat"><span class="fredericka">San Francisco, CA</span></div>
			<div id="main-logo">One Hat One Hand</div>
			<div id="call-cta" class="cta"><span class="thick-line line"></span><p>Call Us at (415) 822-2020</p><span class="thick-line line"></span></div>
			<div id="address-cta" class="cta"><span class="thin-line line"></span><p>1335 Yosemite Ave. San Francisco, CA 94124</p><span class="thin-line line"></span></div>
			
			<div id="contact-form-container">
			<a id="contact-accordion-controller"class="accordion-control">Send us a Message</a>
			<div class="accordion" id="contact-accordion" data-controller="#contact-accordion-controller">
			<?php echo do_shortcode('[gravityform id="1" name="Contact Form" title="false" description="false"]'); ?>
				<!--<form id="contact-form" >
									<fieldset>
						<label for="name-field">Name</label>
						<input type="text" name="name-field" value="" placeholder="Give me a name Atreyu!" />
					</fieldset>
					<fieldset>
					<label for="email-field">Email</label>
					<input type="text" name="email-field" value="" placeholder="We can't get back at you without your email address" />
					</fieldset>
					<fieldset>
						<label for="note-field">Note</label>
						<textarea name="note-field" value="" placeholder="Please limit yourself to a minimum of vulgarity and profanity" ></textarea>
					</fieldset>
					<input type="submit" name="contact-submit" value="Submit" />
				</form>-->
				</div>
			</div>
			<div id="main-hand-contact" class="hand"><span class="fredericka">Imagine Design Build</div>
		</div><!--end post box -->
	</div><!-- end contact-wrapper -->
</div><!-- end contact section -->
