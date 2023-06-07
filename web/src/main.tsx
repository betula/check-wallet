import ReactDOM from 'react-dom/client'
import { configure } from "mobx"
import { App } from './App.tsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';

configure({
    enforceActions: "never",
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
)
