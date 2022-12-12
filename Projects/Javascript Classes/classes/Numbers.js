

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

      };

      const addNumbers = () =>
      {
         const input1 = document.getElementById( 'num1' );
         const input2 = document.getElementById( 'num2' );
         if ( input1.value == "" || input2.value == "" )
         {
            alert( 'Please Select 2 Numbers' );
         } else
         {
            const num = new Numbers( input1.value, input2.value );

            document.getElementById( "results" ).innerHTML = num.add();
         }

      };
      const subtractNumbers = () =>
      {
         const input1 = document.getElementById( 'num1' );
         const input2 = document.getElementById( 'num2' );

         if ( input1.value == "" || input2.value == "" )
         {
            alert( 'Please Select 2 Numbers' );
         } else
         {
            const num = new Numbers( input1.value, input2.value );
            document.getElementById( "results" ).innerHTML = num.subtract();
         }
      };
      const multiplyNumbers = () =>
      {
         const input1 = document.getElementById( 'num1' );
         const input2 = document.getElementById( 'num2' );

         if ( input1.value == "" || input2.value == "" )
         {
            alert( 'Please Select 2 Numbers' );
         } else
         {

            const num = new Numbers( input1.value, input2.value );
            document.getElementById( "results" ).innerHTML = num.multiply();
         }
      };
      const divideNumbers = () =>
      {
         const input1 = document.getElementById( 'num1' );
         const input2 = document.getElementById( 'num2' );

         if ( input1.value == "" || input2.value == "" )
         {
            alert( 'Please Select 2 Numbers' );
         } else
         {

            const num = new Numbers( input1.value, input2.value );
            document.getElementById( "results" ).innerHTML = num.divide();
         }
      };
      window.onload = function ()
      {

         const addButton = document.getElementById( 'add' );
         addButton.onclick = addNumbers;
         const subtractButton = document.getElementById( 'subtract' );
         subtractButton.onclick = subtractNumbers;
         const multiplyButton = document.getElementById( 'multiply' );
         multiplyButton.onclick = multiplyNumbers;
         const divideButton = document.getElementById( 'divide' );
         divideButton.onclick = divideNumbers;

      };
   }

}

const main = new Main().init()














