document.addEventListener("DOMContentLoaded", function() {
    ratingInput = document.getElementById("rating");
    ratingForm = document.getElementById("ratingForm");
    label = document.getElementById("label")
    submitButton = document.getElementById("submitButton");
    sentBy = document.getElementById("sentBy");
    maxval = ratingInput.max;
    label.innerHTML="Rating Widget";
    if (maxval>=3 && maxval<=10){
        ratingForm.removeChild(ratingInput);
        ratingForm.removeChild(submitButton);
        ratingForm.removeChild(sentBy);
        starContainer = document.createElement("starContainer");
        starContainer.id = "selectStars";
        for(let i = 1; i <= maxval; i++){
            let star = document.createElement("star");
            //star.innerHTML = "&#11088;";
            star.innerHTML = "&#x2606;";
            star.classList.add("rating");
            star.value=i;
            star.addEventListener("click",function(event){
                if(document.getElementById("msg")){
                    ratingForm.removeChild(document.getElementById("msg"));
                }
                else{
                    br=document.createElement("br");
                }
                msg = document.createElement("output");
                msg.id="msg";
                currStar = document.createElement("input");
                currStar.type="hidden";
                currStar.value = star.value;
                currStar.id="ratings";
                currStar.name="rating";
                
                if(star.value/maxval>=0.8){
                    msg.innerHTML="Thanks for " + star.value + " star rating!";
                }
                else{
                    msg.innerHTML="Thanks for your feedback of " + star.value + " star. We'll try to do better!";
                }
                ratingForm.appendChild(br);
                ratingForm.appendChild(currStar);
                ratingForm.append(msg);
                event.preventDefault();
                submitform();            
            });
            star.addEventListener("mouseenter", function() {
                starList = document.getElementsByClassName("rating");
                for(let i = 0; i<starList.length;i++){
                    if(starList[i].value<=star.value){
                        starList[i].style.color = "orange";
                    }
                }
              });
        
              star.addEventListener("mouseleave", function() {
                starList = document.getElementsByClassName("rating");
                for(let i = 0; i<starList.length;i++){
                    starList[i].style.color = "black";
                }
              });
            starContainer.appendChild(star);
        }
        ratingForm.appendChild(starContainer);
    }
});
async function submitform(){
    formData = new FormData(document.getElementById("ratingForm"));
    fetch("https://httpbin.org/post", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Form submitted successfully:", data);
    })
    .catch(error => {
        console.error("Error submitting form:", error);
    });
};