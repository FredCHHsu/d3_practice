// var data = [4, 8, 15, 16, 23, 42];
//
// // var data = {
// //   Locke:	4,
// //   Reyes:	8,
// //   Ford:	15,
// //   Jarrah:	16,
// //   Shephard:	23,
// //   Kwon:	42
// // }
//
// d3.select('.chart').selectAll('div')
//   .data( data )
//   .enter()
//   .append('div')
//    .text(function(d, i){return d;});
//
// var data = [10, 20, 30];
//
// var calcWidth = function(d){
//   return calWidthScale(d)+"px"
// }
//
// var calWidthScale = d3.scale.linear()
//                 .domain( d3.extent(data) )
//                 .range( [0, 300] );
//
// d3.select('.chart').selectAll('div')
//   .data(data)
//   .text( function(d, i){return d;} )
//   .style({ 'width': calcWidth })
//   .exit()
//   .remove();
// data created by www.json-generator.com

d3 = require('d3');

d3.json("http://www.json-generator.com/api/json/get/chykKqMlvm?indent=2", function (error, data) {

  var svg = d3.select('body').append('svg');

  var xMax = d3.max(data, function(d){ return Math.floor(+d.x); }),
      yMax = d3.max(data, function(d){ return Math.floor(+d.y); });


  var yScale = d3.scale.linear()
              .domain([yMax + 5, 0])
              .range([0, 300]);

  var xScale = d3.scale.linear()
              .domain([0, xMax + 5])
              .range([0, 500]);

  var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom");

  var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left");

  var colors = d3.scale.category20();

  // 增加間距
  var g = svg.append("g")
          .attr("transform", "translate(35, 10)");

  g.append("g")
  .attr("class", "y axis")
  .call(yAxis);

  g.append("g")
  .attr("class", "x axis")
  // 將座標軸移到底部
  .attr("transform", "translate(0, 300)")
  .call(xAxis);

  g.selectAll(".dot")
  .data(data)
  .enter().append("circle")
  .attr({
    "class": "dot",
    "cx": xScale(0), //function(d) { return xScale(d.x); },
    "cy": yScale(0), //function(d) { return yScale(d.y); },
    "r": function(d) { return d.value; },
    'fill': function(d, i){ return colors(i); }
  })
  // 加上動畫效果
  .transition()
  .duration(800)
  .delay(function(d, i){ return i * 100; })
  .attr({
    "cx": function(d) { return xScale(d.x); },
    "cy": function(d) { return yScale(d.y); }
  });
});
