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
                if ( this == document.getElementById( '0' ) )
                {
                    x = 0;
                } else if ( this == document.getElementById( '1' ) )
                {
                    x = 1;
                } else if ( this == document.getElementById( '2' ) )
                {
                    x = 2;
                } else if ( this == document.getElementById( '3' ) )
                {
                    x = 3;
                } else if ( this == document.getElementById( '4' ) )
                {
                    x = 4;
                }
                else if ( this == document.getElementById( '5' ) )
                {
                    x = 5;
                } else if ( this == document.getElementById( '6' ) )
                {
                    x = 6;
                } else if ( this == document.getElementById( '7' ) )
                {
                    x = 7;
                } else if ( this == document.getElementById( '8' ) )
                {
                    x = 8;
                } else if ( this == document.getElementById( '9' ) )
                {
                    x = 9;
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
                console.log( "x", calculator.X );
                console.log( calculator );
                return calculator.X;
            }
            getInputs ( input )
            {
                const setY = () =>
                {
                    calculator.Y = calculator.X;
                    calculator.X = "";
                    console.log( calculator.Y );
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
                    console.log( calculator.Z );
                    console.log( calculator );
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
                        document.getElementById( 'nums' ).value = calculator.X;
                        document.getElementById( 'add' ).style.backgroundColor = "white";
                        document.getElementById( 'add' ).style.color = "orange";
                        input = this.id;
                        calculator.OLDVALUE = this.id;
                        calculator.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", calculator.OLDVALUE );

                    } else if ( this == document.getElementById( 'subtract' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = calculator.X;
                        document.getElementById( 'subtract' ).style.backgroundColor = "white";
                        document.getElementById( 'subtract' ).style.color = "orange";
                        input = this.id;
                        calculator.OLDVALUE = this.id;
                        calculator.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", calculator.OLDVALUE );

                    } else if ( this == document.getElementById( 'multiply' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = calculator.X;
                        document.getElementById( 'multiply' ).style.backgroundColor = "white";
                        document.getElementById( 'multiply' ).style.color = "orange";
                        input = this.id;
                        calculator.OLDVALUE = this.id;
                        calculator.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", calculator.OLDVALUE );

                    } else if ( this == document.getElementById( 'divide' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = calculator.X;
                        document.getElementById( 'divide' ).style.backgroundColor = "white";
                        document.getElementById( 'divide' ).style.color = "orange";
                        input = this.id;
                        calculator.OLDVALUE = this.id;
                        calculator.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", calculator.OLDVALUE );


                    } else if ( this == document.getElementById( 'remainder' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = calculator.X;
                        input = this.id;
                        calculator.OLDVALUE = this.id;
                        calculator.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", calculator.OLDVALUE );


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

                        console.log( calculator.NEGPOS );
                        console.log( "oldvalue", calculator.OLDVALUE );

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
                        console.log( "oldvalue in period", calculator.OLDVALUE );
                    }
                }
                calculator.INPUT = input;
                console.log( calculator.INPUT );
                console.log( calculator );
                return calculator.INPUT;
            }
        };

        window.onload = function ()
        {

            let inputs = new Inputs( calculator.X, calculator.Y, calculator.INPUT );
            document.getElementById( 'eq' ).onclick = inputs.getInputs;
            document.getElementById( 'add' ).onclick = inputs.getInputs;
            document.getElementById( 'subtract' ).onclick = inputs.getInputs;
            document.getElementById( 'multiply' ).onclick = inputs.getInputs;
            document.getElementById( 'divide' ).onclick = inputs.getInputs;
            document.getElementById( 'remainder' ).onclick = inputs.getInputs;
            document.getElementById( 'negpos' ).onclick = inputs.getInputs;
            document.getElementById( 'period' ).onclick = inputs.getInputs;
            document.getElementById( '0' ).onclick = inputs.getNumbers;
            document.getElementById( '1' ).onclick = inputs.getNumbers;
            document.getElementById( '2' ).onclick = inputs.getNumbers;
            document.getElementById( '3' ).onclick = inputs.getNumbers;
            document.getElementById( '4' ).onclick = inputs.getNumbers;
            document.getElementById( '5' ).onclick = inputs.getNumbers;
            document.getElementById( '6' ).onclick = inputs.getNumbers;
            document.getElementById( '7' ).onclick = inputs.getNumbers;
            document.getElementById( '8' ).onclick = inputs.getNumbers;
            document.getElementById( '9' ).onclick = inputs.getNumbers;
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






















