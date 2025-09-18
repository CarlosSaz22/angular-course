export enum Color {
  red,
  black,
  blue,
  green,
}

export enum Creator {
  DC,
  Marvel,
}

export interface Hero {
  id: number;
  name: string;
  canFly: boolean;
  color: Color;
  creator: Creator;
}


export const propertiesSpanish = {
  null:'',
  id: 'identificador',
  name: 'Nombre',
  canFly: 'Puede volar?',
  color: 'Color',
  creator: 'Creador',
};


export const ColorMap = {
  [Color.red]: '#E57373',
  [Color.black]: '#424242',
  [Color.blue]: '#64B5F6',
  [Color.green]: '#81C784',
};
