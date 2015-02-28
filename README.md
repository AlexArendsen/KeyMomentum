# KeyMomentum
Keyboard-only web browsing utility for Chrome

**KeyMomentum** is a Chrome extension that enables you to browse and interact
with the web using only your keyboard-- perfect for keeping your hands on the
keys during intense coding sessions, and essential if you ever find yourself
without a pointing device.

## Installation

Add KeyMomentum to Chrome (or Chromium) right now by opening your extensions
window (`chrome://extensions`), enabling Developer Mode, and pressing "Load
Unpacked Extension...". Open KeyMomentum's directory and you'll be good to go!

## How It Works

KeyMomentum places a text box at the bottom right of your browser
window that automatically captures focus once the page is finishes loading (the
shortcut <kbd>Alt</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> can be used to regain
focus on the KeyMomentum text box if necessary).

Simply begin typing into the text box and KeyMomentum will display a list of
links on the current page that match your input. Navigate this list using the
arrow keys, pressing <kbd>Enter</kbd> to select an option
(<kbd>Ctrl</kbd>+<kbd>Enter</kbd> and <kbd>Shift</kbd>+<kbd>Enter</kbd> will
open the selected option in a new window).

Any input starting with a colon (`:`) is processed by KeyMomentum as a command,
which enables you to do just about anything! For example: the command
`:url //github.com` will bring you to GitHub.

A set of core commands come pre-packaged with KeyMomentum (see `bindings.js`),
but adding your own commands is very easy, and is perfect for streamlining your
browsing flow on sites you frequently use.

## Customization

You can add your own functionality to KeyMomentum by writing new commands.
The simplest way to do this is by adding new entries to the `custom.js` file,
which contains a couple of starter commands to serve as an example. Each
command is written as a JSON object with the format:

```javascript
{
	title: "<Command Title>",
	description: "<Command Description>",
	call: function(arg) {
		// function to be executed when the command is entered.
		// argument contains the text entered by the user following
		// the command name, eg: "//github.com" in the previous
		// example
	}
}
```

jQuery is loaded with KeyMomentum, so feel free to use it when writing your
custom commands.
