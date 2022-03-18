import { useEffect, useState } from 'react';
import useSWR from 'swr';
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
	const { data: fetchedData, error } = useSWR<IData>(
		`/api/start-ups/progress/${userId}`,
		fetcher
	);

	const [data, setData] = useState(fetchedData);

	useEffect(() => {
		if (fetchedData) {
			setData(fetchedData);
		}
	}, [fetchedData]);

	const handleChange = (
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
			setData({ userProgresses: currentProgresses });

			// Now, send data to API
		}
	};

	return { data: data, error, handleChange };
};
