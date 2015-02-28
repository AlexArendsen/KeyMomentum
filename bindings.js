window.keymomentum.bindings = [
	{
		title: "Click Element",
		description: "Simulate a click on an element using jQuery / Sizzle selector",
		call: function(arg){
			$(arg).first().click()
		}
	},
	{
		title: "Top",
		description: "Scroll to top of document",
		call: function(){
			window.scrollTo(0,0)
		}
	},
	{
		title: "Form focus",
		description: "Find a form on the page with the matching terms and focus on it",
		call: function(arg){
			if(!arg){
				$('form:visible:first').focus()
			} else {
				$('form:visible').filter(function(){
					return $(this).html().search(arg.replace(' ','|'))!=-1
				}).first().find('input:not([type=button], [type=submit]):visible:first').focus()
			}
		}
	},
	{
		title: "Google",
		description: "Search for something on Google",
		call: function(arg){
			window.location="http://www.google.com/search?q="+arg;
		}
	},
	{
		title: "Evaluate JavaScript",
		description: "Evaluate a JavaScript expression, jQuery loaded.",
		call: eval
	},
	/*{
		title: "Enumerate Elements",
		description: "Place numbers on each element matching a given jQuery / Sizzle selector",
		call: function(arg){
			$('.enumeration-number').remove()
			$('.enumerated').each(function(){
				$(this).css({border:$(this).attr('data-default-border')})
			})
			idx = 0
			colors = ['#F00','#0F0','#00F','#FF0','#0FF','#F0F']
			$(arg).each(function() {
				c = colors[idx%colors.length]
				$(this).before("<span class='enumeration-number' style='background-color:"+c+"'>"+idx+"</span>")
					.attr('data-default-border',$(this).css('border'))
					.css({border:'solid 2px '+c}).addClass('enumerated')
				idx+=1
			})
		}
	},*/
	{
		title: "Go to URL",
		description: "Go to a URL",
		call: function(arg){
			window.location = arg
		}
	},
	{
		title: "Back",
		description: "Go back",
		call: function(){
			window.history.go(-1)
		}
	},
	{
		title: "Forward",
		description: "Go forward",
		call: function(){
			window.history.go(1)
		}
	}
]