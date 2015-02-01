angular.module('swFilterDirective', [])

.filter('filter_checkmark', function() {
  return function(input) {
    return ( input === '1' ) ? '\u2713' : '\u2718';
  };
})

.filter('filter_ftyp', function() {
  return function(input) {
    var _t ='';

    switch (input) {

      case 'f' : _t+='fluid\u2665';break;
      case 'e' : _t+='elect\u2666';break;
      case 'm' : _t+='mech\u2660';break;
      defaulft : _t+='n.v.\u2663';break;

    };

    return _t;

  };
})

.filter('filter_rule', function() {
  return function(input) {
    var _t ='';

    switch (input) {

      case 'admin' : _t+='<i class="vwag-calendar"></i>';break;
      case 'mgmt' : _t+='mgmt\u2666';break;
      case 'ih' : _t+='ih\u2660';break;
      case 'lgr' : _t+='lgr\u2660';break;
      defaulft : _t+='n.v.\u2663';break;

    };

    return _t;

  };
})

/**
* -------------------------------------------------------------------------------------
* SVG Prio
*
*  |----|
*   |### |
*    |----|
*
* Version 0.1
* 2015-01-28
* steffen.wolf1(at)volkswagen.de
* description Band Priorität
* usage...<span sw-prio>{{row.field|filter_svgbar}}</td|span>
* class wf-active "Fortschrittsbalken"
* class sline-b schwache Line Balken-Rahmen
* --------------------------------------------------------------------------------------
*/
.directive('swPrio',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template:
     '<svg>'
  //  +'<path class="off" d="M 0,0 20,0 40,20 40,40 Z"></path>'
    +'<path class="on" d="m 245,0 h25 l40,40 v25 z"></path>'
    +'<text style="fill:red;" x="265" y="15" transform="rotate(45,265,15)">Prio</text>'
    +'</svg>'
  }

})

.directive('swSparkline',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template:'<div class="sparkline"><h4>das ist die directive</h4></div>'
  }

})
.directive('swDirsparkline',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="30">'
    +'<rect width="3" height="10" x="0" y="10" class="wf-undef"></rect>'
    +'<rect width="3" height="8" x="5" y="12" class="wf-active"></rect>'
    +'<rect width="3" height="6" x="10" y="14" class="wf-undef"></rect>'
    +'<rect width="3" height="10" x="15" y="10" class="wf-done"></rect>'
    +'<rect width="3" height="6" x="20" y="14" class="wf-active"></rect>'
    +'<rect width="3" height="10" x="25" y="10" class="wf-done"></rect>'
    +'<rect width="3" height="4" x="30" y="16" class="wf-undef"></rect>'
    +'<rect width="3" height="8" x="35" y="12" class="wf-active"></rect>'
    +'</svg>'
  }

})

.directive('swDirmiddlespark',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50" height="30">'

    +'<line y2="11" x2="50" x1="0" y1="11" class="k3"></line>'

    +'<rect width="3" height="0" x="0" y="10" class="wf-undef"></rect>'
    +'<rect width="3" height="3" x="5" y="11" class="wf-active"></rect>'
    +'<rect width="3" height="2" x="10" y="8" class="wf-done"></rect>'
    +'<rect width="3" height="2" x="15" y="11" class="wf-active"></rect>'
    +'<rect width="3" height="0" x="20" y="10" class="wf-undef"></rect>'
    +'<rect width="3" height="4" x="25" y="11" class="wf-active"></rect>'
    +'<rect width="3" height="0" x="30" y="10" class="wf-undef"></rect>'
    +'<rect width="3" height="3" x="35" y="7" class="wf-done"></rect>'
    +'<rect width="3" height="2" x="40" y="11" class="wf-active"></rect>'
    +'<rect width="3" height="3" x="45" y="7" class="wf-done"></rect>'
    +'</svg>'

  }

})


.directive('swDirprocessline',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="15">'

    +'<line y2="11" x2="50" x1="0" y1="11" class="k3"></line>'

    +'<circle r="2" cx="5" cy="11" class="wf-done"></circle>'
    +'<circle r="2" cx="10" cy="11" class="wf-done"></circle>'
    +'<circle r="2" cx="15" cy="11" class="wf-done"></circle>'
    +'<circle r="2" cx="20" cy="11" class="wf-done"></circle>'
    +'<circle r="2" cx="25" cy="11" class="wf-done"></circle>'
    +'<circle r="3" cx="30" cy="11" class="wf-active"></circle>'
    +'<circle r="2" cx="35" cy="11" class="wf-undef"></circle>'

    +'</svg>'

  }

})

