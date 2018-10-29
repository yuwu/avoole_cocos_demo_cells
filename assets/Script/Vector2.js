
var Vector2 = {};

/**
 * @param  {number} x
 * @param  {number} y
 */
Vector2.len = function(x, y) {
	return Math.sqrt(x * x + y * y);
}

module.exports = Vector2;
