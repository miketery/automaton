<!DOCTYPE html>
<html>
<head>
   <title>Cellular Automaton</title>
<link rel="stylesheet" href="/lib/jquery-ui-1.8.20/themes/base/jquery.ui.all.css" type="text/css">
<script type="text/javascript" src="/lib/jquery-ui-1.8.20/jquery-1.7.2.js"></script>
<script type="text/javascript" src="/lib/jquery-ui-1.8.20/ui/minified/jquery-ui.min.js"></script>

<script src="automaton.js" type="text/javascript"></script>
</head>
<body onload="draw()">
<form name="automaton">
<!--comment.... check collorscale at brettolbert.com/projects/colorscale/-->
Rule (0-255): <input type="text" name="rule" value="<?=isset($_GET["rule"])?$_GET["rule"]:110?>" maxlength="3" id="rule">
Seed: <select name="seed" id="seed">
<?php
$a=array('middle','right','alternating','random','custom');
$seed='';
if(isset($_GET["seed"]))
   $seed=$_GET["seed"];
foreach($a as $e) {
   if($seed==$e)
      echo '<option value="'.$e.'" selected>'.ucfirst($e).'</option>';
   else
      echo '<option value="'.$e.'">'.ucfirst($e).'</option>';
   }
?>
</select>
Width: <input type="text" name="width" value="<?=isset($_GET["width"])?$_GET["width"]:960?>" maxlength="4" id="width">px
Height: <input type="text" name="height" value="<?=isset($_GET["height"])?$_GET["height"]:2000?>2000" maxlength="5" id="height">px
Granulity: <input type="text" name="grain" value="<?=isset($_GET["grain"])?$_GET["grain"]:8?>8" id="grain">
<input type="submit" onclick="draw(); return false;" value="GO">
<span style="background: blue;" value="">Link</span>
</form>


<canvas id="canvas"></canvas>



</body>
<style>
#canvas {
   border: 1px solid black;
   }
</style>
</html>
