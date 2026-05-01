/* Perpl Explainer — figure lightbox
   ----------------------------------
   Auto-attaches click-to-enlarge on every <svg class="fig-svg"> on the page.
   Opt-in: include with
     <script src="/lightbox.js" defer></script>
   in any explainer that has SVG figures.

   Uses the native <dialog> element for focus trap + ESC dismissal +
   backdrop click. No dependencies. Respects prefers-reduced-motion.
*/
(function () {
  'use strict';

  const figures = document.querySelectorAll('.fig-svg');
  if (!figures.length) return;

  let dialog = null;

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = document.createElement('dialog');
    dialog.id = 'figure-lightbox';
    dialog.innerHTML =
      '<button type="button" class="lightbox-close" aria-label="Close figure">×</button>' +
      '<div class="lightbox-content"></div>';
    dialog.addEventListener('click', function (e) {
      // Click on backdrop (the dialog itself) or close button dismisses.
      if (e.target === dialog || e.target.classList.contains('lightbox-close')) {
        dialog.close();
      }
    });
    document.body.appendChild(dialog);
    return dialog;
  }

  function openFigure(svg) {
    const d = ensureDialog();
    const content = d.querySelector('.lightbox-content');
    content.innerHTML = '';
    const clone = svg.cloneNode(true);
    // Strip the .fig-svg class so the lightbox-svg styling applies cleanly.
    clone.classList.remove('fig-svg');
    clone.classList.add('lightbox-svg');
    content.appendChild(clone);
    d.showModal();
  }

  figures.forEach(function (svg) {
    // Wrap the SVG so we can position a "click to enlarge" badge.
    const parent = svg.parentNode;
    const wrap = document.createElement('div');
    wrap.className = 'fig-zoom-wrap';
    parent.insertBefore(wrap, svg);
    wrap.appendChild(svg);

    const badge = document.createElement('span');
    badge.className = 'fig-zoom-badge';
    badge.textContent = '⤢ Click to enlarge';
    badge.setAttribute('aria-hidden', 'true');
    wrap.appendChild(badge);

    svg.classList.add('fig-zoomable');
    svg.setAttribute('tabindex', '0');

    svg.addEventListener('click', function () { openFigure(svg); });
    svg.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openFigure(svg);
      }
    });
  });
})();
