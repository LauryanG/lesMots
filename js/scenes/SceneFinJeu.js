//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Class representant la scène de la fin du jeu
 */

export class SceneFinJeu extends Phaser.Scene {

	constructor() {
		super("SceneFinJeu");
	}


	create() {
		this.laGrille = new GrilleMontage(this, 3, 4);
        let tailleTexte = Math.round(60 * GrilleMontage.ajusterRatioX());
        let style = {
			fontFamily: "Fredoka One",
            fontSize: `${tailleTexte}px`,
            fontStyle: "bold",
            color: "#000000",
            align: "center",
            wordWrap: {
                width: this.game.config.width * 0.95
            }
		}

		//Vérification et enregistrement du meilleur score
		game.lesMots.meilleurScore = Math.max(game.lesMots.score, game.lesMots.meilleurScore);
		localStorage.setItem(game.lesMots.NOM_LOCAL_STORAGE, game.lesMots.meilleurScore);

		//Texte des scores
		let scoreTxt = "Votre score est : \n" + game.lesMots.score  + "\n";
		scoreTxt += "Meilleur Score : \n" + game.lesMots.meilleurScore + "\n";

		// Affiche le texte
		let texteFin = this.add.text(game.config.width / 2, 0, scoreTxt, style);
		texteFin.setOrigin(0.5, -0.5);

		//Affiche le bouton rejouer
		let boutonJouer = this.add.image(game.config.width / 2, game.config.height, "btnJeu", 1);
		boutonJouer.setOrigin(0.5, 1.5);
		boutonJouer.setInteractive();
		this.input.once("gameobjectdown", this.rejouer, this);
	}

	/**
	 * Fonction qui nous ramène à la scène du jeu
	 * @param {Phaser.Pointer} pointer Le dispositif de pointage (souris, doigt...)
	 */
	rejouer(pointer) {
		//Aller à l'écran de jeu
		this.scene.start("SceneJeu");
	}

}