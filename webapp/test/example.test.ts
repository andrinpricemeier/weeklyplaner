import { describe, it } from 'vitest'

// The two tests marked with concurrent will be run in parallel
describe('suite', () => {
    it('passes', () => {
        expect(true).toBe(true);
    })
})