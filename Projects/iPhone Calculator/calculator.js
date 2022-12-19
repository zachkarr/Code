class Main
{
    init ()
    {
        class Calculator
        {
            constructor ( x, y, z, input, oldvalue, negpos )
            {
                this.x = x;
                this.y = y;
                this.z = z;
                this.input = input;
                this.oldvalue = oldvalue;
                this.negpos = negpos;
            }
            get X ()
            {
                return this.x;
            }
            set X ( X )
            {
                this.x = X;
            }
            get Y ()
            {
                return this.y;
            }
            set Y ( Y )
            {
                this.y = Y;
            }
            get Z ()
            {
                return this.z;
            }
            set Z ( Z )
            {
                this.z = Z;
            }
            get INPUT ()
            {
                return this.input;
            }
            set INPUT ( INPUT )
            {
                this.input = INPUT;
            }
            get OLDVALUE ()
            {
                return this.oldvalue;
            }
            set OLDVALUE ( OLDVALUE )
            {
                this.oldvalue = OLDVALUE;
            }
            get NEGPOS ()
            {
                return this.negpos;
            }
            set NEGPOS ( NEGPOS )
            {
                this.negpos = NEGPOS;
            }
        }
        let calculator = new Calculator();

        class Inputs extends Calculator
        {
            constructor ( x, y, z, input, oldvalue, negpos )
            {
                super( x, y, z, input, oldvalue, negpos );
            }
            getNumbers ( x )
            {
                switch ( this )
                {
                    case document.getElementById( '0' ):
                        x = 0;
                        break;
                    case document.getElementById( '1' ):
                        x = 1;
                        break;
                    case document.getElementById( '2' ):
                        x = 2;
                        break;
                    case document.getElementById( '3' ):
                        x = 3;
                        break;
                    case document.getElementById( '4' ):
                        x = 4;
                        break;
                    case document.getElementById( '5' ):
                        x = 5;
                        break;
                    case document.getElementById( '6' ):
                        x = 6;
                        break;
                    case document.getElementById( '7' ):
                        x = 7;
                        break;
                    case document.getElementById( '8' ):
                        x = 8;
                        break;
                    case document.getElementById( '9' ):
                        x = 9;
                        break;
                }

                let res = document.getElementById( 'nums' );
                if ( calculator.Z != "" )
                {
                    calculator.Z = "";
                    res.value = x;
                } else if ( calculator.Z == "" )
                {
                    res.value += x;
                }

                calculator.X = res.value;
                let dec = document.getElementById( 'period' );
                if ( calculator.X % 1 != 0 )
                {
                    dec.disabled = true;
                }

                return calculator.X;
            }
            getInputs ( input )
            {
                const setY = () =>
                {
                    calculator.Y = calculator.X;
                    calculator.X = "";
                };
                const setZ = () =>
                {
                    if ( calculator.INPUT == "add" )
                    {
                        calculator.Z = `${ +calculator.Y + +calculator.X }`;
                    } else if ( calculator.INPUT == "subtract" )
                    {
                        calculator.Z = `${ +calculator.Y - +calculator.X }`;
                    } else if ( calculator.INPUT == "multiply" )
                    {
                        calculator.Z = `${ +calculator.Y * +calculator.X }`;
                    } else if ( calculator.INPUT == "divide" )
                    {
                        calculator.Z = `${ +calculator.Y / +calculator.X }`;
                    } else if ( calculator.INPUT == "remainder" )
                    {
                        calculator.Z = `${ +calculator.Y % +calculator.X }`;
                    }
                    calculator.X = ""; document.getElementById( 'nums' ).value = calculator.X;
                    calculator.Y = "";

                };

                const clearButtons = () =>
                {
                    let buttons = document.querySelectorAll( 'button' );
                    let buttonsArray = [ ...buttons ];
                    buttonsArray.forEach( button =>
                    {
                        button.style.backgroundColor = "";
                        button.style.color = "";
                    } );
                };
                const addValues = () =>
                {
                    document.getElementById( 'nums' ).value = calculator.X;
                    input = this.id;
                    calculator.OLDVALUE = this.id;
                    calculator.NEGPOS = false;
                    let dec = document.getElementById( 'period' );
                    dec.disabled = false;
                };
                const ASMD = ( id ) =>
                {

                    document.getElementById( id ).style.backgroundColor = "white";
                    document.getElementById( id ).style.color = "orange";

                };

                let nums = document.getElementById( 'nums' );
                if ( nums.value == "" )
                {
                    document.getElementById( 'add' ).style.backgroundColor = "";
                    document.getElementById( 'add' ).style.color = "";

                } else
                {
                    if ( this == document.getElementById( 'add' ) )
                    {
                        setY();
                        clearButtons();
                        ASMD( 'add' );
                        addValues();
                    } else if ( this == document.getElementById( 'subtract' ) )
                    {
                        setY();
                        clearButtons();
                        ASMD( 'subtract' );
                        addValues();

                    } else if ( this == document.getElementById( 'multiply' ) )
                    {
                        setY();
                        clearButtons();
                        ASMD( 'multiply' );
                        addValues();

                    } else if ( this == document.getElementById( 'divide' ) )
                    {
                        setY();
                        clearButtons();
                        ASMD( 'divide' );
                        addValues();


                    } else if ( this == document.getElementById( 'remainder' ) )
                    {
                        setY();
                        clearButtons();
                        addValues();

                    } else if ( this == document.getElementById( 'negpos' ) )
                    {
                        if ( calculator.NEGPOS == null || calculator.NEGPOS != true )
                        {
                            calculator.NEGPOS = true;
                            calculator.X = calculator.X * -1;
                            document.getElementById( 'nums' ).value = calculator.X;
                            document.getElementById( 'negpos' ).style.backgroundColor = "grey";
                            input = calculator.OLDVALUE;
                        } else if ( calculator.NEGPOS != null || calculator.NEGPOS != false )
                        {
                            calculator.NEGPOS = false;
                            calculator.X = calculator.X * -1;
                            document.getElementById( 'nums' ).value = calculator.X;
                            document.getElementById( 'negpos' ).style.backgroundColor = "";
                            input = calculator.OLDVALUE;
                        }

                    } else if ( this == document.getElementById( 'eq' ) )
                    {
                        setZ();
                        document.getElementById( 'nums' ).value = calculator.Z;
                        input = "";
                        calculator.OLDVALUE = "";
                        calculator.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        clearButtons();

                    } else if ( this == document.getElementById( 'period' ) )
                    {
                        document.getElementById( 'nums' ).value = calculator.X + ".";
                        input = calculator.OLDVALUE;
                    }
                }
                calculator.INPUT = input;
                return calculator.INPUT;
            }
        };

        window.onload = function ()
        {
            let inputs = new Inputs( calculator.X, calculator.Y, calculator.INPUT );
            const setInputs = ( id ) =>
            {
                document.getElementById( id ).onclick = inputs.getInputs;
            };
            const setNumbers = ( id ) =>
            {
                document.getElementById( id ).onclick = inputs.getNumbers;
            };
            setInputs( 'eq' );
            setInputs( 'add' );
            setInputs( 'subtract' );
            setInputs( 'multiply' );
            setInputs( 'divide' );
            setInputs( 'remainder' );
            setInputs( 'negpos' );
            setInputs( 'period' );
            setNumbers( '0' );
            setNumbers( '1' );
            setNumbers( '2' );
            setNumbers( '3' );
            setNumbers( '4' );
            setNumbers( '5' );
            setNumbers( '6' );
            setNumbers( '7' );
            setNumbers( '8' );
            setNumbers( '9' );

            document.getElementById( 'clear' ).onclick = function ()
            {
                document.getElementById( 'nums' ).value = "";
                calculator.Y = "";
                calculator.X = "";
                calculator.INPUT = "";
                let dec = document.getElementById( 'period' );
                dec.disabled = false;
                let buttons = document.querySelectorAll( 'button' );
                let buttonsArray = [ ...buttons ];
                buttonsArray.forEach( button =>
                {
                    button.style.backgroundColor = "";
                    button.style.color = "";
                } );
            };

        };
    }
}
let main = new Main().init()






















