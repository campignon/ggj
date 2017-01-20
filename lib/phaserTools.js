
/* 
Un paquet d'outils et de raccourcis réutilisables d'un projet Phaser à l'autre.
Requiert que la var 'root' contienne l'instance de Phaser ! 
*/

Tools = { 

	saveLocal: function(key, obj){
		localStorage.setItem(key, JSON.stringify(obj));
	},
	getLocal: function(key){
		return JSON.parse(localStorage.getItem(key));
		// null si pas défini
	},

	cliquable: function(cible, clicFunc, overFunc, outFunc, context, pixelPerfect, handCursor){
		// rend un élément cliquable + hover in/out
		if(typeof context == "undefined"){ context = root; }
		if(typeof pixelPerfect == "undefined"){ pixelPerfect = false; }
		if(typeof handCursor == "undefined"){ handCursor = true; }

		cible.inputEnabled = true;
		if(handCursor) cible.input.useHandCursor = true;
		if(pixelPerfect) cible.input.pixelPerfectOver = true;

		cible.events.onInputUp.add(clicFunc, context);
		if(typeof overFunc != "undefined") cible.events.onInputOver.add(overFunc, context);
		if(typeof outFunc != "undefined") cible.events.onInputOut.add(outFunc, context);
	},

	goFullscreen: function(){ // à déclencher au clic sur qq chose...
		root.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

	    if (root.game.scale.isFullScreen){
	        root.game.scale.stopFullScreen();
	    } else {
	        root.game.scale.startFullScreen(false);
	    }		
	},

	// ça c'est super utile, définit le 'this' de la fonction dans un 3ème paramètre !
	setTimeout: function(func, duree, context){
		return root.game.time.events.add(duree, func, context);
	},
	clearTimeout: function(id){
		if(typeof id != "undefined"){ root.game.time.events.remove(id); }
	},

	crispCanvas: function(){
		Phaser.Canvas.setImageRenderingCrisp(root.canvas); // pixels bruts
	},
	smoothCanvas: function(){
		Phaser.Canvas.setImageRenderingBicubic(root.canvas); // pixels lissés
	},

	camFollow: function(cible, lCoef, hCoef){
		// moi j'aime bien 1/3 pour lCoef...
		
		root.game.camera.follow(cible); // camera follow normal

		var largeur = Math.floor(root.game.camera.width * lCoef);
		var hauteur = Math.floor(root.game.camera.height * hCoef);

	    // deadzone manuelle... et centrée
	    root.game.camera.deadzone = new Phaser.Rectangle( 
	      (root.game.camera.width-largeur)/2, // coord x du bord gauche de la deadzone
	      (root.game.camera.height-hauteur)/2, // coord y du bord haut de la deadzone
	      largeur,
	      hauteur
	    );
	},

	tween: function(cible, stuff, time, ease, delay){
		// ex : Tools.tween(this.truc, {x:300}, 800, 'Linear', 500);
		// les easings : Back, Bounce, Circular, Cubic, Elastic, Exponential, Linear, Quadratic, Quartic, Quintic, Sinusoidal 
		if(typeof ease == "undefined"){ ease = "Linear"; }
		if(typeof delay == "undefined"){
			root.game.add.tween(cible).to( stuff, time, ease, true);
		} else {
			root.game.add.tween(cible).to( stuff, time, ease, true, delay);
		}		
	},
	tweenAlpha: function(cible, coef, time){
		this.game.add.tween(cible).to( {alpha: coef}, time, "Linear", true);
	},
	  	
  	extend: function(_class, methods){

  		// permet de créer un prototype qui a déjà toutes les spécif de n'importe quel prototype natif de Phaser !

	  	/*
		function Player(game){		
			this.instanciate([game, 100, 10, 'player', 1]); // 1. les paramètres pour instancier le Phaser.Sprite

			this.init();
		};		
		Player.prototype = Tools.extend(Phaser.Sprite, { // 2. Player étend Phaser.Sprite grâce à ma bidouille de Tools.extend() :)
			init: function(){
				...
			},
		});
	  	*/

	    var _new = Object.create(_class.prototype);
	    for (var prop in methods) {
	      if (methods.hasOwnProperty(prop)){ // ne prend que les propriétés de l'objet lui-même... donc plus léger ?
	        _new[prop] = methods[prop];
	      }
	    }	    
	    _new.instanciate = function(_params, _addToGame){

	      if(typeof _params == 'undefined'){ _params = root.game; } // aucun paramètre...ben faut au minimum l'instance du 'game' Phaser

	      _class.apply(this, _params);

	      if(typeof _addToGame == 'undefined' || _addToGame == true){ 
	      	// le 1er param c'est toujours 'game' pour Phaser...
	      	_params[0].add.existing(this); // adds this sprite to the game
	      }
	    };
    	return _new;
  	},

  	findAllObjects: function(map, layerName){
  		// tous les objets quel que soit leur type
  		var result = new Array();
		map.objects[layerName].forEach(function(element){
		  // if(element.properties && element.properties.type && element.properties.type === type) {
		    //Phaser uses top left, Tiled bottom left so we have to adjust
		    //also keep in mind that some images could be of different size as the tile size
		    //so they might not be placed in the exact position as in Tiled
		    element.y -= map.tileHeight;
		    result.push(element);
		  // }     
		});
		return result;
  	},

	// find objects in a Tiled layer that containt a property called "type" equal to a certain value 
	findObjectsByType: function(type, map, layerName) {
		var result = new Array();
		map.objects[layerName].forEach(function(element){
		  if(element.properties && element.properties.type && element.properties.type === type) {
		    //Phaser uses top left, Tiled bottom left so we have to adjust
		    //also keep in mind that some images could be of different size as the tile size
		    //so they might not be placed in the exact position as in Tiled
		    element.y -= map.tileHeight;
		    result.push(element);
		  }     
		});
		return result;
	},
	createFromTiledObject: function(element, group) {
		var sprite = group.create(element.x, element.y, element.properties.sprite);
		// copy all properties to the sprite
		Object.keys(element.properties).forEach(function(key){
		  sprite[key] = element.properties[key];
		});
	},

	// find objects in a Tiled layer that containt a property called "type" equal to a certain value 
	tileLayerId: function(map, layerName){
		// find layer
		var id = -1;
		map.layers.forEach(function(e, i){
			if(e.name == layerName){
				id = i;
			}
		});
		return id; // -1 s'il n'existe pas !
	},
	tileLayerExists: function(map, layerName){
		return (Tools.tileLayerId(map, layerName)>=0);
	},
	findTilesByType: function(type, map, layerName) {
		var result = new Array();

		// find layer
		/*var id = -1;
		map.layers.forEach(function(e, i){
			if(e.name == layerName){
				id = i;
			}
		});*/
		var layerId = Tools.tileLayerId(map, layerName);
		
		if(layerId<0){
			console.log('findTilesByType() error, no layer named "'+layerName+'" !');
		} else {

			// les propriétés sont à part du layer
			/*var tileproperties = map.tilesets[0].tileProperties;
			console.log(tileproperties);

			var matchingIds = []; // les ids de tuiles concernés

			for(id in tileproperties){
				var node = tileproperties[id];
				node.id = id;

				if(node.type && node.type == type){
					matchingIds.push(node);
				}
			}
			console.log(matchingIds);*/

			// le layer
			var layerData = map.layers[layerId].data;
			var minIndex = 100000;
	        for (var i = 0; i < layerData.length; i++) {
	        	var col = layerData[i];
	        	for (var j = 0; j < col.length; j++) {
	        		var tile = col[j];

	        		if(tile.index > 0){ // tuile non-vide

	        			if(tile.properties.type && tile.properties.type == type){
	        				result.push(tile);
	        			}
	        		}
	        	};
	        };
		}
			
		return result;
	},
	createFromTileType: function(group, type, layer, sheet, delOriginales){
		// crée les sprites et les mets dans un groupe préexistant
		// requis la propriété 'key' sur la tuile... ou pas !

		var layerName = layer.layer.name;
		var map = layer.map;

		if(typeof sheet == 'undefined'){ sheet = false; }
		if(typeof delOriginales == 'undefined'){ delOriginales = true; }

		var tiles = Tools.findTilesByType(type, map, layerName);
		var tilesToRemove = [];
		if(tiles.length>0){

			for (var i = 0; i < tiles.length; i++) {
				var t = tiles[i];

				var key;
				if(sheet != false){ 
					key = sheet; // override de la spritesheet
				} else {
					key = t.key;
				}
				var sprite = group.create(t.x*t.width, t.y*t.height, key);

				// ajoute toutes les propriétés de la tuile définie dans Tiled :)
				// applicables directement
				Object.keys(t.properties).forEach(function(key){
					sprite[key] = t.properties[key];
				});

				if(tilesToRemove.indexOf(t.index)<0){
					// liste des ids de tuiles ordinaires à retirer
					tilesToRemove.push(t.index);
				}
			};
			// console.log('faut remove '+tilesToRemove.length);

			// effacer les tuiles d'origines, qu'on a remplacé par des sprites
			if(delOriginales){

				var compte = 0;
				var tiles = layer.getTiles(0, 0, layer.width, layer.height);
				tiles.forEach(function(tile){    
					if(tilesToRemove.indexOf(tile.index) >= 0){ 
						map.removeTile(tile.x, tile.y, layer);
						compte++;
					}
				});
				// console.log(tiles.length+' tuiles au total');
				// console.log(compte+' tuiles retirées');

				// effacer aussi dans le data, pour le hors-cadre
				var layerId = Tools.tileLayerId(map, layerName);
				var layerData = map.layers[layerId].data;
				var minIndex = 100000;
		        for (var i = 0; i < layerData.length; i++) {
		        	var col = layerData[i];
		        	for (var j = 0; j < col.length; j++) {
		        		var tile = col[j];

		        		if(tilesToRemove.indexOf(tile.index) >= 0){ // tuile qui matche
		        			tile.index = -1;
		        		}
		        	};
		        };
		        map.layers[layerId].data = layerData;
			}
		}
	},
	createFromTile: function(group, tile, tileset, startIndex) { // à cleaner
		// crée un Sprite avec la bonne image
		/*var sprite = group.create(
			tile.x * r3.gridSize, 
			tile.y * r3.gridSize, 
			tileset,
			tile.index - startIndex
		);

		// ajoute toutes les propriétés de la tuile définie dans Tiled :)
		Object.keys(tile.properties).forEach(function(key){
			sprite[key] = tile.properties[key];
		});*/
	},
};