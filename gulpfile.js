const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
// const sass = require('gulp-sass'); // так не работает
const sass = require('gulp-sass')(require('sass')); // вот такой синтакссис на сайте
const sourcemaps = require('gulp-sourcemaps');

// плагин установили sass но писать будем в синатксисе csss  - проблем не будет
const config = {
  path: {
    //относительный путь от gulpfile
    scss: './src/scss/**/*.scss', // исходники стилей
    html: './public/index.html' //выходной файл
  },
  output: {
    //путь и название выходного файла
    path: './public', // нужно для сервер-обновления страницы browserSync
    cssName: 'bundle.min.css'
  }
};


//Tasks - задачи
gulp.task('scss', function () {
  //возвращаем поток со всеми файлами SCSS
  return gulp.src(config.path.scss)
  //далее через pipe подключаем те модули которые нужны в работе
  .pipe(sourcemaps.init()) // Инициализация - чтобы видеть в каком именно файле был создан стиль
  .pipe(sass())
  .pipe(concat(config.output.cssName)) // запустит сборку всех scss файлов и внутрь пишем имя выходного файла 
  .pipe(autoprefixer())
  .pipe(sourcemaps.write()) // запишет все soursemaps  в выходной файл стилей
  .pipe(gulp.dest(config.output.path)); // метод dest() - куда нужно перенести все файлы созданные

 });
//Также нам нужна задача по default
// gulp.task('default', ['scss'] ); // но этот синтаксис не будет работать в версии gulp 4.0 мое решение с Less

// 1111 вариант синтаксиса для SCSS
// let scssStart = gulp.series('scss');
// let watcher = gulp.watch(config.path.scss, scssStart);

// gulp.task('default', scssStart, watcher);


//2222 вариант через функцию Watcher

//можно создать отдельную переменную, но можно сразу прописать в Watcher функцию
// let scssStart = gulp.series('scss');
function watcher() { 
 gulp.watch(config.path.scss, gulp.series('scss') );
}
const mainTask = gulp.series('scss', watcher); //здесь уже можно писать просто 'scss' т.к. выше мы уже определили метод series()
gulp.task('default', mainTask);
