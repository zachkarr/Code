const http = require( "http" );
const fs = require( "fs" );

const port = 8080;

fs.readFile( "/home/svk0/Documents/JavaScript/Project/html/index.html", function ( err, html )
{
  if ( err ) throw err;

  http
    .createServer( function ( request, response )
    {
      response.writeHeader( 200, { "Content-Type": "html" } );
      response.write( html );
    } )
    .listen( port );
} );
