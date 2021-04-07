export class UserModel {
  constructor(public email: string, public id: string, private TOKEN: string, private TOKENEXPIRATIONDATE: Date) {
  }

  get token(): string {
    if (!this.TOKENEXPIRATIONDATE || new Date() > this.TOKENEXPIRATIONDATE) {
      return null;
    } else {
      return this.TOKEN;
    }
  }
}
