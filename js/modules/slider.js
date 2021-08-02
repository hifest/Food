function slider({container, slide, nextArrow,prevArrow,totalCounter,currentCounter,wrapper,field}){
    //slider

    const slides = document.querySelectorAll(slide)
    const prev = document.querySelector(prevArrow)
    const next = document.querySelector(nextArrow)
    const total = document.querySelector(totalCounter)
    const current = document.querySelector(currentCounter)
    const slidesWrapper = document.querySelector(wrapper)
    const slidesField = document.querySelector(field)
    const width = window.getComputedStyle(slidesWrapper).width;
    const slider = document.querySelector(container)


    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`
        current.textContent = `0${slideIndex}`
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex'
    slidesField.style.transition = '0.5s all'

    slidesWrapper.style.cssText = ` 
        overflow: hidden;
    `

    //рекомундую скачати плагін CSS-in-JS

    slides.forEach(slide => {
        slide.style.width = width;
    });
    //dot
    slider.style.position = 'relative';
    const dots = [];

    const wrpapperDot = document.createElement('div');
    wrpapperDot.classList.add('carousel-indicators');
    slider.append(wrpapperDot);

    for (let i = 0; i < slides.length; i++) {

        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-dot', i + 1) // штоби потом ожна било отследить какой слайдер и переключать по dot
        wrpapperDot.append(dot) //сделал масив для того штоби их собрать в одном месте и потом ими управлять снизу видно што и как 
        dots.push(dot)
    }

    function changeOpacity() {
        dots.forEach(item => item.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1'
    }

    function calculateWidth(str) {
        return +str.replace(/\D/g, '');
    }

    //dot
    function slideCheck() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    changeOpacity()

    next.addEventListener('click', () => {

        if (offset == calculateWidth(width) * (slides.length - 1)) { // offset поумолачнию 0,переменая width = 650, ми
            // умножаем ее на все слайди(4) - 1 = 3,тоисть 650 * 3 = 1950
            // 1950 равно тогда когда ето последний слайд. 
            offset = 0;
        } else {
            offset += calculateWidth(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        changeOpacity()

        slideCheck()

    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = calculateWidth(width) * (slides.length - 1)
        } else {
            offset -= calculateWidth(width)
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        changeOpacity()

        slideCheck()

    });

    dots.forEach(item => { // вот если би не сделал етоого пришлос ьби написать намого больше кода надеюсь момент понятен елси нет пиши gtoksteampro2123@gmail.com(отвечу в течении 1-2 дней:)
        item.addEventListener('click', (e) => {
            const targetAtrtibute = e.target.getAttribute('data-dot');


            offset = calculateWidth(width) * (targetAtrtibute - 1)

            slidesField.style.transform = `translateX(-${offset}px)`;

            slideCheck()

            changeOpacity() //если  targetAtrtibute = 2,тоисть ми на втором елементе ми отнимаем 1 получаеться 1,в програмировании счет начинаеться с 0,тоисть 1 будет второй елемент, тоисть dots(все точки)[1(2 точка)].style.opacity = '1'

        });
    })

}
export default slider