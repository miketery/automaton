<?php
$rule=( isset($_GET["rule"]) ? $_GET["rule"] : 110 );
$width=( isset($_GET["width"]) ? $_GET["width"] : 300 );
$height=( isset($_GET["height"]) ? $_GET["height"] : 900 );
$grain=( isset($_GET["grain"]) ? $_GET["grain"] : 2 );
$seed=( isset($_GET["seed"]) ? $_GET["seed"] : 'random' );
$link=( isset($_GET["link"]) ? 1 : 0);
$custom_seed=( isset($_GET["custom_seed"]) ? $_GET["custom_seed"] : null );
?>
<!DOCTYPE html>
<html>
<head>
   <title>Cellular Automaton</title>
<link rel="stylesheet" href="/lib/jquery-ui-1.8.20/themes/base/jquery.ui.all.css" type="text/css">
<script src="js/jquery-1.7.2.js"></script>
<script src="js/jquery-ui.min.js"></script>

<link rel="stylesheet" href="js/jquery.ui.spinner/ui.spinner.css" type="text/css">
<script src="js/jquery.ui.spinner/ui.spinner.js"></script>

<link rel="stylesheet" href="css/style.css" type="text/css">
<script src="js/document.js" type="text/javascript"></script>
<script src="js/automaton.js" type="text/javascript"></script>
</head>
<body>
<div id="form">
   <form name="automaton">
   <!--comment.... check collorscale at brettolbert.com/projects/colorscale/-->
   <label for=="rule">Rule (0-255): <input type="text" name="rule" value="<?=$rule?>" id="rule"></label>
   <label for="seed">Seed: </label><select name="seed" id="seed">
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
   <div class="row">
      <div class="cell"><label for="width">Width</label></div>
      <div class="cell"><div id="width_s"></div></div>
      <div class="cell"><input name="width" value="<?=$width?>" id="width">px</div>
   </div>
   <div class="row">
      <div class="cell"><label for="height">Height</label></div>
      <div class="cell"><div id="height_s"></div></div>
      <div class="cell"><input name="height" value="<?=$height?>" id="height">px</div>
   </div>
   <div class="row">
      <div class="cell"><label for="grain">Granulity</div>
      <div class="cell"><div id="grain_s"></div></div>
      <div class="cell"><input name="grain" value="<?=$grain?>" id="grain">px</div>
   </div>
   <div class="row1">
      <input type="submit" class="button draw" value="DRAW">
      <input type="button" class="button next" value="Next+Draw">
      <input type="button" class="button prev" value="Previous+Draw">
      <input type="button" class="button download" value="Downlaod">
      <a href="" class="link"><img src="images/link_icon.png"></a>
   </div>
   <input type="hidden" name="custom_seed" id="custom_seed" value="<?=$custom_seed?>">
   <input type="hidden" name="link" id="link" value="<?=$link?>">
   </form>
   <canvas id="rule_canvas"></canvas>
</div>
<div id="display">
   <canvas id="canvas"></canvas>
</div>
</body>
<style>
#canvas {
   border: 1px solid black;
   }
</style>
</html>
