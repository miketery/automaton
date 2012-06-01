function draw() {
   //get vars from user input
   var rule = $('#rule').val();
   var seed = $('#seed').val();
   var width = $('#width').val();
   var height = $('#height').val();
   var grain = $('#grain').val();
   if($('#link').val()==1) {$('#seed').val('custom') && $('#link').val(0); seed='custom';}

   //check bounds
   ((rule>=0 && rule<=255) ? null : rule=110); //check rule bounds
   ((width>=100 && width<=2048) ? null : width=960); //check width bounds
   ((height>=100 && height<=8192) ? null : height=2048); //check height bounds
   ((grain>=1 && grain<=40) ? null : grain=8); //check grain bounds
   //seed do seperately in doseed function later
   
   //define number of coloumns and rows (as per pixel dimention and grain size
   var cols=(width-width%grain)/grain; 
   var rows=(height-height%grain)/grain;

   //new dimensions so that grain fits
   width=cols*grain;
   height=rows*grain;

   //start canvas
   var canvas = document.getElementById('canvas');
   //set dimentions
   canvas.setAttribute('width',width);
   canvas.setAttribute('height',height);
   //start context
   var ctx = canvas.getContext ("2d");
   //draw background
   ctx.fillStyle="rgb(0,0,200)";
   ctx.fillRect (0,0,width,height);
   //color for pattern
   ctx.fillStyle="rgb(255,255,255)";
   
   //define the rule
   var rule_a=make_rule(rule);
   //make top row or the seed
   var seed=doseed(seed,cols);
   var cur_row=seed; //seed is needed in making link, cur_row used in actual build

   //start drawing the pattern as per the initial seed and the rule (execute at donext
   for(var i=0; i<rows; i++) {
      for(var j=0; j<cols; j++) {
         if(cur_row[j]==1) {
            ctx.fillRect(j*grain,i*grain,grain,grain);
            } 
         }
      cur_row=donext(rule_a,cur_row,cols);
      }
   make_link(rule,width,height,grain,seed);
   return false;
   }
function donext(rule,row,cols) {
   var tmp_row=new Array();
   var num=0;
   for(var i=0; i<cols; i++) {
      if(i==0) 
         num=2*row[i]+row[i+1];
      else if(i==cols-1)
         num=4*row[i-1]+2*row[i]; 
      else 
         num=4*row[i-1]+2*row[i]+row[i+1];

      if(rule[num]==1)
         tmp_row[i]=1;
      else 
         tmp_row[i]=0;
      }
   return tmp_row; 
   }
Math.base = function(n, from, to) {
   return parseInt(n, from).toString(to);
   }
function make_rule(rule) {
   var rule_a=new Array();
   for(var i=7; i>=0; i--) {
      rule_a[i]=0;
      if(Math.pow(2,i)<=rule) {
         rule_a[i]=1;
         rule=rule-Math.pow(2,i);
         } 
      }
   return rule_a;
   }
function doseed(seed,cols) {
   var cur_row=new Array();
   cur_row=clear_row(cur_row,cols);
   //switch case define seed blah blah
   switch(seed) {
      case 'left':
         cur_row[0]=1;
         break;
      case 'right':
         cur_row[cols-1]=1;
         break;
      case 'random':
         for(var i=0; i<cols; i++) {
            if(Math.random()>0.5)
               cur_row[i]=1;
            }
         break;
      case 'alternating':
         for(var i=0; i<cols; i++) {
            if(i%2==0)
               cur_row[i]=1;
            }
         break;
     /* case 'custom':
         alert(Math.base($('#custom_seed').val(),36,2));
         var binary=Math.base($('#custom_seed').val(),36,2).split('');
         binary.reverse();
         for(var i=0; i<binary.length; i++) {
            cur_row[cols-i]=binary[i];
            }
         break;*/
      default:
         var mid=Math.floor(cols/2); 
         cur_row[mid]=1;
      }
   return cur_row;
   }
function clear_row(row,cols) {
   for(var i=0; i<cols; i++) {
      row[i]=0;
      }
   return row;
   }
function make_link(rule,width,height,grain,seed) {
   $(".link").attr("href","http://"+window.location.hostname+"/proj/automaton/"+
      "?rule="+rule+
      "&width="+width+
      "&height="+height+
      "&grain="+grain+
      "&custom_seed="+Math.base(seed.join(''),2,36)+
      "&link=1");
   }
