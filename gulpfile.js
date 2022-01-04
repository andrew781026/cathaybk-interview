const {watch, src, dest, series, parallel, task} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const markdown = require('gulp-markdown');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const fs = require('fs');

const ROOT = __dirname
const config = {
    watchGlobs: [
        './src/js/*.js',
        './src/*.html',
        './src/*.md',
        './src/scss/**/*.scss',
    ],
    src: {
        js: ROOT + '/src/js/*.js',
        html: ROOT + '/src/*.html',
        md: ROOT + '/*.md',
        scss: ROOT + '/src/scss/*.scss',
        images: ROOT + '/src/images/**/*',
    },
    dest: {
        js: ROOT + '/dest/js',
        scss: ROOT + '/dest/css',
        images: ROOT + '/dest/images',
        html: ROOT + '/dest/',
        md: ROOT + '/dest/',
    },
}

// 參考資料 : https://gulpjs.com/docs/en/api/task/
const makeFn = (displayName, description, flags, fn) => {

    // name	- string - A special property of named functions. Used to register the task. Note: name is not writable; it cannot be set or changed.
    // displayName - string - When attached to a taskFunction creates an alias for the task. If using characters that aren't allowed in function names, use this property.
    // description - string - When attached to a taskFunction provides a description to be printed by the command line when listing tasks.
    // flags - object - When attached to a taskFunction provides flags to be printed by the command line when listing tasks. The keys of the object represent the flags and the values are their descriptions.

    fn.displayName = displayName;
    fn.description = description;
    fn.flags = flags;
    return fn;
};

const deleteDest = (cb) => {
    const destFolder = ROOT + '/dest';
    if (fs.existsSync(destFolder)) fs.rmdirSync(destFolder, {recursive: true});
    cb();
}

const copyFiles = (origin, destination) => (cb, file) => src(file ? file : origin).pipe(dest(destination)).on('end', () => cb())

const minifyMD = (...args) => copyFiles(config.src.md, config.dest.md)(...args);
const minifyHTML = (...args) => copyFiles(config.src.html, config.dest.html)(...args);
const minifyJS = (...args) => copyFiles(config.src.js, config.dest.js)(...args);

const minifySCSS = (cb, file) => {
    let source = file ? file : config.src.scss
    return src(source)
        .pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
        .pipe(dest(config.dest.scss))
        .on('end', () => cb())
}

const minifyImages = (cb) => {
    return src(config.src.images)
        .pipe(imagemin())
        .on('error', (err) => console.warn(err))
        .pipe(dest(config.dest.images))
        .on('end', () => cb())
}

const livereload = () => {
    browserSync.init({
        port: 3026,
        startPath: '/first.html',
        server: {
            baseDir: './dest',
        },
        open: true,
        watch: true,
        logConnections: false,
        injectChanges: true,
        serveStatic: [
            {
                route: '/images',
                dir: './dest/images',
            },
            {
                route: '/css',
                dir: './dest/css',
            },
            {
                route: '/js',
                dir: './dest/js',
            },
        ],
    })
}

const livewatch = (cb) => {

    const watcher = watch(config.watchGlobs);

    const compileTargetFile = (path, type) => {
        console.log(`File ： ${path} ${type}`)
        const newPath = require('path').resolve(path)
        if (/\.js$/i.test(path) && !/\.esm.js$/i.test(path)) minifyJS(_ => _, newPath)
        else if (/\.scss$/i.test(path)) minifySCSS(_ => _, newPath)
        else if (/\/html\/([\w_-]+)\.html$/i.test(path)) minifyHTML(_ => _, newPath)
    };

    // file change
    watcher.on('change', (path) => compileTargetFile(path, 'changed'));

    // add file
    watcher.on('add', (path) => compileTargetFile(path, 'added'));

    // delete file
    watcher.on('unlink', (path) => compileTargetFile(path, 'deleted'));

    cb();
}

task(makeFn("start", "open the dev-server", {}, series(
    deleteDest,
    parallel(
        minifyHTML,
        minifyMD,
        minifyJS,
        minifySCSS,
        minifyImages,
    ),
    livewatch,
    livereload,
)));

task(makeFn("build", "build the html . css & js files", {}, series(
    deleteDest,
    minifyHTML,
    minifyMD,
    minifyJS,
    minifySCSS,
    minifyImages,
)));
