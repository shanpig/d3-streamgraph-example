import {
  highlight,
  resumeHighlight,
  MARGIN,
  WIDTH,
  HEIGHT,
  showPosition,
} from './utils';
import { useEffect } from 'react';
import * as d3 from 'd3';

const Chart = () => {
  useEffect(() => {
    // Clean up elements
    if (document.querySelector('#stream-graph-2').innerHTML)
      document.querySelector('#stream-graph-2').innerHTML = '';
    // append the svg object to the body of the page
    const svg = d3.select('#stream-graph-2').append('svg');

    svg
      .attr('width', WIDTH + MARGIN.left + MARGIN.right)
      .attr('height', HEIGHT + MARGIN.top + MARGIN.bottom)
      .append('g')
      .attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')')
      .attr('id', 'graph-area');

    // Parse the Data
    d3.csv('./travel.csv').then((data) => {
      // Get keys for the stream graph(remove years)
      const keys = data.columns.slice(1, -2);

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.year))
        .range([0, WIDTH]);

      // Add Y axis
      const y = d3.scaleLinear().domain([-4000000, 4000000]).range([HEIGHT, 0]);

      svg
        .append('g')
        .attr('transform', `translate(${MARGIN.left}, ${HEIGHT + MARGIN.top})`)
        .attr('id', 'x-axis')
        .style('font', '14px times')
        .call(d3.axisBottom(x).ticks(5));

      svg
        .append('g')
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
        .attr('id', 'y-axis')
        .style('font', '14px times')
        .call(d3.axisLeft(y));

      // color palette
      const color = d3
        .scaleOrdinal()
        .domain(keys)
        .range([
          '#063971',
          '#C93C20',
          '#00BB2D',
          '#633A34',
          '#20214F',
          '#DC9D00',
          '#308446',
          '#ffff33',
          '#102C54',
          '#EFA94A',
          '#4C514A',
          '#e41a1c',
          '#474A51',
          '#B5B8B1',
          '#377eb8',
          '#984ea3',
          '#2C5545',
        ]);

      //stack the data
      const stackedData = d3
        .stack()
        .offset(d3.stackOffsetSilhouette)
        .keys(keys)(data);

      const mouseover = (e) => {
        highlight(e.target);
      };

      const mousemove = (e) => {
        showPosition(e, data, x);
      };

      const mouseleave = resumeHighlight;

      // Show the areas
      svg
        .select('#graph-area')
        .on('mousemove', mousemove)
        .selectAll('mylayers')
        .data(stackedData)
        .enter()
        .append('path')
        .attr('class', 'area')
        .attr('id', (d) => d.key)
        .style('fill', (d) => color(d.key))
        .attr(
          'd',
          d3
            .area()
            .x((d) => x(d.data.year))
            .y0((d) => y(d[0]))
            .y1((d) => y(d[1]))
        )
        .on('mouseover', mouseover)
        .on('mouseleave', mouseleave);
    });
  }, []);

  return <div id="stream-graph-2"></div>;
};

export default Chart;
