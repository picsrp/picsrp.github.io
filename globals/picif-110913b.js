/*	--	--	contact & purpose	--	--	--	--	--picif.js	Picture InterFace
ghh 110923	krsnadas.srp@gmail.com
ghh 091201	krsnadas.srp@gmail.com

MOUSE GESTURES: MARKING:
drag	move pic to dest (also click src & dest)
click	specific pic
l2r	pics below it (also double click)
r2l	pics above it (also triple click)

KEY STROKES: ACTIONS
f l	first last
g s	grow shrink
w t	web thumb
u d a	un/delete all: of deleted stack

*/

//	--	--	ghh	--	--	--	--	--	--	--	--	--
ff=1.3; gw=133; gt=99; op=1.7;
	gesDiv =new Array();
	delDiv =new Array();
	divOld=-1;
	click=0;beg=1;end=2;drag=3;


// Move a dom element.
function moveEle( a, b )	{	b.parentNode.insertBefore(a,b);	}

function gesture() {	// mouse gestures mark:
	if(-1!=divStart) opal(divStart,op);
	//erase translucency if it exists
	while(gesDiv.length) gesDiv.pop();	// clear old gestures

// type of gesture
			gest=click;	// ghh 11-03-14
	if(9> Math.abs(xsStart-xsEnd)+Math.abs(ysStart-ysEnd)){
//			gest=click;
			divOld=divStart;
		}else if(divStart!=divEnd) {	gest=drag;
		}else if(0>xsStart-xsEnd) {	gest=end;
		}else {	gest=beg;
}
	switch (gest)	{
	case beg:	// to beginning
			var them = getElementsByClass( "pic", document );
			pix=them;
			for(pivot=0;pix[pivot]!=divStart;pivot++);
			for(i=pivot;i>=0;i--) gesDiv.push(pix[i]);
		break;
	case end:	// to ending
			var them = getElementsByClass( "pic", document );
			pix=them;
			for(pivot=0; pix[pivot]!=divStart; pivot++);
			for(i=lenPics;i>=pivot;i--) gesDiv.push(pix[i]);
		break;
	case drag:	// drag
			moveEle(divStart,divEnd);
			divOld=-1;
			divStart=-1;
		break;
	case click:	// click
			gesDiv.push(divStart);
			atPic=divStart.children[0];
			atPic.height*=ff;
			web_size=450;
			thumb_size=100;
//			web_size=$("#web_set").val();	// ghh 11-03-14
//			thumb_size=$("#thumb_set").val();	// ghh 11-03-14
			if(atPic.height>web_size) atPic.height=thumb_size;
			size(atPic);
		break;
	default:
		break;
}	}