.directive('swDirkreissegment', function(){

  return {

    restrict:'A',replace:true,
    template:
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70" height="70">'
    + '<circle cx="30" cy="15" r="10" class="sline-b"></circle>'
    + '<circle cx="30" cy="15" r="14" class="sline-b"></circle>'
    + '<path x="30" y="15" class="wf-undef" d="M  30   2  A 13   13   0   0   1   36.5   3.7416697508022985  L  35   6.3397459621556145  A 10   10   0   0   0   30   5  Z"></path>'
    + '<path x="30" y="15" class="wf-active" d="M  36.5   3.7416697508022985  A 13   13   0   0   1   41.258330249197705   8.5  L  38.66025403784439   10  A 10   10   0   0   0   35   6.3397459621556145  Z"></path>'
    + '<path x="30" y="15" class="wf-done" d="M  41.258330249197705   8.5  A 13   13   0   0   1   43   15  L  40   15  A 10   10   0   0   0   38.66025403784439   10  Z"></path>'
    + '</svg>'
  };
})



.directive('swDirabweichungp',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="15">'

    +'<line y2="15" x2="20" x1="20" y1="0" class="k3"></line>'

    +'<line y2="7" x2="35" x1="20" y1="7" class="k3"></line>'
    +'<circle r="3" cx="35" cy="7" class="wf-active"></circle>'

    +'</svg>'

  }

})

.directive('swDirabweichungn',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="15">'

    +'<line y2="15" x2="20" x1="20" y1="0" class="k3"></line>'

    +'<line y2="7" x2="10" x1="20" y1="7" class="k3"></line>'
    +'<circle r="3" cx="10" cy="7" class="wf-done"></circle>'

    +'</svg>'

  }

})


.directive('swDirbar',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="14">'
    +'<rect width="26" height="12" x="1" y="1" class="sline-b"></rect>'
    +'<rect width="14" height="8" x="3" y="3" class="wf-active"></rect>'
    +'</svg>'
  }

})

.directive('swDirpolyline',function(){//erstes Directive
  return {
    restrict:'A',replace:true,
    template: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="20">'
    +'<polyline class="sline-b" points="0,10 5,12 10,13 15,7 20,9 25,10 30,8 35,14"></polyline>'
    +'</svg>'
  }

})
.directive('swLearndirective',function(){//erstes Directive DOM Tree Manipulation
  return function($scope, elem, attrs){ //linking function
      elem.html = '<strong>das ist der neu inhalt</strong>';
  };

})

.directive('swBarcode',function(){//so könnte der BarCode erzeugt werden
  var
  _fbc =function ( valuetobarcode ) {
    var _valuecode = valuetobarcode || '11223344',
    _char_to_code	= '0123456789ABCDEFGH*-',
    _code39 = [
    'bwbWBwBwb',	//0
    'BwbWbwbwB',	//1
    'bwBWbwbwB',	//2
    'BwBWbwbwb',	//3
    'bwbWBwbwB',	//4
    'BwbWBwbwb',	//5
    'bwBWBwbwb',	//6
    'bwbWbwBwB',	//7
    'BwbWbwBwb',	//8
    'bwBWbwBwb',	//9
    'BwbwbWbwB',	//A
    'bwBwbWbwB',	//B
    'BwBwbWbwb',	//C
    'bwbwBWbwB',	//D
    'BwbwBWbwb',	//E
    'bwBwBWbwb',	//F
    'bwbwbWBwB',	//G
    'BwbwbWBwb',	//H
    'bWbwBwBwb',	//*
    'bWbwbwBwB'		//-
    ];console.log('DirectiveCODE   ' + _valuecode);
    return _valuecode.split('').map( function ( e ) { return _code39[ _char_to_code.indexOf(e) ] + 't'; } ).join('');},

    _wic = function( element ) { //wrapInClass <element0 class='element1+input'></element0>
    return function ( input ) {
        //console.log(element.split('.')[0] +' --- ' +element.split('.')[1] + '---' +input + '---');
        var _erg =
        '<' +
        element.split('.')[0]
        + ' class="' + ((typeof element.split('.')[1] === 'undefined') ? 'null':element.split('.')[1])
        + input
        +'"></'
        + element.split('.')[0] + '>';
  //      console.log(_erg);
      return _erg;
    };
  };
  return {
    restrict : 'AE',
//    scope : { bccvalue : '@' },
    require: '^ihm',
    replace : true,
//    template:'<span>' + '<span class="bcode-b"></span><span class="bcode-w"><span class="bcode-B"></span><span class="bcode-w"></span><span class="bcode-b"></span>' + '</span>'
//    template:'<span>( {{bccvalue}} )' + _fbc( "{{bccvalue}}" ).split('').map( _wic( 'span.bcode-' ) ).join('') + '</span>'
//    template:'<span>{{bccvalue}}</span>'
    template:'<span><strong> {{ihm.machine}}  _fbc({{ihm.id}}) </strong>' + _fbc( '*{{ihm.machine}}*' ).split('').map( _wic( 'span.bcode-' ) ).join('') + '</span>'
//    template:'<span>' + _fbc( '*' + '123456' + '*' ) + '</span>'
//    template:'<div>BCstart' + 'tbwbWBwbwBtBwbWBwbwbtb'.split('').map( _wic('span.bcode-') ).join('') + 'BCOdeEND</div>'
  }

})

