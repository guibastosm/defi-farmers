export enum Fruit {
    None = '0',
    Sunflower = '1',
    Potato = '2',
    Pumpkin = '3',
    Beetroot = '4',
    Cauliflower = '5',
    Parsnip = '6',
    Radish = '7',
}

export enum Charity {
    TheWaterProject = '0x276cA95DBbB0F1bEb6919317AB03c885FC10ee6E',
    Heifer = '0xAF88d965068501ed94cF83A16fCf8e97f85279e4',
    CoolEarth = '0x69f72C0B39844C7819b88b80A05E18aCf3F927Df'
}

export interface Square {
    fruit: Fruit
    createdAt: number
}


export interface Transaction {
    fruit: Fruit
    createdAt: number
    action: Action
    landIndex: number
}

export enum Action {
    Plant = 0,
    Harvest = 1
}
