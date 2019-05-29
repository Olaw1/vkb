
### JavaScript Virtual Keyboard
This project started with a need for simple and easy to use virtual keyboard in websites. The purpose was to make a JavaScript library which anyone could embed into their web pages to support touch screen input. Windows has virtual keyboard for touch screens but its behavior is not well suited for touch screens in public usage. This virtual keyboard acts more like mobile keyboard. It shows up when needed and hides when it is not needed. What makes this keyboard special is its simplicity. Most of the other virtual keyboards are designed for specific frameworks, this one isn't. Every bit of the code has been written in vanilla JavaScript. The development browser was Internet Explorer and the keyboard was tested with Chrome, Firefox, Edge and Safari and it worked on all of them. The code is just under 500 lines or much less if you've no need for numpad. You can just remove parts of the code your project doesn't need.

By default the keyboard has the nordic alphabets, but these can be easily changed (by modifying the values in the script itself).

WARNING: the library doesn't differentiate between devices and the behavior of the website is affected by the keyboard. Device detection is up to you. This is not a problem if your website is designed only for touch screens from the get-go.

#### Use cases:

1. Touch screen support for any website.
2. Systems where touch device is used to obtain user input.

The library can be freely used and modified. No credit or licences required.

![](https://github.com/Olaw1/vkb/blob/master/kb.png)

### Code examples

Example 1 Simple setup

~~~html 
<script src="./VKB.js"></script>
<script>
  VKB.CreateKeyboard();
  VKB.AutoBind();
</script>
~~~

In the example above we first reference the JavaScript file for the virtual keyboard. In the following script tag we call the CreateKeyboard function, which generates the keyboard. Then we call AutoBind which finds all textareas and input elements with types: text, email and password in the webpage and adds focus listener to them. When those inputs get focus the keyboard will appear below them.
To make the keyboard look more user friendly we can center it with `VKB.CenterKeyborad();` function. We can also DisableZoom with `VKB.DisableZoom();` and disable right click with `VKB.DisableRightClick();`. To make the keyboard scale nicely, you can use `VKB.AutoSize();`.

Example 2 Setup

~~~html
<script src="./VKB.js"></script>
<script>
  VKB.CenterKeyboard();
  VKB.DisableZoom();
  VKB.DisableRightClick();
  VKB.CreateKeyboard();
  VKB.AutoBind();
  window.onresize = function(event) {
    VKB.AutoSize();
  };
</script>
~~~

Example 3 Binding single element or an array of elements


~~~html
<div id="inputs">
  <input type="text">
  <input type="text">
  <input type="text">
</div>
<input type="text" id="test_input">
<script src="./VKB.js"></script>
<script>
  VKB.CenterKeyboard();
  VKB.CreateKeyboard();
  VKB.Bind(document.getElementById("test_input"));
  VKB.Bind(document.getElementById("inputs").childNodes);
</script>
~~~


Example 4 Styling

~~~html
<script src="./VKB.js"></script>
<script>
  VKB.CenterKeyboard();
  VKB.KeyboardParentStyles({
	backgroundColor: "#bc67ad"
  });
  VKB.KeyStyles({
	color: "black",
	backgroundColor: "#e072b6",
	margin: "10px"
  });
  VKB.SpecialKeyStyles({
	color: "black",
	backgroundColor: "#e072b6"
  });
  VKB.KeyFocusStyle({
	borderColor: "#f41804"
  });
  VKB.CreateKeyboard(true);
  VKB.AutoBind();
</script>
~~~

Result:

![](https://github.com/Olaw1/vkb/blob/master/kb2.png)
