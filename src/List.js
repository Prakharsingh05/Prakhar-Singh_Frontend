/*What the simple List component does:
It's a functional component that returns the list of items. Those list items are rendered as SingleList Item components.
The component accepts an array of items as props, and each item must have a 'text' property which will be displayed in the list.
*/

/*
What problems / warnings are there with the code:

The setSelectedIndex function is incorrectly. It should be defined using the useState hook.
The isSelected  should be passed as a boolean value indicating whether the current index is selected or not, but it is 
currently passed as selectedIndex which is an integer value.
The PropTypes for the items prop in WrappedListComponent are incorrect. It should be defined as an array of objects, where 
each object must have a 'text' property of type string.
*/



/* Optimized Correct Code */
import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red' }}
      onClick={onClickHandler}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: 'left' }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex === index}
        />
      ))}
    </ul>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Added demo data for testing 
const demoItems = [
  { text: 'Item 1' },
  { text: 'Item 2' },
  { text: 'Item 3' },
  { text: 'Item 4' },
  { text: 'Item 5' },
];

export default function App() {
  return <List items={demoItems} />;
}
