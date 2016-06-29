function searchForFaces(){
  var img = document.getElementById('faces');
  var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
  tracker.setStepSize(1.3);
  console.log('working')
  tracking.track('#faces', tracker);
  tracker.on('track', function(event) {
    
    event.data.forEach(function(rect) {
      console.log(rect)
      window.plot(rect.x, rect.y, rect.width, rect.height);
    })
  })
  window.plot = function(x, y, w, h) {
    var rect = document.createElement('div');
    document.querySelector('.fc').appendChild(rect);
    rect.classList.add('rect');
    rect.style.width = w + 'px';
    rect.style.height = h + 'px';
    rect.style.left = (img.offsetLeft + x) + 'px';
    rect.style.top = (img.offsetTop + y) + 'px';
  }
}
