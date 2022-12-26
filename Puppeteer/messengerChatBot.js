const { exec } = require( 'child_process' );
const puppeteer = require( 'puppeteer' );
require( 'dotenv' ).config();

( async () =>
{
    const browser = await puppeteer.launch( { headless: false } );
    const page = await browser.newPage();

    await page.goto( process.env.URL );
    await page.type( '#email', process.env.USER_ID );
    await page.type( '#pass', process.env.USER_KEY );

    let nav = page.waitForNavigation();

    page.click( "#loginbutton" );

    await nav;

    let result = '';

    result = await page.evaluate( () =>
    {
        return Array.from( document.querySelectorAll( "div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.x14ctfv" ) ).map( ( el ) => el.innerText );
    } );

    let oldMessage = result[ result.length - 1 ];

    setInterval( async function ()
    {

        let result2 = await page.evaluate( () =>
        {
            return Array.from( document.querySelectorAll( "div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.x14ctfv" ) ).map( ( el ) => el.innerText );
        } );

        let newMessage = result2[ result2.length - 1 ];

        console.log( 'oldMessage', oldMessage );
        console.log( 'newMessage', newMessage );
        console.log( newMessage.length );

        if ( oldMessage != newMessage )
        {

            exec( process.env.CURL_CMD + process.env.CURL_CMD2 + newMessage + process.env.CURL_CMD3, ( err, stdout, stderr ) =>
            {
                try
                {
                    console.log( "err", err );
                    console.log( "stdout", stdout );

                    let json = JSON.parse( stdout );

                    const selector = '.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate';

                    page.type( selector, json.choices[ 0 ].text ).then( () =>
                    {
                        page.keyboard.press( 'Enter' );

                    } );

                } catch ( e )
                {
                    console.log( e );
                }

            } );

            console.log( 'New Message...Fetching AI Response.' );

            oldMessage = newMessage;

        } else if ( newMessage == oldMessage )
        {
            console.log( 'The Message Has Not Changed... Waiting.' );
        }

    }, 10000 );

} )();


