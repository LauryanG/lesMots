//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";

/**
 * Class representant la scène d'intro du jeu
 * @extends Phaser.Scene
 */

export class SceneIntro extends Phaser.Scene {
    constructor(config) {
		super("SceneIntro");
    }
    
    create() {
		// Affiche le logo
        let imgIntro = this.add.image(game.config.width / 2, game.config.height/3, "logo");
		GrilleMontage.mettreEchelleLargeurJeu(imgIntro);
		
		// Affiche le texte des instructions
		let tailleTexte = Math.round(30 * GrilleMontage.ajusterRatioX());
		let instructionsTxt = this.add.text(game.config.width / 2, game.config.height / 2, "Trouvez le plus de mot en 60 secondes", {
			fontFamily: "Fredoka One",
            fontSize: `${tailleTexte}px`,
            fontStyle: "bold",
            color: "#000000"
		});

		instructionsTxt.setOrigin(0.5, -5);

		//Affiche le bouton pour jouer
        let btnJouer = this.add.sprite(game.config.width / 2, game.config.height, "btnJeu", 0);
        btnJouer.setOrigin(0.5, 1.5);

        btnJouer.setInteractive();
        // Lorsque le bouton est appuyer, il joue un son et charge la scène du jeu
		this.sonJouer = this.sound.add("CartoonBubble");
		this.input.once("gameobjectdown", this.jouerSon, this);
		this.input.once("gameobjectdown", this.allerSceneJeu, this);

		//Animer le bouton avec scaleX et scaleY
		this.tweens.add({
			targets: btnJouer,
			scaleX : 1.1,
			scaleY : 1.1,
			ease : 'Linear',
			repeat : -1,
			yoyo : true

		});
    }
    
    //Fait jouer le son
	jouerSon() {
		this.sonJouer.play();
		//console.log("Son");
	}

	//Va a la scène jeu
	allerSceneJeu() {
		this.scene.start("SceneJeu");
	}
}