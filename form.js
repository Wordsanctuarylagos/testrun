document.getElementById('ftgBtn').onclick = () => {
  document.getElementById('ftgForm').style.display = 'block';
  document.getElementById('officeForm').style.display = 'none';
};

document.getElementById('officeBtn').onclick = () => {
  document.getElementById('passwordModal').style.display = 'flex';
};

function checkPassword() {
  const password = document.getElementById('officePassword').value;
  const errorDisplay = document.getElementById('passwordError');

  if (password === 'WSLoffice') {
    document.getElementById('passwordModal').style.display = 'none';
    document.getElementById('ftgForm').style.display = 'none';
    document.getElementById('officeForm').style.display = 'block';
    errorDisplay.textContent = '';
    document.getElementById('officePassword').value = '';
    fetchNamesForToday();
  } else {
    errorDisplay.textContent = 'Incorrect password. Please try again.';
  }
}

function closePasswordModal() {
  document.getElementById('passwordModal').style.display = 'none';
  document.getElementById('officePassword').value = '';
  document.getElementById('passwordError').textContent = '';
}

function fetchNamesForToday() {
  fetch('https://script.google.com/macros/s/AKfycby2GWpu3ZyoTeo6UFnn0Xry0DHoll1hwXfZXDcwGBRaiL-00FaM75brlUTgM9ci7EEF/exec')
    .then(response => response.json())
    .then(data => {
      const select = document.getElementById('ftgNameSelect');
      select.innerHTML = '<option value="">Select FTG Name</option>';
      data.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
      });
    })
    .catch(err => {
      console.error('Failed to fetch names', err);
    });
}

const ftgURL = 'https://script.google.com/macros/s/AKfycbx4mR6H_6IMzdaOlt-aueQ5paoVbo8BvKGvdDsfDOuDgxLiev6xfeVCQRflFm0wxc7R/exec';
const officeURL = 'https://script.google.com/macros/s/AKfycbwNVmemu1-m3aWy9X8y5sgTZEQPct-6GGYm1VXEcYF-ZSXYlzM9Cetvh4X8wNSlZBF8/exec';

document.getElementById('formFTG').addEventListener('submit', function(e) {
  e.preventDefault();
  fetch(ftgURL, {
    method: 'POST',
    body: new FormData(this)
  }).then(res => {
    alert('FTG Data Submitted');
    this.reset();
  }).catch(err => alert('Error submitting FTG data'));
});

document.getElementById('formOffice').addEventListener('submit', function(e) {
  e.preventDefault();
  fetch(officeURL, {
    method: 'POST',
    body: new FormData(this)
  }).then(res => {
    alert('Office Use Data Submitted');
    this.reset();
  }).catch(err => alert('Error submitting Office Use data'));
});
