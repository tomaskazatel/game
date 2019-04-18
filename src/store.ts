import Shuffle from './utils/shuffle';

export interface Item {
    key: number;
    value: string;
    match: number;
}

class Store {
    private jsItems: string[] = ['ReactJS', 'VueJS', 'AngularJS', 'EmberJS', 'MeteorJS'];
    private preparedItems: Item[] = [];
    private shuffledItems: Item[] = [];

    constructor() {
        this.prepareData();
        this.shuffledItems = Shuffle(this.preparedItems);
    }

    get items(): Item[] {
        return this.shuffledItems;
    }

    public restart() {
        this.shuffledItems = Shuffle(this.preparedItems);
    }

    private prepareData(): void {
        this.jsItems.forEach((jsItem: string, key: number) => {
            [0, 1].forEach((increase: number) => {
                const tempKey: number = key * 2;
                this.preparedItems.push({
                    key: tempKey + increase,
                    value: jsItem,
                    match: increase ? tempKey : tempKey + 1,
                });
            });
        });
    }
}

const store: Store = new Store();
export default store;
