/**
 * FraVeRa Journey — Partial Include Loader
 * Loads header and footer partials into pages
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    partialsPath: '/partials/',
    cacheBuster: Date.now()
  };

  /**
   * Load a partial into an element
   */
  async function loadPartial(url, targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    try {
      const response = await fetch(`${url}?v=${CONFIG.cacheBuster}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      target.innerHTML = html;
      
      // Execute any scripts in the partial
      target.querySelectorAll('script').forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
      
      // Dispatch event for partial loaded - POPRAWIONE: więcej szczegółów
      const event = new CustomEvent('partialLoaded', {
        detail: { 
          target: targetSelector, 
          url: url,
          timestamp: Date.now()
        },
        bubbles: true,
        cancelable: true
      });
      
      document.dispatchEvent(event);
      console.log(`Partial loaded: ${url} into ${targetSelector}`);
      
    } catch (error) {
      console.error(`Failed to load partial: ${url}`, error);
      target.innerHTML = `<!-- Failed to load ${url} -->`;
    }
  }

  /**
   * Detect current language from URL path
   */
  function detectLanguage() {
    const path = window.location.pathname;
    if (path.startsWith('/pl/')) return 'pl';
    if (path.startsWith('/en/')) return 'en';
    if (path.startsWith('/nl/')) return 'nl';
    return 'en'; // default
  }

  /**
   * Initialize partial loading
   */
  function init() {
    const lang = detectLanguage();
    
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      loadPartial(`${CONFIG.partialsPath}header-${lang}.html`, '#header-placeholder');
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      loadPartial(`${CONFIG.partialsPath}footer-${lang}.html`, '#footer-placeholder');
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();