import React from 'react';

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
    return <button onClick={onClick}>Add</button>;
};