function makeSmallFirework() {
  const shape = random(['菊', '牡丹']);
  const size = random(100) / 30;
  const firework = new Firework(
    [
      color(random(360), 255, 255),
      color(random(360), 255, 255),
      color(random(360), 255, 255),
    ],
    [shape, shape, shape],
    graphicBuffers,
    launchPos = createVector(
      random(width * 0.1, width * 0.9),
      height,
    ), // launchPos
    size, //  speedMultiplier
    size, // lifespanMultiplier
    false,
    false,
  );
  fireworks.push(firework);
}

setInterval(makeSmallFirework, 500);
