var current_top_menu_id = '';
var current_top_menu = null;
var header_h = 0;
var currentItemToAdd = null;
var current_button = {};
var current_btn_clicked = false;
var loading = '<i class="fa fa-2x fa-circle-o-notch fa-spin"></i>';
var loading_small = '<i class="fa fa-circle-o-notch fa-spin"></i>';
var max_image_height = parseInt(300);

function scrollToElement(id){
	$("html, body").animate({
		scrollTop: $('#'+id).offset().top - 20
	}, 500);
}

$(document).on('click', '#top_menu .item', function(e){
		
	var current_id = $(this).find('.showElement').attr('data-target');
	var target = $('#'+$(this).find('.showElement').attr('data-target'));
	
	if ($('#main-menu-state').is(':checked')){
		$('#toggleMobileMenu').click();
	}
	
	$('#top_menu .active').removeClass('active');
	
	if (current_top_menu_id == '' || current_top_menu_id !=  current_id){
		if (current_top_menu!=null){
			current_top_menu.fadeOut();
		}
		$(this).addClass('active');
		target.fadeIn();
		current_top_menu = target;
		current_top_menu_id = $(this).find('.showElement').attr('data-target');
	} else {
		target.fadeOut();
		current_top_menu = null;
		current_top_menu_id = '';
	}	
	
});

$(document).on('click', '#toggleMobileMenu', function(){
	if (current_top_menu!=null){
		current_top_menu.fadeOut();
		current_top_menu = null;
		current_top_menu_id = '';
	}
})

function productImages(){
	var ww = $(window).width();
	if (ww <= 767){
		$('.product_container').each(function(){
			var items = $(this).find('.product_preview_img');
			items.each(function(){
				$(this).css({'height': max_image_height, 'minHeight': max_image_height, 'lineHeight': max_image_height+'px'});
				$(this).find('img').css({'maxHeight': max_image_height+'px'});
			})
		})
	} else {
		$('.product_container').each(function(){
			var items = $(this).find('.product_preview_img');
			var w = null;
			items.each(function(){
				//console.log($(this).width());
				if (w == null){ 
					if ($(this).width()>0){
						w = $(this).width(); 
					}
				}
				if (w > max_image_height){
					w = max_image_height;
				}
			});
			//console.log('New w : '+w);
			items.each(function(){
				$(this).css({'height': w, 'lineHeight': w+'px', 'minHeight': w+'px'});
				$(this).find('img').css({'maxHeight': w});
				//$(this).closest('.product_preview').find('.product_quantity_select').css('height', 'auto');
			});
		})
	}
}

function headerResize(){
	$('header .heading').css('height', 'auto');
	var natural_h =  $('header .heading a').outerHeight(); 
	var header_h = $('header #top_menu').outerHeight(); 
	if (natural_h<=header_h){
		$('header .heading').css('height', header_h);
	}
}

$(document).ready(function(){
	$('.vertical-menu').smartmenus({
		hideOnClick: false
	})
})

$(function() { 
	var toggles = $('.vertical-menu-state');
	toggles.each(function(){
		var $mainMenuState = $(this);
		if ($mainMenuState.length) {
			$mainMenuState.change(function(e) {
				var $menu = $($(this).attr('data-target'));
				if (this.checked) {
					$menu.hide().slideDown(250, function() { $menu.css('display', ''); });
				} else {
					$menu.show().slideUp(250, function() { $menu.css('display', ''); });
				}
			});
			$(window).bind('beforeunload unload', function() {
				if ($mainMenuState[0].checked) {
					$mainMenuState[0].click();
				}
			});
		}
	})
});


$(document).on('click', '.qt-down', function(e){
	
	e.preventDefault();
	$('.overquantity').fadeOut();
	
	var steps = parseInt($(this).parent().attr('data-step'));
	var minQuantity = parseInt($(this).parent().attr('data-min'));
	var current = parseInt($(this).parent().find('.quantity').html());
	var newq = current - steps;
	
	if ($(this).hasClass('fromCart')){
		
		// can have 0 quantity and the item will be removed from cart
		$(this).parent().find('.quantity').html(newq);
		$(this).parent().find('.quantity_input').val(newq);
		$('#formCartQuantity').submit();
		
	}  else {
		if (newq < minQuantity)
			newq = minQuantity;
		if (newq < 0) newq = minQuantity;
		$(this).parent().find('.quantity').html(newq);
	}
})

$(document).on('click', '.qt-up', function(e){
	e.preventDefault();
	$('.overquantity').fadeOut();
	var steps = parseInt($(this).parent().attr('data-step'));
	var current = parseInt($(this).parent().find('.quantity').html());
	var newq = current + steps;
	if ($(this).hasClass('fromCart')){
		var max = parseInt($(this).parent().attr('data-max'));
		var unlimited = (parseInt($(this).parent().attr('data-unlimited')) == 1);
		if (newq <= max || unlimited ){
			$(this).parent().find('.quantity').html(newq);
			$(this).parent().find('.quantity_input').val(newq);
			$('#formCartQuantity').submit();
		} else {
			$(this).parent().parent().find('.overquantity').fadeIn();
		}
	} else {
		$(this).parent().find('.quantity').html(newq);
	}
})

