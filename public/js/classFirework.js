const onFireworkExplode = new CustomEvent('onFireworkExplode');

const onFireworkDispose = new CustomEvent('onFireworkDispose');

const starCount = 3;

function kikuParticle(
  graphicBuffer,
  origin,
  vec,
  color,
  speed = 1,
  lifespan = 1,
) {
  return new ExplodeParticle(
    graphicBuffer,
    origin,
    color,
    random() < 0.5 ? 3 : 1,
    0.98,
    250,
    vec.mult(5),
    createVector(0, 0.04),
    speed,
    lifespan,
  );
}

function botanParticle(
  graphicBuffer,
  origin,
  vec,
  color,
  speedMultiplier = 1,
  lifespanMultiplier = 1,
) {
  return new ExplodeParticle(
    graphicBuffer,
    origin,
    color,
    random(5, 8),
    0.93,
    300,
    vec.mult(6),
    createVector(0, 0),
    speedMultiplier,
    lifespanMultiplier,
  );
}

class Firework {
  colors;
  types;
  rasingParticle;
  exploded = false;
  particles = [];
  buffers;
  size;
  radius;

  trailSize;

  constructor(colors, types, buffers, launch, size = 1, radius = 1) {
    this.buffers = buffers;
    this.colors = colors;
    this.types = types;
    this.size = size;
    this.radius = radius;

    this.rasingParticle = new RasingParticle(
      this.buffers[0],
      launch,
      this.colors[0],
      this.radius,
    );
  }

  explode() {
    new Audio(fireworkBoom.src).play();
    let fireworkSum = 0;
    for (let i = 0; i < starCount; i++) {
      if (this.types[i] === '牡丹') {
        fireworkSum += 50 * this.size;
      }
      if (this.types[i] === '菊') {
        fireworkSum += 100 * this.size;
      }
    }

    const rPos = this.rasingParticle.position;
    for (let i = 0; i < fireworkSum; i++) {
      const vec = p5.Vector.random3D();
      const type = this.selectType(vec);
      const particleColor = this.selectColor(vec);
      const origin = createVector(rPos.x, rPos.y);

      if (type === '牡丹') {
        this.particles.push(
          botanParticle(
            this.buffers[1],
            origin,
            vec,
            particleColor,
            this.radius,
          ),
        );
      }
      if (type === '菊') {
        this.particles.push(
          kikuParticle(
            this.buffers[2],
            origin,
            vec,
            particleColor,
            this.radius,
          ),
        );
      }
    }
  }

  dispose() {
    document.dispatchEvent(onFireworkDispose);
  }

  // 花火が打ち上がったのかをチェックする関数
  get done() {
    return this.exploded && this.particles.length === 0;
  }

  // 花火が打ち上がったらどのように落ちて行くのかを設定
  update(dt) {
    if (!this.exploded) {
      this.rasingParticle.update(dt);
      if (this.rasingParticle.velocity.y >= 0) {
        document.dispatchEvent(onFireworkExplode);
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(dt);
      if (this.particles[i].done) {
        this.particles.splice(i, 1);
      }
    }
  }

  show() {
    if (!this.exploded) {
      this.rasingParticle.draw();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].draw();
    }
  }

  selectIndex(vector) {
    const xyMag = vector.x * vector.x + vector.y * vector.y;
    if (xyMag < 0.3) {
      return 0;
    } else if (xyMag < 0.6) {
      return 1;
    } else {
      return 2;
    }
  }

  selectType(vector) {
    return this.types[this.selectIndex(vector)];
  }

  selectColor(vector) {
    return this.colors[this.selectIndex(vector)];
  }
}
