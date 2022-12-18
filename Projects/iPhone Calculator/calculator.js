class Main
{
    init ()
    {
        class Numbers
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
        let number = new Number();

        class Inputs extends Numbers
        {
            constructor ( x, y, z, input, oldvalue, negpos )
            {
                super( x, y, z, input, oldvalue, negpos );
            }

            getXNums ( x )
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
                if ( number.Z != "" )
                {
                    number.Z = "";
                    res.value = x;
                } else if ( number.Z == "" )
                {
                    res.value += x;
                }

                number.X = res.value;
                let dec = document.getElementById( 'period' );
                if ( number.X % 1 != 0 )
                {
                    dec.disabled = true;
                }
                console.log( "x", number.X );
                console.log( number );
                return number.X;
            }
            getInputs ( input )
            {
                function setY ()
                {
                    number.Y = number.X;
                    number.X = "";
                    console.log( number.Y );
                }
                function setZ ()
                {
                    if ( number.INPUT == "add" )
                    {
                        number.Z = `${ +number.Y + +number.X }`;
                    } else if ( number.INPUT == "subtract" )
                    {
                        number.Z = `${ +number.Y - +number.X }`;
                    } else if ( number.INPUT == "multiply" )
                    {
                        number.Z = `${ +number.Y * +number.X }`;
                    } else if ( number.INPUT == "divide" )
                    {
                        number.Z = `${ +number.Y / +number.X }`;
                    } else if ( number.INPUT == "remainder" )
                    {
                        number.Z = `${ +number.Y % +number.X }`;
                    }
                    number.X = ""; document.getElementById( 'nums' ).value = number.X;
                    number.Y = "";
                    console.log( number.Z );
                    console.log( number );
                }

                function clearButtons ()
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
                } else
                {
                    if ( this == document.getElementById( 'add' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = number.X;
                        document.getElementById( 'add' ).style.backgroundColor = "white";
                        document.getElementById( 'add' ).style.color = "orange";
                        input = this.id;
                        number.OLDVALUE = this.id;
                        number.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", number.OLDVALUE );

                    } else if ( this == document.getElementById( 'subtract' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = number.X;
                        document.getElementById( 'subtract' ).style.backgroundColor = "white";
                        document.getElementById( 'subtract' ).style.color = "orange";
                        input = this.id;
                        number.OLDVALUE = this.id;
                        number.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", number.OLDVALUE );

                    } else if ( this == document.getElementById( 'multiply' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = number.X;
                        document.getElementById( 'multiply' ).style.backgroundColor = "white";
                        document.getElementById( 'multiply' ).style.color = "orange";
                        input = this.id;
                        number.OLDVALUE = this.id;
                        number.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", number.OLDVALUE );

                    } else if ( this == document.getElementById( 'divide' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = number.X;
                        document.getElementById( 'divide' ).style.backgroundColor = "white";
                        document.getElementById( 'divide' ).style.color = "orange";
                        input = this.id;
                        number.OLDVALUE = this.id;
                        number.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", number.OLDVALUE );


                    } else if ( this == document.getElementById( 'remainder' ) )
                    {
                        setY();
                        clearButtons();
                        document.getElementById( 'nums' ).value = number.X;
                        input = this.id;
                        number.OLDVALUE = this.id;
                        number.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        console.log( "oldvalue", number.OLDVALUE );


                    } else if ( this == document.getElementById( 'negpos' ) )
                    {
                        if ( number.NEGPOS == null || number.NEGPOS != true )
                        {
                            number.NEGPOS = true;
                            number.X = number.X * -1;
                            document.getElementById( 'nums' ).value = number.X;
                            document.getElementById( 'negpos' ).style.backgroundColor = "grey";
                            input = number.OLDVALUE;
                        } else if ( number.NEGPOS != null || number.NEGPOS != false )
                        {
                            number.NEGPOS = false;
                            number.X = number.X * -1;
                            document.getElementById( 'nums' ).value = number.X;
                            document.getElementById( 'negpos' ).style.backgroundColor = "";
                            input = number.OLDVALUE;
                        }

                        console.log( number.NEGPOS );
                        console.log( "oldvalue", number.OLDVALUE );

                    } else if ( this == document.getElementById( 'eq' ) )
                    {
                        setZ();
                        document.getElementById( 'nums' ).value = number.Z;
                        input = "";
                        number.OLDVALUE = "";
                        number.NEGPOS = false;
                        let dec = document.getElementById( 'period' );
                        dec.disabled = false;
                        clearButtons();

                    } else if ( this == document.getElementById( 'period' ) )
                    {
                        document.getElementById( 'nums' ).value = number.X + ".";
                        input = number.OLDVALUE;
                        console.log( "oldvalue in period", number.OLDVALUE );
                    }
                }
                number.INPUT = input;
                console.log( number.INPUT );
                console.log( number );
                return number.INPUT;
            }
        };

        window.onload = function ()
        {
            window.resizeTo( 100, 100 );
            let inputs = new Inputs( number.X, number.Y, number.INPUT );
            document.getElementById( 'eq' ).onclick = inputs.getInputs;
            document.getElementById( 'add' ).onclick = inputs.getInputs;
            document.getElementById( 'subtract' ).onclick = inputs.getInputs;
            document.getElementById( 'multiply' ).onclick = inputs.getInputs;
            document.getElementById( 'divide' ).onclick = inputs.getInputs;
            document.getElementById( 'remainder' ).onclick = inputs.getInputs;
            document.getElementById( 'negpos' ).onclick = inputs.getInputs;
            document.getElementById( 'period' ).onclick = inputs.getInputs;
            document.getElementById( '0' ).onclick = inputs.getXNums;
            document.getElementById( '1' ).onclick = inputs.getXNums;
            document.getElementById( '2' ).onclick = inputs.getXNums;
            document.getElementById( '3' ).onclick = inputs.getXNums;
            document.getElementById( '4' ).onclick = inputs.getXNums;
            document.getElementById( '5' ).onclick = inputs.getXNums;
            document.getElementById( '6' ).onclick = inputs.getXNums;
            document.getElementById( '7' ).onclick = inputs.getXNums;
            document.getElementById( '8' ).onclick = inputs.getXNums;
            document.getElementById( '9' ).onclick = inputs.getXNums;
            document.getElementById( 'clear' ).onclick = function ()
            {
                document.getElementById( 'nums' ).value = "";
                number.Y = "";
                number.X = "";
                number.INPUT = "";
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






















