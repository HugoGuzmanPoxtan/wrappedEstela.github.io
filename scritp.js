    const dateModal = document.getElementById('dateModal');
    const openDateModal = document.getElementById('openDateModal');
    const closeDateButton = document.querySelector('.close-button');
    const submitDate = document.getElementById('submitDate');
    const dateInput = document.getElementById('dateInput');

    const correctDate = '2025-08-09'; //Fecha que se ingresa para pasar a la siguiente pagina

    openDateModal.addEventListener('click', () => {
      dateModal.style.display = 'flex';
    });

    closeDateButton.addEventListener('click', () => {
      dateModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
      if (event.target === dateModal) {
        dateModal.style.display = 'none';
      }
    });

    submitDate.addEventListener('click', () => {
      if (dateInput.value === correctDate) {
        window.location.href = 'cartaNavidena.html'; //Envia hacia la pagina correcta
      } else {
        alert('Ingresa la fecha correcta corazon.');
      }
    });
    