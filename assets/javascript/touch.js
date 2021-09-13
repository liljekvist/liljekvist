function is_touch_enabled() {
    return ( 'ontouchstart' in window ) || 
           ( navigator.maxTouchPoints > 0 ) ||
           ( navigator.msMaxTouchPoints > 0 );
}


if( is_touch_enabled() ) {
    alert("You are using a mobile device. Bugs may occur.");
}