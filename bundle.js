  // SETUP


// The svg
const svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
  const g = svg.append('g');

// Map and projection
const path = d3.geoPath();
const projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
let data = new Map()
const colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
Promise.all([
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
d3.csv("https://raw.githubusercontent.com/hbnarayanan/cs639/main/movies_map.csv", function(d) {
    data.set(d.Country, +d.count, +d.neflix_sum, +d.hulu_sum , +d.prime_sum , +d.disney_sum)
})
]).then(function(loadData){
    let topo = loadData[0]

    // Draw the map


  g.selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.count= data.get(d.name) || 0;
        return colorScale(d.count);
      })



        svg.call(d3.zoom().on('zoom', () => {
    g.attr('transform', d3.event.transform);
  }));






})


// // The svg
// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");

// // Map and projection
// var path = d3.geoPath();
// var projection = d3.geoNaturalEarth()
//     .scale(width / 2 / Math.PI)
//     .translate([width / 2, height / 2])
// var path = d3.geoPath()
//     .projection(projection);

// // Data and color scale
// var data = d3.map();
// var colorScheme = d3.schemeReds[6];
// colorScheme.unshift("#eee")
// var colorScale = d3.scaleThreshold()
//     .domain([1, 6, 11, 26, 101, 1001])
//     .range(colorScheme);

// // Legend
// var g = svg.append("g")
//     .attr("class", "legendThreshold")
//     .attr("transform", "translate(20,20)");
// g.append("text")
//     .attr("class", "caption")
//     .attr("x", 0)
//     .attr("y", -6)
//     .text("Students");
// var labels = ['0', '1-5', '6-10', '11-25', '26-100', '101-1000', '> 1000'];
// var legend = d3.legendColor()
//     .labels(function (d) { return labels[d.i]; })
//     .shapePadding(4)
//     .scale(colorScale);
// svg.select(".legendThreshold")
//     .call(legend);

// // Load external data and boot
// d3.queue()
//   .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
//   .defer(d3.csv, "https://raw.githubusercontent.com/hbnarayanan/cs639/main/movies_map.csv")
//   .await(ready);

// function ready(error, topo) {
//     // if (error) throw error;

//     // // Draw the map
//     // svg.append("g")
//     //     .attr("class", "countries")
//     //     .selectAll("path")
//     //     .data(topo.features)
//     //     .enter().append("path")
//     //         .attr("fill", function (d){
//     //             // Pull data for this country
//     //             d.count = data.get(d.id) || 0;
//     //             // Set the color
//     //             return colorScale(d.count);
//     //         })
//     //         .attr("d", path);

//   // Draw the map
//   svg.append("g")
//     .selectAll("path")
//     .data(topo.features)
//     .enter()
//     .append("path")
//       // draw each country
//       .attr("d", d3.geoPath()
//         .projection(projection)
//       )
//       // set the color of each country
//       .attr("fill", function (d) {
//         d.total = data.get(d.id) || 0;
//         return colorScale(d.total);
//       });
//     }


  // SETUP
// var filters = {
//     year: [0, 0],
//     sales: [0, 0],
//     genre: [],
//     platform: [],
//     publisher: [],
//     gamename: []
// }
// (function (d3,topojson) {
//   'use strict';

//   const svg = d3.select('svg');

//   const projection = d3.geoNaturalEarth1();
//   const pathGenerator = d3.geoPath().projection(projection);

//   const g = svg.append('g');

//   g.append('path')
//       .attr('class', 'sphere')
//       .attr('d', pathGenerator({type: 'Sphere'}));

//   svg.call(d3.zoom().on('zoom', () => {
//     g.attr('transform', d3.event.transform);
//   }));

//   Promise.all([
//     d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv'),
//     d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
//   ]).then(([tsvData, topoJSONdata]) => {
    
//     const countryName = tsvData.reduce((accumulator, d) => {
//       accumulator[d.iso_n3] = d.name;
//       return accumulator;
//     }, {});
    

//     /*
//     const countryName = {};
//     tsvData.forEach(d => {
//       countryName[d.iso_n3] = d.name;
//     });
//     */
    
//     const countries = topojson.feature(topoJSONdata, topoJSONdata.objects.countries);
//     g.selectAll('path').data(countries.features)
//       .enter().append('path')
//         .attr('class', 'country')
//         .attr('d', pathGenerator)
//       .append('title')
//         .text(d => countryName[d.id]);
    
//   });

// }(d3,topojson));

// var data;

// d3.csv('movies_cleaned.csv')
//   .then(function(csv) {
//     data = csv;
//     console.log(data);
// });


