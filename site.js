(function () {
  var old = /^#project\/([a-z-]+)$/.exec(location.hash);
  if (old && document.querySelector('a[href="p/' + old[1] + '.html"]')) return location.replace('p/' + old[1] + '.html');
  var root = document.documentElement;
  var toggle = document.querySelector('.tg');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      var apply = function () { root.dataset.theme = next; };
      if (document.startViewTransition) document.startViewTransition(apply); else apply();
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    var label = button.textContent;
    var box = button.closest('.mail');
    var status = box && box.querySelector('[role=status]');
    function select() {
      var code = box && box.querySelector('code');
      if (!code) return;
      var range = document.createRange();
      range.selectNodeContents(code);
      var selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    button.addEventListener('click', function () {
      if (!navigator.clipboard) return select();
      navigator.clipboard.writeText(button.dataset.copy).then(function () {
        button.textContent = button.dataset.done;
        if (status) status.textContent = button.dataset.msg;
        setTimeout(function () {
          button.textContent = label;
          if (status) status.textContent = '';
        }, 1600);
      }, select);
    });
  });
})();
