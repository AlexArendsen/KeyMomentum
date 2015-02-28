custom = [
	{
		title: "Test Command",
		description: "Test command description",
		call: function(arg){
			alert("Hello, "+(arg||"World")+"!")
		}
	},
	{
		title: "yt control",
		description: "Basic video control on YouTube.com. next | prev | skip | pause | start",
		call: function(arg){
			lkp = {
				skip: function(){$('.videoAdUiSkipButton').click()},
				next: function(){$('.ytp-button-next').click()},
				prev: function(){$('.ytp-button-prev').click()},
				pause: function(){$('video:first').click()},
				start: function(){$('video:first').click()}
			}
			if(clo=lkp[arg]){
				clo()
			} else {
				$('video:first').click()
			}
			setTimeout(function(){$('#keymomentum-input').focus()},240)
		}
	},
]

for(c in custom){window.keymomentum.bindings.push(custom[c])}