function ContextMenuItem(e){ContextMenuItemBase.apply(this,arguments),this._id="kango-"+utils.utils.getDomainFromId(extensionInfo.id)+"-menu-item1",this.init(e)}var extensionInfo=require("kango/extension_info"),utils=require("kango/utils"),object=utils.object,func=utils.func,array=utils.array,chromeWindows=require("kango/chrome_windows"),io=require("kango/io");ContextMenuItem.prototype=object.extend(ContextMenuItemBase,{init:function(e){array.forEach(chromeWindows.getLoadedChromeWindows(),function(t){this.addItem(t,this._id,e.caption,e.context||"all")},this),chromeWindows.addEventListener(chromeWindows.event.WINDOW_LOAD,func.bind(function(t){this.addItem(t.window,this._id,e.caption,e.context||"all")},this)),chromeWindows.addEventListener(chromeWindows.event.WINDOW_UNLOAD,func.bind(function(e){this.removeItem(e.window,this._id)},this))},dispose:function(){this.removeAllEventListeners(),array.forEach(chromeWindows.getLoadedChromeWindows(),function(e){this.removeItem(e,this._id)},this)},addItem:function(e,t,n,i){var o=e.document,r=o.getElementById("contentAreaContextMenu"),s=o.createElement("menuitem");s.setAttribute("id",t),s.setAttribute("label",n),s.setAttribute("class","menuitem-iconic"),s.setAttribute("image",io.getExtensionFileUrl("icons/button.png")),s.addEventListener("command",func.bind(function(e){var t=o.popupNode,n={srcUrl:t.src,linkUrl:t.href};this.fireEvent(this.event.CLICK,n),e.preventDefault()},this),!1),r.appendChild(s);var d=function(){var n=o.getElementById(t);null!=n&&"image"==i&&(n.hidden=!e.gContextMenu.onImage)};r.addEventListener("popupshowing",d,!1),chromeWindows.registerContainerUnloader(function(){r.removeEventListener("popupshowing",d,!1)},e)},removeItem:function(e,t){var n=e.document,i=n.getElementById(t);null!=i&&i.parentNode.removeChild(i)}}),extensionInfo.context_menu_item&&(module.exports=new ContextMenuItem(extensionInfo.context_menu_item),module.exports.getPublicApi=getPublicApi);