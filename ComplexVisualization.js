/*********************************
* Filename: ComplexVisualization.js
* Content: Complex Visualization of Data
***********************************/

// Import external libraries
import d3 from 'd3';
import jQuery from 'jquery';
import moment from 'moment';

// Constants
const WIDTH = 800;
const HEIGHT = 600;
const MARGIN = {top: 50, right: 50, bottom: 50, left: 50};

// Create SVG canvas
const svg = d3.select('body')
  .append('svg')
  .attr('width', WIDTH)
  .attr('height', HEIGHT);

// Read data from API endpoint
d3.json('https://api.example.com/data', function(error, data) {
  if (error) throw error;

  // Data preprocessing
  data.forEach(function(d) {
    d.date = moment(d.date, 'YYYY-MM-DD');
    d.value = +d.value;
  });

  // Scale functions
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, function(d) { return d.date; }))
    .range([MARGIN.left, WIDTH - MARGIN.right]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.value; })])
    .range([HEIGHT - MARGIN.bottom, MARGIN.top]);

  // Line generator function
  const line = d3.line()
    .x(function(d) { return xScale(d.date); })
    .y(function(d) { return yScale(d.value); });

  // Append line to SVG
  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line);

  // Append dots to SVG
  svg.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', function(d) { return xScale(d.date); })
    .attr('cy', function(d) { return yScale(d.value); })
    .attr('r', 3)
    .style('fill', 'steelblue');

  // Append axes to SVG
  const xAxis = d3.axisBottom().scale(xScale);
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0,' + (HEIGHT - MARGIN.bottom) + ')')
    .call(xAxis);

  const yAxis = d3.axisLeft().scale(yScale);
  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(' + MARGIN.left + ',0)')
    .call(yAxis);

  // Append title
  svg.append('text')
    .attr('x', (WIDTH / 2))
    .attr('y', MARGIN.top)
    .attr('text-anchor', 'middle')
    .attr('class', 'title')
    .text('Complex Data Visualization');

  // Add interactivity
  svg.selectAll('.dot')
    .on('mouseover', function(d) {
      d3.select(this).style('fill', 'red');
    })
    .on('mouseout', function(d) {
      d3.select(this).style('fill', 'steelblue');
    });
});

// Add Legend
const legend = svg.append('g')
  .attr('class', 'legend')
  .attr('transform', 'translate(' + (WIDTH - MARGIN.right) + ',' + (MARGIN.top) + ')');

legend.append('rect')
  .attr('class', 'legend-box')
  .attr('width', 100)
  .attr('height', 50)
  .style('fill', 'lightgray');

legend.append('text')
  .attr('x', 50)
  .attr('y', 25)
  .attr('text-anchor', 'middle')
  .text('Legend');

// Styling
d3.selectAll('.line')
  .style('fill', 'none')
  .style('stroke', 'steelblue')
  .style('stroke-width', '2px');

d3.selectAll('.dot')
  .style('stroke', 'white')
  .style('stroke-width', '1.5px');

d3.selectAll('.title')
  .style('font-size', '20px')
  .style('font-weight', 'bold');

d3.selectAll('.legend-box')
  .style('stroke', 'black'); 

// Print completion status
console.log('Complex Visualization complete!');