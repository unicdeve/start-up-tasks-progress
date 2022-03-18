export interface ITask {
	id: number;
	label: string;
	isChecked: boolean;
}

export interface IPhase {
	id: number;
	title: string;
	isCompleted: boolean;
	tasks: ITask[];
}

export interface IStartUp {
	id: number;
	userId: number;
	phases: IPhase[];
}

export interface InMemoryDatabase {
	startUps: IStartUp[];
}
