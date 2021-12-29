// 현재 프로젝트에서 모듈 경로를 찾을 수 있도록 지정.
// 특히 Windows에서 발생하는 오류 해결을 위한 코드.
// 이 코드가 없어도 잘 동작하는 경우 필요치 않음.
const _require = id => require(require.resolve(id, { paths: [require.main.path] }))

//import
// path: NodeJS에서 파일 및 디렉토리 경로 작업을 위한 전역 모듈
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

// export
 module.exports = {
   resolve: {
     // 경로에서 확장자 생략 설정
     extensions: ['.js', '.vue'],
     //경로 별칭
     alias: {
       '~': path.resolve(__dirname, 'src'),
       'assets': path.resolve(__dirname, 'src/assets')
     }
   },
   // parcel index.html
   // 파일 읽어들이기 시작하는 진입점 설정
   entry: './src/main.js',

   // 결과물(번들)을 반환하는 설정
   output: {
    // 주석은 기본값!, `__dirname`은 현재 파일의 위치를 알려주는 NodeJS 전역 변수
    //  path: path.resolve(__dirname, 'dist'), // __dirname 현재 파일이 있는 경로에 public 폴더 생성
    //  filename: 'main.js', //파일 네임은 app.js
     clean: true // 설정한 파일 외의 다른 파일 제거
   },

   // 모듈 처리 방식을 설정
   module: {
     rules: [
       {
         test:/\.vue$/,
         use: 'vue-loader'
       },
       {
         test:/\.s?css$/, //.scss나 .css로 끝나는 문자를 찾는 정규식. s? -> s가 있을수도있고 없을수도있고
         use: [
            // 순서 중요!
           'vue-style-loader', // vue파일 내부의 style 해석 및 동작
           'style-loader', // html style 태그에 연결
           'css-loader', // css파일을 해석하는 용도
           'postcss-loader', // autoprefixer
           'sass-loader' //scss
         ]
       },
       {
         test: /\.js$/,
         exclude: /node_modules/, // 제외할 경로
         use: [
           'babel-loader'
         ]
        },
       {
         test: /\.(png|jpe?g|gif|webp)$/,
         use: 'file-loader'
       }
     ]
   },
   //번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설명
   plugins: [
     new HtmlPlugin({
       template: './index.html'
     }),
     new CopyPlugin({
       patterns: [
         {from: 'static'} //어디에서부터 해당하는 폴더 내용을 복사해서 dist에 넣을것인지.
       ]
     }),
     new VueLoaderPlugin()
   ],

   // 개발 서버 옵션
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true
  }
 }