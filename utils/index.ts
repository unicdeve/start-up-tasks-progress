import DB from 'in-memory-data.json';
import { InMemoryDatabase, IProgress, ITask } from 'types/start-up.type';

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

interface IUpdateProgressResponse {
	id: number;
	isCompleted: boolean;
	task: ITask;
}

export const updateProgressTask = (
	userId: number,
	progressId: number,
	taskId: number,
	isChecked: boolean
): IUpdateProgressResponse | undefined => {
	const userProgresses = getUserProgresses(userId);

	const progress = userProgresses?.find((p) => p.id === progressId);

	if (!progress) {
		return;
	}

	const taskIndex = progress.tasks.findIndex((task) => task.id === taskId);

	if (taskIndex !== -1) {
		// update progress task
		progress.tasks[taskIndex].isChecked = isChecked;

		// update progress by checking the number of tasks not completed is zero
		const progressTasksNotChecked = progress.tasks.filter(
			(task) => !task.isChecked
		).length;

		const isCompleted = progressTasksNotChecked === 0;

		progress.isCompleted = isCompleted;

		const updatedProgress = {
			id: progress.id,
			isCompleted,
			task: progress.tasks[taskIndex],
		};

		return updatedProgress;
	}
};
