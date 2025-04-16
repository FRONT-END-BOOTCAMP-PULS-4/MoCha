export class User {
  constructor(
    public readonly id: string | null,
    public email: string,
    public nickname: string,
    public phone_number: string,
    public readonly created_at?: Date,
    public readonly deleted_at?: Date | null,
    public provider: string = 'local' // 기본값 'local'
  ) {}
}
