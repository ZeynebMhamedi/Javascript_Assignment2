# Javascript_Assignment2

Due date : December 18th, 2022

SUJET : un gestionnaire de "jeux vidéo à tester"

Pour cette assignation, j'ai réalisé une application web qui permet de
gérer la liste des jeux vidéo 2022 que vous n'avez pas encore essayé mais que vous
aimeriez tester quand vous aurez le temps.

Fonctionnalités:

- Le contenu du tableau peut être chargé/sauvegardé depuis LocalStorage.

- Champs à saisir :
a. Nom du jeu
b. Disponible sur (ex. Xbox series, PS5, PC, Switch, Android, IOS)
c. Editeur
d. Catégorie (FPS, action, action aventure, stratégie, etc.)
f. URL avec l'image de de la pochette du jeu

- Le formulaire ne peut pas être soumis si les champs obligatoires sont vides.

- Une fois le formulaire soumis, le tableau des jeux à tester est mis à jour, avec
autant de colonnes qu'il y a de champs de saisie dans le formulaire.

- Ajout d'une colonne supplémentaire sur la droite avec une icône en
forme de poubelle, pour supprimer la ligne quand on clique dessus. 

- Ajout d'un champ de recherche pour rechercher un jeu par son nom :
reconstruction du tableau pour n'afficher que les entrées qui correspondent.

- Amélioration du CSS.

- Ajout d'un header sur le tableau et option de tri du tableau lorsque
vous cliquez sur l'en-tête d'une colonne (par exemple, en cliquant sur "nom", le
tableau sera trié par nom, éditeur par editeur)

- Le tableau des jeux est modifiable. Vous pouvez cliquez sur une
cellule et elle deviendra modifiable. 
(utilisation de l'événement "blur" pour détecter les clics à l'extérieur)
