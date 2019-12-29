/**
 * @inotom/expand-controller v1.0.0 inotom <wdf7322@yahoo.co.jp> | MIT
 */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),require("core-js/modules/es.array.slice"),require("core-js/modules/es.regexp.exec"),require("core-js/modules/es.string.split"),require("core-js/modules/web.dom-collections.for-each");var KEY_ENTER=13,KEY_SPACE=32,setAriaExpanded=function(e,t){e.setAttribute("aria-expanded",t)},toggleHandle=function(e){var t=!("true"===e.getAttribute("aria-expanded"));return setAriaExpanded(e,t),t},setPanels=function(e,t){e.forEach((function(e){var a=document.getElementById(e);a&&(toggleAriaHidden(a,t),toggleHeight(a,t))}))},toggleAriaHidden=function(e,t){e.setAttribute("aria-hidden",!t)},setPanelDataHeight=function(e){e.style.height="auto";var t=e.clientHeight;e.dataset.height=t},setPanelStyle=function(e,t){var a=t?e.dataset.height+"px":0;e.style.height=a},toggleHeight=function(e,t){"false"!==e.dataset.enableHeightStyle&&(e.dataset.height||setPanelDataHeight(e),setPanelStyle(e,t))},expandController=function(){var e=document.querySelectorAll(".js-expand-controller[aria-controls]");Array.prototype.slice.call(e,0).forEach((function(e){var t=e.getAttribute("aria-controls").split(" "),a=function(a){var n;((null===(n=e.dataset.disableEvents)||void 0===n?void 0:n.split(" "))||[]).forEach((function(e){switch(e){case"prevent":a.preventDefault();break;case"stop":a.stopPropagation()}}));var r=toggleHandle(e);setPanels(t,r)};e.addEventListener("click",a),"button"===e.getAttribute("role")&&e.addEventListener("keydown",(function(e){e.keyCode!==KEY_ENTER&&e.keyCode!==KEY_SPACE||a(e)}));var n=e.getAttribute("aria-expanded"),r=null!==n&&"true"===n;setAriaExpanded(e,r),setPanels(t,r)})),window.addEventListener("resize",(function(){Array.prototype.slice.call(e,0).forEach((function(e){e.getAttribute("aria-controls").split(" ").forEach((function(e){var t=document.getElementById(e);t&&"false"!==t.dataset.enableHeightStyle&&(setPanelDataHeight(t),setPanelStyle(t,"false"===t.getAttribute("aria-hidden")))}))}))}))};exports.expandController=expandController;
