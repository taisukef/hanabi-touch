let hasEasterEgg = false;
window.addEventListener('load', (event) => {
  if (localStorage.getItem('easterEgg') === 'enable') {
	hasEasterEgg = true;
	localStorage.removeItem('easterEgg');
  }
});

document.getElementById('firing_button').onclick = () => {
  document.getElementById('firing_button').src = '/img/remocon_push.png';

  if (hasEasterEgg === true) {
	startContestMode();
	return;
  }

  let data = [
	JSON.parse(localStorage.getItem('first')),
	JSON.parse(localStorage.getItem('second')),
	JSON.parse(localStorage.getItem('third')),
  ];

  if (data.some((x) => x === null)) {
	return;
  }

  colorMode(HSB);
  let type_data = data.map((x) => x.type);
  let color_data = data.map((x) =>
	color(x.color[0], x.color[1], x.color[2])
  );

  startMakeMode(type_data, color_data);
};

document.addEventListener('onFireworkDispose', () => {
  document.getElementById('create_button').disabled = false;
  document.getElementById('create_button').style.visibility = 'visible';
  document.getElementById('save_button').disabled = false;
  document.getElementById('save_button').style.visibility = 'visible';
});
