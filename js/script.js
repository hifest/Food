import  tabs from './modules/tabs';
import  calculator from './modules/calculator';
import  modal from './modules/modal';
import  timer  from './modules/timer';
import  cards from './modules/cards';
import  slider  from './modules/slider';
import  forms from './modules/forms';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function() {

        const modalTimerId = setTimeout(() => openModal('.modal',modalTimerId), 500000000);

        tabs('.tabcontent','.tabheader__item','.tabheader__items','tabheader__item_active');
        calculator();
        modal('[data-modal]','.modal',modalTimerId);
        timer('2021-10-29','.timer');
        cards();
        slider({
                container:'.offer__slider',
                nextArrow:'.offer__slider-next',
                prevArrow:'.offer__slider-prev',
                wrapper: '.offer__slider-wrapper',
                totalCounter: '#total',
                currentCounter: '#current',
                slide:'.offer__slide',
                field:'.offer__slider-inner'
        });
        forms('form',modalTimerId, 'img/spinner.svg');
        
});