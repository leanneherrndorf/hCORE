module.exports = function randomEulogy() {
  
  var struc = [
    ", rest in peace you dang dingus.",
    ", they lived as they died, sad and alone.",
    ", going out not with a bang, but with a wimper.",
    ", neither a notch in a bed post nor a line in a song.",
    ", as popular in death as they were in life, not very.",
    ", if dissapointment was a currency, their parents would be loaded.",
    ", if the afterlife is anything like a nightclub then they probably won't get in."
     ];

   var strucRandom = Math.floor(Math.random() * (struc.length));
   return (struc[strucRandom]);
 
}