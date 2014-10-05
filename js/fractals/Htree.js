var d3 = require('d3');

var angle = 45,
    decrease = 0.1,
    tag = 'body', 
    width = 500, 
    height = 500, 
    iterations = 10, 
    svg = null,
    line = null,
    data = [];

var lineFunction = d3.svg.line()
                         .x(function(d) { return d.x; })
                         .y(function(d) { return d.y; })
                         .interpolate('linear');

var op = function(angle, h){
    return Math.sin(angle)*h;
};

var ad = function(angle, h){
    return Math.cos(angle)*h;
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

var calculate = function myself(line){
    
    if(iterations > 0){
        data.push(line);
        
        var newLine = [line[1]];
        newLine.push({x: line[1].x + op(angle, 100), y: line[1].y +ad(angle, 100)});
        
        iterations --;
        
        
        myself(newLine); 
    }
    
    paint();
};

var HTree = function(){

    //The SVG Container
    svg = d3.select(tag).append('svg')
                        .attr('width', width)
                        .attr('height', height);

};


HTree.start = function(){
    calculate([{x:10,y:10},{x:10,y:100}]);
};

module.exports = HTree;



