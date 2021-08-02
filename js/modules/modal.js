
    function closeModal(modalClass) {
        const modal = document.querySelector(modalClass);
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal(modalClass, modalTimerId) {
        const modal = document.querySelector(modalClass);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        console.log(modalTimerId);
        if(modalTimerId){
            clearInterval(modalTimerId);
        }

    }

function modal(triggerModal,modalClass, modalTimerId ) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerModal),
        modal = document.querySelector(modalClass);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalClass, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalClass);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalClass);
        }
    });

    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalClass, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}
export default modal;

export{openModal,closeModal};