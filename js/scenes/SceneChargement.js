//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";

/**
 * Class representant la scène du jeu qui charge les médias.
 * @extends Phaser.Scene
 */

export class SceneChargement extends Phaser.Scene {

	constructor() {
		super("SceneChargement");

		//Propriété de la scène de chargement
		this.barre = null; //La barre pour illustrer le % de chargement
		this.progressionTxt = null; //Le texte pour afficher le % de chargement
	}

	preload() {
		let posX = 0,
			posY = game.config.height / 2,
			largeur = game.config.width,
			hauteur = game.config.height * 0.10;
		this.barre = this.add.rectangle(posX, posY, largeur, hauteur, 0Xe4c8e8);
		this.barre.setOrigin(0, 0.5);

		//Texte pour la progression
		let tailleTexte = Math.round(64 * GrilleMontage.ajusterRatioX());

		this.progressionTxt = this.add.text(game.config.width / 2, game.config.height / 2, "0%", {
			fontFamily: "Fredoka One",
			fontSize: `${tailleTexte}px`,
			fontStyle: "bold",
			color: "#000000",
			align: "center"
		});
		this.progressionTxt.setOrigin(0.5);


		//Chargement des images ***********************************************************
		this.load.setPath("medias/img/");

		this.load.image("logo", "logo.png");
				
		this.load.spritesheet("lettres", "spriteLettres.png", {
			frameWidth: game.lesMots.TAILLE_IMAGE,
			frameHeight: game.lesMots.TAILLE_IMAGE,
        });
        
        this.load.spritesheet("btnJeu", "spriteJouer.png", {
			frameWidth: 328,
			frameHeight: 104
		});

		this.load.spritesheet("btnFullScreen", "spriteScreen.png", {
			frameWidth: 64,
			frameHeight: 64
		});

		//Charger les sons
		this.load.setPath("medias/sons/");
		this.load.audio("bubblePop", ["buble-pop.mp3", "buble-pop.ogg"]);
		this.load.audio("CartoonBubble", ["cartoon-bubbles.mp3", "cartoon-bubbles.ogg"]);

		this.load.on('progress', this.afficherProgression, this);
	}

	/**
	 * Affiche la progression du chargement
	 * @param {Number} pourcentage Taux de chargement exprimé en nombre décimal
	 */
	afficherProgression(pourcentage) {
		this.progressionTxt.text = Math.floor(pourcentage * 100) + " %";
		this.barre.scaleX = pourcentage;
	}

	create() {
		this.scene.start("SceneIntro");
	}
}