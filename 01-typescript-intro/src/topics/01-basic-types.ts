

const name:string='Carlos';
let hpPoints:number | 'FULL'=95;
const isAlive:boolean=true;


hpPoints='FULL';


console.log({
    name,hpPoints,isAlive
})

export {}; // to convert this file into a module and avoid errors with duplicate identifiers