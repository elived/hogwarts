export interface UserInfo {
    username: string;
    password: string;
}

export const Roles = {
    Admin: "Admin",
    User: "User",
} as const;
export type Role = typeof Roles[keyof typeof Roles];

export interface JwtTokenClaims {
    sub: string,
    name: string,
    jti: string
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": Role,
    exp: number,
    iss: string,
    aud: string,
}

export interface UserRoleInfo {
    id: number,
    username: string,
    role: string
}

export type Room = {
    Id : number;
    Name : string;
    House : HouseType;
    MaxCapacity : number;
    Students : Student[];
}

export type Student = {
    Id : number;
    Name : string;
    House : HouseType;
    Pet : PetType;
    RoomId : number;
    Room : Room;
}


export enum HouseType {
    Gryffindor = 0,
    Hufflepuff = 1,
    Ravenclaw = 2,
    Slytherin = 3
}
// display house data
export const houseLabels: Record<HouseType, string> = {
    [HouseType.Gryffindor]: "Gryffindor",
    [HouseType.Hufflepuff]: "Hufflepuff",
    [HouseType.Ravenclaw]: "Ravenclaw",
    [HouseType.Slytherin]: "Slytherin"
};

export const houseIcons: Record<HouseType, string> = {
    [HouseType.Gryffindor]: "/images/gryffindor.png",
    [HouseType.Hufflepuff]: "/images/hufflepuff.png",
    [HouseType.Ravenclaw]: "/images/ravenclaw.png",
    [HouseType.Slytherin]: "/images/slytherin.png"
};

export enum PetType {
    None = 0,
    Cat = 1,
    Rat = 2,
    Owl = 3
}

// display pet data
export const petLabels: Record<PetType, string> = {
    [PetType.None]: "None",
    [PetType.Cat]: "Cat",
    [PetType.Rat]: "Rat",
    [PetType.Owl]: "Owl"
};
