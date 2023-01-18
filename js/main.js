const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button');
chooseImgBtn = document.querySelector('.choice-img');
previewImg = document.querySelector('.prev-img img');
filterName = document.querySelector('.filter-info .name');
filterSlider = document.querySelector('.slider input');
filterValue = document.querySelector('.filter-info .value');
resetBtn = document.querySelector('.reset-filter');
rotateOptions = document.querySelectorAll('.rotate button');
saveImgBtn = document.querySelector('.save-img');



let brightness = 100, saturation = 100, inversion = 0, grayscale =0;
let rotate  = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
}

const loadImage = () =>{
    let file = fileInput.files[0];// getting user selected file
    if(!file) return; // return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file)//passing file url as preview img src
    previewImg.addEventListener('load', () => {
        resetBtn.click();
        document.querySelector('.mainContainer').classList.remove('disable');
    });
}

filterOptions.forEach(option =>{
    option.addEventListener('click', () =>{ // adding click event listener to all filter button
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id === 'brightness'){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if(option.id === 'saturation'){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.id === 'inversion'){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active'); // getting selected filter btn
    if(selectedFilter.id === 'brightness'){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === 'saturation'){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === 'inversion'){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    };

    applyFilter()
};
// adding click event listener to all rotate/flip button

rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -= 90;
        }else if (option.id === "right"){
            rotate += 90;
        }else if (option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }else{
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});

const resetFilter =()=>{
        brightness = 100, saturation = 100; inversion = 0; grayscale = 0;
        rotate  = 0; flipHorizontal = 1; flipVertical = 1;
        filterOptions[0].click();
        applyFilter();
}

const saveImg =()=>{
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = previewImg.naturalWidth;
        canvas.height = previewImg.naturalHeight;
        ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%) `;
        ctx.translate( canvas.width /2, canvas.height /2);
        if(rotate !== 0){
            ctx.rotate(rotate * Math.PI / 180);
        }
        ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(previewImg, -canvas.width /2, -canvas.height /2, canvas.width, canvas.height);
        const link =document.createElement('a');
        link.download = 'image.jpg';
        link.href = canvas.toDataURL();
        link.click();
}

fileInput.addEventListener('change',loadImage);
filterSlider.addEventListener('input', updateFilter);
resetBtn.addEventListener('click', resetFilter);
saveImgBtn.addEventListener('click', saveImg);
chooseImgBtn.addEventListener('click', () => fileInput.click());