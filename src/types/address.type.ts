import { TypeClient } from "./client.type";

export type TypeAddress = {
    id?: number;
    weight: string | number;
    street: string;
    complement: string;
    number: string;
    city: string;
    latitude: string;
    neighborhood: string;
    longitude: string;
    state: string;
    country: string;

    client?: TypeClient
}

export type TypeAddressMarkers = {
    id: number;
    latitude: string;
    longitude: string;

    client?: TypeClient
}