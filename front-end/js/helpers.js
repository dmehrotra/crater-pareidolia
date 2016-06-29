function takeImage() {        
  var transform=$(".gm-style>div:first>div").css("transform")
  var comp=transform.split(",") //split up the transform matrix
  var mapleft=parseFloat(comp[4]) //get left value
  var maptop=parseFloat(comp[5])  //get top value
  $(".gm-style>div:first>div").css({ //get the map container. not sure if stable
    "transform":"none",
    "left":mapleft,
    "top":maptop,
  })
  html2canvas($('#map'),
  {
    useCORS: true,
    onrendered: function(canvas)
    {
     
      var src = canvas.toDataURL("image/png")
      removeElementsByClass("rect")
      document.getElementById("faces").src = src
      $(".gm-style>div:first>div").css({
        left:0,
        top:0,
        "transform":transform
      })
      searchForFaces();
    }
  });
 }
function removeElementsByClass(className){
	var elements = document.getElementsByClassName(className);
	while(elements.length > 0){
	    elements[0].parentNode.removeChild(elements[0]);
	}
}