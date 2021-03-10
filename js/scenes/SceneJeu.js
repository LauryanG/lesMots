//Importation des fichiers classes ou fichiers nécessaires
import {
	GrilleMontage
} from "../utils/GrilleMontage.js";


/**
 * Class representant la scène du jeu comme tel
 */

export class SceneJeu extends Phaser.Scene { 
    constructor() {
        super("SceneJeu");

        this.tempsRestant; // Temps restant pour le jeu
		this.titreTxt; // Text pour restant pour le titre
		this.tempsTxt; // Text pour restant pour le temps
		this.scoreTxt; // Text pour restant pour le scores
		this.tableauLettresSelectionnees = []; // Tableau pour enregistrer les lettres sélectionnées 
		this.tableauMots = []; // Tableau contenant les mots possibles
		this.laGrille; // La grille de montage pour placer les éléments du jeu

		this.sonBulle = null; // Son des bulles
		this.btnFullScreen = null; // Bouton pour arrêter/commencer l'affichage plein écran
		this.btnVerifierMot = null; // Bouton qui vérifie les mots

		this.cellulePremiereLettre = 16; // La cellule qui contient la première lettre

		this.lesLettres = []; // Tableau contenant les lettres pouvant être utiliser
    }

    init() {
		//Initialiser le temps restant
		this.tempsRestant = game.lesMots.TEMPS_JEU;
		//Initialiser le tableau des images sélectionnées
		this.tableauLettresSelectionnees = [];
		// Le tableau avec tous les mots disponible
		this.tableauMots = [
			[5, 3, 0, 2, 7, 6, 4, 1],
			[0, 6, 7, 3, 5, 1],
			[1, 5, 7, 3, 0, 6],
			[0, 2, 1, 4, 3, 5],
			[0, 2, 7, 6, 4, 1],
			[0, 2, 6, 4, 1, 7],
			[4, 3, 6, 0, 2, 1],
			[5, 3, 0, 2, 1, 7],
			[7, 1, 0, 6, 3, 5],
			[1, 0, 2, 6, 3, 7],
			[0, 2, 1, 7, 3],
			[0, 6, 7, 3, 1],
			[0, 6, 7, 3, 5],
			[1, 5, 6, 0, 2],
			[1, 5, 7, 3, 0],
			[1, 7, 3, 0, 2],
			[2, 1, 5, 7, 3],
			[2, 1, 7, 6, 5],
			[2, 6, 4, 1, 7],
			[5, 6, 1, 4, 3],
			[0, 2, 3, 1, 5],
			[0, 2, 3, 1, 7],
			[0, 2, 3, 5, 1],
			[0, 2, 6, 3, 1],
			[0, 2, 6, 3, 7],
			[0, 2, 3, 4, 1],
			[0, 3, 7, 6, 5],
			[0, 6, 7, 5, 1],
			[0, 7, 3, 4, 1],
			[0, 7, 6, 3, 1],
			[3, 0, 6, 5, 1],
			[4, 1, 7, 0, 3],
			[4, 3, 0, 2, 1],
			[4, 3, 0, 7, 6],
			[4, 3, 5, 0, 1],
			[4, 3, 5, 1, 7],
			[4, 6, 0, 2, 1],
			[4, 6, 3, 5, 1],
			[4, 6, 7, 5, 1],
			[5, 3, 0, 2, 1],
			[5, 6, 3, 7, 1],
			[5, 6, 7, 4, 1],
			[7, 3, 0, 2, 1],
			[7, 3, 5, 0, 1],
			[5, 6, 0, 2, 1],
			[7, 6, 5, 0, 1],
			[0, 2, 1, 7],
			[1, 0, 2, 6],
			[1, 7, 3, 0],
			[2, 1, 7, 6],
			[5, 3, 0, 6],
			[7, 1, 3, 5],
			[0, 3, 4, 1],
			[0, 3, 7, 1],
			[0, 6, 3, 5],
			[0, 6, 5, 1],
			[0, 7, 3, 1],
			[2, 3, 1, 7],
			[2, 1, 3, 5],
			[4, 3, 1, 5],
			[5, 3, 1, 7],
			[5, 6, 0, 1],
			[5, 6, 3, 1],
			[5, 6, 3, 7],
			[5, 6, 4, 1],
			[6, 5, 0, 1],
			[6, 7, 4, 1],
			[6, 7, 5, 1],
			[7, 3, 1, 5],
			[7, 3, 4, 1],
			[1, 4, 6, 3],
			[1, 4, 3, 7],
			[7, 6, 3],
			[0, 6, 5],
			[4, 6, 3],
			[4, 6, 5],
			[5, 6, 4],
			[5, 3, 1],
			[4, 3, 7]
		];
		//Initialiser le score
		game.lesMots.score = 0;

		// La cellule de la première lettre
		this.cellulePremiereLettre = 8;

	}

