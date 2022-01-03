const {watch, src, dest, series, parallel, task} = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const browserSync = require('browser-sync').create()

const ROOT = __dirname
const config = {
    src: {
        js: ROOT + '/src/js/*.js',
        html: ROOT + '/src/*.html',
        scss: ROOT + '/src/scss/*.?css',
        images: ROOT + '/src/images/**/*',
    },
    dest: {
        js: ROOT + '/dest/js',
        scss: ROOT + '/dest/css',
        images: ROOT + '/dest/images',
        html: ROOT + '/dest/',
    },
}


const minifySCSS = (cb, file) => {
    let source = file ? file : config.src.scss
    return src(source)
        .pipe(sass({outputStyle: 'compressed',}).on('error', sass.logError))
        .pipe(dest(config.dest.scss))
        .on('end', () => cb())
}

const minifyHTML = (cb, file) => {
    let source = file ? file : config.src.html
    return src(source)
        .pipe(dest(config.dest.html))
        .on('end', () => cb())
}

const minifyJS = (cb, file) => {
    const source = file ? file : config.src.js
    return src(source).pipe(dest(config.dest.js)).on('end', () => cb())
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

    const watcher = watch(Object.values(config.src));

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

task(makeFn("start", "open the dev-server", {}, series(
    parallel(
        minifyHTML,
        minifyJS,
        minifySCSS,
        minifyImages,
    ),
    livewatch,
    livereload,
)));

task(makeFn("build", "build the html . css & js files", {}, series(
    minifyHTML,
    minifyJS,
    minifySCSS,
    minifyImages,
)));