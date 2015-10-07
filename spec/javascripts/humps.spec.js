describe('humps', function() {
  'use strict';

  // =========
  // = Setup =
  // =========

  beforeEach(function() {
    this.simple_obj = {
      attr_one: 'foo',
      attr_two: 'bar'
    };

    this.simpleCamelObj = {
      attrOne: 'foo',
      attrTwo: 'bar'
    };

    this.simplePascalObj = {
      AttrOne: 'foo',
      AttrTwo: 'bar'
    };

    this.complex_obj = {
      attr_one: 'foo',
      attr_two: {
        nested_attr_1: 'bar'
      },
      attr_three: {
        nested_attr_2: {
          nested_attr_3: [{
            nested_in_array_1: 'baz'
          }, {
            nested_in_array_2: 'hello'
          }, {
            nested_in_array_3: ['world', 'boo']
          }]
        }
      }
    };

    this.complex_one_level_underscore_obj = {
      attr_one: 'foo',
      attr_two: {
        nestedAttr1: 'bar'
      },
      attr_three: {
        nestedAttr2: {
          nestedAttr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexOneLevelCamelObj = {
      attrOne: 'foo',
      attrTwo: {
        nested_attr_1: 'bar'
      },
      attrThree: {
        nested_attr_2: {
          nested_attr_3: [{
            nested_in_array_1: 'baz'
          }, {
            nested_in_array_2: 'hello'
          }, {
            nested_in_array_3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexCamelObj = {
      attrOne: 'foo',
      attrTwo: {
        nestedAttr1: 'bar'
      },
      attrThree: {
        nestedAttr2: {
          nestedAttr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexPascalObj = {
      AttrOne: 'foo',
      AttrTwo: {
        NestedAttr1: 'bar'
      },
      AttrThree: {
        NestedAttr2: {
          NestedAttr3: [{
            NestedInArray1: 'baz'
          }, {
            NestedInArray2: 'hello'
          }, {
            NestedInArray3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexIgnoringNumbersObj = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    };

    this.complexCustomObj = {
      'attr-one': 'foo',
      'attr-two': {
        'nested-attr-1': 'bar'
      },
      'attr-three': {
        'nested-attr-2': {
          'nested-attr-3': [{
            'nested-in-array-1': 'baz'
          }, {
            'nested-in-array-2': 'hello'
          }, {
            'nested-in-array-3': ['world', 'boo']
          }]
        }
      }
    };
  });

  // =========
  // = Specs =
  // =========

  describe('.camelizeKeys', function() {
    it('converts simple object keys to camelcase', function() {
      expect(humps.camelizeKeys(this.simple_obj)).toEqual(this.simpleCamelObj);
    });

    it('converts complex object keys to camelcase', function() {
      expect(humps.camelizeKeys(this.complex_obj)).toEqual(this.complexCamelObj);
    });

    it('does not attempt to process dates', function() {
      'work in progress';
      var date = new Date();
      var _object = {
        a_date: date
      };
      var convertedObject = {
        aDate: date
      };
      expect(humps.camelizeKeys(_object)).toEqual(convertedObject);
    });

    it('converts keys within arrays of objects', function() {
      var array = [{first_name: 'Sam'}, {first_name: 'Jenna'}],
        convertedArray = [{firstName: 'Sam'}, {firstName: 'Jenna'}],
        result = humps.camelizeKeys(array);
      expect(result).toEqual(convertedArray);
      // Ensure it’s an array, and not an object with numeric keys
      expect(toString.call(result)).toEqual('[object Array]');
    });
  });

  describe('.decamelizeKeys', function() {
    it('converts simple objects with camelcased keys to underscored', function() {
      expect(humps.decamelizeKeys(this.simpleCamelObj)).toEqual(this.simple_obj);
    });

    it('converts complex objects with camelcased keys to underscored', function() {
      expect(humps.decamelizeKeys(this.complexCamelObj)).toEqual(this.complex_obj);
    });

    it('decamelizes keys with a custom separator', function() {
      expect(humps.decamelizeKeys(this.complexCamelObj, '-')).toEqual(this.complexCustomObj);
    });

    it('decamelizes keys ignoring numbers', function() {
      expect(humps.decamelizeKeys(this.complexCamelObj, '_', true)).toEqual(this.complexIgnoringNumbersObj);
    });

    it('should not convert keys nested more than the level argument', function() {
      expect(humps.decamelizeKeys(this.complexCamelObj, undefined, undefined, 1)).toEqual(this.complex_one_level_underscore_obj);
    });

    it('should convertall keys when level argument is greater or equal than the most nested level', function() {
      expect(humps.decamelizeKeys(this.complexCamelObj, undefined, undefined, 4)).toEqual(this.complex_obj);
    });

  });

  describe('.pascalizeKeys', function() {
    it('converts simple object keys to PascalCase', function() {
      expect(humps.pascalizeKeys(this.simple_obj)).toEqual(this.simplePascalObj);
    });

    it('converts complex object keys to PascalCase', function() {
      expect(humps.pascalizeKeys(this.complex_obj)).toEqual(this.complexPascalObj);
    });

    it('does not attempt to process dates', function() {
      'work in progress';
      var date = new Date();
      var _object = {
        a_date: date
      };
      var convertedObject = {
        ADate: date
      };
      expect(humps.pascalizeKeys(_object)).toEqual(convertedObject);
    });
  });

  describe('.depascalizeKeys', function() {
    it('converts simple object with PascalCase keys to underscored', function() {
      expect(humps.depascalizeKeys(this.simplePascalObj)).toEqual(this.simple_obj);
    });

    it('converts complex object with PascalCase keys to underscored', function() {
      expect(humps.depascalizeKeys(this.complexPascalObj)).toEqual(this.complex_obj);
    });

    it('depascalizes keys with a custom separator', function() {
      expect(humps.depascalizeKeys(this.complexPascalObj, '-')).toEqual(this.complexCustomObj);
    });

    it('depascalizes keys ignoring numbers', function() {
      expect(humps.depascalizeKeys(this.complexPascalObj, '_', true)).toEqual(this.complexIgnoringNumbersObj);
    });
  });

  describe('.camelize', function() {
    it('converts underscored strings to camelcase', function() {
      expect(humps.camelize('hello_world')).toEqual('helloWorld');
    });

    it('converts hyphenated strings to camelcase', function() {
      expect(humps.camelize('hello-world')).toEqual('helloWorld');
      expect(humps.camelize('hello-world-1')).toEqual('helloWorld1');
    });

    it('converts space-separated strings to camelcase', function() {
      expect(humps.camelize('hello world')).toEqual('helloWorld');
    });

    it('converts PascalCased strings to camelcase', function() {
      expect(humps.camelize('HelloWorld')).toEqual('helloWorld');
      expect(humps.camelize('HelloWorld')).toEqual('helloWorld');
    });

    it('keeps numbers unchanged', function() {
      expect(humps.camelize('-1')).toEqual('-1');
      expect(humps.camelize('1')).toEqual('1');
    });
  });

  describe('.decamelize', function() {
    it('converts camelcased strings to underscored', function() {
      expect(humps.decamelize('helloWorld')).toEqual('hello_world');
    });

    it('decamelizes strings with custom separator', function() {
      expect(humps.decamelize('helloWorld', '-')).toEqual('hello-world');
    });

    it('decamelizes strings ignoring numbers', function() {
      expect(humps.decamelize('helloWorld1', '_', true)).toEqual('hello_world1');
    });
  });

  describe('.pascalize', function() {
    it('converts underscored strings to PascalCase', function() {
      expect(humps.pascalize('hello_world')).toEqual('HelloWorld');
    });

    it('converts hyphenated strings to PascalCase', function() {
      expect(humps.pascalize('hello-world')).toEqual('HelloWorld');
    });

    it('converts space-separated strings to PascalCase', function() {
      expect(humps.pascalize('hello world')).toEqual('HelloWorld');
    });
  });
});
