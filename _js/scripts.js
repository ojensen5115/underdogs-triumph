window.jQuery = window.$ = require( "jquery" );
require( "velocity-animate/velocity.js" );
require( "lazysizes" );
require( "lazysizes/plugins/unveilhooks/ls.unveilhooks.js" );

// Jquery & Velocity JS included in GULP
$( document ).ready( function() {
    toggleMobileNav();
    ShowHideNav();
    formCheck();

} );

// Close modal if ESC is pressed
$( document ).keyup( function( e ) {
    e.keyCode === 27 ? removeModal() : null;
} );

$( window ).resize( function() {
    $( ".header" ).removeClass( "hide-nav" ); // Ensure nav will be shown on resize
    $( ".header__links" ).removeAttr( "style" ); // If mobile nav was collapsed, make sure it's show on DESK
    $( ".header__overlay" ).remove(); // Remove mobile navigation overlay in case it was opened
} );

/*-------------------------------------------------------------------------*/
/* MOBILE NAVIGATION */
/* -----------------------------------------------------------------------*/

function toggleMobileNav() {
    $( ".header__toggle" ).click( function() {
      if ( !$( ".header__links" ).is( ".velocity-animating" ) ) {
        if ( $( ".header__links" ).hasClass( "js--open" ) ) {
            hideMobileNav();
        } else {
            openMobileNav();
        }
      }
    } );

    $( "body" ).on( "click", function( e ) {

      if ( e.target.classList.contains( "header__overlay" ) ) {
        hideMobileNav();
      }
    } );
}

function openMobileNav() {
    $( ".header__links" ).velocity( "slideDown", {
        duration: 300,
        easing: "ease-out",
        display: "block",
        visibility: "visible",
        begin: function() {
            $( ".header__toggle" ).addClass( "--open" );
            $( "body" ).append( "<div class='header__overlay'></div>" );
        },
        progress: function() {
            $( ".header__overlay" ).addClass( "--open" );
        },
        complete: function() {
            $( this ).addClass( "js--open" );
        }
    } );
}

function hideMobileNav() {
    $( ".header__overlay" ).remove();
    $( ".header__links" ).velocity( "slideUp", {
        duration: 300,
        easing: "ease-out",
        display: "none",
        visibility: "hidden",
        begin: function() {
            $( ".header__toggle" ).removeClass( "--open" );
        },
        progress: function() {
            $( ".header__overlay" ).removeClass( "--open" );
        },
        complete: function() {
            $( this ).removeClass( "js--open" );
            $( ".header__toggle, .header__overlay" ).removeClass( "--open" );
        }
    } );
}

/*-------------------------------------------------------------------------*/
/* SHOW/SCROLL NAVIGATION */
/* -----------------------------------------------------------------------*/

function ShowHideNav() {
    var previousScroll = 0, // previous scroll position
        $header = $( ".header" ), // just storing header in a variable
        navHeight = $header.outerHeight(), // nav height
        detachPoint = 576 + 60, // after scroll past this nav will be hidden
        hideShowOffset = 6; // scroll value after which nav will be shown/hidden

    $( window ).scroll( function() {
        var wW = 1024;

        // if window width is more than 1024px start show/hide nav
        if ( $( window ).width() >= wW ) {
            if ( !$header.hasClass( "fixed" ) ) {
                var currentScroll = $( this ).scrollTop(),
                    scrollDifference = Math.abs( currentScroll - previousScroll );

                // if scrolled past nav
                if ( currentScroll > navHeight ) {

                    // if scrolled past detach point -> show nav
                    if ( currentScroll > detachPoint ) {
                        if ( !$header.hasClass( "fix-nav" ) ) {
                            $header.addClass( "fix-nav" );
                        }
                    }

                    if ( scrollDifference >= hideShowOffset ) {
                        if ( currentScroll > previousScroll ) {

                            // scroll down -> hide nav
                            if ( !$header.hasClass( "hide-nav" ) ) {
                                $header.addClass( "hide-nav" );
                              }
                        } else {

                            // scroll up -> show nav
                            if ( $header.hasClass( "hide-nav" ) ) {
                                $( $header ).removeClass( "hide-nav" );
                            }
                        }
                    }
                } else {

                    // at the top
                    if ( currentScroll <= 0 ) {
                        $header.removeClass( "hide-nav show-nav" );
                        $header.addClass( "top" );
                    }
                }
            }

            // scrolled to the bottom -> show nav
            if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) {
                $header.removeClass( "hide-nav" );
            }
            previousScroll = currentScroll;
        } else {
            $header.addClass( "fix-nav" );
        }
    } );
}