function addToCart(itemUID, quantity, superkey,callback){
	var event_obj = { 'itemUID' :  itemUID, 'quantity' : quantity, 'superkey' : superkey  };
	$(document).trigger('storeden.cart.add.item', [event_obj]);
	Storeden.postProduct(itemUID, quantity, superkey, callback);
}

function updateCartQuantity(result){ 
	
	var event_obj = { 'itemUID' :  currentItemToAdd, 'result' : result };
	$(document).trigger('storeden.cart.add.item-callback', [event_obj]);
	
	if (result.over_quantity == false){
		$('.quantity_select_'+currentItemToAdd).find('.alert-success').removeClass('hide');
	} else {
		$('.quantity_select_'+currentItemToAdd).find('.alert-warning').removeClass('hide');
	}
	
	if (result.count == 0) {
		$('.cart_item').removeClass('with_values');
		$('#cart_preview').removeClass('cart_with_values');
	} else {
		$('.cart_item').addClass('with_values');
		$('#cart_preview').addClass('cart_with_values');
	}
	$('.cart_items_count').html(result.count);
	$('.cart_items_total').html(Storeden.parsePrice(result.total));
	resetButton();
}

function checkAvailableFromPreview(available, minQuantity, itemUID, unlimited) {
	if ( ! (typeof available === 'undefined')) {
		if (available.available >= minQuantity || unlimited == 1) {
			$('.quantity_select_'+itemUID+' .add-to-cart').show();
		} else { 
			$('.quantity_select_'+itemUID+' .add-to-cart').hide();
		}
		$('.quantity_select_'+itemUID+' .add-to-price').html(Storeden.parsePrice(available.final_price));
	} else {
		$('.quantity_select_'+itemUID+' .add-to-cart').hide();
	}
}

$(document).on('click', '.add-to-cart', function(e){
	e.preventDefault();
		
	var itemUID = $(this).attr('data-uid');
	$('.quantity_select_'+itemUID).find('.alert').addClass('hide');
	
	var disabled = $(this).hasClass('disabled');
	if (!disabled){
		loadingButton($(this), $(this).html(), 'html');
		$(this).parent().parent().find('.alert').addClass('hide');
		var quantity = parseInt($(this).closest('.quantity_select').find('.quantity').html());
		var hasVariants = $(this).attr('data-variants') == 'true';
		var superkey = '';
		if (hasVariants){
			var combination = [];
			var container = $(this).closest('.quantity_select');
			var select = container.find('.var_select');
			select.each(function(e){
				combination.push(''+$(this).val())
			});
			var superkey = Storeden.createSuperKey(combination);
		}
		currentItemToAdd = itemUID;
		var minQuantity = $(this).closest('.quantity_select').attr('data-min');
		$(this).closest('.quantity_select').find('.quantity').html(minQuantity);
		addToCart(itemUID, quantity, superkey, updateCartQuantity);
		
	}
})

$(document).on('click', '.product_preview .show-add-to-cart', function(e){
	e.preventDefault();
	//close other 
	$('.product_quantity_select.show').find('.close_q').click();
	var variants = $(this).attr('data-variants');
	$(this).addClass('disabled');
	$(this).closest('.product_preview').find('.product_quantity_select').addClass('item_clicked');
	if (variants == 'true') {
		var itemUID = $(this).attr('data-uid');
		Storeden.getItem(itemUID, prepareItem);
	} else {
		$('.item_clicked').addClass('show');
		$('.item_clicked').removeClass('item_clicked');
	}
})

function setUpKey(i) {
	var key = i.replace(' ', '_');
	key = key.replace('/', '_');
	key = key.replace('.', '_');
	return key;
}

