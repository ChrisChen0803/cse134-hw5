class RatingWidget extends HTMLElement {
    constructor() {
        super();
        this.starList = [];
        this.starsForm = document.createElement('rating-place');
        this.maxRating = document.getElementById('rating').max;
        this.heading = document.createElement('p');
        this.heading.innerHTML="Rating Widget";
        this.output = document.createElement('p');
        console.log(this.maxRating);
    }
    connectedCallback(){
        const shadow = this.attachShadow({ mode: 'closed' });
        const newSection = document.createElement('rating-widgit');
        this.stars(this.maxRating);
        newSection.appendChild(this.heading);
        newSection.appendChild(this.starsForm);
        newSection.appendChild(this.output);
        shadow.appendChild(newSection);
        const style = document.createElement('style');
        style.innerHTML = `.stars {
            cursor: pointer;
            font-size: 24px;
            color: black;
          }
          .color{
              cursor: pointer;
              font-size: 24px;
              color: orange; 
          }`;
          shadow.appendChild(style);
    }
    attributeChangedCallback(num){
        stars(num);
    }
    disconnectedCallback = () => {
		clearTimeout(this.timeOut);
	};
    stars(num){
        for(let i = 1; i <= num; i++){
            const newElement = document.createElement('span');
            newElement.classList.add("stars");
            newElement.id="star" + i;
            newElement.value = i;
            newElement.innerHTML = '&#9733;';
            this.starList.push(newElement);
            newElement.addEventListener('click', (e) => {
                if(newElement.value>=this.maxRating*0.8){
                    this.output.innerHTML = `Thanks for ${newElement.value} star rating!`
                }
                else{
                    this.output.innerHTML = `Thanks for your feedback of  ${newElement.value} star. We'll try to do better!`
                }
                this.submitform(newElement.value); 
			});
            newElement.addEventListener('mouseover', (e) => {
				for (let i = 0; i < newElement.value; i++) {
					this.starList[i].classList.add('color');
				}
				for (let i = newElement.value; i < this.maxRating; i++) {
					this.starList[i].classList.remove('color');
				}
			});
            newElement.addEventListener("mouseleave", (e) =>{
                for (let i = 0; i < this.starList.length; i++) {
					this.starList[i].classList.remove('color');
				}
              });
            this.starsForm.appendChild(newElement);
        }

    }
    async submitform(num){
        let currForm = document.getElementById("ratingForm");
        currForm.rating.value = num;
        currForm.sentBy.value="JS";
        const formData = new FormData(currForm);
        fetch("https://httpbin.org/post", {
            method: "POST",
            headers: {
                'X-Sent-By': 'JS',
            },
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
};
customElements.define('rating-widget', RatingWidget);