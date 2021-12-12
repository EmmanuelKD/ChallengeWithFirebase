export enum TransactionStatus {
  complete = "complete",
  fail = "fail",
  unknown = "unknown",
  draft = "draft",
  pending = "complete",
}

export class Transaction {
  id: string = "";
  referenceId: string = "";
  from: string = "";
  to: string = "";
  amount: string = "";
  deleted_at: Date = new Date();
  created_at: Date = new Date();
  updated_at: Date = new Date();
  status: TransactionStatus = TransactionStatus.unknown;

  toObj = () => ({
    id: this.id,
    referenceId: this.referenceId,
    from: this.from,
    to: this.to,
    amount: this.amount,
    deleted_at: this.deleted_at,
    created_at: this.created_at,
    updated_at: this.updated_at,
    status: this.status,
  })

  fromObj = ({
    id,
    referenceId,
    from,
    to,
    amount,
    deleted_at,
    created_at,
    updated_at,
    status,
  }: {
    id: string,
    referenceId: string,
    from: string,
    to: string,
    amount: string,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
    status: string,
  }
  ) => {

    id = this.id;
    referenceId = this.referenceId;
    from = this.from;
    to = this.to;
    amount = this.amount;
    deleted_at = this.deleted_at;
    created_at = this.created_at;
    updated_at = this.updated_at;
    status = this.status;
  }
}
