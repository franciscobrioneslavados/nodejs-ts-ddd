import path from 'path'
import * as dotenv from 'dotenv'
import { FakeApp } from './FakeApp';

try {
  dotenv.config({
    path: path.resolve(__dirname, '../../../../../.env')
  })
  new FakeApp().start();
} catch (error) {
  console.log(error);
}
