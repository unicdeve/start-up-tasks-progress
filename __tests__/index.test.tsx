import { render, screen } from '@testing-library/react';
import { useHome } from 'hooks/useHome';
import Home from 'pages/index';

jest.mock('hooks/useHome', () => ({
	useHome: jest.fn(),
}));

jest.mock('components/checkbox/checkbox.comp', () => ({
	__esModule: true,
	default: ({ onChange, checked, disabled }: any) => (
		<input
			data-testid='checkbox'
			onChange={onChange}
			checked={checked}
			disabled={disabled}
		/>
	),
}));

jest.mock('components/page-wrapper/page-wrapper.comp', () => ({
	__esModule: true,
	default: ({ children }: any) => (
		<div data-testid='page-wrapper'>{children}</div>
	),
}));

jest.mock('components/phase-header/phase-header.comp', () => ({
	__esModule: true,
	default: ({ title }: any) => <div data-testid='phase-header'>{title}</div>,
}));

jest.mock('components/spin/spin.comp', () => ({
	__esModule: true,
	default: () => <div data-testid='loading-spinner' />,
}));

const fakeStartUpPhasesData = {
	startUpPhases: [
		{
			id: 1,
			title: 'phase1',
			isCompleted: false,
			tasks: [
				{
					id: 1,
					label: 'phase1 task1',
					isChecked: true,
				},
				{
					id: 2,
					label: 'phase1 task2',
					isChecked: false,
				},
			],
		},
		{
			id: 2,
			title: 'phase2',
			isCompleted: false,
			tasks: [
				{
					id: 1,
					label: 'phase2 task1',
					isChecked: false,
				},
			],
		},
	],
};

describe('Home', () => {
	beforeEach(() => {
		(useHome as jest.Mock).mockReturnValue({
			data: { startUpPhases: [] },
			handleChange: jest.fn(),
			randomFact: '',
			loading: false,
		});
	});

	it('should render without errors', () => {
		render(<Home />);
	});

	it('should render correct page header', () => {
		render(<Home />);

		const header = screen.getByText('My startup phase');
		expect(header).toBeInTheDocument();
	});

	it('should render loading spinner when loading is true', () => {
		(useHome as jest.Mock).mockReturnValue({
			data: { startUpPhases: [] },
			handleChange: jest.fn(),
			randomFact: '',
			loading: true,
		});

		render(<Home />);

		const loadingSpinner = screen.getByTestId('loading-spinner');
		expect(loadingSpinner).toBeInTheDocument();
	});

	it('should render loading spinner when fetching data', () => {
		(useHome as jest.Mock).mockReturnValue({
			data: undefined,
			handleChange: jest.fn(),
			randomFact: '',
			loading: false,
		});

		render(<Home />);

		const loadingSpinner = screen.getByTestId('loading-spinner');
		expect(loadingSpinner).toBeInTheDocument();
	});

	it('should render correct number of phase headers', () => {
		(useHome as jest.Mock).mockReturnValue({
			data: fakeStartUpPhasesData,
			handleChange: jest.fn(),
			randomFact: '',
			loading: false,
		});

		render(<Home />);

		const phaseHeaders = screen.getAllByTestId('phase-header');
		expect(phaseHeaders).toHaveLength(
			fakeStartUpPhasesData.startUpPhases.length
		);
	});
});
