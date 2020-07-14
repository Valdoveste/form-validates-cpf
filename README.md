# form-validates-cpf
### A form who's validate **CPF** in my country.

<img src="https://i.imgur.com/nvm1Fgh.png"></img>

   #### so... what's a **CPF**? 

   **CPF** is the Individual Taxpayer Registry is the register 
    maintained by the Federal Revenue of Brazil in which
    any natural persons, regardless of age or nationality,
    including those who have died, can register once. Each
    registrant is uniquely identified by an 11 decimal 
    digitCPF registration number.  [more](https://pt.wikipedia.org/wiki/Cadastro_de_pessoas_f%C3%ADsicas) Obs:. It's the Brazilian link.
    
    
## How the validation works?

  The algorithm to say if the **CPF** is valid is quite simple. As we know every **CPF** has 11 
  digits like this **13255042895**, so the whole logic behind the **CPF** is based in the two 
  last numbers of that we call **validation digits**, we need to make two series ofcalculations 
  and if the results(validation digits) are equal to the two last digits of **CPF** so it's valid.
  
  
## Calculations
 
  #### 1º Calculation 
  
 > 1 3 2 5 5 0 4 2 8 
 
and multiply by this sequence
 
> 10 9 8 7 6 5 4 3 2 

| 1 | 3 | 2 | 5 | 5 | 0 | 4 | 2 | 8 |
| - | - | - | - | - | - | - | - | - |
| x | x | x | x | x | x | x | x | x |
| 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 |2 |

result of multiplication 

| 10 | + | 27 | + | 16 | + | 35 | + | 30 | + | 0 | + | 16 | + | 6 | + | 16 | = | 156 |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- |

after sum the values we need to divide them 
by 11, if the remainer is lower than 2 the firts 
**validation digits** it's 0 else, than we devide 
the sum by 11 and subtract the remainer by subtract 11.
   
>Firts validate digit is 9 and it's matches.

  #### 2º Calculation 
 for the seconde calculation is basicaly 
 the same thing, only change is we gonna 
 add the new digit for the sum  
    
 > 1 3 2 5 5 0 4 2 8 9
 
 and multiply by this sequence
 
> 11 10 9 8 7 6 5 4 3 2 

| 1 | 3 | 2 | 5 | 5 | 0 | 4 | 2 | 8 | 9 |
| - | - | - | - | - | - | - | - | - | - |
| x | x | x | x | x | x | x | x | x | x |
| 11 | 10 | 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 |

result of multiplication 

| 11 | + | 30 | + | 18 | + | 40 | + | 35 | + | 0 | + | 20 | + | 8 | + | 24 | + | 18 | = | 204 |
| -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | -- | --| --|

>Second validate digit is 5 and it's matches too so the **CPF** is valid.

<img src="https://i.imgur.com/45otus6.png"></img>

Obs:. There some examples of types of CPF that are not assigned by anybody.

|000.000.0000-00|111.111.111-11|222.222.222-22|333.333.333-33|
|-|-|-|-|
|444.444.444-44|555.555.555-55|666.666.666-66|777.777.777-77|
|888.888.888-88|999.999.999-99|111.234.111-75|111.234.361-11|
|881.111.118-88|999.991.111-11|111.111.361-75||

```
I made this very noobie RegEx to catch all the possible wrong **CPF**.

const RegEx = [
/(^[A-ZÀ-Ú-a-zà-ú_@/#&+*]*$)/,
/([(1){6}]{6})|([(2){6}]{6})|([(3){6}]{6})|([(4){6}]{6})|([(5){6}]{6})|([(6){6}]{6})|([(7){6}]{6})|([(8){6}]{6})|([(9){6}]{6})|([(0){6}]{6})/g
];

    if(cpf.match(RegEx[1]) || cpf.length < 11) ? "CPF invalid!" : "CPF algorithm";

```
