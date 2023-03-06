import React from 'react';

interface RemoveButtonProps {
    onClick: () => void;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => {
    return <button onClick={onClick}>Remove</button>;
};