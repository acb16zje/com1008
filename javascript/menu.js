/* Written by Zer Jun Eng, 2016*/
/* Javascript for the menu system only */

/* Slide the menu right to 270px of the screen */
function openMenu() {
  document.getElementById("mobile_menu").style.width = "270px";
  document.getElementById("mobile_menu_overlay").style.visibility = "visible"; // display the overlay
  document.getElementById("mobile_menu_overlay").style.opacity = "1";
}

/* Slide the menu left to 0px width of the screen */
function closeMenu() {
  document.getElementById("mobile_menu").style.width = "0";
  document.getElementById("mobile_menu_overlay").style.visibility = "hidden"; // hide the overlay
  document.getElementById("mobile_menu_overlay").style.opacity = "0";
}

/* Close the menu when the user click outside of the menu using anonymous function */
window.addEventListener('mouseup', function (mouseClick) {
  var menu = document.getElementById("mobile_menu");
  // if the user click outside the menu
  if (mouseClick.target != menu) {
    document.getElementById("mobile_menu").style.width = "0";
    document.getElementById("mobile_menu_overlay").style.visibility = "hidden";
    document.getElementById("mobile_menu_overlay").style.opacity = "0";
  }
});
