'use strict';

import 'normalize.css/normalize.css';
import './index.css';
import mojs from 'mo-js';

(function() {
  // Fake loading.
  setTimeout(init, 1000);

  function init() {
    document.body.classList.remove('loading');
    title(document.getElementById('js-el-1'), document.getElementById('js-txt-1'), 0);
    title(document.getElementById('js-el-2'), document.getElementById('js-txt-2'), 250);
    document.addEventListener('click', renderBurst);
  };

  const title = (blockEl, textEl, wait) => {
    blockEl.style.WebkitTransformOrigin = '100% 50% 0px';
    blockEl.style.transformOrigin = '100% 50% 0px';

    let animation = new mojs.Html({
      el: blockEl,
      opacity: { 0 : 1, duration: 100, delay: (0 + wait), easing: 'linear.none' },
      scaleX: {
        0 : 1,
        duration: 500,
        delay: (150 + wait),
        easing: 'quint.inout',
        onComplete(isForward, isYoyo) {
          blockEl.style.WebkitTransformOrigin = '0% 50% 0px';
          blockEl.style.transformOrigin = '0% 50% 0px';
          textEl.style.opacity = 1;
        }
      }
    }).then({
      scaleX: { 1 : 0, duration: 500, easing: 'quint.inout' }
    }).play();
  };

  const burst = new mojs.Burst({
    left: 0,
    top: 0,
    count:  6,
    angle: { 0: 90 },
    radius: { 10 : 25 },
    opacity: { 1: 0 },
    children: {
      shape: 'line',
      radius: 7,
      radiusY: 0,
      scale: 1,
      strokeDasharray: '100%',
      strokeDashoffset: { '-100%' : '100%' },
      stroke: '#FC2D79' ,
      easing: 'linear.none',
      duration: 600
    }
  });

  const renderBurst = (e) => {
    burst.tune({ x: e.pageX, y: e.pageY }).replay()
  };
})();

