import { Item } from '../store';

export default (items: Item[]): Item[] => {
    if (items && items.length > 0) {
        let length: number = items.length - 1;
        while (length > 0) {
            const random: number = Math.floor(Math.random() * (length + 1));
            [items[length], items[random]] = [items[random], items[length]];
            length -= 1;
        }
        return items;
    }

    return [];
};
