/**
 * Observation Options
 */
const options = {
    root: null,
    threshold: 0.6,
    rootMargin: "50px"
};

/**
 * Intersection Observer API
 */
const observer = new IntersectionObserver((entries,observer)=>{
    // Loop through entries
    entries.forEach(entry=>{
        let section = entry.target;
        let li = document.querySelector(`li[data-sec=${section.id}]`);

        //  Add Class IF inViewport && Remove IF not
        if(entry.isIntersecting){
            section.classList.add("active");
            li.classList.add("active");
        }else{
            if(li.classList.contains("active"))
                li.classList.remove("active");
            
            if(section.classList.contains("active"))
                section.classList.remove("active");
        }
        
    })
}, options);

/**
 * Create List Item For Section
 * @param {Element} ul 
 * @param {Element} section 
 */
const createListItem = (ul, section) => {
    let li = document.createElement('li');
    li.setAttribute('data-sec', section.id);

    let a = document.createElement('a');
    a.setAttribute('href', `#${section.id}`);
    a.textContent = section.querySelector('header').textContent;
    a.addEventListener('click', scroll);

    li.appendChild(a);
    ul.appendChild(li);
}

function scroll(e){
    e.preventDefault();
    let id = e.target.parentNode.dataset['sec'];
    let target = document.getElementById(id);
    
    target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    
}


let nav = document.getElementById('nav');
let ul = document.createElement('ul');


const sections = document.querySelectorAll('section');
sections.forEach(section=>{
    createListItem(ul, section);
    observer.observe(section);
})

nav.appendChild(ul);