    create() {
        
        //Afficher la grille de montage - pour aider à la mise en page des éléments
		this.laGrille = new GrilleMontage(this, 8, 4);
		//this.laGrille.afficherGrille();
        
		// Les textes******************************************************************************************************************************
		
		// Style des texte
        let tailleTexte = Math.round(30 * GrilleMontage.ajusterRatioX());
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

        //Titre au milieu en haut
        this.titreTxt = this.add.text(game.config.width / 2, 0, "Les mots", style);
        this.titreTxt.setOrigin(0.5, -4)

        //texte du score en haut a gauche
		this.scoreTxt = this.add.text(0, 0, "Score: " + game.lesMots.score, style);
		this.scoreTxt.setOrigin(-0.05, -1);

		// Texte du temps en haute a droite
		this.tempsTxt = this.add.text(game.config.width / 2, 0, "Temps restant: " + this.tempsRestant, style);
        this.tempsTxt.setOrigin(0, -1);

        // Bouton qui vérifie les mots******************************************************************************************************************************
		this.btnVerifierMot = this.add.image(game.config.width / 2, game.config.height, "btnJeu", 2);
		this.laGrille.mettreEchelleProportionMaximale(this.btnVerifierMot, 2.5);
		this.btnVerifierMot.setOrigin(0.5, 4.2);
		this.btnVerifierMot.setInteractive();
		this.btnVerifierMot.name = "BoutonVerifier";

		//Gestionnaire d'événement sur le bouton qui vérifie les mots
		this.btnVerifierMot.on("pointerdown", this.verifierMots, this);
		
		// Le son des bulles
        this.sonBulle = this.sound.add("bubblePop");
		
		// On appel la fonction placerAlphabet
		this.placerAlphabet();

		// //Gestionnaire d'événement sur les lettres
        this.input.on('gameobjectdown', this.choisirLettre, this);
        
        
		//Partir la minuterie pour le temps du jeu
		this.minuterie = this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: this.diminuerTemps,
			callbackScope: this
		});

		//Gestion de l'orientation de l'écran si on n'est pas sur un ordinateur de bureau
		if (!this.sys.game.device.os.desktop === true) {
			this.verifierOrientation();
			//Gestionnaire d'événement sur le bouton
			this.scale.on('resize', this.verifierOrientation, this);
		}

		//Gestion du fullscreen si on est sur ordinateur et que fullscreen est accepté
        if (!this.sys.game.device.os.iOS) {
            if (this.sys.game.device.fullscreen.available) {
				this.btnFullScreen = this.add.image(game.config.width / 2, game.config.height, "btnFullScreen", 1);
				this.btnFullScreen.setOrigin(0.5, 1.3);
				this.btnFullScreen.name = "FullScreen";

                this.btnFullScreen.setInteractive({
                    useHandCursor: true
                });

                //Gestionnaire d'événement sur le bouton
                this.btnFullScreen.on("pointerup", this.mettreOuEnleverPleinEcran, this)
            }
		}
		
		game.lesMots.meilleurScore = localStorage.getItem(game.lesMots.NOM_LOCAL_STORAGE) === null ? 0 : localStorage.getItem(game.lesMots.NOM_LOCAL_STORAGE);
		
	}
	
	update() {
		//Gère l'affichage du bouton plein écran
		if (!this.sys.game.device.os.iOS && this.sys.game.device.fullscreen.available) {
            (!this.scale.isFullscreen) ? this.btnFullScreen.setFrame(1): this.btnFullScreen.setFrame(0);
		}
	}

	/**
	 * Fonction qui places les lettres possible dans un tableau et qui les affiche
	 */
    placerAlphabet() {


		// Instancier les lettres
		let uneLettre,
			cellule = 16; //cellule pour placer la première lettre
		
		// Si le tableau n'est pas vide, on supprime les lettres dans le tableau
		if (this.lesLettres != []) {
			for (let index = 0; index < this.lesLettres.length; index++) {
				this.lesLettres[index].destroy()
			}
		}
		
		// Affiche les lettres
		for (let i = 0; i < game.lesMots.NB_IMAGES; i++) {

			uneLettre = this.add.sprite(0, 0, "lettres", i);
			this.lesLettres.push(uneLettre);
			//Placer l'image dans sa cellule
			this.laGrille.placerIndexCellule(cellule + i, uneLettre);

			//Ajuster l'échelle des images
			this.laGrille.mettreEchelleProportionMaximale(uneLettre, 0.9);
			uneLettre.setInteractive();

			uneLettre.index = i;
			
		}

		//Gestionnaire d'événement sur le bouton pour jouer le son bulle
		this.input.on("gameobjectdown", this.jouerSon, this);
    }

	/**
	 * Gère les lettres choisi par l'utilisateur
	 * @param {Phaser.Pointer} pointer Le dispositif de pointage (souris, doigt...)
	 * @param {*} lettreCible la lettre que l'utilisateur choisi
	 */
    choisirLettre(pointer, lettreCible) {

		// Si le gameObject a un nom, on sort de la fonction
		if (lettreCible.name != "") {
			return;
		}

		// Pousse la lettre de l'utilisateur dans le tableau tableauLettresSelectionnees
		this.tableauLettresSelectionnees.push(lettreCible);

		// Affiche les lettres au bon endroit
		this.laGrille.placerIndexCellule(this.cellulePremiereLettre, lettreCible);
		this.cellulePremiereLettre++;

		// Empêche l'utilisateur de cliquer sur les lettres déjà placées
		lettreCible.removeInteractive();
        

	}

	/**
	 * Vérifie le mot de l'utilisateur avec le tableau des mots possible
	 */
	verifierMots() {
		// Réinitialise la cellule de la première lettre et appel la fonction placerAlphabet pour placer les lettres
		this.cellulePremiereLettre = 8;
		this.placerAlphabet();

		// Vérifie le mot de l'utilisateur avec la banque de mot.
		for (let i = 0; i < this.tableauMots.length; i++) {
			let estPareil = (this.tableauMots[i].length === this.tableauLettresSelectionnees.length) && this.tableauMots[i].every(function (element, index) {
				return element === this.tableauLettresSelectionnees[index].index;
			}.bind(this));

			// Si le mot se trouve dans le tableau, on augmente le score
			if (estPareil === true) {
				game.lesMots.score += this.tableauLettresSelectionnees.length;
				// Mettre à jour le score
				this.scoreTxt.setText(`Score : ${game.lesMots.score}`);
			}

		}

		//Vide le tableau pour les prochains choix
		this.tableauLettresSelectionnees = [];
	}
	
	/**
	 * Joue le son des bulles
	 */
    jouerSon() {
		this.sonBulle.play();
	}
	
	/**
	 * Calcule et affiche le temps restant pour le jeu
	 */
	diminuerTemps() {
		this.tempsRestant--;
		this.tempsTxt.text = "Temps restant: " + this.tempsRestant;

		//Si toutes les secondes sont écoulées, c'est la fin du jeu
		if (this.tempsRestant === 0) {
			//Arrêter la minuterie du jeu
			this.minuterie.destroy();

			//On va à la scène de la fin du jeu
			this.scene.start("SceneFinJeu");
		}
	}

	/**
	 * Vérifie si le jeu est dans la bonne orientation
	 */
	verifierOrientation() {
		if (Math.abs(window.orientation) == 90) {
			//On met le jeu en pause et on arrête le son
			this.scene.pause(this);
			//On affiche la balise <div>
			document.getElementById("orientation").style.display = "block";
		} else {
			//On repart le jeu et le son
			this.scene.resume(this);
			//On enlève l'affichage de la balise <div>
			document.getElementById("orientation").style.display = "none";
		}
	}

	/**
	 * Gère l'affichage plein écran
	 */
	mettreOuEnleverPleinEcran() {
        //Si on n'est pas en mode plein écran on le met, sinon on l'enlève
        if (!this.scale.isFullscreen) {
			this.scale.startFullscreen();
        } else {
			this.scale.stopFullscreen();
			
        }
    }
}