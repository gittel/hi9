'use strict';
require('http')
.createServer(function(req,res){

  console.log(++i + '. Request from  ' + Date.now() + '\t' +req.url);
  if ( /cdb\/ihm/.test(req.url) ) {
    console.log('cdb ihm fire\t' + req.url);

    require('http')
    .request({
      host :'localhost',
      port:5984,
      method:'GET',
      path:"/iy9/-Meldung"
    },
    function(response){
      var str = '';
      //response.on('end', function () { console.log(str); });
      //response.on('data', function (chunk) { str += chunk;} );
      //response.on('error', function () { console.log('error'); });
      response.pipe(res);
    }
  ).end();

} else if ( /cdb\/cfg/.test(req.url) ) {
  console.log('cdb cfg fire\t' + req.url);

  require('http')
  .request({
    host :'localhost',
    port:5984,
    method:'GET',
    path:"/b/-Liste"
  },
  function(response){
    var str = '';
    //response.on('end', function () { console.log(str); });
    //response.on('data', function (chunk) { str += chunk;} );
    //response.on('error', function () { console.log('error'); });
    response.pipe(res);
  }
).end();

//	} else require('fs').createReadStream('public' + ( /^$/.test(req.url) )? '/index.html' : req.url ).pipe(res);})
} else require('fs').createReadStream('public' + req.url ).pipe(res);})

  .listen(3000,function(){console.log('listen for connection...');});
