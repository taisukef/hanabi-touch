function displayOni() {
  const oni = document.getElementById('oni');
  oni.style.visibility = 'visible';
  oni.classList.add('animateOni');
  document.querySelectorAll('.notOni').forEach((btn) => {
    btn.classList.add('animateNotOni');
  });
}
