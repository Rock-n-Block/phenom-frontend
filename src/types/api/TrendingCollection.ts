/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { UserSlim } from "./UserSlim";
import { Display_theme } from "./enums";
import { Standart } from "./enums";


export interface TrendingCollection {
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
    standart: Standart;
    symbol: string;
    url?: string;
    views: number;
}