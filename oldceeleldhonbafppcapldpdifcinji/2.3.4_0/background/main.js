/*! (C) Copyright 2018 LanguageTooler GmbH. All rights reserved. */
function isPageLoadedMessage(e){return"PAGE_LOADED"===e.command}function isExtensionStatusChangedMessage(e){return"EXTENSION_STATUS_CHANGED"===e.command}function isCheckForPaidSubscriptionMessage(e){return"CHECK_FOR_PAID_SUBSCRIPTION"===e.command}function isTrackTextLength(e){return"TRACK_TEXT_LENGTH"===e.command}function isTrackEventMessage(e){return"TRACK_EVENT"===e.command}function isShowTurnOnHintMessage(e){return"SHOW_TURN_ON_HINT"===e.command}function isOpenFeedbackFormMessage(e){return"OPEN_FEEDBACK_FORM"===e.command}function isSendFeedbackMessage(e){return"SEND_FEEDBACK"===e.command}function isOpenOptionsMessage(e){return"OPEN_OPTIONS"===e.command}function isOpenPrivacyConfirmationMessage(e){return"OPEN_PRIVACY_CONFIRMATION"===e.command}function isCloseCurrentTabMessage(e){return"CLOSE_CURRENT_TAB"===e.command}function isValidateTextMessage(e){return"VALIDATE_TEXT"===e.command}function isLaunchValidatorMessage(e){return"LAUNCH_VALIDATOR"===e.command}function isValidatorLoadedMessage(e){return"VALIDATOR_LOADED"===e.command}function isSetGoogleDocsPluginState(e){return"SET_GOOGLE_DOCS_PLUGIN_STATE"===e.command}function isGetGoogleDocsPluginState(e){return"GET_GOOGLE_DOCS_PLUGIN_STATE"===e.command}function isStartDictionarySync(e){return"START_DICTIONARY_SYNC"===e.command}function isGetPreferredLanguagesMessage(e){return"GET_PREFERRED_LANGUAGES"===e.command}function isRemoveWordFromDictionaryMessage(e){return"REMOVE_WORD_FROM_DICTIONARY"===e.command}function isAddWordToDictionaryMessage(e){return"ADD_WORD_TO_DICTIONARY"===e.command}function isBatchAddWordToDictionaryMessage(e){return"BATCH_ADD_WORDS_TO_DICTIONARY"===e.command}function isClearDictionaryMessage(e){return"CLEAR_DICTIONARY"===e.command}class BackgroundApp{static _constructor(){if(!BackgroundApp._isInitialized){if(BackgroundApp._onDataLoaded=BackgroundApp._onDataLoaded.bind(BackgroundApp),BackgroundApp._onInstalled=BackgroundApp._onInstalled.bind(BackgroundApp),BackgroundApp._onMessage=BackgroundApp._onMessage.bind(BackgroundApp),BackgroundApp._onValidateClicked=BackgroundApp._onValidateClicked.bind(BackgroundApp),BackgroundApp._storageController=new StorageController(BackgroundApp._onDataLoaded),browser.runtime.onInstalled.addListener(BackgroundApp._onInstalled),browser.runtime.onMessage.addListener(BackgroundApp._onMessage),browser.contextMenus&&browser.contextMenus.create({title:browser.i18n.getMessage("contextMenuValidate"),contexts:["selection"],onclick:BackgroundApp._onValidateClicked}),DictionarySync.init(),this._updateIcon(),setInterval(()=>this._updateIcon(),6e4),BrowserDetector.isFirefox()){const e=()=>{browser.runtime.onUpdateAvailable.removeListener(e),this._installUpdate()};browser.runtime.onUpdateAvailable.addListener(e)}this._isInitialized=!0}}static _installUpdate(){browser.tabs.query({}).then(e=>{e.forEach(e=>{e.id&&browser.tabs.sendMessage(e.id,{command:"DESTROY"}).catch(console.error)})}),Tracker.trackEvent("Action","pre_update"),setTimeout(()=>{browser.runtime.reload()},2e3)}static _assignToTestGroups(){if(!isProductionEnvironment())return;const{frenchPremiumRules:e}=this._storageController.getTestFlags();e||this._storageController.updateTestFlags({frenchPremiumRules:Math.random()<.5?"test":"control"})}static _updateIcon(){if("undefined"!=typeof window&&window.matchMedia)if(window.matchMedia("(prefers-color-scheme: dark)").matches){if(this._darkMode)return;this._darkMode=!0,browser.browserAction.setIcon({path:{16:"/assets/images/icons/icon16_white.png",32:"/assets/images/icons/icon32_white.png",48:"/assets/images/icons/icon48_white.png",64:"/assets/images/icons/icon64_white.png",128:"/assets/images/icons/icon128_white.png"}})}else{if(!this._darkMode)return;this._darkMode=!1,browser.browserAction.setIcon({path:{16:"/assets/images/icons/icon16.png",32:"/assets/images/icons/icon32.png",48:"/assets/images/icons/icon48.png",64:"/assets/images/icons/icon64.png",128:"/assets/images/icons/icon128.png"}})}}static _updateBadge(e,t){browser.browserAction.setBadgeTextColor&&browser.browserAction.setBadgeTextColor({tabId:e,color:"#FFFFFF"}),t.enabled&&t.supported?t.capitalization?browser.browserAction.setBadgeText({tabId:e,text:""}):(browser.browserAction.setBadgeBackgroundColor({tabId:e,color:"#45A8FC"}),browser.browserAction.setBadgeText({tabId:e,text:BrowserDetector.isOpera()?"":"abc"})):(browser.browserAction.setBadgeBackgroundColor({tabId:e,color:"#F53987"}),browser.browserAction.setBadgeText({tabId:e,text:BrowserDetector.isOpera()?"":"OFF"}))}static _updateUninstallURL(e="unknown"){const t=BackgroundApp._storageController.getSettings(),a=BackgroundApp._storageController.getPrivacySettings(),n=BackgroundApp._storageController.getStatistics(),o=BackgroundApp._storageController.getTestFlags(),r=browser.runtime.getManifest(),s=r&&r.version||"unknown";e=e.slice(0,25);let i=`${config.UNINSTALL_URL}?autoCheck=${t.autoCheck}`;i+=`&host=${encodeURIComponent(e)}&v=${s}&privacyConfirmed=${a.allowRemoteCheck}`,i+=`&usages=${n.usageCount}&sessions=${n.sessionCount}`;const c=BackgroundApp._storageController.getUniqueId();c&&(i+=`&matomo=${c}`);for(const e in o)o.hasOwnProperty(e)&&(i+=`&${e}=${o[e]}`);isProductionEnvironment()||(i+="&dev"),i=i.slice(0,255),browser.runtime.setUninstallURL(i)}static _setMotherTongue(){BackgroundApp._storageController.onReady(()=>{const{motherTongue:e,geoIpLanguages:t}=BackgroundApp._storageController.getSettings();if(e)return;const a=t.some(e=>!!e.match(/^de/i))&&navigator.languages[0]&&navigator.languages[0].match(/^de/i)&&browser.i18n.getUILanguage().match(/^de/i),n=Array.from(navigator.languages).some(e=>!e.match(/^(de|en)/i));a&&!n&&(Tracker.trackEvent("Action","set_mother_tongue","de"),BackgroundApp._storageController.updateSettings({motherTongue:"de"}))})}static _launchValidator(e){const t=Math.round(99999*Math.random())+":"+Date.now();BackgroundApp._validatorsData[t]={id:t,text:e,timestamp:Date.now()},browser.tabs.create({url:browser.runtime.getURL(`/validator/validator.html?id=${t}`)})}static _onDataLoaded(){BackgroundApp._storageController.checkForPaidSubscription().catch(e=>{Tracker.trackError("js",`Error checking paid subscripton: ${e&&e.message}`)}),Tracker.trackActivity(),BackgroundApp._updateUninstallURL()}static _onInstalled(e){const{reason:t,previousVersion:a}=e;BackgroundApp._storageController.onReady(()=>{if("install"===t){if(!BackgroundApp._storageController.getPrivacySettings().allowRemoteCheck&&!BackgroundApp._storageController.getUIState().hasSeenPrivacyConfirmationDialog){BackgroundApp._storageController.updateUIState({hasSeenPrivacyConfirmationDialog:!0});let e=`${config.INSTALL_URL}?new`;isProductionEnvironment()||(e+="&dev"),browser.tabs.create({url:e}),BackgroundApp._assignToTestGroups(),BackgroundApp._updateUninstallURL(),getLanguagesForGeoIPCountry().then(e=>{"US"!==e.geoIpCountry||e.geoIpLanguages.includes("es")?["MA","DZ","TN"].includes(e.geoIpCountry)&&!e.geoIpLanguages.includes("fr")&&e.geoIpLanguages.push("fr"):e.geoIpLanguages.push("es");const t={geoIpLanguages:e.geoIpLanguages,geoIpCountry:e.geoIpCountry||""};"GB"===e.geoIpCountry?t.enVariant="en-GB":"US"===e.geoIpCountry?t.enVariant="en-US":"CA"===e.geoIpCountry?t.enVariant="en-CA":"NZ"===e.geoIpCountry?t.enVariant="en-NZ":"AU"===e.geoIpCountry?t.enVariant="en-AU":"ZA"===e.geoIpCountry?t.enVariant="en-ZA":"DE"===e.geoIpCountry?t.deVariant="de-DE":"AT"===e.geoIpCountry?t.deVariant="de-AT":"CH"===e.geoIpCountry?t.deVariant="de-CH":"BR"===e.geoIpCountry?t.ptVariant="pt-BR":"PT"===e.geoIpCountry&&(t.ptVariant="pt-PT"),BackgroundApp._storageController.updateSettings(t),BackgroundApp._setMotherTongue()}).catch(e=>{Tracker.trackError("js",e&&e.message)}),Tracker.trackInstall()}}else if("update"===t){BackgroundApp._assignToTestGroups(),BackgroundApp._updateUninstallURL();const e=browser.runtime.getManifest(),t=e&&e.version||"unknown";a!==t&&Tracker.trackEvent("Action","update",String(t));const{apiServerUrl:n}=this._storageController.getSettings();"https://languagetool.org/api/v2"!==n&&"https://languagetool.org/api/v2/"!==n||(this._storageController.updateSettings({apiServerUrl:config.MAIN_SERVER_URL}),Tracker.trackEvent("Action","update:migrate_api_server_url"))}})}static _onMessage(e,t,a){let n;return isPageLoadedMessage(e)?n=BackgroundApp._onPageLoadedMessage(t,e):isExtensionStatusChangedMessage(e)?n=BackgroundApp._onExtensionStatusChangedMessage(t,e):isCheckForPaidSubscriptionMessage(e)?n=BackgroundApp._onCheckForPaidSubscriptionMessage(t,e):isTrackTextLength(e)?n=BackgroundApp._onTrackTextLengthMessage(t,e):isTrackEventMessage(e)?n=BackgroundApp._onTrackEventMessage(t,e):isShowTurnOnHintMessage(e)?n=BackgroundApp._onShowTurnOnHintMessage(t,e):isOpenFeedbackFormMessage(e)?n=BackgroundApp._onOpenFeedbackFormMessage(t,e):isSendFeedbackMessage(e)?n=BackgroundApp._onSendFeedbackMessage(t,e):isOpenOptionsMessage(e)?n=BackgroundApp._onOpenOptionsMessage(t,e):isOpenPrivacyConfirmationMessage(e)?n=BackgroundApp._onOpenPrivacyConfirmationMessage(t,e):isCloseCurrentTabMessage(e)?n=BackgroundApp._onCloseCurrentTabMessage(t,e):isValidateTextMessage(e)?n=BackgroundApp._onValidateTextMessage(t,e):isLaunchValidatorMessage(e)?n=BackgroundApp._onLaunchValidatorMessage(t,e):isValidatorLoadedMessage(e)?n=BackgroundApp._onValidatorLoadedMessage(t,e):isSetGoogleDocsPluginState(e)?n=BackgroundApp._onSetGoogleDocsPluginState(t,e):isGetGoogleDocsPluginState(e)?n=BackgroundApp._onGetGoogleDocsPluginState(t,e):isStartDictionarySync(e)?n=BackgroundApp._onStartDictionarySyncMessage(t,e):isAddWordToDictionaryMessage(e)?n=BackgroundApp._onAddWordToDictionaryMessage(t,e):isBatchAddWordToDictionaryMessage(e)?n=BackgroundApp._onBatchAddWordToDictionaryMessage(t,e):isRemoveWordFromDictionaryMessage(e)?n=BackgroundApp._onRemoveWordFromDictionaryMessage(t,e):isClearDictionaryMessage(e)?n=BackgroundApp._onClearDictionaryMessage(t,e):isGetPreferredLanguagesMessage(e)&&(n=BackgroundApp._onGetPreferredLanguagesMessage(t,e)),n||Promise.resolve(null)}static _onPageLoadedMessage(e,t){if(0!==e.frameId||!e.tab)return;const a=e.tab.id,n={enabled:t.enabled,capitalization:t.capitalization,supported:t.supported,unsupportedMessage:t.unsupportedMessage,language:null};BackgroundApp._extensionStates[a]=n,browser.tabs.detectLanguage(a).then(e=>{e&&"und"!==e&&(n.language=getPrimaryLanguageCode(e))}).catch(e=>{console.error("Error detecting language",e)}),BackgroundApp._updateBadge(a,n),BackgroundApp._updateUninstallURL(getHostNameFromUrl(e.tab.url))}static _onExtensionStatusChangedMessage(e,t){const a=t.tabId||e.tab.id;if(!BackgroundApp._extensionStates.hasOwnProperty(a))return;const n=BackgroundApp._extensionStates[a];"enabled"in t&&(n.enabled=t.enabled),"capitalization"in t&&(n.capitalization=t.capitalization),BackgroundApp._updateBadge(a,n)}static _onCheckForPaidSubscriptionMessage(e,t){return Validator.checkForPaidSubscription(t.username,t.password,t.token).then(e=>{return{isSuccessful:!0,hasPaidSubscription:e}}).catch(e=>{return{isSuccessful:!1,error:{reason:e.reason,status:e.status,message:e.message,response:e.response,stack:e.stack}}})}static _onTrackTextLengthMessage(e,t){Tracker.trackTextLength(t.textLength)}static _onTrackEventMessage(e,t){Tracker.trackEvent("Action",t.action,t.label)}static _onShowTurnOnHintMessage(e,t){browser.tabs.sendMessage(e.tab.id,t,{frameId:0})}static _onOpenFeedbackFormMessage(e,t){let a=`/feedbackForm/feedbackForm.html?url=${encodeURIComponent(t.url.substr(0,200))}`;t.html&&(a+=`&html=${encodeURIComponent(t.html.substr(0,400))}`),t.title&&(a+=`&title=${encodeURIComponent(t.title)}`),browser.windows.create({url:browser.runtime.getURL(a),type:"popup",width:380,height:520}).then(e=>{e&&e.id&&browser.windows.update(e.id,{left:Math.round((BrowserDetector.isChromium()&&e.left||0)+(screen.availWidth-380)/2),top:Math.round((BrowserDetector.isChromium()&&e.top||0)+(screen.availHeight-520)/2)})})}static _onSendFeedbackMessage(e,t){fetch(config.FEEDBACK_SERVER_URL,{method:"POST",mode:"cors",body:JSON.stringify({sender:t.sender,text:t.text})}).catch(()=>{Tracker.trackError("http","error_send_feedback")})}static _onOpenOptionsMessage(e,t){let a="/options/options.html";t.ref&&(a+=`?ref=${encodeURIComponent(t.ref)}`),browser.tabs.create({url:browser.runtime.getURL(a)})}static _onOpenPrivacyConfirmationMessage(e,t){browser.tabs.create({url:config.INSTALL_URL})}static _onCloseCurrentTabMessage(e,t){browser.tabs.query({currentWindow:!0,active:!0}).then(e=>{e.length&&browser.tabs.remove(e[0].id)})}static _getPreferredLanguages(e){const{geoIpLanguages:t,motherTongue:a}=BackgroundApp._storageController.getSettings();let n=[];if(a&&n.push(a),e.tab){const t=BackgroundApp._extensionStates[e.tab.id];t&&t.language&&n.push(t.language)}return(n=n.concat(getUserLanguageCodes()).concat(t)).push("en"),uniq(n)}static _onValidateTextMessage(e,t){Tracker.trackActivity();const a=BackgroundApp._storageController.getUIState().hasPaidSubscription||BackgroundApp._storageController.isUsedCustomServer()?config.MAX_TEXT_LENGTH_PREMIUM:config.MAX_TEXT_LENGTH;if(t.text.length>=a){const e={command:"VALIDATION_FAILED",instanceId:t.metaData.instanceId,exception:{status:400,message:browser.i18n.getMessage("textTooLong"),response:"Text too long"}};return Promise.resolve(e)}if(0===BackgroundApp._validationThrottlingCount&&setTimeout(()=>{BackgroundApp._validationThrottlingCount=0},5e3),BackgroundApp._validationThrottlingCount++,BackgroundApp._validationThrottlingCount>25){const e={command:"VALIDATION_FAILED",instanceId:t.metaData.instanceId,exception:{status:0,message:"Too many checks within five seconds. Please try again in a couple of seconds.",response:"Too many checks within five seconds. Please try again in a couple of seconds."}};return Promise.resolve(e)}const n=this._getPreferredLanguages(e);t.elementLanguage&&n.push(getPrimaryLanguageCode(t.elementLanguage));const o=BackgroundApp._storageController.getStatistics().usageCount+1;return BackgroundApp._storageController.updateStatistics({usageCount:o}),BackgroundApp._updateUninstallURL(getHostNameFromUrl(t.metaData.url)),Promise.all([Validator.validate(t.text,t.forceLanguage?t.language:null,n,t.metaData,t.hasUserChangedLanguage),Validator.partialValidate(t.changedParagraphs,t.language,n,t.metaData,!t.forceLanguage)]).then(([e,a])=>{const o=e.language||t.language,r=o&&o.name===BackgroundApp.UNSUPPORTED_LANGUAGE_NAME;return r&&(o.code=n[0]),{command:"VALIDATION_COMPLETED",instanceId:t.metaData.instanceId,text:t.text,changedParagraphs:t.changedParagraphs,language:o,isUnsupportedLanguage:r,isIncompleteResult:a.isIncompleteResult,validationErrors:e.errors,validationHiddenErrors:e.hiddenErrors,partialValidationErrors:a.errors,partialValidationHiddenErrors:a.hiddenErrors}}).catch(e=>{if(!e||"AbortError"!==e.reason)return{command:"VALIDATION_FAILED",instanceId:t.metaData.instanceId,exception:{reason:e.reason,status:e.status,message:e.message,response:e.response,stack:e.stack}}})}static _onLaunchValidatorMessage(e,t){BackgroundApp._launchValidator(t.text)}static _onValidatorLoadedMessage(e,t){const a=BackgroundApp._validatorsData[t.id];return BackgroundApp._validatorsData[t.id]=null,Promise.resolve({text:a?a.text:""})}static _onSetGoogleDocsPluginState(e,t){this._hasGoogleDocsPluginInstalled=t.value;const a=e.tab.id;this._hasGoogleDocsPluginInstalled&&this._extensionStates[a]&&(this._extensionStates[a].supported=!0,this._updateBadge(a,this._extensionStates[a])),Tracker.trackEvent("Action","google_docs_plugin_installed",String(t.value))}static _onGetGoogleDocsPluginState(e,t){return Promise.resolve({value:this._hasGoogleDocsPluginInstalled})}static _onStartDictionarySyncMessage(e,t){DictionarySync.checkForInitialSync()}static _onAddWordToDictionaryMessage(e,t){DictionarySync.addWord(t.word).catch(()=>null)}static _onBatchAddWordToDictionaryMessage(e,t){DictionarySync.addBatch(t.words).catch(()=>null)}static _onRemoveWordFromDictionaryMessage(e,t){DictionarySync.removeWord(t.word).catch(()=>null)}static _onClearDictionaryMessage(e,t){DictionarySync.removeBatch(this._storageController.getSettings().dictionary).catch(()=>null)}static _onGetPreferredLanguagesMessage(e,t){const a=this._getPreferredLanguages(e),n=this._storageController.getSettings(),o=a.map(e=>n[`${e}Variant`]||e);return Promise.resolve(o)}static _onValidateClicked(e,t){t?browser.tabs.sendMessage(t.id,{command:"GET_SELECTED_TEXT"}).then(e=>{BackgroundApp._launchValidator(e.selectedText)}).catch(t=>{BackgroundApp._launchValidator(e.selectionText)}):BackgroundApp._launchValidator(e.selectionText),BackgroundApp._storageController.updateUIState({hasUsedValidator:!0})}}BackgroundApp.UNSUPPORTED_LANGUAGE_NAME="NoopLanguage",BackgroundApp._hasGoogleDocsPluginInstalled=!1,BackgroundApp._extensionStates=new Map,BackgroundApp._validationThrottlingCount=0,BackgroundApp._validatorsData=new Map,BackgroundApp._isInitialized=!1,BackgroundApp._darkMode=!1,BackgroundApp._constructor();