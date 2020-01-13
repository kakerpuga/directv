jQuery(document).ready(function($) {
	
	jQuery('.steps-header__item').css('cursor','pointer');

	jQuery('.steps-header__item').click(function(event) {

		var current_step = jQuery(this).data('step');
		
		if(current_step!=3){

		jQuery('.steps-header__item').removeClass('steps-header__item--state-active');
		jQuery(this).addClass('steps-header__item--state-active');

		jQuery('.steps__item').removeClass('steps__item--state-active');
		jQuery('.steps__item--step-'+current_step).addClass('steps__item--state-active');

		}

		return false;

	});

	jQuery('.back-button').click(function(event) {

		var current_step = jQuery(this).closest('.steps__item');
		var current_header = jQuery('.steps-header__item--state-active');

		console.log(current_header);
		console.log(current_step);

		current_step.removeClass('steps__item--state-active');
		current_step.prev().addClass('steps__item--state-active');
		current_header.removeClass('steps-header__item--state-active');
		current_header.prev().addClass('steps-header__item--state-active');
		
		return false;

	});

	jQuery("#form").submit(function(){
		
		// Obtencion variables por nombre parámetro
		var source = getParameterByName('utm_source');
		var medium = getParameterByName('utm_medium');
		var campaign = getParameterByName('utm_campaign');
		var term = getParameterByName('utm_term');
		var content = getParameterByName('utm_content');
	   
		if(source==""){
			source="Google"
		}
		if(medium==""){
			medium="LandingPage"
		}
		if(campaign==""){
			campaign="Organic"
		}
		if(term==""){
			term="Organic"
		}
		if(content==""){
			content="directv.la"
		}

		var contact = {
			first_name : $("input[name='first_name']", this).val(),
			last_name : $("input[name='last_name']", this).val(),
			phone_mobile : $("input[name='phone']", this).val(),
			primary_address_state : $('#province-selector').val(),
			primary_address_city : $("input[name='address_city']", this).val(),
			primary_address_street : $("input[name='address_street']", this).val() + " " + $("input[name='address_number']", this).val() 
			+ " piso " + $("input[name='address_floor']", this).val() + " dpto " + $("input[name='address_apartment']", this).val(),
			primary_address_postalcode : $("input[name='address_code']", this).val(),
			lead_source : "MailC",
			assigned_user_id : "9e83017e-9f69-ee7d-2389-5daf36b4736e",
			phone_fax : $("input[name='email']", this).val(),
			dni_c : $("input[name='dni']", this).val(),
			tarjeta_c : $("input[name='mobilePhone']", this).val(),
			plan_c : $('#product-selector').val(),
			pais_c : "Argentina",
			provincia_c : $('#province-selector').val(),
			estado_venta_c : "VentaOnline",
			sub_estado_venta_c : "",
			producto_c : "DTV_AR",
			utmSource : source,
			utmMedium : medium,
			utmCampaign : campaign,
			utmTerm : term,
			utmContent : content
		}
		
		console.log(contact);

		$("input[name='buy_first_name']").val($("input[name='first_name']",this).val());
		$("input[name='buy_last_name']").val($("input[name='last_name']",this).val());
		$("input[name='buy_phone']").val($("input[name='phone']",this).val());
		$("input[name='buy_dni']").val($("input[name='dni']",this).val());
		
		//plan switch 
		var plan;
		var planSpecs;

		switch($('#product-selector').val()) {
			case "gold":
				plan="Plan Oro : $123.900";
			  	planSpecs="Instalación gratis + 2 decodificadores + 2 meses HBO + 2 meses FOX ";
			  	break;
			case "silver":
				plan="Plan Plata : $123.900";
				planSpecs="Instalación gratis + 2 decodificadores + 2 meses HBO + 2 meses FOX ";
			  	break;
			case "bronze":
				plan="Plan Bronce : $123.900";
				planSpecs="Instalación gratis + 2 decodificadores + 2 meses HBO + 2 meses FOX ";
			  	break;
		}

		$.ajax({
            url: 'processor.php',
            type: 'POST',
            data: JSON.stringify(contact),
            contentType: "application/json; charset=utf-8",
            traditional: true,
            success: function (result) {
                     console.log(result);
                     if(result!='success'){
                        $("#error-message").removeClass("no-display");
                     }else{
						$("#plan-suscribed").html(plan);
						$("#plan-specs").html(planSpecs);
						$("#submit-button").attr("disabled", true);
						jQuery('li[data-step=2]').removeClass('steps-header__item--state-active');
						jQuery('li[data-step=3]').addClass('steps-header__item--state-active');
						jQuery('.steps__item--step-2').removeClass('steps__item--state-active');
						jQuery('.steps__item--step-3').addClass('steps__item--state-active');
                        ga('send', 'event', 'prospect', 'form', '', '', '');
                     }
                  }
        });

	});

});

function buyPlan(plan){
	
	console.log(plan);

	jQuery('#product-selector').val(plan);
	jQuery('#product-selector').select2().trigger('change');
	
	jQuery('li[data-step=1]').removeClass('steps-header__item--state-active');
	jQuery('li[data-step=2]').addClass('steps-header__item--state-active');
	jQuery('.steps__item--step-1').removeClass('steps__item--state-active');
	jQuery('.steps__item--step-2').addClass('steps__item--state-active');

	//console.log($("#product-selector :selected").val());

}

function showInfo(plan){
	
	console.log(plan.html());

	if(plan.html().includes("Más")){
		plan.text("Ocultar Info");
		plan.closest('.plans-item').addClass('plans-item--information-open').fadeOut(0).fadeIn(300);
	}else{
		plan.text("Más Info");
		plan.closest('.plans-item').removeClass('plans-item--information-open').fadeOut(0).fadeIn(300);
	}
	
	//console.log($("#product-selector :selected").val());

}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}