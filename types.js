var validators = require('jungles').validators;

var types = [
  {
    name: 'page',
    form: 'forms/page',
    root: true,
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
