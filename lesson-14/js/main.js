const sendFileForm = document.getElementById('form');

const sendFile = async(event) => {
  event.preventDefault();

  try {
    const formData = new FormData(sendFileForm);
    const data = await fetch('https://fe-student-api.herokuapp.com/api/file',
    {method: 'POST', body: formData}).then(data => data.json());
    console.log(data);

  } catch (err) {
    console.log('An error has occurred:', err);
  }
};

sendFileForm.addEventListener('submit', sendFile);