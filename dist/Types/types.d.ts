import { ListedItem } from "ink-multi-select/index";
export declare type Routes = "/" | "/Login" | "/Register" | "/Main" | "/OrderView" | "/Summary" | "/Realization";
export declare type Route = {
    currentRoute: Routes;
    id?: string;
    payload?: object;
};
export declare type Pizza = {
    id: string;
    name: string;
    ingredients: string[];
    spiciness: number;
    isVege: boolean;
    prices: {
        small: number;
        large: number;
    };
};
export declare type Ingredient = {
    id: string;
    name: string;
    price: number;
};
export declare const types: {
    cheese: string;
    chilli: string;
    tomatoSauce: string;
    olives: string;
    salami: string;
    garlic: string;
    oregano: string;
};
export declare type Item = {
    label: string;
    value: string;
};
export declare type OrderSummary = {
    additives: ListedItem[];
    size: string;
    name: string;
    price: number;
};
export declare type AdditiveWithPrice = {
    name: string;
    price: number;
};
