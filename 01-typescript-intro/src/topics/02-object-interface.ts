
const skills:string[]=['Bash','Counter','Healing'];

interface Character {
    name:string;
    hp:number;
    skills:string[];
    hometown?:string; // Optional property
}


const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash', 'Counter'],
}

strider.hometown='Rivendell';

console.table(strider);
//console.log('Skills:', strider.skills.join(', '));


export {}; // To make it a module and avoid global scope issues