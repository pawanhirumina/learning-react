import { useState, useEffect } from "react";

export default function FetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/uses")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading....</p>;
  if (!data) return <p>No Data</p>;

  const frontend = data.endpoints.STACK.frontend;
  const pc = data.endpoints.PC;

  return (
    <div>
      <h1>My Setup</h1>
      <p>
        PC: {pc.CPU} - {pc.RAM}
      </p>

      <h2>Frontend</h2>
      <ul>
        {frontend.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
