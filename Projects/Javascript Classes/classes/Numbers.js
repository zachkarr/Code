
class Main
{
   constructor ()
   {

   }
   init ()
   {

      class Numbers
      {
         constructor ( x, y )
         {
            this.x = x;
            this.y = y;

         }

         add ()
         {
            return `${ this.x } + ${ this.y } = ` + `${ +this.x + +this.y }`;
         }

         subtract ()
         {
            return `${ this.x } - ${ this.y } = ` + `${ +this.x - +this.y }`;
         }
         multiply ()
         {
            return `${ this.x } * ${ this.y } = ` + `${ +this.x * +this.y }`;
         }
         divide ()
         {
            return `${ this.x } / ${ this.y } = ` + `${ +this.x / +this.y }`;
         }

      }
      class Inputs extends Numbers
      {
         constructor ( x, y )
         {
            super( x, y );

         }

         getButtons ()
         {

            this.x = document.getElementById( 'num1' ).value;
            this.y = document.getElementById( 'num2' ).value;

            if ( this.x == "" || this.y == "" )
            {
               alert( 'Please Select 2 Numbers' );


            } else if ( this.x.value != "" || this.y.value != "" )
            {
               console.log( this.x );
               console.log( this.y );

               let num = new Numbers( this.x, this.y );
               let f;
               if ( this == document.getElementById( 'add' ) )
               {
                  f = num.add();
                  console.log( f );

               } else if ( this == document.getElementById( 'subtract' ) )
               {
                  f = num.subtract();
                  console.log( f );
               } else if ( this == document.getElementById( 'multiply' ) )
               {
                  f = num.multiply();
                  console.log( f );
               } else if ( this == document.getElementById( 'divide' ) )
               {
                  f = num.divide();
                  console.log( f );
               }
               let results = document.getElementById( 'results' );
               results.innerHTML = f;

            }
         }

      };
      window.onload = function ()
      {
         let inputs = new Inputs();
         document.getElementById( 'add' ).onclick = inputs.getButtons;
         document.getElementById( 'subtract' ).onclick = inputs.getButtons;
         document.getElementById( 'multiply' ).onclick = inputs.getButtons;
         document.getElementById( 'divide' ).onclick = inputs.getButtons;
         document.getElementById( 'clear' ).onclick = function ()
         {
            document.getElementById( 'results' ).innerHTML = "";
            document.getElementById( 'num1' ).value = "";
            document.getElementById( 'num2' ).value = "";
         };

      };
   }

}
let main = new Main().init()






















