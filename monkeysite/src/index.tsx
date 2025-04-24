import { render } from 'preact';
import { Router, Route } from 'preact-router';
import { MonkeyProvider } from './data/monkeyContext';

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

import Header from './components/Header';
import Footer from './components/Footer';
import MainView from './components/MainView';
import DetailedView from './components/DetailedView';
import EditView from './components/EditView';
import CreateView from './components/CreateView';

export function App() {
	return (
		<MonkeyProvider>
			<div class="d-flex flex-column min-vh-100" id="app">
				<Header />

				<div class="container my-4" id="main-content">
					<Router>
						<Route path="/" component={MainView} />
						<Route path="/monkeys" component={MainView} />
						<Route path="/monkeys/:id" component={DetailedView} />
						<Route path="/monkeys/new" component={CreateView} />
						<Route path="/monkeys/:id/edit" component={EditView} />
					</Router>
				</div>

				<Footer />
			</div>
		</MonkeyProvider>
	);
}

render(<App />, document.getElementById('app'));
