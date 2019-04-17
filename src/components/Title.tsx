import React from 'react';

interface Props {
    children: React.ReactNode;
}

const Title = React.memo((props: Props) => <h1>{props.children}</h1>);

export default Title;
