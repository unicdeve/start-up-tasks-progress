import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserStartUpPhases, updatePhaseTask } from 'utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const userId = parseInt(req.query.userId.toString(), 10);

	const { method } = req;

	// GET user startup phases
	if (method === 'GET') {
		const phases = getUserStartUpPhases(userId);

		if (!phases) {
			return res.status(404).json({ error: 'User start-up phase not found' });
		}

		res.status(200).json({ startUpPhases: phases });
	}

	// UPDATE user startup phase
	else if (method === 'PATCH') {
		const { phaseId, taskId, isChecked } = JSON.parse(req.body);

		const updatedPhase = updatePhaseTask(userId, phaseId, taskId, isChecked);

		if (!updatedPhase) {
			return res.status(400).json({ error: 'Could update user phase task' });
		}

		res.status(200).json({ updatedPhase });
	}

	// return error for all other HTTP verbs other than GET, PATCH
	else {
		return res.status(404).json({ error: 'route not found' });
	}
}
