import { PackageStack, sort } from "./sort"
import { MASS_LIMIT, VOLUME_LIMIT, DIMENSION_LIMIT } from "./constants"

// Some number we can assume to be smaller than the
// precision of the measuring devices
const REALLY_SMALL_NUMBER = 2**-46

// A dimension that is smaller that the dimension limit and the cube root of the volume limit.
// Using this should prevent the test suit from breaking if the limits change
const ACCEPTABLE_DIMENSION = Math.min(DIMENSION_LIMIT - REALLY_SMALL_NUMBER, VOLUME_LIMIT**(1/3) - REALLY_SMALL_NUMBER)

// Some number really close to the mass limit but slightly smaller
const ACCEPTABLE_MASS = MASS_LIMIT - REALLY_SMALL_NUMBER


describe('Sort packages in the correct stack', () => {
    test('Throw an error when the any of the dimensions are 0', () => {
        expect(() => sort(0, ACCEPTABLE_DIMENSION, ACCEPTABLE_DIMENSION, ACCEPTABLE_MASS)).toThrow()
    })
    test('Throw error when any of the dimensions are negative values', () => {
        expect(() => sort(ACCEPTABLE_DIMENSION, -1.1, ACCEPTABLE_DIMENSION, ACCEPTABLE_MASS)).toThrow()
    })
    test('package that is neither bulky or heavy placed in the STANDARD stack', () => {
        expect(sort(ACCEPTABLE_DIMENSION, ACCEPTABLE_DIMENSION, ACCEPTABLE_DIMENSION, ACCEPTABLE_MASS)).toBe(PackageStack.STANDARD)
    })
    test('package with dimension >= DIMENSION_LIMIT, and mass < MASS_LIMIT classified as SPECIAL', () => {

        expect(sort(DIMENSION_LIMIT, REALLY_SMALL_NUMBER, REALLY_SMALL_NUMBER, ACCEPTABLE_MASS)).toBe(PackageStack.SPECIAL)
    })
    test('package with dimensions < DIMENSION_LIMIT, and mass >= MASS_LIMIT classified as SPECIAL', () => {

        expect(sort(ACCEPTABLE_DIMENSION, ACCEPTABLE_DIMENSION, ACCEPTABLE_DIMENSION, MASS_LIMIT)).toBe(PackageStack.SPECIAL)
    })
    test('package with volumn >= VOLUME_LIMIT, and mass < MASS_LIMIT classified as SPECIAL', () => {
        expect(sort(1, 1, VOLUME_LIMIT, ACCEPTABLE_MASS)).toBe(PackageStack.SPECIAL)
    })
    test('package with dimension >= DIMENSION_LIMIT and mass >= MASS_LIMIT is REJECTED', () => {
        expect(sort(DIMENSION_LIMIT, REALLY_SMALL_NUMBER, REALLY_SMALL_NUMBER, MASS_LIMIT)).toBe(PackageStack.REJECTED)
    })
    test('package with volume > VOLUMNE_LIMIT and package with mass >= MASS_LIMIT is REJECTED', () => {
        expect(sort(VOLUME_LIMIT, 1, 1, MASS_LIMIT)).toBe(PackageStack.REJECTED)
    })
})