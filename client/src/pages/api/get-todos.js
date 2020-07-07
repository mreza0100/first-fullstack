export default function (req, res) {
	const data = [];
	let i;
	for (i = 1; i < 10; i++) {
		const r = (Math.random() * 10).toFixed();
		const bool = r > 5;
		data.push({
			id: `${i}`,
			title: bool ? "دویدن" : "قهوه خوردن",
			body: "wakd".repeat(i),
		});
	}
	res.status(200).json(data);
	res.end();
}
