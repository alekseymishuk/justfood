import type { MenuItem } from '../types/MenuItem';

export const menuItems: MenuItem[] = [
    {
        id: 1,
        name: 'Chicken Burger',
        quantity: 40,
        desc: 'Fried chicken burger - lettuce, tomato, cheese and mayonnaise',
        price: 24,
        image: 'cb.jpg',
    },
    {
        id: 2,
        name: 'Veg Burger',
        quantity: 30,
        desc: 'Plant-based burger — lettuce, tomato, vegan cheese and mayonnaise',
        price: 22,
        image: 'vb.jpg',
    },
    {
        id: 3,
        name: 'Chips',
        quantity: 50,
        desc: 'Potato chips fried to perfection',
        price: 7,
        image: 'chips.jpg',
    },
    {
        id: 4,
        name: 'Ice Cream',
        quantity: 30,
        desc: 'Ice cream - Vanilla ice cream double scoop',
        price: 4,
        image: 'ic.jpg',
    },
];
