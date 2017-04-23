module.exports = function randomStruc() {
  let struc = ["the {{ noun }} ate my spicy meatballs!", 
  "{{ an_adjective }} {{ noun }}", 
  "{{ noun }}",
  "somebody once told me the {{ noun }} was gunna roll me, I ain't the sharpest {{ noun }} in the shed"];

  let strucRandom = Math.floor(Math.random() * (struc.length));
  return (struc[strucRandom]);
}
