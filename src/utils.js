import * as d3 from 'd3';

const SVG_WIDTH = 700;
const RATIO = 0.87;
export const MARGIN = { top: 20, right: 30, bottom: 30, left: 80 };
export const WIDTH = SVG_WIDTH - MARGIN.left - MARGIN.right;
export const HEIGHT = SVG_WIDTH * RATIO - MARGIN.top - MARGIN.bottom;

export const highlight = (target) => {
  d3.selectAll('.area').style('opacity', '.2');
  d3.select(target).style('stroke', 'black').style('opacity', 1);

  d3.select('#tooltip').style('opacity', '1');
};

export const resumeHighlight = () => {
  d3.selectAll('.area').style('opacity', '1').style('stroke', 'none');
  d3.select('#tooltip').style('opacity', '0');
};

export const showPosition = (e, data, x) => {
  const {
    offsetX: xPos,
    offsetY: yPos,
    target: { id },
  } = e;
  const years = data.map((d) => d.year);
  const xValue = x.invert(xPos - MARGIN.left);

  const hoveredYear = +years[0] + d3.bisectCenter(years, xValue);
  const xBisectPos = x(hoveredYear) + MARGIN.left;

  const innerHTML = `
          <strong>${id} (${hoveredYear})</strong>
          <div>position: ${xPos}, ${yPos}</div>
          <div>value: ${
            data.find((d) => d.year === hoveredYear.toString())[id]
          }</div>
        `;

  console.log(d3.select('#line'));

  d3
    .select('#tooltip')
    .style('top', `${+yPos + MARGIN.top}px`)
    .style('left', `${+xPos + MARGIN.left}px`)
    .style('background', 'white')
    .style('border', '1px solid lightgray')
    .node().innerHTML = innerHTML;

  d3.select('#line').style('left', `${xBisectPos}px`);
};
