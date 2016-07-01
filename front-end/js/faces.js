function searchForFaces(src){
  console.log('searching')
  var img = document.getElementById('faces');
  var tracker = new tracking.ObjectTracker(['face','mouth','eye']);
  tracker.setStepSize(1.4);
  console.log('working')
  tracking.track('#faces', tracker);
  tracker.on('track', function(event) {
    
    // removeElementsByClass("rect")
    // document.getElementById("faces").src = src
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
