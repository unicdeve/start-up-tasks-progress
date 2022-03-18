import Checkbox from 'components/checkbox/checkbox.comp';
import PageWrapper from 'components/page-wrapper/page-wrapper.comp';
import ProgressHeader from 'components/progress-header/progress-header.comp';
import { useHome } from 'hooks/useHome';
import type { NextPage } from 'next';
import { StyledHomePage } from 'styles/pages/home.styled';

const Home: NextPage = () => {
	const { data, handleChange } = useHome();

	if (!data) {
		return <div>Loading...</div>;
	}

	return (
		<PageWrapper title='My startup progress'>
			<StyledHomePage>
				<h1>My startup progress</h1>

				<ul className='progresses'>
					{data.userProgresses.map((progress, index) => {
						const taskDisable =
							index === 0 ? false : !data.userProgresses[index - 1].isCompleted;

						return (
							<li key={progress.id}>
								<ProgressHeader
									title={progress.title}
									progressNumber={index + 1}
									isCompleted={progress.isCompleted}
								/>

								{progress.tasks.map((task) => {
									return (
										<Checkbox
											key={task.id}
											label={task.label}
											isChecked={task.isChecked}
											disabled={taskDisable}
											name='name'
											value='value'
											onChange={(e) => {
												handleChange(e.target.checked, progress.id, task.id);
											}}
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
