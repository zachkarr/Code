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
                console.log( "err", err );
                console.log( "stdout", stdout );
                console.log( "stderr", stderr );
                let json = JSON.parse( stdout );

                const input = page.$x( '//*[@id="mount_0_0_LR"]/div[1]/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div[1]/div/div/div[1]/div[2]/div/div/div[2]/div/div/div[4]/div[2]/div/div/div[1]/p' );

                input[ 0 ].type( json.choices[ 0 ].text, { delay: 10 } );
                page.click( '.xsrhx6k', { delay: 2000 } );
            } );

            oldMessage = newMessage;
        } else if ( newMessage == oldMessage )
        {
            console.log( 'SAME' );
        }

    }, 10000 );

} )();
