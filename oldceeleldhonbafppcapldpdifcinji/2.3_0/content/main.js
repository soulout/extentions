/*! (C) Copyright 2018 LanguageTooler GmbH. All rights reserved. */
let currentDocumentElement,interval;function initLTAssistantIfNeeded(){dispatchCustomEvent(LTAssistant.eventNames.destroy,{}),(currentDocumentElement=document.documentElement)&&!currentDocumentElement.hasAttribute("data-lt-installed")&&(window.ltAssistant=new LTAssistant({onDestroy:()=>{clearInterval(interval)}}),clearInterval(interval),interval=setInterval(()=>{currentDocumentElement===document.documentElement||BrowserDetector.isFirefox()||initLTAssistantIfNeeded()},1e3))}window.ltAssistant||initLTAssistantIfNeeded();