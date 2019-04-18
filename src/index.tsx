import React, { useState } from 'react';
import { render } from 'react-dom';
import Store, { Item } from './store';
import Title from './components/Title';
import Card from './components/Card';
import Button from './components/Button';
import './styles/App.scss';

const App = React.memo(() => {
    const [done, resetDone] = useState<number[]>([]);
    const [selected, changeSelected] = useState<Item[]>([]);
    const [clicks, changeClicks] = useState<number>(0);

    const onCardClick = (item: Item): void => {
        changeClicks(clicks + 1);
        if (selected.length === 1) {
            if (selected[0].value === item.value) {
                done.push(selected[0].key, item.key);
                changeSelected([]);
            }
            changeSelected([selected[0], item]);
        } else {
            changeSelected([item]);
        }
    };

    const restart = (): void => {
        changeClicks(0);
        resetDone([]);
        changeSelected([]);
        Store.restart();
    };

    return (
        <div>
            <div className="title">
                {done.length === Store.items.length ? (
                    <React.Fragment>
                        <Title>You win!</Title>
                        <Button action={restart}>Restart</Button>
                    </React.Fragment>
                ) : (
                    <Title>Guessed: {done.length / 2}</Title>
                )}
            </div>
            <div className="title">
                <p>
                    Number of moves <b>{Math.floor(clicks / 2)}</b>
                </p>
            </div>
            <div className="cards">
                {Store.items.map((item: Item) => (
                    <Card
                        action={onCardClick}
                        key={item.key}
                        selected={selected.map((item: Item) => item.key).includes(item.key)}
                        disabled={done.includes(item.key)}
                        item={item}
                    >
                        <span>{item.value}</span>
                    </Card>
                ))}
            </div>
        </div>
    );
});

render(<App />, document.getElementById('root'));