function prepareItem(item){
	
	var currency = '&euro;';
	var vars = item.vars;
	var variants = item.variants;
	var htmlVars = '';
	var minQuantity = parseInt(item.data.minQuantity);
	var step = parseInt(item.data.step);
	var htmlVars = '';
	var html = '';
	
	// check if there is an available variant
	var price = item.final_price;
	var available = Storeden.getAvailables(variants)[0];
	if ( ! (typeof available === 'undefined')) {
		if (available.quantity >= minQuantity || available.unlimited ) {
			var keys = available.superkey.split('_');
			var price = available.final_price;
		}
	}
	
	html += '<p class="product_preview_price">';
	html += currency+' <span class="price add-to-price">'+Storeden.parsePrice(price)+'</span>';
	html += '</p>';
	
	if (minQuantity > 1 || step > 1) {
		html += '<p>';
		html += '	<small>';
		html += '		Quantità minima  <strong>'+minQuantity+'</strong> pezzi<br>';
		html += '		Successive  <strong>'+step+'</strong> pezzi';
		html += '	</small>';
		html += '</p>';
	}
	
	html += '<div class="variants_container">';
	for ( var j in vars) {

		var value = vars[j];
		var options = value.options;
		var keyF = setUpKey(j);
		
		htmlVars += '<div class="form-group variation">';
		htmlVars += '	<select id="var_'+keyF+'" class="form-control var_select">';
		htmlVars += '		<optgroup label="'+value.title+'">';
		for (var i in options) {
			var valuek = options[i];
			var option = valuek.option;
			var is_current = keys[i] == option.toLowerCase();
			var selected = '';
			if (is_current) {
				selected = 'selected="selected"';
			}
			htmlVars += '<option value="'+option.toLowerCase()+'" '+selected+'>';
			htmlVars +=  	valuek.title;
			htmlVars += '</option>';
		}
		htmlVars += '	    </optgroup>';
		htmlVars += '	</select>';
		htmlVars += '</div>';
	}
	
	html += htmlVars;
	html += '</div>';
	
	html += '<div class="btn-group product_quantity" data-min="'+minQuantity+'" data-step="'+step+'" data-unlimited="'+item.data.unlimited+'">';
	html += '	<button type="button" class="btn button-white qt-down">-</button>';
	html += '	<button type="button" class="btn button-white quantity">'+minQuantity+'</button>';
	html += '	<button type="button" class="btn button-white qt-up">+</button>';
	html += '</div>';
	
	html += '<div class="clearfix"></div>';
	html += '<button class="btn button add-to-cart" data-variants="true" data-uid="'+item.uid+'">';
	html += '	Aggiungi al carrello';
	html += '</button>';
	
	$('.variants_add_to_cart_'+item.uid+' .target').html(html);
	
	$('.variants_add_to_cart_'+item.uid+' .var_select').on('change', function(){
		
		$('.quantity_select_'+item.uid).find('.alert').addClass('hide');
		
		var add_lang = 'Aggiungi al carrello';
		var exausted_lang = 'Non disponibile';
		
		var combination = [];
		var container = $('.quantity_select_'+item.uid);
		var select = container.find('.var_select');
		select.each(function(e){
			combination.push(''+$(this).val())
		});
		
		var superkey = Storeden.createSuperKey(combination);
		var available = Storeden.getVariantParams(variants, superkey);
		var minQuantity = parseInt($(container).find('.product_quantity').attr('data-min'));
		
		if ( ! (typeof available === 'undefined')) {
			if (available.quantity >= minQuantity || available.unlimited) {
				container.find('.add-to-cart').removeClass('disabled').html(add_lang);
				container.find('.product_quantity .quantity').html(minQuantity);
			} else { 
				container.find('.add-to-cart').addClass('disabled').html(exausted_lang);
				container.find('.product_quantity .quantity').html(0);
			}
			container.find('.add-to-price').html(Storeden.parsePrice(available.final_price));
		} else {
			container.find('.add-to-cart').addClass('disabled').html(exausted_lang);
			container.find('.product_quantity .quantity').html(0);
		}
		
	});
	$('.item_clicked').addClass('show');
	$('.item_clicked').removeClass('item_clicked');
}



$(document).on('click', '.product_quantity_select .close_q', function(e){
	e.preventDefault();
	$(this).parent().toggleClass('show');
	$(this).parent().parent().find('.show-add-to-cart').removeClass('disabled');
	$(this).parent().parent().find('.alert').addClass('hide');
})

$(document).on('submit', '#searchForm', function(e){
	e.preventDefault();
	var value = $(this).find('input').val();
	window.location = '/shop/search/'+value;
})

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
		
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
	}
	return "";
}

$(document).on('click', '.change-view', function(e){
	e.preventDefault();
	var type = $(this).attr('data-type');
	setCookie("view-type", type, 20);
	if (type == 'list') {
		$('.shop_product_container .product_wrapper').removeClass('col-md-4 col-sm-6').addClass('col-md-12 col-sm-12 product_list');
	} else {
		$('.shop_product_container .product_wrapper').removeClass('col-md-12 col-sm-12 product_list').addClass('col-md-4 col-sm-6');
	}
	productImages();
})

function getShopCookie(){
	var cookie = getCookie("view-type");
	var w = $(window).width();
	if (cookie == 'list' && w > 767 ) {
		$('.shop_product_container .product_wrapper').removeClass('col-md-4 col-sm-6').addClass('col-md-12 col-sm-12 product_list');
	}
}

function printStars(average, size, container){
	var stars = '';
	for (var i = 1; i<=average; ++i ){
		stars += '<i class="fa fa-star '+size+' fa-lg"></i>';
	}
	if (i-0.5 == average) {
		stars += '<i class="fa fa-star-half-o '+size+' fa-lg"></i>';
		++i;
	}
	for (j = i; j <= 5; ++j) {
		stars += '<i class="fa fa-star-o '+size+' fa-lg"></i>';
	}
	container.html(stars);
}

var modalReview = 0;

$(document).on( 'click', '#showProductReviewsLink', function(){
	if (modalReview == 0) {
		++modalReview;
		var uid = $(this).attr('data-uid');
		$('#review-list').html('<div class="text-center">'+loading+'</div>');
		Storeden.getProductReviews(uid, function(res){
			var k = 0;
			for (var i = 0; i < res.list.length; ++i) {
				var review = res.list[i];
				if(review.productUID == uid ){
					++k;
					var html = '<div class="review">';
					html += '<p class="stars" id="stars_'+i+'"></p>';
					html += '<p>';
					html += review.text;
					html += '<br><small>'+review.date+' - '+review.user+' </small>';
					html += '</p>';
					html += '</div>';
					if (k == 1)	
						$('#review-list').html(html);
					else 
						$('#review-list').append(html);
					printStars( review.stars  , '', $('#stars_'+i));
				}
			}
		});
	}
});

