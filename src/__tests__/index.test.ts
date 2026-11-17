import { expect, it } from 'vitest';
import intlAddon from '../index';
import preview from '../preview';

it('should return the preview annotations from the addon factory', () => {
    expect(intlAddon()).toBe(preview);
});