ACTION=0;
ANYACTION=0;
function keys(ee) {	// Actions
//	if(!divStart) return;
//browser compatibility
	if(!ee)var ee=window.event;
//work
	divOld=-1;	// old not used with any key
	divStart=-1;	// Start not used with any key
//	switch on key stroke actions
	ACTION=1;
	ANYACTION=1;
	if(ee.keyCode) kc=ee.keyCode;
	switch (String.fromCharCode(kc))	{

//	--	--	 ghh 11-09-13	--	--	--	--	--	--	--	--	--
	case "P":	// Pics: select all
		while(gesDiv.length) gesDiv.pop();	// clear old gestures
		for(i=lenPics;i>=0;i--) gesDiv.push(pics[i]);
		break;

	case "F":	// first
		while(gesDiv.length) pix[0].parentNode.insertBefore(gesDiv.pop(),pix[0]);
		break;

	case "L":	// last
		while(gesDiv.length) endif.parentNode.insertBefore(gesDiv.pop(),endif);
		break;

	case "G":	// grow
		while(gesDiv.length)	{
			atPic=gesDiv.pop().children[0];
			atPic.height*=ff;
			size(atPic);	}
			break;

	case "S":	// shrink
		while(gesDiv.length)	gesDiv.pop().children[0].height/=ff*ff;	// Math.pow(ff,1.5);
			break;

	case "W":	// web
		while(gesDiv.length)	{
			atPic=gesDiv.pop().children[0];
			web_size=450;
//			web_size=$("#web_set").val();	// ghh 11-03-14
			atPic.height=web_size;
			size(atPic);	}
		break;

	case "T":	// thm
		while(gesDiv.length)	{
			thumb_size=100;
//			thumb_size=$("#thumb_set").val();
			gesDiv.pop().children[0].height=thumb_size;	// ghh 11-03-14	99;
			}
		break;
/*
	case "Q":	// Quit image
		while(gesDiv.length){
			nn=gesDiv.pop().children[0];
			nnsrc=nn.src;
			nn.src="http://si.wsj.net/public/resources/images/OB-JT284_0830ip_A_20100830151627.jpg";
		}break;

	case "R":	// refresh
		while(gesDiv.length){
			nn=gesDiv.pop().children[0];
			nn.src=nnsrc;
		}break;

	case "Z":	// alert
		while(gesDiv.length){
			nn=gesDiv.pop().children[0];
			alert(nn.src);
		}break;
*/
	case "U":	// un (delete)
		if(0<delDiv.length)	{
			atDiv=delDiv.pop();
			atDiv.style.display="block";
			gesDiv[0].parentNode.insertBefore(atDiv,gesDiv[0]);
			}
		break;
	case "D":	// delete
		while(gesDiv.length)	{
			atDiv=gesDiv.pop();
			delDiv.push(atDiv);
			atDiv.style.display="none";
			}
		break;
	case "A":	// all
		while(delDiv.length)	{
			atDiv=delDiv.pop();
			atDiv.style.display="block";
			gesDiv[0].parentNode.insertBefore(atDiv,gesDiv[0]);
			}
		break;
	case ' ':	// space ... ignore
		break;

	default:
//		alert("ACTION: "+kc+" string: " +String.fromCharCode(kc));
		ACTION=0;	// ANALYTICS: invalid action
	break;
}
	if(0<=ANALYTICS&&ACTION==1)	IMGS[ANALYTICS].src=
	"http://bit.ly/"+String.fromCharCode(kc)+"-picaction";
}
/*http://dl.dropbox.com/u/3595000/srp/globals/icon/if/a/../../bg.gif
http://bit.ly/A-picaction+
http://bit.ly/D-picaction+ ...
*/

function down(ee) {
//browser compatibility
	if(!ee)	var ee=window.event;
	if(ee.target) targ=ee.target;
	else if(ee.srcElement) targ=ee.srcElement;
	if(targ.nodeType==3) targ=targ.parentNode;	// Safari
//work
	if((-1!=divStart)&& divStart) opal(divStart,op);	//erase translucency if it exists
	clickStart=targ;
	if(divStart) divOld=divStart;	// maybe for future "dragging"
	divStart=this;
	xsStart=ee.screenX;
	ysStart=ee.screenY;
	xwStart=ee.clientX;
	ywStart=ee.clientY;
	opal(divStart,1/op);
//	var opalsp=divStart;
//	opals.push(opalsp);
		targ.cancelBubble=true;
		targ.returnValue= false;
//		targ.preventDefault();
	return false;	// aborts default
			targ.children[i].returnValue= false;
}

function opal(at,opa) {
	at.style.opacity=(opa>=1)?1:at.style.opacity*opa;
	at.style.filter='alpha(opacity='+ ((1>opa)?(100*opa):100) + ')';
}

function up(ee) {
//browser compatibility
	if(!ee)var ee=window.event;
	if(ee.target) targ=ee.target;
	else if(ee.srcElement) targ=ee.srcElement;
	if(targ.nodeType==3) targ=targ.parentNode;	// Safari
//work
	clickEnd=targ;
	divEnd=this;
	xsEnd=ee.screenX;
	ysEnd=ee.screenY;
	xwEnd=ee.clientX;
	ywEnd=ee.clientY;
	gesture();
	pix = getElementsByClass( "pic", document );
	return false;	// aborts default
}
function imageshack(n,ss) {
	var s=ss.split("/");
	fn12=n.substring(0,12);
	var fext=n.substring((n.length-4),n.length);
	return(
		"http://img"+s[0]+".imageshack.us/img"
		+s[0]+"/"+s[1]+"/"+fn12+s[2]+fext);
	}
function imageshack2(n,ss) {
	var s=ss.split("/");
//	fs=n.split(".");	var fname=fs[0];	var fext=fs[1];
	return(
		"http://img"+s[0]+".imageshack.us/img"
		+s[0]+"/"+s[1]+"/"+n);
	}
