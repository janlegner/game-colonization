$(document).ready(function(){
	(function(t, $, undefined){
		t.w=25;
		t.ar=[];
		t.begin=function(s){
			var p, pp=t.ar.length;
			for(p=0;p<pp;p++)
				if(t.ar[p].id==s)
					break;
			var newTime=(new Date()).getTime();
			if(p==pp)
				t.ar.push({id:s, time:newTime});
			else
				t.ar[p].time=newTime;
		}
		t.end=function(s){
			var p, pp=t.ar.length;
			for(p=0;p<pp;p++)
				if(t.ar[p].id==s)
					break;
			if(p==pp)
				return;
			var str=t.ar[p].id+": ";
			for(var i=0, ii=t.w-str.length;i<ii;i++)
				str=" "+str;
			console.log(str, (new Date()).getTime()-t.ar[p].time);
		}
	}(window.t = window.t || {}, $));
});
