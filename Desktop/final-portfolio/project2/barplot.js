// create 2 data_set
var data1 = [
   {group: "American Indian or native Alaskan", value: 3},
   {group: "Asian", value: 2},
   {group: "Black or African American ", value: 0},
   {group: "Native Hawaiian or other Pacific Islander ", value: 0},
   {group: "White", value: 39},
   {group: "Multiple", value: 2}
];

var data2 = [
    {group: "American Indian or native Alaskan", value: 0},
   {group: "Asian", value: 5},
   {group: "Black or African American ", value: 2},
   {group: "Native Hawaiian or other Pacific Islander ", value: 0},
   {group: "White", value: 30},
   {group: "Multiple", value: 6}
];

var data3 = [
    {group: "American Indian or native Alaskan", value: 3},
   {group: "Asian", value: 7},
   {group: "Black or African American ", value: 2},
   {group: "Native Hawaiian or other Pacific Islander ", value: 0},
   {group: "White", value: 69},
   {group: "Multiple", value: 8}
];

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#gender_viz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data1.map(function(d) { return d.group; }))
  .padding(0.2);
svg.append("g")
    .attr("class", "x axis")
    /* .attr("transform", "translate(0," + height + ")") */
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("font-size",14)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start")

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 80])
  .range([ height, 0]);
svg.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

  

// A function that create / update the plot for a given variable:
function update(data) {

  var u = svg.selectAll("rect")
    .data(data)

  u
    .enter()
    .append("rect")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("x", function(d) { return x(d.group); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", "#1792d2")
    
      	// recreate the mouseovers with the new data
    /** var tooltip = svg.selectAll("rect")
	.data(data)
    tooltip
    .on("mouseover", function(d){
        return tooltip.style("visibility", "visible").text(d.group + ": " + d.value);
    }) **/
   
    
}

// Initialize the plot with the first dataset
update(data1)
