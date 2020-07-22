export class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missign param: ${paramName}`)
    this.name = 'MissignParamError'
  }
}
