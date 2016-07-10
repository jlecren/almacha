'use strict';

describe('Service: mixer', function () {

  // load the service's module
  beforeEach(module('almachaApp'));

  // instantiate service
  var Mixer;
  beforeEach(inject(function (_Mixer_) {
    Mixer = _Mixer_;
  }));

  it('should have a getter to return ingredients', function () {
    expect(!!Mixer).toBe(true);
    expect(!!Mixer.getIngredients).toBe(true);
  });

  it('should add ingredients into the mixer', function () {
    expect(!!Mixer.addIngredient).toBe(true);
    
    Mixer.addIngredient('Piment');
    
    expect(Mixer.getIngredients().length).toBe(1);
    expect(Mixer.getIngredients()[0]).toBe('Piment');
    
    Mixer.addIngredient('Poil de chat');
    Mixer.addIngredient('Vinaigre');
    
    expect(Mixer.getIngredients().length).toBe(3);
    
    Mixer.addIngredient('Tête de rat');
    
    expect(Mixer.getIngredients().length).toBe(3);
    expect(Mixer.getIngredients()[1]).toBe('Poil de chat');
    expect(Mixer.getIngredients()[2]).toBe('Vinaigre');
    
  });

  it('shall know when it can be mixed', function () {
    Mixer.addIngredient('Piment');
    
    expect(Mixer.canMix()).toBe(false);
    
    Mixer.addIngredient('Poil de chat');
    Mixer.addIngredient('Vinaigre');
    
    expect(Mixer.canMix()).toBe(true);
    
  });

  it('shall clean up the mixer when required', function () {
    Mixer.addIngredient('Piment');
    
    expect(Mixer.getIngredients().length).toBe(1);
    
    Mixer.cleanUp();
    
    expect(Mixer.getIngredients().length).toBe(0);
    
  });

});
