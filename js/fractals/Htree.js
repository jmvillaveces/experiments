var d3 = require('d3');

var angle = 90,
    ratio = 1.5,//Math.sqrt(2),
    tag = 'body',
    width = 800, 
    height = 500, 
    iterations = 12, 
    svg = null,
    color = null,
    strokeWidth = null;

var deg_to_rad = Math.PI / 180.0;

var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate('linear');

var drawLine = function(x1, y1, x2, y2, l, depth){
    
    var path = svg.append('path')
                .attr('d', lineFunction([{x:x1, y:y1}, {x:x2, y:y2}]))
                .attr('stroke', color(depth))
                .attr('stroke-width', strokeWidth(depth))
                .attr('fill', 'none');
    
    path.attr('stroke-dasharray', l+','+l)
        .attr('stroke-dashoffset', l)
        .transition()
            .duration(500)
            .ease('linear-in-out')
            .attr('stroke-dashoffset', 0);

};

var drawTree = function self(x1, y1, a, l, depth){
	if (depth !== 0){
		var x2 = x1 + (Math.cos(a * deg_to_rad) * l);
		var y2 = y1 + (Math.sin(a * deg_to_rad) * l);
		drawLine(x1, y1, x2, y2, l, depth);
		
        setTimeout(function () {
            self(x2, y2, a - angle, l/ratio, depth - 1);
            self(x2, y2, a + angle, l/ratio, depth - 1);
        }, 500);
        
	}
};

var HTree = function(){

    //The SVG Container
    svg = d3.select(tag).append('svg')
                        .attr('width', width)
                        .attr('height', height);
    
    color = d3.scale.linear()
        .domain([0,iterations])
        .range(['#637939', '#cedb9c']);
    
    strokeWidth = d3.scale.linear()
        .domain([0,iterations])
        .range([1, 8]);

};


HTree.start = function(){
    drawTree(400, 500, -90, 150, iterations);
};

module.exports = HTree;



