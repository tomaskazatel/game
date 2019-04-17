import Shuffle from './utils/shuffle';
import items from './data.json';

export interface Item {
    key: number;
    value: string;
    isImage: boolean;
    match: number;
}

class Store {
    private shuffledItems: Item[] = Shuffle(items);

    get items(): Item[] {
        return this.shuffledItems;
    }

    public restart() {
        this.shuffledItems = Shuffle(items);
    }
}

const store: Store = new Store();
export default store;
