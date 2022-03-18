import useSWR, { useSWRConfig } from 'swr';
import { IProgress } from 'types/start-up.type';
import { fetcher } from 'utils/fetcher';

interface IData {
	userProgresses: IProgress[];
}

interface IUseHome {
	data: IData | undefined;
	error: any;
	handleChange: (checked: boolean, progressId: number, taskId: number) => void;
}

export const useHome = (): IUseHome => {
	const userId = 1;
	const { mutate } = useSWRConfig();
	const { data, error } = useSWR<IData>(
		`/api/start-ups/progress/${userId}`,
		fetcher
	);

	const handleChange = async (
		checked: boolean,
		progressId: number,
		taskId: number
	) => {
		if (!data) {
			return;
		}

		const currentProgresses = data.userProgresses;

		const progressIndex = currentProgresses.findIndex(
			(p) => p.id === progressId
		);

		if (progressIndex === -1) {
			return;
		}

		const progress = currentProgresses[progressIndex];
		if (!progress) {
			return;
		}

		const taskIndex = progress.tasks.findIndex((task) => task.id === taskId);
		if (taskIndex !== -1) {
			// update progress task
			progress.tasks[taskIndex].isChecked = checked;

			// update progress by checking the number of tasks not completed is zero
			const progressTasksNotChecked = progress.tasks.filter(
				(task) => !task.isChecked
			).length;

			const isCompleted = progressTasksNotChecked === 0;

			progress.isCompleted = isCompleted;
			currentProgresses[progressIndex] = progress;

			// update the local data immediately, but disable the revalidation
			mutate(
				`/api/start-ups/progress/${userId}`,
				{ userProgresses: currentProgresses },
				false
			);

			// Now, send data to API
			await fetch(`/api/start-ups/progress/${userId}`, {
				method: 'PATCH',
				body: JSON.stringify({ progressId, taskId, isChecked: checked }),
			});

			mutate(`/api/start-ups/progress/${userId}`);
		}
	};

	return { data, error, handleChange };
};
