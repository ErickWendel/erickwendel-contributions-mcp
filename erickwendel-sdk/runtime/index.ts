// @ts-nocheck
export { createClient } from './createClient.ts'
export type { ClientOptions } from './createClient.ts'
export type { FieldsSelection } from './typeSelection.ts'
export { generateGraphqlOperation } from './generateGraphqlOperation.ts'
export type { GraphqlOperation } from './generateGraphqlOperation.ts'
export { linkTypeMap } from './linkTypeMap.ts'
// export { Observable } from 'zen-observable-ts'
export { createFetcher } from './fetcher.ts'
export { GenqlError } from './error.ts'
export const everything = {
    __scalar: true,
}