/*-------------------------------------------------------------------------*/
/* HANDLE MODAL */
/* -----------------------------------------------------------------------*/

function openModal() {
    $( "body" ).css( "overflow", "hidden" );
    $( ".modal, .modal__overlay" ).show().css( "display", "flex" );
    $( ".modal__inner" ).velocity( { translateY: 0, opacity: 1 } );
    $( ".modal__overlay" ).velocity( { opacity: 1 }, 100 );
}

function removeModal() {
    $( "body" ).css( { "overflow": "visible" } );
    $( ".modal, .modal__overlay, .modal__inner" ).velocity( { opacity: 0 }, function() {
        $( ".modal" ).css( { opacity: 1 } );
        $( ".modal__inner" ).css( {
            "-webkit-transform": "translateY(200px)",
            "-ms-transform": "translateY(200px)",
            transform: "translateY(200px)"
        } );
        $( ".modal, .modal__overlay" ).hide();
        $( ".modal__body" ).empty();
    } );
}

$( ".js-modal-close" ).click( function() {
    removeModal();
} );

$( ".modal__overlay" ).click( function() {
    removeModal();
} );

/*-------------------------------------------------------------------------*/
/* FORM VALIDATION */
/* -----------------------------------------------------------------------*/

function formCheck() {
    $( ".js-submit" ).click( function( e ) {

        e.preventDefault();

        var $inputs = $( ".form__input input" );
        var textarea = $( ".form__input textarea" );
        var isError = false;

        $( ".form__input" ).removeClass( "error" );
        $( ".error-data" ).remove();

        for ( var i = 0; i < $inputs.length; i++ ) {
            var input = $inputs[ i ];
            if ( $( input ).attr( "required", true ) && !validateRequired( $( input ).val() ) ) {

                addErrorData( $( input ), "This field is required" );

                isError = true;
            }
            if ( $( input ).attr( "required", true ) && $( input ).attr( "type" ) === "email" && !validateEmail( $( input ).val() ) ) {
                addErrorData( $( input ), "Email address is invalid" );
                isError = true;
            }
            if ( $( textarea ).attr( "required", true ) && !validateRequired( $( textarea ).val() ) ) {
                addErrorData( $( textarea ), "This field is required" );
                isError = true;
            }
        }
        if ( isError === false ) {
            $( "#contactForm" ).submit();
        }
    } );
}

// Validate if the input is not empty
function validateRequired( value ) {
    if ( value === "" ) {
      return false;
    }
    return true;
}

// Validate if the email is using correct format
function validateEmail( value ) {
    if ( value !== "" ) {
        return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test( value );
    }
    return true;
}

// Add error message to the input
function addErrorData( element, error ) {
    element.parent().addClass( "error" );
    element.after( "<span class='error-data'>" + error + "</span>" );
}


/*-------------------------------------------------------------------------*/
/* AJAX FORM SUBMIT
/* Formspree now only supports AJAX for Gold Users
/* https://github.com/formspree/formspree/pull/173
/* Uncomment if you want to use AJAX Form submission and you're a gold user
/* -----------------------------------------------------------------------*/

// $( "#contactForm" ).submit( function( e ) {

//     e.preventDefault();

//     var $btn = $( ".js-submit" ),
//         $inputs = $( ".form__input input" ),
//         $textarea = $( ".form__input textarea" ),
//         $name = $( "input#name" ).val(),
//         $url = $( "#contactForm" ).attr( "action" );

//     $.ajax( {

//         url: $url,
//         method: "POST",
//         data: $( this ).serialize(),
//         dataType: "json",

