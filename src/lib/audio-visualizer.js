class Analyser {
	constructor(analyserOptions) {
		this.audio = analyserOptions.audio;
		this.visual = this.audio.visual;

		this.scale = analyserOptions.scale;

		this.radius = analyserOptions.radius;

		this.isAlpha = analyserOptions.isAlpha;

		this.color = analyserOptions.color;

		this.audioContext = this.audio.audioContext;
		this.analyser = this.audioContext.createAnalyser();
		this.analyser.fftSize = 2048;
		this.frequencyNum = 1024;
		this.hz = 22028;
		this.analyser.smoothingTimeConstant = analyserOptions.smoothTime;

		this.filterLP = this.audioContext.createBiquadFilter();
		this.filterHP = this.audioContext.createBiquadFilter();

		this.filterLP.type = 'lowpass';
		this.filterLP.frequency.value = analyserOptions.max;

		this.maxHz = analyserOptions.max;
		this.minHz = analyserOptions.min;

		this.offset = analyserOptions.offset;
		this.radiusOffset = 16 * this.offset;
		this.count = 0;

		this.stockSpectrums = [];

		this.sourceStart = Math.ceil((this.frequencyNum * this.minHz) / this.hz);
		this.sourceEnd = Math.round((this.frequencyNum * this.maxHz) / this.hz);
		this.sourceLength = this.sourceEnd - this.sourceStart + 1;

		this.adjustOffset = Math.round(this.sourceLength * 0.12);

		this.distLength = 120;
		this.interval = (this.sourceLength - 1) / (this.distLength - 1);

		this.totalLength = Math.round((this.distLength * 3) / 2);
	}

	adjustFrequency(i, avr) {
		let f = Math.max(0, this.spectrums[this.sourceStart + i] - avr) * this.scale;
		const offset = i - this.sourceStart;
		const ratio = offset / this.adjustOffset;

		f *= Math.max(0, Math.min(1, (5 / 6) * (ratio - 1) * (ratio - 1) * (ratio - 1) + 1));

		return f;
	}

	update() {
		const spectrums = new Float32Array(this.frequencyNum);
		if (this.audio.isReady) {
			this.analyser.getFloatFrequencyData(spectrums);
			this.stockSpectrums.push(spectrums);
		}

		if (this.count < this.offset) {
			this.spectrums = new Float32Array(this.frequencyNum);
		} else {
			if (this.audio.isReady) {
				const _spectrums = this.stockSpectrums[0];

				this.spectrums = Number.isFinite(_spectrums[0])
					? _spectrums
					: new Float32Array(this.frequencyNum);

				this.stockSpectrums.shift();
			} else {
				this.spectrums = new Float32Array(this.frequencyNum);
			}
		}

		if (this.audio.isReady) {
			this.count++;
		}

		const canvasContext = this.visual.canvasContext;
		canvasContext.strokeStyle = this.color;
		canvasContext.fillStyle = this.color;

		let avr = 0;

		for (let i = this.sourceStart; i <= this.sourceEnd; i++) {
			avr += this.spectrums[i];
		}

		avr /= this.sourceLength;

		avr = !this.audio.isReady || avr === 0 ? avr : Math.min(-40, Math.max(avr, -60));

		canvasContext.beginPath();

		const frequencyArray = [];

		for (let i = 0; i < this.distLength; i++) {
			const n1 = Math.floor(i * this.interval);
			let n2 = n1 + 1;
			const n0 = Math.abs(n1 - 1);
			let n3 = n1 + 2;

			n2 = n2 > this.sourceLength - 1 ? (this.sourceLength - 1) * 2 - n2 : n2;
			n3 = n3 > this.sourceLength - 1 ? (this.sourceLength - 1) * 2 - n3 : n3;

			const p0 = this.adjustFrequency(n0, avr);
			const p1 = this.adjustFrequency(n1, avr);
			const p2 = this.adjustFrequency(n2, avr);
			const p3 = this.adjustFrequency(n3, avr);

			const mu = i * this.interval - n1;

			const mu2 = mu * mu;

			const a0 = -0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3;
			const a1 = p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3;
			const a2 = -0.5 * p0 + 0.5 * p2;

			let targetFrequency = a0 * mu * mu2 + a1 * mu2 + a2 * mu + p1;
			targetFrequency = Math.max(0, targetFrequency);
			frequencyArray.push(targetFrequency);

			const pos = this.visual.calcPolorCoord(
				(i + this.visual.tick + this.offset) / (this.totalLength - 1),
				this.radius + targetFrequency + 3,
			);
			canvasContext.lineTo(pos.x + this.radiusOffset, pos.y + this.radiusOffset);
		}

		for (let i = 1; i <= this.distLength; i++) {
			const targetFrequency = frequencyArray[this.distLength - i];
			const pos = this.visual.calcPolorCoord(
				(i / 2 + this.distLength - 1 + this.visual.tick + this.offset) / (this.totalLength - 1),
				this.radius + targetFrequency + 3,
			);
			canvasContext.lineTo(pos.x + this.radiusOffset, pos.y + this.radiusOffset);
		}

		for (let i = this.distLength; i > 0; i--) {
			const targetFrequency = frequencyArray[this.distLength - i];
			const pos = this.visual.calcPolorCoord(
				(i / 2 + this.distLength - 1 + this.visual.tick + this.offset) / (this.totalLength - 1),
				this.radius - targetFrequency - 3,
			);
			canvasContext.lineTo(pos.x + this.radiusOffset, pos.y + this.radiusOffset);
		}

		for (let i = this.distLength - 1; i >= 0; i--) {
			const targetFrequency = frequencyArray[i];
			const pos = this.visual.calcPolorCoord(
				(i + this.visual.tick + this.offset) / (this.totalLength - 1),
				this.radius - targetFrequency - 3,
			);
			canvasContext.lineTo(pos.x + this.radiusOffset, pos.y + this.radiusOffset);
		}

		canvasContext.fill();
	}
}

