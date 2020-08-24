let prediction_name = "";
let probability_percent = 0;
var video = document.getElementById('video');
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d')
const status  = document.getElementById('status');
const probability = document.getElementById('probabilitas');

let history = {
  prediction : prediction_name,
  probability : probability_percent
  };

function uploadFunc(){
    let path = document.getElementById('myFile').files[0];
    let fileUrl = URL.createObjectURL(path);
    console.log(fileUrl);
    console.log(path);
    video.src = fileUrl;
    localStorage.clear();
    probability_percent = 0;
  

  }

  
(async () => {
  console.log('Loading mobilenet..');
  const model = await mobilenet.load();
  console.log('Successfully loaded model');
 
  predict();
  console.log(video.duration);
  console.log(video.currentTime);

  
  
  
  async function predict() {
    
    
    context.drawImage(video, 0, 0, 500, 500);
    const predictions = await model.classify(canvas);
    
    if(prediction_name !== predictions[0].className ||  probability_percent < Math.round(predictions[0].probability * 100)) {
      prediction_name =  predictions[0].className;
      probability_percent = Math.round(predictions[0].probability * 100);
      
      renderHistory()
      history = {
        prediction : prediction_name,
        probability : probability_percent
      }
    }
    //console.log(typeof predictions[0].className);
      
    

    status.innerText = predictions[0].className;
    probability.innerText = `${Math.round(predictions[0].probability * 100)}%`;

    
    
    putHistory(history);
    
    requestAnimationFrame(predict)
    
  }
  
}) ()

