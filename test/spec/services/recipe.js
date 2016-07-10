'use strict';

describe('Service: Recipe', function () {

  // load the service's module
  beforeEach(module('almachaApp'));

  // instantiate service
  var $scope,
      httpBackend;
      
  beforeEach(inject(function (_$httpBackend_, _$rootScope_) {
    
    httpBackend = _$httpBackend_;
    $scope = _$rootScope_.$new();
    
    httpBackend.whenGET('/data/recipes.json').respond(200, JSON.stringify([
      {
        'name': 'Sirop pour la toux',
        'ingredients': ['Piment', 'Poil de chat', 'Vinaigre']
      }, 
      {
        'name': 'Invisibilité',
        'ingredients': ['Jus de citron', 'Pattes de pigeon', 'Piment']
      }, 
      {
        'name': 'Aiguise-Méninges',
        'ingredients': ['Alcool', 'Bave de lama', 'Diamant']
      }
    ]));
  }));

  it('should fetch the recipes based on ingredients', function() {
    inject(function (Recipe) {
      
      expect(!!Recipe).toBe(true);
      expect(!!Recipe.fetchRecipe).toBe(true);
      
      $scope.$apply();
      httpBackend.flush();
      
      // empty parameters
      var recipe = Recipe.fetchRecipe([]);
      
      expect(recipe).toBe(undefined);
      
      // first recipe
      recipe = Recipe.fetchRecipe(['Piment', 'Poil de chat', 'Vinaigre']);
    
      expect(recipe.name).toBe('Sirop pour la toux');
      
      // schuffle arguments
      recipe = Recipe.fetchRecipe(['Piment', 'Vinaigre', 'Poil de chat']);
    
      expect(recipe.name).toBe('Sirop pour la toux');
      
      // second recipe
      recipe = Recipe.fetchRecipe(['Jus de citron', 'Pattes de pigeon', 'Piment']);
    
      expect(recipe.name).toBe('Invisibilité');
      
      // mix ingredients
      recipe = Recipe.fetchRecipe(['Poil de chat', 'Pattes de pigeon', 'Piment']);
    
      expect(recipe).toBe(undefined);
    });
  });

});
