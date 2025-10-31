
import { MASS_LIMIT, VOLUME_LIMIT, DIMENSION_LIMIT } from "./constants"

/**
 * STANDARD: packages classified as neither bulky or heavy
 * SPECIAL: pckages that are either heaver or bulky
 * REJECTED: packages that are both heavy and bulky
 */
export enum PackageStack {
    STANDARD = "STANDARD",
    SPECIAL = "SPECIAL",
    REJECTED = "REJECTED",
}

/**
 * Determine the appropriate stack to dispatch
 * a package given its physical properties.
 * 
 * bulky -> the volume is greater than or equal to VOLUME_LIMIT or one dim > DIMENSION_LIMIT
 * heavy -> the mass is greater than or equal to MASS_LIMIT
 * 
 * @param width - The width of the package in centimeters
 * @param height - the height of the package in centimeters
 * @param mass - the mass of the package in kilogram
 * @return an enum that inidicates which stack the package belongs to
 */
export const sort = (
    width: number,
    height: number,
    length: number,
    mass: number
): PackageStack  =>  {

    // Verify that all the metrics are possitive numbers.
    // This is somewhat redundant because typescript will enforce
    // that the args are numbers
    if (![width, height, length, mass].every(
        metric => typeof metric === 'number' && metric >0
    )) {
        throw new Error(
            `All properties of a package must be positive numbers. 
            Received: width ${width} cm, height ${height} cm, length ${length}, mass ${mass}kg`
        )
    }
    const bulky = Math.max(width, height, length) >= DIMENSION_LIMIT || width * height * length >= VOLUME_LIMIT
    const heavy = mass >= MASS_LIMIT

    if (bulky && heavy) return PackageStack.REJECTED
    if (bulky || heavy) return PackageStack.SPECIAL
    return PackageStack.STANDARD
}