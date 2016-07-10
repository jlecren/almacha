'use strict';

describe('Controller: AlmachaCtrl', function () {

  // load the controller's module
  beforeEach(module('almachaApp'));
  
  // mock the services
  beforeEach(module({
    
    Inventory: {
      items: [
        {
          'name': 'Piment',
          'nbStock': 1,
          'nbUsed': 3
        },
        {
          'name': 'Poil de chat',
          'nbStock': 7,
          'nbUsed': 3
        },
        {
          'name': 'Vinaigre',
          'nbStock': 12,
          'nbUsed': 2
        }
      ],
      
      getItems: function() { 
        return this.items;
      },
      
      decreaseStock: function( itemNames ) {
        console.log('Decrease stock :' + itemNames);
        expect(itemNames.length).toBe(3);
        
        
      }
    },
    
    Recipe: {
      fetchRecipe: function( itemNames ) {
        console.log('Fetch recipe : ' + itemNames);
        if( itemNames.indexOf('Piment') >= 0 &&
            itemNames.indexOf('Poil de chat') >= 0 &&
            itemNames.indexOf('Vinaigre') >= 0 ) {
              return {
                name: 'Sirop pour la toux'
              };
            }
        return null;
      }
    }
    
  }));

  var AlmachaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlmachaCtrl = $controller('AlmachaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should list the items of the inventory', function () {
    expect(!!scope.listInventoryItems).toBe(true);
    expect(scope.listInventoryItems().length).toBe(3);
  });

  it('should return the ingredients ready to be mixed', inject(function (Mixer) {
    expect(!!scope.getIngredientsToMix).toBe(true);
    
    Mixer.addIngredient('Piment');
    
    expect(scope.getIngredientsToMix().length).toBe(1);
  }));

  it('should add the ingredients into the mixer', inject(function (Mixer) {
    expect(!!scope.addIngredientToMix).toBe(true);
    
    scope.potion.name = 'A previous potion';
    scope.error.message = 'An error had occured before.';
    
    scope.addIngredientToMix('Piment');
    
    expect(Mixer.getIngredients().length).toBe(1);
    expect(!!scope.potion.name).toBe(false); // the potion has been reset
    expect(!!scope.error.message).toBe(false); // the error message has been reset
  }));

  it('should create a potion', inject(function (Mixer) {
    expect(!!scope.createPotion).toBe(true);
    
    Mixer.addIngredient('Piment');
    
    scope.createPotion();
    
    expect(!!scope.error.message).toBe(true);
    
    Mixer.addIngredient('Poil de chat');
    Mixer.addIngredient('Vinaigre');
    
    scope.createPotion();
    
    expect(scope.potion.name).toBe('Sirop pour la toux');
    
    scope.cleanUp();
    
    Mixer.addIngredient('Poil de chat');
    Mixer.addIngredient('Vinaigre');
    Mixer.addIngredient('Citron'); // No recipe for this ingredient
    
    scope.createPotion();
    
    expect(!!scope.error.message).toBe(true);
    
  }));

  it('should clean up the ingredients from the mixer and the previous results', inject(function (Mixer) {
    expect(!!scope.cleanUp).toBe(true);
    
    scope.potion.name = 'A previous potion';
    scope.error.message = 'An error had occured before.';
    
    Mixer.addIngredient('Piment');
    
    scope.cleanUp();
    
    expect(Mixer.getIngredients().length).toBe(0);
    expect(!!scope.error.message).toBe(false);
    expect(!!scope.potion.name).toBe(false);
  }));
});
