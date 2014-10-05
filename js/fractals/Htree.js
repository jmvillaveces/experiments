var d3 = require('d3');

var angle = -90,
    decrease = 0.3,//Math.sqrt(2),
    tag = 'body',
    width = 800, 
    height = 500, 
    iterations = 10, 
    svg = null;

var deg_to_rad = Math.PI / 180.0;

var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate('linear');

var drawLine = function(x1, y1, x2, y2){

    svg.append('path')
            .attr('d', lineFunction([{x:x1, y:y1}, {x:x2, y:y2}]))
            .attr('stroke', 'blue')
            .attr("stroke-width", 2)
            .attr("fill", "none");

};

var drawTree = function self(x1, y1, angle, depth){
	if (depth !== 0){
		var x2 = x1 + (Math.cos(angle * deg_to_rad) * depth * 10.0);
		var y2 = y1 + (Math.sin(angle * deg_to_rad) * depth * 10.0);
		drawLine(x1, y1, x2, y2, depth);
		self(x2, y2, angle - 20, depth - 1);
		self(x2, y2, angle + 20, depth - 1);
	}
};

var HTree = function(){

    //The SVG Container
    svg = d3.select(tag).append('svg')
                        .attr('width', width)
                        .attr('height', height);

};


HTree.start = function(){
    drawTree(400, 500, angle, iterations);
};

module.exports = HTree;



