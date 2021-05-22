/* APPLICATION STATE */
let state = {
  data: [],
  selection: "All", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('./data/Open_Restaurant_Applications_Bronx.csv', (d) =>{ 

  return{
      
      seating: d.seating_interest,
      name: d.rest_name,
      zipcode: d.Postcode,
      address: d.business_address 

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
  

  const selectElement = d3.select("#dropdown")

  const selectElement2 = d3.select("#dropdown2")

  const selectElement3 = d3.select("#dropdown3")

  // add in dropdown options from the unique values in the data
  selectElement.selectAll("option")
    .data([
    
      // add in all the unique values from the dataset
      ...new Set(state.data.map(d => d.zipcode))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)

    selectElement.on("change", event =>{
        state.selection = event.target.value
        })
    
    selectElement2.selectAll("option")
    .data([
    
        // add in all the unique values from the dataset
        ...new Set(state.data.map(d => d.zipcode))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)

    selectElement3.selectAll("option")
    .data([
    
        // add in all the unique values from the dataset
        ...new Set(state.data.map(d => d.zipcode))])
    .join("option")
    .attr("attr", d => d)
    .text(d => d)


  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  const filteredData = state.data
    .filter(d => d.zipcode === state.selection)

  yScale
  .domain(d3.extent(filteredData, d=>d.zipcode))

 
}