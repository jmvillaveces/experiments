var angle = 45,
    decrease = 0.1,
    tag = 'body', 
    width = 500, 
    height = 500, 
    iterations = 10, 
    svg = null, 
    data = [{ "x": 1,   "y": 5},  { "x": 20,  "y": 20}];

var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate('linear');


var HTree = function(){

    //The SVG Container
    svg = d3.select(tag).append('svg')
                        .attr('width', width)
                        .attr('height', height);

};


HTree.start = function(){
    svg.append('path')
        .attr('d', lineFunction(data))
        .attr('stroke', 'blue')
        .attr("stroke-width", 2)
        .attr("fill", "none");
};




