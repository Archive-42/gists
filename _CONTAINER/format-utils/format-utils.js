! function ( t ) {
  if ( "object" == typeof exports && "undefined" != typeof module ) module.exports = t();
  else if ( "function" == typeof define && define.amd ) define( [], t );
  else {
    var e;
    e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t()
  }
}( () => {
  var t;
  var e;
  var n;
  return function t( e, n, o ) {
    function i( c, a ) {
      if ( !n[ c ] ) {
        if ( !e[ c ] ) {
          var s = "function" == typeof require && require;
          if ( !a && s ) return s( c, !0 );
          if ( r ) return r( c, !0 );
          var l = new Error( "Cannot find module '" + c + "'" );
          throw (l.code = "MODULE_NOT_FOUND", l)
        }
        var u = n[ c ] = {
          exports: {}
        };
        e[ c ][ 0 ].call( u.exports, t => {
          var n = e[ c ][ 1 ][ t ];
          return i( n ? n : t )
        }, u, u.exports, t, e, n, o )
      }
      return n[ c ].exports
    }
    for ( var r = "function" == typeof require && require, c = 0; c < o.length; c++ ) i( o[ c ] );
    return i
  }( {
    1: [ (t, e, n) => {
      var o = t( "matches-selector" );
      e.exports = (t, e, n) => {
        for ( var i = n ? t : t.parentNode; i && i !== document; ) {
          if ( o( i, e ) ) return i;
          i = i.parentNode
        }
      }
    }, {
      "matches-selector": 5
    } ],
    2: [ (t, e, n) => {
      function o( t, e, n, o, r ) {
        var c = i.apply( this, arguments );
        return t.addEventListener( n, c, r ), {
          destroy() {
            t.removeEventListener( n, c, r )
          }
        };
      }

      function i( t, e, n, o ) {
        return n => {
          n.delegateTarget = r( n.target, e, !0 ), n.delegateTarget && o.call( t, n )
        };
      }
      var r = t( "closest" );
      e.exports = o
    }, {
      closest: 1
    } ],
    3: [ (t, e, n) => {
      n.node = t => void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType, n.nodeList = t => {
        var e = Object.prototype.toString.call( t );
        return void 0 !== t && ( "[object NodeList]" === e || "[object HTMLCollection]" === e ) && "length" in t && ( 0 === t.length || n.node( t[ 0 ] ) )
      }, n.string = t => "string" == typeof t || t instanceof String, n.fn = t => {
        var e = Object.prototype.toString.call( t );
        return "[object Function]" === e
      }
    }, {} ],
    4: [ (t, e, n) => {
      function o( t, e, n ) {
        if ( !t && !e && !n ) throw new Error( "Missing required arguments" );
        if ( !a.string( e ) ) throw new TypeError( "Second argument must be a String" );
        if ( !a.fn( n ) ) throw new TypeError( "Third argument must be a Function" );
        if ( a.node( t ) ) return i( t, e, n );
        if ( a.nodeList( t ) ) return r( t, e, n );
        if ( a.string( t ) ) return c( t, e, n );
        throw new TypeError( "First argument must be a String, HTMLElement, HTMLCollection, or NodeList" )
      }

      function i( t, e, n ) {
        return t.addEventListener( e, n ), {
          destroy() {
            t.removeEventListener( e, n )
          }
        };
      }

      function r( t, e, n ) {
        return Array.prototype.forEach.call( t, t => {
          t.addEventListener( e, n )
        } ), {
          destroy() {
            Array.prototype.forEach.call( t, t => {
              t.removeEventListener( e, n )
            } )
          }
        };
      }

      function c( t, e, n ) {
        return s( document.body, t, e, n )
      }
      var a = t( "./is" );
      var s = t( "delegate" );
      e.exports = o
    }, {
      "./is": 3,
      delegate: 2
    } ],
    5: [ (t, e, n) => {
      function o( t, e ) {
        if ( r ) return r.call( t, e );
        for ( var n = t.parentNode.querySelectorAll( e ), o = 0; o < n.length; ++o )
          if ( n[ o ] == t ) return !0;
        return !1
      }
      var i = Element.prototype;
      var r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
      e.exports = o
    }, {} ],
    6: [ (t, e, n) => {
      function o( t ) {
        var e;
        if ( "INPUT" === t.nodeName || "TEXTAREA" === t.nodeName ) t.focus(), t.setSelectionRange( 0, t.value.length ), e = t.value;
        else {
          t.hasAttribute( "contenteditable" ) && t.focus();
          var n = window.getSelection();
          var o = document.createRange();
          o.selectNodeContents( t ), n.removeAllRanges(), n.addRange( o ), e = n.toString()
        }
        return e
      }
      e.exports = o
    }, {} ],
    7: [ (t, e, n) => {
      function o() {}
      o.prototype = {
        on(t, e, n) {
          var o = this.e || ( this.e = {} );
          return ( o[ t ] || ( o[ t ] = [] ) ).push( {
            fn: e,
            ctx: n
          } ), this
        },
        once(t, e, n) {
          function o(...args) {
            i.off( t, o ), e.apply( n, args )
          }
          var i = this;
          return o._ = e, this.on( t, o, n )
        },
        emit(t) {
          var e = [].slice.call( arguments, 1 );
          var n = ( ( this.e || ( this.e = {} ) )[ t ] || [] ).slice();
          var o = 0;
          var i = n.length;
          for ( o; i > o; o++ ) n[ o ].fn.apply( n[ o ].ctx, e );
          return this
        },
        off(t, e) {
          var n = this.e || ( this.e = {} );
          var o = n[ t ];
          var i = [];
          if ( o && e )
            for ( var r = 0, c = o.length; c > r; r++ ) o[ r ].fn !== e && o[ r ].fn._ !== e && i.push( o[ r ] );
          return i.length ? n[ t ] = i : delete n[ t ], this
        }
      }, e.exports = o
    }, {} ],
    8: [ function ( e, n, o ) {
      !((i, r) => {
        if ( "function" == typeof t && t.amd ) t( [ "module", "select" ], r );
        else if ( "undefined" != typeof o ) r( n, e( "select" ) );
        else {
          var c = {
            exports: {}
          };
          r( c, i.select ), i.clipboardAction = c.exports
        }
      })(this, (t, e) => {
        "use strict";

        function n( t ) {
          return t && t.__esModule ? t : {
            "default": t
          }
        }

        function o( t, e ) {
          if ( !( t instanceof e ) ) throw new TypeError( "Cannot call a class as a function" )
        }
        var i = n( e );
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? t => typeof t : t => t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t;

        var c = (() => {
          function t( t, e ) {
            for ( var n = 0; n < e.length; n++ ) {
              var o = e[ n ];
              o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && ( o.writable = !0 ), Object.defineProperty( t, o.key, o )
            }
          }
          return (e, n, o) => (n && t( e.prototype, n ), o && t( e, o ), e);
        })();

        var a = (() => {
          function t( e ) {
            o( this, t ), this.resolveOptions( e ), this.initSelection()
          }
          return t.prototype.resolveOptions = function t() {
            var e = arguments.length <= 0 || void 0 === arguments[ 0 ] ? {} : arguments[ 0 ];
            this.action = e.action, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = ""
          }, t.prototype.initSelection = function t() {
            this.text ? this.selectFake() : this.target && this.selectTarget()
          }, t.prototype.selectFake = function t() {
            var e = this,
              n = "rtl" == document.documentElement.getAttribute( "dir" );
            this.removeFake(), this.fakeHandler = document.body.addEventListener( "click", () => e.removeFake() ), this.fakeElem = document.createElement( "textarea" ), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "fixed", this.fakeElem.style[ n ? "right" : "left" ] = "-9999px", this.fakeElem.style.top = ( window.pageYOffset || document.documentElement.scrollTop ) + "px", this.fakeElem.setAttribute( "readonly", "" ), this.fakeElem.value = this.text, document.body.appendChild( this.fakeElem ), this.selectedText = ( 0, i.default )( this.fakeElem ), this.copyText()
          }, t.prototype.removeFake = function t() {
            this.fakeHandler && ( document.body.removeEventListener( "click" ), this.fakeHandler = null ), this.fakeElem && ( document.body.removeChild( this.fakeElem ), this.fakeElem = null )
          }, t.prototype.selectTarget = function t() {
            this.selectedText = ( 0, i.default )( this.target ), this.copyText()
          }, t.prototype.copyText = function t() {
            var e = void 0;
            try {
              e = document.execCommand( this.action )
            } catch ( n ) {
              e = !1
            }
            this.handleResult( e )
          }, t.prototype.handleResult = function t( e ) {
            e ? this.emitter.emit( "success", {
              action: this.action,
              text: this.selectedText,
              trigger: this.trigger,
              clearSelection: this.clearSelection.bind( this )
            } ) : this.emitter.emit( "error", {
              action: this.action,
              trigger: this.trigger,
              clearSelection: this.clearSelection.bind( this )
            } )
          }, t.prototype.clearSelection = function t() {
            this.target && this.target.blur(), window.getSelection().removeAllRanges()
          }, t.prototype.destroy = function t() {
            this.removeFake()
          }, c( t, [ {
            key: "action",
            set: function t() {
              var e = arguments.length <= 0 || void 0 === arguments[ 0 ] ? "copy" : arguments[ 0 ];
              if ( this._action = e, "copy" !== this._action && "cut" !== this._action ) throw new Error( 'Invalid "action" value, use either "copy" or "cut"' )
            },
            get: function t() {
              return this._action
            }
          }, {
            key: "target",
            set: function t( e ) {
              if ( void 0 !== e ) {
                if ( !e || "object" !== ( "undefined" == typeof e ? "undefined" : r( e ) ) || 1 !== e.nodeType ) throw new Error( 'Invalid "target" value, use a valid Element' );
                if ( "copy" === this.action && e.hasAttribute( "disabled" ) ) throw new Error( 'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute' );
                if ( "cut" === this.action && ( e.hasAttribute( "readonly" ) || e.hasAttribute( "disabled" ) ) ) throw new Error( 'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes' );
                this._target = e
              }
            },
            get: function t() {
              return this._target
            }
          } ] ), t;
        })();

        t.exports = a
      })
    }, {
      select: 6
    } ],
    9: [ function ( e, n, o ) {
      !((i, r) => {
        if ( "function" == typeof t && t.amd ) t( [ "module", "./clipboard-action", "tiny-emitter", "good-listener" ], r );
        else if ( "undefined" != typeof o ) r( n, e( "./clipboard-action" ), e( "tiny-emitter" ), e( "good-listener" ) );
        else {
          var c = {
            exports: {}
          };
          r( c, i.clipboardAction, i.tinyEmitter, i.goodListener ), i.clipboard = c.exports
        }
      })(this, (t, e, n, o) => {
        "use strict";

        function i( t ) {
          return t && t.__esModule ? t : {
            "default": t
          }
        }

        function r( t, e ) {
          if ( !( t instanceof e ) ) throw new TypeError( "Cannot call a class as a function" )
        }

        function c( t, e ) {
          if ( !t ) throw new ReferenceError( "this hasn't been initialised - super() hasn't been called" );
          return !e || "object" != typeof e && "function" != typeof e ? t : e
        }

        function a( t, e ) {
          if ( "function" != typeof e && null !== e ) throw new TypeError( "Super expression must either be null or a function, not " + typeof e );
          t.prototype = Object.create( e && e.prototype, {
            constructor: {
              value: t,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          } ), e && ( Object.setPrototypeOf ? Object.setPrototypeOf( t, e ) : t.__proto__ = e )
        }

        function s( t, e ) {
          var n = "data-clipboard-" + t;
          if ( e.hasAttribute( n ) ) return e.getAttribute( n )
        }
        var l = i( e );
        var u = i( n );
        var f = i( o );

        var d = (t => {
          function e( n, o ) {
            r( this, e );
            var i = c( this, t.call( this ) );
            return i.resolveOptions( o ), i.listenClick( n ), i
          }
          return a( e, t ), e.prototype.resolveOptions = function t() {
            var e = arguments.length <= 0 || void 0 === arguments[ 0 ] ? {} : arguments[ 0 ];
            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText
          }, e.prototype.listenClick = function t( e ) {
            var n = this;
            this.listener = ( 0, f.default )( e, "click", t => n.onClick( t ) )
          }, e.prototype.onClick = function t( e ) {
            var n = e.delegateTarget || e.currentTarget;
            this.clipboardAction && ( this.clipboardAction = null ), this.clipboardAction = new l.default( {
              action: this.action( n ),
              target: this.target( n ),
              text: this.text( n ),
              trigger: n,
              emitter: this
            } )
          }, e.prototype.defaultAction = function t( e ) {
            return s( "action", e )
          }, e.prototype.defaultTarget = function t( e ) {
            var n = s( "target", e );
            return n ? document.querySelector( n ) : void 0
          }, e.prototype.defaultText = function t( e ) {
            return s( "text", e )
          }, e.prototype.destroy = function t() {
            this.listener.destroy(), this.clipboardAction && ( this.clipboardAction.destroy(), this.clipboardAction = null )
          }, e;
        })(u.default);

        t.exports = d
      })
    }, {
      "./clipboard-action": 8,
      "good-listener": 4,
      "tiny-emitter": 7
    } ]
  }, {}, [ 9 ] )( 9 );
} );

jQuery.extend( {
  __stringPrototype: {
    JSONFilter: /^\/\*-secure-([\s\S]*)\*\/\s*$/,
    ScriptFragment: '<script[^>]*>([\\S\\s]*?)<\/script>',
    specialChar: {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '\\': '\\\\'
    },
    blank(s) {
      return /^\s*$/.test( this.s( s ) || ' ' );
    },
    camelize(s) {
      var a = this.s( s ).split( '-' );
      var i;
      s = [ a[ 0 ] ];
      for ( i = 1; i < a.length; i++ ) {
        s.push( a[ i ].charAt( 0 ).toUpperCase() + a[ i ].substring( 1 ) );
      }
      s = s.join( '' );
      return this.r( arguments, 0, s );
    },
    capitalize(s) {
      s = this.s( s );
      s = s.charAt( 0 ).toUpperCase() + s.substring( 1 ).toLowerCase();
      return this.r( arguments, 0, s );
    },
    dasherize(s) {
      s = this.s( s ).split( '_' ).join( '-' );
      return this.r( arguments, 0, s );
    },
    empty(s) {
      return this.s( s ) === '';
    },
    endsWith(pattern, s) {
      s = this.s( s );
      var d = s.length - pattern.length;
      return d >= 0 && s.lastIndexOf( pattern ) === d;
    },
    escapeHTML(s) {
      s = this.s( s ).replace( /&/g, '&' ).replace( /</g, '<' ).replace( />/g, '>' );
      return this.r( arguments, 0, s );
    },
    evalJSON(sanitize, s) {
      s = this.s( s );
      var json = this.unfilterJSON( false, s );
      try {
        if ( !sanitize || this.isJSON( json ) ) {
          return eval( '(' + json + ')' );
        }
      } catch ( e ) {}
      throw new SyntaxError( 'Badly formed JSON string: ' + s );
    },
    evalScripts(s) {
      var scriptTags = this.extractScripts( this.s( s ) );
      var results = [];
      if ( scriptTags.length > 0 ) {
        for ( var i = 0; i < scriptTags.length; i++ ) {
          results.push( eval( scriptTags[ i ] ) );
        }
      }
      return results;
    },
    extractScripts(s) {
      var matchAll = new RegExp( this.ScriptFragment, 'img' );
      var matchOne = new RegExp( this.ScriptFragment, 'im' );
      var scriptMatches = this.s( s ).match( matchAll ) || [];
      var scriptTags = [];
      if ( scriptMatches.length > 0 ) {
        for ( var i = 0; i < scriptMatches.length; i++ ) {
          scriptTags.push( scriptMatches[ i ].match( matchOne )[ 1 ] || '' );
        }
      }
      return scriptTags;
    },
    gsub(pattern, replacement, s) {
      s = this.s( s );
      if ( jQuery.isFunction( replacement ) ) {
        s = this.sub( pattern, replacement, -1, s );
      } else {
        s = s.split( pattern ).join( replacement );
      }
      return this.r( arguments, 2, s );
    },
    include(pattern, s) {
      return this.s( s ).indexOf( pattern ) > -1;
    },
    inspect(useDoubleQuotes, s) {
      s = this.s( s );
      var escapedString;
      try {
        escapedString = this.sub( /[\x00-\x1f\\]/, match => {
          var character = jQuery.__stringPrototype.specialChar[ match[ 0 ] ];
          return character ? character : '\\u00' + match[ 0 ].charCodeAt().toPaddedString( 2, 16 );
        }, -1, s );
      } catch ( e ) {
        escapedString = s;
      }
      s = ( useDoubleQuotes ) ? '"' + escapedString.replace( /"/g, '\\"' ) + '"' : "'" + escapedString.replace( /'/g, '\\\'' ) + "'";
      return this.r( arguments, 1, s );
    },
    interpolate(obj, pattern, s) {
      s = this.s( s );
      if ( !pattern ) {
        pattern = /(\#\{\s*(\w+)\s*\})/;
      }
      var gpattern = new RegExp( pattern.source, "g" );
      var matches = s.match( gpattern );
      var i;
      for ( i = 0; i < matches.length; i++ ) {
        s = s.replace( matches[ i ], obj[ matches[ i ].match( pattern )[ 2 ] ] );
      }
      return this.r( arguments, 2, s );
    },
    isJSON(s) {
      s = this.s( s );
      if ( this.blank( s ) ) {
        return false;
      }
      s = s.replace( /\\./g, '@' ).replace( /"[^"\\\n\r]*"/g, '' );
      return ( /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/ ).test( s );
    },
    scan(pattern, replacement, s) {
      s = this.s( s );
      this.sub( pattern, replacement, -1, s );
      return this.r( arguments, 2, s );
    },
    startsWith(pattern, s) {
      return this.s( s ).indexOf( pattern ) === 0;
    },
    strip(s) {
      s = jQuery.trim( this.s( s ) );
      return this.r( arguments, 0, s );
    },
    stripScripts(s) {
      s = this.s( s ).replace( new RegExp( this.ScriptFragment, 'img' ), '' );
      return this.r( arguments, 0, s );
    },
    stripTags(s) {
      s = this.s( s ).replace( /<\/?[^>]+>/gi, '' );
      return this.r( arguments, 0, s );
    },
    sub(pattern, replacement, count, s) {
      s = this.s( s );
      if ( pattern.source && !pattern.global ) {
        var patternMods = ( pattern.ignoreCase ) ? "ig" : "g";
        patternMods += ( pattern.multiline ) ? "m" : "";
        pattern = new RegExp( pattern.source, patternMods );
      }
      var sarray = s.split( pattern );
      var matches = s.match( pattern );
      if ( jQuery.browser.msie ) {
        if ( s.indexOf( matches[ 0 ] ) == 0 ) sarray.unshift( "" );
        if ( s.lastIndexOf( matches[ matches.length - 1 ] ) == s.length - matches[ matches.length - 1 ].length ) sarray.push( "" );
      }
      count = ( count < 0 ) ? ( sarray.length - 1 ) : count || 1;
      s = sarray[ 0 ];
      for ( var i = 1; i < sarray.length; i++ ) {
        if ( i <= count ) {
          if ( jQuery.isFunction( replacement ) ) {
            s += replacement( matches[ i - 1 ] || matches ) + sarray[ i ];
          } else {
            s += replacement + sarray[ i ];
          }
        } else {
          s += ( matches[ i - 1 ] || matches ) + sarray[ i ];
        }
      }
      return this.r( arguments, 3, s );
    },
    succ(s) {
      s = this.s( s );
      s = s.slice( 0, s.length - 1 ) + String.fromCharCode( s.charCodeAt( s.length - 1 ) + 1 );
      return this.r( arguments, 0, s );
    },
    times(count, s) {
      s = this.s( s );
      var newS = "";
      for ( var i = 0; i < count; i++ ) {
        newS += s;
      }
      return this.r( arguments, 1, newS );
    },
    toJSON(s) {
      return this.r( arguments, 0, this.inspect( true, this.s( s ) ) );
    },
    toQueryParams(separator, s) {
      s = this.s( s );
      var paramsList = s.substring( s.indexOf( '?' ) + 1 ).split( '#' )[ 0 ].split( separator || '&' );
      var params = {};
      var i;
      var key;
      var value;
      var pair;
      for ( i = 0; i < paramsList.length; i++ ) {
        pair = paramsList[ i ].split( '=' );
        key = decodeURIComponent( pair[ 0 ] );
        value = ( pair[ 1 ] ) ? decodeURIComponent( pair[ 1 ] ) : undefined;
        if ( params[ key ] ) {
          if ( typeof params[ key ] == "string" ) {
            params[ key ] = [ params[ key ] ];
          }
          params[ key ].push( value );
        } else {
          params[ key ] = value;
        }
      }
      return params;
    },
    truncate(length, truncation, s) {
      s = this.s( s );
      length = length || 30;
      truncation = ( !truncation ) ? '...' : truncation;
      s = ( s.length > length ) ? s.slice( 0, length - truncation.length ) + truncation : String( s );
      return this.r( arguments, 2, s );
    },
    underscore(s) {
      s = this.sub( /[A-Z]/, c => "_" + c.toLowerCase(), -1, this.s( s ) );
      if ( s.charAt( 0 ) == "_" ) s = s.substring( 1 );
      return this.r( arguments, 0, s );
    },
    unescapeHTML(s) {
      s = this.stripTags( this.s( s ) ).replace( /&/g, '&' ).replace( /</g, '<' ).replace( />/g, '>' );
      return this.r( arguments, 0, s );
    },
    unfilterJSON(filter, s) {
      s = this.s( s );
      filter = filter || this.JSONFilter;
      var filtered = s.match( filter );
      s = ( filtered !== null ) ? filtered[ 1 ] : s;
      return this.r( arguments, 1, jQuery.trim( s ) );
    },
    r(args, size, s) {
      if ( args.length > size || this.str === undefined ) {
        return s;
      } else {
        this.str = '' + s;
        return this;
      };
    },
    s(s) {
      if ( s === '' || s ) {
        return s;
      }
      if ( this.str === '' || this.str ) {
        return this.str;
      }
      return this;
    }
  },
  string(str) {
    if ( str === String.prototype ) {
      jQuery.extend( String.prototype, jQuery.__stringPrototype );
    } else {
      return jQuery.extend( {
        str
      }, jQuery.__stringPrototype );
    }
  }
} );
jQuery.__stringPrototype.parseQuery = jQuery.__stringPrototype.toQueryParams;

/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute === void 0 && ( jQuery.migrateMute = !0 ), ((e, t, n) => {
  function r( n ) {
    var r = t.console;
    i[ n ] || ( i[ n ] = !0, e.migrateWarnings.push( n ), r && r.warn && !e.migrateMute && ( r.warn( "JQMIGRATE: " + n ), e.migrateTrace && r.trace && r.trace() ) )
  }

  function a( t, a, i, o ) {
    if ( Object.defineProperty ) try {
      return Object.defineProperty( t, a, {
        configurable: !0,
        enumerable: !0,
        get() {
          return r( o ), i
        },
        set(e) {
          r( o ), i = e
        }
      } ), n;
    } catch ( s ) {}
    e._definePropertyBroken = !0, t[ a ] = i
  }
  var i = {};
  e.migrateWarnings = [], !e.migrateMute && t.console && t.console.log && t.console.log( "JQMIGRATE: Logging is active" ), e.migrateTrace === n && ( e.migrateTrace = !0 ), e.migrateReset = () => {
    i = {}, e.migrateWarnings.length = 0
  }, "BackCompat" === document.compatMode && r( "jQuery is not compatible with Quirks Mode" );

  var o = e( "<input/>", {
      size: 1
    } ).attr( "size" ) && e.attrFn;

  var s = e.attr;
  var u = e.attrHooks.value && e.attrHooks.value.get || (() => null);
  var c = e.attrHooks.value && e.attrHooks.value.set || (() => n);
  var l = /^(?:input|button)$/i;
  var d = /^[238]$/;
  var p = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;
  var f = /^(?:checked|selected)$/i;
  a( e, "attrFn", o || {}, "jQuery.attrFn is deprecated" ), e.attr = (t, a, i, u) => {
    var c = a.toLowerCase();
    var g = t && t.nodeType;
    return u && ( 4 > s.length && r( "jQuery.fn.attr( props, pass ) is deprecated" ), t && !d.test( g ) && ( o ? a in o : e.isFunction( e.fn[ a ] ) ) ) ? e( t )[ a ]( i ) : ( "type" === a && i !== n && l.test( t.nodeName ) && t.parentNode && r( "Can't change the 'type' of an input or button in IE 6/7/8" ), !e.attrHooks[ c ] && p.test( c ) && ( e.attrHooks[ c ] = {
      get(t, r) {
        var a;
        var i = e.prop( t, r );
        return i === !0 || "boolean" != typeof i && ( a = t.getAttributeNode( r ) ) && a.nodeValue !== !1 ? r.toLowerCase() : n
      },
      set(t, n, r) {
        var a;
        return n === !1 ? e.removeAttr( t, r ) : ( a = e.propFix[ r ] || r, a in t && ( t[ a ] = !0 ), t.setAttribute( r, r.toLowerCase() ) ), r
      }
    }, f.test( c ) && r( "jQuery.fn.attr('" + c + "') may use property instead of attribute" ) ), s.call( e, t, a, i ) );
  }, e.attrHooks.value = {
    get(e, t) {
      var n = ( e.nodeName || "" ).toLowerCase();
      return "button" === n ? u.apply( this, arguments ) : ( "input" !== n && "option" !== n && r( "jQuery.fn.attr('value') no longer gets properties" ), t in e ? e.value : null )
    },
    set(e, t) {
      var a = ( e.nodeName || "" ).toLowerCase();
      return "button" === a ? c.apply( this, arguments ) : ( "input" !== a && "option" !== a && r( "jQuery.fn.attr('value', val) no longer sets properties" ), e.value = t, n )
    }
  };
  var g;
  var h;
  var v = e.fn.init;
  var m = e.parseJSON;
  var y = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
  e.fn.init = function ( t, n, a ) {
    var i;
    return t && "string" == typeof t && !e.isPlainObject( n ) && ( i = y.exec( e.trim( t ) ) ) && i[ 0 ] && ( "<" !== t.charAt( 0 ) && r( "$(html) HTML strings must start with '<' character" ), i[ 3 ] && r( "$(html) HTML text after last tag is ignored" ), "#" === i[ 0 ].charAt( 0 ) && ( r( "HTML string cannot start with a '#' character" ), e.error( "JQMIGRATE: Invalid selector string (XSS)" ) ), n && n.context && ( n = n.context ), e.parseHTML ) ? v.call( this, e.parseHTML( i[ 2 ], n, !0 ), n, a ) : v.apply( this, arguments )
  }, e.fn.init.prototype = e.fn, e.parseJSON = function ( e ) {
    return e || null === e ? m.apply( this, arguments ) : ( r( "jQuery.parseJSON requires a valid JSON string" ), null )
  }, e.uaMatch = e => {
    e = e.toLowerCase();
    var t = /(chrome)[ \/]([\w.]+)/.exec( e ) || /(webkit)[ \/]([\w.]+)/.exec( e ) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( e ) || /(msie) ([\w.]+)/.exec( e ) || 0 > e.indexOf( "compatible" ) && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( e ) || [];
    return {
      browser: t[ 1 ] || "",
      version: t[ 2 ] || "0"
    }
  }, e.browser || ( g = e.uaMatch( navigator.userAgent ), h = {}, g.browser && ( h[ g.browser ] = !0, h.version = g.version ), h.chrome ? h.webkit = !0 : h.webkit && ( h.safari = !0 ), e.browser = h ), a( e, "browser", e.browser, "jQuery.browser is deprecated" ), e.sub = function () {
    function t( e, n ) {
      return new t.fn.init( e, n )
    }
    e.extend( !0, t, this ), t.superclass = this, t.fn = t.prototype = this(), t.fn.constructor = t, t.sub = this.sub, t.fn.init = function ( r, a ) {
      return a && a instanceof e && !( a instanceof t ) && ( a = t( a ) ), e.fn.init.call( this, r, a, n )
    }, t.fn.init.prototype = t.fn;
    var n = t( document );
    return r( "jQuery.sub() is deprecated" ), t
  }, e.ajaxSetup( {
    converters: {
      "text json": e.parseJSON
    }
  } );
  var b = e.fn.data;
  e.fn.data = function ( t ) {
    var a;
    var i;
    var o = this[ 0 ];
    return !o || "events" !== t || 1 !== arguments.length || ( a = e.data( o, t ), i = e._data( o, t ), a !== n && a !== i || i === n ) ? b.apply( this, arguments ) : ( r( "Use of jQuery.fn.data('events') is deprecated" ), i )
  };
  var j = /\/(java|ecma)script/i;
  var w = e.fn.andSelf || e.fn.addBack;
  e.fn.andSelf = function(...args) {
    return r( "jQuery.fn.andSelf() replaced by jQuery.fn.addBack()" ), w.apply( this, args );
  }, e.clean || ( e.clean = (t, a, i, o) => {
    a = a || document, a = !a.nodeType && a[ 0 ] || a, a = a.ownerDocument || a, r( "jQuery.clean() is deprecated" );
    var s;
    var u;
    var c;
    var l;
    var d = [];
    if ( e.merge( d, e.buildFragment( t, a ).childNodes ), i )
      for ( c = e => !e.type || j.test( e.type ) ? o ? o.push( e.parentNode ? e.parentNode.removeChild( e ) : e ) : i.appendChild( e ) : n, s = 0; null != ( u = d[ s ] ); s++ ) e.nodeName( u, "script" ) && c( u ) || ( i.appendChild( u ), u.getElementsByTagName !== n && ( l = e.grep( e.merge( [], u.getElementsByTagName( "script" ) ), c ), d.splice(...[ s + 1, 0 ].concat( l )), s += l.length ) );
    return d
  } );
  var Q = e.event.add;
  var x = e.event.remove;
  var k = e.event.trigger;
  var N = e.fn.toggle;
  var T = e.fn.live;
  var M = e.fn.die;
  var S = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess";
  var C = RegExp( "\\b(?:" + S + ")\\b" );
  var H = /(?:^|\s)hover(\.\S+|)\b/;
  var A = t => "string" != typeof t || e.event.special.hover ? t : ( H.test( t ) && r( "'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'" ), t && t.replace( H, "mouseenter$1 mouseleave$1" ) );
  e.event.props && "attrChange" !== e.event.props[ 0 ] && e.event.props.unshift( "attrChange", "attrName", "relatedNode", "srcElement" ), e.event.dispatch && a( e.event, "handle", e.event.dispatch, "jQuery.event.handle is undocumented and deprecated" ), e.event.add = function ( e, t, n, a, i ) {
    e !== document && C.test( t ) && r( "AJAX events should be attached to document: " + t ), Q.call( this, e, A( t || "" ), n, a, i )
  }, e.event.remove = function ( e, t, n, r, a ) {
    x.call( this, e, A( t ) || "", n, r, a )
  }, e.fn.error = function(...args) {
    var e = Array.prototype.slice.call( args, 0 );
    return r( "jQuery.fn.error() is deprecated" ), e.splice( 0, 0, "error" ), args.length ? this.bind(...e) : ( this.triggerHandler(...e), this );
  }, e.fn.toggle = function ( t, n ) {
    if ( !e.isFunction( t ) || !e.isFunction( n ) ) return N.apply( this, arguments );
    r( "jQuery.fn.toggle(handler, handler...) is deprecated" );
    var a = arguments;
    var i = t.guid || e.guid++;
    var o = 0;

    var s = function ( n ) {
      var r = ( e._data( this, "lastToggle" + t.guid ) || 0 ) % o;
      return e._data( this, "lastToggle" + t.guid, r + 1 ), n.preventDefault(), a[ r ].apply( this, arguments ) || !1
    };

    for ( s.guid = i; a.length > o; ) a[ o++ ].guid = i;
    return this.click( s )
  }, e.fn.live = function ( t, n, a ) {
    return r( "jQuery.fn.live() is deprecated" ), T ? T.apply( this, arguments ) : ( e( this.context ).on( t, this.selector, n, a ), this )
  }, e.fn.die = function ( t, n ) {
    return r( "jQuery.fn.die() is deprecated" ), M ? M.apply( this, arguments ) : ( e( this.context ).off( t, this.selector || "**", n ), this )
  }, e.event.trigger = function ( e, t, n, a ) {
    return n || C.test( e ) || r( "Global events are undocumented and deprecated" ), k.call( this, e, t, n || document, a )
  }, e.each( S.split( "|" ), (t, n) => {
    e.event.special[ n ] = {
      setup() {
        var t = this;
        return t !== document && ( e.event.add( document, n + "." + e.guid, () => {
          e.event.trigger( n, null, t, !0 )
        } ), e._data( this, n, e.guid++ ) ), !1;
      },
      teardown() {
        return this !== document && e.event.remove( document, n + "." + e._data( this, n ) ), !1
      }
    }
  } )
})(jQuery, window);

// Pretty print
var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
(() => {
  function L( a ) {
    function m( a ) {
      var f = a.charCodeAt( 0 );
      if ( f !== 92 ) return f;
      var b = a.charAt( 1 );
      return ( f = r[ b ] ) ? f : "0" <= b && b <= "7" ? parseInt( a.substring( 1 ), 8 ) : b === "u" || b === "x" ? parseInt( a.substring( 2 ), 16 ) : a.charCodeAt( 1 )
    }

    function e( a ) {
      if ( a < 32 ) return ( a < 16 ? "\\x0" : "\\x" ) + a.toString( 16 );
      a = String.fromCharCode( a );
      if ( a === "\\" || a === "-" || a === "[" || a === "]" ) a = "\\" + a;
      return a
    }

    function h( a ) {
      for ( var f = a.substring( 1, a.length - 1 ).match( /\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g ), a = [], b = [], o = f[ 0 ] === "^", c = o ? 1 : 0, i = f.length; c < i; ++c ) {
        var j = f[ c ];
        if ( /\\[bdsw]/i.test( j ) ) a.push( j );
        else {
          var j = m( j );
          var d;
          c + 2 < i && "-" === f[ c + 1 ] ? ( d = m( f[ c + 2 ] ), c += 2 ) : d = j;
          b.push( [ j, d ] );
          d < 65 || j > 122 || ( d < 65 || j > 90 || b.push( [ Math.max( 65, j ) | 32, Math.min( d, 90 ) | 32 ] ), d < 97 || j > 122 || b.push( [ Math.max( 97, j ) & -33, Math.min( d, 122 ) & -33 ] ) )
        }
      }
      b.sort( (a, f) => a[ 0 ] - f[ 0 ] || f[ 1 ] - a[ 1 ] );
      f = [];
      j = [ NaN, NaN ];
      for ( c = 0; c < b.length; ++c ) i = b[ c ], i[ 0 ] <= j[ 1 ] + 1 ? j[ 1 ] = Math.max( j[ 1 ], i[ 1 ] ) : f.push( j = i );
      b = [ "[" ];
      o && b.push( "^" );
      b.push(...a);
      for ( c = 0; c <
        f.length; ++c ) i = f[ c ], b.push( e( i[ 0 ] ) ), i[ 1 ] > i[ 0 ] && ( i[ 1 ] + 1 > i[ 0 ] && b.push( "-" ), b.push( e( i[ 1 ] ) ) );
      b.push( "]" );
      return b.join( "" )
    }

    function y( a ) {
      for ( var f = a.source.match( /\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g ), b = f.length, d = [], c = 0, i = 0; c < b; ++c ) {
        var j = f[ c ];
        j === "(" ? ++i : "\\" === j.charAt( 0 ) && ( j = +j.substring( 1 ) ) && j <= i && ( d[ j ] = -1 )
      }
      for ( c = 1; c < d.length; ++c ) - 1 === d[ c ] && ( d[ c ] = ++t );
      for ( i = c = 0; c < b; ++c ) j = f[ c ], j === "(" ? ( ++i, d[ i ] === void 0 && ( f[ c ] = "(?:" ) ) : "\\" === j.charAt( 0 ) &&
        ( j = +j.substring( 1 ) ) && j <= i && ( f[ c ] = "\\" + d[ i ] );
      for ( i = c = 0; c < b; ++c ) "^" === f[ c ] && "^" !== f[ c + 1 ] && ( f[ c ] = "" );
      if ( a.ignoreCase && s )
        for ( c = 0; c < b; ++c ) j = f[ c ], a = j.charAt( 0 ), j.length >= 2 && a === "[" ? f[ c ] = h( j ) : a !== "\\" && ( f[ c ] = j.replace( /[A-Za-z]/g, a => {
          a = a.charCodeAt( 0 );
          return "[" + String.fromCharCode( a & -33, a | 32 ) + "]"
        } ) );
      return f.join( "" )
    }
    for ( var t = 0, s = !1, l = !1, p = 0, d = a.length; p < d; ++p ) {
      var g = a[ p ];
      if ( g.ignoreCase ) l = !0;
      else if ( /[a-z]/i.test( g.source.replace( /\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, "" ) ) ) {
        s = !0;
        l = !1;
        break
      }
    }
    for ( var r = {
        b: 8,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
      }, n = [], p = 0, d = a.length; p < d; ++p ) {
      g = a[ p ];
      if ( g.global || g.multiline ) throw Error( "" + g );
      n.push( "(?:" + y( g ) + ")" )
    }
    return RegExp( n.join( "|" ), l ? "gi" : "g" )
  }

  function M( a ) {
    function m( a ) {
      switch ( a.nodeType ) {
        case 1:
          if ( e.test( a.className ) ) break;
          for ( var g = a.firstChild; g; g = g.nextSibling ) m( g );
          g = a.nodeName;
          if ( "BR" === g || "LI" === g ) h[ s ] = "\n", t[ s << 1 ] = y++, t[ s++ << 1 | 1 ] = a;
          break;
        case 3:
        case 4:
          g = a.nodeValue, g.length && ( g = p ? g.replace( /\r\n?/g, "\n" ) : g.replace( /[\t\n\r ]+/g, " " ), h[ s ] = g, t[ s << 1 ] = y, y += g.length,
            t[ s++ << 1 | 1 ] = a )
      }
    }
    var e = /(?:^|\s)nocode(?:\s|$)/;
    var h = [];
    var y = 0;
    var t = [];
    var s = 0;
    var l;
    a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && ( l = document.defaultView.getComputedStyle( a, q ).getPropertyValue( "white-space" ) );
    var p = l && "pre" === l.substring( 0, 3 );
    m( a );
    return {
      a: h.join( "" ).replace( /\n$/, "" ),
      c: t
    }
  }

  function B( a, m, e, h ) {
    m && ( a = {
      a: m,
      d: a
    }, e( a ), h.push(...a.e) )
  }

  function x( a, m ) {
    function e( a ) {
      for ( var l = a.d, p = [ l, "pln" ], d = 0, g = a.a.match( y ) || [], r = {}, n = 0, z = g.length; n < z; ++n ) {
        var f = g[ n ];
        var b = r[ f ];
        var o = void 0;
        var c;
        if ( typeof b ===
          "string" ) c = !1;
        else {
          var i = h[ f.charAt( 0 ) ];
          if ( i ) o = f.match( i[ 1 ] ), b = i[ 0 ];
          else {
            for ( c = 0; c < t; ++c )
              if ( i = m[ c ], o = f.match( i[ 1 ] ) ) {
                b = i[ 0 ];
                break
              } o || ( b = "pln" )
          }
          if ( ( c = b.length >= 5 && "lang-" === b.substring( 0, 5 ) ) && !( o && typeof o[ 1 ] === "string" ) ) c = !1, b = "src";
          c || ( r[ f ] = b )
        }
        i = d;
        d += f.length;
        if ( c ) {
          c = o[ 1 ];
          var j = f.indexOf( c );
          var k = j + c.length;
          o[ 2 ] && ( k = f.length - o[ 2 ].length, j = k - c.length );
          b = b.substring( 5 );
          B( l + i, f.substring( 0, j ), e, p );
          B( l + i + j, c, C( b, c ), p );
          B( l + i + k, f.substring( k ), e, p )
        } else p.push( l + i, b )
      }
      a.e = p
    }
    var h = {};
    var y;
    (() => {
      for ( var e = a.concat( m ),
          l = [], p = {}, d = 0, g = e.length; d < g; ++d ) {
        var r = e[ d ];
        var n = r[ 3 ];
        if ( n )
          for ( var k = n.length; --k >= 0; ) h[ n.charAt( k ) ] = r;
        r = r[ 1 ];
        n = "" + r;
        p.hasOwnProperty( n ) || ( l.push( r ), p[ n ] = q )
      }
      l.push( /[\S\s]/ );
      y = L( l )
    })();
    var t = m.length;
    return e
  }

  function u( a ) {
    var m = [];
    var e = [];
    a.tripleQuotedStrings ? m.push( [ "str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\"" ] ) : a.multiLineStrings ? m.push( [ "str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
      q, "'\"`"
    ] ) : m.push( [ "str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'" ] );
    a.verbatimStrings && e.push( [ "str", /^@"(?:[^"]|"")*(?:"|$)/, q ] );
    var h = a.hashComments;
    h && ( a.cStyleComments ? ( h > 1 ? m.push( [ "com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#" ] ) : m.push( [ "com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#" ] ), e.push( [ "str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q ] ) ) : m.push( [ "com", /^#[^\n\r]*/,
      q, "#"
    ] ) );
    a.cStyleComments && ( e.push( [ "com", /^\/\/[^\n\r]*/, q ] ), e.push( [ "com", /^\/\*[\S\s]*?(?:\*\/|$)/, q ] ) );
    a.regexLiterals && e.push( [ "lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/ ] );
    ( h = a.types ) && e.push( [ "typ", h ] );
    a = ( "" + a.keywords ).replace( /^ | $/g,
      "" );
    a.length && e.push( [ "kwd", RegExp( "^(?:" + a.replace( /[\s,]+/g, "|" ) + ")\\b" ), q ] );
    m.push( [ "pln", /^\s+/, q, " \r\n\t\xa0" ] );
    e.push( [ "lit", /^@[$_a-z][\w$@]*/i, q ], [ "typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q ], [ "pln", /^[$_a-z][\w$@]*/i, q ], [ "lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789" ], [ "pln", /^\\[\S\s]?/, q ], [ "pun", /^.[^\s\w"-$'./@\\`]*/, q ] );
    return x( m, e )
  }

  function D( a, m ) {
    function e( a ) {
      switch ( a.nodeType ) {
        case 1:
          if ( k.test( a.className ) ) break;
          if ( "BR" === a.nodeName ) h( a ),
            a.parentNode && a.parentNode.removeChild( a );
          else
            for ( a = a.firstChild; a; a = a.nextSibling ) e( a );
          break;
        case 3:
        case 4:
          if ( p ) {
            var b = a.nodeValue;
            var d = b.match( t );
            if ( d ) {
              var c = b.substring( 0, d.index );
              a.nodeValue = c;
              ( b = b.substring( d.index + d[ 0 ].length ) ) && a.parentNode.insertBefore( s.createTextNode( b ), a.nextSibling );
              h( a );
              c || a.parentNode.removeChild( a )
            }
          }
      }
    }

    function h( a ) {
      function b( a, d ) {
        var e = d ? a.cloneNode( !1 ) : a;
        var f = a.parentNode;
        if ( f ) {
          var f = b( f, 1 );
          var g = a.nextSibling;
          f.appendChild( e );
          for ( var h = g; h; h = g ) g = h.nextSibling, f.appendChild( h )
        }
        return e
      }
      for ( ; !a.nextSibling; )
        if ( a = a.parentNode, !a ) return;
      for ( var a = b( a.nextSibling, 0 ), e;
        ( e = a.parentNode ) && e.nodeType === 1; ) a = e;
      d.push( a )
    }
    var k = /(?:^|\s)nocode(?:\s|$)/;
    var t = /\r\n?|\n/;
    var s = a.ownerDocument;
    var l;
    a.currentStyle ? l = a.currentStyle.whiteSpace : window.getComputedStyle && ( l = s.defaultView.getComputedStyle( a, q ).getPropertyValue( "white-space" ) );
    var p = l && "pre" === l.substring( 0, 3 );
    for ( l = s.createElement( "LI" ); a.firstChild; ) l.appendChild( a.firstChild );
    for ( var d = [ l ], g = 0; g < d.length; ++g ) e( d[ g ] );
    m === ( m | 0 ) && d[ 0 ].setAttribute( "value",
      m );
    var r = s.createElement( "OL" );
    r.className = "linenums";
    for ( var n = Math.max( 0, m - 1 | 0 ) || 0, g = 0, z = d.length; g < z; ++g ) l = d[ g ], l.className = "L" + ( g + n ) % 10, l.firstChild || l.appendChild( s.createTextNode( "\xa0" ) ), r.appendChild( l );
    a.appendChild( r )
  }

  function k( a, m ) {
    for ( var e = m.length; --e >= 0; ) {
      var h = m[ e ];
      A.hasOwnProperty( h ) ? window.console && console.warn( "cannot override language handler %s", h ) : A[ h ] = a
    }
  }

  function C( a, m ) {
    if ( !a || !A.hasOwnProperty( a ) ) a = /^\s*</.test( m ) ? "default-markup" : "default-code";
    return A[ a ]
  }

  function E( a ) {
    var m =
      a.g;
    try {
      var e = M( a.h );
      var h = e.a;
      a.a = h;
      a.c = e.c;
      a.d = 0;
      C( m, h )( a );
      var k = /\bMSIE\b/.test( navigator.userAgent );
      var m = /\n/g;
      var t = a.a;
      var s = t.length;
      var e = 0;
      var l = a.c;
      var p = l.length;
      var h = 0;
      var d = a.e;
      var g = d.length;
      var a = 0;
      d[ g ] = s;
      var r;
      var n;
      for ( n = r = 0; n < g; ) d[ n ] !== d[ n + 2 ] ? ( d[ r++ ] = d[ n++ ], d[ r++ ] = d[ n++ ] ) : n += 2;
      g = r;
      for ( n = r = 0; n < g; ) {
        for ( var z = d[ n ], f = d[ n + 1 ], b = n + 2; b + 2 <= g && d[ b + 1 ] === f; ) b += 2;
        d[ r++ ] = z;
        d[ r++ ] = f;
        n = b
      }
      for ( d.length = r; h < p; ) {
        var o = l[ h + 2 ] || s;
        var c = d[ a + 2 ] || s;
        var b = Math.min( o, c );
        var i = l[ h + 1 ];
        var j;
        if ( i.nodeType !== 1 && ( j = t.substring( e, b ) ) ) {
          k && ( j = j.replace( m, "\r" ) );
          i.nodeValue =
            j;
          var u = i.ownerDocument;
          var v = u.createElement( "SPAN" );
          v.className = d[ a + 1 ];
          var x = i.parentNode;
          x.replaceChild( v, i );
          v.appendChild( i );
          e < o && ( l[ h + 1 ] = i = u.createTextNode( t.substring( b, o ) ), x.insertBefore( i, v.nextSibling ) )
        }
        e = b;
        e >= o && ( h += 2 );
        e >= c && ( a += 2 )
      }
    } catch ( w ) {
      "console" in window && console.log( w && w.stack ? w.stack : w )
    }
  }
  var v = [ "break,continue,do,else,for,if,return,while" ];

  var w = [
    [ v, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile" ],
    "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
  ];

  var F = [ w, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where" ];
  var G = [ w, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient" ];
  var H = [ G, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var" ];
  var w = [ w, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN" ];
  var I = [ v, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None" ];
  var J = [ v, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END" ];
  var v = [ v, "case,done,elif,esac,eval,fi,function,in,local,set,then,until" ];
  var K = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/;
  var N = /\S/;

  var O = u( {
    keywords: [ F, H, w, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" +
      I, J, v
    ],
    hashComments: !0,
    cStyleComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  } );

  var A = {};
  k( O, [ "default-code" ] );
  k( x( [], [
      [ "pln", /^[^<?]+/ ],
      [ "dec", /^<!\w[^>]*(?:>|$)/ ],
      [ "com", /^<\!--[\S\s]*?(?:--\>|$)/ ],
      [ "lang-", /^<\?([\S\s]+?)(?:\?>|$)/ ],
      [ "lang-", /^<%([\S\s]+?)(?:%>|$)/ ],
      [ "pun", /^(?:<[%?]|[%?]>)/ ],
      [ "lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i ],
      [ "lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i ],
      [ "lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i ],
      [ "lang-in.tag", /^(<\/?[a-z][^<>]*>)/i ]
    ] ),
    [ "default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl" ] );
  k( x( [
    [ "pln", /^\s+/, q, " \t\r\n" ],
    [ "atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'" ]
  ], [
    [ "tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i ],
    [ "atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i ],
    [ "lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/ ],
    [ "pun", /^[/<->]+/ ],
    [ "lang-js", /^on\w+\s*=\s*"([^"]+)"/i ],
    [ "lang-js", /^on\w+\s*=\s*'([^']+)'/i ],
    [ "lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i ],
    [ "lang-css", /^style\s*=\s*"([^"]+)"/i ],
    [ "lang-css", /^style\s*=\s*'([^']+)'/i ],
    [ "lang-css",
      /^style\s*=\s*([^\s"'>]+)/i
    ]
  ] ), [ "in.tag" ] );
  k( x( [], [
    [ "atv", /^[\S\s]+/ ]
  ] ), [ "uq.val" ] );
  k( u( {
    keywords: F,
    hashComments: !0,
    cStyleComments: !0,
    types: K
  } ), [ "c", "cc", "cpp", "cxx", "cyc", "m" ] );
  k( u( {
    keywords: "null,true,false"
  } ), [ "json" ] );
  k( u( {
    keywords: H,
    hashComments: !0,
    cStyleComments: !0,
    verbatimStrings: !0,
    types: K
  } ), [ "cs" ] );
  k( u( {
    keywords: G,
    cStyleComments: !0
  } ), [ "java" ] );
  k( u( {
    keywords: v,
    hashComments: !0,
    multiLineStrings: !0
  } ), [ "bsh", "csh", "sh" ] );
  k( u( {
      keywords: I,
      hashComments: !0,
      multiLineStrings: !0,
      tripleQuotedStrings: !0
    } ),
    [ "cv", "py" ] );
  k( u( {
    keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
    hashComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  } ), [ "perl", "pl", "pm" ] );
  k( u( {
    keywords: J,
    hashComments: !0,
    multiLineStrings: !0,
    regexLiterals: !0
  } ), [ "rb" ] );
  k( u( {
    keywords: w,
    cStyleComments: !0,
    regexLiterals: !0
  } ), [ "js" ] );
  k( u( {
    keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
    hashComments: 3,
    cStyleComments: !0,
    multilineStrings: !0,
    tripleQuotedStrings: !0,
    regexLiterals: !0
  } ), [ "coffee" ] );
  k( x( [], [
    [ "str", /^[\S\s]+/ ]
  ] ), [ "regex" ] );
  window.prettyPrintOne = (a, m, e) => {
    var h = document.createElement( "PRE" );
    h.innerHTML = a;
    e && D( h, e );
    E( {
      g: m,
      i: e,
      h
    } );
    return h.innerHTML
  };
  window.prettyPrint = a => {
    function m() {
      for ( var e = window.PR_SHOULD_USE_CONTINUATION ? l.now() + 250 : Infinity; p < h.length && l.now() < e; p++ ) {
        var n = h[ p ];
        var k = n.className;
        if ( k.indexOf( "prettyprint" ) >= 0 ) {
          var k = k.match( g );
          var f;
          var b;
          if ( b = !k ) {
            b = n;
            for ( var o = void 0, c = b.firstChild; c; c = c.nextSibling ) var i = c.nodeType,
              o = i === 1 ? o ? b : c : i === 3 ? N.test( c.nodeValue ) ? b : o : o;
            b = ( f = o === b ? void 0 : o ) && "CODE" === f.tagName
          }
          b && ( k = f.className.match( g ) );
          k && ( k = k[ 1 ] );
          b = !1;
          for ( o = n.parentNode; o; o = o.parentNode )
            if ( ( o.tagName === "pre" || o.tagName === "code" || o.tagName === "xmp" ) && o.className && o.className.indexOf( "prettyprint" ) >= 0 ) {
              b = !0;
              break
            }b || ( ( b = ( b = n.className.match( /\blinenums\b(?::(\d+))?/ ) ) ? b[ 1 ] && b[ 1 ].length ? +b[ 1 ] : !0 : !1 ) && D( n, b ), d = {
              g: k,
              h: n,
              i: b
            }, E( d ) )
        }
      }
      p < h.length ? setTimeout( m,
        250 ) : a && a()
    }
    for ( var e = [ document.getElementsByTagName( "pre" ), document.getElementsByTagName( "code" ), document.getElementsByTagName( "xmp" ) ], h = [], k = 0; k < e.length; ++k )
      for ( var t = 0, s = e[ k ].length; t < s; ++t ) h.push( e[ k ][ t ] );
    var e = q;
    var l = Date;
    l.now || ( l = {
      now() {
        return +new Date
      }
    } );
    var p = 0;
    var d;
    var g = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    m()
  };
  window.PR = {
    createSimpleLexer: x,
    registerLangHandler: k,
    sourceDecorator: u,
    PR_ATTRIB_NAME: "atn",
    PR_ATTRIB_VALUE: "atv",
    PR_COMMENT: "com",
    PR_DECLARATION: "dec",
    PR_KEYWORD: "kwd",
    PR_LITERAL: "lit",
    PR_NOCODE: "nocode",
    PR_PLAIN: "pln",
    PR_PUNCTUATION: "pun",
    PR_SOURCE: "src",
    PR_STRING: "str",
    PR_TAG: "tag",
    PR_TYPE: "typ"
  }
})();

// Table sorter
($ => {
  $.extend( {
    tablesorter: new
    (function() {
      var parsers = [];
      var widgets = [];
      this.defaults = {
        cssHeader: "header",
        cssAsc: "headerSortUp",
        cssDesc: "headerSortDown",
        cssChildRow: "expand-child",
        sortInitialOrder: "asc",
        sortMultiSortKey: "shiftKey",
        sortForce: null,
        sortAppend: null,
        sortLocaleCompare: true,
        textExtraction: "simple",
        parsers: {},
        widgets: [],
        widgetZebra: {
          css: [ "even", "odd" ]
        },
        headers: {},
        widthFixed: false,
        cancelSelection: true,
        sortList: [],
        headerList: [],
        dateFormat: "us",
        decimal: '/\.|\,/g',
        onRenderHeader: null,
        selectorHeaders: 'thead th',
        debug: false
      };

      function benchmark( s, d ) {
        log( s + "," + ( new Date().getTime() - d.getTime() ) + "ms" );
      }
      this.benchmark = benchmark;

      function log( s ) {
        if ( typeof console != "undefined" && typeof console.debug != "undefined" ) {
          console.log( s );
        } else {
          alert( s );
        }
      }

      function buildParserCache( table, $headers ) {
        if ( table.config.debug ) {
          var parsersDebug = "";
        }
        if ( table.tBodies.length == 0 ) return;
        var rows = table.tBodies[ 0 ].rows;
        if ( rows[ 0 ] ) {
          var list = [];
          var cells = rows[ 0 ].cells;
          var l = cells.length;
          for ( var i = 0; i < l; i++ ) {
            var p = false;
            if ( $.metadata && ( $( $headers[ i ] ).metadata() && $( $headers[ i ] ).metadata().sorter ) ) {
              p = getParserById( $( $headers[ i ] ).metadata().sorter );
            } else if ( ( table.config.headers[ i ] && table.config.headers[ i ].sorter ) ) {
              p = getParserById( table.config.headers[ i ].sorter );
            }
            if ( !p ) {
              p = detectParserForColumn( table, rows, -1, i );
            }
            if ( table.config.debug ) {
              parsersDebug += "column:" + i + " parser:" + p.id + "\n";
            }
            list.push( p );
          }
        }
        if ( table.config.debug ) {
          log( parsersDebug );
        }
        return list;
      }

      function detectParserForColumn( table, rows, rowIndex, cellIndex ) {
        var l = parsers.length;
        var node = false;
        var nodeValue = false;
        var keepLooking = true;
        while ( nodeValue == '' && keepLooking ) {
          rowIndex++;
          if ( rows[ rowIndex ] ) {
            node = getNodeFromRowAndCellIndex( rows, rowIndex, cellIndex );
            nodeValue = trimAndGetNodeText( table.config, node );
            if ( table.config.debug ) {
              log( 'Checking if value was empty on row:' + rowIndex );
            }
          } else {
            keepLooking = false;
          }
        }
        for ( var i = 1; i < l; i++ ) {
          if ( parsers[ i ].is( nodeValue, table, node ) ) {
            return parsers[ i ];
          }
        }
        return parsers[ 0 ];
      }

      function getNodeFromRowAndCellIndex( rows, rowIndex, cellIndex ) {
        return rows[ rowIndex ].cells[ cellIndex ];
      }

      function trimAndGetNodeText( config, node ) {
        return $.trim( getElementText( config, node ) );
      }

      function getParserById( name ) {
        var l = parsers.length;
        for ( var i = 0; i < l; i++ ) {
          if ( parsers[ i ].id.toLowerCase() == name.toLowerCase() ) {
            return parsers[ i ];
          }
        }
        return false;
      }

      function buildCache( table ) {
        if ( table.config.debug ) {
          var cacheTime = new Date();
        }
        var totalRows = ( table.tBodies[ 0 ] && table.tBodies[ 0 ].rows.length ) || 0;
        var totalCells = ( table.tBodies[ 0 ].rows[ 0 ] && table.tBodies[ 0 ].rows[ 0 ].cells.length ) || 0;
        var parsers = table.config.parsers;

        var cache = {
          row: [],
          normalized: []
        };

        for ( var i = 0; i < totalRows; ++i ) {
          var c = $( table.tBodies[ 0 ].rows[ i ] );
          var cols = [];
          if ( c.hasClass( table.config.cssChildRow ) ) {
            cache.row[ cache.row.length - 1 ] = cache.row[ cache.row.length - 1 ].add( c );
            continue;
          }
          cache.row.push( c );
          for ( var j = 0; j < totalCells; ++j ) {
            cols.push( parsers[ j ].format( getElementText( table.config, c[ 0 ].cells[ j ] ), table, c[ 0 ].cells[ j ] ) );
          }
          cols.push( cache.normalized.length );
          cache.normalized.push( cols );
          cols = null;
        }
        if ( table.config.debug ) {
          benchmark( "Building cache for " + totalRows + " rows:", cacheTime );
        }
        return cache;
      }

      function getElementText( config, node ) {
        var text = "";
        if ( !node ) return "";
        if ( !config.supportsTextContent ) config.supportsTextContent = node.textContent || false;
        if ( config.textExtraction == "simple" ) {
          if ( config.supportsTextContent ) {
            text = node.textContent;
          } else {
            if ( node.childNodes[ 0 ] && node.childNodes[ 0 ].hasChildNodes() ) {
              text = node.childNodes[ 0 ].innerHTML;
            } else {
              text = node.innerHTML;
            }
          }
        } else {
          if ( typeof ( config.textExtraction ) == "function" ) {
            text = config.textExtraction( node );
          } else {
            text = $( node ).text();
          }
        }
        return text;
      }

      function appendToTable( table, cache ) {
        if ( table.config.debug ) {
          var appendTime = new Date()
        }
        var c = cache;
        var r = c.row;
        var n = c.normalized;
        var totalRows = n.length;
        var checkCell = ( n[ 0 ].length - 1 );
        var tableBody = $( table.tBodies[ 0 ] );
        var rows = [];
        for ( var i = 0; i < totalRows; i++ ) {
          var pos = n[ i ][ checkCell ];
          rows.push( r[ pos ] );
          if ( !table.config.appender ) {
            var l = r[ pos ].length;
            for ( var j = 0; j < l; j++ ) {
              tableBody[ 0 ].appendChild( r[ pos ][ j ] );
            }
          }
        }
        if ( table.config.appender ) {
          table.config.appender( table, rows );
        }
        rows = null;
        if ( table.config.debug ) {
          benchmark( "Rebuilt table:", appendTime );
        }
        applyWidget( table );
        setTimeout( () => {
          $( table ).trigger( "sortEnd" );
        }, 0 );
      }

      function buildHeaders( table ) {
        if ( table.config.debug ) {
          var time = new Date();
        }
        var meta = ( $.metadata ) ? true : false;
        var header_index = computeTableHeaderCellIndexes( table );
        $tableHeaders = $( table.config.selectorHeaders, table ).each( function ( index ) {
          this.column = header_index[ this.parentNode.rowIndex + "-" + this.cellIndex ];
          this.order = formatSortingOrder( table.config.sortInitialOrder );
          this.count = this.order;
          if ( checkHeaderMetadata( this ) || checkHeaderOptions( table, index ) ) this.sortDisabled = true;
          if ( checkHeaderOptionsSortingLocked( table, index ) ) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked( table, index );
          if ( !this.sortDisabled ) {
            var $th = $( this ).addClass( table.config.cssHeader );
            if ( table.config.onRenderHeader ) table.config.onRenderHeader.apply( $th );
          }
          table.config.headerList[ index ] = this;
        } );
        if ( table.config.debug ) {
          benchmark( "Built headers:", time );
          log( $tableHeaders );
        }
        return $tableHeaders;
      }

      function computeTableHeaderCellIndexes( t ) {
        var matrix = [];
        var lookup = {};
        var thead = t.getElementsByTagName( 'THEAD' )[ 0 ];
        var trs = thead.getElementsByTagName( 'TR' );
        for ( var i = 0; i < trs.length; i++ ) {
          var cells = trs[ i ].cells;
          for ( var j = 0; j < cells.length; j++ ) {
            var c = cells[ j ];
            var rowIndex = c.parentNode.rowIndex;
            var cellId = rowIndex + "-" + c.cellIndex;
            var rowSpan = c.rowSpan || 1;
            var colSpan = c.colSpan || 1
            var firstAvailCol;
            if ( typeof ( matrix[ rowIndex ] ) == "undefined" ) {
              matrix[ rowIndex ] = [];
            }
            for ( var k = 0; k < matrix[ rowIndex ].length + 1; k++ ) {
              if ( typeof ( matrix[ rowIndex ][ k ] ) == "undefined" ) {
                firstAvailCol = k;
                break;
              }
            }
            lookup[ cellId ] = firstAvailCol;
            for ( var k = rowIndex; k < rowIndex + rowSpan; k++ ) {
              if ( typeof ( matrix[ k ] ) == "undefined" ) {
                matrix[ k ] = [];
              }
              var matrixrow = matrix[ k ];
              for ( var l = firstAvailCol; l < firstAvailCol + colSpan; l++ ) {
                matrixrow[ l ] = "x";
              }
            }
          }
        }
        return lookup;
      }

      function checkCellColSpan( table, rows, row ) {
        var arr = [];
        var r = table.tHead.rows;
        var c = r[ row ].cells;
        for ( var i = 0; i < c.length; i++ ) {
          var cell = c[ i ];
          if ( cell.colSpan > 1 ) {
            arr = arr.concat( checkCellColSpan( table, headerArr, row++ ) );
          } else {
            if ( table.tHead.length == 1 || ( cell.rowSpan > 1 || !r[ row + 1 ] ) ) {
              arr.push( cell );
            }
          }
        }
        return arr;
      }

      function checkHeaderMetadata( cell ) {
        if ( ( $.metadata ) && ( $( cell ).metadata().sorter === false ) ) {
          return true;
        };
        return false;
      }

      function checkHeaderOptions( table, i ) {
        if ( ( table.config.headers[ i ] ) && ( table.config.headers[ i ].sorter === false ) ) {
          return true;
        };
        return false;
      }

      function checkHeaderOptionsSortingLocked( table, i ) {
        if ( ( table.config.headers[ i ] ) && ( table.config.headers[ i ].lockedOrder ) ) return table.config.headers[ i ].lockedOrder;
        return false;
      }

      function applyWidget( table ) {
        var c = table.config.widgets;
        var l = c.length;
        for ( var i = 0; i < l; i++ ) {
          getWidgetById( c[ i ] ).format( table );
        }
      }

      function getWidgetById( name ) {
        var l = widgets.length;
        for ( var i = 0; i < l; i++ ) {
          if ( widgets[ i ].id.toLowerCase() == name.toLowerCase() ) {
            return widgets[ i ];
          }
        }
      }

      function formatSortingOrder( v ) {
        if ( typeof ( v ) != "Number" ) {
          return ( v.toLowerCase() == "desc" ) ? 1 : 0;
        } else {
          return ( v == 1 ) ? 1 : 0;
        }
      }

      function isValueInArray( v, a ) {
        var l = a.length;
        for ( var i = 0; i < l; i++ ) {
          if ( a[ i ][ 0 ] == v ) {
            return true;
          }
        }
        return false;
      }

      function setHeadersCss( table, $headers, list, css ) {
        $headers.removeClass( css[ 0 ] ).removeClass( css[ 1 ] );
        var h = [];
        $headers.each( function ( offset ) {
          if ( !this.sortDisabled ) {
            h[ this.column ] = $( this );
          }
        } );
        var l = list.length;
        for ( var i = 0; i < l; i++ ) {
          h[ list[ i ][ 0 ] ].addClass( css[ list[ i ][ 1 ] ] );
        }
      }

      function fixColumnWidth( table, $headers ) {
        var c = table.config;
        if ( c.widthFixed ) {
          var colgroup = $( '<colgroup>' );
          $( "tr:first td", table.tBodies[ 0 ] ).each( function () {
            colgroup.append( $( '<col>' ).css( 'width', $( this ).width() ) );
          } );
          $( table ).prepend( colgroup );
        };
      }

      function updateHeaderSortCount( table, sortList ) {
        var c = table.config;
        var l = sortList.length;
        for ( var i = 0; i < l; i++ ) {
          var s = sortList[ i ];
          var o = c.headerList[ s[ 0 ] ];
          o.count = s[ 1 ];
          o.count++;
        }
      }

      function multisort( table, sortList, cache ) {
        if ( table.config.debug ) {
          var sortTime = new Date();
        }
        var dynamicExp = "var sortWrapper = function(a,b) {";
        var l = sortList.length;
        for ( var i = 0; i < l; i++ ) {
          var c = sortList[ i ][ 0 ];
          var order = sortList[ i ][ 1 ];
          var s = ( table.config.parsers[ c ].type == "text" ) ? ( ( order == 0 ) ? makeSortFunction( "text", "asc", c ) : makeSortFunction( "text", "desc", c ) ) : ( ( order == 0 ) ? makeSortFunction( "numeric", "asc", c ) : makeSortFunction( "numeric", "desc", c ) );
          var e = "e" + i;
          dynamicExp += "var " + e + " = " + s;
          dynamicExp += "if(" + e + ") { return " + e + "; } ";
          dynamicExp += "else { ";
        }
        var orgOrderCol = cache.normalized[ 0 ].length - 1;
        dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";
        for ( var i = 0; i < l; i++ ) {
          dynamicExp += "}; ";
        }
        dynamicExp += "return 0; ";
        dynamicExp += "}; ";
        if ( table.config.debug ) {
          benchmark( "Evaling expression:" + dynamicExp, new Date() );
        }
        eval( dynamicExp );
        cache.normalized.sort( sortWrapper );
        if ( table.config.debug ) {
          benchmark( "Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime );
        }
        return cache;
      }

      function makeSortFunction( type, direction, index ) {
        var a = "a[" + index + "]";
        var b = "b[" + index + "]";
        if ( type == 'text' && direction == 'asc' ) {
          return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
        } else if ( type == 'text' && direction == 'desc' ) {
          return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
        } else if ( type == 'numeric' && direction == 'asc' ) {
          return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
        } else if ( type == 'numeric' && direction == 'desc' ) {
          return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
        }
      }

      function makeSortText( i ) {
        return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
      }

      function makeSortTextDesc( i ) {
        return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
      }

      function makeSortNumeric( i ) {
        return "a[" + i + "]-b[" + i + "];";
      }

      function makeSortNumericDesc( i ) {
        return "b[" + i + "]-a[" + i + "];";
      }

      function sortText( a, b ) {
        if ( table.config.sortLocaleCompare ) return a.localeCompare( b );
        return ( ( a < b ) ? -1 : ( ( a > b ) ? 1 : 0 ) );
      }

      function sortTextDesc( a, b ) {
        if ( table.config.sortLocaleCompare ) return b.localeCompare( a );
        return ( ( b < a ) ? -1 : ( ( b > a ) ? 1 : 0 ) );
      }

      function sortNumeric( a, b ) {
        return a - b;
      }

      function sortNumericDesc( a, b ) {
        return b - a;
      }

      function getCachedSortType( parsers, i ) {
        return parsers[ i ].type;
      }
      this.construct = function ( settings ) {
        return this.each( function () {
          if ( !this.tHead || !this.tBodies ) return;
          var $this;
          var $document;
          var $headers;
          var cache;
          var config;
          var shiftDown = 0;
          var sortOrder;
          this.config = {};
          config = $.extend( this.config, $.tablesorter.defaults, settings );
          $this = $( this );
          $.data( this, "tablesorter", config );
          $headers = buildHeaders( this );
          this.config.parsers = buildParserCache( this, $headers );
          cache = buildCache( this );
          var sortCSS = [ config.cssDesc, config.cssAsc ];
          fixColumnWidth( this );
          $headers.click( function ( e ) {
            var totalRows = ( $this[ 0 ].tBodies[ 0 ] && $this[ 0 ].tBodies[ 0 ].rows.length ) || 0;
            if ( !this.sortDisabled && totalRows > 0 ) {
              $this.trigger( "sortStart" );
              var $cell = $( this );
              var i = this.column;
              this.order = this.count++ % 2;
              if ( this.lockedOrder ) this.order = this.lockedOrder;
              if ( !e[ config.sortMultiSortKey ] ) {
                config.sortList = [];
                if ( config.sortForce != null ) {
                  var a = config.sortForce;
                  for ( var j = 0; j < a.length; j++ ) {
                    if ( a[ j ][ 0 ] != i ) {
                      config.sortList.push( a[ j ] );
                    }
                  }
                }
                config.sortList.push( [ i, this.order ] );
              } else {
                if ( isValueInArray( i, config.sortList ) ) {
                  for ( var j = 0; j < config.sortList.length; j++ ) {
                    var s = config.sortList[ j ];
                    var o = config.headerList[ s[ 0 ] ];
                    if ( s[ 0 ] == i ) {
                      o.count = s[ 1 ];
                      o.count++;
                      s[ 1 ] = o.count % 2;
                    }
                  }
                } else {
                  config.sortList.push( [ i, this.order ] );
                }
              };
              setTimeout( () => {
                setHeadersCss( $this[ 0 ], $headers, config.sortList, sortCSS );
                appendToTable( $this[ 0 ], multisort( $this[ 0 ], config.sortList, cache ) );
              }, 1 );
              return false;
            }
          } ).mousedown( function () {
            if ( config.cancelSelection ) {
              this.onselectstart = () => false;
              return false;
            }
          } );
          $this.bind( "update", function () {
            var me = this;
            setTimeout( () => {
              me.config.parsers = buildParserCache( me, $headers );
              cache = buildCache( me );
            }, 1 );
          } ).bind( "updateCell", function ( e, cell ) {
            var config = this.config;
            var pos = [ ( cell.parentNode.rowIndex - 1 ), cell.cellIndex ];
            cache.normalized[ pos[ 0 ] ][ pos[ 1 ] ] = config.parsers[ pos[ 1 ] ].format( getElementText( config, cell ), cell );
          } ).bind( "sorton", function ( e, list ) {
            $( this ).trigger( "sortStart" );
            config.sortList = list;
            var sortList = config.sortList;
            updateHeaderSortCount( this, sortList );
            setHeadersCss( this, $headers, sortList, sortCSS );
            appendToTable( this, multisort( this, sortList, cache ) );
          } ).bind( "appendCache", function () {
            appendToTable( this, cache );
          } ).bind( "applyWidgetId", function ( e, id ) {
            getWidgetById( id ).format( this );
          } ).bind( "applyWidgets", function () {
            applyWidget( this );
          } );
          if ( $.metadata && ( $( this ).metadata() && $( this ).metadata().sortlist ) ) {
            config.sortList = $( this ).metadata().sortlist;
          }
          if ( config.sortList.length > 0 ) {
            $this.trigger( "sorton", [ config.sortList ] );
          }
          applyWidget( this );
        } );
      };
      this.addParser = parser => {
        var l = parsers.length;
        var a = true;
        for ( var i = 0; i < l; i++ ) {
          if ( parsers[ i ].id.toLowerCase() == parser.id.toLowerCase() ) {
            a = false;
          }
        }
        if ( a ) {
          parsers.push( parser );
        }
      };
      this.addWidget = widget => {
        widgets.push( widget );
      };
      this.formatFloat = s => {
        var i = parseFloat( s );
        return ( isNaN( i ) ) ? 0 : i;
      };
      this.formatInt = s => {
        var i = parseInt( s );
        return ( isNaN( i ) ) ? 0 : i;
      };
      this.isDigit = (s, config) => /^[-+]?\d*$/.test( $.trim( s.replace( /[,.']/g, '' ) ) );
      this.clearTableBody = table => {
        if ( $.browser.msie ) {
          function empty() {
            while ( this.firstChild ) this.removeChild( this.firstChild );
          }
          empty.apply( table.tBodies[ 0 ] );
        } else {
          table.tBodies[ 0 ].innerHTML = "";
        }
      };
    })
  } );
  $.fn.extend( {
    tablesorter: $.tablesorter.construct
  } );
  var ts = $.tablesorter;
  ts.addParser( {
    id: "text",
    is(s) {
      return true;
    },
    format(s) {
      return $.trim( s.toLocaleLowerCase() );
    },
    type: "text"
  } );
  ts.addParser( {
    id: "digit",
    is(s, table) {
      var c = table.config;
      return $.tablesorter.isDigit( s, c );
    },
    format(s) {
      return $.tablesorter.formatFloat( s );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "currency",
    is(s) {
      return /^[£$€?.]/.test( s );
    },
    format(s) {
      return $.tablesorter.formatFloat( s.replace( new RegExp( /[£$€]/g ), "" ) );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "ipAddress",
    is(s) {
      return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test( s );
    },
    format(s) {
      var a = s.split( "." );
      var r = "";
      var l = a.length;
      for ( var i = 0; i < l; i++ ) {
        var item = a[ i ];
        if ( item.length == 2 ) {
          r += "0" + item;
        } else {
          r += item;
        }
      }
      return $.tablesorter.formatFloat( r );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "url",
    is(s) {
      return /^(https?|ftp|file):\/\/$/.test( s );
    },
    format(s) {
      return jQuery.trim( s.replace( new RegExp( /(https?|ftp|file):\/\// ), '' ) );
    },
    type: "text"
  } );
  ts.addParser( {
    id: "isoDate",
    is(s) {
      return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test( s );
    },
    format(s) {
      return $.tablesorter.formatFloat( ( s != "" ) ? new Date( s.replace( new RegExp( /-/g ), "/" ) ).getTime() : "0" );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "percent",
    is(s) {
      return /\%$/.test( $.trim( s ) );
    },
    format(s) {
      return $.tablesorter.formatFloat( s.replace( new RegExp( /%/g ), "" ) );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "usLongDate",
    is(s) {
      return s.match( new RegExp( /^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/ ) );
    },
    format(s) {
      return $.tablesorter.formatFloat( new Date( s ).getTime() );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "shortDate",
    is(s) {
      return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test( s );
    },
    format(s, table) {
      var c = table.config;
      s = s.replace( /\-/g, "/" );
      if ( c.dateFormat == "us" ) {
        s = s.replace( /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2" );
      } else if ( c.dateFormat == "uk" ) {
        s = s.replace( /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1" );
      } else if ( c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy" ) {
        s = s.replace( /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3" );
      }
      return $.tablesorter.formatFloat( new Date( s ).getTime() );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "time",
    is(s) {
      return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test( s );
    },
    format(s) {
      return $.tablesorter.formatFloat( new Date( "2000/01/01 " + s ).getTime() );
    },
    type: "numeric"
  } );
  ts.addParser( {
    id: "metadata",
    is(s) {
      return false;
    },
    format(s, table, cell) {
      var c = table.config;
      var p = ( !c.parserMetadataName ) ? 'sortValue' : c.parserMetadataName;
      return $( cell ).metadata()[ p ];
    },
    type: "numeric"
  } );
  ts.addWidget( {
    id: "zebra",
    format(table) {
      if ( table.config.debug ) {
        var time = new Date();
      }
      var $tr;
      var row = -1;
      var odd;
      $( "tr:visible", table.tBodies[ 0 ] ).each( function ( i ) {
        $tr = $( this );
        if ( !$tr.hasClass( table.config.cssChildRow ) ) row++;
        odd = ( row % 2 == 0 );
        $tr.removeClass( table.config.widgetZebra.css[ odd ? 0 : 1 ] ).addClass( table.config.widgetZebra.css[ odd ? 1 : 0 ] )
      } );
      if ( table.config.debug ) {
        $.tablesorter.benchmark( "Applying Zebra widget", time );
      }
    }
  } );
})(jQuery);

($ => {
  $.isBlank = obj => !obj || $.trim( obj ) === "";
})(jQuery);

// Time picker
($ => {
  $.ui.timepicker = $.ui.timepicker || {};
  if ( $.ui.timepicker.version ) {
    return
  }
  $.extend( $.ui, {
    timepicker: {
      version: "1.1.1"
    }
  } );

  function Timepicker() {
    this.regional = [];
    this.regional[ "" ] = {
      currentText: "Now",
      closeText: "Done",
      amNames: [ "AM", "A" ],
      pmNames: [ "PM", "P" ],
      timeFormat: "HH:mm",
      timeSuffix: "",
      timeOnlyTitle: "Choose Time",
      timeText: "Time",
      hourText: "Hour",
      minuteText: "Minute",
      secondText: "Second",
      millisecText: "Millisecond",
      timezoneText: "Time Zone",
      isRTL: false
    };
    this._defaults = {
      showButtonPanel: true,
      timeOnly: false,
      showHour: true,
      showMinute: true,
      showSecond: false,
      showMillisec: false,
      showTimezone: false,
      showTime: true,
      stepHour: 1,
      stepMinute: 1,
      stepSecond: 1,
      stepMillisec: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisec: 0,
      timezone: null,
      useLocalTimezone: false,
      defaultTimezone: "+0000",
      hourMin: 0,
      minuteMin: 0,
      secondMin: 0,
      millisecMin: 0,
      hourMax: 23,
      minuteMax: 59,
      secondMax: 59,
      millisecMax: 999,
      minDateTime: null,
      maxDateTime: null,
      onSelect: null,
      hourGrid: 0,
      minuteGrid: 0,
      secondGrid: 0,
      millisecGrid: 0,
      alwaysSetTime: true,
      separator: " ",
      altFieldTimeOnly: true,
      altTimeFormat: null,
      altSeparator: null,
      altTimeSuffix: null,
      pickerTimeFormat: null,
      pickerTimeSuffix: null,
      showTimepicker: true,
      timezoneIso8601: false,
      timezoneList: null,
      addSliderAccess: false,
      sliderAccessArgs: null,
      controlType: "slider",
      defaultValue: null,
      parse: "strict"
    };
    $.extend( this._defaults, this.regional[ "" ] )
  }
  $.extend( Timepicker.prototype, {
    $input: null,
    $altInput: null,
    $timeObj: null,
    inst: null,
    hour_slider: null,
    minute_slider: null,
    second_slider: null,
    millisec_slider: null,
    timezone_select: null,
    hour: 0,
    minute: 0,
    second: 0,
    millisec: 0,
    timezone: null,
    defaultTimezone: "+0000",
    hourMinOriginal: null,
    minuteMinOriginal: null,
    secondMinOriginal: null,
    millisecMinOriginal: null,
    hourMaxOriginal: null,
    minuteMaxOriginal: null,
    secondMaxOriginal: null,
    millisecMaxOriginal: null,
    ampm: "",
    formattedDate: "",
    formattedTime: "",
    formattedDateTime: "",
    timezoneList: null,
    units: [ "hour", "minute", "second", "millisec" ],
    control: null,
    setDefaults(settings) {
      extendRemove( this._defaults, settings || {} );
      return this
    },
    _newInst($input, o) {
      var tp_inst = new Timepicker();
      var inlineSettings = {};
      var fns = {};
      var overrides;
      var i;
      for ( var attrName in this._defaults ) {
        if ( this._defaults.hasOwnProperty( attrName ) ) {
          var attrValue = $input.attr( "time:" + attrName );
          if ( attrValue ) {
            try {
              inlineSettings[ attrName ] = eval( attrValue )
            } catch ( err ) {
              inlineSettings[ attrName ] = attrValue
            }
          }
        }
      }
      overrides = {
        beforeShow(input, dp_inst) {
          if ( $.isFunction( tp_inst._defaults.evnts.beforeShow ) ) {
            return tp_inst._defaults.evnts.beforeShow.call( $input[ 0 ], input, dp_inst, tp_inst )
          }
        },
        onChangeMonthYear(year, month, dp_inst) {
          tp_inst._updateDateTime( dp_inst );
          if ( $.isFunction( tp_inst._defaults.evnts.onChangeMonthYear ) ) {
            tp_inst._defaults.evnts.onChangeMonthYear.call( $input[ 0 ], year, month, dp_inst, tp_inst )
          }
        },
        onClose(dateText, dp_inst) {
          if ( tp_inst.timeDefined === true && $input.val() !== "" ) {
            tp_inst._updateDateTime( dp_inst )
          }
          if ( $.isFunction( tp_inst._defaults.evnts.onClose ) ) {
            tp_inst._defaults.evnts.onClose.call( $input[ 0 ], dateText, dp_inst, tp_inst )
          }
        }
      };
      for ( i in overrides ) {
        if ( overrides.hasOwnProperty( i ) ) {
          fns[ i ] = o[ i ] || null
        }
      }
      tp_inst._defaults = $.extend( {}, this._defaults, inlineSettings, o, overrides, {
        evnts: fns,
        timepicker: tp_inst
      } );
      tp_inst.amNames = $.map( tp_inst._defaults.amNames, val => val.toUpperCase() );
      tp_inst.pmNames = $.map( tp_inst._defaults.pmNames, val => val.toUpperCase() );
      if ( typeof ( tp_inst._defaults.controlType ) === "string" ) {
        if ( $.fn[ tp_inst._defaults.controlType ] === undefined ) {
          tp_inst._defaults.controlType = "select"
        }
        tp_inst.control = tp_inst._controls[ tp_inst._defaults.controlType ]
      } else {
        tp_inst.control = tp_inst._defaults.controlType
      }
      if ( tp_inst._defaults.timezoneList === null ) {
        var timezoneList = [ "-1200", "-1100", "-1000", "-0930", "-0900", "-0800", "-0700", "-0600", "-0500", "-0430", "-0400", "-0330", "-0300", "-0200", "-0100", "+0000", "+0100", "+0200", "+0300", "+0330", "+0400", "+0430", "+0500", "+0530", "+0545", "+0600", "+0630", "+0700", "+0800", "+0845", "+0900", "+0930", "+1000", "+1030", "+1100", "+1130", "+1200", "+1245", "+1300", "+1400" ];
        if ( tp_inst._defaults.timezoneIso8601 ) {
          timezoneList = $.map( timezoneList, val => val == "+0000" ? "Z" : ( val.substring( 0, 3 ) + ":" + val.substring( 3 ) ) )
        }
        tp_inst._defaults.timezoneList = timezoneList
      }
      tp_inst.timezone = tp_inst._defaults.timezone;
      tp_inst.hour = tp_inst._defaults.hour;
      tp_inst.minute = tp_inst._defaults.minute;
      tp_inst.second = tp_inst._defaults.second;
      tp_inst.millisec = tp_inst._defaults.millisec;
      tp_inst.ampm = "";
      tp_inst.$input = $input;
      if ( o.altField ) {
        tp_inst.$altInput = $( o.altField ).css( {
          cursor: "pointer"
        } ).focus( () => {
          $input.trigger( "focus" )
        } )
      }
      if ( tp_inst._defaults.minDate === 0 || tp_inst._defaults.minDateTime === 0 ) {
        tp_inst._defaults.minDate = new Date()
      }
      if ( tp_inst._defaults.maxDate === 0 || tp_inst._defaults.maxDateTime === 0 ) {
        tp_inst._defaults.maxDate = new Date()
      }
      if ( tp_inst._defaults.minDate !== undefined && tp_inst._defaults.minDate instanceof Date ) {
        tp_inst._defaults.minDateTime = new Date( tp_inst._defaults.minDate.getTime() )
      }
      if ( tp_inst._defaults.minDateTime !== undefined && tp_inst._defaults.minDateTime instanceof Date ) {
        tp_inst._defaults.minDate = new Date( tp_inst._defaults.minDateTime.getTime() )
      }
      if ( tp_inst._defaults.maxDate !== undefined && tp_inst._defaults.maxDate instanceof Date ) {
        tp_inst._defaults.maxDateTime = new Date( tp_inst._defaults.maxDate.getTime() )
      }
      if ( tp_inst._defaults.maxDateTime !== undefined && tp_inst._defaults.maxDateTime instanceof Date ) {
        tp_inst._defaults.maxDate = new Date( tp_inst._defaults.maxDateTime.getTime() )
      }
      tp_inst.$input.bind( "focus", () => {
        tp_inst._onFocus()
      } );
      return tp_inst
    },
    _addTimePicker(dp_inst) {
      var currDT = ( this.$altInput && this._defaults.altFieldTimeOnly ) ? this.$input.val() + " " + this.$altInput.val() : this.$input.val();
      this.timeDefined = this._parseTime( currDT );
      this._limitMinMaxDateTime( dp_inst, false );
      this._injectTimePicker()
    },
    _parseTime(timeString, withDate) {
      if ( !this.inst ) {
        this.inst = $.datepicker._getInst( this.$input[ 0 ] )
      }
      if ( withDate || !this._defaults.timeOnly ) {
        var dp_dateFormat = $.datepicker._get( this.inst, "dateFormat" );
        try {
          var parseRes = parseDateTimeInternal( dp_dateFormat, this._defaults.timeFormat, timeString, $.datepicker._getFormatConfig( this.inst ), this._defaults );
          if ( !parseRes.timeObj ) {
            return false
          }
          $.extend( this, parseRes.timeObj )
        } catch ( err ) {
          $.datepicker.log( "Error parsing the date/time string: " + err + "\ndate/time string = " + timeString + "\ntimeFormat = " + this._defaults.timeFormat + "\ndateFormat = " + dp_dateFormat );
          return false
        }
        return true
      } else {
        var timeObj = $.datepicker.parseTime( this._defaults.timeFormat, timeString, this._defaults );
        if ( !timeObj ) {
          return false
        }
        $.extend( this, timeObj );
        return true
      }
    },
    _injectTimePicker() {
      var $dp = this.inst.dpDiv;
      var o = this.inst.settings;
      var tp_inst = this;
      var litem = "";
      var uitem = "";
      var max = {};
      var gridSize = {};
      var size = null;
      if ( $dp.find( "div.ui-timepicker-div" ).length === 0 && o.showTimepicker ) {
        var noDisplay = ' style="display:none;"';
        var html = '<div class="ui-timepicker-div' + ( o.isRTL ? " ui-timepicker-rtl" : "" ) + '"><dl><dt class="ui_tpicker_time_label"' + ( ( o.showTime ) ? "" : noDisplay ) + ">" + o.timeText + '</dt><dd class="ui_tpicker_time"' + ( ( o.showTime ) ? "" : noDisplay ) + "></dd>";
        for ( var i = 0, l = this.units.length; i < l; i++ ) {
          litem = this.units[ i ];
          uitem = litem.substr( 0, 1 ).toUpperCase() + litem.substr( 1 );
          max[ litem ] = parseInt( ( o[ litem + "Max" ] - ( ( o[ litem + "Max" ] - o[ litem + "Min" ] ) % o[ "step" + uitem ] ) ), 10 );
          gridSize[ litem ] = 0;
          html += '<dt class="ui_tpicker_' + litem + '_label"' + ( ( o[ "show" + uitem ] ) ? "" : noDisplay ) + ">" + o[ litem + "Text" ] + '</dt><dd class="ui_tpicker_' + litem + '"><div class="ui_tpicker_' + litem + '_slider"' + ( ( o[ "show" + uitem ] ) ? "" : noDisplay ) + "></div>";
          if ( o[ "show" + uitem ] && o[ litem + "Grid" ] > 0 ) {
            html += '<div style="padding-left: 1px"><table class="ui-tpicker-grid-label"><tr>';
            if ( litem == "hour" ) {
              for ( var h = o[ litem + "Min" ]; h <= max[ litem ]; h += parseInt( o[ litem + "Grid" ], 10 ) ) {
                gridSize[ litem ]++;
                var tmph = $.datepicker.formatTime( useAmpm( o.pickerTimeFormat || o.timeFormat ) ? "hht" : "HH", {
                  hour: h
                }, o );
                html += '<td data-for="' + litem + '">' + tmph + "</td>"
              }
            } else {
              for ( var m = o[ litem + "Min" ]; m <= max[ litem ]; m += parseInt( o[ litem + "Grid" ], 10 ) ) {
                gridSize[ litem ]++;
                html += '<td data-for="' + litem + '">' + ( ( m < 10 ) ? "0" : "" ) + m + "</td>"
              }
            }
            html += "</tr></table></div>"
          }
          html += "</dd>"
        }
        html += '<dt class="ui_tpicker_timezone_label"' + ( ( o.showTimezone ) ? "" : noDisplay ) + ">" + o.timezoneText + "</dt>";
        html += '<dd class="ui_tpicker_timezone" ' + ( ( o.showTimezone ) ? "" : noDisplay ) + "></dd>";
        html += "</dl></div>";
        var $tp = $( html );
        if ( o.timeOnly === true ) {
          $tp.prepend( '<div class="ui-widget-header ui-helper-clearfix ui-corner-all"><div class="ui-datepicker-title">' + o.timeOnlyTitle + "</div></div>" );
          $dp.find( ".ui-datepicker-header, .ui-datepicker-calendar" ).hide()
        }
        for ( var i = 0, l = tp_inst.units.length; i < l; i++ ) {
          litem = tp_inst.units[ i ];
          uitem = litem.substr( 0, 1 ).toUpperCase() + litem.substr( 1 );
          tp_inst[ litem + "_slider" ] = tp_inst.control.create( tp_inst, $tp.find( ".ui_tpicker_" + litem + "_slider" ), litem, tp_inst[ litem ], o[ litem + "Min" ], max[ litem ], o[ "step" + uitem ] );
          if ( o[ "show" + uitem ] && o[ litem + "Grid" ] > 0 ) {
            size = 100 * gridSize[ litem ] * o[ litem + "Grid" ] / ( max[ litem ] - o[ litem + "Min" ] );
            $tp.find( ".ui_tpicker_" + litem + " table" ).css( {
              width: size + "%",
              marginLeft: o.isRTL ? "0" : ( ( size / ( -2 * gridSize[ litem ] ) ) + "%" ),
              marginRight: o.isRTL ? ( ( size / ( -2 * gridSize[ litem ] ) ) + "%" ) : "0",
              borderCollapse: "collapse"
            } ).find( "td" ).click( function ( e ) {
              var $t = $( this );
              var h = $t.html();
              var n = parseInt( h.replace( /[^0-9]/g ), 10 );
              var ap = h.replace( /[^apm]/ig );
              var f = $t.data( "for" );
              if ( f == "hour" ) {
                if ( ap.indexOf( "p" ) !== -1 && n < 12 ) {
                  n += 12
                } else {
                  if ( ap.indexOf( "a" ) !== -1 && n === 12 ) {
                    n = 0
                  }
                }
              }
              tp_inst.control.value( tp_inst, tp_inst[ f + "_slider" ], litem, n );
              tp_inst._onTimeChange();
              tp_inst._onSelectHandler()
            } ).css( {
              cursor: "pointer",
              width: ( 100 / gridSize[ litem ] ) + "%",
              textAlign: "center",
              overflow: "hidden"
            } )
          }
        }
        this.timezone_select = $tp.find( ".ui_tpicker_timezone" ).append( "<select></select>" ).find( "select" );
        $.fn.append.apply( this.timezone_select, $.map( o.timezoneList, (val, idx) => $( "<option />" ).val( typeof val == "object" ? val.value : val ).text( typeof val == "object" ? val.label : val ) ) );
        if ( typeof ( this.timezone ) != "undefined" && this.timezone !== null && this.timezone !== "" ) {
          var local_date = new Date( this.inst.selectedYear, this.inst.selectedMonth, this.inst.selectedDay, 12 );
          var local_timezone = $.timepicker.timeZoneOffsetString( local_date );
          if ( local_timezone == this.timezone ) {
            selectLocalTimeZone( tp_inst )
          } else {
            this.timezone_select.val( this.timezone )
          }
        } else {
          if ( typeof ( this.hour ) != "undefined" && this.hour !== null && this.hour !== "" ) {
            this.timezone_select.val( o.defaultTimezone )
          } else {
            selectLocalTimeZone( tp_inst )
          }
        }
        this.timezone_select.change( () => {
          tp_inst._defaults.useLocalTimezone = false;
          tp_inst._onTimeChange()
        } );
        var $buttonPanel = $dp.find( ".ui-datepicker-buttonpane" );
        if ( $buttonPanel.length ) {
          $buttonPanel.before( $tp )
        } else {
          $dp.append( $tp )
        }
        this.$timeObj = $tp.find( ".ui_tpicker_time" );
        if ( this.inst !== null ) {
          var timeDefined = this.timeDefined;
          this._onTimeChange();
          this.timeDefined = timeDefined
        }
        if ( this._defaults.addSliderAccess ) {
          var sliderAccessArgs = this._defaults.sliderAccessArgs;
          var rtl = this._defaults.isRTL;
          sliderAccessArgs.isRTL = rtl;
          setTimeout( () => {
            if ( $tp.find( ".ui-slider-access" ).length === 0 ) {
              $tp.find( ".ui-slider:visible" ).sliderAccess( sliderAccessArgs );
              var sliderAccessWidth = $tp.find( ".ui-slider-access:eq(0)" ).outerWidth( true );
              if ( sliderAccessWidth ) {
                $tp.find( "table:visible" ).each( function () {
                  var $g = $( this );
                  var oldWidth = $g.outerWidth();
                  var oldMarginLeft = $g.css( rtl ? "marginRight" : "marginLeft" ).toString().replace( "%", "" );
                  var newWidth = oldWidth - sliderAccessWidth;
                  var newMarginLeft = ( ( oldMarginLeft * newWidth ) / oldWidth ) + "%";

                  var css = {
                    width: newWidth,
                    marginRight: 0,
                    marginLeft: 0
                  };

                  css[ rtl ? "marginRight" : "marginLeft" ] = newMarginLeft;
                  $g.css( css )
                } )
              }
            }
          }, 10 )
        }
      }
    },
    _limitMinMaxDateTime(dp_inst, adjustSliders) {
      var o = this._defaults;
      var dp_date = new Date( dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay );
      if ( !this._defaults.showTimepicker ) {
        return
      }
      if ( $.datepicker._get( dp_inst, "minDateTime" ) !== null && $.datepicker._get( dp_inst, "minDateTime" ) !== undefined && dp_date ) {
        var minDateTime = $.datepicker._get( dp_inst, "minDateTime" );
        var minDateTimeDate = new Date( minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), 0, 0, 0, 0 );
        if ( this.hourMinOriginal === null || this.minuteMinOriginal === null || this.secondMinOriginal === null || this.millisecMinOriginal === null ) {
          this.hourMinOriginal = o.hourMin;
          this.minuteMinOriginal = o.minuteMin;
          this.secondMinOriginal = o.secondMin;
          this.millisecMinOriginal = o.millisecMin
        }
        if ( dp_inst.settings.timeOnly || minDateTimeDate.getTime() == dp_date.getTime() ) {
          this._defaults.hourMin = minDateTime.getHours();
          if ( this.hour <= this._defaults.hourMin ) {
            this.hour = this._defaults.hourMin;
            this._defaults.minuteMin = minDateTime.getMinutes();
            if ( this.minute <= this._defaults.minuteMin ) {
              this.minute = this._defaults.minuteMin;
              this._defaults.secondMin = minDateTime.getSeconds();
              if ( this.second <= this._defaults.secondMin ) {
                this.second = this._defaults.secondMin;
                this._defaults.millisecMin = minDateTime.getMilliseconds()
              } else {
                if ( this.millisec < this._defaults.millisecMin ) {
                  this.millisec = this._defaults.millisecMin
                }
                this._defaults.millisecMin = this.millisecMinOriginal
              }
            } else {
              this._defaults.secondMin = this.secondMinOriginal;
              this._defaults.millisecMin = this.millisecMinOriginal
            }
          } else {
            this._defaults.minuteMin = this.minuteMinOriginal;
            this._defaults.secondMin = this.secondMinOriginal;
            this._defaults.millisecMin = this.millisecMinOriginal
          }
        } else {
          this._defaults.hourMin = this.hourMinOriginal;
          this._defaults.minuteMin = this.minuteMinOriginal;
          this._defaults.secondMin = this.secondMinOriginal;
          this._defaults.millisecMin = this.millisecMinOriginal
        }
      }
      if ( $.datepicker._get( dp_inst, "maxDateTime" ) !== null && $.datepicker._get( dp_inst, "maxDateTime" ) !== undefined && dp_date ) {
        var maxDateTime = $.datepicker._get( dp_inst, "maxDateTime" );
        var maxDateTimeDate = new Date( maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), 0, 0, 0, 0 );
        if ( this.hourMaxOriginal === null || this.minuteMaxOriginal === null || this.secondMaxOriginal === null ) {
          this.hourMaxOriginal = o.hourMax;
          this.minuteMaxOriginal = o.minuteMax;
          this.secondMaxOriginal = o.secondMax;
          this.millisecMaxOriginal = o.millisecMax
        }
        if ( dp_inst.settings.timeOnly || maxDateTimeDate.getTime() == dp_date.getTime() ) {
          this._defaults.hourMax = maxDateTime.getHours();
          if ( this.hour >= this._defaults.hourMax ) {
            this.hour = this._defaults.hourMax;
            this._defaults.minuteMax = maxDateTime.getMinutes();
            if ( this.minute >= this._defaults.minuteMax ) {
              this.minute = this._defaults.minuteMax;
              this._defaults.secondMax = maxDateTime.getSeconds()
            } else {
              if ( this.second >= this._defaults.secondMax ) {
                this.second = this._defaults.secondMax;
                this._defaults.millisecMax = maxDateTime.getMilliseconds()
              } else {
                if ( this.millisec > this._defaults.millisecMax ) {
                  this.millisec = this._defaults.millisecMax
                }
                this._defaults.millisecMax = this.millisecMaxOriginal
              }
            }
          } else {
            this._defaults.minuteMax = this.minuteMaxOriginal;
            this._defaults.secondMax = this.secondMaxOriginal;
            this._defaults.millisecMax = this.millisecMaxOriginal
          }
        } else {
          this._defaults.hourMax = this.hourMaxOriginal;
          this._defaults.minuteMax = this.minuteMaxOriginal;
          this._defaults.secondMax = this.secondMaxOriginal;
          this._defaults.millisecMax = this.millisecMaxOriginal
        }
      }
      if ( adjustSliders !== undefined && adjustSliders === true ) {
        var hourMax = parseInt( ( this._defaults.hourMax - ( ( this._defaults.hourMax - this._defaults.hourMin ) % this._defaults.stepHour ) ), 10 );
        var minMax = parseInt( ( this._defaults.minuteMax - ( ( this._defaults.minuteMax - this._defaults.minuteMin ) % this._defaults.stepMinute ) ), 10 );
        var secMax = parseInt( ( this._defaults.secondMax - ( ( this._defaults.secondMax - this._defaults.secondMin ) % this._defaults.stepSecond ) ), 10 );
        var millisecMax = parseInt( ( this._defaults.millisecMax - ( ( this._defaults.millisecMax - this._defaults.millisecMin ) % this._defaults.stepMillisec ) ), 10 );
        if ( this.hour_slider ) {
          this.control.options( this, this.hour_slider, "hour", {
            min: this._defaults.hourMin,
            max: hourMax
          } );
          this.control.value( this, this.hour_slider, "hour", this.hour )
        }
        if ( this.minute_slider ) {
          this.control.options( this, this.minute_slider, "minute", {
            min: this._defaults.minuteMin,
            max: minMax
          } );
          this.control.value( this, this.minute_slider, "minute", this.minute )
        }
        if ( this.second_slider ) {
          this.control.options( this, this.second_slider, "second", {
            min: this._defaults.secondMin,
            max: secMax
          } );
          this.control.value( this, this.second_slider, "second", this.second )
        }
        if ( this.millisec_slider ) {
          this.control.options( this, this.millisec_slider, "millisec", {
            min: this._defaults.millisecMin,
            max: millisecMax
          } );
          this.control.value( this, this.millisec_slider, "millisec", this.millisec )
        }
      }
    },
    _onTimeChange() {
      var hour = ( this.hour_slider ) ? this.control.value( this, this.hour_slider, "hour" ) : false;
      var minute = ( this.minute_slider ) ? this.control.value( this, this.minute_slider, "minute" ) : false;
      var second = ( this.second_slider ) ? this.control.value( this, this.second_slider, "second" ) : false;
      var millisec = ( this.millisec_slider ) ? this.control.value( this, this.millisec_slider, "millisec" ) : false;
      var timezone = ( this.timezone_select ) ? this.timezone_select.val() : false;
      var o = this._defaults;
      var pickerTimeFormat = o.pickerTimeFormat || o.timeFormat;
      var pickerTimeSuffix = o.pickerTimeSuffix || o.timeSuffix;
      if ( typeof ( hour ) == "object" ) {
        hour = false
      }
      if ( typeof ( minute ) == "object" ) {
        minute = false
      }
      if ( typeof ( second ) == "object" ) {
        second = false
      }
      if ( typeof ( millisec ) == "object" ) {
        millisec = false
      }
      if ( typeof ( timezone ) == "object" ) {
        timezone = false
      }
      if ( hour !== false ) {
        hour = parseInt( hour, 10 )
      }
      if ( minute !== false ) {
        minute = parseInt( minute, 10 )
      }
      if ( second !== false ) {
        second = parseInt( second, 10 )
      }
      if ( millisec !== false ) {
        millisec = parseInt( millisec, 10 )
      }
      var ampm = o[ hour < 12 ? "amNames" : "pmNames" ][ 0 ];
      var hasChanged = ( hour != this.hour || minute != this.minute || second != this.second || millisec != this.millisec || ( this.ampm.length > 0 && ( hour < 12 ) != ( $.inArray( this.ampm.toUpperCase(), this.amNames ) !== -1 ) ) || ( ( this.timezone === null && timezone != this.defaultTimezone ) || ( this.timezone !== null && timezone != this.timezone ) ) );
      if ( hasChanged ) {
        if ( hour !== false ) {
          this.hour = hour
        }
        if ( minute !== false ) {
          this.minute = minute
        }
        if ( second !== false ) {
          this.second = second
        }
        if ( millisec !== false ) {
          this.millisec = millisec
        }
        if ( timezone !== false ) {
          this.timezone = timezone
        }
        if ( !this.inst ) {
          this.inst = $.datepicker._getInst( this.$input[ 0 ] )
        }
        this._limitMinMaxDateTime( this.inst, true )
      }
      if ( useAmpm( o.timeFormat ) ) {
        this.ampm = ampm
      }
      this.formattedTime = $.datepicker.formatTime( o.timeFormat, this, o );
      if ( this.$timeObj ) {
        if ( pickerTimeFormat === o.timeFormat ) {
          this.$timeObj.text( this.formattedTime + pickerTimeSuffix )
        } else {
          this.$timeObj.text( $.datepicker.formatTime( pickerTimeFormat, this, o ) + pickerTimeSuffix )
        }
      }
      this.timeDefined = true;
      if ( hasChanged ) {
        this._updateDateTime()
      }
    },
    _onSelectHandler() {
      var onSelect = this._defaults.onSelect || this.inst.settings.onSelect;
      var inputEl = this.$input ? this.$input[ 0 ] : null;
      if ( onSelect && inputEl ) {
        onSelect.apply( inputEl, [ this.formattedDateTime, this ] )
      }
    },
    _updateDateTime(dp_inst) {
      dp_inst = this.inst || dp_inst;
      var dt = $.datepicker._daylightSavingAdjust( new Date( dp_inst.selectedYear, dp_inst.selectedMonth, dp_inst.selectedDay ) );
      var dateFmt = $.datepicker._get( dp_inst, "dateFormat" );
      var formatCfg = $.datepicker._getFormatConfig( dp_inst );
      var timeAvailable = dt !== null && this.timeDefined;
      this.formattedDate = $.datepicker.formatDate( dateFmt, ( dt === null ? new Date() : dt ), formatCfg );
      var formattedDateTime = this.formattedDate;
      if ( this._defaults.timeOnly === true ) {
        formattedDateTime = this.formattedTime
      } else {
        if ( this._defaults.timeOnly !== true && ( this._defaults.alwaysSetTime || timeAvailable ) ) {
          formattedDateTime += this._defaults.separator + this.formattedTime + this._defaults.timeSuffix
        }
      }
      this.formattedDateTime = formattedDateTime;
      if ( !this._defaults.showTimepicker ) {
        this.$input.val( this.formattedDate )
      } else {
        if ( this.$altInput && this._defaults.altFieldTimeOnly === true ) {
          this.$altInput.val( this.formattedTime );
          this.$input.val( this.formattedDate )
        } else {
          if ( this.$altInput ) {
            this.$input.val( formattedDateTime );
            var altFormattedDateTime = "";
            var altSeparator = this._defaults.altSeparator ? this._defaults.altSeparator : this._defaults.separator;
            var altTimeSuffix = this._defaults.altTimeSuffix ? this._defaults.altTimeSuffix : this._defaults.timeSuffix;
            if ( this._defaults.altFormat ) {
              altFormattedDateTime = $.datepicker.formatDate( this._defaults.altFormat, ( dt === null ? new Date() : dt ), formatCfg )
            } else {
              altFormattedDateTime = this.formattedDate
            }
            if ( altFormattedDateTime ) {
              altFormattedDateTime += altSeparator
            }
            if ( this._defaults.altTimeFormat ) {
              altFormattedDateTime += $.datepicker.formatTime( this._defaults.altTimeFormat, this, this._defaults ) + altTimeSuffix
            } else {
              altFormattedDateTime += this.formattedTime + altTimeSuffix
            }
            this.$altInput.val( altFormattedDateTime )
          } else {
            this.$input.val( formattedDateTime )
          }
        }
      }
      this.$input.trigger( "change" )
    },
    _onFocus() {
      if ( !this.$input.val() && this._defaults.defaultValue ) {
        this.$input.val( this._defaults.defaultValue );
        var inst = $.datepicker._getInst( this.$input.get( 0 ) );
        var tp_inst = $.datepicker._get( inst, "timepicker" );
        if ( tp_inst ) {
          if ( tp_inst._defaults.timeOnly && ( inst.input.val() != inst.lastVal ) ) {
            try {
              $.datepicker._updateDatepicker( inst )
            } catch ( err ) {
              $.datepicker.log( err )
            }
          }
        }
      }
    },
    _controls: {
      slider: {
        create(tp_inst, obj, unit, val, min, max, step) {
          var rtl = tp_inst._defaults.isRTL;
          return obj.prop( "slide", null ).slider( {
            orientation: "horizontal",
            value: rtl ? val * -1 : val,
            min: rtl ? max * -1 : min,
            max: rtl ? min * -1 : max,
            step,
            slide(event, ui) {
              tp_inst.control.value( tp_inst, $( this ), unit, rtl ? ui.value * -1 : ui.value );
              tp_inst._onTimeChange()
            },
            stop(event, ui) {
              tp_inst._onSelectHandler()
            }
          } );
        },
        options(tp_inst, obj, unit, opts, val) {
          if ( tp_inst._defaults.isRTL ) {
            if ( typeof ( opts ) == "string" ) {
              if ( opts == "min" || opts == "max" ) {
                if ( val !== undefined ) {
                  return obj.slider( opts, val * -1 )
                }
                return Math.abs( obj.slider( opts ) )
              }
              return obj.slider( opts )
            }
            var min = opts.min;
            var max = opts.max;
            opts.min = opts.max = null;
            if ( min !== undefined ) {
              opts.max = min * -1
            }
            if ( max !== undefined ) {
              opts.min = max * -1
            }
            return obj.slider( opts )
          }
          if ( typeof ( opts ) == "string" && val !== undefined ) {
            return obj.slider( opts, val )
          }
          return obj.slider( opts )
        },
        value(tp_inst, obj, unit, val) {
          if ( tp_inst._defaults.isRTL ) {
            if ( val !== undefined ) {
              return obj.slider( "value", val * -1 )
            }
            return Math.abs( obj.slider( "value" ) )
          }
          if ( val !== undefined ) {
            return obj.slider( "value", val )
          }
          return obj.slider( "value" )
        }
      },
      select: {
        create(tp_inst, obj, unit, val, min, max, step) {
          var sel = '<select class="ui-timepicker-select" data-unit="' + unit + '" data-min="' + min + '" data-max="' + max + '" data-step="' + step + '">';
          var ul = tp_inst._defaults.timeFormat.indexOf( "t" ) !== -1 ? "toLowerCase" : "toUpperCase";
          var m = 0;
          for ( var i = min; i <= max; i += step ) {
            sel += '<option value="' + i + '"' + ( i == val ? " selected" : "" ) + ">";
            if ( unit == "hour" && useAmpm( tp_inst._defaults.pickerTimeFormat || tp_inst._defaults.timeFormat ) ) {
              sel += $.datepicker.formatTime( "hh TT", {
                hour: i
              }, tp_inst._defaults )
            } else {
              if ( unit == "millisec" || i >= 10 ) {
                sel += i
              } else {
                sel += "0" + i.toString()
              }
            }
            sel += "</option>"
          }
          sel += "</select>";
          obj.children( "select" ).remove();
          $( sel ).appendTo( obj ).change( e => {
            tp_inst._onTimeChange();
            tp_inst._onSelectHandler()
          } );
          return obj
        },
        options(tp_inst, obj, unit, opts, val) {
          var o = {};
          var $t = obj.children( "select" );
          if ( typeof ( opts ) == "string" ) {
            if ( val === undefined ) {
              return $t.data( opts )
            }
            o[ opts ] = val
          } else {
            o = opts
          }
          return tp_inst.control.create( tp_inst, obj, $t.data( "unit" ), $t.val(), o.min || $t.data( "min" ), o.max || $t.data( "max" ), o.step || $t.data( "step" ) )
        },
        value(tp_inst, obj, unit, val) {
          var $t = obj.children( "select" );
          if ( val !== undefined ) {
            return $t.val( val )
          }
          return $t.val()
        }
      }
    }
  } );
  $.fn.extend( {
    timepicker(o) {
      o = o || {};
      var tmp_args = Array.prototype.slice.call( arguments );
      if ( typeof o == "object" ) {
        tmp_args[ 0 ] = $.extend( o, {
          timeOnly: true
        } )
      }
      return $( this ).each( function () {
        $.fn.datetimepicker.apply( $( this ), tmp_args )
      } )
    },
    datetimepicker(o) {
      o = o || {};
      var tmp_args = arguments;
      if ( typeof ( o ) == "string" ) {
        if ( o == "getDate" ) {
          return $.fn.datepicker.apply( $( this[ 0 ] ), tmp_args )
        } else {
          return this.each( function () {
            var $t = $( this );
            $t.datepicker(...tmp_args)
          } );
        }
      } else {
        return this.each( function () {
          var $t = $( this );
          $t.datepicker( $.timepicker._newInst( $t, o )._defaults )
        } )
      }
    }
  } );
  $.datepicker.parseDateTime = (dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) => {
    var parseRes = parseDateTimeInternal( dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings );
    if ( parseRes.timeObj ) {
      var t = parseRes.timeObj;
      parseRes.date.setHours( t.hour, t.minute, t.second, t.millisec )
    }
    return parseRes.date
  };
  $.datepicker.parseTime = (timeFormat, timeString, options) => {
    var o = extendRemove( extendRemove( {}, $.timepicker._defaults ), options || {} );
    var strictParse = (f, s, o) => {
      var getPatternAmpm = (amNames, pmNames) => {
        var markers = [];
        if ( amNames ) {
          $.merge( markers, amNames )
        }
        if ( pmNames ) {
          $.merge( markers, pmNames )
        }
        markers = $.map( markers, val => val.replace( /[.*+?|()\[\]{}\\]/g, "\\$&" ) );
        return "(" + markers.join( "|" ) + ")?"
      };
      var getFormatPositions = timeFormat => {
        var finds = timeFormat.toLowerCase().match( /(h{1,2}|m{1,2}|s{1,2}|l{1}|t{1,2}|z|'.*?')/g );

        var orders = {
          h: -1,
          m: -1,
          s: -1,
          l: -1,
          t: -1,
          z: -1
        };

        if ( finds ) {
          for ( var i = 0; i < finds.length; i++ ) {
            if ( orders[ finds[ i ].toString().charAt( 0 ) ] == -1 ) {
              orders[ finds[ i ].toString().charAt( 0 ) ] = i + 1
            }
          }
        }
        return orders
      };

      var regstr = "^" + f.toString().replace( /([hH]{1,2}|mm?|ss?|[tT]{1,2}|[lz]|'.*?')/g, match => {
          switch ( match.charAt( 0 ).toLowerCase() ) {
            case "h":
              return "(\\d?\\d)";
            case "m":
              return "(\\d?\\d)";
            case "s":
              return "(\\d?\\d)";
            case "l":
              return "(\\d?\\d?\\d)";
            case "z":
              return "(z|[-+]\\d\\d:?\\d\\d|\\S+)?";
            case "t":
              return getPatternAmpm( o.amNames, o.pmNames );
            default:
              return "(" + match.replace( /\'/g, "" ).replace( /(\.|\$|\^|\\|\/|\(|\)|\[|\]|\?|\+|\*)/g, m => "\\" + m ) + ")?";
          }
        } ).replace( /\s/g, "\\s?" ) + o.timeSuffix + "$";

      var order = getFormatPositions( f );
      var ampm = "";
      var treg;
      treg = s.match( new RegExp( regstr, "i" ) );
      var resTime = {
        hour: 0,
        minute: 0,
        second: 0,
        millisec: 0
      };
      if ( treg ) {
        if ( order.t !== -1 ) {
          if ( treg[ order.t ] === undefined || treg[ order.t ].length === 0 ) {
            ampm = "";
            resTime.ampm = ""
          } else {
            ampm = $.inArray( treg[ order.t ].toUpperCase(), o.amNames ) !== -1 ? "AM" : "PM";
            resTime.ampm = o[ ampm == "AM" ? "amNames" : "pmNames" ][ 0 ]
          }
        }
        if ( order.h !== -1 ) {
          if ( ampm == "AM" && treg[ order.h ] == "12" ) {
            resTime.hour = 0
          } else {
            if ( ampm == "PM" && treg[ order.h ] != "12" ) {
              resTime.hour = parseInt( treg[ order.h ], 10 ) + 12
            } else {
              resTime.hour = Number( treg[ order.h ] )
            }
          }
        }
        if ( order.m !== -1 ) {
          resTime.minute = Number( treg[ order.m ] )
        }
        if ( order.s !== -1 ) {
          resTime.second = Number( treg[ order.s ] )
        }
        if ( order.l !== -1 ) {
          resTime.millisec = Number( treg[ order.l ] )
        }
        if ( order.z !== -1 && treg[ order.z ] !== undefined ) {
          var tz = treg[ order.z ].toUpperCase();
          switch ( tz.length ) {
            case 1:
              tz = o.timezoneIso8601 ? "Z" : "+0000";
              break;
            case 5:
              if ( o.timezoneIso8601 ) {
                tz = tz.substring( 1 ) == "0000" ? "Z" : tz.substring( 0, 3 ) + ":" + tz.substring( 3 )
              }
              break;
            case 6:
              if ( !o.timezoneIso8601 ) {
                tz = tz == "Z" || tz.substring( 1 ) == "00:00" ? "+0000" : tz.replace( /:/, "" )
              } else {
                if ( tz.substring( 1 ) == "00:00" ) {
                  tz = "Z"
                }
              }
              break
          }
          resTime.timezone = tz
        }
        return resTime
      }
      return false
    };
    var looseParse = (f, s, o) => {
      try {
        var d = new Date( "2012-01-01 " + s );
        return {
          hour: d.getHours(),
          minutes: d.getMinutes(),
          seconds: d.getSeconds(),
          millisec: d.getMilliseconds(),
          timezone: $.timepicker.timeZoneOffsetString( d )
        }
      } catch ( err ) {
        try {
          return strictParse( f, s, o )
        } catch ( err2 ) {
          $.datepicker.log( "Unable to parse \ntimeString: " + s + "\ntimeFormat: " + f )
        }
      }
      return false
    };
    if ( typeof o.parse === "function" ) {
      return o.parse( timeFormat, timeString, o )
    }
    if ( o.parse === "loose" ) {
      return looseParse( timeFormat, timeString, o )
    }
    return strictParse( timeFormat, timeString, o )
  };
  $.datepicker.formatTime = (format, time, options) => {
    options = options || {};
    options = $.extend( {}, $.timepicker._defaults, options );
    time = $.extend( {
      hour: 0,
      minute: 0,
      second: 0,
      millisec: 0,
      timezone: "+0000"
    }, time );
    var tmptime = format;
    var ampmName = options.amNames[ 0 ];
    var hour = parseInt( time.hour, 10 );
    if ( hour > 11 ) {
      ampmName = options.pmNames[ 0 ]
    }
    tmptime = tmptime.replace( /(?:HH?|hh?|mm?|ss?|[tT]{1,2}|[lz]|('.*?'|".*?"))/g, match => {
      switch ( match ) {
        case "HH":
          return ( "0" + hour ).slice( -2 );
        case "H":
          return hour;
        case "hh":
          return ( "0" + convert24to12( hour ) ).slice( -2 );
        case "h":
          return convert24to12( hour );
        case "mm":
          return ( "0" + time.minute ).slice( -2 );
        case "m":
          return time.minute;
        case "ss":
          return ( "0" + time.second ).slice( -2 );
        case "s":
          return time.second;
        case "l":
          return ( "00" + time.millisec ).slice( -3 );
        case "z":
          return time.timezone === null ? options.defaultTimezone : time.timezone;
        case "T":
          return ampmName.charAt( 0 ).toUpperCase();
        case "TT":
          return ampmName.toUpperCase();
        case "t":
          return ampmName.charAt( 0 ).toLowerCase();
        case "tt":
          return ampmName.toLowerCase();
        default:
          return match.replace( /\'/g, "" ) || "'"
      }
    } );
    tmptime = $.trim( tmptime );
    return tmptime
  };
  $.datepicker._base_selectDate = $.datepicker._selectDate;
  $.datepicker._selectDate = function ( id, dateStr ) {
    var inst = this._getInst( $( id )[ 0 ] );
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      tp_inst._limitMinMaxDateTime( inst, true );
      inst.inline = inst.stay_open = true;
      this._base_selectDate( id, dateStr );
      inst.inline = inst.stay_open = false;
      this._notifyChange( inst );
      this._updateDatepicker( inst )
    } else {
      this._base_selectDate( id, dateStr )
    }
  };
  $.datepicker._base_updateDatepicker = $.datepicker._updateDatepicker;
  $.datepicker._updateDatepicker = function ( inst ) {
    var input = inst.input[ 0 ];
    if ( $.datepicker._curInst && $.datepicker._curInst != inst && $.datepicker._datepickerShowing && $.datepicker._lastInput != input ) {
      return
    }
    if ( typeof ( inst.stay_open ) !== "boolean" || inst.stay_open === false ) {
      this._base_updateDatepicker( inst );
      var tp_inst = this._get( inst, "timepicker" );
      if ( tp_inst ) {
        tp_inst._addTimePicker( inst );
        if ( tp_inst._defaults.useLocalTimezone ) {
          var date = new Date( inst.selectedYear, inst.selectedMonth, inst.selectedDay, 12 );
          selectLocalTimeZone( tp_inst, date );
          tp_inst._onTimeChange()
        }
      }
    }
  };
  $.datepicker._base_doKeyPress = $.datepicker._doKeyPress;
  $.datepicker._doKeyPress = event => {
    var inst = $.datepicker._getInst( event.target );
    var tp_inst = $.datepicker._get( inst, "timepicker" );
    if ( tp_inst ) {
      if ( $.datepicker._get( inst, "constrainInput" ) ) {
        var ampm = useAmpm( tp_inst._defaults.timeFormat );
        var dateChars = $.datepicker._possibleChars( $.datepicker._get( inst, "dateFormat" ) );
        var datetimeChars = tp_inst._defaults.timeFormat.toString().replace( /[hms]/g, "" ).replace( /TT/g, ampm ? "APM" : "" ).replace( /Tt/g, ampm ? "AaPpMm" : "" ).replace( /tT/g, ampm ? "AaPpMm" : "" ).replace( /T/g, ampm ? "AP" : "" ).replace( /tt/g, ampm ? "apm" : "" ).replace( /t/g, ampm ? "ap" : "" ) + " " + tp_inst._defaults.separator + tp_inst._defaults.timeSuffix + ( tp_inst._defaults.showTimezone ? tp_inst._defaults.timezoneList.join( "" ) : "" ) + ( tp_inst._defaults.amNames.join( "" ) ) + ( tp_inst._defaults.pmNames.join( "" ) ) + dateChars;
        var chr = String.fromCharCode( event.charCode === undefined ? event.keyCode : event.charCode );
        return event.ctrlKey || ( chr < " " || !dateChars || datetimeChars.indexOf( chr ) > -1 )
      }
    }
    return $.datepicker._base_doKeyPress( event )
  };
  $.datepicker._base_updateAlternate = $.datepicker._updateAlternate;
  $.datepicker._updateAlternate = function ( inst ) {
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      var altField = tp_inst._defaults.altField;
      if ( altField ) {
        var altFormat = tp_inst._defaults.altFormat || tp_inst._defaults.dateFormat;
        var date = this._getDate( inst );
        var formatCfg = $.datepicker._getFormatConfig( inst );
        var altFormattedDateTime = "";
        var altSeparator = tp_inst._defaults.altSeparator ? tp_inst._defaults.altSeparator : tp_inst._defaults.separator;
        var altTimeSuffix = tp_inst._defaults.altTimeSuffix ? tp_inst._defaults.altTimeSuffix : tp_inst._defaults.timeSuffix;
        var altTimeFormat = tp_inst._defaults.altTimeFormat !== null ? tp_inst._defaults.altTimeFormat : tp_inst._defaults.timeFormat;
        altFormattedDateTime += $.datepicker.formatTime( altTimeFormat, tp_inst, tp_inst._defaults ) + altTimeSuffix;
        if ( !tp_inst._defaults.timeOnly && !tp_inst._defaults.altFieldTimeOnly ) {
          if ( tp_inst._defaults.altFormat ) {
            altFormattedDateTime = $.datepicker.formatDate( tp_inst._defaults.altFormat, ( date === null ? new Date() : date ), formatCfg ) + altSeparator + altFormattedDateTime
          } else {
            altFormattedDateTime = tp_inst.formattedDate + altSeparator + altFormattedDateTime
          }
        }
        $( altField ).val( altFormattedDateTime )
      }
    } else {
      $.datepicker._base_updateAlternate( inst )
    }
  };
  $.datepicker._base_doKeyUp = $.datepicker._doKeyUp;
  $.datepicker._doKeyUp = event => {
    var inst = $.datepicker._getInst( event.target );
    var tp_inst = $.datepicker._get( inst, "timepicker" );
    if ( tp_inst ) {
      if ( tp_inst._defaults.timeOnly && ( inst.input.val() != inst.lastVal ) ) {
        try {
          $.datepicker._updateDatepicker( inst )
        } catch ( err ) {
          $.datepicker.log( err )
        }
      }
    }
    return $.datepicker._base_doKeyUp( event )
  };
  $.datepicker._base_gotoToday = $.datepicker._gotoToday;
  $.datepicker._gotoToday = function ( id ) {
    var inst = this._getInst( $( id )[ 0 ] );
    var $dp = inst.dpDiv;
    this._base_gotoToday( id );
    var tp_inst = this._get( inst, "timepicker" );
    selectLocalTimeZone( tp_inst );
    var now = new Date();
    this._setTime( inst, now );
    $( ".ui-datepicker-today", $dp ).click()
  };
  $.datepicker._disableTimepickerDatepicker = function ( target ) {
    var inst = this._getInst( target );
    if ( !inst ) {
      return
    }
    var tp_inst = this._get( inst, "timepicker" );
    $( target ).datepicker( "getDate" );
    if ( tp_inst ) {
      tp_inst._defaults.showTimepicker = false;
      tp_inst._updateDateTime( inst )
    }
  };
  $.datepicker._enableTimepickerDatepicker = function ( target ) {
    var inst = this._getInst( target );
    if ( !inst ) {
      return
    }
    var tp_inst = this._get( inst, "timepicker" );
    $( target ).datepicker( "getDate" );
    if ( tp_inst ) {
      tp_inst._defaults.showTimepicker = true;
      tp_inst._addTimePicker( inst );
      tp_inst._updateDateTime( inst )
    }
  };
  $.datepicker._setTime = function ( inst, date ) {
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      var defaults = tp_inst._defaults;
      tp_inst.hour = date ? date.getHours() : defaults.hour;
      tp_inst.minute = date ? date.getMinutes() : defaults.minute;
      tp_inst.second = date ? date.getSeconds() : defaults.second;
      tp_inst.millisec = date ? date.getMilliseconds() : defaults.millisec;
      tp_inst._limitMinMaxDateTime( inst, true );
      tp_inst._onTimeChange();
      tp_inst._updateDateTime( inst )
    }
  };
  $.datepicker._setTimeDatepicker = function ( target, date, withDate ) {
    var inst = this._getInst( target );
    if ( !inst ) {
      return
    }
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      this._setDateFromField( inst );
      var tp_date;
      if ( date ) {
        if ( typeof date == "string" ) {
          tp_inst._parseTime( date, withDate );
          tp_date = new Date();
          tp_date.setHours( tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec )
        } else {
          tp_date = new Date( date.getTime() )
        }
        if ( tp_date.toString() == "Invalid Date" ) {
          tp_date = undefined
        }
        this._setTime( inst, tp_date )
      }
    }
  };
  $.datepicker._base_setDateDatepicker = $.datepicker._setDateDatepicker;
  $.datepicker._setDateDatepicker = function ( target, date ) {
    var inst = this._getInst( target );
    if ( !inst ) {
      return
    }
    var tp_date = ( date instanceof Date ) ? new Date( date.getTime() ) : date;
    this._updateDatepicker( inst );
    this._base_setDateDatepicker(...arguments);
    this._setTimeDatepicker( target, tp_date, true )
  };
  $.datepicker._base_getDateDatepicker = $.datepicker._getDateDatepicker;
  $.datepicker._getDateDatepicker = function ( target, noDefault ) {
    var inst = this._getInst( target );
    if ( !inst ) {
      return
    }
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      if ( inst.lastVal === undefined ) {
        this._setDateFromField( inst, noDefault )
      }
      var date = this._getDate( inst );
      if ( date && tp_inst._parseTime( $( target ).val(), tp_inst.timeOnly ) ) {
        date.setHours( tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec )
      }
      return date
    }
    return this._base_getDateDatepicker( target, noDefault )
  };
  $.datepicker._base_parseDate = $.datepicker.parseDate;
  $.datepicker.parseDate = function ( format, value, settings ) {
    var date;
    try {
      date = this._base_parseDate( format, value, settings )
    } catch ( err ) {
      date = this._base_parseDate( format, value.substring( 0, value.length - ( err.length - err.indexOf( ":" ) - 2 ) ), settings );
      $.datepicker.log( "Error parsing the date string: " + err + "\ndate string = " + value + "\ndate format = " + format )
    }
    return date
  };
  $.datepicker._base_formatDate = $.datepicker._formatDate;
  $.datepicker._formatDate = function ( inst, day, month, year ) {
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      tp_inst._updateDateTime( inst );
      return tp_inst.$input.val()
    }
    return this._base_formatDate( inst )
  };
  $.datepicker._base_optionDatepicker = $.datepicker._optionDatepicker;
  $.datepicker._optionDatepicker = function ( target, name, value ) {
    var inst = this._getInst( target );
    var name_clone;
    if ( !inst ) {
      return null
    }
    var tp_inst = this._get( inst, "timepicker" );
    if ( tp_inst ) {
      var min = null;
      var max = null;
      var onselect = null;
      var overrides = tp_inst._defaults.evnts;
      var fns = {};
      var prop;
      if ( typeof name == "string" ) {
        if ( name === "minDate" || name === "minDateTime" ) {
          min = value
        } else {
          if ( name === "maxDate" || name === "maxDateTime" ) {
            max = value
          } else {
            if ( name === "onSelect" ) {
              onselect = value
            } else {
              if ( overrides.hasOwnProperty( name ) ) {
                if ( typeof ( value ) === "undefined" ) {
                  return overrides[ name ]
                }
                fns[ name ] = value;
                name_clone = {}
              }
            }
          }
        }
      } else {
        if ( typeof name == "object" ) {
          if ( name.minDate ) {
            min = name.minDate
          } else {
            if ( name.minDateTime ) {
              min = name.minDateTime
            } else {
              if ( name.maxDate ) {
                max = name.maxDate
              } else {
                if ( name.maxDateTime ) {
                  max = name.maxDateTime
                }
              }
            }
          }
          for ( prop in overrides ) {
            if ( overrides.hasOwnProperty( prop ) && name[ prop ] ) {
              fns[ prop ] = name[ prop ]
            }
          }
        }
      }
      for ( prop in fns ) {
        if ( fns.hasOwnProperty( prop ) ) {
          overrides[ prop ] = fns[ prop ];
          if ( !name_clone ) {
            name_clone = $.extend( {}, name )
          }
          delete name_clone[ prop ]
        }
      }
      if ( name_clone && isEmptyObject( name_clone ) ) {
        return
      }
      if ( min ) {
        if ( min === 0 ) {
          min = new Date()
        } else {
          min = new Date( min )
        }
        tp_inst._defaults.minDate = min;
        tp_inst._defaults.minDateTime = min
      } else {
        if ( max ) {
          if ( max === 0 ) {
            max = new Date()
          } else {
            max = new Date( max )
          }
          tp_inst._defaults.maxDate = max;
          tp_inst._defaults.maxDateTime = max
        } else {
          if ( onselect ) {
            tp_inst._defaults.onSelect = onselect
          }
        }
      }
    }
    if ( value === undefined ) {
      return this._base_optionDatepicker.call( $.datepicker, target, name )
    }
    return this._base_optionDatepicker.call( $.datepicker, target, name_clone || name, value )
  };
  var isEmptyObject = obj => {
    var prop;
    for ( prop in obj ) {
      if ( obj.hasOwnProperty( obj ) ) {
        return false
      }
    }
    return true
  };
  var extendRemove = (target, props) => {
    $.extend( target, props );
    for ( var name in props ) {
      if ( props[ name ] === null || props[ name ] === undefined ) {
        target[ name ] = props[ name ]
      }
    }
    return target
  };
  var useAmpm = timeFormat => timeFormat.indexOf( "t" ) !== -1 && timeFormat.indexOf( "h" ) !== -1;
  var convert24to12 = hour => {
    if ( hour > 12 ) {
      hour = hour - 12
    }
    if ( hour == 0 ) {
      hour = 12
    }
    return String( hour )
  };
  var splitDateTime = (dateFormat, dateTimeString, dateSettings, timeSettings) => {
    try {
      var separator = timeSettings && timeSettings.separator ? timeSettings.separator : $.timepicker._defaults.separator;
      var format = timeSettings && timeSettings.timeFormat ? timeSettings.timeFormat : $.timepicker._defaults.timeFormat;
      var timeParts = format.split( separator );
      var timePartsLen = timeParts.length;
      var allParts = dateTimeString.split( separator );
      var allPartsLen = allParts.length;
      if ( allPartsLen > 1 ) {
        return [ allParts.splice( 0, allPartsLen - timePartsLen ).join( separator ), allParts.splice( 0, timePartsLen ).join( separator ) ]
      }
    } catch ( err ) {
      $.datepicker.log( "Could not split the date from the time. Please check the following datetimepicker options\nthrown error: " + err + "\ndateTimeString" + dateTimeString + "\ndateFormat = " + dateFormat + "\nseparator = " + timeSettings.separator + "\ntimeFormat = " + timeSettings.timeFormat );
      if ( err.indexOf( ":" ) >= 0 ) {
        var dateStringLength = dateTimeString.length - ( err.length - err.indexOf( ":" ) - 2 );
        var timeString = dateTimeString.substring( dateStringLength );
        return [ $.trim( dateTimeString.substring( 0, dateStringLength ) ), $.trim( dateTimeString.substring( dateStringLength ) ) ]
      } else {
        throw err
      }
    }
    return [ dateTimeString, "" ]
  };
  var parseDateTimeInternal = (dateFormat, timeFormat, dateTimeString, dateSettings, timeSettings) => {
    var date;
    var splitRes = splitDateTime( dateFormat, dateTimeString, dateSettings, timeSettings );
    date = $.datepicker._base_parseDate( dateFormat, splitRes[ 0 ], dateSettings );
    if ( splitRes[ 1 ] !== "" ) {
      var timeString = splitRes[ 1 ];
      var parsedTime = $.datepicker.parseTime( timeFormat, timeString, timeSettings );
      if ( parsedTime === null ) {
        throw "Wrong time format"
      }
      return {
        date,
        timeObj: parsedTime
      };
    } else {
      return {
        date
      };
    }
  };
  var selectLocalTimeZone = (tp_inst, date) => {
    if ( tp_inst && tp_inst.timezone_select ) {
      tp_inst._defaults.useLocalTimezone = true;
      var now = typeof date !== "undefined" ? date : new Date();
      var tzoffset = $.timepicker.timeZoneOffsetString( now );
      if ( tp_inst._defaults.timezoneIso8601 ) {
        tzoffset = tzoffset.substring( 0, 3 ) + ":" + tzoffset.substring( 3 )
      }
      tp_inst.timezone_select.val( tzoffset )
    }
  };
  $.timepicker = new Timepicker();
  $.timepicker.timeZoneOffsetString = date => {
    var off = date.getTimezoneOffset() * -1;
    var minutes = off % 60;
    var hours = ( off - minutes ) / 60;
    return ( off >= 0 ? "+" : "-" ) + ( "0" + ( hours * 101 ).toString() ).substr( -2 ) + ( "0" + ( minutes * 101 ).toString() ).substr( -2 )
  };
  $.timepicker.timeRange = (startTime, endTime, options) => $.timepicker.handleRange( "timepicker", startTime, endTime, options );
  $.timepicker.dateTimeRange = (startTime, endTime, options) => {
    $.timepicker.dateRange( startTime, endTime, options, "datetimepicker" )
  };
  $.timepicker.dateRange = (startTime, endTime, options, method) => {
    method = method || "datepicker";
    $.timepicker.handleRange( method, startTime, endTime, options )
  };
  $.timepicker.handleRange = (method, startTime, endTime, options) => {
    $.fn[ method ].call( startTime, $.extend( {
      onClose(dateText, inst) {
        checkDates( this, endTime, dateText )
      },
      onSelect(selectedDateTime) {
        selected( this, endTime, "minDate" )
      }
    }, options, options.start ) );
    $.fn[ method ].call( endTime, $.extend( {
      onClose(dateText, inst) {
        checkDates( this, startTime, dateText )
      },
      onSelect(selectedDateTime) {
        selected( this, startTime, "maxDate" )
      }
    }, options, options.end ) );
    if ( method != "timepicker" && options.reformat ) {
      $( [ startTime, endTime ] ).each( function () {
        var format = $( this )[ method ].call( $( this ), "option", "dateFormat" );
        var date = new Date( $( this ).val() );
        if ( $( this ).val() && date ) {
          $( this ).val( $.datepicker.formatDate( format, date ) )
        }
      } )
    }
    checkDates( startTime, endTime, startTime.val() );

    function checkDates( changed, other, dateText ) {
      if ( other.val() && ( new Date( startTime.val() ) > new Date( endTime.val() ) ) ) {
        other.val( dateText )
      }
    }
    selected( startTime, endTime, "minDate" );
    selected( endTime, startTime, "maxDate" );

    function selected( changed, other, option ) {
      if ( !$( changed ).val() ) {
        return
      }
      var date = $( changed )[ method ].call( $( changed ), "getDate" );
      if ( date.getTime ) {
        $( other )[ method ].call( $( other ), "option", option, date )
      }
    }
    return $( [ startTime.get( 0 ), endTime.get( 0 ) ] )
  };
  $.timepicker.version = "1.1.1"
})(jQuery);

// Scrolling
jQuery.fn.scrollMinimal = function ( smooth ) {

  var cTop = this.offset().top;
  var cHeight = this.outerHeight( true );
  var windowTop = $( window ).scrollTop();
  var visibleHeight = $( window ).height();

  if ( cTop < windowTop ) {
    if ( smooth ) {
      $( 'body' ).animate( {
        'scrollTop': cTop
      }, 'slow', 'swing' );
    } else {
      $( window ).scrollTop( cTop );
    }
  } else if ( cTop + cHeight > windowTop + visibleHeight ) {
    if ( smooth ) {
      $( 'body' ).animate( {
        'scrollTop': cTop - visibleHeight + cHeight
      }, 'slow', 'swing' );
    } else {
      $( window ).scrollTop( cTop - visibleHeight + cHeight );
    }
  }

};

$( () => {

  var pathname = document.location.pathname;
  $( 'div.sidebar a[href$="' + pathname + '"]' ).parent( 'li' ).addClass( 'current' );

  $( '#notifications' ).on( 'click', '.close', function () {
    $( this ).parent( '.alert-message' ).remove();
  } );

  $( ".table-sort" ).tablesorter( {
    sortList: [
      [ 0, 0 ]
    ]
  } );

} );

var _notifications = (message, level) => {
  var html = '<div class="alert-message block-message ' + level + '"><a href="#" class="close">Close</a><p>' + message + '</div>';
  $( '#notifications' ).html( html );
  $( '#notifications' ).prev().scrollMinimal();
}

var _assertFileSize = selector => {
    var $upload = $( selector );
    if ( $upload.length && $upload.prop( 'files' ) && $upload.prop( 'files' ).length ) {
      var file = $upload.prop( 'files' )[ 0 ];
      if ( file.size > 2 * 1024 * 1024 ) {
        _notifications( 'Selected file is over 2 megabytes', 'error' );
        return false;
      }
    }
    return true;
  }

  /**
   * Display a nice easy to use multiselect list
   * @Version: 2.0
   * @Author: Patrick Springstubbe
   * @Contact: @JediNobleclem
   * @Website: springstubbe.us
   * @Source: https://github.com/nobleclem/jQuery-MultiSelect
   * @Notes: If select list is hidden on page load use the jquery.actual plugin
   *         to resolve issues with preselected items placeholder text
   *         https://github.com/dreamerslab/jquery.actual
   *
   * Usage:
   *     $('select[multiple]').multiselect();
   *     $('select[multiple]').multiselect({ placeholder: 'Select options' });
   *     $('select[multiple]').multiselect('reload');
   *     $('select[multiple]').multiselect( 'loadOption', [{
   *         name   : 'Option Name 1',
   *         value  : 'option-value-1',
   *         checked: false
   *     },{
   *         name   : 'Option Name 2',
   *         value  : 'option-value-2',
   *         checked: false
   *     }]);
   *
   **/
  !(t => {
    function e( e, i ) {
      this.element = e, this.options = t.extend( {}, o, i ), this.load()
    }

    var o = {
        placeholder: "Select options",
        columns: 1,
        search: !1,
        searchOptions: {
          "default": "Search",
          showOptGroups: !1,
          onSearch(t) {}
        },
        selectAll: !1,
        selectGroup: !1,
        minHeight: 200,
        maxHeight: null,
        showCheckbox: !0,
        jqActualOpts: {},
        onLoad(e) {
          t( e ).hide()
        },
        onOptionClick(t, e) {},
        maxWidth: null,
        minSelect: !1,
        maxSelect: !1
      };

    var i = 1;
    e.prototype = {
      load() {
        var e = this;
        if ( "SELECT" != e.element.nodeName || t( e.element ).hasClass( "jqmsLoaded" ) ) return !0;
        t( e.element ).addClass( "jqmsLoaded" ), t( e.element ).after( '<div class="ms-options-wrap"><button>None Selected</button><div class="ms-options"><ul></ul></div></div>' );
        var o = t( e.element ).next( ".ms-options-wrap" ).find( "> button:first-child" );
        var i = t( e.element ).next( ".ms-options-wrap" ).find( "> .ms-options" );
        var s = i.find( "> ul" );
        var n = t( e.element ).find( "optgroup" ).length ? !0 : !1;
        var l = null;
        "number" == typeof e.options.width ? ( i.parent().css( "position", "relative" ), l = e.options.width ) : "string" == typeof e.options.width ? ( t( e.options.width ).css( "position", "relative" ), l = "100%" ) : i.parent().css( "position", "relative" );
        var a = t( window ).height() - i.offset().top - 20;
        if ( e.options.maxHeight && ( a = t( window ).height() - i.offset().top - 20, a = a < e.options.minHeight ? e.options.minHeight : maxheight ), a = a < e.options.minHeight ? e.options.minHeight : a, i.css( {
            maxWidth: l,
            minHeight: e.options.minHeight,
            maxHeight: a,
            overflow: "auto"
          } ).hide(), i.bind( "touchmove mousewheel DOMMouseScroll", function ( e ) {
            if ( t( this ).outerHeight() < t( this )[ 0 ].scrollHeight ) {
              var o = e.originalEvent;
              var i = o.wheelDelta || -o.detail;
              t( this ).outerHeight() + t( this )[ 0 ].scrollTop > t( this )[ 0 ].scrollHeight && ( e.preventDefault(), this.scrollTop += 0 > i ? 1 : -1 )
            }
          } ), t( document ).off( "click.ms-hideopts" ).on( "click.ms-hideopts", e => {
            t( e.target ).closest( ".ms-options-wrap" ).length || t( ".ms-options-wrap > .ms-options:visible" ).hide()
          } ), o.bind( "mousedown", o => {
            if ( 1 != o.which ) return !0;
            if ( t( ".ms-options-wrap > .ms-options:visible" ).each( function () {
                t( this ).parent().prev()[ 0 ] != i.parent().prev()[ 0 ] && t( this ).hide()
              } ), i.toggle(), i.is( ":visible" ) ) {
              i.css( "maxHeight", "" );
              var s = t( window ).height() - i.offset().top - 20;
              e.options.maxHeight && ( s = t( window ).height() - i.offset().top - 20, s = s < e.options.minHeight ? e.options.minHeight : maxheight ), s = s < e.options.minHeight ? e.options.minHeight : s, i.css( "maxHeight", s )
            }
          } ).click( t => {
            t.preventDefault()
          } ), e.options.placeholder && o.text( e.options.placeholder ), e.options.search ) {
          s.before( '<div class="ms-search"><input type="text" value="" placeholder="' + e.options.searchOptions[ "default" ] + '" /></div>' );
          var p = i.find( ".ms-search input" );
          p.on( "keyup", function () {
            return t( this ).data( "lastsearch" ) == t( this ).val() ? !0 : ( t( this ).data( "lastsearch", t( this ).val() ), "function" == typeof e.options.searchOptions.onSearch && e.options.searchOptions.onSearch( e.element ), void s.find( "li:not(.optgroup)" ).each( function () {
              var o = t( this ).text();
              o.toLowerCase().indexOf( p.val().toLowerCase() ) > -1 ? t( this ).show() : t( this ).hasClass( "selected" ) || t( this ).hide(), !e.options.searchOptions.showOptGroups && t( this ).closest( "li.optgroup" ) && ( t( this ).closest( "li.optgroup" ).show(), t( this ).closest( "li.optgroup" ).find( "li:visible" ).length ? t( this ).closest( "li.optgroup" ).show() : t( this ).closest( "li.optgroup" ).hide() )
            } ) )
          } )
        }
        e.options.selectAll && s.before( '<a href="#" class="ms-selectall global">Select all</a>' ), i.on( "click", ".ms-selectall", function ( e ) {
          if ( e.preventDefault(), t( this ).hasClass( "global" ) ) s.find( "li:not(.optgroup)" ).filter( ":not(.selected)" ).length ? s.find( "li:not(.optgroup)" ).filter( ":not(.selected)" ).find( 'input[type="checkbox"]' ).trigger( "click" ) : s.find( 'li:not(.optgroup).selected input[type="checkbox"]' ).trigger( "click" );
          else if ( t( this ).closest( "li" ).hasClass( "optgroup" ) ) {
            var o = t( this ).closest( "li.optgroup" );
            o.find( "li:not(.selected)" ).length ? o.find( 'li:not(.selected) input[type="checkbox"]' ).trigger( "click" ) : o.find( 'li.selected input[type="checkbox"]' ).trigger( "click" )
          }
        } );
        var c = [];
        t( e.element ).children().each( function () {
          if ( "OPTGROUP" == this.nodeName ) {
            var e = [];
            t( this ).children( "option" ).each( function () {
              e[ t( this ).val() ] = {
                name: t( this ).text(),
                value: t( this ).val(),
                checked: t( this ).prop( "selected" )
              }
            } ), c.push( {
              label: t( this ).attr( "label" ),
              options: e
            } )
          } else {
            if ( "OPTION" != this.nodeName ) return !0;
            c.push( {
              name: t( this ).text(),
              value: t( this ).val(),
              checked: t( this ).prop( "selected" )
            } )
          }
        } ), e.loadOptions( c ), n ? ( s.find( "> li:not(.optgroup)" ).css( {
          "float": "left",
          width: 100 / e.options.columns + "%"
        } ), s.find( "li.optgroup" ).css( {
          clear: "both"
        } ).find( "> ul" ).css( {
          "column-count": e.options.columns,
          "column-gap": 0,
          "-webkit-column-count": e.options.columns,
          "-webkit-column-gap": 0,
          "-moz-column-count": e.options.columns,
          "-moz-column-gap": 0
        } ), this._ieVersion() && this._ieVersion() < 10 && s.find( "li.optgroup > ul > li" ).css( {
          "float": "left",
          width: 100 / e.options.columns + "%"
        } ) ) : ( s.css( {
          "column-count": e.options.columns,
          "column-gap": 0,
          "-webkit-column-count": e.options.columns,
          "-webkit-column-gap": 0,
          "-moz-column-count": e.options.columns,
          "-moz-column-gap": 0
        } ), this._ieVersion() && this._ieVersion() < 10 && s.find( "> li" ).css( {
          "float": "left",
          width: 100 / e.options.columns + "%"
        } ) ), i.on( "click", 'input[type="checkbox"]', function () {
          t( this ).closest( "li" ).toggleClass( "selected" );
          var o = i.parent().prev();
          o.find( 'option[value="' + t( this ).val() + '"]' ).prop( "selected", t( this ).is( ":checked" ) ).closest( "select" ).trigger( "change" ), "function" == typeof e.options.onOptionClick && e.options.onOptionClick(), e._updatePlaceholderText()
        } ), "function" == typeof e.options.onLoad ? e.options.onLoad( e.element ) : t( e.element ).hide()
      },
      loadOptions(e, o) {
        o = "boolean" == typeof o ? o : !0;
        var i = this;
        var s = t( i.element ).next( ".ms-options-wrap" ).find( "> .ms-options > ul" );
        o && s.find( "> li" ).remove();
        for ( var n in e ) {
          var l = e[ n ];
          var a = t( "<li></li>" );
          if ( l.hasOwnProperty( "options" ) ) {
            a.addClass( "optgroup" ), a.append( '<span class="label">' + l.label + "</span>" ), a.find( "> .label" ).css( {
              clear: "both"
            } ), i.options.selectGroup && a.append( '<a href="#" class="ms-selectall">Select all</a>' ), a.append( "<ul></ul>" );
            for ( var p in l.options ) {
              var c = l.options[ p ];
              var h = t( "<li></li>" ).addClass( "ms-reflow" );
              i._addOption( h, c ), a.find( "> ul" ).append( h )
            }
          } else l.hasOwnProperty( "value" ) && ( a.addClass( "ms-reflow" ), i._addOption( a, l ) );
          s.append( a )
        }
        s.find( '.ms-reflow input[type="checkbox"]' ).each( function ( e ) {
          if ( t( this ).css( "display" ).match( /block$/ ) ) {
            var o = t( this ).outerWidth();
            o = o ? o : 15, t( this ).closest( "label" ).css( "padding-left", 2 * parseInt( t( this ).closest( "label" ).css( "padding-left" ) ) + o ), t( this ).closest( ".ms-reflow" ).removeClass( "ms-reflow" )
          }
        } ), i._updatePlaceholderText()
      },
      unload() {
        t( this.element ).next( ".ms-options-wrap" ).remove(), t( this.element ).show( function () {
          t( this ).css( "display", "" ).removeClass( "jqmsLoaded" )
        } )
      },
      reload() {
        t( this.element ).next( ".ms-options-wrap" ).remove(), t( this.element ).removeClass( "jqmsLoaded" ), this.load()
      },
      _updatePlaceholderText() {
        var e = this;
        var o = t( e.element ).next( ".ms-options-wrap" ).find( "> button:first-child" );
        var i = t( e.element ).next( ".ms-options-wrap" ).find( "> .ms-options" );
        var s = i.parent().prev();
        var n = [];
        s.find( "option:selected" ).each( function () {
          n.push( t( this ).text() )
        } ), o.text( n.join( ", " ) );

        var l = o.clone().css( {
            display: "inline",
            width: "auto",
            visibility: "hidden"
          } ).appendTo( i.parent() );

        var a = "undefined" != typeof t.fn.actual ? l.actual( "width", e.options.jqActualOpts ) : l.width();
        var p = "undefined" != typeof t.fn.actual ? o.actual( "width", e.options.jqActualOpts ) : o.width();
        a > p ? o.text( n.length + " selected" ) : n.length ? o.text( n.join( ", " ) ) : o.text( e.options.placeholder ), l.remove()
      },
      _addOption(e, o) {
        e.text( o.name ), e.prepend( t( '<input type="checkbox" value="" title="" />' ).val( o.value ).attr( "title", o.name ).attr( "id", "ms-opt-" + i ) ), o.checked && ( e.addClass( "default" ), e.addClass( "selected" ), e.find( 'input[type="checkbox"]' ).prop( "checked", !0 ) );
        var s = t( "<label></label>" ).attr( "for", "ms-opt-" + i );
        e.wrapInner( s ), this.options.showCheckbox || e.find( 'input[id="ms-opt-' + i + '"]' ).hide(), i += 1
      },
      _ieVersion() {
        var t = navigator.userAgent.toLowerCase();
        return -1 != t.indexOf( "msie" ) ? parseInt( t.split( "msie" )[ 1 ] ) : !1
      }
    }, t.fn.multiselect = function ( o ) {
      var i;
      var s = arguments;
      return void 0 === o || "object" == typeof o ? this.each( function () {
        t.data( this, "plugin_multiselect" ) || t.data( this, "plugin_multiselect", new e( this, o ) )
      } ) : "string" == typeof o && "_" !== o[ 0 ] && "init" !== o ? ( this.each( function () {
        var n = t.data( this, "plugin_multiselect" );
        n instanceof e && "function" == typeof n[ o ] && ( i = n[ o ](...Array.prototype.slice.call( s, 1 )) ), "unload" === o && t.data( this, "plugin_multiselect", null )
      } ), i ) : void 0;
    }
  })(jQuery);

$( () => {
  var $search = $( '.search-tools' );
  $search.on( 'input', () => {
    var searchText = $search.val().toUpperCase();
    $( '.sidebar a' ).each( function () {
      var textValue = this.innerText.toUpperCase();
      if ( searchText === '' || textValue.toUpperCase().indexOf( searchText ) > -1 ) {
        $( this ).removeClass( 'hide' );
      } else {
        $( this ).addClass( 'hide' );
      }
    } );
  } );
} );
