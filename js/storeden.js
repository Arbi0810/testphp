"undefined" == typeof Storeden && (Storeden = {}), Storeden.USER_ADDRESS = [], Storeden.PATH_URL = "/restserver", Storeden.isCheckouted = !1, "undefined" == typeof console && (console = {
    log: function() {},
    stack: function() {},
    error: function() {},
    warn: function() {}
});
try {
    $.ajaxSetup({
        cache: !1
    })
} catch (b) {
    console.warn("jquery not loaded yet")
}
Storeden.parsePrice = function(b) {
    var h = b.toFixed(2).toString();
    return h.match(/^\.\d+/) ? "0" + h : h
}, Storeden.setAddresses = function(b) {
    Storeden.USER_ADDRESS = b
}, Storeden.getDefaultAddress = function() {
    return Storeden.USER_ADDRESS.filter(function(b) {
        return 1 == b.principal
    })
}, Storeden.getVariantParams = function(b, h) {
    return b.filter(function(j) {
        return j.superkey.toUpperCase() == "" + h.toUpperCase()
    })[0]
}, Storeden.getAvailables = function(b) {
    return b.filter(function(h) {
        return h.unlimited || 0 < h.quantity
    })
}, Storeden.createSuperKey = function() {
    var b = Array.prototype.slice.call(arguments)[0];
    return 1 < b.length ? b.join("_") : b[0]
}, Storeden.postProduct = function(b, h, j, k, q, v) {
    if (1 > h) return !1;
    var w = {
        url: Storeden.PATH_URL + "/item",
        type: "POST",
        cache: !1,
        data: {
            productUID: b,
            quantity: h,
            variantID: j,
            customization: q,
            exp: v
        },
        success: function(x) {
            try {
                $(document).trigger("Storeden.postProduct", x)
            } catch (z) {}
            "function" == typeof k && k(x)
        }
    };
    $.ajax(w)
}, Storeden.postProductFast = function(b, h, j, k, q) {
    var v = {
        url: Storeden.PATH_URL + "/item",
        type: "POST",
        cache: !1,
        data: {
            productUID: b,
            quantity: h,
            variantID: j,
            customization: q
        },
        success: function(w) {
            try {
                $(document).trigger("Storeden.postProduct", w)
            } catch (x) {}
            "function" == typeof k && k(w)
        }
    };
    $.ajax(v)
}, Storeden.currencySign = function(b) {
    return "EUR" == b ? "&#8364;" : "USD" == b ? "&#36;" : "GBP" == b ? "&#163;" : void 0
}, Storeden.getPayments = function(b, h, j, k, q) {
    var v = {
        url: Storeden.PATH_URL + "/payments",
        type: "POST",
        cache: !1,
        data: {
            cartID: h,
            shipping_country: j,
            shipping_city: k,
            billing_country: q
        },
        success: function(w) {
			// try{
			// 	var ShippingEvent = new Event('ShippingEvent', { cartID: h, shipping_country: j, shipping_city: k, billing_country: q});
			// 	if(document.dispatchEvent){
			// 		document.dispatchEvent(ShippingEvent);
			// 	}else{
			// 		document.fireEvent(ShippingEvent);
			// 	}
			// }catch(err){
			//
			// }

            "function" == typeof b && b(w)
        }
    };
    $.ajax(v)
}, Storeden.getGiftCardPayments = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/giftcard-payments",
        type: "POST",
        cache: !1,
        data: {
            billing_country: h
        },
        success: function(k) {
            "function" == typeof b && b(k)
        }
    };
    $.ajax(j)
}, Storeden.checkShipping = function(b, h, j, k, q) {
    $(document).trigger("Storeden.checkShipping", b);
	var E = $(".add_fields").serializeArray();
    var v = {
        url: Storeden.PATH_URL + "/shipping",
        type: "POST",
        cache: !1,
        data: {
            cart: b,
            state: h,
            country: j,
            complete_address: q,
			//addition_shipping_id: Storeden.global_shipping_id,
			add_fields: E
        },
        success: function(w) {
            "function" == typeof k && k(w)
        }
    };
    $.ajax(v)
}, Storeden.emptyCart = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/cart.remove.js",
        type: "POST",
        cache: !1,
        data: {
            cart: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.login = function(b, h, j) {
    var k = {
        url: Storeden.PATH_URL + "/login",
        type: "POST",
        data: {
            credential_id: b,
            credential_password: h
        },
        success: function(q) {
            "function" == typeof j && j(q)
        }
    };
    $.ajax(k)
}, Storeden.getCountry = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/country.js",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.getCountries = function(b) {
    var h = {
        url: Storeden.PATH_URL + "/countries.js",
        type: "POST",
        cache: !1,
        data: {},
        success: function(j) {
            "function" == typeof b && b(j)
        }
    };
    $.ajax(h)
}, Storeden.getState = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/state.js",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.getStates = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/states.js",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.removeItem = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/remove-item.js",
        type: "POST",
        cache: !1,
        data: {
            composite: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.couponValue = function(b, h, j, k) {
    var q = $("#billing_address_id").val(),
        v = $("#shipping_address_id").val();
    if ("" == q || null == q) {
        var w = billingNation;
        null == w && (w = shippingNation)
    }
    var x = "";
    0 < $("#shipping_well [name=email]").val().length && (x = $("#shipping_well [name=email]").val(), 0 < $("#billing_well [name=email]").val().length && (x = $("#billing_well [name=email]").val()));
    var z = $("[name=shipping_method]:checked").val();
    if ("undefined" == typeof shippingNation) var A = "";
    else A = shippingNation;
    if ("undefined" == typeof shippingCity) var B = "";
    else B = shippingCity;
    var C = {
        url: Storeden.PATH_URL + "/coupon.value.js",
        type: "POST",
        cache: !1,
        data: {
            cart: b,
            coupon: h,
            itemTotals: j,
            shipping_address: v,
            billing: q,
            country: w,
            shipping: z,
            shipping_nation: A,
            shipping_city: B,
            user_email: x
        },
        success: function(D) {
            "function" == typeof k && k(D)
        }
    };
    $.ajax(C)
}, Storeden.checkout = function(b, h, j, k, q, v, w, x, z, A, B) {
    if (0 == Storeden.isCheckouted) {
        Storeden.isCheckouted = !0;
        var C = $("#storeden_user_accept_marketing"),
            D = null;
        void 0 !== C.html() && (D = C.is(":checked"));
        var II = $(".digital-invoice-data").serializeArray();
        var E = $(".add_fields").serializeArray(),
            F = {
                url: Storeden.PATH_URL + "/checkout.js",
                type: "POST",
                cache: !1,
                data: {
                    cart: b,
                    billing: h,
                    shipping: j,
                    s_profile: k,
                    p_profile: q,
                    coupon: v,
                    message: w,
                    fermo_id: $("#fermopoint_delivery").val(),
                    isGift: z,
                    giftMessage: A,
                    needInvoice: B,
                    addition_fields: E,
                    accept_marketing: D,
					digital_invoice: II
                },
                success: function(G) {
                    if (Storeden.isCheckouted = !1, "function" == typeof x) {
                        try {
                            $(document).trigger("Storeden.checkout", G), Storeden.sendGoogleData(G.orderID, G.total, q, G.items)
                        } catch (H) {}

						if(G.response == 'validity-error'){
							// Need to show user a modal for errors
							$.ajax({
								url:'/restserver/show-cart-error-modal',
								type: 'POST',
								data: G,
								success: function(Md){
									$('body').append(Md);
									G.response = 'error';
									x(G);
								}
							})
						}else{
							x(G)
						}

                    }
                }
            };
        $.ajax(F)
    }
}, Storeden.sendGoogleData = function(b, h, j, k) {
    if ($("html").hasClass("disable-analytics-on-cart")) return !1;
    try {
        if ("undefined" != typeof ga) {
            var q = {
                id: "" + b,
                revenue: "" + h,
                affiliation: "" + j
            };
            $.each(k, function(v, w) {
                ga("ecommerce:addItem", {
                    id: "" + b,
                    name: "" + w.title,
                    sku: "" + w.sku,
                    price: "" + w.price,
                    quantity: "" + w.count
                }), ga("storeden.ecommerce:addItem", {
                    id: "" + b,
                    name: "" + w.title,
                    sku: "" + w.sku,
                    price: "" + w.price,
                    quantity: "" + w.count
                })
            }), ga("ecommerce:addTransaction", q), ga("storeden.ecommerce:addTransaction", q), ga("ecommerce:send"), ga("storeden.ecommerce:send")
        }
    } catch (v) {}
}, Storeden.addAddress = function(b, h, j, k, q, v, w, x, z, A) {
    var B = {
        url: Storeden.PATH_URL + "/add_address",
        type: "POST",
        cache: !1,
        data: {
            fullname: b,
            addr1: h,
            city: j,
            zip: k,
            state: q,
            country: v,
            email: w,
            phone: x,
            vat: z
        },
        success: function(C) {
            "function" == typeof A && A(C)
        }
    };
    $.ajax(B)
}, Storeden.editAddress = function(b, h, j, k, q, v, w, x, z, A, B) {
    var C = {
        url: Storeden.PATH_URL + "/edit_address",
        type: "POST",
        cache: !1,
        data: {
            id: b,
            fullname: h,
            addr1: j,
            city: k,
            zip: q,
            state: v,
            country: w,
            email: x,
            phone: z,
            vat: A
        },
        success: function(D) {
            "function" == typeof B && B(D)
        }
    };
    $.ajax(C)
}, Storeden.removeAddress = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/remove_address",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.setMainAddress = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/set_main_address",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.getItem = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/get_item",
        type: "POST",
        cache: !1,
        data: {
            itemUID: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.isEmailNotRegistered = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/check_email",
        type: "POST",
        data: {
            email: b
        },
        success: function(k) {
            "function" == typeof h && h(k.exists)
        }
    };
    $.ajax(j)
}, Storeden.register = function(b, h, j, k, q, v) {
    var w = $("#storeden_accept_marketing"),
        x = !1;
    void 0 !== w.html() && (x = w.is(":checked"));
    var z = {
        url: Storeden.PATH_URL + "/register",
        type: "POST",
        cache: !1,
        data: {
            email: h,
            fullname: b,
            password: j,
            repassword: k,
            lang: q,
            accept_marketing: x
        },
        success: function(A) {
            $(document).trigger("Storeden.register", A), "function" == typeof v && v(A)
        }
    };
    $.ajax(z)
}, Storeden.editPassword = function(b, h, j, k, q) {
    var v = {
        url: Storeden.PATH_URL + "/change_password",
        type: "POST",
        cache: !1,
        data: {
            email: b,
            oldPassword: h,
            newPassword: j,
            checkPassword: k
        },
        success: function(w) {
            "function" == typeof q && q(w)
        }
    };
    $.ajax(v)
}, Storeden.resetPassword = function(b, h, j, k) {
    var q = {
        url: Storeden.PATH_URL + "/reset-password",
        type: "POST",
        data: {
            id: b,
            password: h,
            checkPassword: j
        },
        success: function(v) {
            "function" == typeof k && k(v)
        }
    };
    $.ajax(q)
}, Storeden.getPrivacy = function(b) {
    var h = {
        url: Storeden.PATH_URL + "/get-privacy",
        type: "POST",
        data: {},
        success: function(j) {
            "function" == typeof b && b(j)
        }
    };
    $.ajax(h)
}, Storeden.getConditions = function(b) {
    var h = {
        url: Storeden.PATH_URL + "/get-conditions",
        type: "POST",
        data: {},
        success: function(j) {
            "function" == typeof b && b(j)
        }
    };
    $.ajax(h)
}, Storeden.getStoredenPrivacy = function(b) {
    var h = {
        url: Storeden.PATH_URL + "/get-storeden-privacy",
        type: "POST",
        data: {},
        success: function(j) {
            "function" == typeof b && b(j)
        }
    };
    $.ajax(h)
}, Storeden.getStoredenConditions = function(b) {
    var h = {
        url: Storeden.PATH_URL + "/get-storeden-conditions",
        type: "POST",
        data: {},
        success: function(j) {
            "function" == typeof b && b(j)
        }
    };
    $.ajax(h)
}, Storeden.sendMessage = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/send-message",
        type: "POST",
        data: {
            message: b,
            type: 0
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.guestCheckout = function(b, h, j, k, q, v, w, x, z, A, B, C, D, E) {
    if (0 == Storeden.isCheckouted) {
        Storeden.isCheckouted = !0;
        var F = $("#storeden_guest_accept_marketing"),
            G = !1;
        void 0 !== F.html() && (G = F.is(":checked"));
		var II = $(".digital-invoice-data").serializeArray();
        var H = $(".add_fields").serializeArray(),
            I = {
                url: Storeden.PATH_URL + "/guest_checkout.js",
                type: "POST",
                cache: !1,
                data: {
                    cart: b,
                    billing: h,
                    shipping: j,
                    s_profile: k,
                    p_profile: q,
                    coupon: v,
                    message: w,
                    createAccount: x,
                    email: z,
                    password: A,
                    fermo_id: $("#fermopoint_delivery").val(),
                    isGift: C,
                    giftMessage: D,
                    needInvoice: E,
                    addition_fields: H,
                    accept_marketing: G,
					digital_invoice: II
                },
                success: function(J) {
                    if(Storeden.isCheckouted = !1, "function" == typeof B) {
						if(J.response == 'validity-error'){
							// Need to show user a modal for errors
							$.ajax({
								url:'/restserver/show-cart-error-modal',
								type: 'POST',
								data: J,
								success: function(Md){
									$('body').append(Md);
									J.response = 'error';
									B(J);
								}
							})
						}else{
							B(J)
						}
					}
                }
            };
        $.ajax(I)
    }
}, Storeden.buyGiftCard = function(b, h, j, k, q, v, w, x) {
    var z = $(".add_fields").serializeArray(),
        A = {
            url: Storeden.PATH_URL + "/checkout-giftcard.js",
            type: "POST",
            cache: !1,
            data: {
                giftID: b,
                address: h,
                fullname: j,
                email: k,
                message: q,
                payment_profile: v,
                attachs: w,
                addition_fields: z
            },
            success: function(B) {
                "function" == typeof x && x(B)
            }
        };
    $.ajax(A)
}, Storeden.setOrderAsReceived = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/set-as-received",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.payNow = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/pay-now",
        type: "POST",
        cache: !1,
        data: {
            id: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.payNowGift = function(b, h, j) {
    var k = {
        url: Storeden.PATH_URL + "/pay-now",
        type: "POST",
        cache: !1,
        data: {
            id: b,
            payment: h
        },
        success: function(q) {
            "function" == typeof j && j(q)
        }
    };
    $.ajax(k)
}, Storeden.getTaxAmount = function(b, h, j, k) {

	var s_a = '';
	var b_a = '';

	try{
		s_a = cart.shipping_address;
		b_a = cart.billing_address;
	}catch(err){}

    var q = {
        url: Storeden.PATH_URL + "/tax-amount",
        type: "POST",
        cache: !1,
        data: {
            id: b,
            country: h,
            shipping_country: k,
			billing_address: b_a,
			shipping_address: s_a
        },
        success: function(v) {
            "function" == typeof j && j(v)
        }
    };
    $.ajax(q)
}, Storeden.wish = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/wish",
        type: "POST",
        data: {
            productUID: b
        },
        success: function(k) {
            $(document).trigger("Storeden.wish", k), "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.sendMessageChat = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/send-message.js",
        type: "POST",
        cache: !1,
        data: {
            message: b,
            type: 0
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.newsletterSubscription = function(b, h, j, k, q) {
    if (!k) return !1;
    var v = {
        url: Storeden.PATH_URL + "/newsletter.js",
        type: "POST",
        data: {
            email: b,
            name: h,
            surname: j
        },
        success: function(w) {
            "function" == typeof q && q(w)
        }
    };
    $.ajax(v)
}, $(document).on("click", "input[name=\"shipping_method\"]", function() {
    if ($("#fermopoint_wrapper").remove(), -1 < $(this).val().indexOf("fermopoint")) {
        $("#payment_methods").hide(), $("#row_final").prepend("<div id=\"fermopoint_wrapper\" class=\"col-md-12\"></div>");
        var b = {
            url: "/restserver/fermopoint-load",
            type: "POST",
            data: {},
            success: function(h) {
                $("#fermopoint_wrapper").html(h)
            }
        };
        $.ajax(b)
    } else $("#payment_methods").show()
}), Storeden.readCookie = function(b) {
    var h = ("; " + document.cookie).split("; " + b + "=");
    return 2 == h.length ? h.pop().split(";").shift() : null
}, Storeden.hideCookieBanner = function(b) {
    var h = $("#cookie-warning > span"),
        j = !1;
    b.target && "cookie-policy-banner" == b.target.id && (j = !0), (!h.is(b.target) && 0 === h.has(b.target).length || j) && 0 < $("#cookie-warning").length && $("#cookie-warning > span").animate({
        right: "-300px"
    }, "slow", function() {
        if (null == Storeden.readCookie("acceptCookie")) {
            days = 182, acceptDate = new Date, myDate = new Date, myDate.setTime(myDate.getTime() + 1e3 * (60 * (60 * (24 * days)))), document.cookie = "acceptCookie = " + acceptDate.getTime() + "; expires = " + myDate.toUTCString() + "; path = /";
            try {
                $(document).trigger("Storeden.platform.cookies.accepted")
            } catch (k) {}
        }
        $("#cookie-warning").remove()
    })
}, Storeden.checkCookie = function() {
    var b = 0 < $("#disabled-cookie-scroll").length,
        h = 0 < $("#disabled-cookie-container").length;
    null == Storeden.readCookie("acceptCookie") && (/(googlebot\/|Googlebot-Mobile|Googlebot-Image|Google favicon|Mediapartners-Google|bingbot|slurp|java|wget|curl|Commons-HttpClient|Python-urllib|libwww|httpunit|nutch|phpcrawl|msnbot|jyxobot|FAST-WebCrawler|FAST Enterprise Crawler|biglotron|teoma|convera|seekbot|gigablast|exabot|ngbot|ia_archiver|GingerCrawler|webmon |httrack|webcrawler|grub.org|UsineNouvelleCrawler|antibot|netresearchserver|speedy|fluffy|bibnum.bnf|findlink|msrbot|panscient|yacybot|AISearchBot|IOI|ips-agent|tagoobot|MJ12bot|dotbot|woriobot|yanga|buzzbot|mlbot|yandexbot|purebot|Linguee Bot|Voyager|CyberPatrol|voilabot|baiduspider|citeseerxbot|spbot|twengabot|postrank|turnitinbot|scribdbot|page2rss|sitebot|linkdex|Adidxbot|blekkobot|ezooms|dotbot|Mail.RU_Bot|discobot|heritrix|findthatfile|europarchive.org|NerdByNature.Bot|sistrix crawler|ahrefsbot|Aboundex|domaincrawler|wbsearchbot|summify|ccbot|edisterbot|seznambot|ec2linkfinder|gslfbot|aihitbot|intelium_bot|facebookexternalhit|yeti|RetrevoPageAnalyzer|lb-spider|sogou|lssbot|careerbot|wotbox|wocbot|ichiro|DuckDuckBot|lssrocketcrawler|drupact|webcompanycrawler|acoonbot|openindexspider|gnam gnam spider|web-archive-net.com.bot|backlinkcrawler|coccoc|integromedb|content crawler spider|toplistbot|seokicks-robot|it2media-domain-crawler|ip-web-crawler.com|siteexplorer.info|elisabot|proximic|changedetection|blexbot|arabot|WeSEE:Search|niki-bot|CrystalSemanticsBot|rogerbot|360Spider|psbot|InterfaxScanBot|Lipperhey SEO Service|CC Metadata Scaper|g00g1e.net|GrapeshotCrawler|urlappendbot|brainobot|fr-crawler|binlar|SimpleCrawler|Livelapbot|Twitterbot|cXensebot|smtbot|bnf.fr_bot|A6-Indexer|ADmantX|Facebot|Twitterbot|OrangeBot|memorybot|AdvBot|MegaIndex|SemanticScholarBot|ltx71|nerdybot|xovibot|BUbiNG|Qwantify|archive.org_bot|Applebot|TweetmemeBot|crawler4j|findxbot|SemrushBot|yoozBot|lipperhey|y!j-asr|Domain Re-Animator Bot|AddThis|gfe|Google PP Default)/i.test(navigator.userAgent) || ($("#cookie-warning").show(), $("#cookie-warning > span").animate({
        right: "0px"
    }, "slow"))), $(document).on("click", "#cookie-accept, #cookie-policy-banner", function(j) {
        Storeden.hideCookieBanner(j)
    }), !1 == h && $(document).mouseup(function(j) {
        Storeden.hideCookieBanner(j)
    }), !1 == b && $(document).scroll(function() {
        Storeden.hideCookieBanner($("#cookie-warning > span"))
    })
}, Storeden.getStoreReviews = function(b) {
    var h = {
        url: Storeden.PATH_URL + "/get-store-reviews",
        type: "POST",
        data: {},
        success: function(j) {
            "function" == typeof b && b(j)
        }
    };
    $.ajax(h)
}, Storeden.getProductReviews = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/get-product-reviews",
        type: "POST",
        cache: !1,
        data: {
            uid: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.setAnalyticsDataSended = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/set-product-analytics-sended",
        type: "POST",
        cache: !1,
        data: {
            orderID: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.hasNewsletterSubscription = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/check-newsletter-status",
        type: "POST",
        cache: !1,
        data: {
            email: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, Storeden.getCartItems = function(b, h) {
    var j = {
        url: Storeden.PATH_URL + "/get-ajax-cart",
        type: "POST",
        cache: !1,
        data: {
            params: b
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}, $(document).ready(function() {
    Storeden.checkCookie()
}), Storeden.setCustomerAcceptMarketing = function(b, h, j, k) {
    var q = {
        url: Storeden.PATH_URL + "/set-customer-accept-marketing",
        type: "POST",
        cache: !1,
        data: {
            userUID: b,
            email: h,
            accept_marketing: j
        },
        dataType: "json",
        success: function(v) {
            "function" == typeof k && k(v)
        }
    };
    $.ajax(q)
}, $(document).on("change", "#storeden_ajax_accept_marketing", function() {
    var b = $(this).attr("data-userUID"),
        h = $(this).attr("data-email"),
        j = $(this).is(":checked");
    Storeden.setCustomerAcceptMarketing(b, h, j, function() {})
}), Storeden.checkBillingEmailForEmailMarketing = function() {
    var b = $("#sameAddress").is(":checked"),
        h = !1;
    void 0 !== $("#step_1_content").html() && (h = !0);
    var j = "";
    0 == storeden_customer.userUID && (j = h ? b ? $("#shipping_well .email").val() : $("#billing_well .email").val() : b ? $("#shipping_well .no-email").val() : $("#billing_well .no-email").val()), Storeden.hasNewsletterSubscription(j, function(k) {
        1 == k.accept_marketing ? ($("#storeden_guest_accept_marketing").prop("checked", !0), $("#storeden_guest_accept_marketing").closest(".switch").addClass("active"), $("#storeden_guest_accept_marketing").closest(".cart_switch").addClass("hide")) : ($("#storeden_guest_accept_marketing").prop("checked", !1), $("#storeden_guest_accept_marketing").closest(".switch").removeClass("active"), $("#storeden_guest_accept_marketing").closest(".cart_switch").removeClass("hide"))
    })
}, $(document).on("change", "#cart #sameAddress", function() {
    Storeden.checkBillingEmailForEmailMarketing()
}), $(document).on("change paste keyup", "#cart .email, #cart .no-email", function() {
    Storeden.checkBillingEmailForEmailMarketing()
}), $(document).ready(function() {
    var b = window.location.pathname;
    "cart" == (b = b.split("/"))[1] && Storeden.checkBillingEmailForEmailMarketing()
});
Storeden.getStoreReviewsPaginated = function(l,s,h) {
    var j = {
        url: Storeden.PATH_URL + "/get-product-reviews",
        type: "POST",
        cache: !1,
        data: {
            limit :l,skip:s
        },
        success: function(k) {
            "function" == typeof h && h(k)
        }
    };
    $.ajax(j)
}


$(document).ready(function(){
	if (typeof cart != 'undefined' && typeof cart.checkoutError == 'undefined'){
		cart.checkoutError = function(error) {
			$('.cart_summary_overlay').hide();
			$('.checkout-work-in-progress').hide();
			$('.checkout_btn_move').removeClass('hide').removeClass('d-none');
			$('.checkout-main-error').show();
			cart.enableCheckoutButton();
		}
	}
})

$(document).on('storeden.cart.setShippingMethod', function(e,k){
	try{
		$('#no-cod-css-element').remove();
		var tshipping = k.shipping_method;
		var cod_element = $('input[name="payment"][value="mark"]');
		if(tshipping.indexOf('|DISABLECOD') != -1){
			$('body').append('<div id="no-cod-css-element"><style>#payment_mark{display:none}</style></div>');
			if(cod_element.is(':checked')) {
				if($('input[name="payment"]').not('[value="mark"]').length > 0){
					$('input[name="payment"]').not('[value="mark"]')[0].click();
				}else{
					cart.updateField('payment_amount', 0);
					cart.updateField('payment_method_id', null);
					cart.updateField('payment_method', null);
					cart.updateTotal();
				}
			}
			cod_element.closest('.payment_label').hide();
			cod_element.hide();
		}else{
			cod_element.closest('.payment_label').show();
			cod_element.show();
		}
	}catch(err){
		if (window.console) {
			console.warn('--');
			console.warn(err);
			console.warn('--');
		}
	}
});

// Storeden.global_shipping_id = '';
//
// $(document).on('storeden.cart.setShippingAddress', function(e,d){
// 	try{
// 		Storeden.global_shipping_id = d.address_id;
// 	}catch(err){}
// });
//
// $.fn.isInViewport = function() {
// 	var elementTop = $(this).offset().top;
// 	var elementBottom = elementTop + $(this).outerHeight();
// 	var viewportTop = $(window).scrollTop();
// 	var viewportBottom = viewportTop + $(window).height();
// 	return elementBottom > viewportTop && elementTop < viewportBottom;
// };
