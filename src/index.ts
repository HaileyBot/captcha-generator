import * as Canvas from "canvas";

Canvas.registerFont(require("path").resolve(__dirname, "../assets/Swift.ttf"), {
	family: "swift"
});

const randomText = (): string =>
		Math.random()
			.toString(36)
			.replace(/[^a-z]|[gkqr]+/gi, "")
			.substring(0, 6)
			.toUpperCase(),
	shuffleArray = (arr: number[]): number[] => {
		let i: number = arr.length,
			temp: number,
			randomIndex: number;
		// While there remain elements to shuffle...
		while (0 !== i) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * i);
			i -= 1;
			// And swap it with the current element.
			temp = arr[i];
			arr[i] = arr[randomIndex];
			arr[randomIndex] = temp;
		}
		return arr;
	};

class Captcha {
	private _canvas: Canvas.Canvas;
	private _value: string;

	constructor(_h: number = 250) {
		// Make sure argument is a number, limit to a range from 250 to 400
		_h = typeof _h !== "number" || _h < 250 ? 250 : _h > 400 ? 400 : _h;

		// Initialize canvas
		this._canvas = Canvas.createCanvas(400, _h);

		const ctx = this._canvas.getContext("2d");

		// Set background color
		ctx.globalAlpha = 1;
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.fillRect(0, 0, 400, _h);
		ctx.save();

		// Set style for lines
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 4;
		// Draw 10 lines
		ctx.beginPath();
		const coords: number[][] = [];
		for (let i = 0; i < 4; i++) {
			if (!coords[i]) coords[i] = [];
			for (let j = 0; j < 5; j++) coords[i][j] = Math.round(Math.random() * 80) + j * 80;
			if (!(i % 2)) coords[i] = shuffleArray(coords[i]);
		}
		for (let i = 0; i < coords.length; i++) {
			if (!(i % 2)) {
				for (let j = 0; j < coords[i].length; j++) {
					if (!i) {
						ctx.moveTo(coords[i][j], 0);
						ctx.lineTo(coords[i + 1][j], 400);
					} else {
						ctx.moveTo(0, coords[i][j]);
						ctx.lineTo(400, coords[i + 1][j]);
					}
				}
			}
		}
		ctx.stroke();

		// Set style for circles
		ctx.fillStyle = "#000";
		ctx.lineWidth = 0;
		// Draw circles
		for (let i = 0; i < 200; i++) {
			ctx.beginPath();
			ctx.arc(
				Math.round(Math.random() * 360) + 20, // X coordinate
				Math.round(Math.random() * 360) + 20, // Y coordinate
				Math.round(Math.random() * 7) + 1, // Radius
				0, // Start anglez
				Math.PI * 2 // End angle
			);
			ctx.fill();
		}

		// Set style for text
		ctx.font = "bold 90px swift";
		ctx.fillStyle = "#000";
		// Set position for text
		ctx.textAlign = "center";
		ctx.textBaseline = "top";
		ctx.translate(0, _h);
		ctx.translate(
			Math.round(Math.random() * 100 - 50) + 200,
			-1 * Math.round(Math.random() * (_h / 4) - _h / 8) - _h / 2
		);
		ctx.rotate(Math.random() - 0.5);
		// Set text value and print it to canvas
		ctx.beginPath();
		this._value = "";
		while (this._value.length !== 6) this._value = randomText();
		ctx.fillText(this._value, 0, 0);

		// Draw foreground noise
		ctx.restore();
		for (let i = 0; i < 5000; i++) {
			ctx.beginPath();
			let color = "#";
			while (color.length < 7) color += Math.round(Math.random() * 16).toString(16);
			color += "a0";
			ctx.fillStyle = color;
			ctx.arc(
				Math.round(Math.random() * 400), // X coordinate
				Math.round(Math.random() * _h), // Y coordinate
				Math.random() * 2, // Radius
				0, // Start angle
				Math.PI * 2 // End angle
			);
			ctx.fill();
		}
	}

	get value(): string {
		return this._value;
	}

	get PNGStream(): Canvas.PNGStream {
		return this._canvas.createPNGStream();
	}

	get JPEGStream(): Canvas.JPEGStream {
		return this._canvas.createJPEGStream();
	}

	get dataURL(): string {
		return this._canvas.toDataURL("image/jpeg");
	}

	get buffer(): Buffer {
		return this._canvas.toBuffer();
	}
}

export = Captcha;
