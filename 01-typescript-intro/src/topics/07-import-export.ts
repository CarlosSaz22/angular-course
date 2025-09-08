import { taxCalculation, type Product } from './06-function-destructuring';


const shoppingCart:Product[]= [
    {
        descripcion: 'Nokia',
        price:100
    },
    {
        descripcion:'IPAD',
        price:150
    }
];

//Tax = 0.15
//const tax=0.15;
const [total,taxTotal] = taxCalculation({
    product: shoppingCart,
    tax: 0.15
})

console.log(`Total`,total);
console.log(`Tax`,taxTotal);