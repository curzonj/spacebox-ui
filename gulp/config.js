var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: ['./htdocs', dest, src]
    },
    files: [
      dest + "/**",
      './htdocs/**',
      // Exclude Map files
      "!" + dest + "/**.map"
    ]
  },
  sass: {
    src: src + "/sass/*.{sass, scss}",
    dest: dest
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  markup: {
    'node_modules/*/images/**': dest,
    'node_modules/threex.spaceships/models/**': dest+'/threex.spaceships/models/',
    "htdocs/**": dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
        entries: './src/main.js',
        dest: dest,
        outputName: 'main.js'
    }]
  }
};
