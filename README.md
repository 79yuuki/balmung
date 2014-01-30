
Balmung
==========

Balmung is tool for generating compressed and responsive images.

*This app is under development*

Features
==========

- Web UI
- Resize images for various pixel ratio
- Compress images
- Flexible compression settings per directory, file and size
- Export custom settings for grunt tasks (grunt-balmung)
- Automatic update of git or svn repository

Compression tools
==========

- png
  - pngquant
  - optipng
  - zopfli
- jpg
  - jpegtran
- gif
  - gifsicle

Quickstart
==========

Server should have installed ImageMagick before starting.

Install balmung

```
npm install -g balmung
```

To start balmung server, run

```
balmung
```

Access `http://127.0.0.1:7700` with your web browser after launching.

*Command line options*

* `config`: path of the config file
* `port`: port number to listen web

To execute with your customized configuration, run

```
balmung --config /etc/balmung.js --port 8080
```

Configuration
==========

You can customize balmung with simple javascript file.

```js
module.exports = {

  // Working directory
  datadir: './content',
  // Settings to be written
  settings: './content/balmung-settings.json',

  /* Repository settings to get contents from VCS
  repository: {
    type: 'git', // git or svn
    url: 'https://github.com/xyz/xyz.git', // URL of the repository
    update: 60000 // update interval (millisec)
  },
  */

  // resize default
  resize: {
    // ratio list to be generated
    ratio: [1.0, 1.3, 1.5, 2.0, 3.0],
    // base ratio of images in source directory
    base: 3.0,
    // unsharp option after resizing
    unsharp: '2x1.4+0.5+0',
    // resizing concurrency
    concurrency: 4,
    // Replace patterns of directory and file name.
    // {dirname} - base directory name
    // {ratio} - pixel ratio
    // {ratiox10} - pixel ratio * 10
    // {basename} - base name of the file. ex) example.png -> example
    // {extname} - extension name of the file. ex) example.png -> .png
    dirname: '{dirname}',
    filename: '{basename}_{ratiox10}{extname}'
  },

  // optimizer
  optimize: {
    // optimizing concurrency
    concurrency: 2,
    // Default image filter to be used
    tools: {
      jpg: ['jpegtran'],
      png: ['pngquant', 'optipng', 'zopfli'],
      gif: ['gifsicle']
    }
  },

  // pngquant
  pngquant: {
    color: 256,
    speed: 3
  },

  // optipng
  optipng: {
    level: 3
  },

  // zopfli
  zopfli: {
  },

  // jpegtran
  jpegtran: {
    optimize: true,
    copy: 'none'
  },

  // gifsicle
  gifsicle: {
    level: 3
  },

  logger: {
    appenders: {
      console: { type: 'console' }
    }
  }
  
};
```

Grunt
==========

grunt-balmung is a grunt task which optimize images with same options of balmung server.

```
npm install grunt-balmung --save-dev
```

grunt task

```js
{
  balmung: {
    ..
  }
}

```

Author
==========
Suguru Namura

License
==========
MIT