function size(nn) {
	if(nn.src.match("/../"))	{	// do nothing if ".."
	}else if(nn.src.match("\.th"))	{	//	TH*
		nn.src= nn.src.replace("thm","web");
		nn.src= nn.src.replace("th.","");
		var s=nn.src.split("/");
		nn.title= "0,"+SHOW+","+s[s.length-1];
	}else if(nn.src.match("\.tis"))	{ // TIS <\ d="10-08-30" t="5:23 pm" />
		var s=nn.src.split("/");
		var fnl= s[s.length-1];
		nn.title= "1,"+SHOW+","+fnl;
		nn.alt+=","+nn.src;
		nn.alt=nn.alt.replace("tis","tis/../tis");
		nn.src=imageshack(fnl,nn.alt.split(",")[0]);

	}else if(nn.src.match("tss"))	{ // TSS <\ d="11-01-12" t="4:50 pm" />
		var s=nn.src.split("/");
		var fnl= s[s.length-1];
		nn.title= "1,"+SHOW+","+fnl;
		nn.alt+=","+nn.src;
		nn.alt=nn.alt.replace("tss","tss/../tss");
		nn.src=imageshack2(fnl,nn.alt.split(",")[0]);

	}else if((.99<(nn.height/SBIG)) &
			((Math.floor(nn.height/SBIG)*SBIG*ff)>nn.height)){
		alert("SBIGs "+nn.height/SBIG);
		fstep=Math.floor(nn.height/SBIG);
		s=nn.alt.split(",");
		fsteps=s.length;
		var fplace=nn.title.split(",")[0];
		alert("SBIG2,fstep: "+fstep+" fsteps: "+fsteps+" fplace: "+fplace
			+"\n\nnn.alt: "+nn.alt
			+"\n\nif1: "+(fstep>(fplace-1))
			+" if2: "+(fstep<(fsteps+1))
			+" ifall: "+((fstep>(fplace-1))&(fstep<(fsteps+1)))
			+" ifall: "+((fstep>(fplace-1))&&(fstep<(fsteps+1))));
		if((fstep>(fplace-1))&&(fstep<fteps+1)) {
			alert("fstep: "+fstep+" fsteps: "+fsteps+" nn.height: "+nn.height
				+"\n\nnn.alt: "+nn.alt);
			if(s[fstep].match("tis")) {
				alert("TIS-s[fstep]: "+s[fstep]);
			}else if(s[fstep].match("http")){
					alert("http-s[fstep]: "+s[fstep]);
				}else{
					alert("TIS-s[fstep]: "+s[fstep]);
		}	}

	}else if((SBIG<nn.height) & (SBIG*ff>nn.height)){
		var s=nn.alt.split(",");
		if(s.length>0 && s[0].length>0) {
			nn.src= s[0];

//			<\ d="10-09-13" t="11:15 am"/>
			var t0n=parseInt(/^\d*/.exec(nn.title));
			nn.title= nn.title.replace(/^\d*/,t0n+1);	}

			alert("SBIG nn.src: "+nn.src+"\ns[1]: "+s[1]
				+"\n\nnn.alt: "+nn.alt
				+"\n\ns: "+s+"\nnn.height: "+nn.height+"\ns.length: "+s.length
				+"\n\ntitle: "+nn.title
				);

//			nn.title+= "+";	}
	}else if((2*SBIG<nn.height) & (2*SBIG*ff>nn.height)){
		var s=nn.alt.split(",");
		if(s.length>1 && s[1].length>0) {
			nn.src= s[1];
			nn.title+= "+";	}
/**/
}
	}

function getElementsByClass(searchClass,node,tag)	{
	var classElements = new Array();
	if ( node == null )	node = document;
	if ( tag == null )	tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
//	var pattern = new RegExp("(^|\\\\s)"+searchClass+"(\\\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( els[i].className.match(searchClass)) {//ghh 91123 subset, not exact
//		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
	}	}
	return classElements;
}
//	if(nn.src.match("thm"))	{