//         beforeSend: function() {
//             $btn.prop( "disabled", true );
//             $btn.text( "Sending..." );
//         },
//         // eslint-disable-next-line no-unused-vars
//         success: function( data ) {
//             $inputs.val( "" );
//             $textarea.val( "" );
//             $btn.prop( "disabled", false );
//             $btn.text( "Send" );
//             openModal();
//             $( ".modal__body" ).append(
//               "<h1>Thanks " +
//               $name +
//               "!</h1><p>Your message was successfully sent! Will get back to you soon.</p>"
//             );

//         },
//         error: function( err ) {
//             $( ".modal, .modal__overlay" ).addClass( "--show" );
//             $( ".modal__body" ).append(
//               "<h1>Aww snap!</h1><p>Something went wrong, please try again. Error message: </p>" +
//               err
//             );
//         }
//     } );
// } );


$('.price-display').text(function(idx) {
    return money(parseInt($(this).attr('data-price'), 10));
});


updateCartLink();


$('#add-to-cart').click(function(e) {
    var name = $(this).attr('data-name');
    var price = parseFloat($(this).attr('data-price'));
    var image = $(this).attr('data-img');
    var url = $(this).attr('data-url');
    addToCart(name, price, url);
});

function addToCart(name, price, url) {
    var cart = getCart();
    var placed = false;
    for (var i = 0; i < cart.items.length; i++) {
        if (cart.items[i].name == name) {
            cart.items[i].quantity += 1;
            placed = true;
        }
    }
    if (!placed) {
        cart.items.push({
            "name": name,
            "price": price,
            "url": url,
            "quantity": 1});
    }

    putCart(cart);
}

function getCart() {
    var cart;
    var unparsed = localStorage['cart'];
    try {
        cart = JSON.parse(unparsed);
    } catch (exception) {
        cart = {
            "items": []
        };
        putCart(cart);
    }
    return cart;
}

function putCart(cart) {
    localStorage['cart'] = JSON.stringify(cart);
    updateCartLink(cart);
}

function updateCartLink(cart) {
    if (!cart) {
        cart = getCart();
    }
    var num = 0;
    for (var i = 0; i < cart.items.length; i++) {
        num += cart.items[i].quantity;
    }
    var e = $('#cart-count');
    e.text(num);
    if (num == 0) {
        e.hide();
    } else {
        e.show();
    }
}

// on the shopping cart page, display the cart
var cartDisplay = $('#cart-table-body');
if (cartDisplay) {
    displayShoppingCart(cartDisplay);
}

function updateCartQuantity(event) {
    var name = $(this).attr('data-name')
    var cart = getCart();
    for (var i = 0; i < cart.items.length; i++) {
        if (cart.items[i].name != name) continue;
        if ($(this).val() <= 0) {
            cart.items.splice(i, 1);
        } else {
            cart.items[i].quantity = parseInt($(this).val(), 10);
        }
        putCart(cart);
        displayShoppingCart(cartDisplay);
        break;
    }
}

function displayShoppingCart(cartDisplay) {
    cartDisplay.html('');
    var cart = getCart();
    var total = 0;
    for (var i = 0; i < cart.items.length; i++) {

        var quantitySelector = $('<input type="number">')
            .attr('data-name', cart.items[i].name)
            .val(cart.items[i].quantity)
            .change(updateCartQuantity);

        var row = $('<tr>')
            .append($('<td>', {'style': 'width: 100px; padding: 0'})
                .append($('<a>').attr('href', cart.items[i].url)
                    .append('<img src="https://placedog.net/100/100">')
                )
            )
            .append($('<td>').append(
                $('<a>').attr('href', cart.items[i].url).text(cart.items[i].name)
                )
            )
            .append($('<td>').text(money(cart.items[i].price)))
            .append($('<td>').append(quantitySelector))

        cartDisplay.append(row);

        total += (cart.items[i].quantity * cart.items[i].price);
    }

    $('#cart-total').text(money(total));
}

function money(dollars) {
    return '$ ' + dollars.toFixed(2);
}