import { UniqueArrayPipe } from './unique-array.pipe';

describe('UniqueArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new UniqueArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
