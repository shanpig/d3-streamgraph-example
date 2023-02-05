import {
  highlight,
  resumeHighlight,
  MARGIN,
  WIDTH,
  HEIGHT,
  logPosition,
} from './utils';
import { useEffect } from 'react';
import * as d3 from 'd3';

const Chart = () => {
  useEffect(() => {
    // Clean up elements
    if (document.querySelector('#stream-graph').innerHTML)
      document.querySelector('#stream-graph').innerHTML = '';

    // append the svg object to the body of the page
    const svg = d3.select('#stream-graph').append('svg');

    svg
      .attr('width', WIDTH + MARGIN.left + MARGIN.right)
      .attr('height', HEIGHT + MARGIN.top + MARGIN.bottom)
      .append('g')
      .attr('transform', 'translate(' + MARGIN.left + ',' + MARGIN.top + ')')
      .attr('id', 'graph-area');

    // Parse the Data
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv'
    ).then((data) => {
      // Get keys for the stream graph(remove years)
      const keys = data.columns.slice(1);

      // Add X axis
      const x = d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.year))
        .range([0, WIDTH]);

      // Add Y axis
      const y = d3.scaleLinear().domain([-100000, 100000]).range([HEIGHT, 0]);

      svg
        .append('g')
        .attr('transform', `translate(${MARGIN.left}, ${HEIGHT + MARGIN.top})`)
        .attr('id', 'x-axis')
        .call(d3.axisBottom(x).ticks(5));

      svg
        .append('g')
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
        .attr('id', 'y-axis')
        .call(d3.axisLeft(y));

      // color palette
      const color = d3
        .scaleOrdinal()
        .domain(keys)
        .range([
          '#e41a1c',
          '#377eb8',
          '#4daf4a',
          '#984ea3',
          '#ff7f00',
          '#ffff33',
          '#a65628',
          '#f781bf',
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
        logPosition(e, x, y);
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

  return <div id="stream-graph"></div>;
};

export default Chart;
