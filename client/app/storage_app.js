angular.module('sappmApp', [
  'swFilterDirective','swSVGenerate',
  'ngAnimate',
  'ngRoute',
  'ngTable',
  'ngSanitize',
  'mgcrea.ngStrap.modal',
  'mgcrea.ngStrap.aside',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.popover',
  'mgcrea.ngStrap.datepicker'

  ])

  .config(function($asideProvider) {
    angular.extend($asideProvider.defaults, {
      animation: 'am-fadeAndSlideLeft',
      placement: 'left'
    });
  })

.config(function ($routeProvider) {
  $routeProvider
  .when("/",            {  templateUrl: "appfragments/map_main.html",         name:'main'  })
  .when("/ih-user",     {  templateUrl: "appfragments/liste_user.html",       name:'ihuser' })
  .when("/ih-muser",    {  templateUrl: "appfragments/map_user.html",         name:'ihuser' })
  .when("/ih-material", {  templateUrl: "appfragments/liste_material.html",   name:'ihmaterial' })
  .when("/ih-stueck",   {  templateUrl: "appfragments/liste_stueckzahl.html", name:'ihstueck' })
  .when("/ih-kpi",      {  templateUrl: "appfragments/liste_kpi.html",        name:'ihkpi' })
  .when("/ih-tp",       {  templateUrl: "appfragments/liste_technische_plaetze.html",name:'tp' })
  .when("/ih-ihm",      {  templateUrl: "appfragments/liste_ihm.html",        name:'ihm' })
  .when("/ih-mihm",     {  templateUrl: "appfragments/map_ihm.html",          name:'ihm' })
 .otherwise(            {  redirectTo: "/" })
})

.controller('ArticlesCtrl', function($scope,Cart){

  $scope.articles = [
      { id: 1, name: "Pizza Vegetaria",     price: 10 },
      { id: 2, name: "Pizza Salami",        price: 15 },
      { id: 3, name: "Pizza Thunfisch",     price: 5 },
      { id: 4, name: "Pizza Quadro",        price: 1 },
      { id: 5, name: "Pizza Margharita",    price: 20 },
      { id: 6, name: "Pizza Calzone",       price: 25 }
      ];
      $scope.cart = Cart;

})


.factory('Cart', function() {
  var items = [];
  return {

    getItems: function()          { return items;       },
    setItems: function(articles)  { items=articles;     },
    clearAll: function()          { items=[];           },
    addArticle: function(article) { items.push(article);},

    removeArticle: function(article) {
      items = Array.prototype.filter.call( items, function(el){ return el.id!=article.id;});//eine Delete ist ein Filter !!!!!
      //items.slice(items.indexOf(article),1);
    },
    existArticle: function(article) {
      return Array.prototype.filter.call( items, function(el){ return el.id==article.id;}).length;
      //ist das Element enthalten
    },

    sum: function() {
      return items.reduce( function(total, article) {  return total + article.price; }, 0);
    },

    mid: function() {
      return items.reduce( function(total, article,i,x) {  return (i==(x.length-1))?(total + article.price)/(x.length||1):(total + article.price); }, 0);
    }

};
})

//ajcart.json wird nicht gefunden
.controller('USERCtrl', function($scope,$http){

  $scope.myhtml ='<strong>das ist mein </strong>';

  $scope.modal ={
    title: 'Hallo Modal',
    content: 'Best check yo self, you\'re not looking too good.',
    placement: 'top',
    type: 'info',
    show: true};

  $scope.aside = {
    title: "Title",
    content: "Hello Aside<br />This is a multiline message!"
  };
  $scope.tooltip = {
    title: "Hello Tooltip<br />This is a multiline message!",
    checked: false
  };
  $scope.popover = {
    title: "Title",
    content: "Hello Popover<br />This is a multiline message!"
  };

  $http.get('data-stub/user_role.json').
  success(function(data, status, headers, config) {
    $scope.users = data;
    console.log('SUCCESS READ user_role.json') ;
  }).
  error(function(data, status, headers, config) {
    console.log('error READ user_role.json') ;
    // log error
  });

})


