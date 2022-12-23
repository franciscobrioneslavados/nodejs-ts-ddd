import { FakeApp } from './FakeApp';

try {
  new FakeApp().start();
} catch (error) {
  console.log(error);
}
