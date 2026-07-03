import React, { useEffect, useState } from "react";

interface expense {
  id: string;
  item: string;
  amount: number;
}

export default function ExpenseTracter() {
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [expense, setExpens] = useState<expense[]>(() => {
    const savedExp = localStorage.getItem("exp");
    return savedExp ? JSON.parse(savedExp) : [];
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (amount === "" || item === "") {
      return;
    }

    setExpens((prev) => [
      ...prev,
      {
        id: String(new Date()),
        amount: Number(amount),
        item: item,
      },
    ]);
    setAmount("");
    setItem("");
  }

  function handleRemove(id: string) {
    setExpens((prev) => prev.filter((prev) => prev.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("exp", JSON.stringify(expense));
  }, [expense]);

  const total = expense.reduce((sum, expense) => (sum += expense.amount), 0);

  const largestExpIndex = expense.reduce(
    (maxIndex, exp, currentIndex, arr) =>
      exp.amount > arr[maxIndex].amount ? currentIndex : maxIndex,
    0,
  );

  const largestExp = expense.length > 0 ? expense[largestExpIndex] : null;

  return (
    <div>
      Total Amount {total} <br />
      {largestExp && (
        <p>
          largest exp: item {largestExp.item} - amount {largestExp.amount}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter item name"
          value={item}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setItem(e.target.value)
          }
        />
        <input
          type="number"
          placeholder="enter cost"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button>Add</button>
      </form>
      <br />
      {expense.map((exp, i) => {
        const amount = exp.amount;
        const title = exp.item;
        return (
          <div key={i}>
            item :{title} - Rs {amount}{" "}
            <button onClick={() => handleRemove(exp.id)}>Delete</button> <br />
          </div>
        );
      })}
    </div>
  );
}
