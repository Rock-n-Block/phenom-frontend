/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { CollectionSlim } from "./CollectionSlim";
import { Creator } from "./Creator";
import { Currency } from "./Currency";


export interface Token {
    animation?: string;
    available?: string;
    bids?: string;
    collection: CollectionSlim;
    creator: Creator;
    currency: Currency;
    description?: string;
    digitalKey?: string;
    endAuction?: string;
    externalLink?: string;
    format?: string;
    hasDigitalKey?: string;
    highestBid?: string;
    highestBidUsd?: string;
    id?: number;
    isAucSelling?: string;
    isLiked?: string;
    isSelling?: string;
    isTimedAucSelling?: string;
    likeCount?: string;
    media?: string;
    minimalBid?: string;
    minimalBidUsd?: string;
    multipleCurrency?: boolean;
    name?: string;
    network?: string;
    owners?: string;
    price?: string;
    properties?: string;
    rankings?: string;
    royalty?: string;
    sellers?: string;
    selling?: boolean;
    standart?: string;
    startAuction?: string;
    stats?: string;
    tags?: string;
    totalSupply: number;
    updatedAt?: string;
    usdPrice?: string;
}