function picif_start()	{

// Turn on/ff ANALYTICS (of actions) depending on whether already analysed
ANALYTICS	=-1;
IMGS = document.getElementsByTagName("IMG");
for ( i=0; i<IMGS.length; i++){
	if(IMGS[i].src.match("bit.ly"))break;
	if(IMGS[i].src.match("j.mp"))break;	}
if(i<IMGS.length)ANALYTICS	=i;
//	alert(IMGS[i].src+"\nANALYTICS: "+ANALYTICS +"\nIMGS.length: "+IMGS.length);

SBIG=1000;

var s=document.URL.split("/");
	SHOW=s[s.length-2];

	divStart="";
	document.onkeyup = keys;
	var them = getElementsByClass( "pic", document );
	endif = document.createElement( "div" );
	endif.setAttribute("class","pic");

	pics=them;
	lenPics=pics.length-1;
	lastPic=pics[lenPics];
	lastPic.parentNode.insertBefore(endif,lastPic);//insert

	lastPic.parentNode.insertBefore(lastPic,endif); //switch

	opacitee=2;
	for (var i=0; i<=lenPics; ++i) {
		prep_pic( them[i] );	}

//	--	--	 ghh 11-09-13	--	--	--	--	--	--	--	--	--
	for(i=lenPics;i>=0;i--) gesDiv.push(pics[i]);
	alert("KEYed action P in UI selects all "+lenPics+" Pics"
	+"\neg. PG grows (and thus uprez`s) all"	);

add_pui();	//	add popup window for UI

//	the following 5 lines puts focus on page! Making a 'hidden' input field in the process
	var iel = document.createElement('input');
	iel.id='inp';
	iel.type='hidden';
	pics[0].parentNode.insertBefore(iel,pics[0]);
	document.all.inp.focus()
}

function prep_pic(pici)	{
	pici.onmousedown=down;
	pici.onmouseup=up;
	pici.style.opacity=1;
	pici.style.filter='alpha(opacity=100)';
	pici.style.lineHeight=".1";
	parag = document.createElement( "p" );
//		parag.style.lineHeight="0.01";
		parag.innerHTML = SHOW;
	pici.children[1].parentNode.insertBefore( parag ,pici.children[1]); }

//	http://www.dustindiaz.com/add-remove-elements-reprise/
var Dom = {
  get: function(el) {
    if (typeof el === 'string') {
//		alert("2 el: "+el);
    	if (el.length==0){
//    	  alert("el: "+el+" pix: ");
			return document.body;
    	  }else{return document.getElementById(el);}
    } else {
//		alert("3 el: "+el);
      return el;
 } },
  add: function(el, dest) {
    var el = this.get(el);
    var dest = this.get(dest);
//    dest.insertBefore(el,dest);
    dest.appendChild(el);
  },
  remove: function(el) {
    var el = this.get(el);
    el.parentNode.removeChild(el);
} };

var Event = {
  add: function() {
    if (window.addEventListener) {	//	w3c
      return function(el, type, fn) {
//		alert("1 type: "+type+"\nfn: "+fn+"\nel: "+el);
        Dom.get(el).addEventListener(type, fn, false);
      };
    } else if (window.attachEvent) {	// Microsoft
      return function(el, type, fn) {
        var f = function() {
          fn.call(Dom.get(el), window.event);
        };
        Dom.get(el).attachEvent('on' + type, f);
 }; } }() };

function add_pui(){
	el = document.createElement('object');
//	el.style.clear='both';
//	el.style.overflow='hidden';
	el.style.position='fixed';
	el.style.width=210;	// 187 rt justifiess css right but loses some IE content
	el.style.height=210;
	el.style.zoom=1;	// fails to put in right place by IE http://reference.sitepoint.com/css/haslayout
	el.style.right='0';
//	el.style.right='-23';	// wtf? rght justifies right...!
	el.style.bottom='10';
	el.data='http://db.tgu.ca/srp/globals/pg.htm';
	Event.add(el, 'mouseout', function() {if(ANYACTION==1)this.style.height=15; });
	Event.add(el, 'mouseover',function() { this.style.height=210;});
//	alert('boo');
//	document.body.appendChild(el);
	pics[0].parentNode.insertBefore(el,pics[0]);
}
/*
	pics[0].parentNode.insertBefore(el,pics[0]);
	fl = document.createElement('div');
	fl.style.overflow='hidden';
	fl.style.position='fixed';
	fl.style.width=210;
	fl.style.height=210;
	fl.style.left='0';
	fl.style.bottom='0';
	fl.style.backgroundColor='#cc3';
	el.parentNode.insertBefore(fl,el);
*/
