WebFontConfig = {
	google: { families: [ 'PT+Sans:400,400italic:latin', 'Ubuntu:300,400,500:latin' ] }
};

var cb = function() {
	var wf = document.createElement('script');
	wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
};

var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

if(raf){
	raf(cb);
}else{
	window.addEventListener('load', cb);
}