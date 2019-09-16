/*! (C) Copyright 2018 LanguageTooler GmbH. All rights reserved. */
class TweaksManager{static _anonymizeEmail(e){return e.replace(TweaksManager.EMAIL_DOMAIN_REG_EXP,"@replaced.domain").trim()}static _removeEmail(e){return e.replace(TweaksManager.EMAIL_REG_EXP,"").trim()}static getTweaks(e){let t=null;try{t=new URL(e).hostname}catch(e){}if(!t)return TweaksManager.DEFAULT_TWEAKS;const a=Object.assign({},TweaksManager.DEFAULT_TWEAKS),o=getSubdomains(t),s=TweaksManager.CUSTOM_TWEAKS.find(t=>{if("url"in t.matches)return!!e.match(t.matches.url);let a=[];"host"in t.matches?a=[t.matches.host]:"hosts"in t.matches&&(a=t.matches.hosts);for(const e of o)if(a.includes(e))return!0});return Object.assign(a,s),a}}TweaksManager.NON_COMPATIBLE_TAGS=["TR","TH","TD","THEAD","TBODY","TFOOT","CAPTION"],TweaksManager.EMAIL_REG_EXP=/<?(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])>?/g,TweaksManager.EMAIL_DOMAIN_REG_EXP=/@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,TweaksManager.DEFAULT_TWEAKS={init(){document.documentElement.setAttribute("data-lt-installed","true")},supported:()=>!0,unsupportedMessage:()=>"",isElementCompatible(e){if(!(isInputArea(e)&&!e.readOnly))return!1;if(TweaksManager.NON_COMPATIBLE_TAGS.includes(e.tagName))return!1;if(e.closest("quill-editor"))return!1;if(e.classList.contains("cke_editable"))return!0;if(e.classList.contains("ve-ce-documentNode"))return!0;if(e.classList.contains("fr-element")&&!e.classList.contains("wsc-instance"))return!0;const t=e.ownerDocument;if(t.head&&isTinyMCE(e)){const a=t.createElement("script"),o="_isTinymceSpellcheckerActivated";return a.innerText=`\n                    try {\n                        if (window.parent.tinymce.get(document.body.dataset.id).plugins.tinymcespellchecker) {\n                            document.body.dataset.${o} = true;\n                        }\n                    } catch(e) {}\n                `,t.head.appendChild(a),a.remove(),!Boolean(e.dataset[o])}return!!(window.innerHeight>=20&&window.innerWidth>=100)&&"false"!==e.getAttribute("spellcheck")},getHighlighterAppearance:e=>({getZIndex(e,t){let a=t.getStyle(e,"z-index");return(a=parseInt(a)||0)>0||t.isStackingContext(e)?a+1:null}}),getToolbarAppearance(e){const t=[Dialog.CONTAINER_ELEMENT_NAME,ErrorCard.CONTAINER_ELEMENT_NAME].join(", ");return{isVisible(e,t){let a=!0;a=isTextArea(e)?!e.value.trim():!e.textContent.trim();const o=t.getPaddingBox(e);return!(a&&o.height<32)&&(o.width>=160&&o.height>=18)},getPosition(e,a,o){const s=e.ownerDocument.documentElement,r=e.ownerDocument.body;if(e===r)return{fixed:!0,left:s.clientWidth-a.width-6+"px"};const n=s.clientHeight,i=getVisibleTopAndBottom(e,o,n,t),l=i.bottom-i.top;if(l<a.height)return null;let c=o.getPaddingBox(e);if("IFRAME"===e.nodeName){let t=null;try{t=e.contentWindow.document.documentElement}catch(e){}if(!t)return null;c.width=t.clientWidth,c.height=t.clientHeight,c.right=c.left+c.width,c.bottom=c.top+c.height}let m=c.top+i.bottom-6-a.height,g=c.right-6-a.width;if(l<=40){m=c.top+i.bottom-l/2-a.height/2}const p=c.height>=250,d=(s.scrollTop||r.scrollTop)+n;if(p&&c.top+i.bottom>d&&c.top+a.height+12<d)return{fixed:!0,left:Math.round(g)+"px"};if(m>d)return null;const u=d-a.height-8;return m=Math.min(m,u),{fixed:!1,left:Math.round(g)+"px",top:Math.round(m)+"px"}}}},getParsingDetector(e){const t=document.body&&document.body.dataset&&document.body.dataset.id&&document.body.dataset.id.includes("ZmHtmlEditor");let a=location.href.includes("/owa/")||!!document.querySelector(".owa-font-compose");try{a=a||window.parent.location.href.includes("/owa/")||!!window.parent.document.querySelector(".owa-font-compose")}catch(e){}let o=!1;try{o=!!window.parent.document.title.match(/roundcube/i)||!!window.parent.location.href.match(/_action=compose/i)}catch(e){}return{isSignature:e=>t?!!(e.dataset&&e.dataset.marker&&e.dataset.marker.includes("_SIG_")):a?"signature"===e.id.toLowerCase():!!o&&"_rc_sig"===e.id,isQuote:e=>t?!!(e.dataset&&e.dataset.marker&&e.dataset.marker.includes("_QUOTED_")):!!a&&("divRplyFwdMsg"===e.id||!!e.previousElementSibling&&"divRplyFwdMsg"===e.previousElementSibling.id)}},getRecipientInfo(e){try{const t="BODY"===e.tagName&&"tinymce"===e.id,a="TEXTAREA"===e.tagName&&"composebody"===e.id;if(t||a){const e=window.parent.document.getElementById("_from"),t=window.parent.document.getElementById("compose-subject"),a=window.parent.document.getElementById("_to");if(e&&t&&a){const e=TweaksManager._anonymizeEmail(a.value),t=TweaksManager._removeEmail(a.value);return Promise.resolve({address:e,fullName:t})}}}catch(e){}return Promise.resolve({address:"",fullName:""})},isClickIgnored:e=>!e.isTrusted,applyFix(e){const{error:t,replacementText:a,instance:o}=e;return o.inputAreaWrapper.replaceText(t.offset,t.length,a)}},TweaksManager.CUSTOM_TWEAKS=[{matches:{hosts:["1und1.de","gmx.net","gmx.com","web.de"]},getParsingDetector:e=>({isSignature:e=>"string"==typeof e.className&&e.className.includes("signature"),isQuote:e=>"quote"===e.getAttribute("name")}),getRecipientInfo(e){try{const e=document.querySelector(".objectivation-address[title]")||window.parent.document.querySelector(".objectivation_name[title]");if(e){const t=(e.getAttribute("title")||"").replace(/"/g,""),a=TweaksManager._anonymizeEmail(t),o=TweaksManager._removeEmail(t);return Promise.resolve({address:a,fullName:o})}}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{host:"atlassian.net"},isElementCompatible:e=>!(!e.isContentEditable||!e.className.includes("ProseMirror"))||TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e),getToolbarAppearance:e=>({isVisible:(e,t)=>e.className.includes("ProseMirror")||TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition:(e,t,a)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)}),getHighlighterAppearance(){const e=location.href.match(/\/(wiki|projects|issues)\//);return{getZIndex(t,a){const o=TweaksManager.DEFAULT_TWEAKS.getHighlighterAppearance(t).getZIndex(t,a);return e&&t.classList.contains("ProseMirror")?(o||0)+1:o}}}},{matches:{url:/\/jira\//i},getHighlighterAppearance:()=>({getZIndex:(e,t)=>e.classList.contains("richeditor-cover")?null:TweaksManager.DEFAULT_TWEAKS.getHighlighterAppearance(e).getZIndex(e,t)})},{matches:{host:"mail.protonmail.com"},getParsingDetector:e=>({isSignature:e=>"string"==typeof e.className&&e.className.includes("protonmail_signature"),isQuote:e=>!1})},{matches:{host:"canva.com"},isElementCompatible(e){const t=/rotate\([1-9\-]/;let a=e.closest("[style*=rotate]");for(;a&&a!==e.ownerDocument.body;){if(a.style.transform&&a.style.transform.match(t))return!1;a=a.parentElement&&a.parentElement.closest("[style*=rotate]")}return TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e)}},{matches:{host:"chrome.google.com"},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("webstoreSiteNotSupported")},{matches:{host:"docs.google.com"},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("googleDocsNotSupported","https://chrome.google.com/webstore/detail/languagetool/kjcoklfhicmkbfifghaecedbohbmofkm")},{matches:{host:"deepl.com"},isElementCompatible:e=>!e.className.includes("target_textarea")&&TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e),applyFix(e){const t=TweaksManager.DEFAULT_TWEAKS.applyFix(e);return e.instance.inputAreaWrapper.simulateInput(e.replacementText),t}},{matches:{host:"e.mail.ru"},getRecipientInfo(e){try{const t="BODY"===e.tagName&&"tinymce"===e.id,a="TEXTAREA"===e.tagName&&e.classList.contains("composeEditor");if(t||a){const e=window.parent.document.getElementById("compose_to");if(e){const t=e.value.split(",")[0],a=TweaksManager._anonymizeEmail(t),o=TweaksManager._removeEmail(t);return Promise.resolve({address:a,fullName:o})}}}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{hosts:["facebook.com","messenger.com"]},getToolbarAppearance(e){const t=e.getAttribute("data-testid"),a=!!location.href.match(/messenger\.com\/(t\/|new)|\/messages\/(t\/|new)/i),o="UFI2ComposerInput/comment:rich-input"===t||"UFI2ComposerInput/reply:rich-input"===t,s=!!e.closest("[data-testid=composer_root]");return{isVisible:(e,t)=>t.getPaddingBox(e).width>=120,getPosition(e,t,r){if(o||a||s){const a=r.getPaddingBox(e),s=a.height;let n=a.bottom-6-t.height,i=a.right-6-t.width;if(s<=40){n=a.bottom-s/2-t.height/2}const l=(document.documentElement.scrollTop||document.body.scrollTop)+document.documentElement.clientHeight;if(n>l)return null;const c=l-t.height-8;return n=Math.min(n,c),o&&(i+=6),s>30&&(n+=8),{fixed:!1,left:Math.round(i)+"px",top:Math.round(n)+"px"}}return TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,r)}}}},{matches:{host:"keep.google.com"},getToolbarAppearance:e=>({isVisible:(e,t)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition(e,t,a){const o=TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a);return"list item"===e.getAttribute("aria-label")&&o&&o.left&&(o.left=parseInt(o.left)-30+"px"),o}})},{matches:{host:"mail.google.com"},isElementCompatible:e=>TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e),getParsingDetector:e=>({isSignature:t=>"string"==typeof t.className&&t.className.includes("gmail_signature")&&e.firstElementChild!==t,isQuote(t){const a=t.className;if("string"!=typeof a)return!1;if(a.includes("gmail_attr"))return!0;if(a.includes("gmail_quote")){if(e.firstElementChild===t)return!1;let a=!1;for(let e=0;e<t.children.length;e++){if("BLOCKQUOTE"===t.children[e].nodeName){a=!0;break}}if(!a&&t.firstElementChild){if(t.firstElementChild.className.includes("gmail_attr"))return!0}}return!1}}),getRecipientInfo(e){try{if("DIV"===e.tagName){const e=document.querySelector("input[name=to]");if(e){const t=TweaksManager._anonymizeEmail(e.value),a=TweaksManager._removeEmail(e.value);return Promise.resolve({address:t,fullName:a})}}}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{hosts:["grammarly.com","prowritingaid.com","gingersoftware.com","iblogbox.com"]},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("siteCannotBeSupported")},{matches:{host:"mytextarea.com"},getToolbarAppearance:e=>({isVisible:(e,t)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition(e,t,a){const o=TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a);return o&&o.left&&(o.left=parseInt(o.left)-25+"px"),o}})},{matches:{host:"languagetool.org"},isElementCompatible:e=>!e.classList.contains("mceContentBody")&&TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e)},{matches:{host:"languagetoolplus.com"},init(){document.addEventListener("lt-upgrade",()=>{new StorageController(e=>{if(e.getUIState().hasPaidSubscription)return;Tracker.trackEvent("Action","upgrade"),e.checkForPaidSubscription().catch(e=>{Tracker.trackError("js",`Error checking paid subscripton: ${e&&e.message}`)});const{firstVisit:t}=e.getStatistics();if(t){const e=Math.floor((Date.now()-1e3*t)/1e3/60/60/24);Tracker.trackEvent("Action","upgrade:days_since_installation",`days:${e}`)}})}),document.addEventListener("lt-open-options",e=>{browser.runtime.sendMessage({command:"OPEN_OPTIONS",ref:"external"})});const e=document.querySelector("#lt-addon-user-token"),t=document.querySelector("#lt-addon-user-email");return e&&t&&new StorageController(a=>{if(Tracker.trackEvent("Action","auto_login:prepare"),a.isUsedCustomServer())return;const{havePremiumAccount:o,username:s}=a.getSettings();o?o&&t.value.toLowerCase()===s.toLowerCase()&&a.updateSettings({username:t.value,password:"",token:e.value}):(a.updateSettings({havePremiumAccount:!0,username:t.value,password:"",token:e.value,knownEmail:t.value}),Tracker.trackEvent("Action","auto_login:success")),a.checkForPaidSubscription().catch(e=>{Tracker.trackError("js",`Error checking paid subscripton: ${e&&e.message}`)})}),location.href.includes("/webextension/upgrade")&&new StorageController(e=>{const{premiumClicks:t}=e.getStatistics();e.updateStatistics({premiumClicks:t+1}),Tracker.trackEvent("Action","pricing_table:view")}),TweaksManager.DEFAULT_TWEAKS.init()},isElementCompatible:e=>!e.classList.contains("mceContentBody")&&TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e)},{matches:{host:"linkedin.com"},getToolbarAppearance:e=>({isVisible:(e,t)=>!document.querySelector(".msg-form__hovercard.active")&&TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition(e,t,a){const o=e.nextElementSibling;if(isTextArea(e)&&o&&o.classList.contains("send-invite__count")&&o){const s=parseInt(a.getStyle(o,"width")),r=parseInt(a.getStyle(o,"right")),n=a.getBorderBox(e);return{fixed:!1,left:Math.round(n.right-r-s-4-t.width)+"px",top:Math.round(n.bottom-4-t.height)+"px"}}return TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)}})},{matches:{host:"rambler.ru"},getRecipientInfo(e){try{if("BODY"===e.tagName&&"tinymce"===e.id){const e=window.parent.document.querySelector("div[class*=Fields-receiverWrapper] div[class*=Fields-inputWrapper] span[class*=EmailBadge-root] span[class*=EmailBadge-text]");if(e){const t=TweaksManager._anonymizeEmail(e.textContent||""),a=TweaksManager._removeEmail(e.textContent||"");return Promise.resolve({address:t,fullName:a})}}}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{host:"mail.yandex.ru"},getRecipientInfo(e){try{if("DIV"===e.tagName&&e.classList.contains("cke_wysiwyg_div")&&e.classList.contains("cke_editable")){const e=document.querySelector("div[name=to] span[bubble][data-yabble-email]");if(e){const t=TweaksManager._anonymizeEmail(e.dataset.yabbleName||""),a=TweaksManager._removeEmail(e.dataset.yabbleName||"");return Promise.resolve({address:t,fullName:a})}}}catch(e){}return Promise.resolve({address:"",fullName:""})},isClickIgnored(e){const t=e.target;return!!t&&isTextArea(t)&&"editor1"===t.id}},{matches:{host:"mail.yahoo.com"},getParsingDetector:e=>({isSignature:e=>"string"==typeof e.className&&e.className.includes("signature"),isQuote:e=>"string"==typeof e.className&&e.className.includes("yahoo_quoted")}),getRecipientInfo(e){try{const e=document.querySelector("[data-test-id='email-pill'] [data-test-id='pill']");if(e)return Promise.resolve({address:TweaksManager._anonymizeEmail(e.getAttribute("title")||""),fullName:e.innerText.trim()})}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{url:/\/appsuite/},getRecipientInfo(e){try{const t="BODY"===e.tagName&&"tinymce"===e.id,a="TEXTAREA"===e.tagName&&e.parentElement&&e.parentElement.classList.contains("editor");if(t||a){const e=window.parent.document.querySelector(".tokenfield .token span.token-label");if(e){const t=e.textContent||"",a=TweaksManager._anonymizeEmail(t),o=TweaksManager._removeEmail(t);return Promise.resolve({address:a,fullName:o})}}}catch(e){}return Promise.resolve({address:"",fullName:""})},getParsingDetector:e=>({isSignature:e=>"string"==typeof e.className&&e.className.includes("ox-signature"),isQuote:e=>!1})},{matches:{url:/\/otrs/},getParsingDetector:e=>({isSignature:e=>!1,isQuote:e=>"cite"===e.getAttribute("type")})},{matches:{host:"my.smashdocs.net"},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("siteCannotBeSupported")},{matches:{host:"ondedrive.live.com"},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("msOnlineOfficeNotSupported","https://appsource.microsoft.com/de-de/product/office/WA104381727")},{matches:{host:"overleaf.com"},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("siteCannotBeSupported")},{matches:{hosts:["outlook.live.com","outlook.office365.com","outlook.office.com"]},getParsingDetector:e=>({isSignature:e=>"signature"===e.id.toLowerCase(),isQuote:e=>"divRplyFwdMsg"===e.id||!!e.previousElementSibling&&"divRplyFwdMsg"===e.previousElementSibling.id}),getRecipientInfo(e){try{if("DIV"===e.tagName&&"textbox"===e.getAttribute("role")){const t=document.querySelector(".ms-BasePicker-text [aria-label]");if(t){const e=t.getAttribute("aria-label")||"",a=TweaksManager._removeEmail(e);let o=TweaksManager._anonymizeEmail(e);return o.includes("@")||(o=`${a} <${a.split(" ").join(".").toLowerCase()}@replaced.domain>`),Promise.resolve({address:o,fullName:a})}const a=e.closest("._2BzYAu1OpUlMQyUR7PQGaZ");if(a){const e=a.querySelector("span.lpc-hoverTarget[role=button][aria-haspopup=dialog] li");if(e){const t=e.textContent||"",a=TweaksManager._removeEmail(t);let o=TweaksManager._anonymizeEmail(t);return o.includes("@")||(o=`${a} <${a.split(" ").join(".").toLowerCase()}@replaced.domain>`),Promise.resolve({address:o,fullName:a})}}}}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{hosts:["mail.zoho.com","mail.zoho.eu"]},getParsingDetector:e=>({isSignature:e=>e.id.startsWith("Zm-_Id_-Sgn"),isQuote:e=>e.classList.contains("zmail_extra")})},{matches:{host:"paper.dropbox.com"},getToolbarAppearance:e=>({isVisible:(e,t)=>!(e.offsetHeight<30&&e.classList.contains("editor-blank"))&&TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition:(e,t,a)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)}),getHighlighterAppearance(){location.href.match(/\/doc\//);return{getZIndex(e,t){const a=TweaksManager.DEFAULT_TWEAKS.getHighlighterAppearance(e).getZIndex(e,t);return e.classList.contains("ace-editor")?(a||0)+1:a}}}},{matches:{host:"reverso.net"},isElementCompatible:e=>"txtSource"===e.id&&"TEXTAREA"===e.nodeName||TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e),getToolbarAppearance:e=>({isVisible:(e,t)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition(e,t,a){const o=TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a);return o&&o.top&&"txtSource"===e.id&&document.querySelector("#lnkSpeller:not(.bottom)")&&(o.top=parseInt(o.top)-28+"px"),o}})},{matches:{host:"slack.com"},isElementCompatible(e){const t=e.parentElement;return!(!t||"focusable_search_input"===t.getAttribute("data-qa"))&&("message_input"===t.getAttribute("data-qa")||TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e))},getToolbarAppearance:e=>!(e.parentElement&&e.parentElement.classList.contains("p-share_dialog_message_input"))&&e.classList.contains("ql-editor")?{isVisible:e=>!0,getPosition(e,t,a){let o=parseInt(a.getStyle(e,"padding-top")),s=parseInt(a.getStyle(e,"padding-bottom"));const r=a.getBorderBox(e);o>0&&0===s&&e.closest("#convo_tab, #p_thread_view_container")&&(s=o,r.bottom+=o,r.height+=o);const n=Math.max(parseInt(a.getStyle(e,"padding-right"))+2,38),i=parseInt(a.getStyle(e,"line-height"))+o+s;return{fixed:!1,left:Math.round(r.right-n-t.width)+"px",top:Math.round(r.bottom-t.height+(t.height-i)/2)+"px"}}}:TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e)},{matches:{host:"spanishdict.com"},isElementCompatible:e=>"query"!==e.id&&TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e)},{matches:{host:"trello.com"},getToolbarAppearance:e=>({isVisible:(e,t)=>!document.querySelector(".pop-over.is-shown")&&TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition:(e,t,a)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)})},{matches:{host:"twitter.com"},getToolbarAppearance:e=>({isVisible(e,t){if(e.classList.contains("twttr-directmessage-input"))return!1;if(e.classList.contains("tweet-box")&&"tweet-box-dm-conversation"!==e.id){const a=64;return t.getBorderBox(e).height>=a}return TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t)},getPosition(e,t,a){if("tweet-box-dm-conversation"===e.id){const o=TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a);if(!o)return null;const s=20,r=5;return{fixed:!1,left:parseInt(o.left)-s-r+"px",top:o.top}}if(e.classList.contains("tweet-box")){const o=20,s=a.getBorderBox(e);return{fixed:!1,left:Math.round(s.right-8-t.width)+"px",top:Math.round(s.bottom-o-10-t.height+(t.height-o)/2)+"px"}}return TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)}})},{matches:{host:"vk.com"},getToolbarAppearance:e=>({isVisible(e,t){if("post_field"===e.id){const a=50;return t.getBorderBox(e).height>=a}return!e.classList.contains("page_status_input")&&TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t)},getPosition(e,t,a){const o=TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a);if(!o)return o;if(e.classList.contains("im_editable")||e.classList.contains("reply_field")){const t=parseInt(a.getStyle(e,"padding-right"));return Object.assign(o,{left:Math.round(parseInt(o.left)-t)+"px"})}return o}})},{matches:{host:"upwork.com"},getToolbarAppearance:e=>({isVisible(e,t){const a=t.getBorderBox(e);return a.width>=160&&a.height>=19},getPosition(e,t,a){if(e.classList.contains("msg-composer-input")){const o=-54,s=0,r=a.getBorderBox(e);return{fixed:!1,left:Math.round(r.right-o-t.width)+"px",top:Math.round(r.bottom-s-t.height)+"px"}}return TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)}})},{matches:{host:"email.t-online.de"},getParsingDetector:e=>({isSignature:e=>!1,isQuote:e=>"P"===e.nodeName&&e.textContent.trim().startsWith("-----Original-Nachricht")}),getRecipientInfo(e){try{const e=window.parent.document.querySelector(".multiObjectInputfield-object-text");if(e){const t=TweaksManager._removeEmail(e.textContent.trim()),a=TweaksManager._anonymizeEmail(e.getAttribute("title")||"");return Promise.resolve({address:`${t} <${a}>`,fullName:t})}}catch(e){}return Promise.resolve({address:"",fullName:""})}},{matches:{host:"twitch.tv"},getToolbarAppearance(e){const t=e.getAttribute("data-a-target"),a="chat-input"===t,o="video-chat-input"===t;return{isVisible:(e,t)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition(e,t,s){const r=TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,s);if(a&&r&&r.left){const t=!(!e.parentElement||!e.parentElement.querySelector("[data-a-target=bits-button]"));return Object.assign(r,{left:parseInt(r.left)-(t?60:25)+"px"})}return o&&r&&r.left&&r.top?Object.assign(r,{left:parseInt(r.left)+3+"px",top:parseInt(r.top)+5+"px"}):r}}}},{matches:{host:"liveworksheets.com"},getToolbarAppearance:e=>({isVisible(e,t){const a=t.getBorderBox(e);return a.width>=300&&a.height>=75},getPosition:(e,t,a)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)})},{matches:{host:"translate.yandex.ru"},isElementCompatible:e=>"fakeArea"===e.id&&e.isContentEditable||TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e)},{matches:{url:/translate\.google\.(\w)/i},isElementCompatible:e=>"source"===e.id&&"TEXTAREA"===e.nodeName||TweaksManager.DEFAULT_TWEAKS.isElementCompatible(e)},{matches:{host:"web.whatsapp.com"},getToolbarAppearance:e=>({isVisible:(e,t)=>t.getPaddingBox(e).width>350||TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition:(e,t,a)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)})},{matches:{host:"web.telegram.org"},getToolbarAppearance:e=>({isVisible:(e,t)=>TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).isVisible(e,t),getPosition(e,t,a){if(e.classList.contains("composer_rich_textarea")){let o=a.getPaddingBox(e),s=o.bottom-4-t.height,r=o.right-4-t.width;return{fixed:!1,left:Math.round(r)+"px",top:Math.round(s)+"px"}}return TweaksManager.DEFAULT_TWEAKS.getToolbarAppearance(e).getPosition(e,t,a)}})},{matches:{hosts:["onlinebanking.deutschebank.be","mabanque.bnpparibas"]},isElementCompatible:e=>!1},{matches:{hosts:["clickfunnels.com"]},supported:()=>!1,unsupportedMessage:()=>browser.i18n.getMessage("siteCannotBeSupported")}];