import Checkbox from 'components/checkbox/checkbox.comp';
import PageWrapper from 'components/page-wrapper/page-wrapper.comp';
import ProgressHeader from 'components/progress-header/progress-header.comp';
import { useHome } from 'hooks/useHome';
import type { NextPage } from 'next';
import { ChangeEvent } from 'react';
import { StyledHomePage } from 'styles/pages/home.styled';

const Home: NextPage = () => {
	const { data } = useHome();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.checked);
	};

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<PageWrapper title='My startup progress'>
			<StyledHomePage>
				<h1>My startup progress</h1>

				<ul className='progresses'>
					{data.userProgresses.map((d, index) => {
						return (
							<li key={d.id}>
								<ProgressHeader
									title={d.title}
									progressNumber={index + 1}
									isCompleted={d.isCompleted}
								/>

								{d.tasks.map((task) => {
									return (
										<Checkbox
											key={task.id}
											label='Setup virtual office'
											isChecked={task.isChecked}
											name='name'
											value='value'
											onChange={handleChange}
										/>
									);
								})}
							</li>
						);
					})}
				</ul>
			</StyledHomePage>
		</PageWrapper>
	);
};

export default Home;
