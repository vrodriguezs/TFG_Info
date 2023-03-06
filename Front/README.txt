Merci per mirar-t'ho, t'ho agraeixo. T'explico una mica per sobre el meu problema.

El projecte és de moment només front amb React Native i sobre VSCode, l'estic provant amb l'emulador que porta Android Studio.

Estic amb la pantalla de Sign Up i he de guardar certes dades de l'usuari: email, password, gènere, rutina d'exercici i intensitat de l'exercici. Les 3 últimes les he fet amb botons, perquè ho trobo més UX friendly que fer que l'usuari escrigui o utilitzi un drop down. 

Com vull fer que es pugui lliscar la pantalla cap a baix, he posat una FlatList i dins d'aquesta una altra que inclou aquestes 3 últimes categories, perquè no puc posar una FlatList dins d'una ScrollView. Les categories es troben al fitxer FormsData.js i estan en format d'array, on genre, exercise routine i exercise intensity són posicions de l'array i dins de cada una hi ha les opcions (dona, home, etc.).

Com veuràs, a la pantalla es mostren bé les categories però el programa peta quan cliques algún d'aquests botons. He fet que quan un botó estigui seleccionat, el marc es canvïi de color perquè l'usuari tingui feedback del que ha clicat. El onPress el gestiono amb un handleOnPress on li passo l'item (dona, home, etc.) i dins d'aquí faig 2 maps per recórrer el primer array i el que hi ha dins on estan realment les opcions de les categories. La idea és que entri aquest mètode, comprovi el que ha clicat l'usuari i canvïi de color els marcs dels botons (només 1 actiu per cada categoria). Després utilitzo el useState per passar-li la nova informació perquè l'actualitzi.

L'item arriba bé a la funció handleOnPress, el problema (crec) està en la variable newItem i en que es recorrin 2 arrays (un dins l'altra), perquè abans de tot això vaig provar amb 1 sol array on només hi havia 1 categoria i funcionava correctament. Ara mateix el newItem retorna 3 objectes buits, no 3 arrays com sí que fa el select.

Entenc que serà algun problema amb els 2 arrays i el setSelect però porto ja uns dies i no he trobat la manera d'arreglar-ho.

Moltes gràcies de nou per mirar-t'ho.

PD: hi ha un munt de console.logs a la funció handleOnPress, si et molesten treu-los sense problema.