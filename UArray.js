global.UArray={
	slice:Array.prototype.slice,
	slice1:function(a){ return UArray.slice.call(a,1); },
	
	has:function(a,searchElement,i){ return a.indexOf(searchElement,i) !== -1; },
	hasAmong:function(a,searchElements,i){
		for(var j=0, l=searchElements.length; j<l ; j++)
			if(a.indexOf(searchElements[j],i) !== -1) return true;
		return false;
	},
	remove:function(a,elt){
		var i=a.indexOf(elt);
		if(i) return a.splice(i,1);
		return a;
	},
	
	last:function(a){return a[a.length-1]},//TODO 
	
	/* same as Array.forEach but breaks when return false in callback */
	forEach:function(a,fn,thisArg){
		for(var i = 0, len = this.length; i < len; ++i) {
			if(fn.call(scope, a[i], i, thisArg)===false) break;
		}
	},
	
	sortF:{
		'':function(a,b){
			if(a < b) return -1;
			if(a > b) return 1;
			return 0;
		}
	},
	
	sortBy:function(a,propName,desc,sortFunc){
		if(!S.isFunc(sortFunc)) sortFunc=UArray.sortF[sortFunc===undefined?'':sortFunc];
		return a.sort(function(a,b){
			if(desc){ var c=a; a=b; b=c; } 
			return sortFunc(a[propName],b[propName]);
		});
	},
	
	
	
	findBy:function(a,propName,val){
		var k=UArray.findKeyBy(propName,val);
		if(k===false) return k;
		return a[k];
	},
	findKeyBy:function(a,propName,val){
		var res=false;
		UArray.forEach(a,function(v,k){
			if(v[propName] == val){
				res=k;
				return false;
			}
		});
		return res;
	},
	
	eq:function(a1,a2){
		if(!S.isArray(a2) || a1.length != a2.length) return false;
		for (var i = 0; i < a2.length; i++) {
			/*if (this[i].compare) { 
				if (!this[i].compare(testArr[i])) return false;
			}*/
			if(a1[i] !== a2[i]) return false;
		}
		return true;
	}
};