import React from 'react';

interface Props {
    children: React.ReactNode;
    action: () => void;
}

const Button = React.memo(({ children, action }: Props) => (
    <button onClick={() => action()}>{children}</button>
));

export default Button;
