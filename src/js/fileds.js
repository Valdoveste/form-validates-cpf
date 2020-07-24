/* #4527a0 */
const fieldCPF = document.getElementsByTagName("input")[1];
const fields = document.querySelectorAll('input[data-js="algorism"]');
const btnReset = document.getElementsByTagName("button")[0];
const popUP = document.getElementById("info-cpf-popup");
const RegEx = [
/([A-ZÀ-Ú-a-zà-ú_@/#&+*.])/,
/([A-ZÀ-Úa-zà-ú_@/#&+*.])/,
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

fields[1].addEventListener("change", eventformatingPhone => {
    fields[1].value = fields[1].value.replace(/(\d{5})/, '$1-');
});

fields[3].addEventListener("change", eventformatingZIPCODE => {
    fields[3].value = fields[3].value.replace(/(\d{5})/, '$1-');
});


/* 
Select all fields with "data-js = number", and add
a "RegeEx" and "Listener", which prevents the user from typing
alphabetic letters and some special characters.
*/
for(let item of fields){
    item.addEventListener("input", eventcleanCharac => {
        for(item of fields){
            item.value = item.value.replace(RegEx[1], '');
        }
    });
}

fieldCPF.addEventListener("input", eventcleanCharc => {
    fieldCPF.value = cleanCharacter(fieldCPF.value);

    function cleanCharacter(x){
        return x.replace(RegEx[0], '');
    }
});

/* 123 456 789 00 */
fieldCPF.addEventListener("change", eventgetCPF => {
    fieldCPF.value = fieldCPF.value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');

    const cpf = fieldCPF.value.replace(/[^0-9]/g, ''); // Clear the special characters added above.

    if(cpf.match(RegEx[2]) || cpf.length < 11){
        invalidCPF();
    }else{
        if(validatesCPF(cpf)){ 
            fieldCPF.style.boxShadow = "0px 0px 1.5px 1px rgb(0, 221, 0)"; //Confirms the validity of the CPF.
            popUP.style.boxShadow = "0px 0px 1.5px 1px rgb(0, 221, 0)";
            popUP.innerHTML = "Your CPF is valid!";
            fieldCPF.title = "Your CPF is valid!";
            popUP.style.display = "block";
        }else{
            invalidCPF();
        }
    }
    
    function invalidCPF(){
        popUP.style.display = "block";
        popUP.innerHTML = "Your CPF is invalid!";
        popUP.style.boxShadow = "0px 0px 1.5px 1px rgb(255, 0, 0)";
        fieldCPF.style.boxShadow = "0px 0px 1.5px 1px rgb(255, 0, 0)"; //Simulates the CPF input in an invalid state.
        fieldCPF.title = "Your CPF is invalid, please click on the right popup to clean this field.";
        fieldCPF.focus();
    }
});

popUP.addEventListener("click", eventclosePopup => {
    if(popUP.innerHTML === "Your CPF is invalid!"){
        fieldCPF.value = fieldCPF.value.replace(/(.)/g, ''); //Clean the CPF input.
        popUP.style.display = "none";
    }
});

/* 
    Whais CPF? 

    The Individual Taxpayer Registry is the register 
    maintained by the Federal Revenue of Brazil in which
    any natural persons, regardless of age or nationality,
    including those who have died, can register once. Each
    registrant is uniquely identified by an 11 decimal 
    digitCPF registration number.

    So basically this part verify if "CPF" is valid.

*/
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
