import React, { Component } from 'react';
import * as d3 from 'd3';

class BlurredBackground extends Component {
  componentDidMount() {
    this.createBubbles();
  }

  createBubbles() {
    const container = d3.select('.container');
    const width = container.node().getBoundingClientRect().width;
    const height = container.node().getBoundingClientRect().height;

    const svg = container.append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('position', 'absolute')
      .style('top', 0)
      .style('left', 0)
      .style('z-index', -2);

    const bubbleCount = 15;
    const bubbleData = d3.range(bubbleCount).map(() => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 100 + 400,
        gradientColor: d3.scaleLinear()
          .domain([0, 1])
          .range([
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0)`
          ]),
      }
    });

    const bubbles = svg.selectAll('circle')
      .data(bubbleData)
      .enter()
      .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.radius)
      .style('fill', d => `url(#gradient-${d.radius})`);

    const update = () => {
      bubbles.data(bubbleData)
        .transition()
        .duration(10000)
        .ease(d3.easeQuadInOut)
        .attr('cx', d => Math.random() * width)
        .attr('cy', d => Math.random() * height)
        .styleTween('fill', function(d) {
          const i = d3.interpolateRgb(
            d.gradientColor(0),
            d.gradientColor(1)
          );
          return t => {
            const color = i(t);
            return `url(#gradient-${d.radius})`;
          }
        })
        .on('end', update);
    }

    bubbleData.forEach(d => {
      const gradient = svg.append('defs')
        .append('radialGradient')
        .attr('id', `gradient-${d.radius}`)
        .attr('cx', '50%')
        .attr('cy', '50%')
        .attr('r', '40%')
        .selectAll('stop')
        .data([
          { offset: '1%', color: d.gradientColor(0) },
          { offset: '99%', color: d.gradientColor(1) }
        ])
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);
    });

    update();
  }

  render() {
    return (
      <div className="container">
      </div>
    );
  }
}

export default BlurredBackground;