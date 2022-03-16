/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { UserSlim } from "./UserSlim";
import { Display_theme } from "./enums";
import { Standart } from "./enums";


export interface CompositeCollection {
    address?: string;
    avatar?: string;
    cover?: string;
    creator: UserSlim;
    description?: string;
    displayTheme?: Display_theme;
    isDefault?: boolean;
    isNsfw?: boolean;
    likesCount?: number;
    name?: string;
    standart: Standart;
    symbol: string;
    tokens?: string[];
    url?: string;
}