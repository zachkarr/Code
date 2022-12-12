/**
 * @NApiVersion 2.x
 * @NScriptType restlet
 */
define( [ "N/query", "N/xml" ], function ( query, xml )
{
  return {
    get: function ( context )
    {
      // Load the workbook by name (record ID)
      var testScript = query.load( "custworkbook42" );

      // Run the query
      var resultQuery = testScript.run();

      // Convert the query to its SuiteQL representation
      var testScriptQL = testScript.toSuiteQL();

      // Examine the SuiteQL query string
      // var suiteQL = testScriptQL.query;

      // Run the SuiteQL query
      //  var resultSuiteQL = query.runSuiteQL(suiteQL);

      // Compose the RESTlet response
      var response = {
        query: testScript,
        resultQuery: resultQuery,
        //   suiteQL: suiteQL,
        //   resultSuiteQL: resultSuiteQL,
      };

      // Return the response
      return JSON.stringify( response.resultQuery );
    },
  };
} );
