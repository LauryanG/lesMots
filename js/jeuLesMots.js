//Importation des scripts et classes nécessaires
import {
	SceneChargement
} from './scenes/SceneChargement.js';
import {
	SceneIntro
} from './scenes/SceneIntro.js';
import {
	SceneJeu
} from './scenes/SceneJeu.js';
import {
	SceneFinJeu
} from './scenes/SceneFinJeu.js';



//On créera le jeu quand la page HTML sera chargée
window.addEventListener("load", function () {
    //On définit avec des variables les dimensions du jeu sur desktop
    let largeur = 576,
    hauteur = 1024;

    //On vérifie ensuite si le jeu est lu  sur mobile pour ajuster s'il y a lieu les dimensions
    if (navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Tablet")) {
        //On s'assure de mettre le jeu aux dimension en mode Portrait
        largeur = Math.min(window.innerWidth, window.innerHeight);
        hauteur = Math.max(window.innerWidth, window.innerHeight);
    }

	// Object pour la configuration du jeu - qui sera passé en paramètre au constructeur
	let config = {
		scale : {
			mode : Phaser.Scale.FIT,
			autoCenter : Phaser.Scale.CENTER_BOTH,
			width : largeur,
			height : hauteur
		},
		scene: [SceneChargement, SceneIntro, SceneJeu, SceneFinJeu],
        backgroundColor: 0xF5F5F5,
        //Limiter le nombre de pointeurs actifs
        input: {
            activePointers: 1,
        }
    }
    
    let webFontConfig = {
        google: {
            families: ["Fredoka+One"]
        },

        active: function () {
            console.log("Les polices de caractères sont chargées");

            // Création du jeu comme tel - comme objet global pour qu'il soit accessible à toutes les scènes du jeu
            window.game = new Phaser.Game(config);

            window.game.lesMots = {
                TAILLE_IMAGE: 100, //Dimension des images du jeu
                NB_IMAGES: 8, //Le nombre d'images du jeu
                TEMPS_JEU: 60, //Le temps du jeu en secondes
                score: 0, //Score de la partie 
                meilleurScore: 0, //Meilleur score antérieur enregistré			
                NOM_LOCAL_STORAGE: "scoresJeuLesMots" //Sauvegarde et enregistrement du meilleur score pour ce jeu 
            }
        }
    };
    WebFont.load(webFontConfig);
 
}, false);