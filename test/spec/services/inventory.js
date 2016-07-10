'use strict';

describe('Service: inventory', function () {

  var $scope,
      httpBackend;
  
  // load the service's module
  beforeEach(module('almachaApp'));

  // instantiate service
  beforeEach(inject(function (_$httpBackend_, _$rootScope_) {
    
    httpBackend = _$httpBackend_;
    $scope = _$rootScope_.$new();
    
    httpBackend.whenGET('/data/inventory.json').respond(200, JSON.stringify([
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
    ]));
    
  }));

  it('shall returns a getter on all the 2 ingredients', function( done ) {
    inject(function (Inventory) {
      
      expect(!!Inventory).toBe(true);
      expect(!!Inventory.getItems).toBe(true);
      
      var ingredients = Inventory.getItems();
      
      $scope.$apply();
      
      ingredients.$promise.then(function ( data ) {
        expect(data.length).toBe(3);
        done();
      });
      
      httpBackend.flush();
    
    });
  });
  
  it('shall decrease the stock when ingredients are used', function( done ) {
    inject(function (Inventory) {
      
      var ingredients = Inventory.getItems();
      
      $scope.$apply();
      
      ingredients.$promise.then(function () {
        console.log('Data : ' + JSON.stringify( ingredients ));
        
        expect(ingredients[0].nbStock).toBe(1);
        expect(ingredients[1].nbStock).toBe(7);
        expect(ingredients[2].nbStock).toBe(12);
        expect(ingredients[0].nbUsed).toBe(3);
        expect(ingredients[1].nbUsed).toBe(3);
        expect(ingredients[2].nbUsed).toBe(2);
        
        Inventory.decreaseStock( [
          'Piment',
          'Poil de chat',
          'Vinaigre'
        ]);
        
        var newIngredientStock = Inventory.getItems();
        
        expect(newIngredientStock[0].nbStock).toBe(0);
        expect(newIngredientStock[1].nbStock).toBe(6);
        expect(newIngredientStock[2].nbStock).toBe(11);
        expect(newIngredientStock[0].nbUsed).toBe(4);
        expect(newIngredientStock[1].nbUsed).toBe(4);
        expect(newIngredientStock[2].nbUsed).toBe(3);
        
        var error;
        try {
          Inventory.decreaseStock( [
            'Piment',
            'Poil de chat',
            'Vinaigre'
          ]);
        } catch ( e ) {
          error = e;
        }
        
        expect(!!error).toBe(true);
        expect(error.errorType).toBe('EmptyStock');
        
        newIngredientStock = Inventory.getItems();
        
        expect(newIngredientStock[0].nbStock).toBe(0);
        
        done();
      });
      
      httpBackend.flush();
    
    });
  });

});
