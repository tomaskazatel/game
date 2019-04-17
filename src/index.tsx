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

    const onCardClick = (item: Item): void => {
        if (selected.length === 1) {
            console.log('hello');
            if (selected[0].key === item.match) {
                done.push(selected[0].key, item.key);
                changeSelected([]);
            }
            changeSelected([selected[0], item]);
        } else {
            changeSelected([item]);
        }
    };

    const restart = (): void => {
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