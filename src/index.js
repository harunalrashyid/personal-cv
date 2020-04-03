import styles from './scss/app.scss';
import App from './js/app.js'

if (module.hot) {
	module.hot.accept(App, () => {
		console.log('update module!');
		console.log('module updated!');		
	})
}