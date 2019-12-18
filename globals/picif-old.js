/*	--	--	contact & purpose	--	--	--	--	--picif.js	Picture InterFace
ghh 91201	krsnadas.srp@gmail.com

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
	ds0=-1;ds1=-1;
	divOld=-1;
	click=0;beg=1;end=2;drag=3;

// Move a dom element.
function moveEle( a, b )	{	b.parentNode.insertBefore(a,b);	}

function gesture() {	// mouse gestures mark:
	if(-1!=divStart) opal(divStart,op);
	//erase translucency if it exists
	while(gesDiv.length) gesDiv.pop();	// clear old gestures

// type of gesture
	if(9> Math.abs(xsStart-xsEnd)+Math.abs(ysStart-ysEnd)){		gest=click;
		if(ds1==divStart) {
					ds0=-1;ds1=-1;
					gest= end; // triple click
			}else if(ds0==divStart) {
					ds0=-1; ds1=divStart;
					gest= beg; // double click
			}else if((divOld!=-1)&&(divOld!=divStart)) {
				divStart=divOld;
				ds0=-1;	ds1=-1;
				gest= drag; // drag alike, move it
			}else { // (first) click
				ds0=divStart; ds1=-1;
				divOld=divStart;
				gest=click; }
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
			for(pivot=0;pix[pivot]!=divStart;pivot++);
			for(i=lenPics;i>=pivot;i--) gesDiv.push(pix[i]);
		break;
	case drag:	// drag
			moveEle(divStart,divEnd);
			divOld=-1;
			divStart=-1;
		break;
	case click:	// click
			gesDiv.push(divStart);
		break;
	default:
		break;
}	}

function keys(ee) {	// Actions
	if(!divStart) return;
//browser compatibility
	if(!ee)var ee=window.event;
//work
	divOld=-1;	// old not used with any key
	divStart=-1;	// Start not used with any key
	ds0=-1;	ds1=-1;	// reset ds's
//	switch on key stroke actions
var action=1;
	if(ee.keyCode) kc=ee.keyCode;
	switch (String.fromCharCode(kc))	{
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
		while(gesDiv.length)	gesDiv.pop().children[0].height/=ff;
			break;

	case "W":	// web
		while(gesDiv.length)	{
			atPic=gesDiv.pop().children[0];
			atPic.height=360;
			size(atPic);	}
		break;

	case "T":	// thm
		while(gesDiv.length)	gesDiv.pop().children[0].height=99;
		break;

	case "U":	// un
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

	case "X":	// eXtra size it
		while(gesDiv.length)	{
			atPic=gesDiv.pop().children[0];
			fullsize(atPic);	}
		break;

	case "Y":	// extra extra size it
		while(gesDiv.length)	{
			atPic=gesDiv.pop().children[0];
			hisize(atPic);	}
		break;

	default:
		action=0;	// ANALYTICS: invalid action
	break;
}
if(0<=ANALYTICS&&action==1)	IMGS[ANALYTICS].src=
	"http://bit.ly/"+String.fromCharCode(kc)+"-picaction";
}
/*http://dl.dropbox.com/u/3595000/srp/globals/icon/if/a/../../bg.gif
http://bit.ly/A-picaction+
http://bit.ly/D-picaction+
http://bit.ly/F-picaction+
http://bit.ly/G-picaction+
http://bit.ly/L-picaction+
http://bit.ly/S-picaction+
http://bit.ly/T-picaction+
http://bit.ly/U-picaction+
http://bit.ly/W-picaction+
http://bit.ly/X-picaction+
http://bit.ly/Y-picaction+
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

function size(nn) {
	if(nn.src.match("\.th"))	{
			nn.src= nn.src.replace("thm","web");
			nn.src= nn.src.replace("th.","");
			var s=nn.src.split("/");
			nn.title= SHOW+"/"+s[s.length-1];
	}else if((SBIG<nn.height) & (SBIG*ff>nn.height)){
		var s=nn.alt.split("%");
		if(s.length>0) {
			nn.src= s[0];
//			alert("src: "+nn.src+"\ns: "+s+"\nnn.height: "+nn.height);
			nn.title+= "+";	}
	}else if((2*SBIG<nn.height) & (2*SBIG*ff>nn.height)){
		var s=nn.alt.split("%");
		if(s.length>1) {
			nn.src= s[1];
			nn.title+= "+";	}
/**/
}	}

function fullsize(nn) {
	if(nn.lowsrc.match("\."))	{
			nn.src= nn.lowsrc;
			nn.title+= "+";
}	}

function hisize(nn) {
	if(nn.alt.match("\."))	{
			nn.src= nn.alt;
			nn.title+= "+";
}	}

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
	s=s[s.length-1].split("\.");
	SHOW=s[0];

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
}

function prep_pic(pici)	{
	pici.onmousedown=down;
	pici.onmouseup=up;
	pici.style.opacity=1;
	pici.style.filter='alpha(opacity=100)';
}
