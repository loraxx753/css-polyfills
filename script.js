const script = document.createElement('script');
const link = document.createElement('link');

function appendThisScriptToTheBodyTag(src, callback, options) {
  // Explicitly set the defaults for any optional parameters of the function
  options = (options) ? options : new Object()
  callback = (callback) ? callback : new Function()

  const scriptClone = script.cloneNode(true);
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode
  
  
  scriptClone.setAttribute('src', src)
  for(var key in options) {
    scriptClone.setAttribute(key, options[key])
  }
  document.body.appendChild(scriptClone)
  scriptClone.onload = callback
}

function appendThisLinkToTheHeadTag(src) {
  const linkClone = link.cloneNode(true);
  linkClone.setAttribute('href', src)
  linkClone.setAttribute('rel', 'stylesheet')
  linkClone.setAttribute('type', 'text/css')
  document.head.appendChild(linkClone)
}


(function() {	
  const polyfills = {
    "css": {
      "variables": "https://unpkg.com/css-vars-ponyfill@1",
      "grid": "https://rawgit.com/FremyCompany/css-grid-polyfill/master/bin/css-polyfills.js"
    }
  }
  /* ☝️ Legend
  language: { 
    //Github url
    functionality: url,
    ...
  }
  */

  const thisIsALegacyBrowser = !('serviceWorker' in navigator);
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/serviceWorker#Examples
  
  if (thisIsALegacyBrowser) {
    appendThisScriptToTheBodyTag(polyfills.css.variables, function() { cssVars() });
    
    appendThisScriptToTheBodyTag(polyfills.css.grid)
    
    appendThisLinkToTheHeadTag('styles/legacy.css')
  }
})()
