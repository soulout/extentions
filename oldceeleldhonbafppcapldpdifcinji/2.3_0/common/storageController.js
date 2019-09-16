/*! (C) Copyright 2018 LanguageTooler GmbH. All rights reserved. */
class StorageController{constructor(t=(t=>{})){this._onStoredDataChanged=(t=>{let e=!1,i=!1,n=!1,r=!1;for(const s in t)/^dictionary(_\d+)?$/.test(s)&&(e=!0),this._settings&&StorageController.DEFAULT_SETTINGS.hasOwnProperty(s)&&"dictionary"!==s&&(this._settings[s]=t[s].newValue,i=!0),this._privacySettings&&StorageController.DEFAULT_PRIVACY_SETTINGS.hasOwnProperty(s)&&(this._privacySettings[s]=t[s].newValue,n=!0),this._statistics&&StorageController.DEFAULT_STATISTICS.hasOwnProperty(s)&&(this._statistics[s]=t[s].newValue),this._uiState&&StorageController.DEFAULT_UI_STATE.hasOwnProperty(s)&&(this._uiState[s]=t[s].newValue,r=!0),this._testFlags&&StorageController.DEFAULT_TEST_FLAGS.hasOwnProperty(s)&&(this._testFlags[s]=t[s].newValue),"uniqueId"===s&&(this._uniqueId=t[s].newValue);i&&this._eventBus.fire(StorageController.eventNames.settingsChanged,t),e&&this._storage.get().then(t=>{if(!this._settings)return;const e=this._joinChunks(t,"dictionary"),i={dictionary:{oldValue:this._settings.dictionary,newValue:e}};this._settings.dictionary=e,this._eventBus.fire(StorageController.eventNames.settingsChanged,i)}),n&&this._eventBus.fire(StorageController.eventNames.privacySettingsChanged,t),r&&this._eventBus.fire(StorageController.eventNames.uiStateChanged,t)}),this._storage=StorageController._getStorage(),this._eventBus=new EventBus,this._ready=!1,this._onReadyCallbacks=[t],this._loadData(),browser.storage.onChanged.addListener(this._onStoredDataChanged)}static _deepClone(t){return JSON.parse(JSON.stringify(t||{}))}static _combineObjects(t,e){const i=StorageController._deepClone(t);for(const t in i)e.hasOwnProperty(t)&&(i[t]=e[t]);return i}static _dec2hex(t){return("0"+t.toString(16)).substr(-2)}static _getStringSize(t){let e=0;for(let i=0;i<t.length;i++){const n=t.charCodeAt(i);e+=n<128?1:n<2048?2:n<65536?3:n<1<<21?4:n<1<<26?5:n<1<<31?6:Number.NaN}return e}static _normalizeDomain(t=""){return t.toLowerCase().trim().replace(/^www\./,"")}static _isListContainsDomain(t,e){const i=StorageController._normalizeDomain(e);return(t||[]).some(t=>{const e=StorageController._normalizeDomain(t);return e===i||i.endsWith("."+e)})}static _getStorage(){return browser.storage.sync&&!BrowserDetector.isFirefox()?browser.storage.sync:browser.storage.local}_splitInChunks(t,e,i=this._storage.QUOTA_BYTES_PER_ITEM){let n=t[e],r=0,s=[],a=StorageController._getStringSize(e)+StorageController._getStringSize("[]");for(;n.length;){const o=n.shift(),l=StorageController._getStringSize(`,"${o}"`);if(a+l>i){t[0===r?e:`${e}_${r}`]=s,r++,s=[o],a=StorageController._getStringSize(`${e}_${i}`)+StorageController._getStringSize(`["${o}"]`)}else s.push(o),a+=l;if(0===n.length){t[0===r?e:`${e}_${r}`]=s}}t[`${e}_${r+1}`]=[]}_joinChunks(t,e,i=this._storage.MAX_ITEMS){let n=t[e]||[];for(let r=1;r<i;r++){const i=t[`${e}_${r}`];if(void 0===i||0===i.length)break;n=n.concat(i)}return n}_loadData(){return this._storage.get().then(t=>{const e=StorageController._combineObjects(StorageController.DEFAULT_SETTINGS,t);e.dictionary=this._joinChunks(t,"dictionary");for(const t of e.ignoredRules)if(void 0===t.description){const e=StorageController.DEFAULT_SETTINGS.ignoredRules.find(e=>e.id===t.id&&e.language===t.language);t.description=e?e.description:""}this._settings=e,this._privacySettings=StorageController._combineObjects(StorageController.DEFAULT_PRIVACY_SETTINGS,t),this._statistics=StorageController._combineObjects(StorageController.DEFAULT_STATISTICS,t),this._uiState=StorageController._combineObjects(StorageController.DEFAULT_UI_STATE,t),this._testFlags=StorageController._combineObjects(StorageController.DEFAULT_TEST_FLAGS,t),t.uniqueId?this._uniqueId=t.uniqueId:(this._uniqueId=this.generateUniqueId(),this._storage.set({uniqueId:this._uniqueId})),this._statistics.firstVisit||this.updateStatistics({firstVisit:Math.round(Date.now()/1e3)}),this._ready=!0,this._onReadyCallbacks.forEach(t=>t(this)),this._onReadyCallbacks=[]})}onReady(t){this._ready?t():this._onReadyCallbacks.push(t)}addEventListener(t,e){this._eventBus.subscribe(t,e)}generateUniqueId(){const t=new Uint8Array(8);return window.crypto.getRandomValues(t),Array.from(t,StorageController._dec2hex).join("")}getUniqueId(){return this._uniqueId}getSettings(){return StorageController._deepClone(this._settings)}updateSettings(t){for(const e in t)if(!StorageController.DEFAULT_SETTINGS.hasOwnProperty(e))throw new Error(`Unknown setting ${e}`);return void 0===t.dictionary||BrowserDetector.isFirefox()||this._splitInChunks(t,"dictionary"),Object.assign(this._settings||{},t),this._storage.set(t)}getValidationSettings(t){if(!this._settings)return{isDisabled:!1,isAutoCheckEnabled:!0,shouldCapitalizationBeChecked:!0};if(t===browser.runtime.id)return{isDisabled:!1,isAutoCheckEnabled:!0,shouldCapitalizationBeChecked:!0};const e=StorageController._isListContainsDomain(this._settings.disabledDomains,t),i=!StorageController._isListContainsDomain(this._settings.disabledDomainsCapitalization,t);if(this._settings.autoCheck){return{isDisabled:e,isAutoCheckEnabled:!StorageController._isListContainsDomain(this._settings.ignoreCheckOnDomains,t),shouldCapitalizationBeChecked:i}}return{isDisabled:e,isAutoCheckEnabled:StorageController._isListContainsDomain(this._settings.autoCheckOnDomains,t),shouldCapitalizationBeChecked:i}}disableDomain(t){const e=StorageController._normalizeDomain(t),i=this.getSettings(),n="object"==typeof i.disabledDomains?i.disabledDomains:[];return n.push(e),this.updateSettings({disabledDomains:n})}enableDomain(t){const e=StorageController._normalizeDomain(t),i=this.getSettings();let n="object"==typeof i.disabledDomains?i.disabledDomains:[];return n=n.filter(t=>{const i=StorageController._normalizeDomain(t);return i!==e&&!e.endsWith("."+i)}),this.updateSettings({disabledDomains:n})}disableCapitalization(t){const e=StorageController._normalizeDomain(t),i=this.getSettings(),n="object"==typeof i.disabledDomainsCapitalization?i.disabledDomainsCapitalization:[];return n.push(e),this.updateSettings({disabledDomainsCapitalization:n})}enableCapitalization(t){const e=StorageController._normalizeDomain(t),i=this.getSettings();let n="object"==typeof i.disabledDomainsCapitalization?i.disabledDomainsCapitalization:[];return n=n.filter(t=>{const i=StorageController._normalizeDomain(t);return i!==e&&!e.endsWith("."+i)}),this.updateSettings({disabledDomainsCapitalization:n})}isUsedCustomServer(){return Boolean(this._settings&&this._settings.apiServerUrl!==StorageController.DEFAULT_SETTINGS.apiServerUrl)}getPrivacySettings(){return StorageController._deepClone(this._privacySettings)}updatePrivacySettings(t){for(const e in t)if(!StorageController.DEFAULT_PRIVACY_SETTINGS.hasOwnProperty(e))throw new Error(`Unknown privacy setting ${e}`);return Object.assign(this._privacySettings||{},t),this._storage.set(t)}getStatistics(){return StorageController._deepClone(this._statistics)}updateStatistics(t){for(const e in t)if(!StorageController.DEFAULT_STATISTICS.hasOwnProperty(e))throw new Error(`Unknown privacy setting ${e}`);return Object.assign(this._statistics||{},t),this._storage.set(t)}getUIState(){return StorageController._deepClone(this._uiState)}updateUIState(t){for(const e in t)if(!StorageController.DEFAULT_UI_STATE.hasOwnProperty(e))throw new Error(`Unknown UI state ${e}`);return Object.assign(this._uiState||{},t),this._storage.set(t)}checkForPaidSubscription(){return new Promise((t,e)=>{this.onReady(()=>{const{havePremiumAccount:i,username:n,password:r,token:s,apiServerUrl:a}=this.getSettings();if(this.isUsedCustomServer())return this.disablePaidSubscription(),void t(!1);if(!i&&a===config.MAIN_SERVER_URL)return this.disablePaidSubscription(),void t(!1);const o=`${i?config.PREMIUM_SERVER_URL:a||config.MAIN_SERVER_URL}/check`,l=new URLSearchParams;l.append("language","en"),l.append("data",JSON.stringify({text:"languagetool testrule 8634756"})),n&&r?(l.append("username",n),l.append("password",r)):n&&s&&(l.append("username",n),l.append("tokenV2",s)),fetch(o,{method:"post",mode:"cors",body:l}).then(t=>t.json()).then(e=>{const i=e.matches.some(t=>"PREMIUM_FAKE_RULE"===t.rule.id);i?this.enablePaidSubscription():this.disablePaidSubscription(),t(i)}).catch(e)})})}enablePaidSubscription(){return!this._uiState||this._uiState.hasPaidSubscription?Promise.resolve():this.updateUIState({hasPaidSubscription:!0})}disablePaidSubscription(){return this._uiState&&this._uiState.hasPaidSubscription?this.updateUIState({hasPaidSubscription:!1}):Promise.resolve()}getTestFlags(){return StorageController._deepClone(this._testFlags)}updateTestFlags(t){for(const e in t)if(!StorageController.DEFAULT_TEST_FLAGS.hasOwnProperty(e))throw new Error(`Unknown test flag ${e}`);return Object.assign(this._testFlags||{},t),this._storage.set(t)}destroy(){this._ready=!1,this._eventBus.destroy(),this._onReadyCallbacks=[];try{browser.storage.onChanged.removeListener(this._onStoredDataChanged)}catch(t){}}}StorageController.eventNames={settingsChanged:"lt-storageController.settingsChanged",privacySettingsChanged:"lt-storageController.privacySettingsChanged",uiStateChanged:"lt-storageController.uiStateChanged"},StorageController.DEFAULT_SETTINGS={apiServerUrl:config.MAIN_SERVER_URL,otherServerUrl:"",autoCheck:!0,havePremiumAccount:!1,knownEmail:"",username:"",password:"",token:"",motherTongue:"",geoIpLanguages:[],geoIpCountry:"",enVariant:getPreferredVariantFromBrowserLanguage(["en-US","en-GB","en-AU","en-CA","en-NZ","en-ZA"])||"en-US",deVariant:getPreferredVariantFromBrowserLanguage(["de-DE","de-AT","de-CH"])||"de-DE",ptVariant:getPreferredVariantFromBrowserLanguage(["pt-PT","pt-BR","pt-MZ","pt-AO"])||"pt-PT",caVariant:"ca-ES",dictionary:[],ignoredRules:[{id:"PUNCTUATION_PARAGRAPH_END",language:"*",description:"No punctuation mark at the end of paragraph"},{id:"DASH_RULE",language:"*",description:"Hyphen, n-dash and m-dash"},{id:"FINAL_PUNCTUATION",language:"pt",description:"Pontuagão final em falta"},{id:"FINAL_STOPS",language:"pt",description:"Pontuação: pontuação final em falta"},{id:"SMART_QUOTES",language:"pt",description:"Aspas inteligentes (“”)"},{id:"ELLIPSIS",language:"pt",description:"Reticências inteligentes (…)"},{id:"EN_QUOTES",language:"en",description:"Smart quotes (“”)"},{id:"TYPOGRAFISCHE_ANFUEHRUNGSZEICHEN",language:"de",description:"Typografische Anführungszeichen und Prime"},{id:"FALSCHE_VERWENDUNG_DES_BINDESTRICHS",language:"de",description:"Mögliche falsche Verwendung des Bindestrichs"},{id:"BISSTRICH",language:"de",description:"Bis-Strich vs. Bindestrich"},{id:"AUSLASSUNGSPUNKTE",language:"de",description:"Auslassungspunkte"},{id:"ABKUERZUNG_LEERZEICHEN",language:"de",description:'Geschütztes Leerzeichen bei Abkürzungen wie "z. B."'},{id:"EINDE_ZIN_ONVERWACHT",language:"nl",description:"Onverwacht einde zin"},{id:"BACKTICK",language:"nl",description:"Geen ` (backtick)"},{id:"GEDACHTESTREEPJE",language:"nl",description:"Gedachtestreepje"},{id:"PUNT_FINAL",language:"ca",description:"Falta el punt final en frases llargues"}],disabledDomains:[],disabledDomainsCapitalization:[],ignoreCheckOnDomains:[],autoCheckOnDomains:[]},StorageController.DEFAULT_PRIVACY_SETTINGS={allowRemoteCheck:!1},StorageController.DEFAULT_STATISTICS={usageCount:0,sessionCount:0,appliedSuggestions:0,hiddenErrors:[],firstVisit:null,ratingValue:null,premiumClicks:0},StorageController.DEFAULT_UI_STATE={hasSeenPrivacyConfirmationDialog:!1,hasPaidSubscription:!1,hasRated:!1,hasUsedValidator:!1,hasSeenOnboarding:!1,isNewUser:!1},StorageController.DEFAULT_TEST_FLAGS={frenchPremiumRules:null};