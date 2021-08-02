function calculator(){
    //calculator


    const result = document.querySelector('.calculating__result span');

    let sex, age, height, weight, ratio;

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }


    function init(selector, activeClass) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    init('#gender div ', 'calculating__choose-item_active');
    init('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcResult() {
        if (!sex || !age || !weight || !ratio || !height) {
            result.textContent = '0';
            return;
        }

        if (sex == 'female') {
            result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }
    }

    function getStaicInformation(selector, classActive) {
        const staticElement = document.querySelectorAll(selector);

        staticElement.forEach(item => {
            item.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio')

                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))

                } else {

                    sex = e.target.getAttribute('id')
                    localStorage.setItem('sex', e.target.getAttribute('id'))
                }

                staticElement.forEach(elem => {
                    elem.classList.remove(classActive)
                });
                e.target.classList.add(classActive)
                calcResult()
            });
        })
    }

    getStaicInformation('#gender div ', 'calculating__choose-item_active')
    getStaicInformation('.calculating__choose_big div', 'calculating__choose-item_active')


    function getDinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value === '') {
                input.style.border = '1px solid black'
            }

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
                input.style.transition = '0.5s all'
            } else if (input.value.match(/\d/g)) {
                input.style.border = '1px solid green'
            }


            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcResult();
        });
        calcResult();
    }
    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}
export default calculator;