const Line = ({ top, left, height, ...restProps }) => {
  return (
    <div
      style={{
        top,
        left,
        height,
        pointerEvents: 'none',
        width: '2px',
        borderRadius: '1px',
        position: 'absolute',
        background: '#4b1701',
      }}
      {...restProps}
    ></div>
  );
};

export default Line;
