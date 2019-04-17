import React, { useState } from 'react';
import { Item } from '../store';
import './styles/Card.scss';

interface Props {
    action: (item: Item) => void;
    item: Item;
    selected: boolean;
    disabled: boolean;
    children: React.ReactNode;
}

const Card = React.memo(({ action, item, selected, disabled, children }: Props) => {
    const [flipped, changeFlipped] = useState<boolean>(false);

    if (!disabled) {
        if (!flipped && selected) {
            changeFlipped(true);
        } else if (flipped && !selected) {
            changeFlipped(false);
        }
    } else if (disabled && !flipped) {
        changeFlipped(true);
    }

    return (
        <section className="cardContainer">
            <button
                type="button"
                onClick={() => action(item)}
                disabled={disabled || flipped}
                className={`card ${flipped && 'flipped'}`}
            >
                <div className="back" />
                <div className="front">
                    <div className="frontInner">{children}</div>
                </div>
            </button>
        </section>
    );
});

export default Card;
