const PDFExtract = require( 'pdf.js-extract' ).PDFExtract;
const pdfExtract = new PDFExtract();
const options = {};
let pdfJSONData
let sortedData = []

pdfExtract.extract( 'file.pdf', options, ( err, data ) =>
{
    function getJSONData ()
    {
        if ( err ) return console.log( err );
        pdfJSONData = data.pages
        return pdfJSONData
    }

    class returnData
    {
        constructor ( data )
        {
            this.data = data
        }
        sortData ()
        {

            for ( var i = 0; i < pdfJSONData[ 0 ].content.length; i++ )
            {
                this.data = pdfJSONData[ 0 ].content[ i ].str
                sortedData.push( this.data )
            }
            return sortedData

        }
    }
    let returnedData = new returnData( getJSONData() ).sortData()
    for ( var i = 0; i < returnedData.length; i++ )
    {
        console.log( returnedData[ i ] )
    }

} );


