import * as d3 from 'd3';

export const MARGIN = { top: 20, right: 30, bottom: 30, left: 60 };
export const WIDTH = 460 - MARGIN.left - MARGIN.right;
export const HEIGHT = 400 - MARGIN.top - MARGIN.bottom;

export const highlight = (target) => {
  d3.selectAll('.area').style('opacity', '.2');
  d3.select(target).style('stroke', 'black').style('opacity', 1);
};

export const resumeHighlight = () => {
  d3.selectAll('.area').style('opacity', '1').style('stroke', 'none');
};

export const logPosition = (mouse, xScale, yScale) => {
  const { x: xPos, y: yPos } = mouse;
  const xValue = xScale.invert(xPos - MARGIN.left);
  const yValue = yScale.invert(yPos - MARGIN.top - MARGIN.bottom);
  console.table({
    position: `(${xPos}, ${yPos})`,
    value: `(${xValue}, ${yValue})`,
  });
};