function setNotAvailable(){ 
	$('#add-to-cart').prop('disabled',true).addClass('disabled');
	$('#add-to-cart').html('Non disponibile');
	$('#product_quantity .quantity').html('0');
}

function setAvailable(){ 
	$('#add-to-cart').prop('disabled',false).removeClass('disabled');
	$('#add-to-cart').html('Aggiungi al carrello');
	$('#product_quantity .quantity').html(minQuantity);
}
	
function checkAvailable(available) {
	if ( ! (typeof available === 'undefined')) {
		if (available.image != '' && available.image != null && available.image != 'null') {
			changeImage(available.image);
		} else {
			changeImage(main_image);
		}
		if (available.quantity >= minQuantity || available.unlimited) {
			setAvailable();
		} else { setNotAvailable(); }

		if (available.sku != '') {
			$('#sku').html(available.sku);
		} else {
			$('#sku').html(main_sku);
		}
		if (available.ean13 != '') {
			$('#ean').html(available.ean13);
		} else {
			$('#ean').html(main_ean);
		}
		$('#product_page_price .price span').html(Storeden.parsePrice(available.price));
		$('#product_page_price .final_price span').html(Storeden.parsePrice(available.final_price));

	} else {
		setNotAvailable();
	}
}
	
$(document).on('change', '#product_page .var_select', function(e){
	var combination = [];
	$('#product_page .var_select').each(function(e){
		combination.push(''+$(this).val())
	});
	var superkey = Storeden.createSuperKey(combination);
	var res = Storeden.getVariantParams(variants, superkey);
	checkAvailable(res);
})

function changeImage(image){
	if (image != '') {
		$('#main-img').attr('src', image);
		$('#main-img').parent().attr('href', image);
		$('#main-img').parent().attr('data-gallery', image);
	}
}

$(document).on('click', '#related_images .item a', function(e){
	e.preventDefault();
	var image = $(this).attr('href');
	changeImage(image);
});

function relatedImageHeight(){
	var items = $('#related_images .img-wrap');
	if (items.length > 0) {
		var w = 0;
		items.each(function(){
			if (w==0){
				w = $(this).width();
			}
			$(this).css({'height': w, 'lineHeight': w+'px'});
			$(this).find('img').css({'maxHeight': w});
		});
	}
}

$(document).on('click', '.btn-wishlist', function(e){
	e.preventDefault();
	var itemUID = $(this).attr('data-uid');
	var btn = $(this);
	btn.find('.fa').toggleClass('fa-heart').toggleClass('fa-heart-o');
	var event_obj = { 'itemUID' :  itemUID };
	Storeden.wish(itemUID, function(res){
		if (res.hasWish == 0) {
			btn.find('.fa').removeClass('fa-heart').addClass('fa-heart-o');
			$(document).trigger('storeden.remove.from.wishlist', [event_obj]);
		} else {
			btn.find('.fa').addClass('fa-heart').removeClass('fa-heart-o');
			$(document).trigger('storeden.add.to.wishlist', [event_obj]);
		}
	});
})

$(document).on('click', '#perpage a', function(e){
	e.preventDefault();
	var val = $(this).attr('id');
	perpage = val;
	page = 1; // restart from first page!
	pageReload();
})

$(document).on('click', '#sort a', function(e){
	e.preventDefault();
	var val = $(this).attr('id');
	var exp = val.split('_');
	orderField = exp[0];
	orderType = exp[1];
	page = 1; // restart from first page
	pageReload();
})

function pageReload(){
	var url = '?';
	url += 'sort-order-field='+orderField;
	url += '&sort-order-type='+orderType;
	url += '&page='+page;
	url += '&product-page='+perpage;
	window.location = url;
}

function cartRowHeight(){
	$('.cart_table_row').each(function(){
		var h = $(this).height();
		var hh = $(this).find('.cart_table_content').height();
		var margin = parseInt((h-hh)/2);
		$(this).find('.cart_table_content').css('marginTop', margin);
	})
}

function getMainAddresse(addresses){
	for (var i in addresses) {
		var add = addresses[i];
		if (add.principal == 1) {
			return add;
		}
	}
	return null;
}

function listStates(container, res){
	var select = container.find('.listStates');
	var current =  select.attr('data-current');
	var options = '<option></option>';

	for (var i in res) {
		var state = res[i];
		if (current != '' && current == state['uid'])
			options += '<option value="'+state['uid']+'" selected="selected">'+state['name']+'</option>';
		else
			options += '<option value="'+state['uid']+'">'+state['name']+'</option>';
	}
	select.html(options);
}

$(document).on('change', '.switch input', function(e){
	var checked = $(this).is(':checked');
	if (checked) {
		$(this).parent().addClass('active');
	} else { 
		$(this).parent().removeClass('active');
	}
})

function addAddress(fullname, addr1, city, zip, state, country, email, phone, vat, callback){
	Storeden.addAddress(fullname, addr1, city, zip, state, country, email, phone, vat, callback);
}

