'use strict';

/**
 * @ngdoc service
 * @name almachaApp.recipe
 * @description
 * # recipe
 * Service in the almachaApp.
 */
angular.module('almachaApp')
  .service('Recipe', function (_, $resource ) {
    
    console.log('Query recipes.');
  
    var getRecipeId = function ( ingredientNames ) {
      
      var sortedNames = _.sortBy(ingredientNames);
      
      return sortedNames.join('|');
      
    };
    
    //var PotionsData = $resource('/data/potions.json');
    
    var recipesIndex = {};
    
    $resource('/data/recipes.json').query()
      .$promise.then( function ( allRecipes ) {
        // Build the recipe index
        allRecipes.map( function ( recipe ) { 
          recipesIndex[ getRecipeId( recipe.ingredients ) ] = recipe;
        });
        
    });
    // PotionsData.query()
    //   .$promise.then( function ( allPotions ) {
    //     
    //     var allIngredients = Inventory.getItems();
    //     
    //     // Randomize the creation of the recipes
    //     allPotions.map( function ( potion ) {
    //       _.each(allIngredients, function() {
    //         var indexes = [];
    //         var potionIngredients = [];
    //         
    //         for(var i = 0; i < 3; i++) {
    //           var index = Math.floor((Math.random() * allIngredients.length));
    //           while( index >= allIngredients.length || indexes.indexOf( index ) > 0) {
    //             index = Math.floor((Math.random() * allIngredients.length));
    //           }
    //           indexes.push( index );
    //           potionIngredients.push( allIngredients[ index ].name );
    //         }
    //         
    //         recipes.push( {
    //           'name': potion.name,
    //           'ingredients': potionIngredients
    //         });
    //       });
    //     });
    //     
    //     // Build the recipe index
    //     recipes.map( function ( recipe ) { 
    //       recipesIndex[ getRecipeId( recipe.ingredients ) ] = recipe;
    //     });
    //     
    //   });
    
    return {
      
      fetchRecipe: function ( ingredientNames ) {
        
        var recipeId = getRecipeId(ingredientNames);
        
        return recipesIndex[ recipeId ];
        
      }
      
    };
    
  });
