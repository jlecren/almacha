'use strict';

/**
 * @ngdoc service
 * @name almachaApp.Inventory
 * @description
 * # Inventory
 * Service in the almachaApp.
 */
angular.module('almachaApp')
  .service('Inventory', function ( _, $resource ) {
    
    var InventoryData = $resource('/data/inventory.json');
    
    var ingredients = null;
    
    return {
      
      getItems: function () {
        
        if( ingredients === null ) {
          console.log('Query ingredients.');
          ingredients = InventoryData.query();
        }
        
        return ingredients;
        
      },
      
      decreaseStock: function( itemNames ) {
        console.log('Decrease stock : ' + JSON.stringify( itemNames ) );
        var ingredients = this.getItems();
        var items = [];
        
        // Search for the items
        _.each(itemNames, function ( itemName ) {
          
          for( var i = 0; i < ingredients.length; i++ ) {
            if( ingredients[i].name === itemName ) {
              items.push(ingredients[i]);
              break;
            }
          }
          
        });
        
        // Verify the remaining stock
        var enoughStock = true;
        for(var i = 0; i < items.length; i++) {
          if( items[i].nbStock === 0 ) {
            enoughStock = false;
            break;
          }
        }
        
        // Decrease the stock
        if( enoughStock ) {
          for(i = 0; i < items.length; i++) {
            items[i].nbStock--;
            items[i].nbUsed++;
          }
        } else {
          throw { 'errorType' : 'EmptyStock' };
        }
      }
      
    }; // return
    
  });
