'use strict';

/**
 * @ngdoc service
 * @name almachaApp.Mixer
 * @description
 * # Mixer
 * Service in the almachaApp.
 */
angular.module('almachaApp')
  .service('Mixer', function () {
    var _nbRequired = 3;
    
    var _ingredientsToMix = [];
    
    return {
      
      getNbRequired: function () {
        return _nbRequired;
      },
      
      getIngredients: function () {
        return _ingredientsToMix;
      },
      
      canMix: function () {
        return _ingredientsToMix.length === _nbRequired;
      },
      
      addIngredient: function ( itemName ) {
        
        console.log("Add ingredient : " + itemName )
        
        if( _ingredientsToMix.length >= _nbRequired ) {
          
          console.log("The mixer is full.")
          
          return;
        }
        
        for( var i = 0; i < _ingredientsToMix.length; i++ ) {
          
          if( _ingredientsToMix[i] === itemName ) {
            
            console.log("This ingredient has already been added.")
            
            return;
          }
          
        }
        
        _ingredientsToMix.push( itemName );
      },
      
      cleanUp: function () {
          _ingredientsToMix = [];
      }
      
    }; // return
    
  });
