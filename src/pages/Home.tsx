import "./css/Home.scss"
import { useState } from 'react';
import { AddButton } from './component/AddButon';
import { RemoveButton } from './component/RemoveButton';
import uuid from 'react-uuid';
import { NavLink } from 'react-router-dom';
export const Home = () => {
    const [count, setCount] = useState(3);

    const handleAddClick = () => {
        setCount(prevState => prevState + 1);
    };

    const handleRemoveClick = () => {
        setCount(prevState => {
            if (prevState > 0) {
                return prevState - 1;
            }
            return prevState;
        });
    };
    return (
        <div className='home page_styles'>
            <AddButton onClick={handleAddClick} />
            <RemoveButton onClick={handleRemoveClick} />
            <NavLink to="/moveItemList" className="link">前往Move Item List</NavLink>
            <NavLink to="/dragAndDropList" className="link">前往Drag And Drop List</NavLink>

            {Array.from({ length: count }, (_, index) => (
                <div key={uuid()} className="border">Option {index + 1}</div>
            ))}
        </div>
    );
};
