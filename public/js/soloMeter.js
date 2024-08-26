function setMeter(time) {
  const meter = document.getElementById('meter');
  if(meter){
	  meter.value = time;
  }
}

function startMeter(){
	const meter = document.getElementById('meter');
	setInterval(() => {
		meter.value = parseInt(meter.value) - 1;
	},100);
}

