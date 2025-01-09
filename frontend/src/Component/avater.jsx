import React from 'react';

const Avatar = ({ src, alt, size = '60px', borderColor = '#ddd', borderWidth = '2px' }) => {
  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `${borderWidth} solid ${borderColor}`,
    display: 'inline-block',
  };

  return (
    <div style={style}>
      <img
        src={src}
        alt={alt || 'Avatar'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default Avatar;
