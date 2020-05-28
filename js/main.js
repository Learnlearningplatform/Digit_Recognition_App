
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
// canvas.width = parseInt(paint_style.getPropertyValue('width'));
// canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = { x: 0, y: 0 };

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#00CC99';

canvas.addEventListener('mousedown', function (e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onPaint, false);
    var img = new Image();
    img.onload = function() {
      context.drawImage(img, 0, 0, 28, 28);
      data = context.getImageData(0, 0, 28, 28).data;
      var input = [];
      for(var i = 0; i < data.length; i += 4) {
        input.push(data[i + 2] / 255);
      }
      predict(input);
    };
    img.src = canvas.toDataURL('image/png');
}, false);

var onPaint = function () {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

tf.loadLayersModel('Model/model.json').then(function(model) {
    window.model = model;
   });

   window.model.predict([tf.tensor(input).reshape([0, 28, 28, 1])]).array().then(function(scores){
    scores = scores[0];
    predicted = scores.indexOf(Math.max(...scores));
    console.log(predicted)
  });

// // Set up touch events for mobile, etc
// canvas.addEventListener("touchstart", function (e) {
//         mousePos = getTouchPos(canvas, e);
//   var touch = e.touches[0];
//   var mouseEvent = new MouseEvent("mousedown", {
//     clientX: touch.clientX,
//     clientY: touch.clientY
//   });
//   canvas.dispatchEvent(mouseEvent);
// }, false);
// canvas.addEventListener("touchend", function (e) {
//   var mouseEvent = new MouseEvent("mouseup", {});
//   canvas.dispatchEvent(mouseEvent);
// }, false);
// canvas.addEventListener("touchmove", function (e) {
//   var touch = e.touches[0];
//   var mouseEvent = new MouseEvent("mousemove", {
//     clientX: touch.clientX,
//     clientY: touch.clientY
//   });
//   canvas.dispatchEvent(mouseEvent);
// }, false);

// // Get the position of a touch relative to the canvas
// function getTouchPos(canvasDom, touchEvent) {
//   var rect = canvasDom.getBoundingClientRect();
//   return {
//     x: touchEvent.touches[0].clientX - rect.left,
//     y: touchEvent.touches[0].clientY - rect.top
//   };
// }

// // Prevent scrolling when touching the canvas
// document.body.addEventListener("touchstart", function (e) {
//     if (e.target == canvas) {
//       e.preventDefault();
//     }
//   }, false);
//   document.body.addEventListener("touchend", function (e) {
//     if (e.target == canvas) {
//       e.preventDefault();
//     }
//   }, false);
//   document.body.addEventListener("touchmove", function (e) {
//     if (e.target == canvas) {
//       e.preventDefault();
//     }
//   }, false);