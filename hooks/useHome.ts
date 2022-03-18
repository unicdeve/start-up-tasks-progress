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
	const { data, error, mutate } = useSWR<IData>(
		`/api/start-ups/progress/${userId}`,
		fetcher
	);

	const handleChange = async (
		checked: boolean,
		progressId: number,
		taskId: number
	) => {
		await fetch(`/api/start-ups/progress/${userId}`, {
			method: 'PATCH',
			body: JSON.stringify({ progressId, taskId, isChecked: checked }),
		});

		mutate();
	};

	return { data, error, handleChange };
};
