
var VKB = (function(){
  var letter_row0 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "@"]
  var letter_row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Å"];
  var letter_row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ö", "Ä"];
  var letter_row3 = ["⇩","","Z", "X", "C", "V", "B", "N", "M", "", "CE"];
  var letter_row4 = ["␣", "⌫", "✔"];
  var focused_input = null;
  var upper = true;

  var keyStyles = {
    fontSize: "1.5vw",
    fontWeight: "bold",
    padding: "3%",
    borderColor: "#505050",
    borderStyle: "solid",
    borderRadius: "5px",
    borderWidth: "2px",
    textAlign: "center",
    cursor: "pointer",
    width: "5%",
    height: "100%",
    color: "#fcbf00"
  };

  var specialKeyStyles = {
    fontSize: "1.5vw",
    fontWeight: "bold",
    padding: "3%",
    borderColor: "#505050",
    borderStyle: "solid",
    borderRadius: "5px",
    borderWidth: "2px",
    textAlign: "center",
    cursor: "pointer",
    width: "10%",
    height: "100%",
    color: "#fcbf00"
  };

  var rowStyles = {
    height: "calc(100%/3)"
  };

  var keyParentStyles = {
    marginTop: "1%",
    fontFamily: "'Trebuchet MS', Arial, Helvetica, sans-serif",
    width: "100%",
    borderRadius: "10px",
    tableLayout: "fixed"
  };

  var specialKeyParentStyles = {
    width: "100%"
  };

 var rootStyles = {
   position: "absolute",
   left: "25%",
   top: "25%",
   width: "50%",
   backgroundColor: "#303030",
   borderRadius: "5px",
   padding: "1%",
   color: "white",
   display: "none"
 };

 var keyFocusStyles = {
   borderColor: "#fcbf00"
 };

 var keyUnfocusStyles = {
   borderColor: "#505050"
 };

 var cent = false;

  return {
  CreateKeyboard: function(extended){
    var root = document.createElement('div');
    root.id = "keyboard_parent";
    for(var key in rootStyles){
      root.style[key] = rootStyles[key];
    }

    var keyboard = document.createElement('table');
    for(var key in keyParentStyles){
      keyboard.style[key] = keyParentStyles[key];
    }

    if(extended){
      keyboard.appendChild(this.CreateRow(letter_row0), 0);
      letter_row3[1] = ".";
    }
    keyboard.appendChild(this.CreateRow(letter_row1, 1))
    keyboard.appendChild(this.CreateRow(letter_row2, 2));
    keyboard.appendChild(this.CreateRow(letter_row3, 3));

    var ops = document.createElement('table');
    for(var key in specialKeyParentStyles){
      ops.style[key] = specialKeyParentStyles[key];
    }
    var tr4 = document.createElement('tr');
    for(var i = 0; i < letter_row4.length; i++){
      var td = document.createElement('td');
      for(var key in specialKeyStyles){
        td.style[key] = specialKeyStyles[key];
      }
      td.innerHTML = letter_row4[i];
      td.addEventListener('focus', this.Focused, false);
      td.addEventListener('mouseenter', this.Focused, false);
      td.addEventListener('mouseout', this.Unfocused, false);
	  td.addEventListener('click', this.GetKey, false);
      tr4.appendChild(td)
    }
    ops.appendChild(tr4);
    root.appendChild(keyboard);
    root.appendChild(ops);
    document.body.appendChild(root);
    return root;
  },
  CreateRow: function(items, id){
      var tr = document.createElement('tr');
      for(var key in rowStyles){
        tr.style[key] = rowStyles[key];
      }
      tr.id ="keyboard_row_"+id;
      for(var i = 0; i < items.length; i++){
        var td = document.createElement('td');
        for(var key in keyStyles){
        td.style[key] = keyStyles[key];
        td.addEventListener('mouseenter', this.Focused, false);
        td.addEventListener('mouseout', this.Unfocused, false);
          td.addEventListener('click', this.GetKey, false);
        }
      td.innerHTML = items[i];
      tr.appendChild(td)
    }

    return tr;
  },
  Focused: function(e){
  for(var key in keyFocusStyles){
    e.target.style[key] = keyFocusStyles[key];
  }
  },

  Unfocused: function(e){
    for(var key in keyUnfocusStyles){
      e.target.style[key] = keyUnfocusStyles[key];
    }
  },

  GetKey: function(e){
	  if(focused_input != null){
      var txt = "value";
      if(focused_input.tagName != "INPUT"){
        txt = "innerText";
      }
		  if(e.target.innerHTML === letter_row4[1]){
			  focused_input[txt] = focused_input[txt].slice(0, -1);
			  return -1;
		  }
		  if(e.target.innerHTML === letter_row4[0]){
			  focused_input[txt] = focused_input[txt] + " ";
			  return 1;
		  }
		  if(e.target.innerHTML === letter_row4[2]){
			  document.getElementById('keyboard_parent').style.display = "none";
			  if(focused_input != null){
				  focused_input.blur();
			  }
			  return 1;
		  }

      if(e.target.innerHTML === letter_row3[0]){
        var row1 = document.getElementById('keyboard_row_1');
        var row2 = document.getElementById('keyboard_row_2');
          var row3 = document.getElementById('keyboard_row_3');

        if(upper){
          for(var i = 0; i < row1.childNodes.length; i++){
            row1.childNodes[i].innerHTML = row1.childNodes[i].innerHTML.toLowerCase();
          }
          for(var i = 0; i < row2.childNodes.length; i++){
            row2.childNodes[i].innerHTML = row2.childNodes[i].innerHTML.toLowerCase();
          }
          for(var i = 0; i < row3.childNodes.length-2; i++){
            row3.childNodes[i].innerHTML = row3.childNodes[i].innerHTML.toLowerCase();
          }

          row3.childNodes[0].innerHTML = "⇧";
          letter_row3[0] = "⇧";
          upper = false;
        }else{
           for(var i = 0; i < row1.childNodes.length; i++){
            row1.childNodes[i].innerHTML = row1.childNodes[i].innerHTML.toUpperCase();
          }
          for(var i = 0; i < row2.childNodes.length; i++){
            row2.childNodes[i].innerHTML = row2.childNodes[i].innerHTML.toUpperCase();
          }
          for(var i = 0; i < row3.childNodes.length-2; i++){
            row3.childNodes[i].innerHTML = row3.childNodes[i].innerHTML.toUpperCase();
          }

          row3.childNodes[0].innerHTML = "⇩";
          letter_row3[0] =  "⇩";
          upper = true;
        }
          return 1;
      }

		  if(e.target.innerHTML === letter_row3[letter_row3.length-1]){
			  focused_input[txt] = "";
			  return -1;
		  }
		  focused_input[txt] = focused_input[txt] + e.target.innerHTML;
	  }
  },

  InputFocused: function(e){
	  var kp = document.getElementById('keyboard_parent');
	  var inp = e.target;
	  focused_input = inp;
    	  kp.style.display = "block";
	var rect = focused_input.getBoundingClientRect();
     if(cent){
      var height = rect.height;
      kp.style.top = (rect.top+height+5)+"px";
      kp.style.left = (rect.left+(rect.width/2)-(kp.clientWidth/2))+"px";
    }else{
  	  var height = focused_input.offsetHeight;
  	  kp.style.top = (focused_input.offsetTop+height+5)+"px";
  	  kp.style.left = focused_input.offsetLeft+"px";
    }
  },
  InputUnfocused: function(e){
	 var kp = document.getElementById('keyboard_parent');
	 kp.style.display = "none";
  },
  Bind: function(arr){
	  if(arr instanceof Array){
		  for(var i = 0; i < arr.length; i++){
			  arr[i].addEventListener("focus", this.InputFocused, false);
			  //arr[i].addEventListener("blur", this.InputUnfocused, false);
		  }
	  }else{
		  arr.addEventListener("focus", this.InputFocused, false);
		  //arr.addEventListener("blur", this.InputUnfocused, false);
	  }
  },
  AutoBind: function(){
	  var inputs = document.getElementsByTagName('input');
	  var textareas = document.getElementsByTagName('textarea');
	  for(var i = 0; i < inputs.length; i++){
		  var typ = inputs[i].type;
		  if(typ === "text" || typ === "password" || typ === "email"){
			  this.Bind(inputs[i]);
		  }
	  }
	  for(var j = 0; j < textareas.length; j++){
			  this.Bind(textareas[j]);
	  }
  },
  KeyStyles: function(styles){
    for(var key in styles){
      keyStyles[key] = styles[key];
    }
  },
  SpecialKeyStyles: function(styles){
    for(var key in styles){
      specialKeyStyles[key] = styles[key];
    }
  },
  KeyParentStyles: function(styles){
    for(var key in styles){
      keyParentStyles[key] = styles[key];
    }
  },
  KeyboardParentStyles: function(styles){
    for(var key in styles){
      rootStyles[key] = styles[key];
    }
  },

  KeyboardRowStyles: function(styles){
    for(var key in styles){
      rowStyles[key] = styles[key];
    }
  },
  SpecialKeyParentStyles: function(styles){
    for(var key in styles){
      specialKeyParentStyles[key] = styles[key];
    }
  },

  KeyFocusStyle: function(styles){
    for(var key in styles){
      keyFocusStyles[key] = styles[key];
    }
  },

  KeyUnfocusStyle: function(styles){
    for(var key in styles){
      keyUnocusStyles[key] = styles[key];
    }
  },
  CenterKeyboard: function(){
    cent = true;
  },
  DisableRightClick: function(){
    document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
  },
  DisableZoom: function(){
    var met = document.createElement('meta');
    met.name = "viewport";
    met.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.getElementsByTagName("head")[0].appendChild(met);
  }
  };
})();


