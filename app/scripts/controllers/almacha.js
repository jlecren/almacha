'use strict';

/**
 * @ngdoc function
 * @name almachaApp.controller:AlmachaCtrl
 * @description
 * # AlmachaCtrl
 * Controller of the almachaApp
 */
angular.module('almachaApp')
  .controller('AlmachaCtrl', function ( $scope, _, Inventory, Mixer, Recipe ) {
    
    $scope.error = {};
    
    $scope.potion = {};
    
    $scope.listInventoryItems = function () {
      
      return Inventory.getItems();
      
    };
    
    $scope.getIngredientsToMix = function () {
      
      return Mixer.getIngredients();
      
    };
    
    $scope.addIngredientToMix = function ( item ) {
      
      if( Mixer.getIngredients().length === 0 ) {
        this.cleanUp();
      }
      
      if( item.nbStock === 0 ) {
        console.log("No more '" + item.name + "' in stock.");
        return;
      }
      
      Mixer.addIngredient( item.name );
      
    };
    
    $scope.createPotion = function () {
      
      this.error = {};
      
      if( !Mixer.canMix() ) {
        console.log('The mixer requires ' + Mixer.getNbRequired() + ' ingredients.');
        this.error.message = 'Le mixeur a besoin de trois ingrédients pour fonctionner.';
        return;
      }
      
      var recipe = Recipe.fetchRecipe( Mixer.getIngredients() );
      
      console.log('Recipe : ' + JSON.stringify(recipe));
      
      try {
        Inventory.decreaseStock( Mixer.getIngredients() );
      } catch ( e ) {
        console.log(e);
        if( e.errorType === 'EmptyStock') {
          this.error.message = 'Le stock est vide.';
          return;
        }
      }
      
      if( !!recipe ) {
        
        this.potion = {
          name: recipe.name
        };
        
      } else {
        
        console.log('There is no recipe for those ingredients.');
        this.error.message = 'Il n\'existe pas de recette pour ces ingrédients.';
        
      }
      
      Mixer.cleanUp();
      
    };
    
    $scope.cleanUp = function () {
      
      Mixer.cleanUp();
      
      $scope.potion = {};
      
      $scope.error = {};
      
    };
    
  });