.controller('USERCtrltfC', function($scope,$http,$filter,ngTableParams){
  var data =[
{
  "id": "1",
  "user": "DZSB12T",
  "name": "Steffen Wolf",
  "rule": "admin",
  "pass": "LzfFTR5",
  "team": "t1"
},{
  "id": "2",
  "user": "DZSB32T",
  "name": "Timo Veithf",
  "rule": "ih",
  "pass": "LzfFTR5",
  "team": "i1"
},{
  "id": "2",
  "user": "DZSB32T",
  "name": "Timo Veithf",
  "rule": "ih",
  "pass": "LzfFTR5",
  "team": "i1"
}
];

//http://vwagwoya1074.wob.vw.vwg:3001/api/cdtp
$http.get('api/cdbur')

//  $http.get('data-stub/technischer_platz.json')
.success(function(rdata, status, headers, config) {
  //data = rdata;
  data = rdata.storage;
  console.log('SUCCESS READ CDB user rules',rdata._rev,rdata.storage.length) ;
})
.error(function(rdata, status, headers, config) {
  console.log('ERROR READ CDB user rules',status,header) ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {rule:'admin'},
  sorting: {name:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})
.controller('USERCtrltfM', function($scope,$http){


//http://vwagwoya1074.wob.vw.vwg:3001/api/cdtp
$http.get('api/cdbur')

//  $http.get('data-stub/technischer_platz.json')
.success(function(rdata, status, headers, config) {
  //data = rdata;
  $scope.users = rdata.storage;
  console.log('SUCCESS READ CDB user rules',rdata._rev,rdata.storage.length) ;
})
.error(function(rdata, status, headers, config) {
  console.log('ERROR READ CDB user rules',status,header) ;
  // log error
});
})

.controller('IHMCtrltfM', function($scope,$http){


  //http://vwagwoya1074.wob.vw.vwg:3001/api/cdtp
  $http.get('api/cdbihm')

  //  $http.get('data-stub/technischer_platz.json')
  .success(function(rdata, status, headers, config) {
    //data = rdata;
    $scope.ihms = rdata.storage;
    console.log('SUCCESS READ CDB ihm',rdata._rev,rdata.storage.length) ;
  })
  .error(function(rdata, status, headers, config) {
    console.log('ERROR READ CDB ihm',status,header) ;
    // log error
  });
})



/*
.controller('TPCtrl', function($scope,$http){

  $http.get('stub/technischer_platz.json').
  success(function(data, status, headers, config) {
    $scope.tps = data;
    console.log('SUCCESS READ technischer_platz.json') ;
  }).
  error(function(data, status, headers, config) {
    console.log('error READ technischer_platz.json') ;
    // log error
  });
})
*/
.controller('TPCtrltfJ', function($scope,$http,$filter,ngTableParams){
  var data =[
{
  TP: "2730",
  TPBEZ: "Motorenwerk Chemnitz",
  TPPARENT: "NULL",
  KST: "",
  HERST: "",
  X: "0",
  Y: "0",
  INVNR: ""
}
];

$http.get('data-stub/technischer_platz_1.json').
success(function(rdata, status, headers, config) {
  data = rdata;
  console.log('SUCCESS READ technischer_platz.json') ;
}).
error(function(rdata, status, headers, config) {
  console.log('error READ technischer_platz.json') ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {TP:'2730'},
  sorting: {TP:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})

.controller('TPCtrltf', function($scope,$http,$filter,ngTableParams){
var data =[
      {
        TP: "2730",
        TPBEZ: "Motorenwerk Chemnitz",
        TPPARENT: "NULL",
        KST: "",
        HERST: "",
        X: "0",
        Y: "0",
        INVNR: ""
      }
    ];

//http://vwagwoya1074.wob.vw.vwg:3001/api/cdtp
$http.get('api/cdbtp')

//  $http.get('data-stub/technischer_platz.json')
  .success(function(rdata, status, headers, config) {
    //data = rdata;
    data = rdata.storage;
    console.log('SUCCESS READ CDB technischer_platz',rdata._rev,rdata.storage.length) ;
  })
  .error(function(rdata, status, headers, config) {
    console.log('error READ CDB technischer_platz',status,header) ;
    // log error
  });

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {TP:'2730'},
  sorting: {TP:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})

.controller('KPICtrltf', function($scope,$http,$filter,ngTableParams){
  var data =[
{
  "periode": "201411",
  "mw_rz": 6.274661379310346,
  "mw_dz": 12.7122169348659,
  "mw_bz": 8.01551966475096,
  "mw_bz_s": 10.096360641025644,
  "mw_iz": 10.116813084291191,
  "mw_fz": 4.194306637931034,
  "mw_gz": 41.31351770114942,
  "mw_iz_e": 2.8202156944444443,
  "mw_iz_f": 14.340782371794871,
  "mw_iz_m": 9.003611444444445,
  "sm_gz": 1198.0920133333331,
  "sm_gz_e": 167.5286011111111,
  "sm_gz_f": 663.123958888889,
  "sm_gz_m": 367.43945333333334,
  "sm_gz_t1": 857.0884525000001,
  "sm_gz_t2": 238.93233222222221,
  "sm_gz_t3": 102.07122861111111,
  "sm_gz_ns": 692.2555994444444,
  "sm_gz_s": 505.8364138888889
}
];

//$http.get('data-stub/kpi.json')
$http.get('api/cdbkpi')

.success(function(rdata, status, headers, config) {
  data = rdata.storage;
  console.log('SUCCESS READ CDB kpi',rdata._rev,rdata.storage.length) ;
})
.error(function(rdata, status, headers, config) {
  console.log('error READ CDB kpi') ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {periode:'20'},
  sorting: {periode:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})

.controller('KPICtrltfJ', function($scope,$http,$filter,ngTableParams){
  var data =[
{
  "periode": "201411",
  "mw_rz": 6.274661379310346,
  "mw_dz": 12.7122169348659,
  "mw_bz": 8.01551966475096,
  "mw_bz_s": 10.096360641025644,
  "mw_iz": 10.116813084291191,
  "mw_fz": 4.194306637931034,
  "mw_gz": 41.31351770114942,
  "mw_iz_e": 2.8202156944444443,
  "mw_iz_f": 14.340782371794871,
  "mw_iz_m": 9.003611444444445,
  "sm_gz": 1198.0920133333331,
  "sm_gz_e": 167.5286011111111,
  "sm_gz_f": 663.123958888889,
  "sm_gz_m": 367.43945333333334,
  "sm_gz_t1": 857.0884525000001,
  "sm_gz_t2": 238.93233222222221,
  "sm_gz_t3": 102.07122861111111,
  "sm_gz_ns": 692.2555994444444,
  "sm_gz_s": 505.8364138888889
}
];

$http.get('data-stub/kpi.json').
success(function(rdata, status, headers, config) {
  data = rdata;
  console.log('SUCCESS READ kpi.json') ;
}).
error(function(rdata, status, headers, config) {
  console.log('error READ kpi.json') ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {periode:'20'},
  sorting: {periode:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})

.controller('SAPMMCtrltf', function($scope,$sce,$http,$filter,ngTableParams){
  var data =[
{
  IDENT: 2730,
  TEILE_NR: "",
  HSTT_NR: "2,100,0200",
  SPEZIFIKATION: "Zugfeder, 1,0 x 8,0 x 69,5FK Lo=80 180°",
  ZUSATZ_TEXT: "FEDERN SCHMIDT GUTEKUNST Z-094CI MOLI 1/A26",
  LIEFERANT: "",
  MENGE: 3,
  ME: "ST",
  LAGER_PLATZ: "100|101|S-2-63"
}
];

//$http.get('data-stub/lager.json')
$http.get('api/cdbsap')
.success(function(rdata, status, headers, config) {
  data = rdata.storage;
  console.log('SUCCESS READ CDB lager',rdata._rev,rdata.storage.length) ;
})
.error(function(rdata, status, headers, config) {
  console.log('ERROR READ CDB lager',status,headers,config) ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {ME:'ST'},
  sorting: {MENGE:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})


.controller('SAPMMCtrltfJ', function($scope,$http,$filter,ngTableParams){
  var data =[
{
  IDENT: 2730,
  TEILE_NR: "",
  HSTT_NR: "2,100,0200",
  SPEZIFIKATION: "Zugfeder, 1,0 x 8,0 x 69,5FK Lo=80 180°",
  ZUSATZ_TEXT: "FEDERN SCHMIDT GUTEKUNST Z-094CI MOLI 1/A26",
  LIEFERANT: "",
  MENGE: 3,
  ME: "ST",
  LAGER_PLATZ: "100|101|S-2-63"
}
];

$http.get('data-stub/lager35.json').
success(function(rdata, status, headers, config) {
  data = rdata;
  console.log('SUCCESS READ lager.json ',rdata.length) ;
}).
error(function(rdata, status, headers, config) {
  console.log('error READ lager.json ',status,headers) ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {ME:'ST'},
  sorting: {MENGE:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})


.controller('IHMCtrltf', function($scope,$http,$filter,ngTableParams){
  var data =[
      {
        "id": "246",
        "x": "275",
        "y": "144",
        "machine": "75744",
        "ftyp": "m",
        "datum": "2015-01-08T06:48:04.636Z",
        "time": "1420699684636",
        "s_time_ms": 1420699795503,
        "r_time_ms": 1420699818799,
        "d_time_ms": 1420718425830,
        "b_time_ms": "",
        "i_time_ms": "",
        "f_time_ms": "",
        "rtime": "2015-01-08T06:50:18.799Z",
        "btime": "",
        "dtime": "2015-01-08T12:00:25.830Z",
        "rptime": "",
        "fttime": "",
        "etime": "",
        "status": 2,
        "prio": "0",
        "garantie": "1",
        "ns": "0",
        "edit": "",
        "remove": "",
        "fehler": "Fehler-Analyse",
        "todos": "TODO-Liste (Was ist zu tun Beschaffen/Ersatzteilgeliefert/inAussicht/Wasnn kann Repartur beginnen ",
        "massnahme": "erfolgte Maßnahmen",
        "material": [
      {
        "mnr": "1",
        "manz": "0"
      }
      ],
      "hash": "0",
      "tp": "2730-10-2-60-1045-20",
      "tpbez": "AF60B Mauser",
      "kst": "33950",
      "herst": "Mauser",
      "team": "t1",
      "idname": "IH-Meldung:246"
      }
];


//http://vwagwoya1074.wob.vw.vwg:3001/api/cdbihm
$http.get('api/cdbihm')

//$http.get('data-stub/meldung.json')
.success(function(rdata, status, headers, config) {
	//data=rdata;
  data=rdata.storage;
  //revision=rdata._rev;
  console.log('SUCCESS READ CDB meldung',rdata._rev,rdata.storage.length) ;
})
.error(function(rdata, status, headers, config) {
  console.log('ERROR READ CDB meldung',rdata,status,headers,config) ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {kst:'33'},
  sorting: {tp:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})


.controller('IHMCtrltfJ', function($scope,$http,$filter,ngTableParams,FactoryBarCode){
  var data =[
{
  "id": "246",
  "x": "275",
  "y": "144",
  "machine": "75744",
  "ftyp": "m",
  "datum": "2015-01-08T06:48:04.636Z",
  "time": "1420699684636",
  "s_time_ms": 1420699795503,
  "r_time_ms": 1420699818799,
  "d_time_ms": 1420718425830,
  "b_time_ms": "",
  "i_time_ms": "",
  "f_time_ms": "",
  "rtime": "2015-01-08T06:50:18.799Z",
  "btime": "",
  "dtime": "2015-01-08T12:00:25.830Z",
  "rptime": "",
  "fttime": "",
  "etime": "",
  "status": 2,
  "prio": "0",
  "garantie": "1",
  "ns": "0",
  "edit": "",
  "remove": "",
  "fehler": "Fehler-Analyse",
  "todos": "TODO-Liste (Was ist zu tun Beschaffen/Ersatzteilgeliefert/inAussicht/Wasnn kann Repartur beginnen ",
  "massnahme": "erfolgte Maßnahmen",
  "material": [
{
  "mnr": "1",
  "manz": "0"
}
],
"hash": "0",
"tp": "2730-10-2-60-1045-20",
"tpbez": "AF60B Mauser",
"kst": "33950",
"herst": "Mauser",
"team": "t1",
"idname": "IH-Meldung:246"
}
];
$scope.FBC = FactoryBarCode;

$http.get('data-stub/meldung.json').
success(function(rdata, status, headers, config) {
  data = rdata;
  console.log('SUCCESS READ meldung.json') ;
}).
error(function(rdata, status, headers, config) {
  console.log('error READ meldung.json') ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {kst:'33'},
  sorting: {tp:'asc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})


.controller('STKZCtrltfJ', function($scope,$http,$filter,ngTableParams){
  var data =[{
    "DATUM":"18.11.2014",
    "CC":3,
    "KST":33830,
    "LINIE":"AGW_Dieselwelle",
    "STYP":"C",
    "STYPBEZ":"Nachtschich",
    "SOLL":null,
    "IST":689,
    "PROZ":"92,6"
  }
];

$http.get('data-stub/stueckzahl.json').
success(function(rdata, status, headers, config) {
  data = rdata;
  console.log('SUCCESS READ stueckzahl.json') ;
}).
error(function(rdata, status, headers, config) {
  console.log('error READ stueckzahl.json') ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {DATUM:'20'},
  sorting: {IST:'desc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});
})

.controller('STKZCtrltf', function($scope,$http,$filter,ngTableParams){
  var data =[{
    "DATUM":"18.11.2014",
    "CC":3,
    "KST":33830,
    "LINIE":"AGW_Dieselwelle",
    "STYP":"C",
    "STYPBEZ":"Nachtschich",
    "SOLL":null,
    "IST":689,
    "PROZ":"92,6"
  }
  ];

  $http.get('api/cdbstk')
//  $http.get('data-stub/stueckzahl.json')
  .success(function(rdata, status, headers, config) {
    data = rdata.storage;
    console.log('SUCCESS READ CDB stueckzahl',rdata._rev,rdata.storage.length) ;
  })
  .error(function(rdata, status, headers, config) {
    console.log('error READ CDB stueckzahl',status,headers,config) ;
    // log error
  });

  $scope.tableParams = new ngTableParams({
    page: 1,            // show first page
    count: 5,           // count per page
    filter : {DATUM:'20'},
    sorting: {IST:'desc'}
  }, {
    total: data.length, // length of data
    getData: function($defer, params) {
      var filteredData = params.filter() ?
      $filter('filter')(data, params.filter()) :
      data;
      var orderedData = params.sorting() ?
      $filter('orderBy')(filteredData, params.orderBy()) :
      data;

      params.total(orderedData.length); // set total for recalc pagination
      $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
    }
  });
})

/*
.controller('USERCtrltf', function($scope,$http,$filter,ngTableParams){
  var data =[{
    "DATUM":"18.11.2014",
    "CC":3,
    "KST":33830,
    "LINIE":"AGW_Dieselwelle",
    "STYP":"C",
    "STYPBEZ":"Nachtschich",
    "SOLL":null,
    "IST":689,
    "PROZ":"92,6"
  }
];

//$http.get('data-stub/user.json')
$http.get('api/cdbur')
.success(function(rdata, status, headers, config) {
  data = rdata.storage;
  console.log('SUCCESS READ user.json',rdata._rev) ;
}).
.error(function(rdata, status, headers, config) {
  console.log('error READ user.json') ;
  // log error
});

$scope.tableParams = new ngTableParams({
  page: 1,            // show first page
  count: 5,           // count per page
  filter : {ID:'2'},
  sorting: {NAME:'desc'}
}, {
  total: data.length, // length of data
  getData: function($defer, params) {
    var filteredData = params.filter() ?
    $filter('filter')(data, params.filter()) :
    data;
    var orderedData = params.sorting() ?
    $filter('orderBy')(filteredData, params.orderBy()) :
    data;

    params.total(orderedData.length); // set total for recalc pagination
    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
  }
});

})
*/
