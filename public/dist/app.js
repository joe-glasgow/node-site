!function e(t,n,o){function r(i,c){if(!n[i]){if(!t[i]){var u="function"==typeof require&&require;if(!c&&u)return u(i,!0);if(a)return a(i,!0);var s=new Error("Cannot find module '"+i+"'");throw s.code="MODULE_NOT_FOUND",s}var l=n[i]={exports:{}};t[i][0].call(l.exports,function(e){var n=t[i][1][e];return r(n?n:e)},l,l.exports,e,t,n,o)}return n[i].exports}for(var a="function"==typeof require&&require,i=0;i<o.length;i++)r(o[i]);return r}({1:[function(e,t,n){var o=e("./modules/basket"),r=new o,a=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t=new RegExp("[\\?&]"+e+"=([^&#]*)"),n=t.exec(location.search);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))},i=document.querySelectorAll(".product-selection")[0],c=document.querySelectorAll("input[type=hidden]")[0],u=a("customerID"),s=function(e){ajax.post("/CatalogueService",{location:e},function(e){var t=JSON.parse(e),n=t.success;if(!n)throw new Error("There has been a problem retrieving products");var o=function(e){var t=document.createElement("div");return t.innerHTML=e,t.classList.add("layout__item","layout--item__block-left","u-2/3-lap-and-up","u-1/1-portable"),t},a=i.querySelectorAll(".basket")[0];i.insertBefore(o(t.availability),a);var c=document.querySelectorAll("input[type=checkbox]");[].forEach.call(c,function(e){e.addEventListener("change",function(){var e=this.name;this.checked?r.basketContainsItem(e)===!1&&(console.log("adding"),r.addToBasket(e)):r.removeFromBasket(e)})});var u=window.localStorage.order;u&&[].forEach.call(JSON.parse(u),function(e){var t=document.querySelectorAll('input[name="'+e+'"]')[0];console.log(t),t&&(t.checked=!0,r.addToBasket(e))})})};document.cookie="customerId="+u,c&&(c.value=u),u.length&&ajax.post("/CustomerLocationService",{customer:u},function(e){var t=JSON.parse(e),n=t.location;n?(s(t.location),i.setAttribute("data-location",t.location)):(s("undetermined"),i.setAttribute("data-location","undetermined"))})},{"./modules/basket":2}],2:[function(e,t,n){var o=function(){return{items:[],addToBasket:function(e){this.basketContainsItem(e)===!1&&(this.items.push(e),this.saveBasket())},removeFromBasket:function(e){this.items=this.items.filter(function(t){return t!==e}),this.saveBasket()},saveBasket:function(){var e=document.querySelectorAll(".selected-products")[0];e&&(e.innerHTML="",this.items.length&&this.items.map(function(t){var n=document.createElement("li");n.innerHTML=t,e.appendChild(n)}),window.localStorage&&(localStorage.order=JSON.stringify(this.items)))},basketContainsItem:function(e){return-1===this.items.indexOf(e)?!1:!0}}};t.exports=o},{}]},{},[1]);