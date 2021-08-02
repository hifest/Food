
import {closeModal,openModal} from './modal';
import{postDara} from '../services/services';

function forms (formSelector,modalTimerId,spinnerWay){
  // Forms

  const forms = document.querySelectorAll(formSelector);
  const message = {
      loading: 'img/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
      bindpostData(item);
  });

  const postData = async(url, data, method) => {
      const res = await fetch(url, {
          method: method,
          headers: {
              'Content-type': 'application/json'
          },
          body: data
      });
      return await res.json();
  };

  function bindpostData(form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          let statusMessage = document.createElement('img');

        if(spinnerWay){
            statusMessage.src = spinnerWay; //загрузка спинером
        }
          statusMessage.style.cssText = `
              display:block; 
              margin: 0 auto;
          `;
          statusMessage.classList.add('status');
          form.insertAdjacentElement('afterend', statusMessage);

          const formData = new FormData(form);

          const json = JSON.stringify(Object.fromEntries(formData.entries()));

          postData('http://localhost:3000/requests', json, "POST")
              .then(data => {
                  console.log(data);
                  openModalThanks(message.success);
                  statusMessage.remove();
              })
              .catch(() => {
                  openModalThanks(message.failure);
              })
              .finally(() => {
                  form.reset()
              });

      });
  }

  function openModalThanks(message) {

      const prevModalDialog = document.querySelector('.modal__dialog');

      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimerId);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class='modal__content'>
          <div class='modal__close' data-close></div>
          <div class='modal__title'>${message}</div>    
      </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => { //крч через 4 секунди модалка убереться
          thanksModal.remove();
          prevModalDialog.classList.remove('hide');
          prevModalDialog.classList.add('show');
          closeModal('.modal'); //тип просто когда появиться сообщения благнодарностии тип оно закроеться и все а потом когда будеш еще раз клик то тогда отокреться нормальное модальное окно,кст вітаю ти просрал 10 секукнд своей жизни
      }, 4000);
  }

}
export default forms;