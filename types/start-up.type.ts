export interface ITask {
	id: number;
	label: string;
	isChecked: boolean;
}

export interface IProgress {
	id: number;
	title: string;
	isCompleted: boolean;
	tasks: ITask[];
}

export interface IStartUp {
	id: number;
	userId: number;
	progresses: IProgress[];
}

export interface InMemoryDatabase {
	startUps: IStartUp[];
}
