/* #4527a0 */
const fields = document.querySelectorAll('input[data-js="number"]');
const btnReset = document.getElementsByTagName("button")[0];
const RegEx = [
/(^[A-ZÀ-Ú-a-zà-ú_@/#&+*]*$)/,
/([(1){6}]{6})|([(2){6}]{6})|([(3){6}]{6})|([(4){6}]{6})|([(5){6}]{6})|([(6){6}]{6})|([(7){6}]{6})|([(8){6}]{6})|([(9){6}]{6})|([(0){6}]{6})/g
];

/* 
Formatting events for text fields and animations.
*/
btnReset.addEventListener("click", eventAnimation => {
    btnReset.style.transform = "rotate(-360deg)";
    fields[0].style.boxShadow = ""; 
});

btnReset.addEventListener("mouseout", eventAnimation => {
    btnReset.style.transform = "rotate(360deg)";
});

fields[2].addEventListener("change", eventformatingPhone => {
    fields[2].value = fields[2].value.replace(/(\d{5})/, '$1-');
});

fields[4].addEventListener("change", eventformatingZIPCODE => {
    fields[4].value = fields[4].value.replace(/(\d{5})/, '$1-');
});


/* 
Select all fields with "data-js = number", and add
a "RegeEx" and "Listener", which prevents the user from typing
alphabetic letters and some special characters.
*/
for(let item of fields){
    item.addEventListener("input", eventcleanCharac => {
        for(item of fields){
        item.value = item.value.replace(RegEx[0], '');
        }
    });
}

/* 123 456 789 00 */
fields[0].addEventListener("change", eventgetCPF => {
    fields[0].value = fields[0].value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    const cpf = fields[0].value.replace(/[^0-9]/g, ''); // Clear the special characters added above.
    if(cpf.match(RegEx[1]) || cpf.length < 11){
        fields[0].value = fields[0].value.replace(/(.)/g, ''); //Clean the CPF input.
        fields[0].style.boxShadow = "0px 0px 1.5px 1px rgb(255, 0, 0)"; //Simulates the CPF input in an invalid state.
    }else{
        if(validatesCPF(cpf)){ 
            fields[0].style.boxShadow = "0px 0px 1.5px 1px rgb(0, 221, 0)"; //Confirms the validity of the CPF.
        }
    }
});

function validatesCPF(x) {
let sum = 0;
let digValidator = "";
let indexInit = 0, inedxEnd = 1; //Walk through CPF positions.
    
    //1º Calculation.  
    for(let i = 10; i >= 2 ;i--){ 
        sum += i * parseInt(x.substring(indexInit,inedxEnd));
        indexInit++;
        inedxEnd++;
    }   

    /* 
    Assigns the first "validator type" to digValidator.  
    */
    if(sum%11 < 2){
        digValidator = "0";
    }else{
        digValidator = String(11-(sum%11));
    }

    /* 
    Resetting the variables for the next calculation. 
    */
    indexInit = 0;
    inedxEnd = 1;
    sum = 0;

    //2º Calculation.
    for(let i = 11; i >= 2 ;i--){
        sum += i * parseInt(x.substring(indexInit,inedxEnd));
        indexInit++;
        inedxEnd++;
    }   

    /* 
    Increments the second "validator type" to digValidator.  
    */
    if(sum%11 < 2){
        digValidator += "0";
    }else{
        digValidator += String(11-(sum%11));
    }

    /* 
    The "validator digits" discovered are verified,
    are the same as the inserted cpf and returns true.
     */
    if(digValidator === x.substring(9,11)) return true;
}

/* function checkForm(){

} */
