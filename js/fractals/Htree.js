var d3 = require('d3');

var angle = 45,
    decrease = 0.3,//Math.sqrt(2),
    tag = 'body',
    width = 500, 
    height = 500, 
    iterations = 10, 
    svg = null,
    data = [];

var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate('linear');

var toRadians = function(deg) {
    return deg * (Math.PI / 180);
};

var op = function(a, h){
    return Math.sin(a)*h;
};

var ad = function(a, h){
    return Math.cos(a)*h;
};

var paint = function(){
    
    line = svg.selectAll('path').data(data);
    
    line.enter().append('path')
            .attr('d', function(d) {return lineFunction(d);})
            .attr('stroke', 'blue')
            .attr("stroke-width", 2)
            .attr("fill", "none");
                                    
    line.exit().remove();
};

var createLines = function self(point, a, l, n){
    if(n === 0) return;
    
    var rPoint = {x: point.x + op(a, l), y: point.y + ad(a, l)};
    var lPoint = {x: point.x - op(a, l), y: point.y + ad(a, l)};
    
    data.push([point, rPoint]);
    data.push([point, lPoint]);
    
    self(rPoint, a+angle, l-(l*decrease), n-1);
    self(lPoint, a+angle, l-(l*decrease), n-1);
};

var HTree = function(){

    //The SVG Container
    svg = d3.select(tag).append('svg')
                        .attr('width', width)
                        .attr('height', height);

};


HTree.start = function(){
    
    angle = toRadians(angle);
    
    //createLine([{x:0,y:0}], 0, 100, iterations);
    
    createLines({x:200,y:200}, 0, 100, 2);
    
    
    console.log(data);
    paint();
};

module.exports = HTree;



