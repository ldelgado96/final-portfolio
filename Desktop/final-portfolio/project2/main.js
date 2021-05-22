/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/data-data.csv', (d) =>{ 

  return{
      
      death_cause: d.Race,
      death_count: +d.mdma,
      gender:d.Sex,
      year: +d.Placebo // How about taking only the year?

  }
})
  .then(data =>{
    console.log("loaded data:",data);
    state.data =data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  
 // + SCALES

 xScale = d3.scaleTime()
 .domain(d3.extent(state.data, d=> d.year)) // getFullYear() function to parse only the year
 .range([margin.left, width - margin.right])
 

 yScale = d3.scaleLinear()
 .domain(d3.extent(state.data, d => d.death_count))
 .range([height - margin.bottom, margin.bottom])

// + AXES 
const x = d3.axisBottom(xScale) 
const y = d3.axisLeft(yScale)

//Create the svg

svg = d3.select("#d3-container")
.append("svg")
.attr("width", width)
.attr("height",height)

// + UI ELEMENT SETUP
// add labels - xAxis
 // + CALL AXES
const xAxisGroup = svg.append("g")
.attr("class", 'xAxis')
.attr("transform", `translate(${0}, ${height - margin.bottom})`) // move to the bottom
.call(x)

const yAxisGroup = svg.append("g")
.attr("class", 'yAxis')
.attr("transform", `translate(${margin.left}, ${0})`) // align with left margin
.call(y)

// add labels - xAxis
xAxisGroup.append("text")
.attr("class", 'axis-title')
.attr("x", width / 2)
.attr("y", 40)
.attr("text-anchor", "middle")
.style("fill","#143774")
.style("font", "20px 'Ubuntu', sans-serif")
.text("Year")

// add labels - yAxis
yAxisGroup.append("text")
.attr("class", 'axis-title')
.attr("x", -40)
.attr("y", height / 2)
.attr("writing-mode", "vertical-rl")
.attr("text-anchor", "middle")
.style("fill","#143774")
.style("font", "20px 'Ubuntu', sans-serif")
.text("Deaths per Year")

// append a new group, g stands for group
svg.append("g")
.attr("class", "xAxis")
.attr("transform", `translate(${0},${height-margin.bottom})`)
.call(x)

svg.append("g")
.attr("class", "yAxis")
.attr("transform", `translate(${margin.left},${0})`)
.call(y)


// Setting up the UI Elements

  /**  const selectElement = d3.select("#dropdown").on("change", function() {

    state.selection = this.value; // + UPDATE STATE WITH YOUR SELECTED VALUE
    console.log("new value is", this.value);

  selectElement
  .selectAll("option")
  .data(["All", "1", "2", "3"]) // + ADD DATA VALUES FOR DROPDOWN
  .join("option")
  .attr("value", d => d)
  .text(d => d);



    draw(); // re-draw the graph based on this new selection
  }); */

  
  const selectElement = d3.select("#dropdown")

  // add in dropdown options from the unique values in the data
  selectElement.selectAll("option")
    .data([
    
      // add in all the unique values from the dataset
      ...new Set(state.data.map(d => d.death_cause))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)

    selectElement.on("change", event =>{

  state.selection = event.target.value
  draw();

})

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  const filteredData = state.data
    .filter(d => d.death_cause === state.selection)

  yScale
  .domain(d3.extent(filteredData, d=>d.death_count))

  // draw line
  const lineFunction = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.death_count))

  svg.selectAll(".line")
  .data([filteredData]) // array data type
  .join("path")
  .attr("class", 'line')
  .attr("fill", "none")
  .attr("stroke", "#143774")
  .transition()
  .duration(1000)
  .attr("d", d => lineFunction(d))
}

