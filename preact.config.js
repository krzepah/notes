var path = require('path')
var fs = require('fs')

export default (config, env, helpers) => {
  const alias =  config.resolve.alias;

  alias['Components'] = path.resolve('./src/components/');
  alias['Routes'] = path.resolve('./src/routes');
  alias['Style'] = path.resolve('./src/style');
  alias['Store'] = path.resolve('./src/store');
  alias['Utils'] = path.resolve('./src/utils');
};
