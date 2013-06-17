var validators = require('jungles').validators;

var types = [

  {
    name: 'root',
    children: [ 'products', 'page' ],
  },

  {
    name: 'products',
    children: ['product'],
    icon: {
      name: 'icon-folder-open-alt',
    }
  },

  {
    name: 'product',
    icon: {
      name: 'icon-copy',
    }
  },

  {
    name: 'page',
    form: 'forms/page',
    children: ['page'],
    schema: {
      title: [ validators.string() ],
      description: [ validators.string() ],
      body: [ validators.string() ],
      files: [ validators.array() ]
    },
  },

];

module.exports = types;
