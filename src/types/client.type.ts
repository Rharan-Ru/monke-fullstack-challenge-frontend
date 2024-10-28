import { TypeAddress } from "./address.type";

export type TypeClient = {
    id?: number;
    name: string;
    address?: TypeAddress[]
}

export type TypeCreateClient = {
    id?: number;
    name: string;
    address?: TypeAddress
}