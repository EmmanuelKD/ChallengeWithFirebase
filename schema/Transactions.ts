export enum TransactionStatus {
  complete = "complete",
  fail = "fail",
  unknown = "unknown",
  draft = "draft",
  pending = "complete",
}


export namespace TransactionStatus {
  export function toString(dir: TransactionStatus): string {
    return TransactionStatus[dir];
  }

  export function fromString(dir: string): TransactionStatus {
    return (TransactionStatus as any)[dir];
  }
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


}


export namespace Transaction {

  export function toObject(dir: Transaction): Object {
    return ({
      id: dir.id,
      referenceId: dir.referenceId,
      from: dir.from,
      to: dir.to,
      amount: dir.amount,
      deleted_at: dir.deleted_at,
      created_at: dir.created_at,
      updated_at: dir.updated_at,
      status: TransactionStatus.toString(dir.status),
    })
  }




  export function fromObject({
    id,
    referenceId,
    from,
    to,
    amount,
    deleted_at,
    created_at,
    updated_at,
    status, }: {
    id?: string,
    referenceId: string,
    from: string,
    to: string,
    amount: string,
    deleted_at: Date,
    created_at: Date,
    updated_at: Date,
    status: string,
  }
  ): Transaction {
    var tra:Transaction=new Transaction();

    tra.id = id;
    tra.referenceId = referenceId;
    tra.from = from;
    tra.to = to;
    tra.amount = amount;
    tra.deleted_at = deleted_at;
    tra.created_at = created_at;
    tra.updated_at = updated_at;
    tra.status = TransactionStatus.fromString(status);

    return tra;
  }
}