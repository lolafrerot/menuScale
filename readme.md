
# Menu scale

## Utilisation

direction : choix de l'origine de l'animation

-   top left
-   top right
-   bottom left
-   bottom right

  

menuButton : id du bouton qui ouvre le menu

element : id du bloc à déplier (pas la ul si on veut ajouter du contenu supplémentaire)


    menuScale.option({
    element: '#menuScale',
    menuButton: '#menuToggle',
    direction: 'bottom left',
    submenuTitle: "Ouvrir le sous-menu"
    });
                

  

## Spécificités

Le ul du menu et la div.extra se positionnent l'un à coté de l'autre, extra en premier

Mise en place des aria expanded

Layout utilisant les flexbox

Responsive

Le bouton se situe hors de l'element à déplier

Compliation scss avec le logiciel koala pour une insertion plus facile dans les projets !

Réalisé par Lola FREROT