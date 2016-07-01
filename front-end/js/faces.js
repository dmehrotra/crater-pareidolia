
function searchForFaces(src){
     
      ctrack.start(document.getElementById('image'));
      o

}

      
    
      
function drawLoop() {
  drawRequest = requestAnimationFrame(drawLoop);
  overlayCC.clearRect(0, 0, 720, 576);
  
  if (ctrack.getCurrentPosition()) {
    ctrack.draw(overlay);
    console.log('found')
  }else{
    overlayCC.clearRect(0, 0, 720, 576);
  }
}
        
        // detect if tracker fails to find a face
      