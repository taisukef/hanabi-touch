function displayOni() {
  const oni = document.getElementById('oni');
  oni.style.visibility = 'visible';
  oni.classList.add('animate');
  document.querySelectorAll('.notOni').forEach((btn) => {
    btn.classList.add('animate');
  });
}
