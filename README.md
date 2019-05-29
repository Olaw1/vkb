
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


~~~html
<script src="./VKB.js"></script>
~~~
