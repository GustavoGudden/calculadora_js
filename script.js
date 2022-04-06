const numberButtons  = document.querySelectorAll("[data-number]")
const operationButtons  = document.querySelectorAll("[data-op]")
const allClearButtons  = document.querySelector("[data-all-clear]")
const deleteButtons  = document.querySelector("[data-delete]")
const equalButtons  = document.querySelector("[data-equal]")

const previousOperandTextElement  = 
document.querySelector("[data-pre-op]");
const currentOperandTextElement  =
 document.querySelector("[data-cur]");


class Calculator{
constructor(previousOperandTextElement,currentOperandTextElement){
this.previousOperandTextElement = previousOperandTextElement;
this.currentOperandTextElement  = currentOperandTextElement;
this.clea();
}

formatdisplayNunber(number){
const stringnunber  = number.toString();
const intergerDigits = parseFloat(stringnunber.split('.')[0])
const decimalDoigits = stringnunber.split('.')[1]

let intergerDisplay;

if (isNaN(intergerDigits)){

intergerDisplay= ''
}else{
intergerDisplay = intergerDigits.toLocaleString('en',{
maximumFractionDigits: 0,
});

}

if(decimalDoigits != null ){
return `${intergerDisplay}.${decimalDoigits}`

}else{
return intergerDisplay;

}


}

delete(){
this.currentOperand = this.currentOperand.toString().slice(0, -1);

}

calculate(){
    let result;
    const _previousOperand = parseFloat(this.previousOperand)
    const _currentOperand = parseFloat(this.currentOperand)

    if(isNaN(_previousOperand ) || isNaN(_currentOperand))return;

    switch(this.operation){
      case "+":
        result = _previousOperand + _currentOperand;
    break;
      case "-":
         result = _previousOperand - _currentOperand;
    break;
        case "%":
            result = _previousOperand/_currentOperand;
    break;
         case "*":
             result = _previousOperand * _currentOperand;
    break;

default:
    return;

    }

    this.currentOperand= result;
    this.operation = undefined;
    this.previousOperand = "";
}


chooseOperation(operation){
if(this.currentOperand === '')return;

if(this.previousOperand != ''){
this.calculate()
}



this.operation = operation;
this.previousOperand = this.currentOperand;
this.currentOperand = "";

}


appendNumber(number){
    if(this.currentOperand.includes(".") && number === "." ) return;
     this.currentOperand = `${this.currentOperand}${number.toString()}`;
}

clea(){
this.currentOperand = "";
this.previousOperand = "";
this.operation = undefined;
}

updatedisplay(){
this.previousOperandTextElement.innerText =`${this.formatdisplayNunber(this.previousOperand)}
${this.operation  || ''}`;
this.currentOperandTextElement.innerText=  this.formatdisplayNunber(this.currentOperand);



}



}



const calculator =  new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);


for(const numberButton of numberButtons){
numberButton.addEventListener("click", () => {
calculator.appendNumber(numberButton.innerText);
calculator.updatedisplay();
})


}


for(const operationButton of operationButtons){
operationButton.addEventListener("click", () => {
calculator.chooseOperation(operationButton.innerText);
calculator.updatedisplay();
})
}

allClearButtons.addEventListener("click", () => {
calculator.clea();
calculator.updatedisplay();

});

equalButtons.addEventListener('click',() =>{
calculator.calculate();
calculator.updatedisplay()
})

deleteButtons.addEventListener('click',() =>{
calculator.delete();
calculator.updatedisplay();

});