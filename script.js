        // fetch("https://jsonplaceholder.typicode.com/photos")
        // .then(response=>response.json())
        // .then(json=>out(json))
        // .catch(error=>console.error('error: ', error));

        // function out(obj){
        // }

        let request;
        let photosArray;
        let buttonDiv = document.createElement("div");
        
        
        let resDiv = document.createElement("div");
        let countFS = 34;
        let mainDiv = document.createElement("div");
        buttonDiv.classList.add("pg")
        if (window.XMLHttpRequest) {
            request = new window.XMLHttpRequest();

        } else {
            request = new ActiveXObject("Microsoft.XMLHTTPS");
        }
        request.open("GET", "https://jsonplaceholder.typicode.com/photos");
        request.onreadystatechange = function () {
            console.log(request.readyState);
            if (request.readyState === 4) {
                photosArray = JSON.parse(request.response);
                console.log(photosArray)
                buttonDiv.innerHTML= printBut(0, 10,1);
                resDiv.innerHTML = printResult(photosArray.slice(0, countFS));
                mainDiv.append(buttonDiv, resDiv);
            }
        };
        request.send();
        document.body.appendChild(mainDiv)

        function countOfBut(arr, num) {
            return Math.ceil(arr.length / num);
        }

        function printBut(start,end,cur) {
            let r = "";

            for (let i = start+1; i <= end; i++) {
                if(i==cur)
                    r += `<button style="background-color:brown" class="pb">${i}</button>`;
                else
                    r += `<button class="pb">${i}</button>`;
            }
            return r;
        }
        function printResult(arr) {
            let r = "";
            for (let i = 0; i < arr.length; i++) {
                 r += `<div class="x"> <img class="y" src="${arr[i].url}"></img> </div>`;                    
            }
            return r;

        }
        document.addEventListener('click', function (event) {
            if (event.target.classList.contains("pb"))
           
            {
                let h = event.target.innerText;
                let start = countFS * (h - 1);
                let end = countFS * h;   
                let maxButs = countOfBut(photosArray,countFS);

                if(h<5){
                    buttonDiv.innerHTML = printBut(0,10,h);
                }
                else if(h>maxButs-5){
                    buttonDiv.innerHTML = printBut(Number(h)-10+(maxButs-h),maxButs,h);
                }
                else{
                    buttonDiv.innerHTML = printBut(Number(h)-5,Number(h)+5,h);
                }
                resDiv.innerHTML = printResult(photosArray.slice(start, end))
            }
            else {
                console.log(event.target)
            }
        })