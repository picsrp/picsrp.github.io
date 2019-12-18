function slide(){
u=[["http://db.tgu.ca/srp/shows/0/5/gina-555/thm/",
"http://db.tgu.ca/srp/shows/0/4/mystic04/thm/",
"http://tgu.ca/pix/",
"http://db.tgu.ca/srp/shows/0/7/gina-0707/thm/",""],
["http://db.tgu.ca/srp/shows/0/5/gina-555/web/",
"http://db.tgu.ca/srp/shows/0/4/mystic04/web/",
"http://db.tgu.ca/srp/shows/0/4/mystic04/web/",
//"http://tgu.ca/pix/",
"http://db.tgu.ca/srp/shows/0/7/gina-0707/web/",""]]
gp="http://i.tgu.ca/poem-genies_sonnet";
l= [["a1021243.jpg", "a1021246.jpg", "a1021247.jpg", "a1021248.jpg", "a1021007.jpg", "a1021016.jpg", "a1021019.jpg", "a1021031.jpg", "a1021032.jpg", "a1021034.jpg", "a1021049.jpg", "a1021054.jpg", "a1021076.jpg", "a1021077.jpg", "a1021082.jpg", "a1021125.jpg", "a1021195.jpg", "a1021203.jpg", "a1021212.jpg", "a1021235.jpg", "a1021234.jpg", "a1021238.jpg", "a1021241.jpg", "a1021242.jpg"],
["a1006991.jpg", "a1006553.jpg", "a1006911.jpg", "a1007021.jpg"],
["a1006991.jpg", "a1006553.jpg", "a1006911.jpg", "a1007021.jpg"], //subst for intiman
//["intiman-04-t.jpg", "intiman-05-t.jpg", "intiman-07-t.jpg", "intiman-11-t.jpg", "intiman-12-t.jpg", "intiman-13-t.jpg", "intiman-17-t.jpg", "gina-12-blur.jpg"],
["7d016333.jpg", "7d016344.jpg", "7d016351.jpg", "7d016352.jpg", "7d016366.jpg", "7d016373.jpg", "7d016377.jpg", "7d016391.jpg", "7d016393.jpg", "7d016397.jpg", "7d016399.jpg", "7d016401.jpg", "7d016411.jpg", "7d016416.jpg", "a1034010.jpg", "7d016309.jpg", "7d016314.jpg", "7d016326.jpg"],
	[]];
simg = new Image(1,1);
rez=3; tw=0; base=0; mdb=0; kc=0; ival=1;
imgs=document.getElementsByTagName("img");
llm1=l.length-1;
for(ii=[0]; llm1>=ii.push(0););
document.onkeyup = keys;
fs()	}

function keys(ee){ kcm=kc;
	if(ee.keyCode) {kc=ee.keyCode;
		kChar=String.fromCharCode(kc);	}
	x=base;
	switch (kc)	{
		case 73:	//I Increase Rez
			rez++;			break;
		case 82:	//R Reset Rez
			rez=2;			break;
		case 69:	//E everything in a slide show
//			if(1==ival) simg.src='http://i.tgu.ca/pics-gina_ks';
		case 70:	//F no bug
			everything();
			ival++;	break;
		case 72:	//H Prev list
			mdb=base;base-=1;	if(base<0)	base=llm1;
			fs();			break;
		case 74:	//J Prev pic
			prevPic(x); break;
		case 75:	//K Next pic
			nextPic(x); break;
		case 76:	//L Next list
			mdb=base;base+=1;	if(base>llm1)	base=0;
			fs();			break;
		case 83:	//S inc ival 4 slideshow (start too!) bug
//			if(1==ival) simg.src='http://i.tgu.ca/pics-gina_ks';
		case 85:	//U inc ival 4 slideshow (start too!)
			if(1==ival) slideshow();
			ival++;		break;
		case 13:	//CR Copy pic to save list, or delete
			if(x==llm1)
			{//at, so delete
				for(iix=ii[x]; iix<l[x].length; iix++)	{
					if(iix<l[x].length-1) l[x][iix]=l[x][iix+1]	}
				l[x].pop();
				if(ii[x]>=l[x].length-1)ii[x]=0;
				if(0==l[x].length){
					imgs[x].title=" ";	imgs[x].src=" ";
					break;};
				iix=ii[x];
				pic=l[x][iix];
				url=u[1][x]+pic;
				imgs[x].src=url;
				imgs[x].title="pic "+pic;
//				changePic(llm1);
			}else{//other, so add
				pic=l[x][ii[x]];
				url=u[1][x]+pic;
				l[llm1].push(url);
				ii[llm1]=l[llm1].length-1;
				imgs[llm1].src=url;
				imgs[llm1].title="pic "+pic;
			}	break;
		case 27:	//a(ESC|~) Genie Poem
		case 192: if(kcm==65)parent.location=gp; break;
		default:	//	alert(kc+", unKey : "+kChar);
			break;	}	}

function fs(){
	for(i=0;i<=llm1;i++)
		imgs[i].style.borderColor="#f33";
	imgs[base].style.borderColor="#3f3";	}
function dragPic(){x=mdb;
	nextPic(x);
	pic=l[x][ii[x]];
	url=u[1][x]+pic;
	l[llm1].push(url);
	ii[llm1]=l[llm1].length-1;
	imgs[llm1].src=url;
	imgs[llm1].title="pic "+pic;	}
function prevPic(x){decPic(x); changePic(x)}
function nextPic(x){incPic(x); changePic(x)}
function decPic(x){
	ii[x]-=1;	if(ii[x]<0)	ii[x]=l[x].length-1;}
function incPic(x){
	ii[x]+=1;	if(ii[x]==l[x].length)	ii[x]=0;}
function changePic(x){
//	base=x;
	if(l[x].length>0){
		pic=l[x][ii[x]];
		url=u[tw][x]+pic;
		imgs[x].src=url;
		imgs[x].title="pic "+pic;	}	}
function slideshow() {
	nextPic(llm1); rpt() }
function rpt() {
	setTimeout(function(){slideshow()}, ival*1000); }
function everything()	{
	for(xx=0;xx<llm1;xx++)	{
		url=u[1][xx];
		for(j=0;j<l[xx].length-1;j++)	{
			l[llm1].push(url+l[xx][j]);	}	}
	if(1==ival){ slideshow(); };
}
