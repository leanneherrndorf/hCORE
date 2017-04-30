module.exports = function randomEulogy() {
  
  var struc = [
    ", father of many, son of none.",
    ", rest in peace you dang dingus.",
    ", boo hoo so sad.",
    ", they lived as they died, sad and alone.",
    ", going out not with a bang, but with a wimper."
     ];

   var strucRandom = Math.floor(Math.random() * (struc.length));
   return (struc[strucRandom]);
 
}