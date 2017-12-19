window.onload = function() {
	
	$(document).ready(function() {

		
		//animals array
		var animals = ["monkey", "elefant", "dog"];

		buttonAddAnimal();

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


				// add bootstrap button style
				buttonAux.addClass("btn btn-default");

				//Add a data-attribute with the value of the animals at index i
				buttonAux.attr("data-name", animals[i]);

				//put the button's text with a value of the animal at index i
				buttonAux.text(animals[i]);
				//buttonAux.addClass("animalSelected");


				//add the button to the HTML
				$("#buttonContainer"). append(buttonAux);
				
			}
			//call function to get 10 gifs with an API
			secondAction();
		}


		
		// function to generate and put the new topic-button on the buttons...
	
		$("#add-animal").on("click", function(event){
				//prevent the form from trying to submit itself.
				event.preventDefault();

				//grab the text from the input box
				var animal = $("#animal-input").val().trim();

				//the animal from the textbox is then added to our array
				animals.push(animal);
				

				//call buttonAddAnimal to built all buttons on the buttons area
				buttonAddAnimal();

				//clean the text-input
				$(".inText").val('');
		});

		
		//a function gets data with API and puts gifs on the gifs area		
		function secondAction() {
		
			//event listener for all created animal buttons
			$(".animal").on("click", function(){

				//clean the gifs area before load a new gifs
				$("#gifContainer").empty();





				//the "this" keyword refers to the button that was clicked and get data-name from it
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
		            	// Storing an array of results in the listResults variable
		            	var listResult = [];
						listResult = response.data;
						console.log(listResult);


						// a loop to generate and put gifs on the gifs areaa
			        	for (var i=0; i < listResult.length; i++){
				          	if(listResult[i].rating !== "r" && listResult[i].rating !== "pg-13"){


				          		// generate a <a> variable
				          		var gifDivContainer = $("<a>");

				          		//read the rating from array
				          		var rating = listResult[i].rating;

				          		// generate a <div> variable p with rating values
				          		var p = $("<div>").text("Rating: " + rating);


				          		//add a class to define a fixed width of rating info banner
				          		p.addClass("widthRating");


				          		//generate a <image> variable amimalImage
				          		var animalImage = $("<img>");

				          		//add class to gifDivContainer
				          		gifDivContainer.addClass("gifCss");


								//add a class to animalImage
				          		animalImage.addClass("gifAction");


				          		//add another attributes to animalImage from array
				          		animalImage.attr("data-state", "still");								

								animalImage.attr("data-still", listResult[i].images.fixed_height_still.url);

								animalImage.attr("data-animated", listResult[i].images.fixed_height.url);

				          		animalImage.attr("src", listResult[i].images.fixed_height_still.url);


				          		//preparing a gif container in to memory
				          		gifDivContainer.append(p);
				          		gifDivContainer.append(animalImage);

								

				          		//add a gif container in to gifs area
				          		$("#gifContainer").prepend(gifDivContainer);
	          						          		

				        	}
				        }
				        //a function is waiting for still or animate the clicked gif 
				        thirdAction ();		          
			      
				  });

				
			});
		}

		//a function is waiting for still or animate the clicked gif 
		function thirdAction (){

			$(".gifAction").on("click", function() {
		      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
		      

		      //listen status of gif
		      var state = $(this).attr("data-state");
		      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
		      // Then, set the image's data-state to animate
		      // Else set src to the data-still value

		      //conditional for change gif status
		      if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animated"));
		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }
		    });



		//cierre function
		}

	});	
	//document
}
//window 