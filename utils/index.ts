import DB from 'in-memory-data.json';
import { InMemoryDatabase, IPhase, ITask } from 'types/start-up.type';

const inMemoryDatabase: InMemoryDatabase = DB;

export const getUserStartUpPhases = (userId: number): IPhase[] | undefined => {
	const userStartUp = inMemoryDatabase.startUps.find(
		(startUp) => startUp.userId === userId
	);

	if (!userStartUp) {
		return;
	}

	return userStartUp.phases;
};

interface IUpdatePhaseResponse {
	id: number;
	isCompleted: boolean;
	task: ITask;
}

export const updatePhaseTask = (
	userId: number,
	phaseId: number,
	taskId: number,
	isChecked: boolean
): IUpdatePhaseResponse | undefined => {
	const startUpPhases = getUserStartUpPhases(userId);

	const phase = startUpPhases?.find((p) => p.id === phaseId);

	if (!phase) {
		return;
	}

	const taskIndex = phase.tasks.findIndex((task) => task.id === taskId);

	if (taskIndex !== -1) {
		// update phase task
		phase.tasks[taskIndex].isChecked = isChecked;

		// update phase by checking the number of tasks not completed is zero
		const phaseTasksNotChecked = phase.tasks.filter(
			(task) => !task.isChecked
		).length;

		const isCompleted = phaseTasksNotChecked === 0;

		phase.isCompleted = isCompleted;

		const updatedPhase = {
			id: phase.id,
			isCompleted,
			task: phase.tasks[taskIndex],
		};

		return updatedPhase;
	}
};
