/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { CollectionSlim } from "./CollectionSlim";
import { Currency } from "./Currency";
import { Network } from "./Network";


export interface TokenSlim {
    animation?: string;
    collection: CollectionSlim;
    createdAt?: string;
    currency: Currency;
    description?: string;
    externalLink?: string;
    format?: string;
    hasDigitalKey: boolean;
    id?: number;
    isAucSelling: boolean;
    isSelling?: boolean;
    isTimedAucSelling: boolean;
    media?: string;
    minimalBid: number;
    name: string;
    network: Network;
    price: number;
    royalty: number;
    standart?: string;
    totalSupply: number;
    usdPrice: number;
}