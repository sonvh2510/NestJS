import $http from './libs/http';
const submitForm = () => {
    const forms = document.querySelectorAll('.js-form');
    forms.forEach((form) => {
        const button = form.querySelector('.js-form-submit');
        const action = form.getAttribute('action');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const formData = {};
            const inputs = form.querySelectorAll('[name]');
            inputs.forEach((input) => {
                const name = input.getAttribute('name');
                const value = input.value;
                formData[name] = value;
            });
            $http
                .post(action, {
                    body: formData,
                })
                .subscribe((res) => {
                    console.log(res);
                });
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    submitForm();
});
