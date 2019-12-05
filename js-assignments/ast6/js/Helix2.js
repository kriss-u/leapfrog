var myCanvas = document.getElementById('canvas');

var context = myCanvas.getContext('2d');

var phase, speed, maxCircleSize, numRows, numCols, numStrands, colorA, colorB, frameCount;

phase = 0;
speed = 0.026;
maxCircleSize = 20;
numRows = 10;
numCols = 15;
numStrands = 2;
frameCount = 0;
var color;

var colors = ['#ffae73', '#fea978', '#fea57c', '#fea081', '#fe9b86', '#fa968b', '#f59190', '#f08c95', '#eb879a', '#e17da4'];

function loop() {


  context.clearRect(0, 0, myCanvas.width, myCanvas.height);

  var x = 0
  var columnOffset = 0;
  frameCount++;
  phase = frameCount * speed;


  for (var strand = 0; strand < numStrands; strand++) {
    //! phase to change the phase between the strands

    var strandPhase = (strand === 0) ? phase : phase + Math.PI;
    x = 0;

    for (var col = 0; col < numCols; col++) {

      columnOffset = (Math.PI * col) / numCols;
      x += 14; //!use it to change the gap betwween two consecutive colums

      for (var row = 0; row < numRows; row++) {
        color = colors[row];


        y = (myCanvas.height) / 10 + row * 10 + Math.sin(strandPhase + columnOffset) * 25;

        //!here 25 can be used to change the distance between the strands

        var sizeOffset = 0.5 * (Math.cos(strandPhase - (row / numRows) + columnOffset) + 1);

        var circleSize = sizeOffset * maxCircleSize;

        context.beginPath();
        context.arc(600 + x * 3.5, y * 3.5, circleSize * 1.3, 0, Math.PI * 2, false);
        //! use + to translate and * to scale the positional value
        context.fillStyle = color;
        context.fill();
        context.closePath();
      }
    }
  }

}


setInterval(loop, 20);