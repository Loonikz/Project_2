import PagesRouter from './router/PageRouter';
import { MySQLRouter } from './router/MySQLRouter';
import { MongoDBRouter } from './router/MongoDBRouter';
import Application from './modules/Application';
import AuthRouter from './router/AuthRouter';

const app = new Application([
  new MySQLRouter(),
  new MongoDBRouter(),
  new PagesRouter(),
  new AuthRouter(),
]);

app.start();
