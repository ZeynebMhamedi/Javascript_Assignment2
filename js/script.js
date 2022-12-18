window.onload= init;

const iconURL = 'https://courses.edx.org/assets/courseware/v1/bf2c92c196aef2a466934d8b167f404b/asset-v1:W3Cx+JS.0x+2T2022+type@asset+block/yHyDPio.png';


// The Game manager as a global variable
let cm; 

function init() { 
	// create an instance of the game manager
	cm = new GameManager();
	
  	cm.addTestData();
    cm.load();
  	cm.printGamesToConsole();

	  // Display games in a table
	  // Pass the id of the HTML element that will contain the table
	  cm.displayGamesAsATable("games");

      
      document.querySelector('#gameSearchInput').addEventListener('input', (event) => {
        findGame(event.target.value);
      })

    document.querySelector('select').addEventListener('input', (event) => {
        if (event.target.value === 'editeur')
            cm.listOfGames.sort(GameManager.compareByEditeur);
        else
            cm.listOfGames.sort(GameManager.compareByName);
        cm.displayGamesAsATable('games');
    })

}

function findGame(name_game) {
    // get all the games
    const games = cm.listOfGames;
    const regex = new RegExp(`${name_game}`, 'i')
    const result = games.filter(game => game.name_game.match(regex));
    console.log(result);

    cm.displayGamesAsATable('games', result)
}


function formSubmitted() {
	// Get the values from input fields
	let name_game = document.querySelector("#name_game");
  	let disponible_sur = document.querySelector("#disponible_sur");
    let editeur = document.querySelector("#editeur");
    let categorie = document.querySelector("#categorie");
    let url = document.querySelector("#url");
    
	let newGame = new Game(name_game.value, disponible_sur.value, editeur.value, categorie.value, url.value);
	cm.add(newGame);
	
	// Empty the input fields
	name_game.value = "";
	disponible_sur.value = "";
    editeur.value = "";
    categorie.value = "";
    url.value = "";

	
	// refresh the html table
	cm.displayGamesAsATable("games");
	
	// do not let your browser submit the form using HTTP
	return false;
}

function emptyList() {
	cm.empty();
  	cm.displayGamesAsATable("games");
}

function loadList() {
	cm.load();
  	cm.displayGamesAsATable("games");
}


class Game {
	constructor(name_game, disponible_sur, editeur, categorie, url) {
		this.name_game = name_game;
		this.disponible_sur = disponible_sur;
        this.editeur = editeur;
        this.categorie = categorie;
        this.url = url;
	}
}

class GameManager {
	constructor() {
		// when we build the Game manager, it
		// has an empty list of games
		this.listOfGames = [];
	}
	
	addTestData() {
		var g1 = new Game("Elden Ring", "PlayStation 4, PlayStation 5, Xbox One, Xbox Series X/S, PC", "Software Inc., Hidetaka Miyazaki, George R. R. Martin et Bandai Namco Games", "Action-Aventure, RPG", "https://www.senscritique.com/jeuvideo/elden_ring/39703970");
        var g2 = new Game("Stray", "PC, PlayStation 4 et PlayStation 5", " BlueTwelve Studio et Annapurna Interactive", "Aventure", "https://www.senscritique.com/jeuvideo/stray/42389819");
        var g3 = new Game("God of War: Ragnarök", "PlayStation 4, PlayStation 5", "SIE Santa Monica Studio, Valkyrie Entertainment, Sony Interactive Entertainment et PlayStation Studios", "Action-Aventure", "https://www.senscritique.com/jeuvideo/god_of_war_ragnarok/35890150");

		this.add(g1);
		this.add(g2);
        this.add(g3);

		// Let's sort the list of games by Name
		this.sort();
	}
	
	// Will erase all games
	empty() {
		this.listOfGames = [];
	}
	
	add(game) {
		this.listOfGames.push(game);
	}
	
	remove(game) {
		for(let i = 0; i<this.listOfGames.length; i++) { 
			var g = this.listOfGames[i];

			if(g.name_game === game.name_game) {
				// remove the Game at index i
				this.listOfGames.splice(i, 1);
				// stop/exit the loop
				break;
			}
		}
	}
	
