import { HasAnyAuthority } from './has-any-authority';

describe('HasAnyAuthority', () => {
  it('should create an instance', () => {
    const directive = new HasAnyAuthority();
    expect(directive).toBeTruthy();
  });
});
