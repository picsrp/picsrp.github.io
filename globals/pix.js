function initArray() {
	this.length = initArray.arguments.length;
	for (var i = 0; i < this.length; i++) {
		this[i] = initArray.arguments[i];	}}
var gs = new initArray(
"pict3026_t.jpg", "pict3036_t.jpg", "pict3039_t.jpg", "pict3045_t.jpg",
"pict3067_t.jpg", "pict3072_t.jpg", "pict3080_t.jpg");

ff=1.3; gw=133; gt=99;

var x = 9; var intv = 4000; crun='Start';

function wt(fn) {
	if(fn.match("web"))	{
		return (fn.replace("web","thm"));	}
	else	{
		return (fn.replace("thm","web"));	}
	}

function crotate(num){
	x=num%gs.length;
	document.images.show.src=gs[x];	}
function capRotate() {
	if(crun == "Stop"){
		crotate(++x);window.setTimeout("capRotate()", intv);}}

