<?php
$rule=( isset($_GET["rule"]) ? $_GET["rule"] : 110 );
$width=( isset($_GET["width"]) ? $_GET["width"] : 960 );
$height=( isset($_GET["height"]) ? $_GET["height"] : 2000 );
$grain=( isset($_GET["grain"]) ? $_GET["grain"] : 8 );
$seed=( isset($_GET["seed"]) ? $_GET["seed"] : '' );
?>
<!DOCTYPE html>
<html>
<head>
   <title>Cellular Automaton</title>
<link rel="stylesheet" href="/lib/jquery-ui-1.8.20/themes/base/jquery.ui.all.css" type="text/css">

<script src="/lib/jquery-ui-1.8.20/jquery-1.7.2.js"></script>
<script src="/lib/jquery-ui-1.8.20/ui/minified/jquery-ui.min.js"></script>

<link rel="stylesheet" href="jquery.ui.spinner/ui.spinner.css" type="text/css">
<script src="jquery.ui.spinner/ui.spinner.js"></script>

<link rel="stylesheet" href="style.css" type="text/css">
<script src="document.js" type="text/javascript"></script>
<script src="automaton.js" type="text/javascript"></script>
</head>
<body onload="draw()">
<form name="automaton">
<!--comment.... check collorscale at brettolbert.com/projects/colorscale/-->
<label for=="rule">Rule (0-255): <input type="text" name="rule" value="<?=$rule?>" id="rule"></label>
<label for="seed">Seed: <select name="seed" id="seed"></label>
<?php
$a=array('middle','right','alternating','random','custom');
foreach($a as $e) {
   if($seed==$e)
      echo '<option value="'.$e.'" selected>'.ucfirst($e).'</option>';
   else
      echo '<option value="'.$e.'">'.ucfirst($e).'</option>';
   }
?>
</select>
<div id="width_s"></div>
   <label for="width">Width: <input name="width" value="<?=$width?>" id="width">px</label>
<div id="height_s"></div>
   <label for="height">Height: <input name="height" value="<?=$height?>" id="height">px</label>
<div id="grain_s"></div>
   <label for="grain">Granulity: <input name="grain" value="<?=$grain?>" id="grain"></label>
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
