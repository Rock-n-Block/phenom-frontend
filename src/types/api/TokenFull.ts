/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Bid } from "./Bid";
import { CollectionSlim } from "./CollectionSlim";
import { UserSlim } from "./UserSlim";
import { Currency } from "./Currency";
import { Network } from "./Network";
import { Ownership } from "./Ownership";
import { Tag } from "./Tag";


export interface TokenFull {
    animation?: string;
    available?: number;
    bids?: Bid[];
    collection: CollectionSlim;
    createdAt?: string;
    creator: UserSlim;
    currency: Currency;
    currencyServiceFee?: string;
    description?: string;
    digitalKey?: string;
    endAuction?: number;
    externalLink?: string;
    format?: string;
    hasDigitalKey: boolean;
    highestBid?: Bid;
    highestBidUsd?: number;
    history?: string;
    id?: number;
    internalId?: number;
    isAucSelling: boolean;
    isLiked?: boolean;
    isSelling?: boolean;
    isTimedAucSelling: boolean;
    likeCount?: number;
    media?: string;
    minimalBid: number;
    minimalBidUsd?: number;
    multipleCurrency?: boolean;
    name: string;
    network: Network;
    owners?: Ownership[];
    price: number;
    properties?: any;
    rankings: any;
    royalty: number;
    sellers?: Ownership[];
    selling?: boolean;
    serviceFee?: string;
    standart?: string;
    startAuction?: number;
    stats: any;
    tags: Tag[];
    totalSupply: number;
    usdPrice: number;
    usdServiceFee?: string;
    viewsCount?: string;
}