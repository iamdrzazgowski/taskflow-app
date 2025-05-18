import React from 'react';

export default function Message({ text, style }) {
    return (
        <div style={style}>
            <p>{text}</p>
        </div>
    );
}
