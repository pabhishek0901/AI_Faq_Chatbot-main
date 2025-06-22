import React, { useState } from 'react';

const FeedbackButtons = ({ onFeedback }) => {
  const [selected, setSelected] = useState(null);

  const handleClick = (type) => {
    setSelected(type);
    onFeedback(type);
  };

  const buttonStyle = (type) => {
    let backgroundColor = 'white';
    let color = 'black';

    if (selected === type) {
      if (type === '👍') {
        backgroundColor = 'green';
        color = 'white';
      } else if (type === '👎') {
        backgroundColor = 'red';
        color = 'white';
      }
    }

    return {
      marginRight: '5px',
      padding: '5px 10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor,
      color,
      cursor: 'pointer',
    };
  };

  return (
    <div style={{ marginTop: '8px' }}>
      <button
        style={buttonStyle('👍')}
        onClick={() => handleClick('👍')}
      >
        👍
      </button>
      <button
        style={buttonStyle('👎')}
        onClick={() => handleClick('👎')}
      >
        👎
      </button>
    </div>
  );
};

export default FeedbackButtons;
