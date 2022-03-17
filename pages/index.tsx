import Checkbox from 'components/checkbox/checkbox.comp';
import PageWrapper from 'components/page-wrapper/page-wrapper.comp';
import ProgressHeader from 'components/progress-header/progress-header.comp';
import type { NextPage } from 'next';
import { ChangeEvent } from 'react';
import { StyledHomePage } from 'styles/pages/home.styled';

const Home: NextPage = () => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked);
	};

	return (
		<PageWrapper title='My startup progress'>
			<StyledHomePage>
				<h1>My startup progress</h1>

				<ProgressHeader
					title='Foundation'
					progressNumber={1}
					isCompleted={true}
				/>

				<Checkbox
					label='Setup virtual office'
					isChecked={true}
					name='name'
					value='value'
					onChange={handleChange}
				/>
			</StyledHomePage>
		</PageWrapper>
	);
};

export default Home;
