document.addEventListener("DOMContentLoaded", function() {
  var FormA = [
    { label: 'Место выступления:', elemtype: 'text', name: 'venue', width: 200 },
    { label: 'Время начала (чч:мм):', elemtype: 'text', name: 'startTime', pattern: '^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$', width: 200 },
    { label: 'Время окончания (чч:мм):', elemtype: 'text', name: 'endTime', pattern: '^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$', width: 200 },
    { label: 'Количество мест:', elemtype: 'number', name: 'seats', min: 1, max: 100, width: 200 },
    { label: 'Адрес:', elemtype: 'text', name: 'address', width: 200 }
  ];

  var formContainer = document.getElementById('formElements');
  FormA.forEach(function(element) {
    var fieldContainer = document.createElement('div');

    var labelElement = document.createElement('label');
    labelElement.textContent = element.label;
    labelElement.classList.add('form-label');

    var inputElement = document.createElement('input');
    inputElement.type = element.elemtype;
    inputElement.placeholder = element.label;
    inputElement.id = element.name;
    inputElement.name = element.name;
    inputElement.style.width = element.width + 'px';
    if (element.elemtype === 'number') {
      inputElement.min = element.min;
      inputElement.max = element.max;
    }
    if (element.pattern) {
      inputElement.pattern = element.pattern;
    }

    fieldContainer.appendChild(labelElement);
    fieldContainer.appendChild(inputElement);
    formContainer.appendChild(fieldContainer);
  });

  var form = document.getElementById('myForm');
  var errorMessages = document.getElementById('errorMessages');
  var dataArray = [];

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    validateForm();
  });

  function validateForm() {
    var errors = [];
    FormA.forEach(function(element) {
      if (element.elemtype !== 'button') {
        var field = document.getElementById(element.name);
        if (element.elemtype === 'text' || element.elemtype === 'number') {
          if (field.value.trim() === '' || (element.elemtype === 'number' && (field.value < 1 || field.value > 100))) {
            errors.push('Поле "' + element.label.replace(':', '') + '" обязательно для заполнения.');
          }
        }
      }
    });

    if (errors.length > 0) {
      displayErrors(errors);
    } else {
      addToDataArray();
      clearForm();
    }
  }

  function displayErrors(errors) {
    errorMessages.innerHTML = '';
    errors.forEach(function(error) {
      var errorMessage = document.createElement('p');
      errorMessage.textContent = error;
      errorMessages.appendChild(errorMessage);
    });
  }

  function addToDataArray() {
    var data = {};
    FormA.forEach(function(element) {
      if (element.elemtype !== 'button') {
        var field = document.getElementById(element.name);
        data[element.name] = field.value.trim();
      }
    });
    dataArray.push(data);
    console.log("Data added to array:", data);
  }

  function clearForm() {
    var inputs = document.querySelectorAll('input[type="text"], input[type="number"]'); 
    inputs.forEach(function(input) {
      input.value = '';
    });
    errorMessages.innerHTML = '';
  }
});
