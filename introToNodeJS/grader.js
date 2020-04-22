function average (scoresArr) {
	var sum = 0;
	var avg = 0;
	for (i = 0; i < scoresArr.length; i++) {
		sum += scoresArr[i];
	}
	avg = Math.round(sum / scoresArr.length);
	console.log("Calculating the score average..");
	return avg;
};

var scores1 = [90, 98, 89, 100, 100, 86, 94];
console.log(average (scores1));

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average (scores2));