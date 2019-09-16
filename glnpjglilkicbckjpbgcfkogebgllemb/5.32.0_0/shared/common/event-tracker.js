Okta.EventTracker=function(t,e,n){var r=_okta,i=r.extend,a=r.partial,o=r.filter,E=Okta.Q,s=E.all,c={};var k={BTN:"BTN",LNK:"LNK",SRCH:"SRCH",CHCKBX:"CHCKBX"};var l={POPOVER:"Popover",MODAL:"Plugin Modal"};var T={general:{EU:"EU",CLOSE:"Close"},sso:{SIGN_IN:"Sign in",NEVER_SIGNIN:"Never sign in"},savePassword:{SAVE_PW:"Save PW"},onTheFlyAppAddition:{SAVE_PW:"Save PW",NEVER_THIS_APP:"Never for this app",DISABLE_ALL_APP:"Disable for all apps"},offline:{SIGN_IN:"Sign in"},changePassword:{FILL_FORM_NEW_PW:"Fill form with new password",FILL_FORM_CUR_PW:"Fill current password",GENERATE_PW:"Generate password",CONFIGURE_PW:"Settings"},verify:{VERIFY:"Verify yourself with Okta"},antiPhishingWarning:{LEAVE:"Get me out of here",CONTINUE:"I understand, continue"},antiPhishingError:{CLOSE_TAB:"Close Tab"},popover:{CHICLT:"Chiclet",TAB:"Tab",SEARCH_APPS:"Search Apps",SETTINGS:"Settings",WEB_VER:"Web Version",ACCOUNT:"Account",ACCOUNT_SWITCH:"Account Switcher",DELETE_ACCOUNT:"Delete Account",TRUST:"Trust",REJECT:"Reject"}};function v(){return t.getPluginSettings().then(function(r){if(r&&r.orgSettings){return!!r.orgSettings.pluginPendoTrackingEnabled}else{return false}})}function N(r,t,e){try{n.trackPendoEvent(r,t,e).fail(function(r){Log.error("EventTracker:: api.trackPendoEvent: "+r);return E()}).done();return E()}catch(r){Log.error("EventTracker:: trackPendoEvent: "+r);return E()}}c.trackEvent=function(o,c){if(!c){c={}}return v().then(function(r){if(!r){return E(false)}return s([e.getBrowserType(),t.getVersion(),e.getBackgroundVersion(),t.getEnduserHome()]).spread(function(r,t,e,n){var a=i({browser:r,pluginVersion:e,thrushVersion:t?t.contentVersion:"73.60.0"},c);return N(o,a,n)})})};function P(r,t,e){var n=[r,t,e];return o(n,function(r){return!!r}).join(" | ")}var p=a(P,r,r,l.POPOVER);var C=a(P,r,r,l.MODAL);c.modalGeneral={trackShowModal:a(c.trackEvent,C(null,T.general.EU)),trackCloseModal:a(c.trackEvent,C(k.BTN,T.general.CLOSE))};c.onTheFlyAppAddition={trackClickPrimaryButton:a(c.trackEvent,C(k.BTN,T.onTheFlyAppAddition.SAVE_PW)),trackClickNeverButton:a(c.trackEvent,C(k.BTN,T.onTheFlyAppAddition.NEVER_THIS_APP)),trackClickFooterLink:a(c.trackEvent,C(k.LNK,T.onTheFlyAppAddition.DISABLE_ALL_APP))};c.savePassword={trackClickPrimaryButton:a(c.trackEvent,C(k.BTN,T.savePassword.SAVE_PW))};c.offline={trackClickPrimaryButton:a(c.trackEvent,C(k.BTN,T.offline.SIGN_IN))};c.popover={trackPopoverOpened:function(){return t.getPopoverOpenedBy().then(function(r){return c.trackEvent(p(null,T.general.EU),{openedBy:r?r:"not supported"})})},trackAppLaunch:a(c.trackEvent,p(k.BTN,T.popover.CHICLT)),trackSelectTab:a(c.trackEvent,p(k.LNK,T.popover.TAB)),trackAppSearch:a(c.trackEvent,p(k.SRCH,T.popover.SEARCH_APPS)),trackSettingsClick:a(c.trackEvent,p(k.BTN,T.popover.SETTINGS)),trackSettingsToggle:a(c.trackEvent,p(k.CHCKBX,T.popover.SETTINGS)),trackWebVersionClick:a(c.trackEvent,p(k.LNK,T.popover.WEB_VER)),trackAccountSwitchClick:a(c.trackEvent,p(k.LNK,T.popover.ACCOUNT_SWITCH)),trackLaunchDifferentAccount:a(c.trackEvent,p(k.LNK,T.popover.ACCOUNT)),trackDeleteAccount:a(c.trackEvent,p(k.BTN,T.popover.DELETE_ACCOUNT)),trackTrustAccount:a(c.trackEvent,p(k.BTN,T.popover.TRUST)),trackRejectAccount:a(c.trackEvent,p(k.BTN,T.popover.REJECT))};c.singleSignOn={trackClickPrimaryButton:a(c.trackEvent,C(k.BTN,T.sso.SIGN_IN)),trackClickFooterLink:a(c.trackEvent,C(k.LNK,T.sso.NEVER_SIGNIN))};function u(){return E()}c.changePassword={trackGenerateNewRandomPassword:u,trackGenerateNewRandomPasswordClick:a(c.trackEvent,C(k.BTN,T.changePassword.GENERATE_PW)),trackConfigurePasswordClick:a(c.trackEvent,C(k.BTN,T.changePassword.CONFIGURE_PW)),trackFillWithGeneratedRandomPassword:a(c.trackEvent,C(k.BTN,T.changePassword.FILL_FORM_NEW_PW)),trackAutofillExistingPassword:a(c.trackEvent,C(k.LNK,T.changePassword.FILL_FORM_CUR_PW)),trackCopyToClipboard:u};c.verify={trackClickPrimaryButton:a(c.trackEvent,C(k.BTN,T.verify.VERIFY))};c.antiPhishingWarning={trackGetMeOutOfHere:a(c.trackEvent,C(k.BTN,T.antiPhishingWarning.LEAVE)),trackContinueAnyway:a(c.trackEvent,C(k.BTN,T.antiPhishingWarning.CONTINUE))};c.antiPhishingError={trackCloseTab:a(c.trackEvent,C(k.BTN,T.antiPhishingError.CLOSE_TAB))};c.generatePasswordOnSignUp={trackShowModal:u,trackGenerateNewRandomPassword:u,trackGenerateNewRandomPasswordClick:u,trackFillWithGeneratedRandomPassword:u,trackCopyToClipboard:u,trackDisableGeneratePassword:u,trackCloseModal:u};return c};