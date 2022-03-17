import { InMemoryDatabase, IProgress, ITask } from 'types/start-up.type';
import DB from '../in-memory-data.json';

const inMemoryDatabase: InMemoryDatabase = DB;

export const getUserProgresses = (userId: number): IProgress[] | undefined => {
	const userStartUp = inMemoryDatabase.startUps.find(
		(startUp) => startUp.userId === userId
	);

	if (!userStartUp) {
		return;
	}

	return userStartUp.progresses;
};

export const updateProgressTask = (
	userId: number,
	progressId: number,
	taskId: number,
	isChecked: boolean
): ITask | undefined => {
	const userProgresses = getUserProgresses(userId);

	const progress = userProgresses?.find((p) => p.id === progressId);

	if (!progress) {
		return;
	}

	const taskIndex = progress.tasks.findIndex((task) => task.id === taskId);

	if (taskIndex !== -1) {
		progress.tasks[taskIndex].isChecked = isChecked;

		return progress.tasks[taskIndex];
	}
};
