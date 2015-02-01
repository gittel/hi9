angular.module('swSVGenerate',[])

//  2015-01-22 so funktioniert ein variabler Wert

/**
* -------------------------------------------------------------------------------------
* SVG Bar Balken in Hohlbalken
*
*  --------------------
*  |#######            |
*  --------------------
*
* Version 0.1
* 2015-01-28
* steffen.wolf1(at)volkswagen.de
* description SOLL-IST Abweichung von Kennzahlen (BUD/ACT) (SOLL/IST)
* usage...<td|span>{{row.field|filter_svgbar}}</td|span>
* class wf-active "Fortschrittsbalken"
* class sline-b schwache Line Balken-Rahmen
* --------------------------------------------------------------------------------------
*/
.filter('filter_svgbar', function($sce){

  return function(input){
    var _svg ='',_input=input||35;

    _svg += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="14">';
    _svg +='<rect width="38" height="10" x="1" y="1" class="sline-b"></rect>';
    _svg += '<rect x="3" y="3" width="' + ( _input % 36 ) + '" height="6" class="wf-active"></rect>';
    _svg += '</svg>';

    //console.log(_svg);
    return $sce.trustAsHtml(_svg);
    //return _svg;

  };
})

/**
* -------------------------------------------------------------------------------------
* SVG Abweichung
*
*  o-|
*    |---o
*
* Version 0.1
* 2015-01-28
* steffen.wolf1(at)volkswagen.de
* description relative positive/negative prozentuale Abweichung von Kennzahlen visualisieren
* usage...<td|span>{{row.field|filter_svgabweichung}}</td|span>
* class wf-done wf-active für neagtive/Positive Abweichung
* class k3 für schwache Line vertikal und horizontal
* --------------------------------------------------------------------------------------
*/
.filter('filter_svgabweichung', function($sce){

  return function(input){
    var _svg ='',_input=(Math.random()*20 -10) ||15;

    _svg +='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60" height="15">';
    _svg +='<line y2="15" x2="20" x1="20" y1="0" class="k3"></line>'; //horizontale Linie


    _svg +='<line y2="7" x2="'+  (20 + (_input % 20) )+ '" x1="20" y1="7" class="k3"></line>';
    _svg +='<circle r="3" cx="'+ (20 + (_input % 20) )+ '" cy="7" class="' + ( ( _input < 0 )?'wf-done':'wf-active') + '"></circle>';//Abweichung

    _svg +='</svg>';

    return $sce.trustAsHtml(_svg);

  };
})


.filter('filter_svgkreissegment', function($sce){

  return function(input){

    var
      _kcs = function( x, y, radius, width, start, input, mclass){

          var
          _p2C = function (x, y, r, a) {
            return {
              'x' :  x + ( r * Math.cos(( a - 90 ) * Math.PI / 180.0)),
              'y' :  y + ( r * Math.sin(( a - 90 ) * Math.PI / 180.0))
              };
            },

          _startl	= _p2C(x, y, radius + width, start),
          _endl	= _p2C(x, y, radius + width , input),
          _starts	= _p2C(x, y, radius , input),
          _ends	= _p2C(x, y, radius , start),
          _arcSweep = input - start <= 180 ? "0" : "1",
          _k = [

          'M', _startl.x, ' ', _startl.y,
          'A', ( radius + width ) , ' ', ( radius + width) , ' ', 0, ' ', 0, ' ', 1, ' ', _endl.x, ' ', _endl.y,
          'L ', _starts.x, ' ', _starts.y,
          'A', radius, ' ', radius, ' ', 0, ' ', 0, ' ', 0, ' ', _ends.x, ' ', _ends.y,
          'Z'
          ].join(" ");
          //console.log(_k);
          return _k;
      },

    _svg ='',_x=17,_y=15,_b=4,_mclass='wf-done';

    _svg += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40">';
    _svg += '<circle cx="'+ _x +'" cy="' + _y + '" r="'+ _y/2 +'" class="sline-b"></circle>';
    _svg += '<circle cx="'+ _x +'" cy="' + _y + '" r="'+ ( _y/2 + _b)  +'" class="sline-b"></circle>';
    _svg += '<path x="'+_x+'" y="'+_y+'" class="wf-done" d="' + _kcs(_x,_y,_y/2,_b,0,(input % 80) ,_mclass) + '"></path>';
    _svg += '</svg>';

    //console.log(_svg);
    return $sce.trustAsHtml(_svg);
    //return _svg;
  };
})

/**
* -------------------------------------------------------------------------------------
* SVG Process-Line
*
*  o-|
*    |---o
*
* Version 0.1
* 2015-01-28
* steffen.wolf1(at)volkswagen.de
* description prozess-Fortschritt des 7 stufuígen Instandhaltungsprozesses
* usage...<td|span>{{row.field|filter_svgabweichung}}</td|span>
* class wf-done wf-active für neagtive/Positive Abweichung
* class k3 für schwache Line vertikal und horizontal
* --------------------------------------------------------------------------------------
*/.filter('filter_svgprocessline', function($sce){

  return function(input){
    var _svg ='',_input=input||15;

    _svg +='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="42" height="18">';

    _svg +='<line y2="9" x2="50" x1="0" y1="9" class="k3"></line>';

    _svg +='<circle r="2" cx="5" cy="9" class="wf-undef"></circle>';
    _svg +='<circle r="2" cx="10" cy="9" class="wf-undef"></circle>';
    _svg +='<circle r="2" cx="15" cy="9" class="wf-undef"></circle>';
    _svg +='<circle r="2" cx="20" cy="9" class="wf-undef"></circle>';
    _svg +='<circle r="2" cx="25" cy="9" class="wf-undef"></circle>';
    _svg +='<circle r="2" cx="30" cy="9" class="wf-undef"></circle>';
    _svg +='<circle r="2" cx="35" cy="9" class="wf-undef"></circle>';

    for (var i=0, max = ( _input % 8 ); i < max; i++)
    _svg +='<circle r="2" cx="' + i*5 + '" cy="9" class="wf-active"></circle>';

    _svg +='<circle r="5" cx="'+ ( (_input % 8)*5 ) + '" cy="9" class="wf-warnung"></circle>';

    _svg +='</svg>';

    return $sce.trustAsHtml(_svg);

  };
})


.filter('filter_bc', function($sce){

  return function(input){
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
      ];//console.log( input +' FilterCODE   ' + _valuecode);
      return _valuecode.split('').map( function ( e ) { return _code39[ _char_to_code.indexOf(e) ] + 't'; } ).join('');
    },
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

  //console.log( _vbc( '*' + input + '*' ).split('').map( _wic( 'span.bcode-' ) ).join('') );
  //_vbc('*' + input +'*');

return $sce.trustAsHtml(  _vbc( '*' + input + '*' ).split('').map( _wic( 'span.bcode-' ) ).join('') );
//    return $sce.trustAsHtml('<strong>'+input+'</strong>');
  };
})
;
