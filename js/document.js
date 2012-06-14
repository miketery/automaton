$(document).ready(function() {
   draw();
   $('.draw').click(function() {draw(); return false;}); 
   $('.prev').click(function() {
      var rule=$('#rule');
      if(rule.val()==0)
         rule.val(255);
      else
         rule.val(parseInt(rule.val())-1);
      draw(); 
      }); 
   $('.next').click(function() {
      var rule=$('#rule');
      if(rule.val()==255)
         rule.val(0);
      else
         rule.val(parseInt(rule.val())+1);
      draw(); 
      }); 
   $('#toggle_tab').click(function() {
      var user_input=$('#user_input');
      var y_delta=user_input.height()-20;
      if(user_input.val()==0) {
         user_input.val(1);
         $('#user_input').transition({y:-y_delta}); 
         $('#user_input').removeClass('hide');
         }
      else {
         $('#user_input').transition({y:0});
         $('#user_input').addClass('hide');
         user_input.val(0);
         }
      console.log(height);
      });
   $('#rule').spinner({min: 0, max: 255});
   $('#width_s').slider({
      value: $('#width').val(),
      animate: true, 
      max: 2048, 
      min:100, 
      slide: function(event, ui) {$('#width').val(ui.value);} 
      });
   $('#height_s').slider({
      value: $('#height').val(),
      animate: true, 
      max: 8192, 
      min: 100, 
      slide: function(event, ui) {$('#height').val(ui.value);} 
      });
   $('#grain_s').slider({
      value: $('#grain').val(),
      animate: true, 
      max: 20, 
      min: 1, 
      slide: function(event, ui) {$('#grain').val(ui.value);} 
      });
 
   $('#width').change(function() {$('#width_s').slider({value: $(this).val()})});
   $('#height').change(function() {$('#height_s').slider({value: $(this).val()})});
   $('#grain').change(function() {$('#grain_s').slider({value: $(this).val()})});
   });

//$("#progressbar").progressbar({ value: 0 });
