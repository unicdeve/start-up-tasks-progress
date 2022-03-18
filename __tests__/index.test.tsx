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
});