function editAddress(id,fullname, addr1, city, zip, state, country, email, phone, vat, callback){
	Storeden.editAddress(id,fullname, addr1, city, zip, state, country, email, phone, vat, callback);
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function resetButton(){
	// release current button, related action is completed
	if (current_btn_clicked){
		var button = current_button.button;
		if (current_button.type == 'text') {
			button.text(current_button.label);
		} else if (current_button.type == 'html'){
			button.html(current_button.label);
		}
		button.removeClass('disabled');
		button.prop('disabled', false);
		current_button = {};
		current_btn_clicked = true;
	}
}
function loadingButton(button, button_text, type){
	// set loading icons to button until action is completed
	current_btn_clicked = true;
	current_button.label = button_text;
	current_button.button = button;
	current_button.type = type;
	button.html(loading_small);
	button.addClass('disabled');
	button.prop('disabled', true);
}

function loginCallback(res){
	resetButton();
	if (res.status == false) {
		$('#error_login').fadeIn();
	} else {
		$('#error_login').fadeOut();
		window.location = '/';
	}
}

function loginCallbackFromCart(res){
	resetButton();
	if (res.status == false) {
		$('#error_login').fadeIn();
	} else {
		$('#error_login').fadeOut();
		window.location = '/cart';
	}
}
function registrationCallback(res){ 
	resetButton();
	if (res.error != null) {
		$('#error_registration').fadeIn();
	}
	if (res.error == 'email-already-used') {
		$('#error_registration_email').fadeIn();
	} 
	if (res.error == null) {
		$('#error_registration').fadeOut();
		$('#error_registration_email').fadeOut();
		window.location = '/';
	}
}

function registrationCallbackFromCart(res){
	resetButton();
	if (res.error != null) {
		$('#error_registration').fadeIn();
	}
	if (res.error == 'email-already-used') {
		$('#error_registration_email').fadeIn();
	} 
	if (res.error == null) {
		$('#error_registration').fadeOut();
		$('#error_registration_email').fadeOut();
		window.location = '/cart';
	}
}

function doLogin(email,password,callback){
	var errors = 0;
	if (email == '' || !(validateEmail(email))){
		++errors;
		$(this).find('.email').parent().addClass('has-error');
	}
	if (password == '' ){
		++errors;
		$(this).find('.password').parent().addClass('has-error');
	}
	if (errors == 0) {
		Storeden.login(email, password, callback);
	} else {
		resetButton();
		$('#error_login').fadeIn().delay(6000).fadeOut();
	}
}

$(document).on('click', '.login-from-cart', function(e){
	e.preventDefault();
	loadingButton($(this), $(this).html(), 'html');
	$(this).html(loading_small);
	var callback = loginCallbackFromCart;
	var email = $('#guest_signin').find('.email').val();
	var password = $('#guest_signin').find('.password').val();
	doLogin(email,password,callback);
})

$(document).on('submit', '#formLogin form', function(e){
	e.preventDefault();
	loadingButton($('#formLogin button'), $('#formLogin button').text(), 'text');
	var callback = loginCallback;
	var email = $(this).find('.email').val();
	var password = $(this).find('.password').val();
	doLogin(email,password,callback)
})


function doRegistration(fullname, lang, email, password, checkPassword, registrationCallback){
	var errors = 0;
	if (fullname == '' ){
		++errors;
		$(this).find('.fullname').parent().addClass('has-error');
	}
	if (lang == '' ){
		++errors;
		$(this).find('.language').parent().addClass('has-error');
	}
	if (email == '' || !(validateEmail(email))){
		++errors;
		$(this).find('.email').parent().addClass('has-error');
	}
	if (password == '' || password.length < 8){
		++errors;
		$(this).find('.password').parent().addClass('has-error');
	}
	if (checkPassword == '' || checkPassword.length < 8){
		++errors;
		$(this).find('.repassword').parent().addClass('has-error');
	}
	if (password.length <= 6){
		++errors;
		$('#error_chars_pw').fadeIn();
		$(this).find('.password').parent().addClass('has-error');
	}
	if (checkPassword !=  password){
		++errors;
		$('#error_different_pw').fadeIn();
		$(this).find('.repassword').parent().addClass('has-error');
	}
	
	if (errors == 0) {
		Storeden.register(fullname, email, password, checkPassword, lang, registrationCallback);
	} else {
		resetButton();
		$('#error_registration').fadeIn().delay(6000).fadeOut();
	}
}

$(document).on('click', '.register-from-cart', function(e){
	e.preventDefault();
	loadingButton($(this), $(this).html(), 'html');
	var fullname = $('#guest_register').find('.fullname').val();
	var lang = $('#guest_register').find('.language').val();
	var email = $('#guest_register').find('.email').val();
	var password = $('#guest_register').find('.password').val();
	var checkPassword = $('#guest_register').find('.repassword').val();
	doRegistration(fullname, lang, email, password, checkPassword, registrationCallbackFromCart);
})

$(document).on('submit', '#formRegistration form', function(e){
		
	e.preventDefault();
	loadingButton($('#formRegistration button'), $('#formRegistration button').text(), 'text');
	var fullname = $(this).find('.fullname').val();
	var lang = $(this).find('.language').val();
	var email = $(this).find('.email').val();
	var password = $(this).find('.password').val();
	var checkPassword = $(this).find('.repassword').val();
	doRegistration(fullname, lang, email, password, checkPassword, registrationCallback);
})

$(document).on('change paste keyup', '.registration_email', function(e){
	Storeden.isEmailNotRegistered($(this).val(), function(res){
		if (res) {
			$('#error_registration_email').show();
			$('#formRegistration .button').hide();
		} else {
			$('#formRegistration .button').show();
			$('#error_registration_email').hide();
		}
	})
})

$(document).on('change, paste, keyup', '.formRegistration .form-control', function(){
	var val =  $(this).val();
	var parent =  $(this).parent();
	var form = $(this).closest('.formRegistration');
	var type = $(this).attr('type');
	if (type == 'password'){
		var other_val = '';
		var other_field = null;
		if ($(this).hasClass('password')){
			other_field = form.find('.repassword');
			other_val = other_field.val();
		} else {
			other_field = form.find('.password');
			other_val = other_field.val();
		}
		if ( val!='' && other_val != '' && val != other_val) {
			parent.addClass('has-error');
			other_field.parent().addClass('has-error');
			$('#error_different_pw').fadeIn();
		} else {
			parent.removeClass('has-error');
			other_field.parent().removeClass('has-error');
			$('#error_different_pw').fadeOut();
		}
		if ( val != '' || other_val != '' ){
			if (val.length < 8 || other_val.length < 8) {
				$('#error_chars_pw').fadeIn();
			} else {
				$('#error_chars_pw').fadeOut();
			}
		}
	} else {
		if (type == 'email') {
			if (val == '' || !(validateEmail(val)) ) {
				parent.addClass('has-error');
			} else {
				parent.removeClass('has-error');
			}
		} else {
			if (val != '') {
				parent.removeClass('has-error');
			} else {
				parent.addClass('has-error');
			}
		}
	}
})

$(document).on('change, paste, keyup', '.formLogin .form-control', function(){
	var val =  $(this).val();
	var parent =  $(this).parent();
	var type = $(this).attr('type');
	if (type == 'email' || type == 'EMAIL') {
		if (val == '' || !(validateEmail(val)) ) {
			parent.addClass('has-error');
		} else {
			parent.removeClass('has-error');
		}
	} else {
		if (val != '') {
			parent.removeClass('has-error');
		} else {
			parent.addClass('has-error');
		}
	}
})

// with comma on decimals
function parsePrice(price) {
	if (price != '' ){
		var amount = price.toFixed(2).toString();
		var ret = '';
		if (amount.match(/^\,\d+/)) {
			ret = "0" + amount;
		} else {
			ret = amount;
		}
		return ret.replace('.', ',');
	} return 0;
}

//CHANGE PASSWORD ---> from profile page
$(document).on('submit', '#formPassword', function(e){
	e.preventDefault();
	$('.alert-pw').stop().hide();
	var email = $(this).find('#emailCheck').val();
	var oldPassword = $(this).find('input[name="oldpassword"]').val();
	var newPassword = $(this).find('input[name="password"]').val();
	var checkPassword = $(this).find('input[name="repassword"]').val();
	Storeden.editPassword(email, oldPassword, newPassword, checkPassword, function(res){
		if (res.error == null) {
			$('#success').fadeIn().delay(5000).fadeOut();
		} else {
			$('#'+res.error).fadeIn().delay(5000).fadeOut();
		}
	});
})

//remove address listener
$(document).on('click', '.remove-address', function(e){
	e.preventDefault();
	loadingButton($(this), $(this).html(), 'html');
	var id = $(this).attr('data-id');
	Storeden.removeAddress(id,function(res){
		resetButton();
		if (typeof res != 'undefined'){
		if (res.id != '') {
				$('#'+res.id).fadeOut('600');
			}
		}
	});
})


function getStates(container, res){
	var select = container.find('.listStates');
	var current =  select.attr('data-current');
	var options = '<option></option>';
	for (var i in res) {
		var state = res[i];
		if (current != '' && current == state['uid'])
			options += '<option value="'+state['uid']+'" selected="selected">'+state['name']+'</option>';
		else
			options += '<option value="'+state['uid']+'">'+state['name']+'</option>';
	}
	select.html(options);
}
function getCountries(res){
	var box = $('.listCountry');
	box.each(function(){
		var container = $(this).closest('.list-country-state');
		var options = '<option></option>';
		var current =  $(this).attr('data-current');
		if (current == '' && STOREDEN_COUNTRY_ID > 0) {
			current = STOREDEN_COUNTRY_ID;
		}
		for (var i in res) {
			var country = res[i];
			if (current != '' && current == country['uid']) {
				options += '<option value="'+country['uid']+'" selected="selected">'+country['name']+'</option>';
			} else { 
				options += '<option value="'+country['uid']+'">'+country['name']+'</option>';
			}
		}
		$(this).html(options);
		if (current != '')	 {
			Storeden.getStates(current, function(res){
				getStates(container, res);
			});
		}
	})
}

$(document).on('change', '.listCountry', function(e){
	var id = $(this).val();
	var container = $(this).closest('.list-country-state');
	Storeden.getStates(id, function(res){
		getStates(container, res);
	});
})

$(document).on('submit', '#address_profile', function(e){
	e.preventDefault();
	loadingButton( $('#address_profile .button'), $('#address_profile .button').html(), 'html' );
	
	var fullname = $(this).find('.fullname').val();
	var email = $(this).find('.email').val();
	var phone = $(this).find('.phone').val();
	var vat = $(this).find('.vat').val();
	var addr1 = $(this).find('.addr1').val();
	var city = $(this).find('.city').val();
	var state = $(this).find('.state').val();
	var zip = $(this).find('.zip').val();
	var country = $(this).find('.country').val();
	
	var errors = checkAddressErrors(fullname, email, phone, vat, addr1, city, state, zip, country);
	
	if (errors == 0) {
		$('#address_error').addClass('hide');
		if ($('#address_profile button').attr('id') == 'editAddress'){
			var id = $(this).find('.address_id').val();
			editAddress(id,fullname, addr1, city, zip, state, country, email, phone, vat, checkAddress);
		} else {
			addAddress(fullname, addr1, city, zip, state, country, email, phone, vat, checkAddress);
		}
	} else {
		resetButton();
		$('#address_error').removeClass('hide');
	}
})

function checkAddressErrors(fullname, email, phone, vat, addr1, city, state, zip, country){
	
	var errors = 0;
	var container = $('#address_profile');
	var vat_required = false;
	
			vat_required = true;
		
	if (vat == '' && vat_required ){
		++errors;
		container.find('.vat').parent().addClass('has-error');
	} else {container.find('.vat').parent().removeClass('has-error');}
	 
	if (fullname == ''){
		++errors;
		container.find('.fullname').parent().addClass('has-error');
	}else {container.find('.fullname').parent().removeClass('has-error');}
	 
	if (phone == ''){
		++errors;
		container.find('.phone').parent().addClass('has-error');
	}else {container.find('.phone').parent().removeClass('has-error');}
	 
	if (addr1 == ''){
		++errors;
		container.find('.phone').parent().addClass('has-error');
	}else {container.find('.phone').parent().removeClass('has-error');}
	 
	if (city == ''){
		++errors;
		container.find('.city').parent().addClass('has-error');
	}else {container.find('.city').parent().removeClass('has-error');}
	 
	if (state == ''){
		++errors;
		container.find('.state').parent().addClass('has-error');
	}else {container.find('.state').parent().removeClass('has-error');}
	 
	if (zip == ''){
		++errors;
		container.find('.zip').parent().addClass('has-error');
	}else {container.find('.zip').parent().removeClass('has-error');}
	 
	if (country == ''){
		++errors;
		container.find('.country').parent().addClass('has-error');
	}else {container.find('.country').parent().removeClass('has-error');}
	 
	if (email == '' || !(validateEmail(email)) ){
		++errors;
		container.find('.email').parent().addClass('has-error');
	}else {container.find('.email').parent().removeClass('has-error');}
	 
	return errors;
}

$(document).on('change paste keyup', '#address_profile .form-control', function(){
	
	var val = $(this).val();
	var type = $(this).attr('type');
	var parent = $(this).parent();
	var required = $(this).attr('required');
	
	var is_vat_field = $(this).hasClass('vat');
	var vat_required = false;
			vat_required = true;
		
	if (type == 'email') {
		if (val == '' || !(validateEmail(val)) ) {
			parent.addClass('has-error');
		} else {
			parent.removeClass('has-error');
		}
	} else {
		if (is_vat_field && vat_required ){
		if (val != '') {
				parent.removeClass('has-error');
			} else {
				parent.addClass('has-error');
			}
		} else {
			if (val != '') {
				parent.removeClass('has-error');
			} else {
				parent.addClass('has-error');
			}
		}
	}
	
})

function checkAddress(res) {
	resetButton();
	if (typeof res === 'undefined'){
		$('#address_error').removeClass('hide');
	} else {
		if (res.result == 'success'){
			$('#address_error').addClass('hide');
			window.location = '/profile/addresses';
		} else {
			$('#address_error').removeClass('hide');
			var types = res.types;
			for (var i in types) {
				var type = types[i];
				$('.'+type).parent().addClass('has-error');
			}
		}
	}
}
	
$(document).on('click', '#select_time a', function(e){
	e.preventDefault();
	orders_time =  $(this).parent().attr('data-value');
	var url = '/orders?time='+orders_time+'&status='+orders_status;
	window.location = url;
});

$(document).on('click', '#ording-type a', function(e){
	e.preventDefault();
	orders_status =  $(this).parent().attr('data-value');
	var url = '/orders?time='+orders_time+'&status='+orders_status;
	window.location = url;
});	 
	 
$(document).on('submit', '#search-order', function(e){
	e.preventDefault();
	var id = $(this).find('input').val();
	window.location = '/order/'+id;
})

$(document).on('click', '.set-main', function(e){
	e.preventDefault();
	var id = $(this).attr('data-id');
	Storeden.setMainAddress(id, function(){
		window.location = window.location;
	});
})
	 
$(document).on('click', '.btn-received', function(e){
	e.preventDefault();
	var id = $(this).attr('data-id');
	Storeden.setOrderAsReceived(id, function(res){ window.location = window.location; })
});
	 
$(document).on('submit', '.send-message', function(e){
	e.preventDefault();
	loadingButton($('#sendMessageFromOrder'), $('#sendMessageFromOrder').html(), 'html');
	var message = $(this).find('#message').val();
	if (message != '') {
		$('mailto:hoangkien4nb@gmail.com #error_mess').addClass('hide');
		Storeden.sendMessage(message, function(res){
			if (res.result == 'success') {
				window.location = '/messages';
			} else {
				$('mailto:hoangkien4nb@gmail.com #error_mess').removeClass('hide');
				resetButton();
			}
		});
	} else {
		$('mailto:hoangkien4nb@gmail.com #error_mess').removeClass('hide');
		resetButton();
	}
})
	 
$(document).on('click', '.openPopup', function(e){
	e.preventDefault();
	var href = $(this).attr('href');
	var width = 500;
	var height = 500;
	PopupHandler(href,width,height);
})

function PopupHandler(href,width,height) {
	var px = Math.floor(((screen.availWidth || 1024) - width) / 2);
	var py = Math.floor(((screen.availHeight || 700) - height) / 2);
	var popup = window.open(href, "social", 
				"width="+width+",height="+height+
				",left="+px+",top="+py+
				",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
	popup.focus();
}
	 
$(document).on('shown.bs.modal', '#privacyModal', function(e){
	$('#privacyModal .modal-body').html(loading);
	Storeden.getPrivacy(function(res){
		$('#privacyModal .modal-body').html(res.text);
	});
})

$(document).on('shown.bs.modal', '#conditionsModal', function(e){
	$('#conditionsModal .modal-body').html(loading);
	Storeden.getConditions(function(res){
		$('#conditionsModal .modal-body').html(res.text);
	});
})	 
	
$(document).on('shown.bs.modal', '#storedenPrivacyModal', function(e){	 
	 $('#storedenPrivacyModal .modal-body').html(loading);
	 Storeden.getStoredenPrivacy(function(res){
		$('#storedenPrivacyModal .modal-body').html(res.text);
	});
});	
	 
$(document).on('shown.bs.modal', '#storedenConditionsModal', function(e){
	$('#storedenConditionsModal .modal-body').html(loading);
	Storeden.getStoredenConditions(function(res){
		$('#storedenConditionsModal .modal-body').html(res.text);
	});
})	
	
function getReviews(){
	Storeden.getStoreReviews(function(res){
		$('.store-reviews .loading').addClass('hide');
		if ( res.count == 0 ) {
			$('.reviews-content').addClass('hide');
		} else {
			$('.reviews-content').removeClass('hide');
		}
		$('.reviews-count').html(res.count);
		printStars(res.average, 'fa-lg', $('.block-stars') );

	})
}
 
$(document).on('click', '.pay-now-order', function(e){
	e.preventDefault();
	loadingButton($(this), $(this).html(), 'html');
	var id = $(this).attr('data-id');
	Storeden.payNow(id, function(res){
		if (! (typeof res === 'undefined') ){
			if (res.response == 'success' && res.error == null){
				window.location = res.redirect;
			} else {
				resetButton();
			}
		} else {
			resetButton();
		}
		
	})
})
	 
$(document).on('change paste keyup', '#restorePwEmail', function(){
	Storeden.isEmailNotRegistered( $(this).val() , function(res){
		if(res) {
			$('#restorePwEmail').parent().parent().removeClass('has-error');
			$('#noUserEmailError').addClass('hide');
			$('#restore_password_form .button').removeClass('hide');
		} else {
			$('#restorePwEmail').parent().parent().addClass('has-error');
			$('#noUserEmailError').removeClass('hide');
			$('#restore_password_form .button').addClass('hide');
		}
	})
})
	  
$(document).on('change paste keyup', '#formPasswordReset input', function(){
	var p1 = $('#formPasswordReset .password').val();
	var p2 = $('#formPasswordReset .repassword').val();
	var ok = true;
	if (p1 != '' && p2 != '' && p1 != p2){
		ok = false;
	} 
	if (ok){
		$('#no-match').addClass('hide');
		$('#restore_password_form .button').removeClass('hide');
	} else {
		$('#no-match').removeClass('hide');
		$('#restore_password_form .button').addClass('hide');
	}
})	 
	 
$(document).on('submit', '#formPasswordReset', function(e){
	e.preventDefault();
	var id = $(this).find('#idCheck').val();
	var newPassword = $(this).find('input[name="password"]').val();
	var checkPassword = $(this).find('input[name="repassword"]').val();
	Storeden.resetPassword(id, newPassword, checkPassword, function(res){
		if (res.error == '') {
			window.location = '/login';
		} else {
			$('#'+res.error).removeClass('hide');
		}
	});
})
	
$(document).ready(function(){
	
	headerResize();
	getShopCookie();
	productImages();
	relatedImageHeight();
	cartRowHeight();
	
	$('.btn-tooltip').tooltip();
	
	if ($('.profileLeft .list-country-state').length > 0){
		Storeden.getCountries(getCountries);
	}
	current_button = {};
	$('.store-reviews .loading').html(loading);
	
})

$(window).resize(function(){
	headerResize();
	productImages();
	relatedImageHeight();
	cartRowHeight();
})

 