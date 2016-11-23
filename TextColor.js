

(function () {	
	//API
	var api = {	
		options:{
			seletor:"",
			splitter: 'char',
			attr:false
		},
		listen: function listen(opts) {
			if (!opts.seletor) return false;
			if (!opts.splitter) opts.splitter = this.options.splitter;	
			if (!opts.attr) opts.attr = this.options.attr;	
			this.injector(opts.seletor, opts.splitter,opts.attr);
			return this;
		},
		getRandomColor : function(){
		  return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
		},
		injector: function (selector, splitter,attr) {	
			console.log(selector)			
			if(typeof selector === "string"){
				if(/\./.test(selector)){
					tAll = document.querySelectorAll(selector);
					i = tAll.length;
					while (i--) {
						this.injector(tAll[i],splitter,attr)
					}
					return
				}else{
					t = document.querySelector(selector);
				}
			}else{
				t = selector;
			}
			
			var text = t.textContent,
				//a = text.split(splitter),
				a,
				after,
				inject = '';
			switch(splitter){
				case 'char':
					a = text.split('');
					after = '';
					break;
				case 'word':
					a = text.split(' ');
					after = ' ';
					break;
				case 'line':
					var r = t.innerHTML;
					var e = document.createElement('div');
					r = r.replace(/<br>/ig, 'eefec303079ad17405c889e092e105b0');
					e.innerHTML = r;
					text = e.textContent;
					a = text.split('eefec303079ad17405c889e092e105b0');
					after = '<br>';
					e = null;//free storge
					break;
				default:
					a = text.split('');
					after = '';
					break;				
			}	
			if (a.length) {
					for(var i = 0; i < a.length; i++) {
						var font_color = api.getRandomColor();
						inject += '<span style="color:'+font_color+'">' + a[i] + '</span>' + after;
					}
					if(attr) t.setAttribute('aria-label', text);
					t.innerHTML = inject;
				}
			}
		}
	this.TextColor = api;
})();