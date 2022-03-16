/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { UserSlim } from "./UserSlim";
import { Display_theme } from "./enums";
import { Standart } from "./enums";


export interface Collection {
    address?: string;
    avatar?: string;
    cover?: string;
    creator: UserSlim;
    description?: string;
    displayTheme?: Display_theme;
    floorPrice?: number;
    isDefault?: boolean;
    isNsfw?: boolean;
    name?: string;
    ownersCount?: number;
    properties?: any;
    rankings?: any;
    standart: Standart;
    stats?: any;
    symbol: string;
    tokensCount?: number;
    url?: string;
    volumeTraded?: string;
}