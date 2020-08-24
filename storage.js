const CACHE_KEY = "prediction_history";

function checkForStorage() {
    return typeof(Storage) !== "undefined";
}


function putHistory(data) {
    if(checkForStorage) {
        let history = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }
  
        historyData.unshift(data);
  
        if (historyData.length > 5) {
            historyData.pop();
        }
        
  
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
    }

    localStorage.clear();

    function showHistory() {
        if (checkForStorage()) {
            return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
        } else {
            return [];
        }
     }

     function renderHistory() {
        const historyData = showHistory();
        let historyList = document.getElementById('historyList');
        
      
        // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
        historyList.innerHTML = "";

        for (let history of historyData) {
            let row = document.createElement('tr');
            console.log(sessionStorage.length);
           
            row.innerHTML = "<td>" + history.prediction+ "</td>";
            row.innerHTML += "<td>" + history.probability + '%' + "</td>";
    

      
            historyList.appendChild(row);
        }
        }
     
        if (localStorage.length > 150) {
            localStorage.clear;
        }

        console.log(localStorage.length);

     renderHistory();