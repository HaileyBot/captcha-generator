"use strict";
const assert = require("assert");
const Canvas = require("canvas");
const Captcha = require("../");

describe("Captcha", function () {
	it("should export function 'captcha'", function () {
		assert.strictEqual(typeof Captcha, "function");
	});

	const captcha = new Captcha();
	describe("captcha", function () {
		it("should export an object", function () {
			assert.strictEqual(typeof captcha, "object");
		});
		describe("value", function () {
			it("should be a string", function () {
				assert.strictEqual(typeof captcha.value, "string");
			});
			it("should be 6 characters long", function () {
				assert.strictEqual(captcha.value.length, 6);
			});
			it("should only contain letters", function () {
				assert.match(captcha.value, /^[a-z]+$/i);
			});
		});
		describe("PNGStream", function () {
			it("should be an instance of canvas PNG Stream", function () {
				assert.strictEqual(captcha.PNGStream instanceof Canvas.PNGStream, true);
			});
		});
		describe("JPEGStream", function () {
			it("should be an instance of canvas JPEG Stream", function () {
				assert.strictEqual(captcha.JPEGStream instanceof Canvas.JPEGStream, true);
			});
		});
	});
});
