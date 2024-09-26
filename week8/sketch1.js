let img;
let numSegments = 50;
let segments = [];
let drawSegments = false;
let imgDrwPrps = { aspect: 0, width: 0, height: 0, xOffset: 0, yOffset: 0 };
let canvasAspectRatio = 0


function preload() {
  img = loadImage("assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  canvasAspectRatio = width / height;
  calculateImageDrawProps();
  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  for (let segYPos = 0; segYPos < img.height; segYPos += segmentHeight) {
    for (let segXPos = 0; segXPos < img.width; segXPos += segmentWidth) {
      let segmentColour = img.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2);
      let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour);
      segments.push(segment);
    }
  }
}

function draw() {
  background(0);
  if (drawSegments) {
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    image(img, imgDrwPrps.xOffset, imgDrwPrps.yOffset, imgDrwPrps.width, imgDrwPrps.height);
  }
}

function keyPressed() {
  if (key == " ") {
    drawSegments = !drawSegments;
  }
}

function calculateImageDrawProps() {

  //if the image is wider than the canvas
  if (imgDrwPrps.aspect > canvasAspectRatio) {
    //then we will draw the image to the width of the canvas
    imgDrwPrps.width = width;
    //and calculate the height based on the aspect ratio
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;
    imgDrwPrps.xOffset = 0;
  } else if (imgDrwPrps.aspect < canvasAspectRatio) {
    //otherwise we will draw the image to the height of the canvas
    imgDrwPrps.height = height;
    //and calculate the width based on the aspect ratio
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
    imgDrwPrps.yOffset = 0;
  }
  else if (imgDrwPrps.aspect == canvasAspectRatio) {
    //if the aspect ratios are the same then we can draw the image to the canvas size
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}

class ImageSegment {
  constructor(srcImgSegXPosIn, srcImgSegYPosIn, srcImgSegWidthIn, srcImgSegHeightIn, srcImgSegColourInPrm) {
    this.srcImgSegXPos = srcImgSegXPosIn;
    this.srcImgSegYPos = srcImgSegYPosIn;
    this.srcImgSegWidth = srcImgSegWidthIn;
    this.srcImgSegHeight = srcImgSegHeightIn;
    this.srcImgSegColour = srcImgSegColourInPrm;
    //this.scale = 1;
  }

  draw() {
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth * this.scale, this.srcImgSegHeight * this.scale);
  }
}