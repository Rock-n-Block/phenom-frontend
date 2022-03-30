/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { CollectionSlim } from "./CollectionSlim";
import { UserSlim } from "./UserSlim";
import { Currency } from "./Currency";
import { Network } from "./Network";
import { Ownership } from "./Ownership";


export interface TokenSlim {
    animation?: string;
    available?: number;
    collection: CollectionSlim;
    createdAt?: string;
    creator: UserSlim;
    currency: Currency;
    description?: string;
    externalLink?: string;
    format?: string;
    hasDigitalKey: boolean;
    id?: number;
    isAucSelling: boolean;
    isLiked?: boolean;
    isSelling?: boolean;
    isTimedAucSelling: boolean;
    likeCount?: number;
    media?: string;
    minimalBid: number;
    name: string;
    network: Network;
    price: number;
    royalty: number;
    sellers?: Ownership[];
    standart?: string;
    totalSupply: number;
    usdPrice: number;
}