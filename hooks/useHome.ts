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
	randomFact?: string;
}

export const useHome = (): IUseHome => {
	const userId = 1;
	const { data, error, mutate } = useSWR<IData>(
		`/api/start-ups/progress/${userId}`,
		fetcher
	);

	const [randomFact, setRandomFact] = useState<string>();

	useEffect(() => {
		if (data?.userProgresses[data.userProgresses.length - 1].isCompleted) {
			fetch('https://uselessfacts.jsph.pl/random.json')
				.then((data) => data.json())
				.then((data) => {
					setRandomFact(data.text);
				});
		} else {
			setRandomFact('');
		}
	}, [data]);

	const handleChange = async (
		checked: boolean,
		progressId: number,
		taskId: number
	) => {
		try {
			await fetch(`/api/start-ups/progress/${userId}`, {
				method: 'PATCH',
				body: JSON.stringify({ progressId, taskId, isChecked: checked }),
			});

			mutate();
		} catch (e) {
			console.log(e);
		}
	};

	return { data, error, handleChange, randomFact };
};
