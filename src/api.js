const express = require('express');
const router = express.Router();

let { Visitors } = require(`./visitor`);

router.post('/addNewVisitor', async (req, res) => {
	let visitor1 = new Visitors();

	let visitorInfo = await visitor1.addNewVisitor(
		req.body.fullname,
		req.body.visitorsage,
		req.body.dateofvisit,
		req.body.timeofvisit,
		req.body.assistedby,
		req.body.comments
	);

	res.send({ visitors: visitorInfo[0] });
});

router.delete('/deletevisitor/:id', async (req, res) => {
	visitor1 = new Visitors();
	await visitor1.deleteVisitor(req.params.id);

	visitorInfo = await visitor1.viewAllVisitors();
	res.json({ visitor: visitorInfo[0] });
});

router.delete('/deleteVisitors', async (req, res) => {
	visitor1 = new Visitors();

	await visitor1.deleteAllVisitors();
	visitorInfo = await visitor1.viewAllVisitors();
	res.json({ visitor: visitorInfo[0] });
});

router.get('/viewVisitors', async (req, res) => {

	visitor1 = new Visitors();

	visitorsinfo = await visitor1.viewAllVisitors();
	res.json({ visitors: visitorsinfo });
});

router.get('/viewVisitor/:id', async (req, res) => {
	visitor1 = new Visitors();

	visitorInfo = await visitor1.viewOneVisitor(req.params.id);

	res.json({ visitor: visitorInfo[0] });
});

router.put('/updateVisitor/:id', async (req, res) => {
	visitor1 = new Visitors();

	let visitorInfo = await visitor1.updateVisitorInfo(
		req.params.id,
		req.body.fullname,
		req.body.visitorsage,
		req.body.dateofvisit,
		req.body.timeofvisit,
		req.body.assistedby,
		req.body.comments
	);

	res.send({ visitor: visitorInfo[0] });
});

module.exports = router;
