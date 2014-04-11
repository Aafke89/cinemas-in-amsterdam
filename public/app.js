var myDataRef = new Firebase('https://movietheatresamstrdm.firebaseio.com/dataset');

// put new variables in firebase
$(document).ready(function(){

            $("#submitForm").on("click", function(){
              alert ("Thanks for adding a movie-theatre!");

                    var movieTheatre = $('#movieTheatre').val();
                    var price = $('#price').val();
                    var bikeDistance = $('#bikeDistance').val();
                    var priceofBeer = $('#priceofBeer').val();
                    var kindOf = $('#kindOf').val();
                    var urlTheatre = $('#urlTheatre').val();
                    var newPushRef = myDataRef.push();
                    newPushRef.set({movieTheatre: movieTheatre, price: price, bikeDistance: bikeDistance, priceofBeer: priceofBeer, kindOf: kindOf});
                    

                
            });
            });



           var showThis;

            $("#choicePom").on("click", function(){
                    return showThis = "pom";               

            });
            $("#choicePob").on("click", function(){
                    return showThis = "pob";               

            });
            $("#choiceDto").on("click", function(){
                    return showThis = "dto";               

            }); 

          

// create a new variable of choice
           /*var choice = function(d) {return d.price};

           /*$("#submitChoice").on("click", function(){

            var choice = $('#showThis').val();

           }) */

      
        //including data as long as firebasereference doesn't work

        var d;

        d3.json('https://movietheatresamstrdm.firebaseio.com/dataset.json', function(data) {
     d = Object.keys(data).map(function(key){return data[key]}); }); /*

        var data = [
        {
      "price" : 4,
      "bikeDistance" : 6,
      "priceofBeer" : 1.5,
      "kindOf" : "other",
      "movieTheatre" : "Filmhuis Cavia",
      "url" : "http://www.filmhuiscavia.nl/"
    },
   {
      "price" : "0",
      "bikeDistance" : "1",
      "priceofBeer" : "2",
      "kindOf" : "jeffrey",
      "movieTheatre" : "slang",
      "url" : "http://deslang.nl/agenda/#.Uz1ona1_uQk"
    },
     {
      "price" : 9.5,
      "bikeDistance" : 0.5,
      "priceofBeer" : 3,
      "kindOf" : "pathe",
      "movieTheatre" : "Pathe de Munt",
      "url" : "http://www.pathe.nl/bioscoop/demunt"
    },
   {
      "price" : 9,
      "bikeDistance" : 2,
      "priceofBeer" : 2.2,
      "kindOf" : "cineville",
      "movieTheatre" : "Kriterion",
      "url": "http://www.kriterion.nl/"
    },
     {
      "price" : 7,
      "bikeDistance" : 2,
      "priceofBeer" : 2.5,
      "kindOf" : "cineville",
      "movieTheatre" : "Cinecentre",
      "url" : "http://www.cinecenter.nl/"
    }]; */


    $(document).ready(function(){

    $("#button").on("click", function()
            { alert ("Look at this beautiful barchart!");


      
      var margin = {top: 20, right: 20, bottom: 100, left: 40},
            width = 500 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        var barPadding = 2;

        var x = d3.scale.ordinal()
            .domain(d3.range(d.length))
            .rangeRoundBands([0, width], .1);

       /* var x = d3.scale.ordinal()
            .domain(d3.range(data.length))
            .rangeRoundBands([0, width], .1); */

        var y = d3.scale.linear()
            .domain([0, d3.max(d, function (d) { 
                if 
                    (showThis == "pob")
                    {return d["priceofBeer"]}
                else if 
                    (showThis == "pom")
                    {return d["price"]}
                else
                    {return d["bikeDistance"]}
            })])  
            .rangeRound([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));

        var svg = d3.select("#barchart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            x.domain(d.map (function(d) {return d["movieTheatre"];}));

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr(
                      "transform", function (d){
                            return "rotate(-20)"
                        });

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(function (d){
                        if 
                    (showThis == "pob")
                    {return "price of beer";}
                else if 
                    (showThis == "pom")
                    {return "price of a movie";}
                else
                    {return "distance to OHMP";}
                    });


            svg.selectAll("rect")
            .data(d)
            .enter()
            .append("rect")
            .attr("width", width/ d.length - barPadding)
            .attr("height", function (d){ 
                if 
                    (showThis == "pob")
                    {return height - y(d["priceofBeer"]);}
                else if 
                    (showThis == "pom")
                    {return height - y(d["price"]);}
                else
                    {return height - y(d["bikeDistance"]);}
            })           
            .attr("x", function(d, i) {
                return i * (width / d.length) })
            .attr("y", function(d) { 
                if 
                    (showThis == "pob")
                    {return y(d["priceofBeer"]);}
                else if 
                    (showThis == "pom")
                    {return y(d["price"]);}
                else
                    {return y(d["bikeDistance"]);}
            })               
             .attr("fill", function(d) {
                if (d["kindOf"] == "cineville")
                    {return "blue";}
                else if (d["kindOf"] === "pathe")
                    {return "yellow";}
                else if (d["kindOf"] === "jeffrey")
                    {return "orange";}
                else 
                    {return "purple";}
             })
             .attr("xlink:href", function (d) {
                return d.url;
             })
             .on("click", function(d){
                     window.location = d["url"];
           });                     

                    

         });

});