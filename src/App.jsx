import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 20, right: 10, bottom: 10, left: 30 };

const width = 700;
const height = 400;

const chartColor = {
  x: { color: 'magenta' },
  y: { color: 'purple' },
  z: { color: 'orange' },
  a: { color: 'red' },
  b: { color: 'blue' },
  c: { color: 'green' },
};

const data = [
  {
    name: 'x',
    value: 50,
  },
  {
    name: 'y',
    value: 20,
  },
  {
    name: 'z',
    value: 0,
  },
  {
    name: 'a',
    value: 100,
  },
  {
    name: 'b',
    value: 200,
  },
  {
    name: 'c',
    value: 300,
  },
];

function App() {
  const calledOnce = useRef(false);

  useEffect(() => {
    if (calledOnce.current) return;
    calledOnce.current = true;

    const svg = d3
      .select('body')
      .append('svg')
      .style('background-color', 'lightgray')
      .attr('width', width)
      .attr('height', height + margin.bottom + margin.top);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, 400])
      .range([height + margin.bottom, margin.bottom]);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.name))
      .attr('width', 24)
      .attr('y', (d) => y(d.value))
      .attr('height', (d) => d.value)
      .attr('fill', (d) => chartColor[d.name].color)
      .attr('transform', `translate(${x.bandwidth() / 2 - 12}, 0)`);

    // add the x Axis
    svg
      .append('g')
      .attr('transform', `translate(0, ${height + margin.bottom})`)
      .attr('class', 'xaxis')
      .call(d3.axisBottom(x).tickSizeInner(-10));

    // add the y Axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .attr('class', 'yaxis')
      .call(d3.axisLeft(y).ticks(5).tickSizeInner(-10));
  }, [calledOnce]);

  return (
    <div className="App">
      <header className="App-header">
        <div>hello</div>
      </header>
    </div>
  );
}

export default App;
