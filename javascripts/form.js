jQuery(document).ready(function($) {

	jQuery('.select2').not('.select2--theme-material').select2({
		minimumResultsForSearch: -1,
		placeholder: jQuery(this).data('placeholder'),
		width: 'style',
		//closeOnSelect: false
	});

	jQuery('.select2.select2--theme-material').select2({
		minimumResultsForSearch: -1,
		placeholder: jQuery(this).data('placeholder'),
		theme: 'material',
		width: 'style',
	});

});