var VNP = (function(){
	var row1 = ["0", "1", "2", "3", "4"];
	var row2 = ["5", "6", "7", "8", "9"];
	var row3 = ["CE", "", "", "⌫", "✔"];
	var cent = true;
	var focused_input = null;
	 var keyStyles = {
		fontSize: "1.5vw",
		fontWeight: "bold",
		padding: "3%",
		borderColor: "#505050",
		borderStyle: "solid",
		borderRadius: "5px",
		borderWidth: "2px",
		textAlign: "center",
		cursor: "pointer",
		width: "5%",
		height: "100%",
		color: "#fcbf00"
	};

	var rootStyles = {
		position: "absolute",
		left: "25%",
		top: "25%",
		width: "50%",
		backgroundColor: "#303030",
		borderRadius: "5px",
		padding: "1%",
		color: "white",
	};

	 var rowStyles = {
		height: "calc(100%/3)"
	};

	  var keyParentStyles = {
		marginTop: "1%",
		fontFamily: "'Trebuchet MS', Arial, Helvetica, sans-serif",
		width: "100%",
		borderRadius: "10px",
		tableLayout: "fixed"
	  };

	   var keyFocusStyles = {
		  borderColor: "#fcbf00"
		};

		 var keyUnfocusStyles = {
		   borderColor: "#505050"
		 };


	return{
		CreateNumpad: function(){

			var root = document.createElement('div');
			root.id = "numpad_parent";
			for(var key in rootStyles){
				root.style[key] = rootStyles[key];
			}


			var numpad = document.createElement('table');
			for(var key in keyParentStyles){
			  numpad.style[key] = keyParentStyles[key];
			}

			numpad.appendChild(this.CreateRow(row1));
			numpad.appendChild(this.CreateRow(row2));
			numpad.appendChild(this.CreateRow(row3));
			root.appendChild(numpad);
			document.body.appendChild(root);
	},

	CreateRow: function(items){
			var tr = document.createElement('tr');
			for(var key in rowStyles){
				tr.style[key] = rowStyles[key];
			}
			tr.id ="numpad_row_1";
			for(var i = 0; i < items.length; i++){
			  var td = document.createElement('td');
			  for(var key in keyStyles){
				td.style[key] = keyStyles[key];
				td.addEventListener('mouseenter', this.Focused, false);
				td.addEventListener('mouseout', this.Unfocused, false);
			    td.addEventListener('click', this.GetKey, false);
			  }
			td.innerHTML = items[i];
			tr.appendChild(td)
		}

		return tr;
	},
	  Bind: function(arr){
	  if(arr instanceof Array){
		  for(var i = 0; i < arr.length; i++){
			  arr[i].addEventListener("focus", this.InputFocused, false);
		  }
	  }else{
		  arr.addEventListener("focus", this.InputFocused, false);
	  }
	},
	  InputFocused: function(e){
	  var kp = document.getElementById('numpad_parent');
	  var inp = e.target;
	  focused_input = inp;
    kp.style.display = "block";
    if(cent){
      var height = focused_input.offsetHeight;
      kp.style.top = (focused_input.offsetTop+height+5)+"px";
      kp.style.left = (focused_input.offsetLeft+(focused_input.clientWidth/2)-(kp.clientWidth/2))+"px";
    }else{
  	  var height = focused_input.offsetHeight;
  	  kp.style.top = (focused_input.offsetTop+height+5)+"px";
  	  kp.style.left = focused_input.offsetLeft+"px";
    }
	},
	  GetKey: function(e){
	  if(focused_input != null){
      var txt = "value";
      if(focused_input.tagName === "DIV"){
        txt = "innerText";
      }
		  if(e.target.innerHTML === row3[3]){
			  focused_input[txt] = focused_input[txt].slice(0, -1);
			  return -1;
		  }
		  if(e.target.innerHTML === row3[4]){
			  document.getElementById('numpad_parent').style.display = "none";
			  if(focused_input != null){
				  focused_input.blur();
			  }
			  return 1;
		  }

		  if(e.target.innerHTML === row3[0]){
			  focused_input[txt] = "";
			  return -1;
		  }
		  focused_input[txt] = focused_input[txt] + e.target.innerHTML;
	  }
  },
	  InputUnfocused: function(e){
		 var kp = document.getElementById('numpad_parent');
		 kp.style.display = "none";
	  },
	  KeyFocusStyle: function(styles){
		for(var key in styles){
		  keyFocusStyles[key] = styles[key];
		}
	  },

	  KeyUnfocusStyle: function(styles){
		for(var key in styles){
		  keyUnocusStyles[key] = styles[key];
		}
	  },
	    Focused: function(e){
		  for(var key in keyFocusStyles){
			e.target.style[key] = keyFocusStyles[key];
		  }
		},

	  Unfocused: function(e){
		for(var key in keyUnfocusStyles){
		  e.target.style[key] = keyUnfocusStyles[key];
		}
	  },
}
})();
