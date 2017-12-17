window.onload = function() {
	
	$(document).ready(function() {

		
		//
		var animals = [];

		//function for displaying animal buttons
		function buttonAddAnimal(){

			//delete animals buttons prior to add new animal buttons
			$("#buttonContainer").empty();


			//loop to get the array of animals

			for (var i=0; i< animals.length; i++){
				

				//generate buttons for each animals in the array
				var buttonAux = $("<button>");
				//add a class: "animal"
				buttonAux.addClass("animal");

				//Add a data-attribute with the value of the animals at index i
				buttonAux.attr("data-name", animals[i]);

				//put the button's text with a value of the animal at index i
				buttonAux.text(animals[i]);
				//buttonAux.addClass("animalSelected");


				//add the button to the HTML
				$("#buttonContainer"). append(buttonAux);
				secondAction();
			}
		}


		
		// body...
	
		$("#add-animal").on("click", function(event){
				//prevent the form from trying to submit itself.
				event.preventDefault();

				//grab the text from the input box
				var animal = $("#animal-input").val().trim();

				//the animal from the textbox is then added to our array
				animals.push(animal);
				

				//call buttonAddAnimal
				buttonAddAnimal();
				//check how clean the text-input
				$(".inText").val('');
		});

		// Call the buttonAddAnimal function at least once to display the initial list of movies
		//buttonAddAnimal();

		
		function secondAction() {
		
			//event listener for all created animal buttons
			$(".animal").on("click", function(){

				console.log("hola61");

				//the "this" keyword refers to the button that was clicked
				var animalCall = $(this).attr("data-name");

				//built a URL to search Giphy for the animals from the quote
				var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	                 animalCall + "&api_key=Lg3wEqCc0rjQAnd1ySO0ywtwDIRE66WZ&limit=10";


				$.ajax({
		            url: queryURL,
		            method: "GET"
		          })
		          // After the data comes back from the API
		          .done(function(response) {
		            	// Storing an array of results in the results variable
		            	var listResult = response.data;

			        	for (var i=0; i < listResult.length; i++){
				          	if(listResult[i].rating !== "r" && listResult[i].rating !== "pg-13"){

				          		var gifDivContainer = $("<a>");
				          		var rating = listResult[i].rating;

				          		var p = $("<div>").text("Rating: " + rating);

				          		p.addClass("widthRating");

				          		var animalImage = $("<img>");

				          		gifDivContainer.addClass("gifCss");

				          		animalImage.attr("src", listResult[i].images.fixed_height.url);

				          		gifDivContainer.append(p);
				          		gifDivContainer.append(animalImage);

								var gifAContainer = $("<a>");



								gifAContainer.append(gifDivContainer);


				          		$("#gifContainer").prepend(gifDivContainer);

				        	}
				        }		          
			      
				  });

				
			});
		}

	});	
	//document
}
//window 