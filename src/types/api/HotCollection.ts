/* eslint-disable */
/* @ts-ignore */
/**
 * DO NOT MODIFY IT BY HAND.
 * This file was automatically generated.
 */

import { Creator } from "./Creator";
import { Display_theme } from "./enums";
import { Standart } from "./enums";
import { Status } from "./enums";


export interface HotCollection {
    address?: string;
    avatar?: string;
    creator: Creator;
    deployBlock?: number;
    description?: string;
    displayTheme?: Display_theme;
    id?: string;
    isDefault?: boolean;
    isNsfw?: boolean;
    likesCount?: string;
    name?: string;
    shortUrl?: string;
    standart: Standart;
    status?: Status;
    symbol: string;
    tokens?: string;
}