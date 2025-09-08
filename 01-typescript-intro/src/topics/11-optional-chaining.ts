
export interface Passenger{
    name:string;
    children?:string[];
}

const passenger1:Passenger ={
    name: 'Carlos',
}

const passenger2:Passenger ={
    name: 'Melissa',
    children : ['Natalia','Elizabet'],
}

const printChildren = ({name,children}:Passenger):number => {

 //   if(!passenger1.children) return 0;

    //sino tiene hijos asigna 0
    const howManyChildren = children?.length || 0;

    //se le confirma a TS que siempre se va a recibir un numero de hijos
    //const howManyChildren = children!.length;

    console.log(name,howManyChildren);

    return howManyChildren;
}

printChildren(passenger1)