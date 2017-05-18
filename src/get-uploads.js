export default function (config) {
	return fetch('https://thismight.be/offensive/api.php/getuploads.json?type=image&limit=100&token=yourtoken');
	// throw new Error('not implemented');
}
