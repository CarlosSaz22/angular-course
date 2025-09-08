
export interface Product{
    descripcion:string;
    price:number,
}

// const phone:Product={
//     descripcion: 'Nokia A1',
//     price: 150.0
// }

// const tablet:Product={
//     descripcion: 'IPAD',
//     price: 250.0
// }


interface TaxCalculationOptions{
    tax:number;
    product: Product[];
}


/*
function taxCalculation(options:TaxCalculationOptions):number[]{
    let total=0;
    options.product.forEach( product =>{
        total+=price;
})

    return [total,total*options.tax];
}
    */


//function taxCalculation(options:TaxCalculationOptions):[number,number]{

//function taxCalculation({tax,product}:TaxCalculationOptions):[number,number]{
export function taxCalculation(options:TaxCalculationOptions):[number,number]{
    const{product,tax}=options;
    let total=0;
    product.forEach( ({price}) =>{
        total+=price;
})

    return [total,total*tax];
}
// const shoppingCart = [phone,tablet];
// const tax=0.15;


/*
const result = taxCalculation({
    product: shoppingCart,
    tax,
})
    */

//

//deestructuración
// const [total,taxTotal] = taxCalculation({
//     product: shoppingCart,
//     tax,
// })



// console.log(`Total`,total);
// console.log(`Tax`,taxTotal);

