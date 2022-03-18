import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IPhase } from 'types/start-up.type';
import { fetcher } from 'utils/fetcher';

interface IData {
	startUpPhases: IPhase[];
}

interface IUseHome {
	data: IData | undefined;
	error: any;
	handleChange: (checked: boolean, phaseId: number, taskId: number) => void;
	randomFact?: string;
	loading: boolean;
}

export const useHome = (): IUseHome => {
	const userId = 1;
	const { data, error, mutate } = useSWR<IData>(
		`/api/start-ups/phase/${userId}`,
		fetcher
	);
	const [loading, setLoading] = useState<boolean>(false);

	const [randomFact, setRandomFact] = useState<string>('');

	useEffect(() => {
		if (data?.startUpPhases[data.startUpPhases.length - 1].isCompleted) {
			setLoading(true);

			fetch('https://uselessfacts.jsph.pl/random.json')
				.then((data) => data.json())
				.then((data) => {
					setRandomFact(data.text);
					setLoading(false);
				});
		} else {
			setRandomFact('');
		}
	}, [data]);

	const handleChange = async (
		checked: boolean,
		phaseId: number,
		taskId: number
	) => {
		try {
			setLoading(true);
			await fetch(`/api/start-ups/phase/${userId}`, {
				method: 'PATCH',
				body: JSON.stringify({ phaseId, taskId, isChecked: checked }),
			});

			mutate();
			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};

	return { data, error, handleChange, randomFact, loading };
};
