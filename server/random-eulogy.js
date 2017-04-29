module.exports = function randomEulogy() {
  
  var struc = [
    "Here lies a dead post, father of many, son of none.",
    "Rest in peace, dingus.",
    "Boo hoo so sad, you're dead.",
    "Do you ever feel all alone? Do you ever feel out of place?",
    "This post has been deemed unworthy",
    "Wow...you died, your post must have been quite the flop."
     ];

   var strucRandom = Math.floor(Math.random() * (struc.length));
   return (struc[strucRandom]);
 
}