const {src, dest,  watch} = require('gulp');
const compass = require('gulp-compass');
const { series } = require('gulp');
const exec = require('child_process').exec;
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');

const jFiles = [
    'js/nytsee/TweenMax.min.js',
    'js/gsap.3.2.4.min.js',
    'js/jquery.1.12.4.js',
    'js/jquery.validate.js',
    'js/messages_fr.js',
    'js/jquery.mCustomScrollbar.concat.min.js',
    'js/scriptaculos.js',
    'js/owl.carousel.js',
    'js/jquery.easeScroll.js',
    'js/owl.carousel.js',
    'js/materialize.js',
    'js/lity.js',  
    'js/swiper-bundle.min.js'  
];


/* <script type="text/javascript" src="js/nytsee/TweenMax.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.4/gsap.min.js"></script>
<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="js/jquery.validate.js"></script>
<script type="text/javascript" src="js/messages_fr.js"></script>
<link href="css/jquery.mCustomScrollbar.css" rel="stylesheet" />
<script src="js/jquery.mCustomScrollbar.concat.min.js"></script>                  
<script type="text/javascript" src="js/materialize.min.js"></script> 
<script type="text/javascript" src="js/select.js"></script> 
<script src="js/scriptaculos.js"></script>
<script src="js/html_5_nytsee.js"></script>

<script src="js/owl.carousel.js"></script> 
<script src="js/lity.js"></script> 
<script src="js/jquery.easeScroll.js"></script> 
<script src="js/mgrid.js"></script>  */

const bundleJs = () => {
    return src(jFiles)
    .pipe(minifyJs())
    .pipe(concat('bundle.js'))
    .pipe(dest('./js/dist/'));
  }


  const runCompass = (cb) => {
    return src('./sass/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      style : 'compressed'
    }))
    .on('error', function(error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    })
    .pipe(dest('./css'));
    //cb();
  }

  const devWatch = () =>{
    //watch('./js/**/*.js' , bundleJs );
    watch('./sass/**/*.scss' , runCompass );
  };

  const watcher = watch(['./js/*.js']);

  watcher.on('change', function(path, stats) {
    console.log(`File ${path} was changed`);
    bundleJs();
  });
  
  exports.bundleJs = bundleJs ;
  exports.compass = runCompass ;
  exports.devWatch = devWatch ;

  exports.default = series(bundleJs, runCompass, devWatch);


  