//<span ng-bind-html="ihm.machine|filter_bc"></span>
.filter('filter_barcode', function() {
  return function(input) {
      var
      _vbc =function ( valuetobarcode ) {
            var _valuecode = valuetobarcode || '11223344',
            _char_to_code	= '0123456789ABCDEFGH*-',
            _code39 = [
            'bwbWBwBwb',	//0
            'BwbWbwbwB',	//1
            'bwBWbwbwB',	//2
            'BwBWbwbwb',	//3
            'bwbWBwbwB',	//4
            'BwbWBwbwb',	//5
            'bwBWBwbwb',	//6
            'bwbWbwBwB',	//7
            'BwbWbwBwb',	//8
            'bwBWbwBwb',	//9
            'BwbwbWbwB',	//A
            'bwBwbWbwB',	//B
            'BwBwbWbwb',	//C
            'bwbwBWbwB',	//D
            'BwbwBWbwb',	//E
            'bwBwBWbwb',	//F
            'bwbwbWBwB',	//G
            'BwbwbWBwb',	//H
            'bWbwBwBwb',	//*
            'bWbwbwBwB'		//-
            ];console.log('FilterCODE   ' + _valuecode);
            return _valuecode.split('').map( function ( e ) { return _code39[ _char_to_code.indexOf(e) ] + 't'; } ).join('');
        },
        // ------------------------------------------------------------------------------------------------------------VBC VALUE 2 BARCODE
      _wic = function( element ) { //wrapInClass <element0 class='element1+input'></element0>
          return function ( input ) {
            //console.log(element.split('.')[0] +' --- ' +element.split('.')[1] + '---' +input + '---');
            var _erg =
            '<' +
            element.split('.')[0]
            + ' class="' + ((typeof element.split('.')[1] === 'undefined') ? 'null':element.split('.')[1])
            + input
            +'"></'
            + element.split('.')[0] + '>';
            //      console.log(_erg);
            return _erg;
          };
      };
      // --------------------------------------------------------------------------------------------------------------WIC WRAP IN CLASS

      return  _vbc( '*' + input + '*' ).split('').map( _wic( 'span.bcode-' ) ).join('');
  }
})  //Filter function

.factory('FactoryBarCode', function(){
            var
            _vbc =function ( valuetobarcode ) {
              var _valuecode = valuetobarcode || '11223344',
              _char_to_code	= '0123456789ABCDEFGH*-',
              _code39 = [
              'bwbWBwBwb',	//0
              'BwbWbwbwB',	//1
              'bwBWbwbwB',	//2
              'BwBWbwbwb',	//3
              'bwbWBwbwB',	//4
              'BwbWBwbwb',	//5
              'bwBWBwbwb',	//6
              'bwbWbwBwB',	//7
              'BwbWbwBwb',	//8
              'bwBWbwBwb',	//9
              'BwbwbWbwB',	//A
              'bwBwbWbwB',	//B
              'BwBwbWbwb',	//C
              'bwbwBWbwB',	//D
              'BwbwBWbwb',	//E
              'bwBwBWbwb',	//F
              'bwbwbWBwB',	//G
              'BwbwbWBwb',	//H
              'bWbwBwBwb',	//*
              'bWbwbwBwB'		//-
              ];console.log('FactoryCodeCODE   ' + _valuecode);
              return _valuecode.split('').map( function ( e ) { return _code39[ _char_to_code.indexOf(e) ] + 't'; } ).join('');
            },
            // ------------------------------------------------------------------------------------------------------------VBC VALUE 2 BARCODE
            _wic = function( element ) { //wrapInClass <element0 class='element1+input'></element0>
            return function ( input ) {
              //console.log(element.split('.')[0] +' --- ' +element.split('.')[1] + '---' +input + '---');
              var _erg =
              '<' +
              element.split('.')[0]
              + ' class="' + ((typeof element.split('.')[1] === 'undefined') ? 'null':element.split('.')[1])
              + input
              +'"></'
              + element.split('.')[0] + '>';
              //      console.log(_erg);
              return _erg;
            };
          };
          // --------------------------------------------------------------------------------------------------------------WIC WRAP IN CLASS

    return {

        getBarcode : function(input){
          return  _vbc( '*' + input + '*' ).split('').map( _wic( 'span.bcode-' ) ).join('');
      }

    };
})

;
