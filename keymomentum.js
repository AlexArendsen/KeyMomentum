src = '<div id="keymomentum-container">' +
	'<ol id="keymomentum-suggestions"></ol>' +
	'<input type="text" id="keymomentum-input" placeholder="KeyMomentum" />' +
'</div>'

window.keymomentum = {
	keyupTimeout: 0,
	urls: {},
	links: [],
	pageTitle: ""
}

function getLinks() {
	window.keymomentum.links = []
	window.keymomentum.urls = {}

	$('a').each(function(){
		h = $(this).attr('href')
		ttl = $(this).attr('title')||''
		txt = $(this).text()
		img = $(this).find('img:first').attr('src')||$(this).css('background-image').replace(/url\(([^\)]+)\)/,'$1')
		if(h){h = h.replace(/\/$/,'')}
		if(!window.keymomentum.urls[h]){
			window.keymomentum.urls[h] = {
				href: h,
				text: [],
				elem: []
			}
		}

		window.keymomentum.urls[h].elem.push(this)
		if(ttl){window.keymomentum.urls[h].text.push(ttl)}
		if(txt){window.keymomentum.urls[h].text.push(txt)}
		if(img&&img!="none"){window.keymomentum.urls[h].img=img}
	})

	for(k in window.keymomentum.urls){
		window.keymomentum.urls[k].text = window.keymomentum.urls[k].text.join(' | ')
		window.keymomentum.links.push(window.keymomentum.urls[k])
	}
	window.keymomentum.linkFuse = new Fuse(window.keymomentum.links,{
		keys: ["text","href"]
	})
}

function appendSuggestion(opt) {
	out = $('<a href="'+(opt.href||'javascript:void(0)')+'"'+((opt.classes)?' class="'+opt.classes+'"':'')+'>' +
		((opt.img)?'<img src="'+opt.img+'" class="keymomentum-suggestion-image" />':'') +
		'<strong>'+(opt.title||"(No title)")+'</strong>' +
		((opt.subtitle)?'<br><i>'+opt.subtitle+'</i>':'') +
	'</a>').appendTo('#keymomentum-suggestions')
	if(opt.click){$(out).click(opt.click)}
	if(opt.highlight){$(out).on("highlight",function() {
		$('.keymomentum-element-highlighted').removeClass('keymomentum-element-highlighted')
		$(opt.highlight).addClass('keymomentum-element-highlighted')
		sc = $(opt.highlight).filter(':visible').first().offset()
		console.log("Scrolling to "+opt.highlight.length+" elements. First one is at ("+sc.left+","+sc.top+")")
		window.scrollTo(sc.left-($(window).width()/2),sc.top-($(window).height()/2))
	})}
}

function process(src) {
	$('#keymomentum-suggestions').html("")
	if(!src){return ""}

	if(src[0]==":"){
		if(!window.keymomentum.bindingFuse){
			window.keymomentum.bindingFuse = new Fuse(window.keymomentum.bindings,{
				keys: ["title","description"]
			})
		}
		tkns = ksin.match(/^\:([^\s]+)\s*(.+)?$/)
		if(tkns&&(cmd=tkns[1])){
			arg = tkns[2]
			results = window.keymomentum.bindingFuse.search(cmd)
			len = Math.min(results.length,15)
			while(len--) {
				e = results[len]
				appendSuggestion({
					title: e.title,
					subtitle: e.description,
					click: function(){e.call(arg)}
				})
			}
		}


	} else {
		if(!window.keymomentum.linkFuse){
			getLinks()
		}
		results = window.keymomentum.linkFuse.search(ksin)
		len = Math.min(results.length,15)
		while(len--) {
			e = results[len]
			appendSuggestion({
				title: e.text || '(No Title)',
				subtitle: e.href,
				href: e.href,
				img: e.img||"",
				highlight: e.elem
			})
		}
	}
}

$(document).ready(function(){
	$(src).prependTo('body')

	$('body').on("keyup","#keymomentum-input",function(e) {
		ksin = $(this).val()
		if(e.keyCode==13) { // Enter key
			tgt = $('#keymomentum-suggestions a.highlighted')
			url = tgt.attr('href')
			if(!url||url=="javascript:void(0)"){
				$('#keymomentum-input').val("")
				tgt.click()
			} else {
				if(e.ctrlKey||e.shiftKey){
					window.open(url)
				} else {
					window.location = url	
				}
			}
		} else if(ksin!=$(this).attr('data-prev-val')) {
			$(this).attr('data-prev-val',ksin)

			clearTimeout(window.keymomentum.keyupTimeout)
			window.keymomentum.keyupTimeout = setTimeout(function(){
				process(ksin)
				$('#keymomentum-suggestions a:last').addClass('highlighted')
					.trigger('highlight')
			},100)
		}
	}).on("keydown","#keymomentum-input",function(e) {
		if(e.keyCode==38) { // Up Arrow
			tgt = $('a.highlighted').removeClass('highlighted').prev('a')
			if(!tgt.length){tgt = $('#keymomentum-suggestions a:last')}
			$(tgt).addClass('highlighted').trigger('highlight')
		} else if(e.keyCode==40) { // Down Arrow
			tgt = $('a.highlighted').removeClass('highlighted').next('a')
			if(!tgt.length){tgt = $('#keymomentum-suggestions a:first')}
			$(tgt).addClass('highlighted').trigger('highlight')
		}
	}).on("keyup",function(e){
		if(e.keyCode==75&&e.altKey&&e.shiftKey) {
			ksfield = $('#keymomentum-input')
			if($(document.activeElement).is(ksfield)){
				ksfield.attr('placeholder','Reloading links...')
				getLinks()
				ksfield.attr('placeholder','KeyMomentum ('+(window.keymomentum.links.length)+')')
			} else {
				ksfield.focus()
			}
		}
	}).on("focus","#keymomentum-input",function(){$('#keymomentum-container').css({'z-index':'5000'})})
	.on("blur","#keymomentum-input",function(){$('#keymomentum-container').css({'z-index':''})})

	$('#keymomentum-input').focus()
})