var fn_addin=function(n,t,e){var i=i||{};return i.styles=i.styles||{},i.commands=i.commands||{},i.dependencies=e||i.dependencies||{},i.styles.style=function(){},i.views=i.views||{},i.collect=i.collect||{},i.models=i.models||{},i.templates=i.templates||{},i.info={widget:!0,id:"search",class:"app-container search",region:"top-left",order:"append",placeholderType:"metric",addin:"162b82d0-f285-427c-8209-924f44ef4d21",visibleSetting:"searchVisible"},n.console.log(n.elapsed()+": "+i.info.id+" started"),i.templates=i.templates||{},i.templates.search=Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,i,s){return'<div class="app-dash">\n\t<form class="search-form">\x3c!--\n\t\t--\x3e<span class="search-underline"></span>\x3c!--\n\t\t--\x3e<i class="dash-icon icon-search"></i>\x3c!--\n\t\t--\x3e<div class="more source">\n\t\t\t<div class="source-toggle" tabindex="0">\n\t\t\t\t<div class="icons">\n\t\t\t\t\t<img src="img/logo-google.svg" class="icon icon-google" tabindex="0">\n\t\t\t\t\t<img src="img/logo-bing.svg" class="icon icon-bing" tabindex="0">\n\t\t\t\t\t<img src="img/logo-duckduckgo-white.svg" class="icon icon-duckduckgo" tabindex="0">\n\t\t\t\t</div>\n\t\t\t\t<img src="img/icon-down.svg" class="icon icon-dropdown">\n\t\t\t</div>\n\t\t\t<div class="dropdown more-dropdown dash-dropdown nipple-top-right">\n\t\t\t\t<div class="heading">Search with</div>\n\t\t\t\t<ul class="dropdown-list">\n\t\t\t\t\t<li class="search-provider" data-provider="google" tabindex="1">\n\t\t\t\t\t\t<img src="img/logo-google.svg" class="dropdown-list-icon icon icon-google">\n\t\t\t\t\t\t<span class="dropdown-list-label">Google</span>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="search-provider" data-provider="bing" tabindex="2">\n\t\t\t\t\t\t<img src="img/logo-bing.svg" class="dropdown-list-icon icon icon-bing">\n\t\t\t\t\t\t<span class="dropdown-list-label">Bing</span>\n\t\t\t\t\t</li>\n\t\t\t\t\t<li class="search-provider" data-provider="duckduckgo" tabindex="3">\n\t\t\t\t\t\t<img src="img/logo-duckduckgo.svg" class="dropdown-list-icon icon icon-duckduckgo">\n\t\t\t\t\t\t<span class="dropdown-list-label">DuckDuckGo</span>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\x3c!--\n\t\t--\x3e<input type="text" id="search-input" class="search-input">\x3c!--\n\t--\x3e</form>\n</div>\n'},useData:!0}),i.styles=i.styles||{},i.styles.style=function(){var e=document.createElement("style");e.type="text/css",e.innerHTML=".search,.search .search-input{width:100%;max-width:var(--width);position:relative;cursor:pointer}.search{--width:250px;--icon-size:16px;min-height:60px;max-height:var(--max-height);min-width:100px;display:inline-block;flex:0 1 auto;order:6}.search .app-dash{height:100%;padding:0 var(--side-padding)}.search-form{height:100%;position:relative}.search .search-input{height:100%;padding:0 32px 0 26px;z-index:2;background:0 0;border:none;-moz-box-sizing:border-box;box-sizing:border-box;color:#fff;line-height:20px;outline:0}.search .icon-search,.search-underline{z-index:1;transition:opacity var(--a-fast) var(--a-curve);position:absolute;top:50%}.search-input:focus{cursor:text}.search-underline{margin-top:17px;left:0;right:0;border-bottom:2px solid #fff;opacity:0}.search:hover .search-underline{opacity:.4}.search.active .search-underline{opacity:1}.search .icon-search{margin-top:-10px;left:1px;opacity:.85}.search.active .icon-search,.search:hover .icon-search{opacity:1}.search .source{height:100%;position:absolute;right:0;z-index:3;display:flex;opacity:0;transition:var(--a-fast) var(--a-curve)}.search:hover .source{opacity:.65}.search.active .source{opacity:1}.search .source .icon{--icon-size:14px;height:var(--icon-size);width:var(--icon-size);vertical-align:top}.search .source-toggle{margin-right:-2px;padding:5px 2px;align-self:center;display:flex;align-items:center;justify-content:center;position:relative;border-radius:var(--toggle-size);cursor:pointer;outline:0}.search .source-toggle .icons .icon{display:none;filter:brightness(100);outline:0}.search .source-toggle .icons .icon.active{display:block}.search .source-toggle .icon-dropdown{--size:14px;height:var(--size);width:var(--size);margin:1px -2px;display:block;opacity:.5;transition:.1s var(--a-curve)}.search .source-toggle:hover .icon-dropdown{opacity:.8}.source.active .source-toggle .icon-dropdown{opacity:1;transition-duration:0}.search .source .dropdown{margin-top:29px;padding:4px 0;left:auto;top:50%;right:-8px}.search .dropdown.nipple-top-right:after{right:14px}.search .dropdown .search-provider{outline:0}.search .source .dropdown .heading{margin-bottom:-1px;padding:8px 14px 0;opacity:.75;font-size:.625rem;font-weight:500;text-transform:uppercase}.search .source .dropdown-list-icon{--icon-size:15px;margin-top:1px}.search .source .dropdown-list-label{margin-left:23px}",document.getElementsByTagName("head")[0].appendChild(e)},i.views.Search=Backbone.View.extend({template:i.templates.search,className:"app-container search",events:{"click .app-dash":"handleParentClick","focusin input":"handleFocusIn","focusout input":"handleFocusOut","focusout .more":"handleFocusOut","keyup input":"checkForEscape","submit .search-form":"doSearch","click .more":"toggleSourceChooser","click .search-provider":"setProvider"},initialize:function(){this.renderedOnce=!1,this.listenTo(n,"globalEvent:click",this.hideResults),this.listenTo(n,"globalEvent:esc",this.hide),this.listenTo(n,"globalEvent:toggleSearch",this.toggleShow),this.listenTo(n.models.customization,"change:searchVisible",this.visibleChanged),this.listenTo(n.models.customization,"change:searchProvider",this.render),this.render()},render:function(){var e;return this.$input&&(e=this.$input.val()),this.$el.html(this.template),this.selectProvider(),this.$input=this.$("input"),this.renderedOnce=!0,this.loadTriggered||(n.widgetManager.appReady(i.info.id),this.loadTriggered=!0),e&&this.$input.val(e),this},selectProvider:function(){var e=n.models.customization.get("searchProvider");this.$el.find(".icon-"+e).addClass("active")},setProvider:function(e){e.preventDefault(),e.stopPropagation();var t=e.currentTarget.dataset.provider;n.models.customization.save("searchProvider",t),this.$(".more").removeClass("active"),this.$input.trigger("focus")},visibleChanged:function(){n.models.customization.get("searchVisible")?(this.renderedOnce?this.$el.mFadeIn():this.render(),this.selectProvider()):this.$el.mFadeOut(500,!1)},doSearch:function(e){e.preventDefault();var t=this.$input.val().trim();if(0<t.length){var i=n.models.customization.get("searchProvider"),s=this.getSearchProvider(i);if(s&&s.prefix){n.usage.save({type:n.usage.types.SEARCH,providerId:s.id},!0,!0);var o=s.prefix+encodeURIComponent(t);s.suffix&&(o+=s.suffix),s.output&&"inline"==s.output?this.$(".search-results").attr("src",o).attr("target","_top").addClass("fadein").css("display","block"):window.location.href=o}}},getSearchProvider:function(e){return"google"===e?{id:"google-generic",prefix:"https://www.google.com/search?q="}:"duckduckgo"===e?{id:"duckduckgo",prefix:"https://duckduckgo.com/?q="}:{id:"bing-app-1",prefix:"https://www.bing.com/search?q=",suffix:"&PC=ATMM&FORM=MMXT01"}},handleParentClick:function(e){this.$("#search-input").focus()},handleFocusIn:function(){this.$el.addClass("active"),this.$(".more").removeClass("active"),n.sendEvent("Search","Focused")},handleFocusOut:function(e){if(t.contains(this.$el[0],e.relatedTarget)||0<this.$input.val().length)return!0;this.$el.removeClass("active"),this.$(".more").removeClass("active")},hideResults:function(e){t.contains(this.el,e.target)&&1!=e.hide||(this.$(".more").removeClass("active"),this.$(".search-results").hasClass("fadein")&&this.$(".search-results").removeClass("fadein").css("display","none"))},checkForEscape:function(e){27==e.keyCode&&this.hideResults({hide:"true"})},toggleSourceChooser:function(e){e.preventDefault(),e.stopPropagation(),t(e.currentTarget).hasClass("active")||this.handleFocusIn(),t(e.currentTarget).toggleClass("active")},toggleShow:function(e){this.$input.is(":focus")?this.$input.trigger("blur"):this.$input.trigger("focus")},hide:function(){this.$input.is(":focus")&&this.$input.trigger("blur")}}),i.styles.style(),setTimeout(function(){i.views.search=n.widgetManager.handover("search",i.views.Search,{region:"top-left",order:"append"})}),i};m.addinManager&&m.addinManager.registerAddinFn("162b82d0-f285-427c-8209-924f44ef4d21",fn_addin);