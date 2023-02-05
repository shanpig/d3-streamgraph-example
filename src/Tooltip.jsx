const Tooltip = (props) => {
  return (
    <div
      style={{ position: 'absolute', opacity: 0, padding: '5px 10px' }}
      {...props}
    ></div>
  );
};

export default Tooltip;
