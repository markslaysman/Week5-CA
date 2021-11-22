
//Create a menu driven app using prompts to manage various characters

//create Character class
class Character{
    constructor(name, type, powerLevel, phrase){
        this.name = name;
        this.type = type;
        this.powerLevel = powerLevel;
        this.phrase = phrase;
    }

    sayCatchPhrase(){
        if (typeof this.prhase !== 'undefined'){
            return this.phrase;
        } else {
            return ('I need a catch phrase.');
        }
        
    }
}

//create Team class
class Team {
    constructor(name) {
        this.name = name;
        this.characters = [];
    }

    //method to add a character to an array for Team assuming character is of the Character Class
    addCharacter(character) {
        if (character instanceof Character){
            this.characters.push(character);
        } else {
            throw new Error(`You can only add an instnace of Character. Argument is not a character: ${character}`);
        }
    }

    //method to print out information of the team
    describe() {
        return (`${this.name} has ${this.characters.length} characters.`);
    }
}

//create the Menu class
class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }

    //method to call other methods depending on user input
    start() {
        let selection = this.showMainMenuOptions();
        
        while (selection != 0) {
            switch (selection) {
                case '1' :
                    this.createTeam();
                    break;
                case '2' :
                    this.viewTeam();
                    break;
                case '3' :
                    this.deleteTeam();
                    break;
                case '4' :
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert('Goodbye!');
    }

    //method to show main menu options
    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new team
            2) view team
            3) delete team
            4) display all teams
        `);
    }

    //method to show Team Menu Options
    showTeamMenuOptions(teamInfo) {
        return prompt(`
            0) back
            1) create character
            2) delete character
            ==============================
            ${teamInfo}
        `);
    }

    //method to display a list of Teams
    displayTeams() {
        let teamString = '';

        for (let i = 0; i < this.teams.length; i++){
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        
        alert(teamString);
    }

    //method to create a new team
    createTeam() {
        let name = prompt('Enter name for new team:');
        this.teams.push(new Team(name));
    }

    //method to display information about the selected Team
    viewTeam() {
        let teamListPrompt = 'Enter the index of the team you wish to view: \n';

        for (let i = 0; i < this.teams.length; i++){
            teamListPrompt += i + ') ' + this.teams[i].name + '\n';
        }

        let index = prompt(teamListPrompt);
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.characters.length; i++) {
                description += i + ') ' + this.selectedTeam.characters[i].name + ' - ' + this.selectedTeam.characters[i].type + '\n';
            }

            let selection = this.showTeamMenuOptions(description);

            switch(selection) {
                case '1' :
                    this.createCharacter();
                    break;
                case '2' :
                    this.deleteCharacter();
                    break;
                default :
                    break;
            }
        }
    }

    //method to delete a team
    deleteTeam() {
        let teamListPrompt = 'Enter the index of the team you wish to delete: \n';

        for (let i = 0; i < this.teams.length; i++){
            teamListPrompt += i + ') ' + this.teams[i].name + '\n';
        }

        let index = prompt(teamListPrompt);
        if (index >-1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
    }

    //method to create a new character
    createCharacter() {
        let name = prompt('Enter the name of your character:');
        let position = prompt('Enter the characters type (Hero/Villian):');
        let powerLevel = prompt('Enter the characters power level:');
        let phrase = prompt('Enter the chracters catch phrase:')

        this.selectedTeam.characters.push(new Character(name, position, powerLevel, phrase));
    }

    //method to delete a player
    deleteCharacter() {
        let characterListPrompt = 'Enter the index of the character you wish to delete: \n';

        for (let i = 0; i < this.selectedTeam.characters.length; i++){
            characterListPrompt += i + ') ' + this.selectedTeam.characters[i].name + '\n';
        }

        let index = prompt(characterListPrompt);
        if (index >-1 && index < this.selectedTeam.characters.length) {
            this.selectedTeam.characters.splice(index, 1);
        }
    }
}

//Create an instance of the menu
let menu = new Menu();

//Run the menu
menu.start();

