// http://codepen.io/jessehouchins/pen/rWZxwr
// https://github.com/select2/select2/issues/3279

function regexpStr(str) {
  var specials = ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "^", "$"];
  var regexp = new RegExp("(\\" + specials.join("|\\") + ")", "g");
  str = str.replace(regexp, "\\$1"); // replace symbol
  str = str.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " "); // trim begin, end and between words
  // 'and' condition
  str = str.split(" ").join(")(?=.*");
  str = "^(?=.*" + str + ").*$";
  return str;
}

function matchAny(term, text) {
  search = new RegExp(regexpStr(term), "i");
  if (search.test(text)) {
    return true;
  }
  return false;
}

  $.fn.select2.amd.require([
    'select2/defaults',
    'select2/keys',
    'select2/utils',
    'select2/compat/matcher'
  ], function(Defaults, KEYS, Utils, oldMatcher) {
    function SearchWhenClosed() {}

    SearchWhenClosed.prototype.bind = function(decorated, container, $container) {
      var self = this
      decorated.call(this, container, $container)

      container.$selection.on('keydown', function(evt) {
        self._handleSearchWhenClosed(evt)
      })
    }

    SearchWhenClosed.prototype._handleSearchWhenClosed = function(originalMethod, evt) {

      // For now, exit unless we know search is going to be there
      if (this.options.get('minimumResultsForSearch')) return

      var self = this
      var key = evt.which
      var irrelevantKeys = [
        8,  // DELETE
        9,  // TAB
        13, // ENTER
        16, // SHIFT
        17, // CTRL
        18, // OPT/ALT
        20, // CAPS
        27, // ESC
        32, // SPACE
        37, // LEFT
        38, // UP
        39, // RIGHT
        40, // DOWN
        91, // L-CMD
        93, // R-CMD
      ]
      var doOpen = (key === KEYS.ENTER || key === KEYS.SPACE || (key === KEYS.DOWN && evt.altKey))
      var doSearch = !doOpen && !evt.altKey && irrelevantKeys.indexOf(key) === -1

      if (doSearch || doOpen) {
        self.trigger('open')
        self.$search.focus().select()
        // For some reason, the query doesn't always fire the first time
        setTimeout(function() {
          self.trigger('query', {
            term: self.$search.val()
          })
        })
      } else if (doOpen) {
        self.trigger('open')
        evt.preventDefault()
      }

    }

    var _apply = Defaults.constructor.prototype.apply
    Defaults.constructor.prototype.apply = function() {
      var options = _apply.apply(this, arguments)
      if (options.minimumResultsForSearch === 0 && !options.multiple) {
        options.dropdownAdapter = Utils.Decorate(
          options.dropdownAdapter,
          SearchWhenClosed
        )
      }
      return options
    }
    
    
    $('select').select2({
      maximumSelectionLength: 1,
      //minimumResultsForSearch: -1,
      selectOnClose: false,
      closeOnSelect: false,
      multiple: 'multiple',
      placeholder: 'Search Menus (ENTER to run, ESC to close)',
      matcher: oldMatcher(matchAny)
    });
  });
