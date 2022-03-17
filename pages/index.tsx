import PageWrapper from 'components/page-wrapper/page-wrapper.comp';
import ProgressHeader from 'components/progress-header/progress-header.comp';
import type { NextPage } from 'next';
import { StyledHomePage } from 'styles/pages/home.styled';

const Home: NextPage = () => {
	return (
		<PageWrapper title='My startup progress'>
			<StyledHomePage>
				<h1>My startup progress</h1>

				<ProgressHeader
					title='Foundation'
					progressNumber={1}
					isCompleted={true}
				/>
			</StyledHomePage>
		</PageWrapper>
	);
};

export default Home;