	sort() {
		this.listOfGames.sort(GameManager.compareByName);
	}
	
	// class method for comparing two games by name
	static compareByName(g1, g2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (g1.name_game < g2.name_game)
     		return -1;
		
    	if (g1.name_game > g2.name_game)
     		return 1;
  
    	return 0;
	}

    // class method for comparing two games by editeur
	static compareByEditeur(g1, g2) {
		// JavaScript has builtin capabilities for comparing strings
		// in alphabetical order
		if (g1.editeur < g2.editeur)
     		return -1;
		
    	if (g1.editeur > g2.editeur)
     		return 1;
  
    	return 0;
	}
	
	printGamesToConsole() {
		this.listOfGames.forEach(function(g) {
			console.log(g.name_game);
		});
	}
	
	load() {
		if(localStorage.games !== undefined) {
			// the array of games is savec in JSON, let's convert
			// it back to a reak JavaScript object.
			this.listOfGames = JSON.parse(localStorage.games);
		}
	}
	
	save() {
		// We can only save strings in local Storage. So, let's convert
		// ou array of games to JSON
		localStorage.games = JSON.stringify(this.listOfGames);
	} 
	
  	displayGamesAsATable(idOfContainer, gamesArr = null) {
		
        if (gamesArr === null)
            gamesArr = this.listOfGames;

        // empty the container that contains the results
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(gamesArr.length === 0) {
			container.innerHTML = "<p>Aucun jeu à afficher!</p>";
			return;
		}  
  
    	// creates and populate the table with users
    	var table = document.createElement("table");
          
    	// iterate on the array of users
    	gamesArr.forEach((currentGame, index) => {
        	// creates a row
        	var row = table.insertRow();

            // create a delete button
            let iconCell = document.createElement('td');
            let trashBin = document.createElement('img');
            trashBin.src = iconURL;
            trashBin.dataset.gameId = index;
            iconCell.append(trashBin);

            


            // TODO create game name
            let nameTd = document.createElement('td');
            let nameLabel = document.createElement('label');
            nameLabel.htmlFor = 'nameInput' + index;
            nameLabel.innerHTML = currentGame.name_game;
            // handle click on name label
            nameLabel.addEventListener('click', () => {
                nameLabel.classList.toggle('hide');
                nameInput.classList.toggle('hide');
            })
            // hide that input and show on click
            let nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.value = currentGame.name_game;
            nameInput.id = 'nameInput' + index;
            nameInput.classList.toggle('hide');
            // handle input for name
            nameInput.addEventListener('input', () => {
                currentGame.name_game = nameInput.value;
                nameLabel.innerHTML = nameInput.value;
            })
            // handle blur
            nameInput.addEventListener('blur', () => {
                nameLabel.classList.toggle('hide');
                nameInput.classList.toggle('hide');

            })
            // add all to nameCell
            nameTd.append(nameLabel);
            nameTd.append(nameInput);
         



            // TODO create disponible_sur
            let disponible_surTd = document.createElement('td');
            let disponible_surLabel = document.createElement('label');
            disponible_surLabel.htmlFor = 'disponible_surInput' + index;
            disponible_surLabel.innerHTML = currentGame.disponible_sur;
            // handle click on disponible_sur label
            disponible_surLabel.addEventListener('click', () => {
                disponible_surLabel.classList.toggle('hide');
                disponible_surInput.classList.toggle('hide');
            })
            // hide that input and show on click
            let disponible_surInput = document.createElement('input');
            disponible_surInput.type = 'text';
            disponible_surInput.value = currentGame.disponible_sur;
            disponible_surInput.id = 'disponible_surInput' + index;
            disponible_surInput.classList.toggle('hide');
            // handle input for disponible_sur
            disponible_surInput.addEventListener('input', () => {
                currentGame.disponible_sur = disponible_surInput.value;
                disponible_surLabel.innerHTML = disponible_surInput.value;
            })
            // handle blur
            disponible_surInput.addEventListener('blur', () => {
                disponible_surLabel.classList.toggle('hide');
                disponible_surInput.classList.toggle('hide');

            })
            // add all to disponible_sur Cell
            disponible_surTd.append(disponible_surLabel);
            disponible_surTd.append(disponible_surInput);




            // TODO create editeur
            let editeurTd = document.createElement('td');
            let editeurLabel = document.createElement('label');
            editeurLabel.htmlFor = 'editeurInput' + index;
            editeurLabel.innerHTML = currentGame.editeur;
            // handle click on editeur label
            editeurLabel.addEventListener('click', () => {
                editeurLabel.classList.toggle('hide');
                editeurInput.classList.toggle('hide');
            })
            // hide that input and show on click
            let editeurInput = document.createElement('input');
            editeurInput.type = 'text';
            editeurInput.value = currentGame.editeur;
            editeurInput.id = 'editeurInput' + index;
            editeurInput.classList.toggle('hide');
            // handle input for editeur
            editeurInput.addEventListener('input', () => {
                currentGame.editeur = editeurInput.value;
                editeurLabel.innerHTML = editeurInput.value;
            })
            // handle blur
            editeurInput.addEventListener('blur', () => {
                editeurLabel.classList.toggle('hide');
                editeurInput.classList.toggle('hide');

            })
            // add all to editeur Cell
            editeurTd.append(editeurLabel);
            editeurTd.append(editeurInput);




            // TODO create categorie
            let categorieTd = document.createElement('td');
            let categorieLabel = document.createElement('label');
            categorieLabel.htmlFor = 'categorieInput' + index;
            categorieLabel.innerHTML = currentGame.categorie;
            // handle click on categorie label
            categorieLabel.addEventListener('click', () => {
                categorieLabel.classList.toggle('hide');
                categorieInput.classList.toggle('hide');
            })
            // hide that input and show on click
            let categorieInput = document.createElement('input');
            categorieInput.type = 'text';
            categorieInput.value = currentGame.categorie;
            categorieInput.id = 'categorieInput' + index;
            categorieInput.classList.toggle('hide');
            // handle input for categorie
            categorieInput.addEventListener('input', () => {
                currentGame.categorie = categorieInput.value;
                categorieLabel.innerHTML = categorieInput.value;
            })
            // handle blur
            categorieInput.addEventListener('blur', () => {
                categorieLabel.classList.toggle('hide');
                categorieInput.classList.toggle('hide');

            })
            // add all to categorie Cell
            categorieTd.append(categorieLabel);
            categorieTd.append(categorieInput);



      // TODO create url
            let urlTd = document.createElement('td');
            let urlLabel = document.createElement('label');
            urlLabel.htmlFor = 'urlInput' + index;
            urlLabel.innerHTML = currentGame.url;
            // handle click on url label
            urlLabel.addEventListener('click', () => {
                urlLabel.classList.toggle('hide');
                urlInput.classList.toggle('hide');
            })
            // hide that input and show on click
            let urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.value = currentGame.url;
            urlInput.id = 'urlInput' + index;
            urlInput.classList.toggle('hide');
            // handle input for url
            urlInput.addEventListener('input', () => {
                urlGame.editeur = urlInput.value;
                urlLabel.innerHTML = urlInput.value;
            })
            // handle blur
            urlInput.addEventListener('blur', () => {
                urlLabel.classList.toggle('hide');
                urlInput.classList.toggle('hide');

            })
            // add all to url Cell
            urlTd.append(urlLabel);
            urlTd.append(urlInput);



            // add all TD to the row
            row.append(nameTd);
            row.append(disponible_surTd);
            row.append(editeurTd);
            row.append(categorieTd);
            row.append(urlTd);
            row.append(iconCell);

            

        });

     	// adds the table to the div
     	container.appendChild(table);

         document.querySelectorAll('img').forEach((element) => {
            element.addEventListener('click', () => {
                this.remove(gamesArr[element.dataset.gameId]);
                this.displayGamesAsATable('games');
            })
        })
  	}
}
