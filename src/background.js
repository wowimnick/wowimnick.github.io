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
  
      const bubbleCount = 30;
      const bubbleData = d3.range(bubbleCount).map(() => {
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 100 + 50,
          color: d3.interpolateRainbow(Math.random())
        }
      });
  
      const bubbles = svg.selectAll('circle')
        .data(bubbleData)
        .enter()
        .append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.radius)
        .style('fill', d => d.color);
  
      const update = () => {
        bubbles.data(bubbleData)
          .transition()
          .duration(5000)
          .attr('cx', d => Math.random() * width)
          .attr('cy', d => Math.random() * height)
          .style('fill', d => d3.interpolateRainbow(Math.random()))
          .on('end', update);
      }
  
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