class Sound {
	constructor(_visual, audio) {
		this.visual = _visual;
		this.audio = audio;
		this.audioContext = new AudioContext();
		this.isReady = false;
		this.count = 0;
	}

	init() {
		this.analyser1 = new Analyser({
			audio: this,
			smoothTime: 0.7,
			color: '#b0c2e6',
			scale: 2,
			min: 1,
			max: 600,
			offset: 1,
			radius: 350,
			isAlpha: true,
		});
		this.analyser2 = new Analyser({
			audio: this,
			smoothTime: 0.82,
			color: '#ec8585',
			scale: 1.8,
			min: 1,
			max: 600,
			offset: -1,
			radius: 350,
			isAlpha: false,
		});
		this.render();
		this.isReady = true;
		this.source = this.audioContext.createMediaElementSource(this.audio);
		this.source.connect(this.analyser1.analyser);
		this.source.connect(this.analyser2.analyser);
		this.source.connect(this.audioContext.destination);
	}

	render() {
		this.visual.draw();
		requestAnimationFrame(this.render.bind(this));
	}
}

export class Visualizer {
	constructor(audio, element) {
		this.canvas = element;
		this.canvasContext = this.canvas.getContext('2d');

		this.sound = new Sound(this, audio);
		this.sound.init();
		this.tick = 0;
	}

	setSize(width, height) {
		this.canvasW = width;
		this.canvasH = height;
		this.canvas.width = this.canvasW;
		this.canvas.height = this.canvasH;
	}

	calcPolorCoord(a, b) {
		const x = Math.cos(a * 2 * Math.PI) * b;
		const y = Math.sin(a * 2 * Math.PI) * b * 0.95;

		return {
			x: x,
			y: y,
		};
	}

	draw() {
		this.tick += 0.07;
		const canvasContext = this.canvasContext;

		canvasContext.save();
		canvasContext.clearRect(0, 0, this.canvasW, this.canvasH);
		canvasContext.translate(this.canvasW / 2, this.canvasH / 2);
		canvasContext.lineWidth = 3;

		this.sound.analyser1.update();
		this.sound.analyser2.update();

		canvasContext.restore();
	}
}
