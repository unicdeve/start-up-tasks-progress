import { useState } from 'react';
import useSWR from 'swr';
import { IProgress } from 'types/start-up.type';
import { fetcher } from 'utils/fetcher';

interface IData {
	userProgresses: IProgress[];
}

interface IUseHome {
	data: IData | undefined;
	error: any;
}

export const useHome = (): IUseHome => {
	const userId = 1;
	const { data, error } = useSWR<IData>(
		`/api/start-ups/progress/${userId}`,
		fetcher
	);
	const [progresses, setProgresses] = useState(data);

	return { data: progresses, error };
};
