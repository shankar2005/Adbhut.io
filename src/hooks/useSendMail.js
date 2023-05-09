import emailjs from '@emailjs/browser';

const useSendMail = (templateParams) => {
    emailjs.send('service_5afkqb5', 'template_qvgzj83', templateParams, 'kkw98G7NNsCgiMD92')
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
}

export default useSendMail;