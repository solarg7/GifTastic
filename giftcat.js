window.onload = function() {
	
	$(document).ready(function() {

		var animals = ["dog"];

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

				//add the button to the HTML
				$("#buttonContainer"). append(buttonAux);
			}

		}




		$("#add-animal").on("click", function(event){
			//prevent the form from trying to submit itself.
			event.preventDefault();

			//grab the text from the input box
			var animal = $("#animal-input").val().trim();

			//the animal from the textbox is then added to our array
			animals.push(animal);


			//call buttonAddAnimal
			buttonAddAnimal();

		

		});

		buttonAddAnimal();
	});


	
	//document
}
//window 