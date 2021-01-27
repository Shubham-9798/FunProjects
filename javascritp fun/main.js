$(document).ready(function(){
    let arr = [0, 0, 0]
    let btn1 = $("#btn1")
    let btn2 = $("#btn2")
    let btn3 = $("#btn3")

    let firstClicked = false
    let secondClicked = false
    let thirdClicked = false

    let lastClick = []

    btn1.click(function(e){
      console.log(e.target.innerText)
      firstClicked = true;
      e.target.innerText = ++arr[0]
      let index = lastClick.indexOf(btn1)
      if (index > -1) {
        lastClick.splice(index, 1);
      }
      lastClick.push(btn1)
    });

    btn2.click(function(e){
        secondClicked = true
        e.target.innerText = ++arr[1]
        let index = lastClick.indexOf(btn2)
        if (index > -1) {
          lastClick.splice(index, 1);
        }
        lastClick.push(btn2)
      });

      btn3.click(function(e){
          thirdClicked = true
        e.target.innerText = ++arr[2]
        let index = lastClick.indexOf(btn3)
        if (index > -1) {
          lastClick.splice(index, 1);
        }
        lastClick.push(btn3)
      });

      // validate
      $("#btn4").click(function(){
        //   console.log(arr)
        //   console.log(lastClick)
          if(firstClicked && secondClicked && thirdClicked) {
            //   console.log('lastclick')
            // console.log(lastClick[0][0])
            let btn = lastClick[0][0]
            btn.id === 'btn1'? btn.innerText = ++arr[0] : btn.id === 'btn2'? btn.innerText = ++arr[1] : btn.innerText = ++arr[2]
          }

          if(!firstClicked) {
              btn1[0].innerText = ++arr[0]
          }
          if(!secondClicked) {
            btn2[0].innerText = ++arr[1]
        }
        if(!thirdClicked) {
            btn3[0].innerText = ++arr[2]
        }
      });


  });