//navbar transorm
const navbar = document.querySelector('.nav-bar');
const aboutMeBox = document.querySelector('.about-me');


window.addEventListener('scroll', e => {
    if(window.scrollY > aboutMeBox.offsetTop - navbar.offsetHeight ){
        navbar.classList.add('active');
    }else{
        navbar.classList.remove('active');
    }
});
//end of navbar transform

//text type writer
class TypeWriter{
    constructor(txtElement, words, wait = 3000){
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait);
        this.type();
        this.isDeleting = false;
    }
    type(){
        //getting current index of the word
        const current = this.wordIndex % this.words.length;
        //get full text of current word
        const fulltxt = this.words[current];
        //Check if deleting
        if(this.isDeleting){
            //remove char
            this.txt = fulltxt.substring(0, this.txt.length - 1);
        }else{
            //add char
            this.txt = fulltxt.substring(0, this.txt.length + 1);
        }


        //insert txt to element
        this.txtElement.innerHTML = `<span class ="txt">${this.txt}</span>`

        //type speed
        let typeSpeed = 300;
        if(this.isDeleting){
            typeSpeed /= 2;
        }

        //if word is complete
        if(!this.isDeleting && this.txt === fulltxt){
            //make a stop at end
            typeSpeed = this.wait;

            this.isDeleting = true;
        }else if(this.isDeleting && this.txt === ''){
            this.isDeleting = false;
            this.wordIndex++;
            //stop before start writing
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

//------Init on DOM loads
document.addEventListener('DOMContentLoaded', init)

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init typ wirter
    new TypeWriter(txtElement, words, wait);
};
//END of text type writer

//SIDE BAR
const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('.close-menu');
const sideBar = document.querySelector('.nav-links');

menu.addEventListener('click', e => {
    sideBar.style.right = '0';
    closeMenu.classList.add('animation');
});


closeMenu.addEventListener('click', e =>{ sideBar.style.right = '-250px';
closeMenu.classList.remove('animation')
});