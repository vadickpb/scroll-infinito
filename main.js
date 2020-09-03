const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

//variables imgLoaded
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


//Unplash API
const ApiKey = 'N5DsfJGBr05g69xMF5cVW-i3Vd1uFEYmWNZAE6qgc70';
const count = 30;
const UrlApi = `https://api.unsplash.com/photos/?client_id=${ApiKey}&${count}`;


//ver si las imagenes se estan cargando
function imageLoaded() {
    
    imagesLoaded++;

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready);
    }
}

//helper function para los atributos
function setAttributes(element, attribute){
    for (const key in attribute) {
        element.setAttribute(key, attribute[key]);
    }
}

//funcion para mostrar las fotos
function showPhotos(photosArray){
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach(photo => {


        //crear <a> link para Unplush
        const a = document.createElement('a');
        
        //agregar atributos a <a>
        setAttributes(a, {
            href : photo.links.html
        })

        //creamos <img> para cada photo
        const img = document.createElement('img');
        
        //add atributos al elemento <img>
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title: photo.alt_description
        })
        
        //eventlistener, ver cuando finaliza de cargar
        img.addEventListener('load', imageLoaded);
        
        //adjuntar <img> dentro de <a>
        a.appendChild(img);
        
        //adjuntar <a> desdetro de image-container
        imageContainer.appendChild(a);
        
    });
};




//consumir unplash API
async function getPhotosApi(){
    try {
        const response = await fetch(UrlApi);
        const photosArray = await response.json();
        showPhotos(photosArray);
    } catch (error) {
        console.log(error);
    }
}

getPhotosApi();

//evento scroll
window.document.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotosApi();
    }
})


//Codigo sin la funcion setAttribute
/* img.setAttribute('src', photo.urls.regular);
img.setAttribute('alt', photo.alt_description);
img.setAttribute('title', photo.alt_description); */
/* setAttributes(a, 'href', photo.link.html)
a.setAttribute('href', photo.links.html); */