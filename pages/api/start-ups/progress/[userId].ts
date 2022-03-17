import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserProgresses, updateProgressTask } from 'utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const userId = parseInt(req.query.userId.toString(), 10);

	const { method } = req;

	// GET user startup progresses
	if (method === 'GET') {
		const progresses = getUserProgresses(userId);

		if (!progresses) {
			return res
				.status(404)
				.json({ error: 'User start-up progress not found' });
		}

		res.status(200).json({ userProgresses: progresses });
	}

	// UPDATE user startup progress
	else if (method === 'PATCH') {
		const { progressId, taskId, isChecked } = req.body;

		const updatedProgress = updateProgressTask(
			userId,
			progressId,
			taskId,
			isChecked
		);

		if (!updatedProgress) {
			return res.status(400).json({ error: 'Could update user progress task' });
		}

		res.status(200).json({ updatedProgress });
	}

	// return error for all other HTTP verbs other than GET, PATCH
	else {
		return res.status(404).json({ error: 'route not found' });
	}
}
