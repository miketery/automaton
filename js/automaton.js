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
   $('#content').width(width);
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
      //console.log(parseInt(100*i/rows));
      $('#progressbar').progressbar({ value: parseInt(100*(i/rows))});
      }

   $('#progressbar').progressbar({ value: 100});
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
   var rule_canvas = document.getElementById('rule_canvas');
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
     case 'custom':
         var custom_seed=$('#custom_seed').val().split('');
         var binary=new Array();
         var tmp;
         for(i=0; i<custom_seed.length; i++) {
            tmp=Math.base(custom_seed[i],16,2);
            while(tmp.split('').length<4) //each hex digit should have 4 binary ie 1=0001 not 1
               tmp='0'+tmp;
            binary[i]=tmp;
            }
         binary=binary.join('').split(''); //join the array which were in 4s and split into bits 
         for(i=0; i<binary.length; i++)
            cur_row[i]=parseInt(binary[i]); //makesure each is an integer
         break;
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
   //convert top row seed of binary into hex
   for(i=8; i<seed.length; i=i+8) { //every eith character put space 
                                    //(so can split into byte size)
      seed[i]=" "+seed[i];
      }
   var custom_seed=seed.join(''); //a string of binary with spaces in between each 8 bits
   //if !seed%8 append so is (so that conversion to hex works properly otherwise get a shift in bits)
   var append=8-seed.length%8; 
   if(append!=8) //if append is anything but 8 bits add one so that we have even size
      for(i=0; i<append; i++)
         custom_seed+="0";
   var bytes=custom_seed.split(' '); //split out custom_seed with binary string into bytes
   var tmp='';
   var hex_seed=new Array(); //where hex string will be stored
   for(i=0; i<bytes.length; i++)  { //for each byte convert to binary
      tmp=Math.base(bytes[i],2,16);
      if(tmp.split('').length<2) //make sure hex is 2 digit, ie 00001000=08 not 8
         hex_seed[i]="0"+tmp;
      else 
         hex_seed[i]=tmp;
      } //hex_seed is ready
   var path = document.location.pathname; //path of directory
   var host= window.location.hostname; //server host
   //assign href of link with current state and hex seed
   $(".link").attr("href","http://"+host+path+
      "?rule="+rule+
      "&width="+width+
      "&height="+height+
      "&grain="+grain+
      "&custom_seed="+hex_seed.join('')+
      "&link=1");
   
   }
