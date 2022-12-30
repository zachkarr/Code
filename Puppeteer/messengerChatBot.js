
const { Configuration, OpenAIApi } = require( "openai" );

const puppeteer = require( 'puppeteer' );

require( 'dotenv' ).config();

const configuration = new Configuration( {

    apiKey: process.env.OPENAI_API_KEY,

} );

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

        return Array.from( document.querySelectorAll( "div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.xzsf02u" ) ).map( ( el ) => el.innerText );

    } );


    let oldMessage = result[ result.length - 1 ];

    let img = '';
    img = await page.evaluate( () =>
    {
        return Array.from( document.querySelectorAll( 'img.x1lliihq.x193iq5w.x5yr21d.xh8yej3' ) ).map( ( el ) => el.src );
    } );

    let oldimg = img[ img.length - 1 ];

    console.log( oldimg );


    setInterval( async function ()
    {

        let date = new Date;

        let img2 = await page.evaluate( () =>
        {
            return Array.from( document.querySelectorAll( 'img.x1lliihq.x193iq5w.x5yr21d.xh8yej3' ) ).map( ( el ) => el.src );
        } );
        let newimg = img2[ img2.legnth - 1 ];
        console.log( newimg );

        if ( oldimg != newimg )
        {
            const imgselector = '.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate';
            page.type( imgselector, "Haha, that is a great picture!" ).then( () =>
            {

                page.keyboard.press( 'Enter' );

            } );

            oldimg = newimg;
        } else if ( newimg == oldimg )
        {
            console.log( "Image hasnt changed" );
        }

        let result2 = await page.evaluate( () =>
        {

            return Array.from( document.querySelectorAll( "div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.xzsf02u" ) ).map( ( el ) => el.innerText );

        } );

        let newMessage = result2[ result2.length - 1 ];

        console.log( 'oldMessage', oldMessage + '\n' );
        console.log( 'newMessage', newMessage + '\n' );

        if ( oldMessage != newMessage )
        {

            const selector = '.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate';


            let formattedMessage = '';

            if ( newMessage.length > 1000 )
            {
                let strLengthDivided = newMessage.length / 10;

                let message = newMessage.slice( 0, strLengthDivided );
                formattedMessage = message.split( /\r?\n\n/ );
                console.log( formattedMessage );
                console.log( formattedMessage.length );
            } else
            {
                formattedMessage = newMessage.split( /\r?\n\n/ );
            }

            console.log( "formattedMessage", formattedMessage );

            const openai = new OpenAIApi( configuration );

            async function getText ()
            {
                try
                {
                    let whosMessage = await page.evaluate( () =>
                    {
                        let who = document.querySelectorAll( '.x1rg5ohu.x5yr21d.xl1xv1r.xh8yej3' );
                        return who[ who.length - 1 ].alt.split( " " );
                    } );

                    console.log( 'whosMessage', whosMessage[ 0 ] );

                    if ( whosMessage[ 0 ] == "Person" )
                    {
                        console.log( "Ignore this person's messages" );
                    } else
                    {

                        let checkIfAIisTyping = await page.evaluate( () =>
                        {
                            let textInput = document.querySelectorAll( '.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.x1iyjqo2.x1gh3ibb.xisnujt.xeuugli.x1odjw0f.notranslate' );
                            return textInput[ 0 ].innerText;
                        } );
                        if ( checkIfAIisTyping != '\n' )
                        {
                            console.log( 'AI is currently typing' );
                            newMessage = oldMessage;
                        } else
                        {
                            console.log( 'AI is not currently typing' );


                            const completion = await openai.createCompletion( {
                                model: "text-curie-001",
                                prompt: formattedMessage + " ",
                                max_tokens: 1250,
                                temperature: 0.6,
                                presence_penalty: 0.5,

                            } );
                            let AIresponse = "Hey, " + whosMessage[ 0 ] + "! " + completion.data.choices[ 0 ].text.trim();
                            console.log( "AI Response Was: " + AIresponse + '\n' );

                            if ( completion.data.choices[ 0 ].text == "" )
                            {

                                page.type( selector, "It appears that the text you have provided is garbled and does not form coherent sentences. It is difficult for me to understand the intended meaning or topic of the text. Could you please provide a clear and concise question or statement for me to better assist you?" ).then( () =>
                                {

                                    page.keyboard.press( 'Enter' );

                                } );
                            }

                            await page.type( selector, AIresponse ).then( () =>
                            {

                                page.keyboard.press( 'Enter' );


                            } );
                        }
                    }

                } catch ( error )
                {


                    if ( error.response )
                    {

                        console.log( error.response.status );

                        console.log( error.response.data );

                    } else
                    {

                        console.log( error.message );

                    }
                }

                console.log( date );

                console.log( 'A New Message Has Been Sent... Generating AI Response...' + '\n' );

                oldMessage = newMessage;
            }
            getText();

        } else if ( newMessage == oldMessage )
        {

            console.log( date );

            console.log( 'The Message Has Not Changed... Waiting for New Message...' + '\n' );

        }

    }, 5000 );

} )();


